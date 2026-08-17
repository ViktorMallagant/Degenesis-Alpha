(function () {
  "use strict";

  var PDFLib = window.PDFLib;
  if (!PDFLib || !PDFLib.PDFDocument || !PDFLib.PDFDocument.prototype) return;

  var originalSave = PDFLib.PDFDocument.prototype.save;
  var processedDocuments = new WeakSet();

  function i18nTranslate(key, params) {
    try {
      var i18n = window.__i18n;
      return (i18n.global || i18n).t(key, params || {});
    } catch (e) {
      return key;
    }
  }

  function locale() {
    return localStorage.getItem("locale") || "en";
  }

  function pluralSuffix(count) {
    if (count <= 1) return "";
    return locale() === "de" ? "en" : "s";
  }

  function collectModifierLines(store) {
    var lines = [];

    if (store && store.allModifiers) {
      Array.from(store.allModifiers).forEach(function (modifier) {
        if (modifier != null && String(modifier).trim().length > 0) {
          lines.push(String(modifier).trim());
        }
      });
    }

    // Entrepreneur penalties are displayed in the same Modifiers block in the UI,
    // so export them alongside the static Legacy/Potential modifiers as well.
    if (store && store.entrepreneurSocialPenalties) {
      Array.from(store.entrepreneurSocialPenalties).forEach(function (penalty) {
        var cultName = i18nTranslate("culturesConceptsCults." + penalty.cultKey);
        var translated = i18nTranslate("messages.entrepreneurPenalty", {
          count: penalty.count,
          cult: cultName,
          plural: pluralSuffix(penalty.count)
        });
        if (translated && translated !== "messages.entrepreneurPenalty") {
          lines.push(String(translated).trim());
        }
      });
    }

    return lines;
  }

  function appendixTitle() {
    if (locale() === "fr") return "MODIFICATEURS - SUITE";
    if (locale() === "de") return "MODIFIKATOREN - FORTSETZUNG";
    return "MODIFIERS - CONTINUED";
  }

  function appendixSubtitle() {
    if (locale() === "fr") return "Modificateurs supplémentaires ne tenant pas sur la fiche";
    if (locale() === "de") return "Zusätzliche Modifikatoren, die nicht auf das Charakterblatt passen";
    return "Additional active modifiers that do not fit on the character sheet";
  }

  // The character-sheet form fields use the PDF standard Helvetica font,
  // which is limited to WinAnsi. Normalize common Unicode punctuation and
  // game-rule symbols before placing text in those fields or drawing it on an
  // overflow page. In particular, Unicode arrows such as U+2192 cause
  // pdf-lib to throw "WinAnsi cannot encode" while saving the document.
  function normalizePdfText(text) {
    return String(text == null ? "" : text)
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/\u2212/g, "-")
      .replace(/[\u2192\u21D2\u2794\u279C\u279D\u279E\u279F\u27A0\u27A1]/g, "->")
      .replace(/[\u2190\u21D0]/g, "<-")
      .replace(/[\u2194\u21D4]/g, "<->")
      .replace(/\u00D7/g, "x")
      .replace(/\u00B1/g, "+/-")
      .replace(/\u2260/g, "!=")
      .replace(/\u2248/g, "~")
      .replace(/\u2264/g, "<=")
      .replace(/\u2265/g, ">=")
      .replace(/\u2026/g, "...")
      .replace(/\u2022/g, "-")
      .replace(/\u00A0/g, " ");
  }

  function safeForFont(font, text) {
    var normalized = normalizePdfText(text);
    var output = "";
    Array.from(normalized).forEach(function (char) {
      try {
        font.encodeText(char);
        output += char;
      } catch (e) {
        output += "?";
      }
    });
    return output;
  }

  function wrapText(font, text, size, maxWidth) {
    var safeText = safeForFont(font, text);
    var words = safeText.split(/\s+/).filter(Boolean);
    if (words.length === 0) return [""];

    var lines = [];
    var current = words[0];

    for (var i = 1; i < words.length; i++) {
      var candidate = current + " " + words[i];
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        current = candidate;
      } else {
        lines.push(current);
        current = words[i];
      }
    }
    lines.push(current);
    return lines;
  }

  function fieldNumber(name) {
    var match = String(name || "").match(/(\d+)\s*$/);
    return match ? parseInt(match[1], 10) : 0;
  }

  function isTextField(field) {
    return field && typeof field.setText === "function";
  }

  function samePdfRef(a, b) {
    if (!a || !b) return false;
    try { return String(a) === String(b); }
    catch (e) { return a === b; }
  }

  function findModifierFields(pdf, form) {
    var allFields = form.getFields();
    var named = allFields.filter(function (field) {
      if (!isTextField(field)) return false;
      var name = "";
      try { name = field.getName(); } catch (e) {}
      return /modif/i.test(name);
    });

    // The current French and English templates use descriptive field names, so
    // this normally resolves the five Modifiers lines without relying on layout.
    if (named.length > 0) {
      named.sort(function (a, b) {
        var aName = "";
        var bName = "";
        try { aName = a.getName(); } catch (e) {}
        try { bName = b.getName(); } catch (e) {}
        var numberDiff = fieldNumber(aName) - fieldNumber(bName);
        return numberDiff || aName.localeCompare(bName);
      });
      return named.slice(0, 5);
    }

    // Layout fallback for alternate templates. Restrict widgets to page 1 and
    // the lower-left Modifiers area so page-2 equipment fields cannot be chosen.
    var pages = pdf.getPages();
    if (!pages.length) return [];
    var firstPage = pages[0];
    var size = firstPage.getSize();
    var candidates = [];

    allFields.forEach(function (field) {
      if (!isTextField(field)) return;
      try {
        var widgets = field.acroField.getWidgets();
        widgets.forEach(function (widget) {
          var pageRef = typeof widget.P === "function" ? widget.P() : null;
          if (!pageRef || !firstPage.ref || !samePdfRef(pageRef, firstPage.ref)) return;

          var rect = widget.getRectangle();
          var inModifierArea =
            rect.x < size.width * 0.38 &&
            rect.y > size.height * 0.035 &&
            rect.y < size.height * 0.19 &&
            rect.width > size.width * 0.16 &&
            rect.height < size.height * 0.04;

          if (inModifierArea) {
            candidates.push({ field: field, x: rect.x, y: rect.y });
          }
        });
      } catch (e) {}
    });

    candidates.sort(function (a, b) {
      if (Math.abs(b.y - a.y) > 0.5) return b.y - a.y;
      return a.x - b.x;
    });

    var seen = {};
    var result = [];
    candidates.forEach(function (entry) {
      var name = "";
      try { name = entry.field.getName(); } catch (e) {}
      if (!name || seen[name]) return;
      seen[name] = true;
      result.push(entry.field);
    });

    return result.slice(0, 5);
  }

  function modifierFontSize(text) {
    var length = normalizePdfText(text).length;
    if (length > 105) return 4;
    if (length > 85) return 4.5;
    if (length > 68) return 5;
    if (length > 52) return 5.5;
    return 6.5;
  }

  function fillModifierFields(pdf, form, modifiers) {
    var fields = findModifierFields(pdf, form);
    var count = Math.min(fields.length, modifiers.length);

    for (var i = 0; i < fields.length; i++) {
      var text = i < modifiers.length ? normalizePdfText(modifiers[i]) : "";
      try {
        if (typeof fields[i].setFontSize === "function") {
          fields[i].setFontSize(modifierFontSize(text));
        }
      } catch (e) {}
      try { fields[i].setText(text); } catch (e) {}
    }

    return count;
  }

  async function appendModifierPages(pdf, modifiers) {
    if (!modifiers || modifiers.length === 0) return;

    var pages = pdf.getPages();
    var referencePage = pages.length > 0 ? pages[0] : null;
    var referenceSize = referencePage ? referencePage.getSize() : { width: 595.28, height: 841.89 };
    var regular = await pdf.embedFont(PDFLib.StandardFonts.Helvetica);
    var bold = await pdf.embedFont(PDFLib.StandardFonts.HelveticaBold);
    var black = PDFLib.rgb(0, 0, 0);
    var muted = PDFLib.rgb(0.35, 0.35, 0.35);
    var margin = 48;
    var titleSize = 18;
    var subtitleSize = 9;
    var bodySize = 10;
    var lineHeight = 14;
    var maxWidth = referenceSize.width - margin * 2;
    var page = null;
    var y = 0;

    function startPage() {
      page = pdf.addPage([referenceSize.width, referenceSize.height]);
      y = referenceSize.height - margin;
      page.drawText(safeForFont(bold, appendixTitle()), {
        x: margin,
        y: y,
        size: titleSize,
        font: bold,
        color: black
      });
      y -= 22;
      page.drawText(safeForFont(regular, appendixSubtitle()), {
        x: margin,
        y: y,
        size: subtitleSize,
        font: regular,
        color: muted
      });
      y -= 24;
    }

    function ensureSpace(requiredHeight) {
      if (!page || y - requiredHeight < margin) startPage();
    }

    startPage();

    modifiers.forEach(function (modifier, index) {
      var wrapped = wrapText(regular, modifier, bodySize, maxWidth - 16);
      var required = wrapped.length * lineHeight + 10;
      ensureSpace(required);

      page.drawText(String(index + 1) + ".", {
        x: margin,
        y: y,
        size: bodySize,
        font: bold,
        color: black
      });

      wrapped.forEach(function (line, lineIndex) {
        page.drawText(line, {
          x: margin + 16,
          y: y - lineIndex * lineHeight,
          size: bodySize,
          font: regular,
          color: black
        });
      });

      y -= required;
    });
  }

  async function exportModifiers(pdf, store) {
    var modifiers = collectModifierLines(store);
    if (modifiers.length === 0) return;

    var form;
    try { form = pdf.getForm(); } catch (e) { form = null; }

    var filledCount = form ? fillModifierFields(pdf, form, modifiers) : 0;
    var overflow = modifiers.slice(filledCount);

    // If the template exposes fewer Modifier fields than expected, no data is
    // discarded: anything that does not fit is retained on continuation pages.
    if (overflow.length > 0) {
      await appendModifierPages(pdf, overflow);
    }
  }

  PDFLib.PDFDocument.prototype.save = async function () {
    if (!processedDocuments.has(this)) {
      processedDocuments.add(this);
      try {
        var store = window.__charStore;
        if (store) await exportModifiers(this, store);
      } catch (error) {
        console.warn("Could not export character modifiers to PDF.", error);
      }
    }

    return originalSave.apply(this, arguments);
  };
})();
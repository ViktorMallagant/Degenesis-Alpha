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
    return count === 1 ? "" : "s";
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

    if (store && store.entrepreneurSocialPenalties) {
      Array.from(store.entrepreneurSocialPenalties).forEach(function (penalty) {
        var cultName = i18nTranslate("culturesConceptsCults." + penalty.cultKey);
        var translated = i18nTranslate("messages.entrepreneurPenalty", {
          count: penalty.count,
          cult: cultName,
          plural: pluralSuffix(penalty.count)
        });
        if (translated && translated !== "messages.entrepreneurPenalty") {
          lines.push(String(translated));
        }
      });
    }

    return lines;
  }

  function appendixTitle() {
    if (locale() === "fr") return "MODIFICATEURS";
    if (locale() === "de") return "MODIFIKATOREN";
    return "MODIFIERS";
  }

  function appendixSubtitle() {
    if (locale() === "fr") return "Modificateurs actifs au moment de l'export";
    if (locale() === "de") return "Aktive Modifikatoren zum Zeitpunkt des Exports";
    return "Active modifiers at time of export";
  }

  function normalizePdfText(text) {
    return String(text == null ? "" : text)
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/\u2212/g, "-")
      .replace(/\u00D7/g, "x")
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

  async function appendModifierPages(pdf, store) {
    var modifiers = collectModifierLines(store);
    if (modifiers.length === 0) return;

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

  PDFLib.PDFDocument.prototype.save = async function () {
    if (!processedDocuments.has(this)) {
      processedDocuments.add(this);
      try {
        var store = window.__charStore;
        if (store) await appendModifierPages(this, store);
      } catch (error) {
        console.warn("Could not append character modifiers to PDF export.", error);
      }
    }

    return originalSave.apply(this, arguments);
  };
})();

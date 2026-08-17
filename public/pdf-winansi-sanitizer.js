(function () {
  "use strict";

  var PDFLib = window.PDFLib;
  if (!PDFLib || !PDFLib.PDFDocument || !PDFLib.PDFDocument.prototype) return;

  var originalSave = PDFLib.PDFDocument.prototype.save;
  var sanitizedDocuments = new WeakSet();

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
      .replace(/\u00A0/g, " ")
      .replace(/\r\n?/g, "\n")
      .replace(/\t/g, " ");
  }

  function safeForWinAnsi(font, text) {
    var normalized = normalizePdfText(text);
    var output = "";

    Array.from(normalized).forEach(function (char) {
      // pdf-lib handles line breaks separately when generating multiline field
      // appearances, so preserve them without asking WinAnsi to encode them.
      if (char === "\n") {
        output += char;
        return;
      }

      try {
        font.encodeText(char);
        output += char;
      } catch (e) {
        output += "?";
      }
    });

    return output;
  }

  async function sanitizeAllTextFields(pdf) {
    var form;
    try {
      form = pdf.getForm();
    } catch (e) {
      return;
    }

    var font;
    try {
      font = await pdf.embedFont(PDFLib.StandardFonts.Helvetica);
    } catch (e) {
      return;
    }

    form.getFields().forEach(function (field) {
      if (!field || typeof field.getText !== "function" || typeof field.setText !== "function") return;

      try {
        var current = field.getText();
        if (current == null) return;

        var safe = safeForWinAnsi(font, current);
        if (safe !== current) field.setText(safe);
      } catch (e) {
        // A malformed/nonstandard field should not prevent the rest of the PDF
        // from being sanitized and exported.
      }
    });
  }

  PDFLib.PDFDocument.prototype.save = async function () {
    if (!sanitizedDocuments.has(this)) {
      sanitizedDocuments.add(this);
      await sanitizeAllTextFields(this);
    }

    return originalSave.apply(this, arguments);
  };
})();

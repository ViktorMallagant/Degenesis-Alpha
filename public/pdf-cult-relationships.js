(function () {
  "use strict";

  var PDFLib = window.PDFLib;
  if (!PDFLib) return;

  var CARD_WIDTH = 2048;
  var CARD_HEIGHT = 1018;
  var CARD_RENDER_WIDTH = 768;
  var CARD_RENDER_HEIGHT = Math.round(CARD_RENDER_WIDTH * CARD_HEIGHT / CARD_WIDTH);

  var CULT_CARDS = [
    ["spitalians", "Spitalians", "01-CULT-CARDS-SPITALIAN.png"],
    ["chroniclers", "Chroniclers", "02-CULT-CARDS-CHRONICLER.png"],
    ["hellvetics", "Hellvetics", "03-CULT-CARDS-HELLVETIC.png"],
    ["judges", "Judges", "04-CULT-CARDS-JUDGE.png"],
    ["clanners", "Clanners", "05-CULT-CARDS-CLANNER.png"],
    ["scrappers", "Scrappers", "06-CULT-CARDS-SCRAPPER.png"],
    ["neolibyans", "Neolibyans", "07-CULT-CARDS-NEOLIBYAN.png"],
    ["scourgers", "Scourgers", "08-CULT-CARDS-SCOURGER.png"],
    ["anubians", "Anubians", "09-CULT-CARDS-ANUBIAN.png"],
    ["jehammedans", "Jehammedans", "10-CULT-CARDS-JEHAMMEDAN.png"],
    ["apocalyptics", "Apocalyptics", "11-CULT-CARDS-APOCALYPTICS.png"],
    ["anabaptists", "Anabaptists", "12-CULT-CARDS-ANABAPTIST.png"],
    ["palers", "Palers", "13-CULT-CARDS-PALER.png"]
  ];

  var PIP_LAYOUTS = {
    1: [[0.5, 0.5]],
    2: [[0.28, 0.72], [0.72, 0.28]],
    3: [[0.28, 0.72], [0.5, 0.5], [0.72, 0.28]],
    4: [[0.28, 0.72], [0.72, 0.72], [0.28, 0.28], [0.72, 0.28]],
    5: [[0.28, 0.72], [0.72, 0.72], [0.5, 0.5], [0.28, 0.28], [0.72, 0.28]],
    6: [[0.28, 0.72], [0.72, 0.72], [0.28, 0.5], [0.72, 0.5], [0.28, 0.28], [0.72, 0.28]]
  };

  function translate(key, fallback) {
    try {
      var i18n = window.__i18n;
      var translated = (i18n.global || i18n).t(key);
      return translated && translated !== key ? String(translated) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function clampRelationship(value) {
    var numeric = Number(value);
    if (!Number.isFinite(numeric)) return 0;
    return Math.max(-6, Math.min(6, Math.trunc(numeric)));
  }

  function safeForFont(font, text) {
    var output = "";
    Array.from(String(text == null ? "" : text)).forEach(function (character) {
      try {
        font.encodeText(character);
        output += character;
      } catch (e) {
        output += "?";
      }
    });
    return output;
  }

  function drawTrackedText(page, font, text, x, y, size, color, tracking) {
    Array.from(text).forEach(function (character) {
      page.drawText(character, { x: x, y: y, size: size, font: font, color: color });
      x += font.widthOfTextAtSize(character, size) + tracking;
    });
  }

  function trackedTextWidth(font, text, size, tracking) {
    if (!text) return 0;
    return font.widthOfTextAtSize(text, size) + tracking * Math.max(0, Array.from(text).length - 1);
  }

  function drawDiamond(page, x, y, radius, color) {
    var points = [
      [x, y + radius],
      [x + radius, y],
      [x, y - radius],
      [x - radius, y]
    ];
    for (var index = 0; index < points.length; index++) {
      page.drawLine({
        start: { x: points[index][0], y: points[index][1] },
        end: { x: points[(index + 1) % points.length][0], y: points[(index + 1) % points.length][1] },
        thickness: 0.7,
        color: color
      });
    }
  }

  function drawDecoratedHeading(page, font, text, centerY, pageWidth, margin, size, color, tracking) {
    var width = trackedTextWidth(font, text, size, tracking);
    var textX = (pageWidth - width) / 2;
    var gap = 13;
    var outerX = margin;
    var leftEnd = textX - gap;
    var rightStart = textX + width + gap;
    var dogleg = 7;
    var shoulder = 49;

    drawDiamond(page, outerX, centerY, 3.5, color);
    drawDiamond(page, pageWidth - outerX, centerY, 3.5, color);

    page.drawLine({ start: { x: outerX + 4, y: centerY }, end: { x: outerX + shoulder, y: centerY }, thickness: 0.7, color: color });
    page.drawLine({ start: { x: outerX + shoulder, y: centerY }, end: { x: outerX + shoulder + dogleg, y: centerY - 6 }, thickness: 0.7, color: color });
    page.drawLine({ start: { x: outerX + shoulder + dogleg, y: centerY - 6 }, end: { x: leftEnd, y: centerY - 6 }, thickness: 0.7, color: color });

    page.drawLine({ start: { x: pageWidth - outerX - 4, y: centerY }, end: { x: pageWidth - outerX - shoulder, y: centerY }, thickness: 0.7, color: color });
    page.drawLine({ start: { x: pageWidth - outerX - shoulder, y: centerY }, end: { x: pageWidth - outerX - shoulder - dogleg, y: centerY - 6 }, thickness: 0.7, color: color });
    page.drawLine({ start: { x: pageWidth - outerX - shoulder - dogleg, y: centerY - 6 }, end: { x: rightStart, y: centerY - 6 }, thickness: 0.7, color: color });

    // The title sits on the lower, inward-running part of the ornament.
    // Centering it on that line keeps the text from appearing too high.
    drawTrackedText(page, font, text, textX, centerY - 6 - size * 0.35, size, color, tracking);
  }

  function imageToPngBytes(path) {
    return new Promise(function (resolve) {
      var image = new Image();
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = CARD_RENDER_WIDTH;
        canvas.height = CARD_RENDER_HEIGHT;
        var context = canvas.getContext("2d");
        if (!context) {
          resolve(null);
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(function (blob) {
          if (!blob) {
            resolve(null);
            return;
          }
          blob.arrayBuffer().then(function (buffer) {
            resolve(new Uint8Array(buffer));
          }, function () {
            resolve(null);
          });
        }, "image/png");
      };
      image.onerror = function () { resolve(null); };
      image.src = new URL("cult-cards/" + path, window.location.href).href;
    });
  }

  async function loadCardImages(pdf) {
    var images = [];
    for (var index = 0; index < CULT_CARDS.length; index++) {
      var bytes = await imageToPngBytes(CULT_CARDS[index][2]);
      images.push(bytes ? await pdf.embedPng(bytes) : null);
    }
    return images;
  }

  function drawDie(page, value, x, y, size) {
    value = clampRelationship(value);
    if (value === 0) return;

    var positive = value > 0;
    var face = positive ? PDFLib.rgb(0.96, 0.96, 0.96) : PDFLib.rgb(0.035, 0.035, 0.035);
    var edge = positive ? PDFLib.rgb(0.08, 0.08, 0.08) : PDFLib.rgb(0.9, 0.9, 0.9);
    var pip = positive ? PDFLib.rgb(0.04, 0.04, 0.04) : PDFLib.rgb(0.97, 0.97, 0.97);

    page.drawRectangle({
      x: x,
      y: y,
      width: size,
      height: size,
      color: face,
      borderColor: edge,
      borderWidth: 0.8
    });

    var radius = size * 0.065;
    PIP_LAYOUTS[Math.abs(value)].forEach(function (position) {
      page.drawCircle({
        x: x + size * position[0],
        y: y + size * position[1],
        size: radius,
        color: pip
      });
    });
  }

  function drawMissingCard(page, card, x, y, width, height, regular, bold) {
    page.drawRectangle({
      x: x,
      y: y,
      width: width,
      height: height,
      color: PDFLib.rgb(0.025, 0.025, 0.025),
      borderColor: PDFLib.rgb(0.35, 0.35, 0.35),
      borderWidth: 0.8
    });
    page.drawText(safeForFont(bold, card[1]), {
      x: x + 10,
      y: y + height / 2 + 2,
      size: 11,
      font: bold,
      color: PDFLib.rgb(0.95, 0.95, 0.95)
    });
    page.drawText("Card image unavailable", {
      x: x + 10,
      y: y + height / 2 - 12,
      size: 7,
      font: regular,
      color: PDFLib.rgb(0.65, 0.65, 0.65)
    });
  }

  async function appendCultRelationshipsPage(pdf, store) {
    if (!pdf || !store || !store.cultRelationships) return;

    var pageWidth = 595.28;
    var pageHeight = 841.89;
    var page = pdf.addPage([pageWidth, pageHeight]);
    var regular = await pdf.embedFont(PDFLib.StandardFonts.Helvetica);
    var bold = await pdf.embedFont(PDFLib.StandardFonts.HelveticaBold);
    var cardImages = await loadCardImages(pdf);
    var titleColor = PDFLib.rgb(0.06, 0.06, 0.06);
    var margin = 28;
    var columnGap = 10;
    var rowGap = 10;
    var cardWidth = (pageWidth - margin * 2 - columnGap * 2) / 3;
    var cardHeight = cardWidth * CARD_HEIGHT / CARD_WIDTH;
    var gridTop = 752;

    page.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
      color: PDFLib.rgb(1, 1, 1)
    });
    var title = safeForFont(
      regular,
      translate("messages.cultRelationships.title", "Cult Relationships").toUpperCase()
    );
    drawDecoratedHeading(page, regular, title, 810, pageWidth, margin, 10, titleColor, 1.75);

    var nameLabel = "NAME:";
    var nameLabelSize = 7;
    var nameLabelTracking = 0.35;
    var nameBlockWidth = 280;
    var nameBlockX = (pageWidth - nameBlockWidth) / 2;
    var nameLabelWidth = trackedTextWidth(regular, nameLabel, nameLabelSize, nameLabelTracking);
    var nameLineStart = nameBlockX + nameLabelWidth + 10;
    var nameLineY = 779;
    drawTrackedText(page, regular, nameLabel, nameBlockX, nameLineY + 2, nameLabelSize, titleColor, nameLabelTracking);
    page.drawLine({
      start: { x: nameLineStart, y: nameLineY },
      end: { x: nameBlockX + nameBlockWidth, y: nameLineY },
      thickness: 0.55,
      color: titleColor
    });
    if (store.characterName) {
      var safeName = safeForFont(regular, store.characterName);
      var nameSize = 8.5;
      var nameWidth = regular.widthOfTextAtSize(safeName, nameSize);
      var nameLineEnd = nameBlockX + nameBlockWidth;
      page.drawText(safeName, {
        x: nameLineStart + Math.max(4, (nameLineEnd - nameLineStart - nameWidth) / 2),
        y: nameLineY + 3,
        size: nameSize,
        font: regular,
        color: titleColor
      });
    }

    CULT_CARDS.forEach(function (card, index) {
      var row = Math.floor(index / 3);
      var column = index % 3;
      var x = margin + column * (cardWidth + columnGap);
      if (index === CULT_CARDS.length - 1) x = (pageWidth - cardWidth) / 2;
      var y = gridTop - cardHeight - row * (cardHeight + rowGap);

      if (cardImages[index]) {
        page.drawImage(cardImages[index], {
          x: x,
          y: y,
          width: cardWidth,
          height: cardHeight
        });
        page.drawRectangle({
          x: x,
          y: y,
          width: cardWidth,
          height: cardHeight,
          borderColor: PDFLib.rgb(0.72, 0.72, 0.72),
          borderWidth: 0.65
        });
      } else {
        drawMissingCard(page, card, x, y, cardWidth, cardHeight, regular, bold);
      }

      var value = clampRelationship(store.cultRelationships[card[0]]);
      var dieSize = 24;
      drawDie(page, value, x + cardWidth - dieSize - 6, y + 6, dieSize);
    });

    drawDecoratedHeading(page, regular, "NOTES", 246, pageWidth, margin, 9, titleColor, 1.8);
    var notes = store.other && Array.isArray(store.other.notes) ? store.other.notes : [];
    var notesLeft = margin + 18;
    var notesRight = pageWidth - margin - 18;
    var notesTop = 220;
    var notesStep = 16.2;
    for (var noteIndex = 0; noteIndex < 10; noteIndex++) {
      var lineY = notesTop - noteIndex * notesStep;
      page.drawLine({
        start: { x: notesLeft, y: lineY },
        end: { x: notesRight, y: lineY },
        thickness: 0.45,
        color: PDFLib.rgb(0.42, 0.42, 0.42)
      });
      if (notes[noteIndex]) {
        page.drawText(safeForFont(regular, notes[noteIndex]), {
          x: notesLeft + 4,
          y: lineY + 3,
          size: 7.5,
          font: regular,
          color: titleColor
        });
      }
    }
  }

  window.appendCultRelationshipsPage = appendCultRelationshipsPage;
})();

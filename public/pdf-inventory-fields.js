(function () {
  "use strict";

  var PDFLib = window.PDFLib;
  if (!PDFLib || !PDFLib.PDFDocument || !PDFLib.PDFDocument.prototype) return;

  var previousSave = PDFLib.PDFDocument.prototype.save;
  var processedDocuments = new WeakSet();

  var WEAPON_CATEGORIES = [
    "brawlingweapons", "meleeweapons", "thrownweapons", "projectiles",
    "handguns", "rifles", "heavyweapons", "sonicweapons", "artillery"
  ];
  var ARMOR_CATEGORIES = ["armor", "shields"];

  function locale() {
    return localStorage.getItem("locale") || "en";
  }

  function continuationText(key) {
    var language = locale();
    var labels = {
      en: {
        title: "EQUIPMENT - CONTINUED",
        subtitle: "Additional equipment that does not fit on the character sheet",
        weapon: "WEAPON",
        armor: "ARMOR",
        equipment: "EQUIPMENT",
        handling: "HANDLING",
        range: "RANGE",
        damage: "DAMAGE",
        magazine: "MAG",
        value: "VALUE",
        slots: "SLOTS",
        encumbrance: "ENC",
        tech: "TECH",
        properties: "PROPERTIES"
      },
      fr: {
        title: "ÉQUIPEMENT - SUITE",
        subtitle: "Équipement supplémentaire ne tenant pas sur la fiche",
        weapon: "ARME",
        armor: "ARMURE",
        equipment: "ÉQUIPEMENT",
        handling: "MANIEMENT",
        range: "PORTÉE",
        damage: "DÉGÂTS",
        magazine: "CHARG",
        value: "VALEUR",
        slots: "EMPL",
        encumbrance: "ENC",
        tech: "TECH",
        properties: "PROPRIÉTÉS"
      },
      de: {
        title: "AUSRÜSTUNG - FORTSETZUNG",
        subtitle: "Zusätzliche Ausrüstung, die nicht auf das Charakterblatt passt",
        weapon: "WAFFE",
        armor: "RÜSTUNG",
        equipment: "AUSRÜSTUNG",
        handling: "HANDHABUNG",
        range: "REICHWEITE",
        damage: "SCHADEN",
        magazine: "MAG",
        value: "WERT",
        slots: "PLÄTZE",
        encumbrance: "LAST",
        tech: "TECH",
        properties: "EIGENSCHAFTEN"
      }
    };
    return (labels[language] || labels.en)[key];
  }

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
    Array.from(normalized).forEach(function (character) {
      try {
        font.encodeText(character);
        output += character;
      } catch (e) {
        output += "?";
      }
    });
    return output;
  }

  function wrapText(font, text, size, maxWidth) {
    var safeText = safeForFont(font, text);
    var words = safeText.split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];

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

  function inventoryItems(store) {
    var allItems = window.__items || [];
    var result = [];
    var itemGroups = {};

    (store && store.inventory ? store.inventory : []).forEach(function (purchase) {
      var item = allItems.find(function (candidate) {
        return candidate.id === purchase.itemId;
      });
      if (!item) return;

      var resolved = Object.assign({}, item, {
        _level: purchase.level || 1,
        _count: 1
      });

      var groupKey = item.id + "|" + (purchase.level || 1);
      if (itemGroups[groupKey]) {
        itemGroups[groupKey]._count += 1;
        return;
      }

      itemGroups[groupKey] = resolved;
      result.push(resolved);
    });

    return result;
  }

  function splitInventory(store) {
    var items = inventoryItems(store);
    var weapons = items.filter(function (item) {
      return WEAPON_CATEGORIES.indexOf(item.category) !== -1;
    });
    var armors = items.filter(function (item) {
      return ARMOR_CATEGORIES.indexOf(item.category) !== -1;
    });
    var other = items.filter(function (item) {
      return WEAPON_CATEGORIES.indexOf(item.category) === -1 &&
        ARMOR_CATEGORIES.indexOf(item.category) === -1;
    });
    var possessions = other.concat(weapons.slice(5), armors.slice(3));

    return {
      weapons: weapons,
      armors: armors,
      possessions: possessions,
      overflow: possessions.slice(14)
    };
  }

  function displayName(item) {
    var name = item && item.name ? item.name : "";
    if (item && item._level > 1) name += " (Lv. " + item._level + ")";
    return item && item._count > 1 ? name + " x" + item._count : name;
  }

  function displayEncumbrance(item) {
    if (!item || item.encumbrance == null) return "";
    return String(item.encumbrance * (item._count || 1));
  }

  function addStat(parts, label, value) {
    if (value == null || String(value).trim() === "") return;
    parts.push(label + ": " + value);
  }

  function itemSummary(item) {
    var parts = [];
    var isWeapon = WEAPON_CATEGORIES.indexOf(item.category) !== -1;
    var isArmor = ARMOR_CATEGORIES.indexOf(item.category) !== -1;

    parts.push(continuationText(isWeapon ? "weapon" : isArmor ? "armor" : "equipment"));
    if (isWeapon) {
      addStat(parts, continuationText("handling"), item.handling);
      addStat(parts, continuationText("range"), item.range);
      addStat(parts, continuationText("damage"), item.damage);
      addStat(parts, continuationText("magazine"), item.magazine);
    }
    if (isArmor) addStat(parts, continuationText("value"), item.armorValue);
    addStat(parts, continuationText("slots"), item.slots);
    addStat(parts, continuationText("encumbrance"), displayEncumbrance(item));
    addStat(parts, continuationText("tech"), item.techLevel);
    return parts.join("  |  ");
  }

  async function appendInventoryPages(pdf, overflow) {
    if (!overflow || overflow.length === 0) return;

    var pages = pdf.getPages();
    var referencePage = pages.length > 0 ? pages[0] : null;
    var size = referencePage ? referencePage.getSize() : { width: 595.28, height: 841.89 };
    var regular = await pdf.embedFont(PDFLib.StandardFonts.Helvetica);
    var bold = await pdf.embedFont(PDFLib.StandardFonts.HelveticaBold);
    var black = PDFLib.rgb(0, 0, 0);
    var muted = PDFLib.rgb(0.35, 0.35, 0.35);
    var rule = PDFLib.rgb(0.78, 0.78, 0.78);
    var margin = 48;
    var maxWidth = size.width - margin * 2;
    var page = null;
    var y = 0;

    function startPage() {
      page = pdf.addPage([size.width, size.height]);
      y = size.height - margin;
      page.drawText(safeForFont(bold, continuationText("title")), {
        x: margin,
        y: y,
        size: 18,
        font: bold,
        color: black
      });
      y -= 22;
      page.drawText(safeForFont(regular, continuationText("subtitle")), {
        x: margin,
        y: y,
        size: 9,
        font: regular,
        color: muted
      });
      y -= 26;
    }

    function ensureSpace(height) {
      if (!page || y - height < margin) startPage();
    }

    startPage();
    overflow.forEach(function (item, index) {
      var title = String(index + 1) + ". " + displayName(item);
      var titleLines = wrapText(bold, title, 10, maxWidth);
      var summaryLines = wrapText(regular, itemSummary(item), 8.5, maxWidth);
      var propertyText = item.properties
        ? continuationText("properties") + ": " + item.properties
        : "";
      var propertyLines = wrapText(regular, propertyText, 8.5, maxWidth);
      var required = titleLines.length * 13 + summaryLines.length * 11 + propertyLines.length * 11 + 12;
      ensureSpace(required);

      titleLines.forEach(function (line, lineIndex) {
        page.drawText(line, {
          x: margin,
          y: y - lineIndex * 13,
          size: 10,
          font: bold,
          color: black
        });
      });
      y -= titleLines.length * 13;

      summaryLines.concat(propertyLines).forEach(function (line) {
        page.drawText(line, {
          x: margin,
          y: y,
          size: 8.5,
          font: regular,
          color: black
        });
        y -= 11;
      });

      y -= 4;
      page.drawLine({
        start: { x: margin, y: y },
        end: { x: size.width - margin, y: y },
        thickness: 0.5,
        color: rule
      });
      y -= 8;
    });
  }

  function getTextField(form, name) {
    try {
      return form.getTextField(name);
    } catch (e) {
      return null;
    }
  }

  function setFirstExisting(form, names, value) {
    for (var i = 0; i < names.length; i++) {
      var field = getTextField(form, names[i]);
      if (!field) continue;
      field.setText(value == null ? "" : String(value));
      return true;
    }
    return false;
  }

  function fieldIndex(name) {
    var match = String(name || "").match(/(\d+)\s*$/);
    return match ? parseInt(match[1], 10) : 0;
  }

  function findIndexedFields(form, predicate) {
    var result = [];
    try {
      form.getFields().forEach(function (field) {
        if (!field || typeof field.setText !== "function") return;
        var name = "";
        try { name = field.getName(); } catch (e) { return; }
        if (predicate(name)) result.push(field);
      });
    } catch (e) {}

    result.sort(function (a, b) {
      var aName = "";
      var bName = "";
      try { aName = a.getName(); } catch (e) {}
      try { bName = b.getName(); } catch (e) {}
      var diff = fieldIndex(aName) - fieldIndex(bName);
      return diff || aName.localeCompare(bName);
    });
    return result;
  }

  function setIndexedFallback(fields, index, value) {
    if (!fields || !fields[index]) return false;
    try {
      fields[index].setText(value == null ? "" : String(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function correctEnglishInventory(form, inventory) {
    if (!getTextField(form, "Weapon1")) return;

    var rangeFields = findIndexedFields(form, function (name) {
      return /(?:range|distance)/i.test(name) && !/(?:armor|armour)/i.test(name);
    });
    var armorValueFields = findIndexedFields(form, function (name) {
      return /(?:armor|armour).*(?:value|rating)|(?:value|rating).*(?:armor|armour)/i.test(name);
    });

    inventory.weapons.slice(0, 5).forEach(function (item, idx) {
      var n = idx + 1;

      // Range belongs in its own Range/Distance column, never in Qualities.
      var rangeSet = setFirstExisting(form, [
        "Range" + n,
        "Distance" + n,
        "WeaponRange" + n,
        "Weapon Range" + n,
        "WeaponDistance" + n,
        "Weapon Distance" + n,
        "Dist" + n
      ], item.range || "");
      if (!rangeSet) setIndexedFallback(rangeFields, idx, item.range || "");

      // If the template exposes a dedicated caliber field, use it. Otherwise
      // caliber is deliberately omitted instead of being pushed into Qualities.
      setFirstExisting(form, [
        "Caliber" + n,
        "Calibre" + n,
        "WeaponCaliber" + n,
        "Weapon Caliber" + n,
        "WeaponCalibre" + n,
        "Weapon Calibre" + n
      ], item.caliber || "");

      // Overwrite the old fill-pdf behavior that combined caliber, range and
      // qualities in this field. Only actual qualities/properties belong here.
      setFirstExisting(form, [
        "Properties" + n,
        "Qualities" + n,
        "Quality" + n,
        "WeaponProperties" + n,
        "Weapon Properties" + n,
        "WeaponQualities" + n,
        "Weapon Qualities" + n
      ], item.properties || "");
    });

    inventory.armors.slice(0, 3).forEach(function (item, idx) {
      var n = idx + 1;
      var armorSet = setFirstExisting(form, [
        "ArmorValue" + n,
        "Armor Value" + n,
        "ArmorRating" + n,
        "Armor Rating" + n,
        "ArmourValue" + n,
        "Armour Value" + n,
        "ArmourRating" + n,
        "Armour Rating" + n
      ], item.armorValue != null ? item.armorValue : "");
      if (!armorSet) {
        setIndexedFallback(armorValueFields, idx, item.armorValue != null ? item.armorValue : "");
      }
    });
  }

  function correctFrenchInventory(form, inventory) {
    if (!getTextField(form, "ARME1")) return;

    // The French character sheet uses generic Row fields for the weapon table.
    // Keep range, damage and properties aligned with their printed columns.
    inventory.weapons.slice(0, 5).forEach(function (item, idx) {
      var n = idx + 1;
      setFirstExisting(form, ["Row" + n], item.range || "");
      setFirstExisting(form, ["Row" + n + "_2"], item.damage || "");
      setFirstExisting(form, ["Row" + n + "_3"], item.properties || "");
    });

    inventory.armors.slice(0, 3).forEach(function (item, idx) {
      var n = idx + 1;
      setFirstExisting(form, ["VALEUR DARMURERow" + n], item.armorValue != null ? item.armorValue : "");
    });
  }

  function correctInventoryFields(pdf) {
    var store = window.__charStore;
    if (!store) return;

    var form;
    try { form = pdf.getForm(); } catch (e) { return; }

    var inventory = splitInventory(store);
    correctEnglishInventory(form, inventory);
    correctFrenchInventory(form, inventory);
  }

  async function exportInventoryOverflow(pdf) {
    var store = window.__charStore;
    if (!store) return;
    var inventory = splitInventory(store);
    await appendInventoryPages(pdf, inventory.overflow);
  }

  PDFLib.PDFDocument.prototype.save = async function () {
    if (!processedDocuments.has(this)) {
      processedDocuments.add(this);
      try {
        correctInventoryFields(this);
        await exportInventoryOverflow(this);
      } catch (error) {
        console.warn("Could not export PDF inventory fields or overflow.", error);
      }
    }

    return previousSave.apply(this, arguments);
  };
})();

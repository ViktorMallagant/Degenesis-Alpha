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

  function inventoryItems(store) {
    var allItems = window.__items || [];
    var result = [];

    (store && store.inventory ? store.inventory : []).forEach(function (purchase) {
      var item = allItems.find(function (candidate) {
        return candidate.id === purchase.itemId;
      });
      if (item) result.push(item);
    });

    return result;
  }

  function splitInventory(store) {
    var items = inventoryItems(store);
    return {
      weapons: items.filter(function (item) {
        return WEAPON_CATEGORIES.indexOf(item.category) !== -1;
      }),
      armors: items.filter(function (item) {
        return ARMOR_CATEGORIES.indexOf(item.category) !== -1;
      })
    };
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

  PDFLib.PDFDocument.prototype.save = async function () {
    if (!processedDocuments.has(this)) {
      processedDocuments.add(this);
      try {
        correctInventoryFields(this);
      } catch (error) {
        console.warn("Could not correct PDF inventory fields.", error);
      }
    }

    return previousSave.apply(this, arguments);
  };
})();
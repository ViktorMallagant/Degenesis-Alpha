(function () {
  "use strict";

  var SKILL_TO_PDF = {
    athletics: "ATHLE",
    brawl: "LUTTE",
    force: "FORCE",
    melee: "CAC",
    stamina: "VIG",
    toughness: "RESIST",
    projectiles: "TIR",
    crafting: "ARTISA",
    dexterity: "DEX",
    stealth: "FUFU",
    mobility: "MOBIL",
    navigation: "NAVIG",
    arts: "ART",
    conduct: "CONSIDER",
    expression: "EXPRESS",
    leadership: "COMMAND",
    negotiation: "NEGOC",
    seduction: "SEDUC",
    empathy: "EMPTH",
    orienteering: "ORIENT",
    perception: "PERCEPT",
    primal: "PULS",
    survival: "SURVIE",
    taming: "DRESS",
    domination: "DOMIN",
    faith: "FOI",
    reaction: "REACT",
    cunning: "RUSE",
    deception: "TROMPE",
    willpower: "VOL",
    focus: "CONCENTR",
    artifactLore: "ARTEFACT",
    legends: "LEGEND",
    medicine: "MED",
    science: "SCIENCE",
    engineering: "TECHNO"
  };

  var ATTR_TO_PDF = {
    body: "PHY",
    agility: "AGI",
    charisma: "CHAR",
    intellect: "INT",
    psyche: "PSY",
    instinct: "INS"
  };

  var ORIGIN_TO_PDF = {
    allies: "ALLIE",
    authority: "AUTOR",
    renown: "RENOM",
    network: "RESEAU",
    resources: "RESS",
    secrets: "SECRET"
  };

  function checkBoxes(form, prefix, value, start, end) {
    for (var i = start; i <= end; i++) {
      try {
        var cb = form.getCheckBox(prefix + i);
        if (i <= value) cb.check();
        else cb.uncheck();
      } catch (e) {}
    }
  }

  function safeSetText(form, fieldName, value) {
    try {
      var field = form.getTextField(fieldName);
      field.setText(value != null ? String(value) : "");
    } catch (e) {}
  }

  function tr(i18n, key, prefix) {
    try { return i18n.t(prefix + "." + key); }
    catch (e) { return key; }
  }

  function svgToPng(svgUrl, size) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext("2d");
        var w = img.naturalWidth || size;
        var h = img.naturalHeight || size;
        var scale = Math.min(size / w, size / h);
        var dw = w * scale;
        var dh = h * scale;
        var dx = (size - dw) / 2;
        var dy = (size - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
        canvas.toBlob(function (blob) {
          if (!blob) { resolve(null); return; }
          var reader = new FileReader();
          reader.onload = function () { resolve(new Uint8Array(reader.result)); };
          reader.readAsArrayBuffer(blob);
        }, "image/png");
      };
      img.onerror = function () { resolve(null); };
      img.src = svgUrl;
    });
  }

  async function embedPortrait(pdf, form, fieldName, dataUrl) {
    try {
      if (!dataUrl) return;
      var base64 = dataUrl.split(",")[1];
      var bytes = Uint8Array.from(atob(base64), function(c) { return c.charCodeAt(0); });
      var image;
      if (dataUrl.indexOf("image/png") >= 0) {
        image = await pdf.embedPng(bytes);
      } else {
        image = await pdf.embedJpg(bytes);
      }
      var button = form.getButton(fieldName);
      button.setImage(image);
    } catch (e) {}
  }

  async function embedImage(pdf, form, fieldName, svgPath, size) {
    try {
      var url = new URL(svgPath, window.location.href).href;
      var pngBytes = await svgToPng(url, size);
      if (!pngBytes) return;
      var image = await pdf.embedPng(pngBytes);
      var button = form.getButton(fieldName);
      button.setImage(image);
    } catch (e) {}
  }

  async function downloadFilledPDF() {
    var store = window.__charStore;
    var i18n = window.__i18n;

    if (!store) {
      alert("Veuillez d'abord ouvrir l'onglet Feuille de Personnage (PDF).");
      return;
    }

    var PDFLib = window.PDFLib;
    if (!PDFLib) {
      alert("Bibliothèque PDF non chargée. Rechargez la page.");
      return;
    }

    var pdfUrl = new URL("fiche_degenesis.pdf", window.location.href).href;
    var pdfBytes = await fetch(pdfUrl).then(function (r) { return r.arrayBuffer(); });
    var pdf = await PDFLib.PDFDocument.load(pdfBytes);
    var form = pdf.getForm();

    safeSetText(form, "NOM", store.characterName || "");
    safeSetText(form, "AGE", store.age != null ? String(store.age) : "");
    safeSetText(form, "SEXE", store.gender || "");
    safeSetText(form, "TAILLE", store.height != null ? String(store.height) : "");
    safeSetText(form, "POIDS", store.weight != null ? String(store.weight) : "");
    safeSetText(form, "EXPÉRIENCE", store.experience || "");

    var CULT_FACTORS = {
      "anabaptists": [50, "LC"], "anubians": [100, "dinars"],
      "apocalyptics": [200, "LC"], "palers": [50, "LC"],
      "chroniclers": [128, "LC"], "clanners": [50, "LC"],
      "scrappers": [50, "LC"], "scourgers": [100, "dinars"],
      "hellvetics": [50, "LC"], "jehammedans": [100, "LC"],
      "judges": [50, "LC"], "neolibyans": [1000, "dinars"],
      "spitalians": [100, "LC"]
    };
    if (store.cult && store.cult.name && CULT_FACTORS[store.cult.name]) {
      var cf = CULT_FACTORS[store.cult.name];
      var rankLevel = store.rank ? (store.rank.hierarchyLevel || 1) : 1;
      var resources = 0;
      store.origins.forEach(function (v, o) { if (o.name === "resources") resources = v; });
      var dinarsVal = (rankLevel + resources) * cf[0];
      safeSetText(form, "LC-DINARS", dinarsVal + " " + cf[1]);
    }

    if (store.culture && store.culture.name) {
      safeSetText(form, "CULTUREtxt", tr(i18n, store.culture.name, "culturesConceptsCults"));
      await embedImage(pdf, form, "Culture", "logotypes/cultures/" + store.culture.name + ".svg", 200);
    }
    if (store.concept && store.concept.name) {
      safeSetText(form, "CONCEPTtxt", tr(i18n, store.concept.name, "culturesConceptsCults"));
      await embedImage(pdf, form, "Concept", "logotypes/concepts/" + store.concept.name + ".svg", 200);
    }
    if (store.cult && store.cult.name) {
      safeSetText(form, "CULTEtxt", tr(i18n, store.cult.name, "culturesConceptsCults"));
      await embedImage(pdf, form, "Culte", "logotypes/cults/" + store.cult.name + ".svg", 200);
    }
    if (store.portrait) {
      await embedPortrait(pdf, form, "Portrait", store.portrait);
    }
    if (store.rank && store.rank.name) {
      safeSetText(form, "RANG", tr(i18n, store.rank.name, "ranks"));
    }
    if (store.clan && store.clan.name) {
      safeSetText(form, "GROUPE", tr(i18n, store.clan.name, "clans"));
    }

    store.attributes.forEach(function (value, attr) {
      var pdfPrefix = ATTR_TO_PDF[attr.name];
      if (pdfPrefix) checkBoxes(form, pdfPrefix, value, 2, 6);
    });

    store.skills.forEach(function (value, skill) {
      var pdfPrefix = SKILL_TO_PDF[skill.name];
      if (pdfPrefix) checkBoxes(form, pdfPrefix, value, 1, 6);
    });

    store.origins.forEach(function (value, origin) {
      var pdfPrefix = ORIGIN_TO_PDF[origin.name];
      if (pdfPrefix) checkBoxes(form, pdfPrefix, value, 1, 6);
    });

    var potIndex = 1;
    store.potentials.forEach(function (value, potential) {
      if (potIndex <= 6) {
        safeSetText(form, "POTENTIEL " + potIndex, tr(i18n, potential.name, "potentials"));
        for (var lvl = 1; lvl <= 3; lvl++) {
          try {
            var cb = form.getCheckBox("POT" + potIndex + "-" + lvl);
            if (lvl <= value) cb.check();
            else cb.uncheck();
          } catch (e) {}
        }
        potIndex++;
      }
    });

    var legacyFields = ["HÉRITAGE", "HÉRITAGE 1", "HÉRITAGE 2", "HÉRITAGE 3"];
    var legacyIndex = 0;
    store.legacies.forEach(function (value, legacy) {
      if (value > 0 && legacyIndex < legacyFields.length) {
        safeSetText(form, legacyFields[legacyIndex], tr(i18n, legacy.name, "legacies"));
        legacyIndex++;
      }
    });

    var egoMax = store.maxEgo || 0;
    for (var i = 1; i <= 24; i++) {
      try {
        var cb = form.getCheckBox("EGO" + i);
        if (i <= egoMax) cb.check(); else cb.uncheck();
      } catch (e) {}
    }

    var sporuMax = store.maxSporeInfestations || 0;
    for (var i = 1; i <= 24; i++) {
      try {
        var cb = form.getCheckBox("SPORU" + i);
        if (i <= sporuMax) cb.check(); else cb.uncheck();
      } catch (e) {}
    }

    var traumaMax = store.maxTrauma || 0;
    for (var i = 1; i <= 12; i++) {
      try {
        var cb = form.getCheckBox("TRAUMA" + i);
        if (i <= traumaMax) cb.check(); else cb.uncheck();
      } catch (e) {}
    }

    var fleshMax = store.maxFleshwounds || 0;
    for (var i = 1; i <= 24; i++) {
      try {
        var cb = form.getCheckBox("BS" + i);
        if (i <= fleshMax) cb.check(); else cb.uncheck();
      } catch (e) {}
    }

    var filledBytes = await pdf.save();
    var blob = new Blob([filledBytes], { type: "application/pdf" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = (store.characterName || "personnage").replace(/[^a-zA-Z0-9À-ɏ\s\-]/g, "") + "_fiche.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  window.downloadFilledPDF = downloadFilledPDF;

  function createButton() {
    var btn = document.createElement("button");
    btn.id = "fill-pdf-btn";
    btn.innerHTML = "&#x1F4C4; Télécharger PDF";
    btn.style.cssText =
      "position:fixed;bottom:24px;right:24px;z-index:9999;" +
      "padding:14px 28px;font-size:15px;font-weight:bold;" +
      "background:#B71C1C;color:#fff;border:2px solid #fff;" +
      "border-radius:12px;cursor:pointer;" +
      "box-shadow:0 4px 16px rgba(0,0,0,0.5);" +
      "font-family:inherit;transition:all 0.2s;" +
      "display:none;";
    btn.onmouseenter = function () { btn.style.background = "#D32F2F"; };
    btn.onmouseleave = function () { btn.style.background = "#B71C1C"; };
    btn.onclick = function () {
      var orig = btn.innerHTML;
      btn.innerHTML = "&#x23F3; Génération...";
      btn.disabled = true;
      btn.style.opacity = "0.7";
      downloadFilledPDF()
        .then(function () {
          btn.innerHTML = orig;
          btn.disabled = false;
          btn.style.opacity = "1";
        })
        .catch(function (err) {
          console.error("PDF fill error:", err);
          btn.innerHTML = orig;
          btn.disabled = false;
          btn.style.opacity = "1";
          alert("Erreur: " + err.message);
        });
    };
    document.body.appendChild(btn);
    return btn;
  }

  function startWatcher() {
    var btn = createButton();
    setInterval(function () {
      // Only show the button when a character is actually open (not on the welcome page).
      var s = window.__charStore;
      var locale = localStorage.getItem("locale");
      if (s && s.characterName && s.characterName.length > 0 && locale === "fr") {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    }, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startWatcher);
  } else {
    startWatcher();
  }
})();

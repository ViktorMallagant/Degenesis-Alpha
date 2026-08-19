import { culturesConceptsCults } from "./culturesConceptsCults";
import { messages } from "./messages";
import { sheet } from "./sheet";
import { properties } from "./properties";
import { ranks } from "./ranks";
import { potentials } from "./potentials";
import { clanMessages } from "./clans/catalog";
import { legacies } from "./legacies";

// Normalize user-facing English description markup and terminology in one place.
// Older source text uses CONDITION for prerequisites, sometimes leaves a section
// label's trailing colon outside its <b> tag, and contains a few French words
// left over from the original French-first data. Keep the source data intact
// while presenting consistent English labels throughout the UI.
const normalizeEnglishText = <T>(value: T): T => {
  if (typeof value === 'string') {
    return value
      .replace(/<b>CONDITION:<\/b>/g, '<b>PREREQUISITE:</b>')
      .replace(/<b>CONDITION<\/b>:/g, '<b>PREREQUISITE</b>:')
      .replace(/\bCONDITION:/g, 'PREREQUISITE:')
      .replace(/<\/b>:/g, ':</b>')
      .replace(/\bPrimitive Mace\b/gi, 'Club')
      .replace(/\bSimple Revolver\b/gi, 'Flintlock Pistol')
      .replace(/\bCompétences\b/g, 'Skills')
      .replace(/\bVigueur\b/g, 'Stamina')
      .replace(/\bCommandement\b/g, 'Leadership')
      .replace(/\bRéactivité\b/g, 'Reaction') as T;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => normalizeEnglishText(entry)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        normalizeEnglishText(entry)
      ])
    ) as T;
  }

  return value;
};

export default {
  de: {
    messages: { ...messages.de, missingConditions: 'Fehlende Voraussetzungen' },
    ...properties.de,
    culturesConceptsCults: culturesConceptsCults.de,
    ranks: { ...ranks.de, ...clanMessages.de.ranks },
    sheet: sheet.de,
    potentials: { ...potentials.de, ...clanMessages.de.potentials },
    clans: clanMessages.de.clans,
    legacies: legacies.de,
  },
  en: {
    messages: normalizeEnglishText({ ...messages.en, missingConditions: 'Missing prerequisites' }),
    ...normalizeEnglishText(properties.en),
    culturesConceptsCults: normalizeEnglishText(culturesConceptsCults.en),
    ranks: normalizeEnglishText({ ...ranks.en, ...clanMessages.en.ranks }),
    sheet: normalizeEnglishText(sheet.en),
    potentials: normalizeEnglishText({ ...potentials.en, ...clanMessages.en.potentials }),
    clans: normalizeEnglishText(clanMessages.en.clans),
    legacies: normalizeEnglishText(legacies.en),
  },
  fr: {
    messages: { ...messages.fr, missingConditions: 'Prérequis manquants' },
    ...properties.fr,
    culturesConceptsCults: culturesConceptsCults.fr,
    ranks: { ...ranks.fr, ...clanMessages.fr.ranks },
    sheet: sheet.fr,
    potentials: { ...potentials.fr, ...clanMessages.fr.potentials },
    clans: clanMessages.fr.clans,
    legacies: legacies.fr
  }
}
import { culturesConceptsCults } from "./culturesConceptsCults";
import { messages } from "./messages";
import { sheet } from "./sheet";
import { properties } from "./properties";
import { ranks } from "./ranks";
import { potentials } from "./potentials";
import { clanNames } from "./clans/names";
import { clanRanks } from "./clans/ranks";
import { clanTemplateRanks } from "./clans/templateRanks";
import { stukovMessages } from "./clans/stukov";
import { brenniMessages } from "./clans/brenni";
import { providersMessages } from "./clans/providers";
import { steelMastersMessages } from "./clans/steelmasters";
import { britoniMessages } from "./clans/britoni";
import { pictonsMessages } from "./clans/pictons";
import { druidsMessages } from "./clans/druids";
import { ganaridsMessages } from "./clans/ganarids";
import { legacies } from "./legacies";

// Older built-in descriptions use both <b>CONDITION</b>: and
// <b>CONDITION:</b>. Normalize those user-facing English labels in one place
// so ranks, Potentials, and Legacies consistently display PREREQUISITE.
const prerequisiteLabels = <T extends Record<string, string>>(entries: T): T =>
  Object.fromEntries(
    Object.entries(entries).map(([key, value]) => [
      key,
      value
        .replace(/<b>CONDITION:<\/b>/g, '<b>PREREQUISITE:</b>')
        .replace(/<b>CONDITION<\/b>:/g, '<b>PREREQUISITE</b>:')
        .replace(/\bCONDITION:/g, 'PREREQUISITE:')
    ])
  ) as T;

export default {
  de: {
    messages: { ...messages.de, missingConditions: 'Fehlende Voraussetzungen' },
    ...properties.de,
    culturesConceptsCults: culturesConceptsCults.de,
    ranks: { ...ranks.de, ...clanRanks.de, ...clanTemplateRanks.de, ...stukovMessages.de.ranks, ...brenniMessages.de.ranks, ...providersMessages.de.ranks, ...steelMastersMessages.de.ranks, ...britoniMessages.de.ranks, ...pictonsMessages.de.ranks, ...druidsMessages.de.ranks, ...ganaridsMessages.de.ranks },
    sheet: sheet.de,
    potentials: { ...potentials.de, ...stukovMessages.de.potentials, ...brenniMessages.de.potentials, ...providersMessages.de.potentials, ...steelMastersMessages.de.potentials, ...britoniMessages.de.potentials, ...pictonsMessages.de.potentials, ...druidsMessages.de.potentials, ...ganaridsMessages.de.potentials },
    clans: { ...clanNames.de, ...stukovMessages.de.clans, ...brenniMessages.de.clans, ...providersMessages.de.clans, ...steelMastersMessages.de.clans, ...britoniMessages.de.clans, ...pictonsMessages.de.clans, ...druidsMessages.de.clans, ...ganaridsMessages.de.clans },
    legacies: legacies.de,
  },
  en: {
    messages: { ...messages.en, missingConditions: 'Missing prerequisites' },
    ...properties.en,
    culturesConceptsCults: culturesConceptsCults.en,
    ranks: prerequisiteLabels({ ...ranks.en, ...clanRanks.en, ...clanTemplateRanks.en, ...stukovMessages.en.ranks, ...brenniMessages.en.ranks, ...providersMessages.en.ranks, ...steelMastersMessages.en.ranks, ...britoniMessages.en.ranks, ...pictonsMessages.en.ranks, ...druidsMessages.en.ranks, ...ganaridsMessages.en.ranks }),
    sheet: sheet.en,
    potentials: prerequisiteLabels({ ...potentials.en, ...stukovMessages.en.potentials, ...brenniMessages.en.potentials, ...providersMessages.en.potentials, ...steelMastersMessages.en.potentials, ...britoniMessages.en.potentials, ...pictonsMessages.en.potentials, ...druidsMessages.en.potentials, ...ganaridsMessages.en.potentials }),
    clans: { ...clanNames.en, ...stukovMessages.en.clans, ...brenniMessages.en.clans, ...providersMessages.en.clans, ...steelMastersMessages.en.clans, ...britoniMessages.en.clans, ...pictonsMessages.en.clans, ...druidsMessages.en.clans, ...ganaridsMessages.en.clans },
    legacies: prerequisiteLabels(legacies.en),
  },
  fr: {
    messages: { ...messages.fr, missingConditions: 'Prérequis manquants' },
    ...properties.fr,
    culturesConceptsCults: culturesConceptsCults.fr,
    ranks: { ...ranks.fr, ...clanRanks.fr, ...clanTemplateRanks.fr, ...stukovMessages.fr.ranks, ...brenniMessages.fr.ranks, ...providersMessages.fr.ranks, ...steelMastersMessages.fr.ranks, ...britoniMessages.fr.ranks, ...pictonsMessages.fr.ranks, ...druidsMessages.fr.ranks, ...ganaridsMessages.fr.ranks },
    sheet: sheet.fr,
    potentials: { ...potentials.fr, ...stukovMessages.fr.potentials, ...brenniMessages.fr.potentials, ...providersMessages.fr.potentials, ...steelMastersMessages.fr.potentials, ...britoniMessages.fr.potentials, ...pictonsMessages.fr.potentials, ...druidsMessages.fr.potentials, ...ganaridsMessages.fr.potentials },
    clans: { ...clanNames.fr, ...stukovMessages.fr.clans, ...brenniMessages.fr.clans, ...providersMessages.fr.clans, ...steelMastersMessages.fr.clans, ...britoniMessages.fr.clans, ...pictonsMessages.fr.clans, ...druidsMessages.fr.clans, ...ganaridsMessages.fr.clans },
    legacies: legacies.fr
  }
}
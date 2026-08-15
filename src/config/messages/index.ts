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
import { legacies } from "./legacies";

export default {
  de: {
    messages: messages.de,
    ...properties.de,
    culturesConceptsCults: culturesConceptsCults.de,
    ranks: { ...ranks.de, ...clanRanks.de, ...clanTemplateRanks.de, ...stukovMessages.de.ranks, ...brenniMessages.de.ranks },
    sheet: sheet.de,
    potentials: { ...potentials.de, ...stukovMessages.de.potentials, ...brenniMessages.de.potentials },
    clans: { ...clanNames.de, ...stukovMessages.de.clans, ...brenniMessages.de.clans },
    legacies: legacies.de,
  },
  en: {
    messages: messages.en,
    ...properties.en,
    culturesConceptsCults: culturesConceptsCults.en,
    ranks: { ...ranks.en, ...clanRanks.en, ...clanTemplateRanks.en, ...stukovMessages.en.ranks, ...brenniMessages.en.ranks },
    sheet: sheet.en,
    potentials: { ...potentials.en, ...stukovMessages.en.potentials, ...brenniMessages.en.potentials },
    clans: { ...clanNames.en, ...stukovMessages.en.clans, ...brenniMessages.en.clans },
    legacies: legacies.en,
  },
  fr: {
    messages: messages.fr,
    ...properties.fr,
    culturesConceptsCults: culturesConceptsCults.fr,
    ranks: { ...ranks.fr, ...clanRanks.fr, ...clanTemplateRanks.fr, ...stukovMessages.fr.ranks, ...brenniMessages.fr.ranks },
    sheet: sheet.fr,
    potentials: { ...potentials.fr, ...stukovMessages.fr.potentials, ...brenniMessages.fr.potentials },
    clans: { ...clanNames.fr, ...stukovMessages.fr.clans, ...brenniMessages.fr.clans },
    legacies: legacies.fr
  }
}

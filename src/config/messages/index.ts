import { culturesConceptsCults } from "./culturesConceptsCults";
import { messages } from "./messages";
import { sheet } from "./sheet";
import { properties } from "./properties";
import { ranks } from "./ranks";
import { potentials } from "./potentials";
import { clanNames } from "./clans/names";
import { clanRanks } from "./clans/ranks";
import { clanTemplateRanks } from "./clans/templateRanks";
import { legacies } from "./legacies";

export default {
  de: {
    messages: messages.de,
    ...properties.de,
    culturesConceptsCults: culturesConceptsCults.de,
    ranks: { ...ranks.de, ...clanRanks.de, ...clanTemplateRanks.de },
    sheet: sheet.de,
    potentials: potentials.de,
    clans: clanNames.de,
    legacies: legacies.de,
  },
  en: {
    messages: messages.en,
    ...properties.en,
    culturesConceptsCults: culturesConceptsCults.en,
    ranks: { ...ranks.en, ...clanRanks.en, ...clanTemplateRanks.en },
    sheet: sheet.en,
    potentials: potentials.en,
    clans: clanNames.en,
    legacies: legacies.en,
  },
  fr: {
    messages: messages.fr,
    ...properties.fr,
    culturesConceptsCults: culturesConceptsCults.fr,
    ranks: { ...ranks.fr, ...clanRanks.fr, ...clanTemplateRanks.fr },
    sheet: sheet.fr,
    potentials: potentials.fr,
    clans: clanNames.fr,
    legacies: legacies.fr
  }
}

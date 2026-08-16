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
import { legacies } from "./legacies";

export default {
  de: {
    messages: messages.de,
    ...properties.de,
    culturesConceptsCults: culturesConceptsCults.de,
    ranks: { ...ranks.de, ...clanRanks.de, ...clanTemplateRanks.de, ...stukovMessages.de.ranks, ...brenniMessages.de.ranks, ...providersMessages.de.ranks, ...steelMastersMessages.de.ranks, ...britoniMessages.de.ranks, ...pictonsMessages.de.ranks },
    sheet: sheet.de,
    potentials: { ...potentials.de, ...stukovMessages.de.potentials, ...brenniMessages.de.potentials, ...providersMessages.de.potentials, ...steelMastersMessages.de.potentials, ...britoniMessages.de.potentials, ...pictonsMessages.de.potentials },
    clans: { ...clanNames.de, ...stukovMessages.de.clans, ...brenniMessages.de.clans, ...providersMessages.de.clans, ...steelMastersMessages.de.clans, ...britoniMessages.de.clans, ...pictonsMessages.de.clans },
    legacies: legacies.de,
  },
  en: {
    messages: messages.en,
    ...properties.en,
    culturesConceptsCults: culturesConceptsCults.en,
    ranks: { ...ranks.en, ...clanRanks.en, ...clanTemplateRanks.en, ...stukovMessages.en.ranks, ...brenniMessages.en.ranks, ...providersMessages.en.ranks, ...steelMastersMessages.en.ranks, ...britoniMessages.en.ranks, ...pictonsMessages.en.ranks },
    sheet: sheet.en,
    potentials: { ...potentials.en, ...stukovMessages.en.potentials, ...brenniMessages.en.potentials, ...providersMessages.en.potentials, ...steelMastersMessages.en.potentials, ...britoniMessages.en.potentials, ...pictonsMessages.en.potentials },
    clans: { ...clanNames.en, ...stukovMessages.en.clans, ...brenniMessages.en.clans, ...providersMessages.en.clans, ...steelMastersMessages.en.clans, ...britoniMessages.en.clans, ...pictonsMessages.en.clans },
    legacies: legacies.en,
  },
  fr: {
    messages: messages.fr,
    ...properties.fr,
    culturesConceptsCults: culturesConceptsCults.fr,
    ranks: { ...ranks.fr, ...clanRanks.fr, ...clanTemplateRanks.fr, ...stukovMessages.fr.ranks, ...brenniMessages.fr.ranks, ...providersMessages.fr.ranks, ...steelMastersMessages.fr.ranks, ...britoniMessages.fr.ranks, ...pictonsMessages.fr.ranks },
    sheet: sheet.fr,
    potentials: { ...potentials.fr, ...stukovMessages.fr.potentials, ...brenniMessages.fr.potentials, ...providersMessages.fr.potentials, ...steelMastersMessages.fr.potentials, ...britoniMessages.fr.potentials, ...pictonsMessages.fr.potentials },
    clans: { ...clanNames.fr, ...stukovMessages.fr.clans, ...brenniMessages.fr.clans, ...providersMessages.fr.clans, ...steelMastersMessages.fr.clans, ...britoniMessages.fr.clans, ...pictonsMessages.fr.clans },
    legacies: legacies.fr
  }
}

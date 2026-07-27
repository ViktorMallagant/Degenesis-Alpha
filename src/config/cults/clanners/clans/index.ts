import { Bordenoir, BordenoirRanks } from "./bordenoir";
import { Exalters, ExaltersRanks } from "./exalters";
import { HunterGathererRanks, HunterGatherers } from "./cockroaches";
import { HunterGathererRanks, HunterGatherers } from "./hunterGatherers";
import { Pneumancers, PneumancersRanks } from "./pneumancers";
import { Resistance, ResistanceRanks } from "./resistance";
import { Sanglier, SanglierRanks } from "./sanglier";
import { Touloni, TouloniRanks } from "./touloni";

export const Clans = {
  cockroaches: Cockroaches,
  HunterGatherers: HunterGatherers,
  Touloni: Touloni,
  Sanglier: Sanglier,
  Bordenoir: Bordenoir,
  Resistance: Resistance,
  Pneumancers: Pneumancers,
  Exalters: Exalters
}

export const ClannerRanks = [
  ...HunterGathererRanks,
  ...TouloniRanks,
  ...SanglierRanks,
  ...BordenoirRanks,
  ...ResistanceRanks,
  ...PneumancersRanks,
  ...ExaltersRanks
]

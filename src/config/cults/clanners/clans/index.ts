import { Bordenoir, BordenoirRanks } from "./bordenoir";
import { Cockroaches, CockroachRanks } from "./cockroaches";
import { Exalters, ExaltersRanks } from "./exalters";
import { HunterGathererRanks, HunterGatherers } from "./hunterGatherers";
import { Pneumancers, PneumancersRanks } from "./pneumancers";
import { Resistance, ResistanceRanks } from "./resistance";
import { Sanglier, SanglierRanks } from "./sanglier";
import { Touloni, TouloniRanks } from "./touloni";

export const Clans = {
  HunterGatherers: HunterGatherers,
  Cockroaches: Cockroaches,
  Touloni: Touloni,
  Sanglier: Sanglier,
  Bordenoir: Bordenoir,
  Resistance: Resistance,
  Pneumancers: Pneumancers,
  Exalters: Exalters
}

export const ClannerRanks = [
  ...HunterGathererRanks,
  ...CockroachRanks,
  ...TouloniRanks,
  ...SanglierRanks,
  ...BordenoirRanks,
  ...ResistanceRanks,
  ...PneumancersRanks,
  ...ExaltersRanks
]

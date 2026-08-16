import { Bordenoir, BordenoirRanks } from "./bordenoir";
import { Brenni, BrenniRanks } from "./brenni";
import { Britoni, BritoniRanks } from "./britoni";
import { Cockroaches, CockroachRanks } from "./cockroaches";
import { Exalters, ExaltersRanks } from "./exalters";
import { HunterGathererRanks, HunterGatherers } from "./hunterGatherers";
import {
  Adriani,
  CorpseEaters,
  Enemoi,
  Flayers,
  Garganti,
  HunterGathererTemplateClanRanks,
  Masai,
  Matadors,
  Mechans,
  Phosphorites,
  Romanos,
  Shabath,
  Storskis,
  StukovNomads,
  Voivodules
} from "./hunterGathererTemplateClans";
import { Pneumancers, PneumancersRanks } from "./pneumancers";
import { Providers, ProvidersRanks } from "./providers";
import { Resistance, ResistanceRanks } from "./resistance";
import { Sanglier, SanglierRanks } from "./sanglier";
import { SteelMasters, SteelMastersRanks } from "./steelmasters";
import { Stukov, StukovRanks } from "./stukov";
import { Touloni, TouloniRanks } from "./touloni";

export const Clans = {
  HunterGatherers: HunterGatherers,
  Cockroaches: Cockroaches,
  Mechans: Mechans,
  Phosphorites: Phosphorites,
  Enemoi: Enemoi,
  StukovNomads: StukovNomads,
  Storskis: Storskis,
  CorpseEaters: CorpseEaters,
  Garganti: Garganti,
  Voivodules: Voivodules,
  Matadors: Matadors,
  Flayers: Flayers,
  Adriani: Adriani,
  Romanos: Romanos,
  Masai: Masai,
  Shabath: Shabath,
  Stukov: Stukov,
  Brenni: Brenni,
  Providers: Providers,
  SteelMasters: SteelMasters,
  Britoni: Britoni,
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
  ...HunterGathererTemplateClanRanks,
  ...StukovRanks,
  ...BrenniRanks,
  ...ProvidersRanks,
  ...SteelMastersRanks,
  ...BritoniRanks,
  ...TouloniRanks,
  ...SanglierRanks,
  ...BordenoirRanks,
  ...ResistanceRanks,
  ...PneumancersRanks,
  ...ExaltersRanks
]

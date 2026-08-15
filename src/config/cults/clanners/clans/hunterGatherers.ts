import { createHunterGathererClan } from './hunterGathererTemplate'

const template = createHunterGathererClan('hunterGatherers')

export const HunterGatherers = template.clan
export const HunterGathererRanks = template.ranks

// Preserve the existing named exports for callers that reference individual ranks.
export const Scout = template.ranksByKey.scout
export const Hunter = template.ranksByKey.hunter
export const Gatherer = template.ranksByKey.gatherer
export const TribalWarrior = template.ranksByKey.tribalWarrior
export const Shaman = template.ranksByKey.shaman
export const Chieftain = template.ranksByKey.chieftain
export const Champion = template.ranksByKey.champion
export const Founder = template.ranksByKey.founder

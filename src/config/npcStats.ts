// Quality scale used by the NPC quick-stats generator (see "NPC Quick Statistics" table).
// Index 0 = Nul/Bad ... Index 5 = Légendaire/Best.
export const QUALITY_LEVELS = ['null', 'average', 'fairish', 'good', 'veryGood', 'legendary'] as const
export type QualityLevel = typeof QUALITY_LEVELS[number]

export const DEFAULT_QUALITY_INDEX = 1 // 'average'

// Value tables, one entry per quality level (index-aligned with QUALITY_LEVELS).
export const NPC_VALUE_TABLES = {
  attribute: [1, 2, 3, 4, 5, 6],
  skill: [1, 2, 3, 4, 5, 6],
  ego: [2, 6, 10, 14, 18, 22],
  fleshwounds: [2, 6, 10, 14, 18, 22],
  trauma: [2, 4, 6, 8, 10, 12],
  movement: [1, 3, 5, 7, 9, 11],
  initiative: [1, 3, 5, 7, 9, 11],
  // Passive Defense intentionally deviates from the rulebook table: a simple 1-6 scale is used
  // instead of 1/3/5/7/9/11, since most NPCs sit at "average" (2) while standing and active.
  passiveDefense: [1, 2, 3, 4, 5, 6],
  mentalDefense: [1, 3, 5, 7, 9, 11],
} as const

export type NpcValueCategory = keyof typeof NPC_VALUE_TABLES

export function npcValue(category: NpcValueCategory, qualityIndex: number): number {
  return NPC_VALUE_TABLES[category][qualityIndex] ?? NPC_VALUE_TABLES[category][DEFAULT_QUALITY_INDEX]
}

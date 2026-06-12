export type LegacyEffect =
  | { type: 'attribute'; name: string; bonus: number }
  | { type: 'skill'; name: string; bonus: number }
  | { type: 'origin'; name: string; bonus: number }
  | { type: 'egoMax'; bonus: number }
  | { type: 'sporeMax'; bonus: number }
  | { type: 'xpSkillBonus'; points: number }
  | { type: 'modifier'; description: string }

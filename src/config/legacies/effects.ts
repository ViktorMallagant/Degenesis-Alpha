export type SkillScope = 'ins' | 'cha' | 'int' | 'psy' | 'agi' | 'body' | 'combat' | 'faithOrWillpower'

export type LegacyEffect =
  | { type: 'attribute'; name: string; bonus: number }
  | { type: 'skill'; name: string; bonus: number; exceedsMax?: true }
  | { type: 'origin'; name: string; bonus: number }
  | { type: 'egoMax'; bonus: number }
  | { type: 'sporeMax'; bonus: number }
  | { type: 'xpAttributeBonus'; points: number }
  | { type: 'xpSkillBonus'; points: number }
  | { type: 'xpOriginBonus'; points: number }
  | { type: 'xpPotentialBonus'; points: number }
  /** Player picks `count` attributes; `bonus` applied to each chosen. */
  | { type: 'choiceAttribute'; bonus: number; count: number; description: string }
  /** Player picks `count` skills (optionally from `scope`); `bonus` applied to each. */
  | { type: 'choiceSkill'; bonus: number; count: number; scope?: SkillScope; description: string }
  | { type: 'modifier'; description: string }

export const INS_SKILLS = ['empathy', 'orienteering', 'perception', 'primal', 'survival', 'taming']
export const COMBAT_SKILLS = ['brawl', 'melee', 'projectiles']
export const FAITH_OR_WILLPOWER_SKILLS = ['faith', 'willpower']
export const CHA_SKILLS = ['arts', 'conduct', 'expression', 'leadership', 'negotiation', 'seduction']
export const INT_SKILLS = ['artifactLore', 'engineering', 'legends', 'medicine', 'science', 'focus']
export const SCOPE_SKILLS: Record<string, string[]> = {
  ins: INS_SKILLS,
  combat: COMBAT_SKILLS,
  cha: CHA_SKILLS,
  int: INT_SKILLS,
  faithOrWillpower: FAITH_OR_WILLPOWER_SKILLS,
}

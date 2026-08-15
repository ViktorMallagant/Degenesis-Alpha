import { Clan } from '@/config/model'
import { Origins, Skills, type Skill } from '@/config/properties'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import type { Rank } from '../../../ranks/ranks'
import { clanRank } from './util'

export const HUNTER_GATHERER_BONUS_SKILLS: Skill[] = [
  Skills.stamina,
  Skills.melee,
  Skills.survival,
  Skills.legends,
  Skills.taming
]

export const HUNTER_GATHERER_RANK_KEYS = [
  'scout',
  'hunter',
  'gatherer',
  'tribalWarrior',
  'shaman',
  'chieftain',
  'champion',
  'founder'
] as const

export type HunterGathererRankKey = (typeof HUNTER_GATHERER_RANK_KEYS)[number]

export interface HunterGathererClanTemplate {
  clan: Clan
  ranks: Rank[]
  ranksByKey: Record<HunterGathererRankKey, Rank>
}

/**
 * Creates a clan that uses the standard Hunter/Gatherer bonuses and rank tree.
 * Pass a custom bonusSkills array only when a clan shares the rank structure but
 * has different preferred skills.
 */
export function createHunterGathererClan(
  name: string,
  bonusSkills: Skill[] = HUNTER_GATHERER_BONUS_SKILLS
): HunterGathererClanTemplate {
  const clan = new Clan(name, bonusSkills)
  const rank = clanRank(clan)

  const scout = rank('scout', [], [], [])

  const hunter = rank(
    'hunter',
    [
      atLeastSkill(Skills.stamina, 4),
      atLeastSkill(Skills.projectiles, 6),
      atLeastSkill(Skills.survival, 6)
    ],
    [],
    [scout]
  )

  const gatherer = rank(
    'gatherer',
    [
      atLeastSkill(Skills.negotiation, 4),
      atLeastSkill(Skills.conduct, 6),
      atLeastSkill(Skills.orienteering, 6)
    ],
    [],
    [scout]
  )

  const tribalWarrior = rank(
    'tribalWarrior',
    [
      atLeastSkill(Skills.melee, 8),
      atLeastSkill(Skills.projectiles, 6),
      atLeastSkill(Skills.brawl, 7)
    ],
    [atLeastOrigin(Origins.renown, 3)],
    [hunter, gatherer]
  )

  const shaman = rank(
    'shaman',
    [
      atLeastSkill(Skills.negotiation, 7),
      atLeastSkill(Skills.legends, 8),
      atLeastSkill(Skills.empathy, 7)
    ],
    [atLeastOrigin(Origins.secrets, 3)],
    [hunter, gatherer]
  )

  const chieftain = rank(
    'chieftain',
    [],
    [
      atLeastOrigin(Origins.authority, 5),
      atLeastOrigin(Origins.allies, 5),
      atLeastOrigin(Origins.resources, 3)
    ],
    [tribalWarrior, shaman]
  )

  const champion = rank(
    'champion',
    [
      atLeastSkill(Skills.force, 8),
      either(
        atLeastSkill(Skills.melee, 10),
        atLeastSkill(Skills.projectiles, 10),
        atLeastSkill(Skills.brawl, 10)
      )
    ],
    [atLeastOrigin(Origins.renown, 6)],
    [chieftain]
  )

  const founder = rank(
    'founder',
    [
      atLeastSkill(Skills.leadership, 10),
      either(atLeastSkill(Skills.conduct, 10), atLeastSkill(Skills.domination, 10))
    ],
    [atLeastOrigin(Origins.authority, 6)],
    [chieftain]
  )

  const ranksByKey: Record<HunterGathererRankKey, Rank> = {
    scout,
    hunter,
    gatherer,
    tribalWarrior,
    shaman,
    chieftain,
    champion,
    founder
  }

  return {
    clan,
    ranks: HUNTER_GATHERER_RANK_KEYS.map((key) => ranksByKey[key]),
    ranksByKey
  }
}

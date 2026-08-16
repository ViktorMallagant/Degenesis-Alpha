import { Clan } from '@/config/model'
import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import type { Rank } from '@/config/ranks/ranks'
import { clanRank } from './util'

export type BritoniRankOriginMinimums = Partial<Record<keyof typeof Origins, number>>
export type BritoniRankWithOriginMinimums = Rank & { originMinimums?: BritoniRankOriginMinimums }

export const Britoni = new Clan('britoni', [
  Skills.force,
  Skills.navigation,
  Skills.legends,
  Skills.survival,
  Skills.orienteering
])

const britoniRank = clanRank(Britoni)

export const Kelp: Rank = britoniRank('kelp', [], [], [])

export const Waverider: Rank = britoniRank(
  'waverider',
  [
    atLeastSkill(Skills.survival, 5),
    atLeastSkill(Skills.melee, 6)
  ],
  [],
  [Kelp]
)

export const Anchor: Rank = britoniRank(
  'anchor',
  [
    atLeastSkill(Skills.science, 4),
    atLeastSkill(Skills.crafting, 6)
  ],
  [atLeastOrigin(Origins.network, 2)],
  [Kelp]
)

// Killing a walrus bare-handed during the annual hunt is a narrative
// prerequisite with no corresponding character-state field, so it remains
// visible in the rank description rather than becoming a hidden machine gate.
export const Bullkiller: Rank = britoniRank(
  'bullkiller',
  [
    atLeastSkill(Skills.navigation, 6),
    atLeastSkill(Skills.leadership, 8)
  ],
  [atLeastOrigin(Origins.renown, 3)],
  [Waverider, Anchor]
)

export const Balmer: Rank = britoniRank(
  'balmer',
  [
    atLeastSkill(Skills.medicine, 8),
    atLeastSkill(Skills.empathy, 6)
  ],
  [atLeastOrigin(Origins.allies, 3)],
  [Waverider, Anchor]
)

export const Prow: Rank = britoniRank(
  'prow',
  [
    either(atLeastSkill(Skills.projectiles, 9), atLeastSkill(Skills.melee, 9)),
    atLeastSkill(Skills.survival, 7)
  ],
  [
    atLeastOrigin(Origins.renown, 4),
    atLeastOrigin(Origins.authority, 3)
  ],
  [Bullkiller, Balmer]
)

// Direct descent from Oppolus or marriage to one of his children is a
// narrative lineage condition that the current character model cannot track.
export const Oppolid: Rank = britoniRank(
  'oppolid',
  [atLeastSkill(Skills.leadership, 10)],
  [atLeastOrigin(Origins.renown, 5)],
  [Prow]
)

export const Whaler: BritoniRankWithOriginMinimums = britoniRank(
  'whaler',
  [
    atLeastSkill(Skills.survival, 10),
    atLeastSkill(Skills.navigation, 10),
    atLeastSkill(Skills.orienteering, 10)
  ],
  [atLeastOrigin(Origins.renown, 5)],
  [Prow]
) as BritoniRankWithOriginMinimums

// Rank effect: the Whaler has Resources (6). Keep this as a minimum effective
// score so it does not consume Background points the player actually spent.
Whaler.originMinimums = { resources: 6 }

export const BritoniRanks = [
  Kelp,
  Waverider,
  Anchor,
  Bullkiller,
  Balmer,
  Prow,
  Oppolid,
  Whaler
]

import { Clan } from '@/config/model'
import { Skills } from '@/config/properties'
import { atLeastSkill, either } from '@/config/requirements'
import type { Rank } from '@/config/ranks/ranks'
import { clanRank } from './util'

export const Ganarids = new Clan('ganarids', [
  Skills.stealth,
  Skills.conduct,
  Skills.expression,
  Skills.deception,
  Skills.empathy
])

const ganaridRank = clanRank(Ganarids)

// Former membership in Ganaress' hive is intrinsic to the Ganarid concept and
// is retained as a narrative condition in the rank description.
export const Grub: Rank = ganaridRank('grub', [], [], [])

export const Larva: Rank = ganaridRank(
  'larva',
  [
    atLeastSkill(Skills.empathy, 5),
    atLeastSkill(Skills.deception, 4)
  ],
  [],
  [Grub]
)

export const Pupa: Rank = ganaridRank(
  'pupa',
  [
    atLeastSkill(Skills.conduct, 7),
    atLeastSkill(Skills.cunning, 6)
  ],
  [],
  [Larva]
)

export const Imago: Rank = ganaridRank(
  'imago',
  [
    atLeastSkill(Skills.leadership, 6),
    atLeastSkill(Skills.expression, 8),
    atLeastSkill(Skills.empathy, 8)
  ],
  [],
  [Pupa]
)

export const Moth: Rank = ganaridRank(
  'moth',
  [
    either(atLeastSkill(Skills.faith, 11), atLeastSkill(Skills.willpower, 11)),
    atLeastSkill(Skills.domination, 9),
    atLeastSkill(Skills.leadership, 10)
  ],
  [],
  [Imago]
)

export const GanaridRanks = [
  Grub,
  Larva,
  Pupa,
  Imago,
  Moth
]

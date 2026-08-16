import { Clan } from '@/config/model'
import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import type { Rank } from '@/config/ranks/ranks'
import { clanRank } from './util'

export const SteelMasters = new Clan('steelmasters', [
  Skills.force,
  Skills.crafting,
  Skills.engineering,
  Skills.legends,
  Skills.science
])

const steelMastersRank = clanRank(SteelMasters)

export const Fledgling: Rank = steelMastersRank('fledgling', [], [], [])

// Ogota / Gotokai membership is a narrative family-line distinction that is
// not currently represented in character state, so those conditions remain
// visible in the rank descriptions rather than being hidden machine gates.
export const Shaper: Rank = steelMastersRank(
  'shaper',
  [
    atLeastSkill(Skills.crafting, 7),
    atLeastSkill(Skills.force, 6)
  ],
  [],
  [Fledgling]
)

export const Metallurgist: Rank = steelMastersRank(
  'metallurgist',
  [
    atLeastSkill(Skills.perception, 6),
    atLeastSkill(Skills.science, 7)
  ],
  [],
  [Fledgling]
)

export const Foreman: Rank = steelMastersRank(
  'foreman',
  [atLeastSkill(Skills.negotiation, 6)],
  [atLeastOrigin(Origins.network, 3)],
  [Shaper, Metallurgist]
)

export const Overseer: Rank = steelMastersRank(
  'overseer',
  [
    atLeastSkill(Skills.leadership, 8),
    atLeastSkill(Skills.perception, 8)
  ],
  [atLeastOrigin(Origins.authority, 3)],
  [Shaper, Metallurgist]
)

export const Artificer: Rank = steelMastersRank(
  'artificer',
  [
    atLeastSkill(Skills.crafting, 8),
    atLeastSkill(Skills.arts, 7)
  ],
  [atLeastOrigin(Origins.network, 4)],
  [Foreman, Overseer]
)

// Successor selection by Danislai / Heza is a narrative condition with no
// corresponding character-state field. The Crafting 11 requirement is fully
// enforced by the eligibility engine.
export const SteelMasterOgota: Rank = steelMastersRank(
  'steelmasterogota',
  [atLeastSkill(Skills.crafting, 11)],
  [],
  [Artificer]
)

export const SteelMasterGotokai: Rank = steelMastersRank(
  'steelmastergotokai',
  [atLeastSkill(Skills.crafting, 11)],
  [],
  [Artificer]
)

export const SteelMastersRanks = [
  Fledgling,
  Shaper,
  Metallurgist,
  Foreman,
  Overseer,
  Artificer,
  SteelMasterOgota,
  SteelMasterGotokai
]

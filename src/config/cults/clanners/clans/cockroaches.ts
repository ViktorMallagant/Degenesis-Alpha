import { Clan } from '@/config/model'
import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Rank } from '../../../ranks/ranks'
import { clanRank } from './util'

export const cockroaches = new Clan('hunterGatherers', [
  Skills.stamina,
  Skills.melee,
  Skills.survival,
  Skills.legends,
  Skills.taming
])

const hunterGathererRank = clanRank(HunterGatherers)

export const Scout: Rank = hunterGathererRank('scout', [], [], [])

export const Hunter: Rank = hunterGathererRank(
  'hunter',
  [
    atLeastSkill(Skills.stamina, 4),
    atLeastSkill(Skills.projectiles, 6),
    atLeastSkill(Skills.survival, 6)
  ],
  [],
  [Scout]
)

export const Gatherer: Rank = hunterGathererRank(
  'gatherer',
  [
    atLeastSkill(Skills.negotiation, 4),
    atLeastSkill(Skills.conduct, 6),
    atLeastSkill(Skills.orienteering, 6)
  ],
  [],
  [Scout]
)

export const TribalWarrior: Rank = hunterGathererRank(
  'tribalWarrior',
  [
    atLeastSkill(Skills.melee, 8),
    atLeastSkill(Skills.projectiles, 6),
    atLeastSkill(Skills.brawl, 7)
  ],
  [atLeastOrigin(Origins.renown, 3)],
  [Hunter, Gatherer]
)

export const Shaman: Rank = hunterGathererRank(
  'shaman',
  [
    atLeastSkill(Skills.negotiation, 7),
    atLeastSkill(Skills.legends, 8),
    atLeastSkill(Skills.empathy, 7)
  ],
  [atLeastOrigin(Origins.secrets, 3)],
  [Hunter, Gatherer]
)

export const Chieftain: Rank = hunterGathererRank(
  'chieftain',
  [],
  [
    atLeastOrigin(Origins.authority, 5),
    atLeastOrigin(Origins.allies, 5),
    atLeastOrigin(Origins.resources, 3)
  ],
  [TribalWarrior, Shaman]
)

export const Champion: Rank = hunterGathererRank(
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
  [Chieftain]
)

export const Founder: Rank = hunterGathererRank(
  'founder',
  [
    atLeastSkill(Skills.leadership, 10),
    either(atLeastSkill(Skills.conduct, 10), atLeastSkill(Skills.domination, 10))
  ],
  [atLeastOrigin(Origins.authority, 6)],
  [Chieftain]
)

export const HunterGathererRanks = [
  Scout,
  Hunter,
  Gatherer,
  TribalWarrior,
  Shaman,
  Chieftain,
  Champion,
  Founder
]

import { Clan } from '@/config/model'
import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import type { Rank } from '@/config/ranks/ranks'
import { clanRank } from './util'

export const Pictons = new Clan(
  'pictons',
  [
    Skills.toughness,
    Skills.engineering,
    Skills.legends,
    Skills.reaction,
    Skills.empathy
  ],
  { mentalDefenseSuccessBonus: 1 }
)

const pictonRank = clanRank(Pictons)

export const Orbiter: Rank = pictonRank('orbiter', [], [], [])

export const Trajector: Rank = pictonRank(
  'trajector',
  [
    atLeastSkill(Skills.toughness, 6),
    atLeastSkill(Skills.survival, 5)
  ],
  [],
  [Orbiter]
)

export const Booster: Rank = pictonRank(
  'booster',
  [
    atLeastSkill(Skills.dexterity, 5),
    atLeastSkill(Skills.science, 6)
  ],
  [atLeastOrigin(Origins.secrets, 2)],
  [Orbiter]
)

export const StarEater: Rank = pictonRank(
  'stareater',
  [
    atLeastSkill(Skills.stamina, 7),
    atLeastSkill(Skills.legends, 6),
    atLeastSkill(Skills.cunning, 6)
  ],
  [atLeastOrigin(Origins.secrets, 2)],
  [Booster, Trajector]
)

export const DeathWalker: Rank = pictonRank(
  'deathwalker',
  [
    atLeastSkill(Skills.expression, 6),
    atLeastSkill(Skills.medicine, 8),
    atLeastSkill(Skills.domination, 7)
  ],
  [atLeastOrigin(Origins.secrets, 3)],
  [Booster, Trajector]
)

export const Nebula: Rank = pictonRank(
  'nebula',
  [
    either(atLeastSkill(Skills.melee, 8), atLeastSkill(Skills.projectiles, 8)),
    atLeastSkill(Skills.leadership, 9),
    atLeastSkill(Skills.domination, 9)
  ],
  [atLeastOrigin(Origins.secrets, 4)],
  [StarEater, DeathWalker]
)

// "Chosen by Argyre" is a narrative prerequisite with no corresponding
// character-state field, so it remains visible in the rank description rather
// than being represented by a hidden or unverifiable machine gate.
export const Gemini: Rank = pictonRank(
  'gemini',
  [
    atLeastSkill(Skills.science, 9),
    atLeastSkill(Skills.taming, 8),
    either(
      atLeastSkill(Skills.cunning, 11),
      atLeastSkill(Skills.deception, 11),
      atLeastSkill(Skills.domination, 11)
    )
  ],
  [atLeastOrigin(Origins.secrets, 5)],
  [Nebula]
)

// "Chosen by Argyre" is likewise narrative for the Pulsar.
export const Pulsar: Rank = pictonRank(
  'pulsar',
  [
    atLeastSkill(Skills.toughness, 10),
    atLeastSkill(Skills.force, 8),
    atLeastSkill(Skills.leadership, 9)
  ],
  [atLeastOrigin(Origins.authority, 5)],
  [Nebula]
)

export const PictonRanks = [
  Orbiter,
  Trajector,
  Booster,
  StarEater,
  DeathWalker,
  Nebula,
  Gemini,
  Pulsar
]

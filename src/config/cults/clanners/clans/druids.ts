import { Clan } from '@/config/model'
import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import type { Rank } from '@/config/ranks/ranks'
import { clanRank } from './util'

export const Druids = new Clan('druids', [
  Skills.athletics,
  Skills.stealth,
  Skills.artifactLore,
  Skills.survival,
  Skills.taming
])

const druidRank = clanRank(Druids)

export const Relay: Rank = druidRank('relay', [], [], [])

export const Resistor: Rank = druidRank(
  'resistor',
  [
    atLeastSkill(Skills.crafting, 6),
    atLeastSkill(Skills.cunning, 4)
  ],
  [],
  [Relay]
)

export const Battery: Rank = druidRank(
  'battery',
  [
    atLeastSkill(Skills.science, 6),
    atLeastSkill(Skills.survival, 5)
  ],
  [],
  [Relay]
)

export const Solenoid: Rank = druidRank(
  'solenoid',
  [
    atLeastSkill(Skills.projectiles, 7),
    atLeastSkill(Skills.mobility, 6)
  ],
  [atLeastOrigin(Origins.network, 2)],
  [Resistor, Battery]
)

export const Amplifier: Rank = druidRank(
  'amplifier',
  [
    atLeastSkill(Skills.legends, 8),
    atLeastSkill(Skills.crafting, 7),
    atLeastSkill(Skills.expression, 6)
  ],
  [],
  [Resistor, Battery]
)

export const Conductor: Rank = druidRank(
  'conductor',
  [
    atLeastSkill(Skills.leadership, 9),
    atLeastSkill(Skills.empathy, 8),
    atLeastSkill(Skills.perception, 8)
  ],
  [atLeastOrigin(Origins.authority, 4)],
  [Solenoid, Amplifier]
)

export const Diode: Rank = druidRank(
  'diode',
  [
    atLeastSkill(Skills.deception, 11),
    atLeastSkill(Skills.conduct, 10),
    atLeastSkill(Skills.empathy, 10)
  ],
  [atLeastOrigin(Origins.network, 5)],
  [Conductor]
)

// Willingness to sacrifice one's life for Cernunnos is a narrative
// prerequisite with no corresponding character-state field, so it remains
// visible in the rank description rather than becoming a hidden machine gate.
export const Simulacrum: Rank = druidRank(
  'simulacrum',
  [atLeastSkill(Skills.toughness, 10)],
  [],
  [Conductor]
)

export const DruidRanks = [
  Relay,
  Resistor,
  Battery,
  Solenoid,
  Amplifier,
  Conductor,
  Diode,
  Simulacrum
]

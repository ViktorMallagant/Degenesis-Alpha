import { Clan } from '@/config/model'
import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import type { Rank } from '@/config/ranks/ranks'
import { clanRank } from './util'

export type RankOriginMinimums = Partial<Record<keyof typeof Origins, number>>
export type RankWithOriginMinimums = Rank & { originMinimums?: RankOriginMinimums }

export const Brenni = new Clan('brenni', [
  Skills.force,
  Skills.crafting,
  Skills.arts,
  Skills.science,
  Skills.deception
])

const brenniRank = clanRank(Brenni)

export const Aide: Rank = brenniRank('aide', [], [], [])

export const Guru: Rank = brenniRank(
  'guru',
  [
    atLeastSkill(Skills.medicine, 6),
    atLeastSkill(Skills.science, 5),
    atLeastSkill(Skills.perception, 6)
  ],
  [],
  [Aide]
)

export const Brewer: Rank = brenniRank(
  'brewer',
  [
    atLeastSkill(Skills.science, 7),
    atLeastSkill(Skills.arts, 6),
    atLeastSkill(Skills.conduct, 5)
  ],
  [],
  [Aide]
)

export const Toxician: Rank = brenniRank(
  'toxician',
  [
    atLeastSkill(Skills.science, 8),
    atLeastSkill(Skills.toughness, 6),
    atLeastSkill(Skills.cunning, 7)
  ],
  [],
  [Guru, Brewer]
)

export const Apothecary: Rank = brenniRank(
  'apothecary',
  [
    atLeastSkill(Skills.medicine, 8),
    atLeastSkill(Skills.legends, 6)
  ],
  [],
  [Guru, Brewer]
)

export const Alchemist: Rank = brenniRank(
  'alchemist',
  [
    either(atLeastSkill(Skills.medicine, 9), atLeastSkill(Skills.science, 9)),
    atLeastSkill(Skills.legends, 6)
  ],
  [],
  [Toxician, Apothecary]
)

export const Meister: Rank = brenniRank(
  'meister',
  [
    atLeastSkill(Skills.legends, 10),
    atLeastSkill(Skills.cunning, 10)
  ],
  [atLeastOrigin(Origins.secrets, 5)],
  [Alchemist]
)

// "Chosen by the Meisters" and "Survived at least one Red Purge" are
// narrative prerequisites with no corresponding character-state fields.
// They remain visible in the translated rank description and are therefore
// intentionally not machine-blocking in the eligibility engine.
export const Inheritor: RankWithOriginMinimums = brenniRank(
  'inheritor',
  [],
  [],
  [Alchemist]
) as RankWithOriginMinimums

// Rank effect: these Backgrounds can never function below 6 while the
// character holds the Inheritor rank. UI/export consumers can read this
// generic metadata without baking Brenni-specific checks into their code.
Inheritor.originMinimums = {
  authority: 6,
  allies: 6,
  secrets: 6
}

export const BrenniRanks = [
  Aide,
  Guru,
  Brewer,
  Toxician,
  Apothecary,
  Alchemist,
  Meister,
  Inheritor
]

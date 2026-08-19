import { Clan } from '@/config/model'
import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Rank } from '../../../ranks/ranks'
import { clanRank } from './util'

export const Sanglier = new Clan('sanglier', [
  Skills.projectiles,
  Skills.expression,
  Skills.science,
  Skills.faith,
  Skills.willpower,
  Skills.cunning
])

const sanglierRank = clanRank(Sanglier)

export const Baisse: Rank = sanglierRank('baisse', [], [], [])

export const Sang: Rank = sanglierRank(
  'sang',
  [atLeastSkill(Skills.toughness, 6), atLeastSkill(Skills.projectiles, 6)],
  [],
  [Baisse]
)

export const Veine: Rank = sanglierRank(
  'veine',
  [atLeastSkill(Skills.seduction, 6), atLeastSkill(Skills.cunning, 6)],
  [atLeastOrigin(Origins.network, 1)],
  [Baisse]
)

export const Os: Rank = sanglierRank(
  'os',
  [
    atLeastSkill(Skills.projectiles, 8),
    atLeastSkill(Skills.leadership, 6),
    either(atLeastSkill(Skills.faith, 6), atLeastSkill(Skills.willpower, 6))
  ],
  [atLeastOrigin(Origins.authority, 2), atLeastOrigin(Origins.renown, 2)],
  [Sang, Veine]
)

export const Vertebre: Rank = sanglierRank(
  'vertebre',
  [
    atLeastSkill(Skills.science, 6),
    atLeastSkill(Skills.cunning, 8),
    either(atLeastSkill(Skills.faith, 6), atLeastSkill(Skills.willpower, 6))
  ],
  [atLeastOrigin(Origins.allies, 2), atLeastOrigin(Origins.network, 2)],
  [Sang, Veine]
)

export const Ventricule: Rank = sanglierRank(
  'ventricule',
  [
    atLeastSkill(Skills.leadership, 8),
    either(atLeastSkill(Skills.faith, 8), atLeastSkill(Skills.willpower, 8)),
    atLeastSkill(Skills.empathy, 6)
  ],
  [atLeastOrigin(Origins.authority, 4), atLeastOrigin(Origins.resources, 3)],
  [Os, Vertebre]
)

export const Neurone: Rank = sanglierRank(
  'neurone',
  [
    atLeastSkill(Skills.projectiles, 10),
    atLeastSkill(Skills.leadership, 10),
    either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10))
  ],
  [atLeastOrigin(Origins.renown, 5), atLeastOrigin(Origins.authority, 5)],
  [Ventricule]
)

export const Cerveau: Rank = sanglierRank(
  'cerveau',
  [
    atLeastSkill(Skills.science, 10),
    atLeastSkill(Skills.expression, 10),
    atLeastSkill(Skills.cunning, 10)
  ],
  [atLeastOrigin(Origins.authority, 5), atLeastOrigin(Origins.secrets, 5)],
  [Ventricule]
)

export const SanglierRanks = [Baisse, Sang, Veine, Os, Vertebre, Ventricule, Neurone, Cerveau]

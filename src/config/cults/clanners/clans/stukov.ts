import { Clan } from '@/config/model'
import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { olderThanAge, type Rank } from '@/config/ranks/ranks'
import { clanRank } from './util'

export const Stukov = new Clan('stukov', [
  Skills.crafting,
  Skills.arts,
  Skills.conduct,
  Skills.legends,
  Skills.orienteering
])

const stukovRank = clanRank(Stukov)

export const Citizen: Rank = stukovRank('citizen', [], [], [])

export const Factotum: Rank = stukovRank(
  'factotum',
  [
    atLeastSkill(Skills.crafting, 6),
    atLeastSkill(Skills.arts, 6),
    atLeastSkill(Skills.conduct, 5)
  ],
  [],
  [Citizen]
)

export const Quartermaster: Rank = stukovRank(
  'quartermaster',
  [
    atLeastSkill(Skills.leadership, 5),
    atLeastSkill(Skills.science, 6),
    atLeastSkill(Skills.cunning, 5)
  ],
  [],
  [Citizen]
)

export const FireWatch: Rank = stukovRank(
  'firewatch',
  [
    atLeastSkill(Skills.force, 7),
    atLeastSkill(Skills.toughness, 7),
    atLeastSkill(Skills.conduct, 6)
  ],
  [],
  [Factotum, Quartermaster]
)

export const GuildLeader: Rank = stukovRank(
  'guildleader',
  [
    atLeastSkill(Skills.crafting, 8),
    atLeastSkill(Skills.arts, 8),
    atLeastSkill(Skills.leadership, 6)
  ],
  [atLeastOrigin(Origins.authority, 4)],
  [Factotum, Quartermaster]
)

export const Urbanist: Rank = stukovRank(
  'urbanist',
  [atLeastSkill(Skills.cunning, 6)],
  [atLeastOrigin(Origins.network, 4), atLeastOrigin(Origins.resources, 4)],
  [FireWatch, GuildLeader]
)

export const Deputy: Rank = stukovRank(
  'deputy',
  [
    atLeastSkill(Skills.negotiation, 8),
    atLeastSkill(Skills.legends, 7),
    atLeastSkill(Skills.cunning, 7)
  ],
  [],
  [Urbanist]
)

export const Partisan: Rank = stukovRank(
  'partisan',
  [atLeastSkill(Skills.leadership, 10), atLeastSkill(Skills.legends, 8)],
  [atLeastOrigin(Origins.authority, 5)],
  [Urbanist],
  false,
  undefined,
  [],
  [olderThanAge(60)]
)

export const StukovRanks = [
  Citizen,
  Factotum,
  Quartermaster,
  FireWatch,
  GuildLeader,
  Urbanist,
  Deputy,
  Partisan
]

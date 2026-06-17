import { Origins, Skills } from '@/config/properties'
import { Rank, cultRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Jehammedans } from '.'

const jehammedanRank = cultRank(Jehammedans)

export const Hagari: Rank = jehammedanRank('hagari', [], [], [])
export const Ismaeli: Rank = jehammedanRank('ismaeli', [], [], [])
export const Isaaki: Rank = jehammedanRank('isaaki', [], [], [])
export const Saraeli: Rank = jehammedanRank('saraeli', [], [], [])

export const SwordOfJehammed: Rank = jehammedanRank(
  'swordOfJehammed',
  [atLeastSkill(Skills.melee, 6), atLeastSkill(Skills.legends, 4)],
  [atLeastOrigin(Origins.renown, 1)],
  [Ismaeli]
)

export const Abrami: Rank = jehammedanRank(
  'abrami',
  [atLeastSkill(Skills.legends, 6)],
  [atLeastOrigin(Origins.authority, 3), atLeastOrigin(Origins.resources, 2)],
  [SwordOfJehammed]
)

export const Shepherd: Rank = jehammedanRank(
  'shepherd',
  [atLeastSkill(Skills.legends, 10)],
  [
    atLeastOrigin(Origins.authority, 5),
    atLeastOrigin(Origins.renown, 6),
    atLeastOrigin(Origins.allies, 3)
  ],
  [Abrami]
)

export const JehammedsBlessing: Rank = jehammedanRank(
  'jehammedsBlessing',
  [
    atLeastSkill(Skills.toughness, 10),
    atLeastSkill(Skills.melee, 10),
    atLeastSkill(Skills.navigation, 8)
  ],
  [atLeastOrigin(Origins.renown, 4), atLeastOrigin(Origins.authority, 4)],
  [Isaaki]
)

export const Iconide: Rank = jehammedanRank(
  'iconide',
  [],
  [atLeastOrigin(Origins.renown, 6), atLeastOrigin(Origins.authority, 5)],
  [JehammedsBlessing]
)

export const Prophet: Rank = jehammedanRank(
  'prophet',
  [],
  [
    atLeastOrigin(Origins.renown, 6),
    atLeastOrigin(Origins.authority, 6),
    atLeastOrigin(Origins.secrets, 4)
  ],
  [Iconide]
)

export const Delilah: Rank = jehammedanRank(
  'delilah',
  [
    either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10)),
    atLeastSkill(Skills.melee, 6)
  ],
  [],
  [Hagari]
)

export const VoiceOfJehammed: Rank = jehammedanRank(
  'voiceOfJehammed',
  [atLeastSkill(Skills.legends, 8), atLeastSkill(Skills.expression, 8)],
  [atLeastOrigin(Origins.renown, 3), atLeastOrigin(Origins.authority, 2)],
  [Hagari]
)

export const RighteousOne: Rank = jehammedanRank(
  'righteousOne',
  [
    atLeastSkill(Skills.legends, 10),
    either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10))
  ],
  [atLeastOrigin(Origins.renown, 4), atLeastOrigin(Origins.authority, 5)],
  [VoiceOfJehammed]
)

export const PrideOfJehammed: Rank = jehammedanRank('prideOfJehammed', [], [], [Saraeli])

export const Maculate: Rank = jehammedanRank('maculate', [], [], [Saraeli])

export const Immaculate: Rank = jehammedanRank('immaculate', [], [], [Saraeli])

export const Iconess: Rank = jehammedanRank(
  'iconess',
  [],
  [atLeastOrigin(Origins.renown, 6), atLeastOrigin(Origins.authority, 5)],
  [Immaculate]
)

export const Oracle: Rank = jehammedanRank(
  'oracle',
  [],
  [
    atLeastOrigin(Origins.renown, 6),
    atLeastOrigin(Origins.authority, 6),
    atLeastOrigin(Origins.secrets, 4)
  ],
  [Iconess]
)

export const Arianoi: Rank = jehammedanRank(
  'arianoi',
  [
    atLeastSkill(Skills.toughness, 8),
    either(atLeastSkill(Skills.faith, 8), atLeastSkill(Skills.willpower, 8))
  ],
  [atLeastOrigin(Origins.secrets, 3)],
  [],
  true,
  3,
  undefined,
  [Delilah, SwordOfJehammed, JehammedsBlessing, Maculate]
)

export const BloodOfAries: Rank = jehammedanRank(
  'bloodOfAries',
  [
    atLeastSkill(Skills.stamina, 10),
    atLeastSkill(Skills.legends, 8),
    atLeastSkill(Skills.orienteering, 6)
  ],
  [atLeastOrigin(Origins.secrets, 4)],
  [Arianoi],
  true,
  4
)

export const Fatum: Rank = jehammedanRank(
  'fatum',
  [atLeastSkill(Skills.legends, 10), atLeastSkill(Skills.empathy, 8)],
  [
    atLeastOrigin(Origins.secrets, 5),
    atLeastOrigin(Origins.authority, 5),
    atLeastOrigin(Origins.renown, 5)
  ],
  [BloodOfAries],
  true,
  5
)

export const JehammedansRanks = [
  Ismaeli,
  SwordOfJehammed,
  Abrami,
  Shepherd,
  Isaaki,
  JehammedsBlessing,
  Iconide,
  Iconess,
  Prophet,
  Oracle,
  Hagari,
  Delilah,
  VoiceOfJehammed,
  RighteousOne,
  Saraeli,
  PrideOfJehammed,
  Maculate,
  Immaculate,
  Arianoi,
  BloodOfAries,
  Fatum
]

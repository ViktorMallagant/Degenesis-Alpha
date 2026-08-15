import { Clan } from '@/config/model'
import { Origins, Skills, type Origin } from '@/config/properties'
import { atLeastOrigin, atLeastSkill, either, type Requirement } from '@/config/requirements'
import type { Rank } from '@/config/ranks/ranks'
import { clanRank } from './util'

export type RankOriginBonuses = Partial<Record<keyof typeof Origins, number>>
export type RankWithOriginBonuses = Rank & { originBonuses?: RankOriginBonuses }

export const Providers = new Clan('providers', [
  Skills.force,
  Skills.stamina,
  Skills.toughness,
  Skills.science,
  Skills.survival
])

const providersRank = clanRank(Providers)

// Runner grants +1 Allies. All higher Provider ranks descend from Runner, so
// carry the same permanent Background bonus without changing points spent.
const withRunnerBonus = (rank: Rank): RankWithOriginBonuses => {
  const providerRank = rank as RankWithOriginBonuses
  providerRank.originBonuses = { allies: 1 }
  return providerRank
}

// Bruiser requires an effective Allies 2. Since every Provider reaching this
// rank has Runner's +1 Allies, a purchased Allies 1 satisfies the condition.
// Keep the displayed prerequisite at the rules-text value of 2.
const providerAlliesTwo: Requirement<Origin> = {
  items: [Origins.allies],
  check(items) {
    const allies = items.find((value) => value.property.name === Origins.allies.name)
    return (allies?.value ?? 0) + 1 >= 2
  },
  format(translator) {
    return `${Origins.allies.format(translator)} >= 2`
  }
}

export const Runner = withRunnerBonus(providersRank('runner', [], [], []))

export const Bruiser = withRunnerBonus(providersRank(
  'bruiser',
  [either(atLeastSkill(Skills.melee, 6), atLeastSkill(Skills.brawl, 6))],
  [providerAlliesTwo],
  [Runner]
))

export const Harvester = withRunnerBonus(providersRank(
  'harvester',
  [
    atLeastSkill(Skills.force, 6),
    atLeastSkill(Skills.stamina, 6),
    atLeastSkill(Skills.survival, 6)
  ],
  [],
  [Runner]
))

export const Vandal = withRunnerBonus(providersRank(
  'vandal',
  [
    atLeastSkill(Skills.domination, 8),
    atLeastSkill(Skills.leadership, 8)
  ],
  [atLeastOrigin(Origins.authority, 4)],
  [Bruiser, Harvester]
))

export const Supplier = withRunnerBonus(providersRank(
  'supplier',
  [
    atLeastSkill(Skills.negotiation, 7),
    atLeastSkill(Skills.cunning, 7)
  ],
  [atLeastOrigin(Origins.network, 4)],
  [Bruiser, Harvester]
))

// "Started a family" is a narrative prerequisite with no corresponding
// character-state field, so it remains visible in the rank description.
export const Brigadier = withRunnerBonus(providersRank(
  'brigadier',
  [
    atLeastSkill(Skills.survival, 8),
    atLeastSkill(Skills.legends, 6)
  ],
  [],
  [Vandal, Supplier]
))

// Judge sponsorship, Codex familiarity, and literacy are narrative conditions
// that the current character model cannot verify automatically.
export const Juryman = withRunnerBonus(providersRank(
  'juryman',
  [
    atLeastSkill(Skills.melee, 6),
    atLeastSkill(Skills.domination, 6)
  ],
  [],
  [Brigadier]
))

// "Several successful farms operated by their offspring" likewise remains a
// narrative condition rather than an invented mechanical checkbox.
export const Patriarch = withRunnerBonus(providersRank(
  'patriarch',
  [atLeastSkill(Skills.leadership, 10)],
  [atLeastOrigin(Origins.authority, 5)],
  [Brigadier]
))

export const ProvidersRanks = [
  Runner,
  Bruiser,
  Harvester,
  Vandal,
  Supplier,
  Brigadier,
  Juryman,
  Patriarch
]

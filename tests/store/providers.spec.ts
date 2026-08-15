import { expect, test } from 'vitest'
import config from '../../src/config'
import { ranksByCult } from '../../src/config/cults/cults'
import { cultSpecificPotentials } from '../../src/config/potentials'
import { Origins } from '../../src/config/properties'

test('Providers uses its dedicated preferred skills and rank tree', () => {
  const clan = config.clans.Providers

  expect(clan.bonusSkillNames).toEqual([
    'force',
    'stamina',
    'toughness',
    'science',
    'survival'
  ])

  const ranks = ranksByCult(config.cults.Clanners, clan)
  expect(ranks.map((rank) => rank.name)).toEqual([
    'providers-runner',
    'providers-bruiser',
    'providers-harvester',
    'providers-vandal',
    'providers-supplier',
    'providers-brigadier',
    'providers-juryman',
    'providers-patriarch'
  ])
  expect(ranks.map((rank) => rank.hierarchyLevel)).toEqual([1, 2, 2, 3, 3, 4, 5, 5])
})

test('Earthbound is available only to Providers', () => {
  const providerPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Providers)
    .map((potential) => potential.name)
  const stukovPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Stukov)
    .map((potential) => potential.name)

  expect(providerPotentials).toContain('earthbound')
  expect(stukovPotentials).not.toContain('earthbound')
})

test('Runner Allies bonus is carried by every Provider rank', () => {
  const ranks = ranksByCult(config.cults.Clanners, config.clans.Providers)

  for (const rank of ranks) {
    expect((rank as any).originBonuses?.allies).toBe(1)
  }
})

test('Bruiser Allies 2 prerequisite accounts for the Runner bonus', () => {
  const bruiseRank = ranksByCult(config.cults.Clanners, config.clans.Providers)
    .find((rank) => rank.name === 'providers-bruiser')

  expect(bruiseRank).toBeDefined()
  expect(bruiseRank?.requiredOrigins[0].check([Origins.allies.withValue(1)])).toBe(true)
  expect(bruiseRank?.requiredOrigins[0].check([Origins.allies.withValue(0)])).toBe(false)
})

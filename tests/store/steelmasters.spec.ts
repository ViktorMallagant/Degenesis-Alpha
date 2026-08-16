import { expect, test } from 'vitest'
import config from '../../src/config'
import { ranksByCult } from '../../src/config/cults/cults'
import { cultSpecificPotentials } from '../../src/config/potentials'
import { Origins, Skills, SkillWithAttribute } from '../../src/config/properties'

test('Steel Masters uses its dedicated preferred skills and rank tree', () => {
  const clan = config.clans.SteelMasters

  expect(clan.bonusSkillNames).toEqual([
    'force',
    'crafting',
    'engineering',
    'legends',
    'science'
  ])

  const ranks = ranksByCult(config.cults.Clanners, clan)
  expect(ranks.map((rank) => rank.name)).toEqual([
    'steelmasters-fledgling',
    'steelmasters-shaper',
    'steelmasters-metallurgist',
    'steelmasters-foreman',
    'steelmasters-overseer',
    'steelmasters-artificer',
    'steelmasters-steelmasterogota',
    'steelmasters-steelmastergotokai'
  ])
  expect(ranks.map((rank) => rank.hierarchyLevel)).toEqual([1, 2, 2, 3, 3, 4, 5, 5])
})

test('Spiritshaper is available only to Steel Masters', () => {
  const steelMasterPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.SteelMasters)
    .map((potential) => potential.name)
  const providerPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Providers)
    .map((potential) => potential.name)

  expect(steelMasterPotentials).toContain('spiritshaper')
  expect(providerPotentials).not.toContain('spiritshaper')
})

test('Foreman and Overseer enforce their Background requirements', () => {
  const ranks = ranksByCult(config.cults.Clanners, config.clans.SteelMasters)
  const foreman = ranks.find((rank) => rank.name === 'steelmasters-foreman')
  const overseer = ranks.find((rank) => rank.name === 'steelmasters-overseer')

  expect(foreman?.requiredOrigins[0].check([Origins.network.withValue(3)])).toBe(true)
  expect(foreman?.requiredOrigins[0].check([Origins.network.withValue(2)])).toBe(false)
  expect(overseer?.requiredOrigins[0].check([Origins.authority.withValue(3)])).toBe(true)
  expect(overseer?.requiredOrigins[0].check([Origins.authority.withValue(2)])).toBe(false)
})

test('Both Steel Master end ranks require Crafting 11', () => {
  const ranks = ranksByCult(config.cults.Clanners, config.clans.SteelMasters)
  const endRanks = ranks.filter((rank) =>
    rank.name === 'steelmasters-steelmasterogota' || rank.name === 'steelmasters-steelmastergotokai'
  )
  const crafting = new SkillWithAttribute(Skills.crafting)

  expect(endRanks).toHaveLength(2)
  for (const rank of endRanks) {
    expect(rank.requiredSkills[0].check([crafting.withValue(11)])).toBe(true)
    expect(rank.requiredSkills[0].check([crafting.withValue(10)])).toBe(false)
  }
})

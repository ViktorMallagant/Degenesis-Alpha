import { expect, test } from 'vitest'
import config from '../../src/config'
import { ranksByCult } from '../../src/config/cults/cults'
import { cultSpecificPotentials } from '../../src/config/potentials'
import { Origins, Skills } from '../../src/config/properties'

test('Britoni uses its dedicated preferred skills and rank tree', () => {
  const clan = config.clans.Britoni

  expect(clan.bonusSkillNames).toEqual([
    'force',
    'navigation',
    'legends',
    'survival',
    'orienteering'
  ])

  const ranks = ranksByCult(config.cults.Clanners, clan)
  expect(ranks.map((rank) => rank.name)).toEqual([
    'britoni-kelp',
    'britoni-waverider',
    'britoni-anchor',
    'britoni-bullkiller',
    'britoni-balmer',
    'britoni-prow',
    'britoni-oppolid',
    'britoni-whaler'
  ])
  expect(ranks.map((rank) => rank.hierarchyLevel)).toEqual([1, 2, 2, 3, 3, 4, 5, 5])
})

test('Riptide is available only to Britoni', () => {
  const britoniPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Britoni)
    .map((potential) => potential.name)
  const steelMasterPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.SteelMasters)
    .map((potential) => potential.name)

  expect(britoniPotentials).toContain('riptide')
  expect(steelMasterPotentials).not.toContain('riptide')
})

test('Prow accepts either Projectiles 9 or Melee 9', () => {
  const prow = ranksByCult(config.cults.Clanners, config.clans.Britoni)
    .find((rank) => rank.name === 'britoni-prow')

  expect(prow).toBeDefined()
  expect(prow?.requiredSkills[0].check([Skills.projectiles.withValue(9)])).toBe(true)
  expect(prow?.requiredSkills[0].check([Skills.melee.withValue(9)])).toBe(true)
  expect(prow?.requiredSkills[0].check([
    Skills.projectiles.withValue(8),
    Skills.melee.withValue(8)
  ])).toBe(false)
})

test('Whaler requires Renown 5 and grants Resources 6 as an effective minimum', () => {
  const whaler = ranksByCult(config.cults.Clanners, config.clans.Britoni)
    .find((rank) => rank.name === 'britoni-whaler')

  expect(whaler).toBeDefined()
  expect(whaler?.requiredOrigins[0].check([Origins.renown.withValue(5)])).toBe(true)
  expect(whaler?.requiredOrigins[0].check([Origins.renown.withValue(4)])).toBe(false)
  expect((whaler as any)?.originMinimums?.resources).toBe(6)
})

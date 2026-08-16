import { expect, test } from 'vitest'
import config from '../../src/config'
import { ranksByCult } from '../../src/config/cults/cults'
import { cultSpecificPotentials } from '../../src/config/potentials'
import { Skills } from '../../src/config/properties'

test('Pictons uses its dedicated preferred skills and rank tree', () => {
  const clan = config.clans.Pictons

  expect(clan.bonusSkillNames).toEqual([
    'toughness',
    'engineering',
    'legends',
    'reaction',
    'empathy'
  ])
  expect(clan.mentalDefenseSuccessBonus).toBe(1)

  const ranks = ranksByCult(config.cults.Clanners, clan)
  expect(ranks.map((rank) => rank.name)).toEqual([
    'pictons-orbiter',
    'pictons-trajector',
    'pictons-booster',
    'pictons-stareater',
    'pictons-deathwalker',
    'pictons-nebula',
    'pictons-gemini',
    'pictons-pulsar'
  ])
  expect(ranks.map((rank) => rank.hierarchyLevel)).toEqual([1, 2, 2, 3, 3, 4, 5, 5])
})

test('Implanted Expertise is available only to Pictons', () => {
  const pictonPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Pictons)
    .map((potential) => potential.name)
  const britoniPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Britoni)
    .map((potential) => potential.name)

  expect(pictonPotentials).toContain('implantedExpertise')
  expect(britoniPotentials).not.toContain('implantedExpertise')
})

test('Nebula accepts either Melee 8 or Projectiles 8', () => {
  const nebula = ranksByCult(config.cults.Clanners, config.clans.Pictons)
    .find((rank) => rank.name === 'pictons-nebula')

  expect(nebula).toBeDefined()
  expect(nebula?.requiredSkills[0].check([Skills.melee.withValue(8)])).toBe(true)
  expect(nebula?.requiredSkills[0].check([Skills.projectiles.withValue(8)])).toBe(true)
  expect(nebula?.requiredSkills[0].check([
    Skills.melee.withValue(7),
    Skills.projectiles.withValue(7)
  ])).toBe(false)
})

test('Gemini accepts Cunning, Deception, or Domination 11', () => {
  const gemini = ranksByCult(config.cults.Clanners, config.clans.Pictons)
    .find((rank) => rank.name === 'pictons-gemini')

  expect(gemini).toBeDefined()
  const psycheRequirement = gemini?.requiredSkills[2]
  expect(psycheRequirement?.check([Skills.cunning.withValue(11)])).toBe(true)
  expect(psycheRequirement?.check([Skills.deception.withValue(11)])).toBe(true)
  expect(psycheRequirement?.check([Skills.domination.withValue(11)])).toBe(true)
  expect(psycheRequirement?.check([
    Skills.cunning.withValue(10),
    Skills.deception.withValue(10),
    Skills.domination.withValue(10)
  ])).toBe(false)
})

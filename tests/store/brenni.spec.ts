import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, expect, test } from 'vitest'
import config from '../../src/config'
import { ranksByCult } from '../../src/config/cults/cults'
import { cultSpecificPotentials } from '../../src/config/potentials'
import { eligibleRanks } from '../../src/config/ranks'
import { Origins, Skills } from '../../src/config/properties'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('Brenni uses its dedicated preferred skills and branching rank tree', () => {
  const clan = config.clans.Brenni

  expect(clan.bonusSkillNames).toEqual([
    'force',
    'crafting',
    'arts',
    'science',
    'deception'
  ])

  const ranks = ranksByCult(config.cults.Clanners, clan)
  expect(ranks.map((rank) => rank.name)).toEqual([
    'brenni-aide',
    'brenni-guru',
    'brenni-brewer',
    'brenni-toxician',
    'brenni-apothecary',
    'brenni-alchemist',
    'brenni-meister',
    'brenni-inheritor'
  ])
  expect(ranks.map((rank) => rank.hierarchyLevel)).toEqual([1, 2, 2, 3, 3, 4, 5, 5])
})

test('Esoteric Cure is available only to Brenni', () => {
  const brenniPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Brenni)
    .map((potential) => potential.name)
  const stukovPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Stukov)
    .map((potential) => potential.name)

  expect(brenniPotentials).toContain('esotericCure')
  expect(stukovPotentials).not.toContain('esotericCure')
})

test('Alchemist accepts Medicine 9 or Science 9', () => {
  const clan = config.clans.Brenni
  const origins = Object.values(Origins).map((origin) => origin.withValue(6))

  const ranksWith = (medicine: number, science: number) => {
    const skills = Object.values(Skills).map((skill) => {
      if (skill.name === 'medicine') return skill.withValue(medicine)
      if (skill.name === 'science') return skill.withValue(science)
      return skill.withValue(10)
    })
    return Array.from(eligibleRanks(config.cults.Clanners, skills, origins, clan))
      .map((rank) => rank.name)
  }

  expect(ranksWith(9, 8)).toContain('brenni-alchemist')
  expect(ranksWith(8, 9)).toContain('brenni-alchemist')
  expect(ranksWith(8, 8)).not.toContain('brenni-alchemist')
})

test('Inheritor carries the Authority, Allies, and Secrets floor of 6', () => {
  const inheritor = ranksByCult(config.cults.Clanners, config.clans.Brenni)
    .find((rank) => rank.name === 'brenni-inheritor') as any

  expect(inheritor.originMinimums).toEqual({
    authority: 6,
    allies: 6,
    secrets: 6
  })
})

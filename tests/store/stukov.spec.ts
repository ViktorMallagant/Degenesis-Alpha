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

test('Stukov uses its dedicated preferred skills and rank tree', () => {
  const clan = config.clans.Stukov

  expect(clan.bonusSkillNames).toEqual([
    'crafting',
    'arts',
    'conduct',
    'legends',
    'orienteering'
  ])

  const ranks = ranksByCult(config.cults.Clanners, clan)
  expect(ranks.map((rank) => rank.name)).toEqual([
    'stukov-citizen',
    'stukov-factotum',
    'stukov-quartermaster',
    'stukov-firewatch',
    'stukov-guildleader',
    'stukov-urbanist',
    'stukov-deputy',
    'stukov-partisan'
  ])
  expect(ranks.map((rank) => rank.hierarchyLevel)).toEqual([1, 2, 2, 3, 3, 4, 5, 5])
})

test('Cultural Memory is available only to Stukov', () => {
  const stukovPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Stukov)
    .map((potential) => potential.name)
  const nomadPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.StukovNomads)
    .map((potential) => potential.name)

  expect(stukovPotentials).toContain('culturalMemory')
  expect(nomadPotentials).not.toContain('culturalMemory')
})

test('Partisan requires an age strictly greater than 60', () => {
  const clan = config.clans.Stukov
  const skills = Object.values(Skills).map((skill) => skill.withValue(10))
  const origins = Object.values(Origins).map((origin) => origin.withValue(6))

  const atSixty = eligibleRanks(config.cults.Clanners, skills, origins, clan, { age: 60 })
  const atSixtyOne = eligibleRanks(config.cults.Clanners, skills, origins, clan, { age: 61 })

  expect(Array.from(atSixty).map((rank) => rank.name)).not.toContain('stukov-partisan')
  expect(Array.from(atSixtyOne).map((rank) => rank.name)).toContain('stukov-partisan')
})

import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, expect, test } from 'vitest'
import config from '../../src/config'
import { ranksByCult } from '../../src/config/cults/cults'
import { useCharacterStore } from '../../src/store/index'
import { Skills } from '../../src/config/properties'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('Setting the cult to Clanners selects HunterGatherers as the clan', () => {
    const store = useCharacterStore()

    // Given the cult is not set to Clanners
    expect(store.clan).toBeUndefined()

    // When the cult is set to Clanners
    store.setCult(config.cults.Clanners)

    // Then the clan is set to HunterGatherers
    expect(store.clan).toEqual(config.clans.HunterGatherers)
})

test('Switching the cult away from Clanners sets the clan to undefined', () => {
    const store = useCharacterStore()

    // Given the cult is set to Clanners
    store.setCult(config.cults.Clanners)
    expect(store.clan).toEqual(config.clans.HunterGatherers)
    
    // When the cult is set to something else
    store.setCult(config.cults.Spitalians)

    // Then the clan is set to undefined
    expect(store.clan).toBeUndefined()
})

test('Setting the clan is not possible if the cult is not set to Clanners', () => {
    const store = useCharacterStore()

    // Given the cult is not set to Clanners
    store.setCult(config.cults.Spitalians)
    expect(store.clan).toBeUndefined()
    
    // When the clan is set
    store.setClan(config.clans.HunterGatherers)

    // Then the clan is not set 
    expect(store.clan).toBeUndefined()
})

test('Setting the clan provides the skill bonuses of the selected clan', () => {
    const store = useCharacterStore()

    // Given the cult set to Clanners (and the clan set to HunterGatherers)
    store.setCult(config.cults.Clanners)
    store.setClan(config.clans.HunterGatherers)
    
    // Then the skill bonuses for HunterGatherers are provided
    expect(store.skillMax(Skills.stamina)).toEqual(3)
})

test('Cockroaches is a selectable Hunter Gatherer template clan', () => {
  const store = useCharacterStore()

  store.setCult(config.cults.Clanners)
  store.setClan(config.clans.Cockroaches)

  expect(store.clan).toEqual(config.clans.Cockroaches)
  expect(store.clan?.name).toBe('cockroaches')
  expect(store.skillMax(Skills.stamina)).toEqual(3)
  expect(store.skillMax(Skills.melee)).toEqual(3)
  expect(store.skillMax(Skills.survival)).toEqual(3)
  expect(store.skillMax(Skills.legends)).toEqual(3)
  expect(store.skillMax(Skills.taming)).toEqual(3)
})

test('Cockroaches inherits the Hunter Gatherer rank tree', () => {
  const ranks = ranksByCult(config.cults.Clanners, config.clans.Cockroaches)

  expect(ranks.map((rank) => rank.name)).toEqual([
    'cockroaches-scout',
    'cockroaches-hunter',
    'cockroaches-gatherer',
    'cockroaches-tribalWarrior',
    'cockroaches-shaman',
    'cockroaches-chieftain',
    'cockroaches-champion',
    'cockroaches-founder'
  ])
  expect(ranks.every((rank) => rank.clan?.name === 'cockroaches')).toBe(true)
})

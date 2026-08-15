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

  expect(store.clan).toBeUndefined()
  store.setCult(config.cults.Clanners)
  expect(store.clan).toEqual(config.clans.HunterGatherers)
})

test('Switching the cult away from Clanners sets the clan to undefined', () => {
  const store = useCharacterStore()

  store.setCult(config.cults.Clanners)
  expect(store.clan).toEqual(config.clans.HunterGatherers)

  store.setCult(config.cults.Spitalians)
  expect(store.clan).toBeUndefined()
})

test('Setting the clan is not possible if the cult is not set to Clanners', () => {
  const store = useCharacterStore()

  store.setCult(config.cults.Spitalians)
  expect(store.clan).toBeUndefined()

  store.setClan(config.clans.HunterGatherers)
  expect(store.clan).toBeUndefined()
})

test('Setting the clan provides the skill bonuses of the selected clan', () => {
  const store = useCharacterStore()

  store.setCult(config.cults.Clanners)
  store.setClan(config.clans.HunterGatherers)

  expect(store.skillMax(Skills.stamina)).toEqual(3)
})

const hunterGathererTemplateClans = [
  config.clans.Cockroaches,
  config.clans.Mechans,
  config.clans.Phosphorites,
  config.clans.Enemoi,
  config.clans.StukovNomads,
  config.clans.Storskis,
  config.clans.CorpseEaters,
  config.clans.Garganti,
  config.clans.Voivodules,
  config.clans.Matadors,
  config.clans.Flayers,
  config.clans.Adriani,
  config.clans.Romanos,
  config.clans.Masai,
  config.clans.Shabath
]

const expectedRankSuffixes = [
  'scout',
  'hunter',
  'gatherer',
  'tribalWarrior',
  'shaman',
  'chieftain',
  'champion',
  'founder'
]

test('Hunter Gatherer template clans are selectable and inherit standard bonuses', () => {
  const store = useCharacterStore()
  store.setCult(config.cults.Clanners)

  for (const clan of hunterGathererTemplateClans) {
    store.setClan(clan)

    expect(store.clan).toEqual(clan)
    expect(store.skillMax(Skills.stamina)).toEqual(3)
    expect(store.skillMax(Skills.melee)).toEqual(3)
    expect(store.skillMax(Skills.survival)).toEqual(3)
    expect(store.skillMax(Skills.legends)).toEqual(3)
    expect(store.skillMax(Skills.taming)).toEqual(3)
  }
})

test('Hunter Gatherer template clans inherit the standard eight-rank tree', () => {
  for (const clan of hunterGathererTemplateClans) {
    const ranks = ranksByCult(config.cults.Clanners, clan)

    expect(ranks.map((rank) => rank.name)).toEqual(
      expectedRankSuffixes.map((suffix) => `${clan.name}-${suffix}`)
    )
    expect(ranks.every((rank) => rank.clan?.name === clan.name)).toBe(true)
  }
})

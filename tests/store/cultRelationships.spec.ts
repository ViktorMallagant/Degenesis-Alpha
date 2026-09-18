import { beforeEach, describe, expect, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCharacterStore } from '../../src/store'
import { defaultCultRelationships } from '../../src/config/cultRelationships'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Cult relationships', () => {
  test('begin at zero and stay within the -6 to +6 range', () => {
    const store = useCharacterStore()

    expect(store.cultRelationships).toEqual(defaultCultRelationships())

    for (let i = 0; i < 10; i += 1) store.increaseCultRelationship('spitalians')
    expect(store.cultRelationships.spitalians).toBe(6)

    for (let i = 0; i < 20; i += 1) store.decreaseCultRelationship('spitalians')
    expect(store.cultRelationships.spitalians).toBe(-6)
  })

  test('are saved and restored with the character', () => {
    const store = useCharacterStore()
    store.setCultRelationship('judges', 4)
    store.setCultRelationship('apocalyptics', -3)

    const character = store.asCharacter
    store.resetCultRelationships()
    store.loadCharacter(character)

    expect(store.cultRelationships.judges).toBe(4)
    expect(store.cultRelationships.apocalyptics).toBe(-3)
  })

  test('default missing values to zero and sanitize imported values', () => {
    const store = useCharacterStore()
    const character = store.asCharacter
    character.cultRelationships = {
      judges: 99,
      palers: -8,
      scrappers: 2.9
    }

    store.loadCharacter(character)

    expect(store.cultRelationships.judges).toBe(6)
    expect(store.cultRelationships.palers).toBe(-6)
    expect(store.cultRelationships.scrappers).toBe(2)
    expect(store.cultRelationships.spitalians).toBe(0)
  })

  test('reset returns every relationship to zero', () => {
    const store = useCharacterStore()
    store.setCultRelationship('anubians', 5)
    store.setCultRelationship('hellvetics', -2)

    store.resetCultRelationships()

    expect(store.cultRelationships).toEqual(defaultCultRelationships())
  })
})

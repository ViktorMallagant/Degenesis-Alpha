import { beforeEach, describe, expect, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { defaultStatusSoftSelections } from '../../src/config/statusSoftSelections'
import { useCharacterStore } from '../../src/store'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Status soft selections', () => {
  test('toggle individual points without exceeding the current maximum', () => {
    const store = useCharacterStore()
    expect(store.statusSoftSelections).toEqual(defaultStatusSoftSelections())

    store.toggleStatusSoftSelection('ego', 2, 6)
    store.toggleStatusSoftSelection('ego', 4, 6)
    store.toggleStatusSoftSelection('ego', 7, 6)
    expect(store.statusSoftSelections.ego).toEqual([2, 4])

    store.toggleStatusSoftSelection('ego', 2, 6)
    expect(store.statusSoftSelections.ego).toEqual([4])
  })

  test('save, restore, and normalize imported values', () => {
    const store = useCharacterStore()
    const character = store.asCharacter
    character.statusSoftSelections = {
      ego: [3, 3, 1, 99],
      trauma: [2.9, -1]
    }

    store.loadCharacter(character)

    expect(store.statusSoftSelections.ego).toEqual([1, 3])
    expect(store.statusSoftSelections.trauma).toEqual([2])
    expect(store.statusSoftSelections.fleshwounds).toEqual([])
  })
})

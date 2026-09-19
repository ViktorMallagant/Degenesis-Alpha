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
      sporeInfestations: [2, 3],
      trauma: [2.9, -1]
    }
    character.statusPermanentSporeInfestations = [4, 4, 2.9, 99]

    store.loadCharacter(character)

    expect(store.statusSoftSelections.ego).toEqual([1, 3])
    expect(store.statusSoftSelections.trauma).toEqual([2])
    expect(store.statusSoftSelections.fleshwounds).toEqual([])
    expect(store.statusSoftSelections.sporeInfestations).toEqual([3])
    expect(store.statusPermanentSporeInfestations).toEqual([2, 4])
  })

  test('cycles Spore Infestation points from temporary to permanent to normal', () => {
    const store = useCharacterStore()

    store.toggleStatusSoftSelection('sporeInfestations', 3, 8)
    expect(store.statusSoftSelections.sporeInfestations).toEqual([3])
    expect(store.statusPermanentSporeInfestations).toEqual([])

    store.toggleStatusSoftSelection('sporeInfestations', 3, 8)
    expect(store.statusSoftSelections.sporeInfestations).toEqual([])
    expect(store.statusPermanentSporeInfestations).toEqual([3])

    store.toggleStatusSoftSelection('sporeInfestations', 3, 8)
    expect(store.statusSoftSelections.sporeInfestations).toEqual([])
    expect(store.statusPermanentSporeInfestations).toEqual([])

    store.toggleStatusSoftSelection('sporeInfestations', 9, 8)
    expect(store.statusSoftSelections.sporeInfestations).toEqual([])
    expect(store.statusPermanentSporeInfestations).toEqual([])
  })
})

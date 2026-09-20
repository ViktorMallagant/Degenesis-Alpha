import { beforeEach, expect, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import config from '../../src/config'
import { AllLegacies } from '../../src/config/legacies'
import { ranksByCult } from '../../src/config/cults/cults'
import { ITEMS, levelToMinAdvancements } from '../../src/config/items'
import { EditorMode } from '../../src/config/modes'
import { Origins } from '../../src/config/properties'
import { useCharacterStore } from '../../src/store'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('Inventory Resources include selected points and Legacy bonuses', () => {
  const store = useCharacterStore()
  const debitor = AllLegacies.find(legacy => legacy.name === 'debitor')
  const familyBond = AllLegacies.find(legacy => legacy.name === 'familybond')

  expect(debitor).toBeDefined()
  expect(familyBond).toBeDefined()

  store.setEditorMode(EditorMode.Free)
  store.setOrigin(Origins.resources, 1)
  store.setLegacy(debitor!, 1)
  store.setLegacy(familyBond!, 1)

  expect(store.baseResourcesLevel).toBe(4)
  expect(store.effectiveResourcesLevel).toBe(4)
  expect(store.resourceAdvancements).toBe(levelToMinAdvancements(4))
})

test('Legacy Background bonuses stack above the selected Background value', () => {
  const store = useCharacterStore()
  const familyBond = AllLegacies.find(legacy => legacy.name === 'familybond')

  expect(familyBond).toBeDefined()

  store.setEditorMode(EditorMode.Free)
  store.setLegacy(familyBond!, 1)
  store.setOrigin(Origins.resources, 4)

  expect(store.originValue(Origins.resources)).toBe(4)
  expect(store.effectiveOriginValue(Origins.resources)).toBe(6)
  expect(store.spentPoints.origins).toBe(4)
})

test('Inventory Resources honor a Resources minimum granted by rank', () => {
  const store = useCharacterStore()
  const whaler = ranksByCult(config.cults.Clanners, config.clans.Britoni)
    .find(rank => rank.name === 'britoni-whaler')

  expect(whaler).toBeDefined()

  store.setEditorMode(EditorMode.Free)
  store.setOrigin(Origins.resources, 2)
  store.$patch({ rank: whaler! })

  expect(store.baseResourcesLevel).toBe(6)
  expect(store.effectiveResourcesLevel).toBe(6)
})

test('Inventory item levels can be changed after acquisition', () => {
  const store = useCharacterStore()
  const levelableItem = ITEMS.find(item => item.levelable)

  expect(levelableItem).toBeDefined()

  store.addFreeItem(levelableItem!.id)
  expect(store.inventory[0].level).toBeUndefined()

  store.setInventoryItemLevel(0, 3)
  expect(store.inventory[0].level).toBe(3)

  store.setInventoryItemLevel(0, 1)
  expect(store.inventory[0].level).toBeUndefined()
})

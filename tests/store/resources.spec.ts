import { beforeEach, expect, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import config from '../../src/config'
import { AllLegacies } from '../../src/config/legacies'
import { ranksByCult } from '../../src/config/cults/cults'
import { levelToMinAdvancements } from '../../src/config/items'
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

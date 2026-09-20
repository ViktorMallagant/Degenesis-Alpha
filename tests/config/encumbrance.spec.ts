import { beforeEach, describe, expect, test } from 'vitest'
import { calculateInventoryEncumbrance } from '../../src/config/encumbrance'
import { ITEMS, type InventoryPurchase } from '../../src/config/items'
import { createPinia, setActivePinia } from 'pinia'
import { useCharacterStore } from '../../src/store'

function inventory(...itemIds: string[]): InventoryPurchase[] {
  return itemIds.map(itemId => ({
    itemId,
    purchasedWithResources: false,
    decrementedResources: false,
    free: true,
  }))
}

describe('inventory encumbrance', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('counts ordinary items, weapons, and armor normally without carrying equipment', () => {
    expect(calculateInventoryEncumbrance(inventory(
      'tente',
      'pistol-9mm',
      'armure-cuir',
    ))).toBe(6)
  })

  test('a backpack turns up to three points of non-weapon cargo into one point', () => {
    expect(calculateInventoryEncumbrance(inventory('sac-dos', 'tente'))).toBe(1)
    expect(calculateInventoryEncumbrance(inventory(
      'sac-dos',
      'tente',
      'couverture-sac-couchage',
    ))).toBe(3)
  })

  test('a backpack and sleigh cover six cargo points but do not reduce weapons or armor', () => {
    expect(calculateInventoryEncumbrance(inventory(
      'sac-dos',
      'traineau',
      'tente',
      'tente',
      'pistol-9mm',
      'armure-cuir',
    ))).toBe(5)
  })

  test('extra containers do not grant more capacity', () => {
    expect(calculateInventoryEncumbrance(inventory(
      'sac-dos',
      'sac-dos',
      'tente',
    ))).toBe(2)
  })

  test('carrying rigs reduce final encumbrance by one each, cap at three, and never go negative', () => {
    expect(calculateInventoryEncumbrance(inventory(
      'tente',
      'charrette-bras',
      'charrette-bras',
    ))).toBe(1)

    expect(calculateInventoryEncumbrance(inventory(
      'sac-dos',
      'charrette-bras',
      'charrette-bras',
      'charrette-bras',
      'charrette-bras',
    ))).toBe(0)
  })

  test('a carrying rig exposes levels and reduces encumbrance by its level', () => {
    expect(ITEMS.find(item => item.id === 'charrette-bras')?.levelable).toBe(true)

    const levelThreeRig = inventory('tente', 'charrette-bras')
    levelThreeRig[1].level = 3
    expect(calculateInventoryEncumbrance(levelThreeRig)).toBe(0)

    const cappedRigs = inventory('tente', 'tente', 'charrette-bras', 'charrette-bras')
    cappedRigs[2].level = 2
    cappedRigs[3].level = 2
    expect(calculateInventoryEncumbrance(cappedRigs)).toBe(3)
  })

  test('exposes the adjusted total through the character store for PDF export', () => {
    const store = useCharacterStore()
    store.inventory = inventory('sac-dos', 'tente', 'pistol-9mm')

    expect(store.totalEncumbrance).toBe(2)
  })

  test('updates the store and PDF encumbrance total when a carrying rig level changes', () => {
    const store = useCharacterStore()
    store.inventory = inventory('tente', 'charrette-bras')

    expect(store.totalEncumbrance).toBe(2)
    store.setInventoryItemLevel(1, 3)
    expect(store.totalEncumbrance).toBe(0)
  })
})

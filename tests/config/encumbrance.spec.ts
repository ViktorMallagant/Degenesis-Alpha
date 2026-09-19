import { describe, expect, test } from 'vitest'
import { calculateInventoryEncumbrance } from '../../src/config/encumbrance'
import type { InventoryPurchase } from '../../src/config/items'

function inventory(...itemIds: string[]): InventoryPurchase[] {
  return itemIds.map(itemId => ({
    itemId,
    purchasedWithResources: false,
    decrementedResources: false,
    free: true,
  }))
}

describe('inventory encumbrance', () => {
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
})

import {
  ITEMS,
  type InventoryPurchase,
  type Item,
  type ItemCategory,
} from '@/config/items'

const BACKPACK_ID = 'sac-dos'
const SLEIGH_ID = 'traineau'
const CARRYING_RIG_ID = 'charrette-bras'

const WEAPON_OR_ARMOR_CATEGORIES = new Set<ItemCategory>([
  'brawlingweapons',
  'meleeweapons',
  'thrownweapons',
  'projectiles',
  'handguns',
  'rifles',
  'heavyweapons',
  'explosives',
  'sonicweapons',
  'armor',
  'artillery',
])

function isWeaponOrArmor(item: Item): boolean {
  return WEAPON_OR_ARMOR_CATEGORIES.has(item.category)
}

export function calculateInventoryEncumbrance(
  inventory: InventoryPurchase[],
  items: Item[] = ITEMS,
): number {
  const itemsById = new Map(items.map(item => [item.id, item]))
  const ownedItems = inventory
    .map(purchase => itemsById.get(purchase.itemId))
    .filter((item): item is Item => item !== undefined)

  const activeContainerIds = new Set<string>()
  if (ownedItems.some(item => item.id === BACKPACK_ID)) activeContainerIds.add(BACKPACK_ID)
  if (ownedItems.some(item => item.id === SLEIGH_ID)) activeContainerIds.add(SLEIGH_ID)

  const countedContainers = new Set<string>()
  let protectedEncumbrance = 0
  let packableEncumbrance = 0
  let carryingRigs = 0

  for (const item of ownedItems) {
    if (item.id === CARRYING_RIG_ID) carryingRigs += 1

    if (activeContainerIds.has(item.id) && !countedContainers.has(item.id)) {
      countedContainers.add(item.id)
      continue
    }

    const encumbrance = Math.max(0, item.encumbrance ?? 0)
    if (isWeaponOrArmor(item)) protectedEncumbrance += encumbrance
    else packableEncumbrance += encumbrance
  }

  const containerCount = activeContainerIds.size
  const containerCapacity = containerCount * 3
  const packedEncumbrance = containerCount + Math.max(0, packableEncumbrance - containerCapacity)
  const rigReduction = Math.min(3, carryingRigs)

  return Math.max(0, protectedEncumbrance + packedEncumbrance - rigReduction)
}

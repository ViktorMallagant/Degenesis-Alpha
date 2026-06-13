<template>
  <div class="inventory-root">
    <!-- ── Header : budget + ressources + mode ── -->
    <div class="inv-header elevation-2 pa-4 d-flex flex-wrap align-center gap-4">
      <!-- Budget LC/Dinars -->
      <div class="inv-stat-chip">
        <span class="inv-stat-label">{{ store.computedDinars?.currency ?? 'LC' }}</span>
        <input
          v-if="store.editorMode === 'free'"
          type="number"
          :value="store.manualLC !== null ? store.manualLC : (store.computedDinars?.value ?? 0)"
          @change="e => { const v = (e.target as HTMLInputElement).value; store.setManualLC(v === '' ? null : Number(v)) }"
          class="inv-lc-inline-input"
          :class="store.remainingLC < 0 ? 'text-red' : ''"
        />
        <span v-else class="inv-stat-value" :class="store.remainingLC < 0 ? 'text-red' : ''">
          {{ store.remainingLC }}
        </span>
        <span v-if="store.editorMode !== 'free'" class="inv-stat-sub inv-muted">(base : {{ store.computedDinars?.value ?? 0 }})</span>
      </div>

      <v-divider vertical class="mx-2" style="height:40px"></v-divider>

      <!-- Ressources -->
      <div class="inv-stat-chip">
        <span class="inv-stat-label">Ressources</span>
        <span class="inv-stat-value">
          <template v-if="store.resourceMode !== 'C'">
            {{ store.effectiveResourcesLevel }}
            <span class="inv-stat-sub inv-muted">/ {{ store.baseResourcesLevel }}</span>
          </template>
          <template v-else>
            {{ store.remainingAdvancements }} av.
            <span class="inv-stat-sub inv-muted">(niv. {{ store.effectiveResourcesLevelForModeC }})</span>
          </template>
        </span>
      </div>

      <!-- Info avancements (mode C uniquement) -->
      <div v-if="store.resourceMode === 'C'" class="text-caption inv-muted">
        Base : {{ store.resourceAdvancements }} av. (Ressources {{ store.baseResourcesLevel }})
      </div>

      <v-divider vertical class="mx-2" style="height:40px"></v-divider>

      <!-- Encombrement -->
      <div class="inv-stat-chip">
        <span class="inv-stat-label">Encombrement</span>
        <span class="inv-stat-value" :class="encumbrancePenalty > 0 ? 'text-red' : 'text-green'">
          {{ totalEncumbrance }}
        </span>
        <span class="inv-stat-sub inv-muted">/ {{ phyPlusForce }} (PHY+Force)</span>
        <span v-if="encumbrancePenalty > 0" class="inv-stat-sub text-red font-weight-bold">
          Malus −{{ encumbrancePenalty }}D
        </span>
      </div>

      <v-spacer></v-spacer>

      <!-- Sélecteur de mode -->
      <div class="d-flex align-center gap-2">
        <span class="text-caption text-uppercase inv-muted mr-1">Mode Ressources</span>
        <v-btn-toggle v-model="store.resourceMode" density="compact" variant="outlined" divided mandatory>
          <v-btn value="A" size="small">
            <v-tooltip activator="parent" location="bottom" max-width="300">
              <strong>Mode A — PDF FR</strong><br>
              Peut acquérir si valeur ≤ Ressources. La valeur de Ressources est réduite de 1 à chaque achat.
            </v-tooltip>
            A
          </v-btn>
          <v-btn value="B" size="small">
            <v-tooltip activator="parent" location="bottom" max-width="300">
              <strong>Mode B — Officiel</strong><br>
              Peut acquérir si valeur ≤ Ressources. La valeur n'est réduite de 1 que si l'objet est <em>égal</em> aux Ressources.
            </v-tooltip>
            B
          </v-btn>
          <v-btn value="C" size="small">
            <v-tooltip activator="parent" location="bottom" max-width="300">
              <strong>Mode C — Katsu</strong><br>
              Chaque objet coûte sa valeur en avancements. Perdre trop d'avancements réduit le niveau de Ressources.
            </v-tooltip>
            C
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <div class="inv-body">
      <!-- ── Inventaire actuel ── -->
      <div class="inv-section">
        <div class="inv-section-title">Inventaire
          <span class="text-caption inv-muted ml-1">({{ store.inventory.length }} objet{{ store.inventory.length !== 1 ? 's' : '' }})</span>
        </div>

        <div v-if="store.inventory.length === 0" class="inv-muted text-body-2 pa-2">
          Aucun objet acquis.
        </div>

        <v-table v-else density="compact" class="inv-table">
          <thead>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Cat.</th>
              <th>Maniab.</th>
              <th>Portée</th>
              <th>Dégâts</th>
              <th>Charg.</th>
              <th>Propriétés</th>
              <th>Encomb.</th>
              <th>Tech.</th>
              <th>Empl.</th>
              <th>Acquis via</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ purchase, index } in store.inventoryItems" :key="index">
              <template v-if="getItem(purchase.itemId)">
                <td class="inv-img-cell">
                  <img v-if="getItem(purchase.itemId)!.image" :src="getItem(purchase.itemId)!.image" class="inv-item-img" />
                </td>
                <td class="font-weight-medium">
                  <HoverTooltip :description="getItem(purchase.itemId)!.description">
                    <span :class="getItem(purchase.itemId)!.description ? 'inv-has-tooltip' : ''">
                      {{ getItem(purchase.itemId)!.name }}
                    </span>
                  </HoverTooltip>
                  <v-chip v-if="purchase.level" size="x-small" color="orange-darken-2" class="ml-1">Niv. {{ purchase.level }}</v-chip>
                </td>
                <td class="text-caption inv-muted">{{ categoryLabel(getItem(purchase.itemId)!.category) }}</td>
                <td>{{ getItem(purchase.itemId)!.handling ?? '—' }}</td>
                <td>{{ getItem(purchase.itemId)!.range ?? '—' }}</td>
                <td>{{ getItem(purchase.itemId)!.damage ?? '—' }}</td>
                <td>{{ getItem(purchase.itemId)!.magazine ?? '—' }}</td>
                <td class="text-caption">
                  <template v-if="getItem(purchase.itemId)!.properties">
                    <div v-for="(prop, idx) in parseProperties(getItem(purchase.itemId)!.properties)" :key="idx">
                      <HoverTooltip :description="getPropertyDescription(prop)">
                        <span :class="getPropertyDescription(prop) ? 'inv-has-tooltip' : ''">{{ prop }}</span>
                      </HoverTooltip>
                    </div>
                  </template>
                  <span v-else class="inv-muted">—</span>
                </td>
                <td>{{ getItem(purchase.itemId)!.encumbrance ?? '—' }}</td>
                <td>{{ getItem(purchase.itemId)!.techLevel ?? '—' }}</td>
                <td>{{ getItem(purchase.itemId)!.slots ?? '—' }}</td>
                <td>
                  <v-chip size="x-small" :color="purchase.purchasedWithResources ? 'blue-darken-1' : 'green-darken-1'" text-color="white">
                    {{ purchase.purchasedWithResources ? 'Ressources' : (store.computedDinars?.currency ?? 'LC') }}
                  </v-chip>
                </td>
                <td>
                  <button class="inv-remove-btn" @click="store.removeInventoryItem(index)">×</button>
                </td>
              </template>
            </tr>
          </tbody>
        </v-table>
      </div>

      <!-- ── Catalogue ── -->
      <div class="inv-section">
        <div class="inv-section-title">Catalogue</div>

        <!-- Filtres -->
        <div class="d-flex flex-wrap gap-3 mb-3">
          <v-text-field
            v-model="search"
            placeholder="Rechercher..."
            variant="outlined"
            density="compact"
            hide-details
            clearable
            style="max-width:260px"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          <v-select
            v-model="selectedCategory"
            :items="availableCategoryOptions"
            item-title="label"
            item-value="value"
            placeholder="Toutes les catégories"
            variant="outlined"
            density="compact"
            hide-details
            clearable
            style="max-width:280px"
          ></v-select>
          <v-checkbox
            v-model="showOnlyAffordable"
            density="compact"
            hide-details
            class="mt-1"
          >
            <template #label>
              <span class="inv-checkbox-label">Accessibles seulement</span>
            </template>
          </v-checkbox>
          <v-checkbox
            v-model="showOnlyCult"
            density="compact"
            hide-details
            class="mt-1"
          >
            <template #label>
              <HoverTooltip description="Seuls les équipements du culte auquel vous appartenez sont montrés. Cochez cette case pour filtrer uniquement les équipements de culte.">
                <span class="inv-checkbox-label inv-has-tooltip">Équipement de Culte</span>
              </HoverTooltip>
            </template>
          </v-checkbox>
          <v-checkbox
            v-model="showAllCults"
            density="compact"
            hide-details
            class="mt-1"
          >
            <template #label>
              <span class="inv-checkbox-label">Montrez tous les équipements de Culte</span>
            </template>
          </v-checkbox>
        </div>

        <!-- Groupes par catégorie -->
        <div v-if="filteredCatalogGroups.length === 0" class="inv-muted text-body-2 pa-2">
          Aucun objet disponible pour les filtres sélectionnés.
        </div>

        <div v-for="group in filteredCatalogGroups" :key="group.category" class="mb-4">
          <div class="inv-category-header" @click="toggleCategory(group.category)">
            <span>{{ group.label }}</span>
            <span class="inv-category-chevron" :class="{ collapsed: collapsedCategories.has(group.category) }">▾</span>
          </div>
          <v-table v-show="!collapsedCategories.has(group.category)" density="compact" class="inv-table">
            <thead>
              <tr>
                <th></th>
                <th>Nom</th>
                <th v-if="hasCaliber(group.items)">Calibre</th>
                <th v-if="hasArmorValue(group.items)">Armure</th>
                <th>Maniab.</th>
                <th>Portée</th>
                <th>Dégâts</th>
                <th>Charg.</th>
                <th>Propriétés</th>
                <th>Encomb.</th>
                <th>Tech.</th>
                <th>Empl.</th>
                <th>Prix</th>
                <th v-if="hasResources(group.items)">Res.</th>
                <th>Acheter</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in group.items"
                :key="item.id"
                :class="{ 'inv-row-unavailable': !canAffordAny(item) }"
              >
                <td class="inv-img-cell">
                  <img v-if="item.image" :src="item.image" class="inv-item-img" />
                </td>
                <td class="font-weight-medium">
                  <HoverTooltip :description="item.description">
                    <span :class="item.description ? 'inv-has-tooltip' : ''">{{ item.name }}</span>
                  </HoverTooltip>
                </td>
                <td v-if="hasCaliber(group.items)">{{ item.caliber ?? '—' }}</td>
                <td v-if="hasArmorValue(group.items)">{{ item.armorValue ?? '—' }}</td>
                <td>{{ item.handling ?? '—' }}</td>
                <td>{{ item.range ?? '—' }}</td>
                <td>{{ item.damage ?? '—' }}</td>
                <td>{{ item.magazine ?? '—' }}</td>
                <td class="text-caption">
                  <template v-if="item.properties">
                    <div v-for="(prop, idx) in parseProperties(item.properties)" :key="idx">
                      <HoverTooltip :description="getPropertyDescription(prop)">
                        <span :class="getPropertyDescription(prop) ? 'inv-has-tooltip' : ''">{{ prop }}</span>
                      </HoverTooltip>
                    </div>
                  </template>
                  <span v-else class="inv-muted">—</span>
                </td>
                <td>{{ item.encumbrance ?? '—' }}</td>
                <td>{{ item.techLevel ?? '—' }}</td>
                <td>{{ item.slots ?? '—' }}</td>
                <td class="text-no-wrap">
                  {{ item.value }} {{ store.computedDinars?.currency ?? 'LC' }}
                  <span v-if="item.levelable" class="inv-muted text-caption"> × Niv.</span>
                </td>
                <td v-if="hasResources(group.items)">
                  <span v-if="item.resources !== undefined">{{ item.resources }}</span>
                  <span v-else class="inv-muted">—</span>
                </td>
                <td class="text-no-wrap">
                  <v-btn
                    size="x-small"
                    variant="outlined"
                    color="green-darken-2"
                    :disabled="!canBuyWithLC(item)"
                    class="mr-1"
                    @click="item.levelable ? openLevelDialog(item) : store.buyItemWithLC(item.id)"
                  >
                    {{ store.computedDinars?.currency ?? 'LC' }}
                  </v-btn>
                  <v-btn
                    v-if="item.resources !== undefined && (item.cult === store.cult?.name || (item.cult !== undefined && store.hasEntrepreneur))"
                    size="x-small"
                    variant="outlined"
                    color="blue-darken-2"
                    :disabled="!canBuyWithResources(item)"
                    @click="store.buyItemWithResources(item.id)"
                  >
                    Res.
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>
    </div>
  </div>

  <!-- ── Dialog sélection de niveau ── -->
  <v-dialog v-model="levelDialog" max-width="400" persistent>
    <v-card v-if="levelDialogItem">
      <v-card-title class="text-h6">Choisir le niveau</v-card-title>
      <v-card-text>
        <p class="mb-3">
          <strong>{{ levelDialogItem.name }}</strong><br>
          <span class="text-caption inv-muted">Prix unitaire : {{ levelDialogItem.value }} {{ store.computedDinars?.currency ?? 'LC' }}</span>
        </p>
        <v-btn-toggle v-model="selectedLevel" mandatory density="compact" variant="outlined" divided class="mb-3">
          <v-btn
            v-for="lvl in [1, 2, 3]"
            :key="lvl"
            :value="lvl"
            :disabled="!canAffordLevel(levelDialogItem, lvl)"
          >
            Niv. {{ lvl }}
            <br>
            <span class="text-caption">{{ levelCost(levelDialogItem, lvl) }} {{ store.computedDinars?.currency ?? 'LC' }}</span>
          </v-btn>
        </v-btn-toggle>
        <div class="text-caption inv-muted">
          Restant après achat : {{ store.remainingLC - levelCost(levelDialogItem, selectedLevel) }} {{ store.computedDinars?.currency ?? 'LC' }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="levelDialog = false">Annuler</v-btn>
        <v-btn
          color="green-darken-2"
          variant="flat"
          :disabled="!canAffordLevel(levelDialogItem, selectedLevel)"
          @click="confirmLevelPurchase"
        >
          Acheter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import { useCharacterStore } from '@/store'
import {
  ITEMS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  advancementsToLevel,
  type Item,
  type ItemCategory,
} from '@/config/items'
import { ResourceMode } from '@/config/items'
import { getPropertyDescription, parseProperties } from '@/config/items/properties'
import { Attributes, Skills } from '@/config/properties'
import HoverTooltip from '@/components/HoverTooltip.vue'

const store = useCharacterStore()

// ── Encombrement ──
const totalEncumbrance = computed(() =>
  store.inventoryItems.reduce((sum, { purchase }) => {
    const item = ITEMS.find(i => i.id === purchase.itemId)
    return sum + (item?.encumbrance ?? 0)
  }, 0)
)

const phyPlusForce = computed(() =>
  store.attributeValue(Attributes.body) + store.skillValue(Skills.force)
)

const encumbrancePenalty = computed(() =>
  Math.max(0, totalEncumbrance.value - phyPlusForce.value)
)

// ── Level dialog ──
const levelDialog = ref(false)
const levelDialogItem = ref<Item | null>(null)
const selectedLevel = ref(1)

function openLevelDialog(item: Item) {
  levelDialogItem.value = item
  selectedLevel.value = 1
  levelDialog.value = true
}

function confirmLevelPurchase() {
  if (!levelDialogItem.value) return
  store.buyItemWithLC(levelDialogItem.value.id, selectedLevel.value)
  levelDialog.value = false
}

function levelCost(item: Item, lvl: number): number {
  return item.value * lvl
}

function canAffordLevel(item: Item, lvl: number): boolean {
  return store.remainingLC >= levelCost(item, lvl)
}

const search = ref('')
const selectedCategory = ref<ItemCategory | null>(null)
const showOnlyAffordable = ref(true)
const showOnlyCult = ref(false)
const showAllCults = ref(false)
const collapsedCategories = ref(new Set<ItemCategory>(CATEGORY_ORDER))

function toggleCategory(cat: ItemCategory) {
  if (collapsedCategories.value.has(cat)) {
    collapsedCategories.value.delete(cat)
  } else {
    collapsedCategories.value.add(cat)
  }
  collapsedCategories.value = new Set(collapsedCategories.value)
}

function getItem(id: string) {
  return ITEMS.find(i => i.id === id)
}

function categoryLabel(cat: ItemCategory) {
  return CATEGORY_LABELS[cat] ?? cat
}

function hasCaliber(items: Item[]) {
  return items.some(i => i.caliber !== undefined)
}

function hasResources(items: Item[]) {
  return items.some(i => i.resources !== undefined)
}

function hasArmorValue(items: Item[]) {
  return items.some(i => i.armorValue !== undefined)
}

function canBuyWithLC(item: Item): boolean {
  // For levelable items, affordable if at least level 1 is reachable
  return store.remainingLC >= item.value
}

function canBuyWithResources(item: Item): boolean {
  if (item.resources === undefined) return false

  const isOtherCult = item.cult !== undefined && item.cult !== store.cult?.name

  if (isOtherCult) {
    const level = store.effectiveResourcesLevelForOtherCult
    return level >= 1 && item.resources <= level
  }

  const mode = store.resourceMode
  if (mode === ResourceMode.A) {
    return item.resources <= store.effectiveResourcesLevel
  } else if (mode === ResourceMode.B) {
    return item.resources <= store.effectiveResourcesLevel
  } else {
    return item.resources <= store.effectiveResourcesLevelForModeC
  }
}

function canAffordAny(item: Item): boolean {
  if (canBuyWithLC(item)) return true
  if (item.resources !== undefined && canBuyWithResources(item)) return true
  return false
}

// Items visibles : filtrés par culte + recherche + catégorie + abordable
const visibleItems = computed(() => {
  const q = search.value.trim().toLowerCase()
  return ITEMS.filter(item => {
    // Masquer les items d'un autre culte (sauf si "Montrez tous les équipements de Culte" est coché)
    if (!showAllCults.value && item.cult !== undefined && item.cult !== store.cult?.name) return false
    // Filtre équipement de culte
    if (showOnlyCult.value && item.cult === undefined) return false
    // Recherche texte
    if (q && !item.name.toLowerCase().includes(q)) return false
    // Filtre catégorie
    if (selectedCategory.value && item.category !== selectedCategory.value) return false
    // Filtre abordable
    if (showOnlyAffordable.value && !canAffordAny(item)) return false
    return true
  })
})

// Groupement par catégorie, dans l'ordre défini
const filteredCatalogGroups = computed(() => {
  const map = new Map<ItemCategory, Item[]>()
  for (const item of visibleItems.value) {
    const list = map.get(item.category) ?? []
    list.push(item)
    map.set(item.category, list)
  }
  return CATEGORY_ORDER
    .filter(cat => map.has(cat))
    .map(cat => ({ category: cat, label: CATEGORY_LABELS[cat], items: map.get(cat)! }))
})

// Options pour le select catégorie (uniquement celles qui ont des items visibles si pas de recherche)
const availableCategoryOptions = computed(() => {
  const presentCats = new Set(ITEMS
    .filter(i => i.cult === undefined || i.cult === store.cult?.name)
    .map(i => i.category))
  return CATEGORY_ORDER
    .filter(cat => presentCats.has(cat))
    .map(cat => ({ value: cat, label: CATEGORY_LABELS[cat] }))
})
</script>

<style scoped>
.inventory-root {
  min-height: 100%;
  background: rgb(var(--v-theme-surface));
}

.inv-header {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  background: rgb(var(--v-theme-surface-variant));
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}

.inv-stat-chip {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.inv-stat-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(var(--v-theme-on-surface), 0.5);
}

.inv-stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.inv-lc-inline-input {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  background: transparent;
  border: none;
  border-bottom: 1px dashed rgba(var(--v-theme-on-surface), 0.4);
  outline: none;
  width: 80px;
  text-align: center;
  -moz-appearance: textfield;
}
.inv-lc-inline-input::-webkit-inner-spin-button,
.inv-lc-inline-input::-webkit-outer-spin-button { -webkit-appearance: none; }
.inv-lc-inline-input:focus {
  border-bottom-color: rgb(var(--v-theme-primary));
}

.inv-stat-sub {
  font-size: 0.75rem;
  color: rgba(var(--v-theme-on-surface), 0.5);
}

.inv-body {
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.inv-section-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgb(var(--v-theme-on-surface));
  border-bottom: 2px solid rgba(var(--v-theme-on-surface), 0.15);
  padding-bottom: 4px;
  margin-bottom: 12px;
}

.inv-category-header {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(var(--v-theme-on-surface));
  background: rgba(var(--v-theme-on-surface), 0.06);
  padding: 4px 8px;
  margin-bottom: 2px;
  border-left: 3px solid rgb(var(--v-theme-error));
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.inv-category-header:hover {
  background: rgba(var(--v-theme-on-surface), 0.1);
}
.inv-category-chevron {
  transition: transform 0.2s ease;
  font-style: normal;
}
.inv-category-chevron.collapsed {
  transform: rotate(-90deg);
}

.inv-table {
  font-size: 0.8rem;
}

.inv-table th {
  font-size: 0.7rem !important;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), 0.55) !important;
  white-space: nowrap;
}

.inv-table td {
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  color: rgb(var(--v-theme-on-surface));
}

.inv-row-unavailable {
  opacity: 0.4;
}

.inv-muted {
  color: rgba(var(--v-theme-on-surface), 0.5);
}

.inv-checkbox-label {
  color: rgb(var(--v-theme-on-surface));
  font-size: 0.875rem;
}

:deep(.v-checkbox .v-selection-control__input > .v-icon) {
  color: rgb(var(--v-theme-on-surface));
}

:deep(.v-checkbox.v-input--dirty .v-selection-control__input > .v-icon) {
  color: rgb(var(--v-theme-primary));
}

.gap-1 { gap: 4px; }
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.gap-4 { gap: 16px; }

.inv-img-cell {
  width: 32px;
  padding-right: 0 !important;
}

.inv-item-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));
}

.inv-has-tooltip {
  border-bottom: 1px dotted rgba(var(--v-theme-on-surface), 0.4);
  cursor: help;
}

.inv-remove-btn {
  background: none;
  border: none;
  color: #ef5350;
  font-size: 1.1rem;
  line-height: 1;
  padding: 2px 6px;
  cursor: pointer;
  border-radius: 4px;
}
.inv-remove-btn:hover {
  background: rgba(239, 83, 80, 0.15);
}
</style>

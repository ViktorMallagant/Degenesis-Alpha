<template>
  <div class="mb-2" style="display:flex;align-items:center;gap:16px">
    <span>{{ $t('messages.legacies').toUpperCase() }}</span>
    <span style="font-size:12px;color:#999">{{ store.spentPoints.legacies }}/{{ config.availablePoints.legacies }}</span>
    <input
      v-model="searchLegacy"
      placeholder="To research…"
      style="margin-left:8px;background:transparent;border:1px solid #444;border-radius:4px;padding:2px 8px;font-size:12px;color:#ccc;outline:none;width:200px"
    />
  </div>
  <v-divider class="mb-4"></v-divider>

  <v-container>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="3"
        xl="2"
        class="py-0"
        v-for="{ legacy, label, altLabel, value } in legacies()"
        v-bind:key="legacy.name"
      >
        <ValueSelector
          :name="legacy.name"
          :label="label"
          :altLabel="altLabel"
          :value="value"
          :max="1"
          :count="1"
          :active="store.editorMode === EditorMode.HardLimits ? store.eligibleLegacies.has(legacy) : true"
          :ineligible="store.editorMode === EditorMode.SoftLimits && !store.eligibleLegacies.has(legacy)"
          :missingInfo="store.editorMode !== EditorMode.Free && !store.eligibleLegacies.has(legacy) ? missingConditionsHtml(legacy) : ''"
          :min="config.pointLimits.potentials.min"
          @change="(v) => handleLegacyChange(legacy, v)"
          :display-max="store.editorMode != EditorMode.Free"
          @mouseenter="store.setHighlighted(...requirements(legacy))"
          @mouseleave="store.unsetHighlighted(...requirements(legacy))"
          type="legacies"
        >
        </ValueSelector>
      </v-col>
    </v-row>
  </v-container>

  <!-- Dialog for choice effects -->
  <v-dialog v-model="dialogOpen" max-width="480" persistent>
    <v-card v-if="dialogLegacy">
      <v-card-title class="text-h6 pa-4">
        {{ dialogLegacyLabel }}
      </v-card-title>
      <v-card-text class="pa-4 pt-0">
        <div v-for="(choiceEffect, i) in dialogChoiceEffects" :key="i" class="mb-4">
          <div class="text-caption mb-2" style="color:#bbb">{{ effectDescription(choiceEffect) }}</div>

          <!-- Attribute choices -->
          <template v-if="choiceEffect.type === 'choiceAttribute'">
            <v-select
              v-for="k in choiceEffect.count"
              :key="'attr-' + i + '-' + k"
              :label="'Attribut ' + k"
              :items="attributeChoiceItems(i, k - 1)"
              :model-value="pendingAttributes[i + '-' + (k-1)]"
              @update:model-value="v => setPendingAttribute(i, k - 1, v)"
              density="compact"
              variant="outlined"
              class="mb-2"
            ></v-select>
          </template>

          <!-- Skill choices -->
          <template v-if="choiceEffect.type === 'choiceSkill'">
            <v-select
              v-for="k in choiceEffect.count"
              :key="'skill-' + i + '-' + k"
              :label="'Compétence ' + k"
              :items="skillChoiceItems(choiceEffect.scope)"
              :model-value="pendingSkills[i + '-' + (k-1)]"
              @update:model-value="v => setPendingSkill(i, k - 1, v)"
              density="compact"
              variant="outlined"
              class="mb-2"
            ></v-select>
          </template>
        </div>
      </v-card-text>
      <v-card-actions class="pa-4 pt-0">
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="cancelDialog">Annuler</v-btn>
        <v-btn variant="flat" color="primary" :disabled="!allChoicesMade" @click="confirmDialog">Confirmer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog Techno-Influenceur : choix artéfact -->
  <v-dialog v-model="artefactDialogOpen" max-width="520" persistent>
    <v-card>
      <v-card-title class="text-h6 pa-4">Techno-Influencer — Legendary Artifact</v-card-title>
      <v-card-text class="pa-4 pt-0">
        <p style="font-size:14px;line-height:1.6;color:#ccc" class="mb-4">
         You have found a legendary artifact by sheer luck. Be aware that the GM may decide you don't have it at all (e.g., it was stolen or you already sold it). However, if they let you keep it, there are two possibilities: either you are assigned a random one (click "Random"), or you choose your artifact.
        </p>
        <p style="font-size:13px;font-weight:700;color:#aaa;letter-spacing:0.05em" class="mb-3">WHAT DOES YOUR GM ALLOW?</p>

        <!-- Sélection artéfact -->
        <v-select
          v-if="artefactPickMode === 'choose'"
          v-model="artefactChosen"
          :items="legendaryArtefactItems"
          label="Choisir un artéfact"
          density="compact"
          variant="outlined"
          class="mt-2"
        ></v-select>

        <!-- Message artéfact aléatoire -->
        <div v-if="artefactPickMode === 'random' && artefactRandom" class="mt-2 pa-3" style="background:rgba(255,255,255,0.06);border-radius:6px;font-size:14px">
          🎲 You have received <strong>{{ artefactRandom.name }}</strong> — Go check the inventory!
        </div>
      </v-card-text>
      <v-card-actions class="pa-4 pt-0" style="flex-wrap:wrap;gap:8px">
        <template v-if="artefactPickMode === 'random'">
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="artefactDialogOpen = false">Close</v-btn>
        </template>
        <template v-else-if="artefactPickMode === 'choose'">
          <v-btn variant="text" color="grey" @click="artefactPickMode = null">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" :disabled="!artefactChosen" @click="confirmArtefactChosenDialog">Confirm</v-btn>
        </template>
        <template v-else>
          <v-btn variant="outlined" color="grey" @click="confirmArtefactDialog('none')">No Artifact</v-btn>
          <v-btn variant="outlined" color="primary" @click="confirmArtefactDialog('random')">Random artifact</v-btn>
          <v-btn variant="outlined" color="secondary" @click="artefactPickMode = 'choose'">Choose an Artifact</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog Doué -->
  <v-dialog v-model="giftedDialogOpen" max-width="460" persistent>
    <v-card>
      <v-card-title class="text-h6 pa-4" style="color:#ef5350">Gifted Heritage</v-card-title>
      <v-card-text class="pa-4 pt-0">
        <p style="font-size:14px;line-height:1.7;color:#ccc">
          You have at your disposal <strong style="color:#ef5350">6 points bonus</strong> to be freely distributed among the skills of
          <strong>CHARISMA</strong> (CHA) and of <strong>INTELLECT</strong> (INT).
        </p>
        <p style="font-size:14px;line-height:1.7;color:#ccc;margin-top:8px">
          These points may exceed the <strong>normal maximum</strong> at the time of creation.
        </p>
        <p style="font-size:13px;color:#888;margin-top:10px">
          Eligible skills are <span style="color:#ef5350;font-weight:700">flashing red</span>.
          Click the boxes beyond the maximum to allocate your points.
        </p>
      </v-card-text>
      <v-card-actions class="pa-4 pt-0">
        <v-spacer></v-spacer>
        <v-btn variant="flat" color="red-darken-2" @click="startGiftedAllocation">START ALLOCATION</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog Renégat -->
  <v-dialog v-model="renegadeDialogOpen" max-width="480" persistent>
    <v-card>
      <v-card-title class="text-h6 pa-4">Renegade</v-card-title>
      <v-card-text class="pa-4 pt-0">
        <p style="font-size:13px;color:#aaa;margin-bottom:12px">Which cults do you work for as a mercenary?</p>
        <v-select
          v-model="renegadeCult1"
          label="Prime Cult"
          :items="allCultItems.filter(c => c.value !== store.cult?.name && c.value !== renegadeCult2)"
          density="compact"
          variant="outlined"
          class="mb-3"
        ></v-select>
        <v-select
          v-model="renegadeCult2"
          label="Secondary Cult"
          :items="allCultItems.filter(c => c.value !== store.cult?.name && c.value !== renegadeCult1)"
          density="compact"
          variant="outlined"
        ></v-select>
      </v-card-text>
      <v-card-actions class="pa-4 pt-0">
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="cancelRenegadeDialog">Cancel</v-btn>
        <v-btn variant="flat" color="primary" :disabled="!renegadeCult1 || !renegadeCult2" @click="confirmRenegadeDialog">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog Imposteur -->
  <v-dialog v-model="imposteurDialogOpen" max-width="480" persistent>
    <v-card>
      <v-card-title class="text-h6 pa-4">Impostor</v-card-title>
      <v-card-text class="pa-4 pt-0">
        <v-select
          v-model="imposteurSelectedCult"
          label="Which cult did you infiltrate?"
          :items="allCultItems.filter(c => c.value !== store.cult?.name)"
          density="compact"
          variant="outlined"
        ></v-select>
      </v-card-text>
      <v-card-actions class="pa-4 pt-0">
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="cancelImposteurDialog">Cancel</v-btn>
        <v-btn variant="flat" color="primary" :disabled="!imposteurSelectedCult" @click="confirmImposteurDialog">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog Transfuge -->
  <v-dialog v-model="sidewinderDialogOpen" max-width="480" persistent>
    <v-card>
      <v-card-title class="text-h6 pa-4">Defector</v-card-title>
      <v-card-text class="pa-4 pt-0">
        <v-select
          v-model="sidewinderOldCult"
          label="What was your character's first cult?"
          :items="allCultItems"
          density="compact"
          variant="outlined"
          class="mb-4"
        ></v-select>
        <v-select
          v-model="sidewinderNewCult"
          label="What is your character's new cult?"
          :items="allCultItems.filter(c => c.value !== sidewinderOldCult)"
          density="compact"
          variant="outlined"
        ></v-select>
      </v-card-text>
      <v-card-actions class="pa-4 pt-0">
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="cancelSidewinderDialog">Cancel</v-btn>
        <v-btn variant="flat" color="primary" :disabled="!sidewinderOldCult || !sidewinderNewCult" @click="confirmSidewinderDialog">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef } from 'vue'
const searchLegacy = ref('')
import ValueSelector from '@/components/ValueSelector.vue'
import config from '@/config'
import { EditorMode } from '@/config/modes'
import { AllLegacies } from '@/config/legacies'
import { TechTuned } from '@/config/legacies/legacies'
import { triggerMesmerized } from '@/composables/useMesmerized'
import { useCharacterStore } from '@/store'
import { Attributes, Origins, Skills } from '@/config/properties'
import type { LegacyEffect } from '@/config/legacies/effects'
import { SCOPE_SKILLS } from '@/config/legacies/effects'
import { Cults } from '@/config/cults/cults'
import { ITEMS } from '@/config/items'
const store = useCharacterStore()
const i18n = useI18n()

import { Legacy } from '@/config/legacies/legacy'

import messages from '@/config/messages'
import { useI18n } from 'vue-i18n'
const englishLegaciesNames = new Map(Object.entries(messages.en.legacies))
function englishName(legacy: Legacy) {
  return englishLegaciesNames.get(legacy.name) || legacy.name
}
function legacies() {
  const q = searchLegacy.value.toLowerCase()
  return AllLegacies
    .filter((legacy: Legacy) => {
      if (!q) return true
      const fr = (i18n.t(`legacies.${legacy.name}`) as string).toLowerCase()
      const en = (englishLegaciesNames.get(legacy.name) || '').toLowerCase()
      return fr.includes(q) || en.includes(q)
    })
    .map((legacy: Legacy) => {
      const translatedLabel = i18n.t(`legacies.${legacy.name}`)
      const originalLabel = englishName(legacy)
      const displayTranslation = store.displayTranslatedLabels

      const value = store.legacyValue(legacy)

      if (i18n.locale.value == 'en') {
        return {
          legacy: legacy,
          label: translatedLabel as string,
          altLabel: '' as string,
          value: value
        }
      }
      return {
        legacy: legacy,
        label: (displayTranslation ? translatedLabel : originalLabel) as string,
        altLabel: (displayTranslation ? originalLabel : translatedLabel) as string,
        value: value
      }
    })
    .sort((p1: any, p2: any) => (i18n.t(`legacies.${p1.legacy.name}`) as string).localeCompare(i18n.t(`legacies.${p2.legacy.name}`) as string, 'fr'))
}
function requirements(legacy: Legacy) {
  return [
    ...legacy.requiredSkills.flatMap((s) => s.items.map((i) => i.skill)),
    ...legacy.requiredOrigins.flatMap((o) => o.items),
    ...legacy.requiredAttributes.flatMap((a) => a.items),
    ...(legacy.mentalPowerSkill ? [legacy.mentalPowerSkill] : []),
    ...(legacy.mentalResistanceSkill ? [legacy.mentalResistanceSkill] : []),
  ]
}

function missingConditionsHtml(legacy: Legacy): string {
  const tr = (key: string) => i18n.t(key) as string
  const missing: string[] = []

  if (legacy.requiredConcepts.length > 0 && !legacy.requiredConcepts.includes(store.concept.name)) {
    const names = legacy.requiredConcepts.map(c => tr(`culturesConceptsCults.${c}`)).join(' / ')
    missing.push(`${tr('messages.concept')} : ${names}`)
  }
  for (const req of legacy.requiredOrigins) {
    if (!req.check(store.originValues)) missing.push(req.format(tr))
  }
  for (const req of legacy.requiredSkills) {
    if (!req.check(store.skillValues)) missing.push(req.format(tr))
  }
  for (const req of legacy.requiredAttributes) {
    if (!req.check(store.attributeValues)) missing.push(req.format(tr))
  }
  if (legacy.mentalPowerSkill && legacy.mentalPowerSkill.name !== store.mentalPowerSkill.name) {
    missing.push(`Compétence Spéciale requise :${legacy.mentalPowerSkill.format(tr)}`)
  }
  if (legacy.mentalResistanceSkill && legacy.mentalResistanceSkill.name !== store.mentalResistanceSkill.name) {
    missing.push(`Compétence Spéciale requise :${legacy.mentalResistanceSkill.format(tr)}`)
  }

  if (legacy.name === 'experienced') {
    const age = parseInt(store.age)
    if (isNaN(age) || age < 40) missing.push('Âge requis : 40 ans ou plus')
  }
  if (legacy.name === 'optimized' && store.spentPoints.origins > 1) {
    missing.push(`${tr('messages.origins')} ≤ 1 (actuellement : ${store.spentPoints.origins})`)
  }
  if (legacy.name === 'journeyman') {
    const alliesVal = store.originValue(Origins.allies)
    const authorityVal = store.originValue(Origins.authority)
    if (alliesVal > 3) missing.push(`${tr('origins.allies')} ≤ 3 (actuellement : ${alliesVal})`)
    if (authorityVal > 3) missing.push(`${tr('origins.authority')} ≤ 3 (actuellement : ${authorityVal})`)
  }
  if (legacy.name === 'superstitious') {
    const scienceVal = store.skillValue(Skills.science)
    const engineeringVal = store.skillValue(Skills.engineering)
    if (scienceVal > 0) missing.push(`${tr('skills.science')} = 0 (actuellement : ${scienceVal})`)
    if (engineeringVal > 0) missing.push(`${tr('skills.engineering')} = 0 (actuellement : ${engineeringVal})`)
  }

  if (missing.length === 0) return ''
  return `<hr style="border-color:#555;margin:10px 0"><span style="color:#ef9a9a;font-weight:bold">${tr('messages.missingConditions')}</span><br>` +
    missing.map(m => `• ${m}`).join('<br>')
}

// ── Techno-Influenceur : artéfact légendaire dialog ──────────────────────────

const LEGENDARY_ARTEFACTS = ITEMS.filter(i => i.category === 'artefactsLegendaires')

const legendaryArtefactItems = computed(() =>
  LEGENDARY_ARTEFACTS.map(i => ({ title: i.name, value: i.id }))
    .sort((a, b) => a.title.localeCompare(b.title))
)

const giftedDialogOpen = ref(false)

const startGiftedAllocation = () => {
  giftedDialogOpen.value = false
  setTimeout(() => {
    document.getElementById('skills-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 200)
}

const artefactDialogOpen = ref(false)
const artefactDialogPendingValue = ref(0)
const artefactPickMode = ref<'none' | 'random' | 'choose' | null>(null)
const artefactChosen = ref<string | null>(null)
const artefactRandom = ref<{ id: string; name: string } | null>(null)

function openArtefactDialog(value: number) {
  artefactDialogPendingValue.value = value
  artefactPickMode.value = null
  artefactChosen.value = null
  artefactRandom.value = null
  artefactDialogOpen.value = true
}

function confirmArtefactDialog(mode: 'none' | 'random') {
  store.setLegacy(TechTuned, artefactDialogPendingValue.value)
  if (mode === 'random') {
    const pool = LEGENDARY_ARTEFACTS
    const picked = pool[Math.floor(Math.random() * pool.length)]
    store.addItemFree(picked.id, 'techtuned')
    artefactRandom.value = { id: picked.id, name: picked.name }
    artefactPickMode.value = 'random'
  } else {
    artefactDialogOpen.value = false
  }
}

function confirmArtefactChosenDialog() {
  if (!artefactChosen.value) return
  store.setLegacy(TechTuned, artefactDialogPendingValue.value)
  store.addItemFree(artefactChosen.value, 'techtuned')
  artefactDialogOpen.value = false
}

// ── Sidewinder (Transfuge) dialog ─────────────────────────────────────────────

const sidewinderDialogOpen = ref(false)
const sidewinderPendingValue = ref(0)
const sidewinderOldCult = ref<string>('')
const sidewinderNewCult = ref<string>('')

const allCultItems = computed(() =>
  Object.values(Cults).map(c => ({
    title: i18n.t(`culturesConceptsCults.${c.name}`) as string,
    value: c.name,
  })).sort((a, b) => a.title.localeCompare(b.title))
)

function openSidewinderDialog(value: number) {
  sidewinderPendingValue.value = value
  sidewinderOldCult.value = store.sidewinderOldCultName ?? store.cult.name
  sidewinderNewCult.value = ''
  sidewinderDialogOpen.value = true
}

function cancelSidewinderDialog() {
  sidewinderDialogOpen.value = false
}

function confirmSidewinderDialog() {
  if (!sidewinderOldCult.value || !sidewinderNewCult.value) return
  const sidewinder = AllLegacies.find(l => l.name === 'sidewinder')!
  store.setLegacy(sidewinder, sidewinderPendingValue.value)
  store.setSidewinderCults(sidewinderOldCult.value, sidewinderNewCult.value)
  sidewinderDialogOpen.value = false
}

const renegadeDialogOpen = ref(false)
const renegadePendingValue = ref(0)
const renegadeCult1 = ref<string>('')
const renegadeCult2 = ref<string>('')

function openRenegadeDialog(value: number) {
  renegadePendingValue.value = value
  const existing = store.renegadeCultNames ?? []
  renegadeCult1.value = existing[0] ?? ''
  renegadeCult2.value = existing[1] ?? ''
  renegadeDialogOpen.value = true
}

function cancelRenegadeDialog() {
  renegadeDialogOpen.value = false
}

function confirmRenegadeDialog() {
  if (!renegadeCult1.value || !renegadeCult2.value) return
  const renegade = AllLegacies.find(l => l.name === 'renegade')!
  store.setLegacy(renegade, renegadePendingValue.value)
  store.setRenegadeCults([renegadeCult1.value, renegadeCult2.value])
  renegadeDialogOpen.value = false
}

const imposteurDialogOpen = ref(false)
const imposteurPendingValue = ref(0)
const imposteurSelectedCult = ref<string>('')

function openImposteurDialog(value: number) {
  imposteurPendingValue.value = value
  imposteurSelectedCult.value = store.imposteurCultName ?? ''
  imposteurDialogOpen.value = true
}

function cancelImposteurDialog() {
  imposteurDialogOpen.value = false
}

function confirmImposteurDialog() {
  if (!imposteurSelectedCult.value) return
  const impostor = AllLegacies.find(l => l.name === 'impostor')!
  store.setLegacy(impostor, imposteurPendingValue.value)
  store.setImposteurCult(imposteurSelectedCult.value)
  imposteurDialogOpen.value = false
}

// ── Choice dialog ────────────────────────────────────────────────────────────

const dialogOpen = ref(false)
const dialogLegacy = shallowRef<Legacy | null>(null)
const dialogPendingValue = ref(0)
const pendingAttributes = ref<Record<string, string>>({})
const pendingSkills = ref<Record<string, string>>({})

const dialogLegacyLabel = computed(() => {
  if (!dialogLegacy.value) return ''
  return i18n.t(`legacies.${dialogLegacy.value.name}`) as string
})

const dialogChoiceEffects = computed((): LegacyEffect[] => {
  if (!dialogLegacy.value) return []
  return dialogLegacy.value.effects.filter(
    e => e.type === 'choiceAttribute' || e.type === 'choiceSkill'
  )
})

function hasChoiceEffects(legacy: Legacy): boolean {
  return legacy.effects.some(e => e.type === 'choiceAttribute' || e.type === 'choiceSkill')
}

function autoFillChoices(legacy: Legacy): { attributes: Record<string, string>; skills: Record<string, string> } {
  const attrs: Record<string, string> = {}
  const skills: Record<string, string> = {}
  let skillIdx = 0
  for (const [i, e] of legacy.effects.entries()) {
    if (e.type === 'choiceSkill') {
      const scope = (e as any).scope as string | undefined
      const candidates = scope ? (SCOPE_SKILLS[scope] || []) : []
      if (scope === 'faithOrWillpower') {
        skills[i + '-0'] = store.mentalResistanceSkill.name
      } else if (candidates.length === 2) {
        const aVal = store.skillValue(Object.values(Skills).find(s => s.name === candidates[0])!)
        const bVal = store.skillValue(Object.values(Skills).find(s => s.name === candidates[1])!)
        if (aVal > 0 && bVal === 0) {
          skills[i + '-0'] = candidates[0]
        } else if (bVal > 0 && aVal === 0) {
          skills[i + '-0'] = candidates[1]
        }
      }
      skillIdx += (e as any).count
    }
  }
  return { attributes: attrs, skills }
}

function handleLegacyChange(legacy: Legacy, value: number) {
  if (legacy.name === 'mesmerized' && value > 0) {
    triggerMesmerized(import.meta.env.BASE_URL)
  }
  if (legacy.name === 'gifted' && value > 0) {
    store.setLegacy(legacy, value)
    giftedDialogOpen.value = true
    return
  }
  if (legacy.name === 'techtuned' && value > 0) {
    openArtefactDialog(value)
    return
  }
  if (legacy.name === 'sidewinder' && value > 0) {
    openSidewinderDialog(value)
    return
  }
  if (legacy.name === 'impostor' && value > 0) {
    openImposteurDialog(value)
    return
  }
  if (legacy.name === 'renegade' && value > 0) {
    openRenegadeDialog(value)
    return
  }
  if (value > 0 && hasChoiceEffects(legacy)) {
    dialogLegacy.value = legacy
    dialogPendingValue.value = value
    // Pre-fill with existing choices if any
    const existing = store.legacyChoices[legacy.name]
    pendingAttributes.value = {}
    pendingSkills.value = {}
    if (existing) {
      let attrIdx = 0
      let skillIdx = 0
      dialogChoiceEffects.value.forEach((e, i) => {
        if (e.type === 'choiceAttribute') {
          for (let k = 0; k < (e as any).count; k++) {
            const val = existing.attributes?.[attrIdx++]
            if (val) pendingAttributes.value[i + '-' + k] = val
          }
        }
        if (e.type === 'choiceSkill') {
          for (let k = 0; k < (e as any).count; k++) {
            const val = existing.skills?.[skillIdx++]
            if (val) pendingSkills.value[i + '-' + k] = val
          }
        }
      })
    }
    // Auto-select if scope is a 2-skill pair and exactly one has points
    if (!existing) {
      const auto = autoFillChoices(legacy)
      Object.assign(pendingAttributes.value, auto.attributes)
      Object.assign(pendingSkills.value, auto.skills)
      // If all choices are now filled, skip the dialog
      const allFilled = dialogChoiceEffects.value.every((e, i) => {
        if (e.type === 'choiceAttribute') {
          for (let k = 0; k < (e as any).count; k++) if (!pendingAttributes.value[i + '-' + k]) return false
        }
        if (e.type === 'choiceSkill') {
          for (let k = 0; k < (e as any).count; k++) if (!pendingSkills.value[i + '-' + k]) return false
        }
        return true
      })
      if (allFilled) {
        store.setLegacy(legacy, value)
        const skills: string[] = []
        dialogChoiceEffects.value.forEach((e, i) => {
          if (e.type === 'choiceSkill') {
            for (let k = 0; k < (e as any).count; k++) {
              const v = pendingSkills.value[i + '-' + k]
              if (v) skills.push(v)
            }
          }
        })
        store.setLegacyChoices(legacy.name, { attributes: [], skills })
        dialogLegacy.value = null
        return
      }
    }
    dialogOpen.value = true
  } else {
    store.setLegacy(legacy, value)
  }
}

function cancelDialog() {
  dialogOpen.value = false
  dialogLegacy.value = null
}

function confirmDialog() {
  if (!dialogLegacy.value) return
  store.setLegacy(dialogLegacy.value, dialogPendingValue.value)

  const attributes: string[] = []
  const skills: string[] = []
  dialogChoiceEffects.value.forEach((e, i) => {
    if (e.type === 'choiceAttribute') {
      for (let k = 0; k < (e as any).count; k++) {
        const v = pendingAttributes.value[i + '-' + k]
        if (v) attributes.push(v)
      }
    }
    if (e.type === 'choiceSkill') {
      for (let k = 0; k < (e as any).count; k++) {
        const v = pendingSkills.value[i + '-' + k]
        if (v) skills.push(v)
      }
    }
  })

  store.setLegacyChoices(dialogLegacy.value.name, { attributes, skills })
  dialogOpen.value = false
  dialogLegacy.value = null
}

const allChoicesMade = computed(() => {
  if (!dialogLegacy.value) return false
  for (const [i, e] of dialogChoiceEffects.value.entries()) {
    if (e.type === 'choiceAttribute') {
      for (let k = 0; k < (e as any).count; k++) {
        if (!pendingAttributes.value[i + '-' + k]) return false
      }
    }
    if (e.type === 'choiceSkill') {
      for (let k = 0; k < (e as any).count; k++) {
        if (!pendingSkills.value[i + '-' + k]) return false
      }
    }
  }
  return true
})

function setPendingAttribute(effectIndex: number, slotIndex: number, value: string) {
  pendingAttributes.value = { ...pendingAttributes.value, [effectIndex + '-' + slotIndex]: value }
}

function setPendingSkill(effectIndex: number, slotIndex: number, value: string) {
  pendingSkills.value = { ...pendingSkills.value, [effectIndex + '-' + slotIndex]: value }
}

const allAttributeNames = Object.values(Attributes).map(a => a.name)

function attributeChoiceItems(effectIndex: number, slotIndex: number) {
  const alreadyPicked = Object.entries(pendingAttributes.value)
    .filter(([k, v]) => {
      const parts = k.split('-')
      const ei = parseInt(parts[0])
      const si = parseInt(parts[1])
      return ei === effectIndex && si !== slotIndex && v
    })
    .map(([, v]) => v)

  return allAttributeNames
    .filter(name => !alreadyPicked.includes(name))
    .map(name => ({
      title: i18n.t('attributes.' + name) as string,
      value: name,
    }))
}

function effectDescription(e: LegacyEffect): string {
  return (e as any).description || ''
}

function skillChoiceItems(scope?: string) {
  const scopeFilter = scope ? (SCOPE_SKILLS[scope] || null) : null
  return Object.values(Skills)
    .filter(s => !scopeFilter || scopeFilter.includes(s.name))
    .map(s => ({
      title: i18n.t('skills.' + s.name) as string,
      value: s.name,
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}
</script>

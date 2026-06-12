<template>
  <div class="mb-2">
    <span>{{ $t('messages.potentials').toUpperCase() }}</span>
    <span style="font-size:12px;color:#999;margin-left:16px">{{ store.spentPoints.potentials }}/{{ config.availablePoints.potentials }}</span>
  </div>
  <v-divider class="mb-4"></v-divider>

  <div class="mb-2" style="font-size:12px;color:#aaa;letter-spacing:0.08em">{{ $t('messages.commonPotentials').toUpperCase() }}</div>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="3"
        xl="2"
        class="py-0"
        v-for="{ potential, label, altLabel, value } in commonPotentialsList()"
        v-bind:key="potential.name"
      >
        <ValueSelector
          :name="potential.name"
          :label="label"
          :altLabel="altLabel"
          :value="value"
          :max="1"
          :count="3"
          :active="store.editorMode === EditorMode.HardLimits ? store.eligiblePotentials.has(potential) : true"
          :ineligible="store.editorMode === EditorMode.SoftLimits && !store.eligiblePotentials.has(potential)"
          :missingInfo="store.editorMode !== EditorMode.Free && !store.eligiblePotentials.has(potential) ? missingConditionsHtml(potential) : ''"
          :min="config.pointLimits.potentials.min"
          @change="(v) => store.setPotential(potential, v)"
          :display-max="store.editorMode != EditorMode.Free"
          @mouseenter="store.setHighlighted(...requirements(potential))"
          @mouseleave="store.unsetHighlighted(...requirements(potential))"
          type="potentials"
        />
      </v-col>
    </v-row>
  </v-container>

  <template v-if="cultPotentialsList().length > 0">
    <v-divider class="my-4"></v-divider>
    <div class="mb-2" style="font-size:12px;color:#aaa;letter-spacing:0.08em">{{ $t('messages.cultPotentials', { cult: $t(`culturesConceptsCults.${store.cult.name}`) }).toUpperCase() }}</div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          xs="12"
          sm="6"
          md="3"
          xl="2"
          class="py-0"
          v-for="{ potential, label, altLabel, value } in cultPotentialsList()"
          v-bind:key="potential.name"
        >
          <ValueSelector
            :name="potential.name"
            :label="label"
            :altLabel="altLabel"
            :value="value"
            :max="1"
            :count="3"
            :active="store.editorMode === EditorMode.HardLimits ? store.eligiblePotentials.has(potential) : true"
            :ineligible="store.editorMode === EditorMode.SoftLimits && !store.eligiblePotentials.has(potential)"
            :missingInfo="store.editorMode !== EditorMode.Free && !store.eligiblePotentials.has(potential) ? missingConditionsHtml(potential) : ''"
            :min="config.pointLimits.potentials.min"
            @change="(v) => store.setPotential(potential, v)"
            :display-max="store.editorMode != EditorMode.Free"
            @mouseenter="store.setHighlighted(...requirements(potential))"
            @mouseleave="store.unsetHighlighted(...requirements(potential))"
            type="potentials"
          />
        </v-col>
      </v-row>
    </v-container>
  </template>
</template>

<script setup lang="ts">
import ValueSelector from '@/components/ValueSelector.vue'
import config from '@/config'
import { EditorMode } from '@/config/modes'
import { cultSpecificPotentials } from '@/config/potentials'
import { CommonPotentials } from '@/config/potentials/common'
import { useCharacterStore } from '@/store'
const store = useCharacterStore()
const i18n = useI18n()

import type { Potential } from '@/config/potentials/potential'

import messages from '@/config/messages'
import { useI18n } from 'vue-i18n'
const englishPotentialNames = new Map(Object.entries(messages.en.potentials))
function englishName(potential: Potential) {
  return englishPotentialNames.get(potential.name) || potential.name
}
function mapPotential(potential: Potential) {
  const translatedLabel = i18n.t(`potentials.${potential.name}`)
  const originalLabel = englishName(potential)
  const displayTranslation = store.displayTranslatedLabels
  const value = store.potentialValue(potential)

  if (i18n.locale.value == 'en') {
    return { potential, label: translatedLabel, altLabel: '', value }
  }
  return {
    potential,
    label: displayTranslation ? translatedLabel : originalLabel,
    altLabel: displayTranslation ? originalLabel : translatedLabel,
    value
  }
}
function commonPotentialsList() {
  return CommonPotentials.map(mapPotential).sort((a, b) => a.label.localeCompare(b.label))
}
function cultPotentialsList() {
  return cultSpecificPotentials(store.cult, store.clan)
    .map(mapPotential)
    .sort((a, b) => a.label.localeCompare(b.label))
}
function requirements(potential: Potential) {
  return [
    ...potential.requiredSkills.flatMap((s) => s.items.map((i) => i.skill)),
    ...potential.requiredOrigins.flatMap((o) => o.items),
    ...potential.requiredAttributes.flatMap((a) => a.items),
    ...(potential.mentalPowerSkill ? [potential.mentalPowerSkill] : []),
    ...(potential.mentalResistanceSkill ? [potential.mentalResistanceSkill] : []),
    ...potential.minimumRanks.flatMap((r) => r.ranks)
  ]
}

function missingConditionsHtml(potential: Potential): string {
  const tr = (key: string) => i18n.t(key) as string
  const missing: string[] = []

  for (const req of potential.requiredOrigins) {
    if (!req.check(store.originValues)) missing.push(req.format(tr))
  }
  for (const req of potential.requiredSkills) {
    if (!req.check(store.skillValues)) missing.push(req.format(tr))
  }
  for (const req of potential.requiredAttributes) {
    if (!req.check(store.attributeValues)) missing.push(req.format(tr))
  }
  for (const req of potential.minimumRanks) {
    if (!req.check([store.rank])) missing.push(req.format(tr))
  }
  if (potential.mentalPowerSkill && potential.mentalPowerSkill.name !== store.mentalPowerSkill.name) {
    missing.push(potential.mentalPowerSkill.format(tr))
  }
  if (potential.mentalResistanceSkill && potential.mentalResistanceSkill.name !== store.mentalResistanceSkill.name) {
    missing.push(potential.mentalResistanceSkill.format(tr))
  }

  if (missing.length === 0) return ''
  return `<hr style="border-color:#555;margin:10px 0"><span style="color:#ef9a9a;font-weight:bold">${tr('messages.missingConditions')}</span><br>` +
    missing.map(m => `• ${m}`).join('<br>')
}
</script>

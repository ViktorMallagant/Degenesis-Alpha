<template>
  <div class="mb-2">
    <span>{{ $t('messages.legacies').toUpperCase() }}</span>
    <span style="font-size:12px;color:#999;margin-left:16px">{{ store.spentPoints.legacies }}/{{ config.availablePoints.legacies }}</span>
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
          @change="(v) => store.setLegacy(legacy, v)"
          :display-max="store.editorMode != EditorMode.Free"
          @mouseenter="store.setHighlighted(...requirements(legacy))"
          @mouseleave="store.unsetHighlighted(...requirements(legacy))"
          type="legacies"
        >
        </ValueSelector>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ValueSelector from '@/components/ValueSelector.vue'
import config from '@/config'
import { EditorMode } from '@/config/modes'
import { AllLegacies } from '@/config/legacies'
import { useCharacterStore } from '@/store'
const store = useCharacterStore()
const i18n = useI18n()

import { Legacy } from '@/config/legacies/legacy'

import messages from '@/config/messages'
import { useI18n } from 'vue-i18n'
const englishLegaciesNames = new Map(Object.entries(messages.en.potentials))
function englishName(legacy: Legacy) {
  return englishLegaciesNames.get(legacy.name) || legacy.name
}
function legacies() {
  return AllLegacies
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
    .sort((p1: any, p2: any) => p1.label.localeCompare(p2.label))
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
    missing.push(legacy.mentalPowerSkill.format(tr))
  }
  if (legacy.mentalResistanceSkill && legacy.mentalResistanceSkill.name !== store.mentalResistanceSkill.name) {
    missing.push(legacy.mentalResistanceSkill.format(tr))
  }

  if (missing.length === 0) return ''
  return `<hr style="border-color:#555;margin:10px 0"><span style="color:#ef9a9a;font-weight:bold">${tr('messages.missingConditions')}</span><br>` +
    missing.map(m => `• ${m}`).join('<br>')
}
</script>

<template>
  <ValueSelector
    :name="attribute.name"
    :label="localizeAttributeName(attribute).toUpperCase()"
    :value="store.attributeValue(attribute)"
    :max="store.attributeMax(attribute)"
    :bonus="store.legacyAttributeExceedsMaxBonus(attribute.name)"
    :min="attributeMin()"
    @change="(v) => store.setAttribute(attribute, v)"
    :highlighted="store.isHighlighted(attribute)"
    :display-max="store.editorMode != EditorMode.Free"
    :labelStar="isPreferredAttribute(attribute)"
    :lockedLast="store.experiencedLockedAttributes.has(attribute.name) ? 1 : 0"
    type="attributes"
  />
  <v-divider class="mb-4"></v-divider>
  <div v-for="skill in SkillsByAttribute.get(attribute) || []" v-bind:key="skill.name">
    <ValueSelector
      :name="skill.name"
      :label="localizeSkillName(skill)"
      :value="store.skillValue(skill)"
      :max="store.skillMax(skill) - store.legacySkillStaticBonus(skill.name)"
      :min="skillMin()"
      :bonus="store.legacySkillBonus(skill.name)"
      :active="store.isActiveSkill(skill)"
      @change="(v) => store.setSkill(skill, v)"
      :highlighted="store.isHighlighted(skill)"
      :display-max="store.editorMode != EditorMode.Free"
      @mouseenter="skill.antagonist && store.setHighlighted(skill, skill.antagonist)"
      @mouseleave="skill.antagonist && store.unsetHighlighted(skill, skill.antagonist)"
      @touchstart="skill.antagonist && store.flashHighlighted(skill, skill.antagonist)"
      type="skills"
    />
  </div>
</template>

<script setup lang="ts">
import ValueSelector from '@/components/ValueSelector.vue'
import config from '@/config'
import { EditorMode } from '@/config/modes'
import { Attribute, Skill, SkillsByAttribute } from '@/config/properties'
import { useCharacterStore } from '@/store'
import { useI18n } from 'vue-i18n'
const store = useCharacterStore()
const i18n = useI18n()

export interface Props {
  attribute: Attribute
}

defineProps<Props>()

const localizeAttributeName = (attribute: Attribute) => {
  return i18n.t(`attributes.${attribute.name}`)
}
const attributeMin = () => {
  return config.pointLimits.attributes.min
}
const localizeSkillName = (skill: Skill) => {
  return i18n.t(`skills.${skill.name}`)
}
const skillMin = () => {
  return config.pointLimits.skills.min
}

const PRIMAL_ATTRIBUTES = ['body', 'charisma', 'instinct']
const FOCUS_ATTRIBUTES = ['intellect', 'agility', 'psyche']

const isPreferredAttribute = (attribute: Attribute): boolean => {
  if (store.mentalPowerChoice === 'primal') return PRIMAL_ATTRIBUTES.includes(attribute.name)
  if (store.mentalPowerChoice === 'focus') return FOCUS_ATTRIBUTES.includes(attribute.name)
  return false
}
</script>


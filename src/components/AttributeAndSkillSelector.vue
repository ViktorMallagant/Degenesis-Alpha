<template>
  <ValueSelector
    :name="attribute.name"
    :label="localizeAttributeName(attribute).toUpperCase()"
    :value="store.attributeValue(attribute)"
    :max="store.attributeMax(attribute)"
    :min="attributeMin()"
    @change="(v) => store.setAttribute(attribute, v)"
    :highlighted="store.isHighlighted(attribute)"
    :display-max="store.editorMode != EditorMode.Free"
    type="attributes"
  />
  <v-divider class="mb-4"></v-divider>
  <div v-for="skill in SkillsByAttribute.get(attribute) || []" v-bind:key="skill.name">
    <ValueSelector
      :name="skill.name"
      :label="localizeSkillName(skill)"
      :value="store.skillValue(skill)"
      :max="store.skillMax(skill)"
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
</script>

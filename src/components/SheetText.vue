<template>
  <div class="wrapper">
    <span v-if="displayTitle.length > 0" class="text-uppercase">{{ displayTitle }}: </span>
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCharacterStore } from '@/store'

export interface Props {
  title?: string
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  text: ''
})

const store = useCharacterStore()
const i18n = useI18n()

const displayTitle = computed(() => {
  if (i18n.locale.value === 'en' && props.title === i18n.t('messages.dinars')) {
    return store.culture?.name === 'africa' ? 'Dinars' : 'Drafts'
  }
  return props.title
})
</script>

<style scoped>
.wrapper {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
</style>

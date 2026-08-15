<template>
    <div class="mb-2">
            <span>{{ $t('messages.origins').toUpperCase() }}</span>
            <span style="font-size:12px;color:#999;margin-left:16px">{{ store.spentPoints.origins }}/{{ store.originBudget }}</span>
          </div>
          <v-divider class="mb-4"></v-divider>
          <div v-for="origin in config.origins" v-bind:key="origin.name">
            <ValueSelector
              :name="origin.name"
              :label="localizeOriginName(origin)"
              :value="store.originValue(origin)"
              :max="store.originMax"
              :min="originMin()"
              :bonus="effectiveOriginBonus(origin)"
              @change="(v) => store.setOrigin(origin, v)"
              :highlighted="store.isHighlighted(origin)"
              type="origins"
            />
          </div>
</template>

<script setup lang="ts">
import ValueSelector from '@/components/ValueSelector.vue';
import config from '@/config';
import type { Origin } from '@/config/properties';
import { useCharacterStore } from '@/store';
import { useI18n } from 'vue-i18n';

const store = useCharacterStore()
const i18n = useI18n()

const localizeOriginName = (origin: Origin) => {
  return i18n.t(`origins.${origin.name}`)
}
const originMin = () => {
  return config.pointLimits.origins.min
}

// Some custom ranks establish a floor for a Background without changing the
// points the player actually spent on it. Keep that distinction visible by
// rendering the difference as a bonus instead of mutating the base score.
const effectiveOriginBonus = (origin: Origin) => {
  const existingBonus = store.totalOriginBonus(origin)
  const currentEffective = store.originValue(origin) + existingBonus
  const rankMinimums = (store.rank as any)?.originMinimums as Record<string, number> | undefined
  const rankMinimum = rankMinimums?.[origin.name] ?? 0
  return existingBonus + Math.max(0, rankMinimum - currentEffective)
}
</script>
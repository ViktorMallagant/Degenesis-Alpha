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
              :bonus="store.legacyOriginBonus(origin.name)"
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
</script>
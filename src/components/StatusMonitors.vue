<template>
  <StatusMonitor
    status-key="ego"
    :label="$t('messages.ego')"
    :max="24"
    :value="store.maxEgo"
    :tooltip="`2 × ${store.mentalPowerSkill.withAttribute().format($t)}`"
    :constituents="[store.mentalPowerSkill]"
  ></StatusMonitor>
  <StatusMonitor
    status-key="sporeInfestations"
    :label="$t('messages.sporeInfestations')"
    :detail-label="`Permanent (${store.statusPermanentSporeInfestations.filter(point => point <= store.maxSporeInfestations).length})`"
    :max="24"
    :value="store.maxSporeInfestations"
    :tooltip="`2 × ${store.mentalResistanceSkill.withAttribute().format($t)}`"
    :constituents="[store.mentalResistanceSkill]"
  ></StatusMonitor>
  <StatusMonitor
    status-key="fleshwounds"
    :label="$t('messages.fleshwounds')"
    :max="24"
    :value="store.maxFleshwounds"
    :tooltip="`2 × ${Skills.toughness.withAttribute().format($t)}`"
    :constituents="[Skills.toughness]"
  ></StatusMonitor>
  <StatusMonitor
    status-key="trauma"
    :label="$t('messages.trauma')"
    :max="Math.max(12, store.maxTrauma)"
    :value="store.maxTrauma"
    :tooltip="`${Attributes.body.format($t)} + ${Attributes.psyche.format($t)}`"
    :constituents="[Attributes.body, Attributes.psyche]"
  ></StatusMonitor>
  <div class="status-help text-caption text-center">
    In <em>Free Mode</em> scores can be toggled to indicate status changes.
  </div>
</template>

<style scoped>
.status-help {
  color: rgba(var(--v-theme-on-surface), 0.65);
}
</style>

<script setup lang="ts">
import StatusMonitor from '@/components/StatusMonitor.vue'
import { Attributes, Skills } from '@/config/properties'
import { useCharacterStore } from '@/store'
const store = useCharacterStore()
</script>

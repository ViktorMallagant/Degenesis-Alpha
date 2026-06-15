<template>
  <StatusMonitor
    :label="$t('messages.ego')"
    :max="24"
    :value="store.maxEgo"
    :tooltip="`2 × ${store.mentalPowerSkill.withAttribute().format($t)}`"
    :constituents="[store.mentalPowerSkill]"
  ></StatusMonitor>
  <StatusMonitor
    :label="$t('messages.sporeInfestations')"
    :max="24"
    :value="store.maxSporeInfestations"
    :tooltip="`2 × ${store.mentalResistanceSkill.withAttribute().format($t)}`"
    :constituents="[store.mentalResistanceSkill]"
  ></StatusMonitor>
  <StatusMonitor
    :label="$t('messages.fleshwounds')"
    :max="24"
    :value="store.maxFleshwounds"
    :tooltip="`2 × ${Skills.toughness.withAttribute().format($t)}`"
    :constituents="[Skills.toughness]"
  ></StatusMonitor>
  <StatusMonitor
    :label="$t('messages.trauma')"
    :max="Math.max(12, store.maxTrauma)"
    :value="store.maxTrauma"
    :tooltip="`${Attributes.body.format($t)} + ${Attributes.psyche.format($t)}`"
    :constituents="[Attributes.body, Attributes.psyche]"
  ></StatusMonitor>
</template>

<script setup lang="ts">
import StatusMonitor from '@/components/StatusMonitor.vue'
import { Attributes, Skills } from '@/config/properties'
import { useCharacterStore } from '@/store'
const store = useCharacterStore()
</script>

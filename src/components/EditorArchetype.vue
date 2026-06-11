<template>
  <HoverTooltip :description="description">
    <div class="d-flex flex-column align-center">
        <v-img
          class="archetypeLogo"
          :class="{ invert: inverted }"
          :src="`logotypes/${type}s/${archetype}.svg`"
        />
        <div
          class="archetype text-uppercase nowrap d-flex align-center justify-center mb-3 mt-4"
          :class="{ 'text-caption': smallLabel, 'text-body-1': !smallLabel }"
        >
          {{ label }}
        </div>
        <slot></slot>
      </div>
  </HoverTooltip>
</template>

<script setup lang="ts">
import HoverTooltip from '@/components/HoverTooltip.vue'
export interface Props {
  type: string
  typeLabel: string
  archetype: string
  label: string
  smallLabel?: boolean
  inverted?: boolean
  item?: any,
  description?: string
}
withDefaults(defineProps<Props>(), {
  showType: true,
  inverted: false
})
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
}
.archetype {
  width: 8em;
}

.archetypeLogo {
  width: 4em;
  aspect-ratio: 1;
}

.invert {
  -webkit-filter: invert(1);
  filter: invert(1);
}
</style>

<template>
  <HoverTooltip :description="description">
    <div class="d-flex flex-column align-center">
        <v-img
          class="archetypeLogo"
          :class="{ invert: inverted }"
          :src="logoSrc"
          @error="useFallbackLogo"
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
import { ref, watch } from 'vue'

export interface Props {
  type: string
  typeLabel: string
  archetype: string
  label: string
  smallLabel?: boolean
  inverted?: boolean
  showType?: boolean
  item?: any,
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  showType: true,
  inverted: false
})

const clanLogoAliases: Record<string, string> = {
  steelmasters: 'steelMasters'
}

const logoPath = () => {
  const archetype = props.type === 'clan'
    ? (clanLogoAliases[props.archetype] ?? props.archetype)
    : props.archetype
  return `logotypes/${props.type}s/${archetype}.svg`
}
const clanFallbackLogo = 'logotypes/clans/hunterGatherers.svg'
const logoSrc = ref(logoPath())

watch(
  () => [props.type, props.archetype],
  () => {
    logoSrc.value = logoPath()
  }
)

function useFallbackLogo() {
  if (props.type === 'clan' && logoSrc.value !== clanFallbackLogo) {
    logoSrc.value = clanFallbackLogo
  }
}
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

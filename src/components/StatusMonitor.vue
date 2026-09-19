<template>
  <div
    @mouseenter="store.setHighlighted(...constituents)"
    @mouseleave="store.unsetHighlighted(...constituents)"
    @touchstart="store.flashHighlighted(...constituents)"
  >
    <div class="d-flex justify-center">
      <ValueBoxes
        class="text-caption"
        :count="max"
        :value="value"
        :interactive="false"
        :soft-selected="store.statusSoftSelections[statusKey]"
        :permanent-selected="statusKey === 'sporeInfestations' ? store.statusPermanentSporeInfestations : []"
        :soft-interactive="store.editorMode === EditorMode.Free"
        @soft-change="store.toggleStatusSoftSelection(statusKey, $event, value)"
      />
    </div>
    <div class="d-flex justify-center mb-3 text-uppercase">
      {{ label }}
      <span style="margin-left:4px">({{ value }})</span>
      <span v-if="detailLabel" style="margin-left:4px">/ {{ detailLabel }}</span>
    </div>
    <v-tooltip
      v-if="tooltip.length > 0"
      :text="tooltip"
      location="top"
      activator="parent"
      scroll-strategy="close"
      open-delay="500"
    >
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import ValueBoxes from '@/components/ValueBoxes.vue'
import { EditorMode } from '@/config/modes'
import type { Attribute, Skill } from '@/config/properties'
import type { StatusTrackKey } from '@/config/statusSoftSelections'
import { useCharacterStore } from '@/store';
const store = useCharacterStore()
export interface Props {
  label: string
  value: number
  max: number
  statusKey: StatusTrackKey
  detailLabel?: string
  tooltip?: string
  constituents: (Attribute | Skill)[]
}
withDefaults(defineProps<Props>(), {
  tooltip: '',
  detailLabel: '',
  constituents: () => []
})
</script>

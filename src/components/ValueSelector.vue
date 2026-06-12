<template>
  <HoverTooltip :description="fullDescription">
    <div class="valueSelector">
        <div
          class="label"
          :class="{
            highlighted: highlighted,
            labelWide: count < 6,
            labelNarrow: count >= 6
          }"
        >
          <div class="wrap" v-if="type == 'potentials' || type == 'legacies'">
            <span :class="{mainLabel: props.altLabel, 'text-decoration-line-through': !active || ineligible, ineligible: !active || ineligible}" :style="{fontSize: type == 'potentials' ? 'small' : 'inherit'}">{{ props.altLabel ? props.altLabel : props.label }}</span>
            <span v-if="props.label != ''" class="altLabel text-grey-darken-1 text-caption">{{ props.label }}</span>
          </div>
          <div class="wrap" v-else>
            <span :class="{mainLabel: props.altLabel, 'text-decoration-line-through': !active}">{{ props.label }}</span>
            <span v-if="props.altLabel != ''" class="altLabel text-grey-darken-1 text-caption">{{ props.altLabel }}</span>
          </div>
          <slot></slot>
        </div>
        <Boxes
          class="float-end"
          :count="count"
          :min="props.min"
          :max="props.max"
          :displayMax="props.displayMax"
          :value="props.value"
          :ineligible="props.ineligible"
          v-on:change="selectionChanged"
        />
      </div>
  </HoverTooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Boxes from '@/components/ValueBoxes.vue'
import HoverTooltip from '@/components/HoverTooltip.vue'
export interface Props {
  name: string
  label: string
  altLabel?: string
  count?: number
  value?: number
  max?: number
  min?: number
  active?: boolean
  highlighted?: boolean
  displayMax?: boolean
  description?: string,
  type?: string,
  ineligible?: boolean,
  missingInfo?: string,
}
const props = withDefaults(defineProps<Props>(), {
  altLabel: '',
  count: 6,
  value: 0,
  max: Infinity,
  min: 0,
  active: true,
  highlighted: false,
  displayMax: true,
  ineligible: false,
  missingInfo: '',
})
const emit = defineEmits<{
  (e: 'change', value: number): void
}>()

const { t } = useI18n()

const fullDescription = computed(() => {
  const base = t(`${props.type}.${props.name}Description`)
  if (!props.missingInfo) return base
  return base + props.missingInfo
})

const selectionChanged = (event: any) => emit('change', event)
</script>

<style scoped>
.label {
  display: inline-block;
  margin-bottom: 0.5em;
  vertical-align: middle;
  text-align: left;
  transition: color 0.2s;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-height: 1.5em;
}

.wrap, .wrap span {
  position: absolute;
  transition: opacity 0.2s linear, top 0.2s ease, font-size 0.2s ease;
}

.valueSelector .mainLabel {
  top: 0;
  width: 100%;
}

.valueSelector .altLabel {
  top: 1.5rem;
  opacity: 0;
  width: 100%;
}

.valueSelector:hover .mainLabel {
  top: -.25rem;
  font-size: small;
}

.valueSelector:hover .altLabel {
  top: 0.75rem;
  opacity: 1;
}

.labelWide {
  max-width: calc(100% - 4em);
}

.labelNarrow {
  max-width: calc(100% - 8em);
}

.highlighted {
  text-shadow: 0 0 1em #ff8a80;
  color: #b71c1c;
}

.ineligible {
  opacity: 0.45;
}
</style>

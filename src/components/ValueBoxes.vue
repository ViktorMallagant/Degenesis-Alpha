<template>
  <div class="wrapper" :class="{ inverted: inverted, interactive: interactive }">
    <div class="boxes">
      <div
        v-for="field in fieldValues"
        v-bind:key="field"
        :data-value="field"
        class="boxContainer"
        @click="handleClick"
        @mouseenter="handleMouseEnter(field)"
        @mouseleave="handleMouseLeave()"
      >
        <div
          class="box d-flex justify-center align-end"
          :class="{ ...boxColors(field) }"
          :data-value="field"
        >
          <div
            :data-value="field"
            :class="{ opaque: field > max && hovered >= field }"
            class="bg-red-darken-4 partial-fill"
          ></div>
        </div>
      </div>
      <!-- Bonus boxes: always filled, special color, non-interactive -->
      <div
        v-for="i in bonus"
        :key="'bonus-' + i"
        class="boxContainer bonus-box"
      >
        <div class="box bonus-filled"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface Props {
  count?: number
  value?: number
  max?: number
  min?: number
  active?: boolean
  inverted?: boolean
  interactive?: boolean
  displayMax?: boolean
  ineligible?: boolean
  bonus?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 1,
  value: 0,
  max: Infinity,
  min: 0,
  active: true,
  inverted: false,
  interactive: true,
  displayMax: true,
  ineligible: false,
  bonus: 0,
})
const emit = defineEmits<{
  (e: 'change', value: number): void
}>()

const fieldValues = [...Array(props.count).keys()].map((x) => x + 1)

const handleClick = (event: any) => {
  if (props.interactive) {
    const value = parseInt(event.target.attributes['data-value'].value)
    if (props.value == value) {
      emit('change', props.min)
    } else {
      emit('change', value)
    }
  }
  hovered.value = -1
}

const handleMouseEnter = (field: number) => {
  if (props.interactive) {
    hovered.value = field
  }
}

const handleMouseLeave = () => {
  if (props.interactive) {
    hovered.value = -1
  }
}

const hovered = ref(-1)

function boxColors(field: number) {
  // If ineligible and selected, show red
  if (props.ineligible && field <= props.value) {
    return {
      'bg-red': true
    }
  }

  if (props.inverted && !props.interactive) {
    return {
      'bg-grey-lighten-1': field > props.value
    }
  }

  if (field <= props.value) {
    if (field > props.max) {
      if (field > hovered.value) {
        return {
          'bg-red': props.displayMax,
          'bg-grey-darken-4': !props.displayMax
        }
      } else {
        return {
          'bg-red': true
        }
      }
    } else {
      return {
        'bg-grey-darken-4': field > hovered.value,
        'bg-red-darken-4': field <= hovered.value
      }
    }
  } else if (field > props.value) {
    if (field > props.max) {
      return {
        'bg-grey-lighten-2': field > hovered.value,
        'bg-red': props.max <= hovered.value && field <= hovered.value
      }
    } else {
      return {
        'bg-red': field <= hovered.value
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: inline-block;
}

.boxes {
  display: flex;
  flex-wrap: wrap;
}

.boxContainer {
  border-right: 2px transparent solid;
  display: inline-block;
}

.box {
  border-radius: 2px;
  width: 1.2em;
  height: 1.5em;
  border: 1px #212121 solid;
  display: inline-block;
  transition:
    border 0.2s,
    background-color 0.2s,
    box-shadow 0.2s;
}

.bonus-box {
  cursor: default;
}

.bonus-filled {
  background-color: #bf360c !important;
  border-color: #6d1f06 !important;
  opacity: 0.85;
}

.partial-fill {
  width: 100%;
  height: 20%;
  opacity: 0;
  transition: opacity .2s;
}

.partial-fill.opaque {
  opacity: 1;
  transition: opacity .2s;
}

#sheet .box {
  width: 9px;
  height: 13px;
}

@media print {
  .selected,
  .inverted .box {
    background: #212121;
    /* Force background to show up in print */
    -webkit-print-color-adjust: exact !important; /* Chrome, Safari 6 – 15.3, Edge */
    print-color-adjust: exact !important; /* Firefox 97+, Safari 15.4+ */
  }

  .inverted .selected {
    background: white;
  }
}
</style>

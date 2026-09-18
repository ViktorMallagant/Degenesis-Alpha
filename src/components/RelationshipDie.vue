<template>
  <div
    v-if="value !== 0"
    class="relationship-die"
    :class="[
      { 'relationship-die--positive': value > 0, 'relationship-die--negative': value < 0 },
      { 'relationship-die--bouncing': bouncing }
    ]"
    :aria-label="`${value > 0 ? 'Positive' : 'Negative'} relationship ${absoluteValue}`"
    role="img"
  >
    <span
      v-for="pip in pipLayouts[absoluteValue]"
      :key="pip"
      class="relationship-die__pip"
      :class="`relationship-die__pip--${pip}`"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

const props = defineProps<{
  value: number
}>()

const absoluteValue = computed(() => Math.abs(props.value))
const bouncing = ref(false)

const pipLayouts: Record<number, number[]> = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9]
}

watch(
  () => props.value,
  async (value, previousValue) => {
    if (value === previousValue || value === 0) return
    bouncing.value = false
    await nextTick()
    bouncing.value = true
  }
)
</script>

<style scoped>
.relationship-die {
  position: absolute;
  right: clamp(10px, 2vw, 18px);
  bottom: clamp(10px, 2vw, 18px);
  z-index: 2;
  width: clamp(42px, 5.2vw, 62px);
  aspect-ratio: 1;
  border-radius: 20%;
  box-shadow:
    0 10px 18px rgba(0, 0, 0, 0.55),
    inset 0 3px 3px rgba(255, 255, 255, 0.38),
    inset 0 -4px 5px rgba(0, 0, 0, 0.28);
  transform: perspective(150px) rotateX(10deg) rotateY(-9deg);
  transform-origin: center bottom;
}

.relationship-die--positive {
  border: 1px solid rgba(0, 0, 0, 0.25);
  background: linear-gradient(145deg, #fff 6%, #ededed 48%, #c9c9c9 100%);
}

.relationship-die--negative {
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: linear-gradient(145deg, #454545 0%, #151515 52%, #020202 100%);
}

.relationship-die--bouncing {
  animation: relationship-die-bounce 420ms cubic-bezier(0.2, 0.8, 0.25, 1);
}

.relationship-die__pip {
  position: absolute;
  width: 14%;
  aspect-ratio: 1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.35);
}

.relationship-die--positive .relationship-die__pip {
  background: #111;
}

.relationship-die--negative .relationship-die__pip {
  background: #f5f5f5;
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
}

.relationship-die__pip--1 {
  left: 25%;
  top: 25%;
}
.relationship-die__pip--2 {
  left: 50%;
  top: 25%;
}
.relationship-die__pip--3 {
  left: 75%;
  top: 25%;
}
.relationship-die__pip--4 {
  left: 25%;
  top: 50%;
}
.relationship-die__pip--5 {
  left: 50%;
  top: 50%;
}
.relationship-die__pip--6 {
  left: 75%;
  top: 50%;
}
.relationship-die__pip--7 {
  left: 25%;
  top: 75%;
}
.relationship-die__pip--8 {
  left: 50%;
  top: 75%;
}
.relationship-die__pip--9 {
  left: 75%;
  top: 75%;
}

@keyframes relationship-die-bounce {
  0% {
    transform: perspective(150px) rotateX(10deg) rotateY(-9deg) translateY(0) scale(1);
  }
  35% {
    transform: perspective(150px) rotateX(2deg) rotateY(7deg) translateY(-16px) scale(1.08);
  }
  62% {
    transform: perspective(150px) rotateX(13deg) rotateY(-12deg) translateY(2px) scale(0.97);
  }
  82% {
    transform: perspective(150px) rotateX(8deg) rotateY(-6deg) translateY(-4px) scale(1.02);
  }
  100% {
    transform: perspective(150px) rotateX(10deg) rotateY(-9deg) translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .relationship-die--bouncing {
    animation: none;
  }
}
</style>

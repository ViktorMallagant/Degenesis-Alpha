<template>
  <Teleport to="body">
    <div v-if="active" class="mesmerized-overlay" aria-hidden="true">
      <span
        v-for="n in numbers"
        :key="n.id"
        class="mesmerized-number"
        :style="n.style"
      >{{ n.value }}</span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useMesmerized } from '@/composables/useMesmerized'

const { active, numbers } = useMesmerized()
</script>

<style scoped>
.mesmerized-overlay {
  position: fixed;
  inset: 0;
  z-index: 99990;
  pointer-events: none;
  overflow: hidden;
}

.mesmerized-number {
  position: absolute;
  color: #cc0000;
  font-weight: 900;
  font-family: monospace;
  text-shadow:
    0 0 8px #ff0000,
    0 0 20px rgba(200, 0, 0, 0.6);
  animation: mesmerized-drift linear forwards;
  will-change: transform, opacity;
}

@keyframes mesmerized-drift {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: inherit;
  }
  80% {
    opacity: inherit;
  }
  100% {
    transform: translate(var(--dx), var(--dy)) scale(0.6);
    opacity: 0;
  }
}
</style>

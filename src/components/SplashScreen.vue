<template>
  <Teleport to="body">
    <div v-if="visible" class="splash" @click="onInteract">
      <video
        ref="videoEl"
        class="splash-video"
        :src="`${baseUrl}intro.mp4`"
        playsinline
        @ended="dismiss"
      ></video>
      <div class="splash-prompt">{{ prompt }}</div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const baseUrl = import.meta.env.BASE_URL
const visible = ref(true)
const videoEl = ref<HTMLVideoElement | null>(null)
const started = ref(false)

const prompt = ref('CLIQUER POUR LANCER')

function onInteract() {
  if (!started.value) {
    started.value = true
    prompt.value = 'APPUYER SUR UNE TOUCHE POUR CONTINUER'
    videoEl.value!.play()
  } else {
    dismiss()
  }
}

function onKey() {
  if (!started.value) {
    started.value = true
    prompt.value = 'APPUYER SUR UNE TOUCHE POUR CONTINUER'
    videoEl.value!.play()
  } else {
    dismiss()
  }
}

function dismiss() {
  if (!visible.value) return
  visible.value = false
  videoEl.value?.pause()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.splash {
  position: fixed;
  inset: 0;
  z-index: 999999;
  background: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.splash-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.splash-prompt {
  position: absolute;
  bottom: 48px;
  left: 0;
  right: 0;
  text-align: center;
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #fff;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
  animation: prompt-blink 1.2s ease-in-out infinite;
}

@keyframes prompt-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.25; }
}
</style>

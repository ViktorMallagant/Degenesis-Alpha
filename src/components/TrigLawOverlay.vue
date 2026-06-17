<template>
  <Teleport to="body">
    <div v-if="active" class="triglaw-overlay">
      <img :src="`${baseUrl}prank/triglaw-malware.png`" class="triglaw-img" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const baseUrl = import.meta.env.BASE_URL
const active = ref(false)

let hackingAudio: HTMLAudioElement | null = null
let trigAudio: HTMLAudioElement | null = null
let trigTimer: ReturnType<typeof setTimeout> | null = null
let triggered = false

function trigger() {
  if (triggered) return
  triggered = true
  active.value = true

  hackingAudio = new Audio(`${baseUrl}prank/hacking-alert.mp3`)
  trigAudio = new Audio(`${baseUrl}prank/triglaw-malware.mp3`)

  hackingAudio.play()

  trigTimer = setTimeout(() => {
    trigAudio!.play()
  }, 3000)

  hackingAudio.addEventListener('ended', () => {
    trigAudio?.pause()
    active.value = false
  })
}

const PATTERNS = ['65536', '2^16', '2¹⁶']

function checkText(text: string): boolean {
  return PATTERNS.some(p => text.includes(p))
}

let observer: MutationObserver | null = null

onMounted(() => {
  observer = new MutationObserver(() => {
    if (!triggered && checkText(document.body.innerText)) {
      trigger()
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  })
})

onUnmounted(() => {
  observer?.disconnect()
  if (trigTimer !== null) clearTimeout(trigTimer)
  hackingAudio?.pause()
  trigAudio?.pause()
})
</script>

<style scoped>
.triglaw-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: triglaw-blink 2s ease-in-out infinite;
}

.triglaw-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes triglaw-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.15; }
}
</style>

<template>
  <Teleport to="body">
    <div v-if="active" class="triglaw-overlay" :class="{ 'phase-glitch': glitchPhase }">
      <img
        v-if="!glitchPhase"
        :src="`${baseUrl}prank/triglaw-malware.png`"
        class="triglaw-img"
      />
      <div v-else class="glitch-container">
        <img :src="`${baseUrl}prank/triglaw-closeup.jpg`" class="glitch-img glitch-base" />
        <img :src="`${baseUrl}prank/triglaw-closeup.jpg`" class="glitch-img glitch-r" />
        <img :src="`${baseUrl}prank/triglaw-closeup.jpg`" class="glitch-img glitch-b" />
        <div class="scanlines"></div>
        <div class="glitch-slice"></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const baseUrl = import.meta.env.BASE_URL
const active = ref(false)
const glitchPhase = ref(false)

let hackingAudio: HTMLAudioElement | null = null
let trigAudio: HTMLAudioElement | null = null
let trigTimer: ReturnType<typeof setTimeout> | null = null
let phaseTimer: ReturnType<typeof setTimeout> | null = null
let triggered = false

function trigger() {
  if (triggered) return
  triggered = true
  active.value = true

  hackingAudio = new Audio(`${baseUrl}prank/hacking-alert.mp3`)
  trigAudio = new Audio(`${baseUrl}prank/triglaw-malware.mp3`)
  hackingAudio.volume = 0.4
  trigAudio.volume = 1.0

  hackingAudio.play()

  trigTimer = setTimeout(() => {
    trigAudio!.play()
  }, 3000)

  phaseTimer = setTimeout(() => {
    glitchPhase.value = true
  }, 5000)

  hackingAudio.addEventListener('ended', () => {
    trigAudio?.pause()
    active.value = false
    glitchPhase.value = false
  })
}

const PATTERNS = ['65536', '2^16', '2¹⁶', 'triglaw', 'triglav', 'salim', 'mushar']

function checkText(text: string): boolean {
  const lower = text.toLowerCase()
  return PATTERNS.some(p => lower.includes(p.toLowerCase()))
}

function onInput(e: Event) {
  if (triggered) return
  const target = e.target as HTMLInputElement | HTMLTextAreaElement | null
  if (target && checkText(target.value)) trigger()
}

onMounted(() => {
  document.addEventListener('input', onInput, true)
})

onUnmounted(() => {
  document.removeEventListener('input', onInput, true)
  if (trigTimer !== null) clearTimeout(trigTimer)
  if (phaseTimer !== null) clearTimeout(phaseTimer)
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

.triglaw-overlay.phase-glitch {
  animation: none;
  opacity: 1;
}

.triglaw-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Glitch phase ── */
.glitch-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.glitch-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.glitch-base {
  z-index: 1;
}

/* canal rouge décalé */
.glitch-r {
  z-index: 2;
  mix-blend-mode: screen;
  filter: url(#red-channel);
  animation: glitch-r 1.8s steps(1) infinite;
  opacity: 0.7;
}

/* canal bleu décalé */
.glitch-b {
  z-index: 3;
  mix-blend-mode: screen;
  filter: url(#blue-channel);
  animation: glitch-b 2.3s steps(1) infinite;
  opacity: 0.5;
}

/* scanlines */
.scanlines {
  position: absolute;
  inset: 0;
  z-index: 4;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0, 0, 0, 0.35) 3px,
    rgba(0, 0, 0, 0.35) 4px
  );
  pointer-events: none;
}

/* tranche de déchirure horizontale */
.glitch-slice {
  position: absolute;
  z-index: 5;
  left: 0;
  right: 0;
  height: 6px;
  background: rgba(255, 0, 60, 0.6);
  animation: glitch-slice 1.5s steps(1) infinite;
  pointer-events: none;
}

@keyframes triglaw-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.15; }
}

@keyframes glitch-r {
  0%   { transform: translate(-6px, 0); clip-path: inset(0 0 85% 0); }
  10%  { transform: translate(4px, 0);  clip-path: inset(20% 0 60% 0); }
  20%  { transform: translate(-3px, 0); clip-path: inset(55% 0 30% 0); }
  30%  { transform: translate(8px, 0);  clip-path: inset(10% 0 75% 0); }
  40%  { transform: translate(-5px, 0); clip-path: inset(70% 0 10% 0); }
  50%  { transform: translate(2px, 0);  clip-path: inset(40% 0 45% 0); }
  60%  { transform: translate(-7px, 0); clip-path: inset(5% 0 80% 0); }
  70%  { transform: translate(5px, 0);  clip-path: inset(60% 0 25% 0); }
  80%  { transform: translate(-2px, 0); clip-path: inset(30% 0 55% 0); }
  90%  { transform: translate(6px, 0);  clip-path: inset(80% 0 5% 0); }
  100% { transform: translate(-4px, 0); clip-path: inset(15% 0 70% 0); }
}

@keyframes glitch-b {
  0%   { transform: translate(5px, 0);  clip-path: inset(50% 0 30% 0); }
  15%  { transform: translate(-3px, 0); clip-path: inset(10% 0 70% 0); }
  30%  { transform: translate(7px, 0);  clip-path: inset(75% 0 8% 0); }
  45%  { transform: translate(-6px, 0); clip-path: inset(25% 0 55% 0); }
  60%  { transform: translate(3px, 0);  clip-path: inset(60% 0 20% 0); }
  75%  { transform: translate(-5px, 0); clip-path: inset(0% 0 90% 0); }
  90%  { transform: translate(4px, 0);  clip-path: inset(40% 0 40% 0); }
  100% { transform: translate(-2px, 0); clip-path: inset(85% 0 5% 0); }
}

@keyframes glitch-slice {
  0%   { top: 15%;  height: 4px;  opacity: 1; }
  8%   { top: 72%;  height: 8px;  opacity: 0.8; }
  16%  { top: 38%;  height: 3px;  opacity: 1; }
  24%  { top: 90%;  height: 6px;  opacity: 0.6; }
  32%  { top: 5%;   height: 10px; opacity: 1; }
  40%  { top: 55%;  height: 4px;  opacity: 0.9; }
  48%  { top: 28%;  height: 7px;  opacity: 0.7; }
  56%  { top: 80%;  height: 3px;  opacity: 1; }
  64%  { top: 47%;  height: 5px;  opacity: 0.8; }
  72%  { top: 12%;  height: 9px;  opacity: 0.6; }
  80%  { top: 65%;  height: 4px;  opacity: 1; }
  88%  { top: 33%;  height: 6px;  opacity: 0.9; }
  100% { top: 20%;  height: 3px;  opacity: 0.7; }
}
</style>

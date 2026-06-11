<template>
  <div class="hover-tooltip-wrapper" @mouseenter="onAnchorEnter" @mouseleave="onAnchorLeave">
    <slot></slot>
    <Teleport to="body">
      <div
        v-if="description"
        ref="tipEl"
        class="rank-tip"
        :class="{ show: visible }"
        :style="tipStyle"
        @mouseenter="onTipEnter"
        @mouseleave="onTipLeave"
        v-html="description"
      ></div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'

const props = defineProps<{ description?: string }>()

const tipEl = ref<HTMLElement | null>(null)
const wrapperEl = ref<HTMLElement | null>(null)
const visible = ref(false)
const tipLeft = ref(0)
const tipTop = ref(0)
const tipMaxWidth = ref(420)

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null
let overAnchor = false
let overTip = false

const tipStyle = computed(() => ({
  left: tipLeft.value + 'px',
  top: tipTop.value + 'px',
  maxWidth: tipMaxWidth.value + 'px',
}))

function scheduleHide() {
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    if (!overAnchor && !overTip) visible.value = false
  }, 80)
}

function position(anchor: HTMLElement) {
  const rect = anchor.getBoundingClientRect()
  const w = Math.min(420, window.innerWidth - 20)
  tipMaxWidth.value = w

  // We need the tip height — make it visible off-screen first
  const el = tipEl.value
  if (!el) return
  const th = el.offsetHeight
  let left = rect.left + rect.width / 2 - w / 2
  left = Math.max(5, Math.min(left, window.innerWidth - w - 5))
  let top = rect.top - th - 8
  if (top < 5) top = rect.bottom + 8
  tipLeft.value = left
  tipTop.value = top
}

function onAnchorEnter(e: MouseEvent) {
  overAnchor = true
  if (hideTimer) clearTimeout(hideTimer)
  if (showTimer) clearTimeout(showTimer)
  const anchor = e.currentTarget as HTMLElement
  showTimer = setTimeout(() => {
    position(anchor)
    visible.value = true
  }, 500)
}

function onAnchorLeave() {
  overAnchor = false
  if (showTimer) clearTimeout(showTimer)
  scheduleHide()
}

function onTipEnter() {
  overTip = true
  if (hideTimer) clearTimeout(hideTimer)
}

function onTipLeave() {
  overTip = false
  scheduleHide()
}

onBeforeUnmount(() => {
  if (showTimer) clearTimeout(showTimer)
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<style scoped>
.hover-tooltip-wrapper {
  display: inherit;
}
</style>

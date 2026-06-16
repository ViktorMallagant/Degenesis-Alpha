<template>
  <v-dialog v-model="open" max-width="640" persistent>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between flex-wrap gap-2">
        <span>Recadrer le portrait</span>
        <v-btn-toggle v-model="aspectMode" density="compact" variant="outlined" mandatory>
          <v-btn value="free" size="small">Libre</v-btn>
          <v-btn value="portrait" size="small">3:4</v-btn>
          <v-btn value="square" size="small">1:1</v-btn>
        </v-btn-toggle>
      </v-card-title>

      <v-card-text class="pa-0" style="background:#111; position:relative; user-select:none;">
        <!-- Canvas affichage -->
        <canvas
          ref="canvas"
          style="display:block; width:100%; cursor:crosshair;"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseUp"
          @touchstart.prevent="onTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend.prevent="onMouseUp"
        ></canvas>
        <!-- Hint -->
        <div style="position:absolute;bottom:6px;left:0;right:0;text-align:center;color:rgba(255,255,255,0.4);font-size:0.7rem;pointer-events:none;">
          Glisser pour déplacer la zone · Poignées pour redimensionner
        </div>
      </v-card-text>

      <v-card-actions class="justify-space-between">
        <div class="d-flex gap-2">
          <v-btn icon size="small" @click="rotate(-90)" title="Tourner gauche"><v-icon>mdi-rotate-left</v-icon></v-btn>
          <v-btn icon size="small" @click="rotate(90)" title="Tourner droite"><v-icon>mdi-rotate-right</v-icon></v-btn>
          <v-btn icon size="small" @click="resetCrop" title="Réinitialiser"><v-icon>mdi-refresh</v-icon></v-btn>
        </div>
        <div class="d-flex gap-2">
          <v-btn variant="text" @click="cancel">Annuler</v-btn>
          <v-btn color="red-darken-2" variant="flat" @click="confirm">Valider</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'

const props = defineProps<{ modelValue: boolean; src: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'crop', dataUrl: string, original: string): void
}>()

const open = ref(props.modelValue)
watch(() => props.modelValue, v => { open.value = v })
watch(open, v => emit('update:modelValue', v))

const canvas = ref<HTMLCanvasElement | null>(null)
const aspectMode = ref<'free' | 'portrait' | 'square'>('portrait')
const ASPECT: Record<string, number | null> = { free: null, portrait: 3 / 4, square: 1 }

// --- State ---
let img = new Image()
let rotation = 0  // degrees, multiples of 90
// crop rect in canvas-image coords (0..imgW, 0..imgH after rotation)
let crop = { x: 0, y: 0, w: 0, h: 0 }
// canvas display scale: image pixel → canvas pixel
let scale = 1
let offX = 0  // image origin on canvas
let offY = 0

// Drag state
type DragMode = 'move' | 'nw' | 'ne' | 'sw' | 'se' | null
let drag: DragMode = null
let dragStart = { mx: 0, my: 0, cx: 0, cy: 0, cw: 0, ch: 0 }

// --- Image loading ---
watch(() => props.src, async (src) => {
  if (!src) return
  rotation = 0
  img = new Image()
  img.onload = () => {
    await nextTick()
    initCanvas()
  }
  img.src = src
}, { immediate: true })

watch(aspectMode, () => enforceAspect())

function rotatedSize(): { w: number, h: number } {
  const r = ((rotation % 360) + 360) % 360
  return (r === 90 || r === 270)
    ? { w: img.naturalHeight, h: img.naturalWidth }
    : { w: img.naturalWidth, h: img.naturalHeight }
}

function initCanvas() {
  const c = canvas.value
  if (!c || !img.naturalWidth) return
  const { w: iw, h: ih } = rotatedSize()
  const maxW = c.parentElement!.clientWidth || 600
  const maxH = 420
  scale = Math.min(maxW / iw, maxH / ih, 1)
  c.width = Math.round(iw * scale)
  c.height = Math.round(ih * scale)
  offX = 0
  offY = 0
  resetCrop()
}

function resetCrop() {
  const { w: iw, h: ih } = rotatedSize()
  const ar = ASPECT[aspectMode.value]
  if (ar === null) {
    crop = { x: 0, y: 0, w: iw, h: ih }
  } else {
    const imgAr = iw / ih
    if (ar <= imgAr) {
      const ch = ih
      const cw = Math.round(ch * ar)
      crop = { x: Math.round((iw - cw) / 2), y: 0, w: cw, h: ch }
    } else {
      const cw = iw
      const ch = Math.round(cw / ar)
      crop = { x: 0, y: Math.round((ih - ch) / 2), w: cw, h: ch }
    }
  }
  draw()
}

function enforceAspect() {
  const ar = ASPECT[aspectMode.value]
  if (ar === null) { draw(); return }
  const { w: iw, h: ih } = rotatedSize()
  let cw = crop.w
  let ch = Math.round(cw / ar)
  if (ch > ih) { ch = ih; cw = Math.round(ch * ar) }
  crop.w = cw
  crop.h = ch
  crop.x = Math.max(0, Math.min(crop.x, iw - cw))
  crop.y = Math.max(0, Math.min(crop.y, ih - ch))
  draw()
}

// --- Drawing ---
function draw() {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')!
  ctx.clearRect(0, 0, c.width, c.height)

  // Draw rotated image
  ctx.save()
  ctx.translate(c.width / 2, c.height / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  const dw = img.naturalWidth * scale
  const dh = img.naturalHeight * scale
  ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh)
  ctx.restore()

  // Darken outside crop
  const cx = offX + crop.x * scale
  const cy = offY + crop.y * scale
  const cw = crop.w * scale
  const ch = crop.h * scale
  ctx.fillStyle = 'rgba(0,0,0,0.55)'
  ctx.fillRect(0, 0, c.width, cy)
  ctx.fillRect(0, cy + ch, c.width, c.height - cy - ch)
  ctx.fillRect(0, cy, cx, ch)
  ctx.fillRect(cx + cw, cy, c.width - cx - cw, ch)

  // Crop border
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 1.5
  ctx.strokeRect(cx, cy, cw, ch)

  // Grid thirds
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.lineWidth = 0.8
  for (let i = 1; i <= 2; i++) {
    ctx.beginPath(); ctx.moveTo(cx + cw * i / 3, cy); ctx.lineTo(cx + cw * i / 3, cy + ch); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(cx, cy + ch * i / 3); ctx.lineTo(cx + cw, cy + ch * i / 3); ctx.stroke()
  }

  // Corner handles
  const hs = 10
  ctx.fillStyle = '#fff'
  for (const [hx, hy] of [[cx, cy], [cx + cw, cy], [cx, cy + ch], [cx + cw, cy + ch]]) {
    ctx.fillRect(hx - hs / 2, hy - hs / 2, hs, hs)
  }
}

// --- Mouse events ---
function toImgCoords(ex: number, ey: number) {
  const c = canvas.value!
  const rect = c.getBoundingClientRect()
  const px = (ex - rect.left) * (c.width / rect.width)
  const py = (ey - rect.top) * (c.height / rect.height)
  return { ix: (px - offX) / scale, iy: (py - offY) / scale }
}

function hitHandle(ex: number, ey: number): DragMode {
  const c = canvas.value!
  const rect = c.getBoundingClientRect()
  const px = (ex - rect.left) * (c.width / rect.width)
  const py = (ey - rect.top) * (c.height / rect.height)
  const cx = offX + crop.x * scale
  const cy = offY + crop.y * scale
  const cw = crop.w * scale
  const ch = crop.h * scale
  const hs = 14
  if (Math.abs(px - cx) < hs && Math.abs(py - cy) < hs) return 'nw'
  if (Math.abs(px - (cx + cw)) < hs && Math.abs(py - cy) < hs) return 'ne'
  if (Math.abs(px - cx) < hs && Math.abs(py - (cy + ch)) < hs) return 'sw'
  if (Math.abs(px - (cx + cw)) < hs && Math.abs(py - (cy + ch)) < hs) return 'se'
  if (px > cx && px < cx + cw && py > cy && py < cy + ch) return 'move'
  return null
}

function onMouseDown(e: MouseEvent) {
  drag = hitHandle(e.clientX, e.clientY)
  if (!drag) return
  dragStart = { mx: e.clientX, my: e.clientY, cx: crop.x, cy: crop.y, cw: crop.w, ch: crop.h }
}

function onMouseMove(e: MouseEvent) {
  if (!drag) return
  applyDrag(e.clientX, e.clientY)
}

function onMouseUp() { drag = null }

function onTouchStart(e: TouchEvent) {
  const t = e.touches[0]
  drag = hitHandle(t.clientX, t.clientY)
  if (!drag) return
  dragStart = { mx: t.clientX, my: t.clientY, cx: crop.x, cy: crop.y, cw: crop.w, ch: crop.h }
}
function onTouchMove(e: TouchEvent) {
  if (!drag) return
  applyDrag(e.touches[0].clientX, e.touches[0].clientY)
}

function applyDrag(mx: number, my: number) {
  const c = canvas.value!
  const rect = c.getBoundingClientRect()
  const dx = (mx - dragStart.mx) * (c.width / rect.width) / scale
  const dy = (my - dragStart.my) * (c.height / rect.height) / scale
  const { w: iw, h: ih } = rotatedSize()
  const ar = ASPECT[aspectMode.value]

  let { cx, cy, cw, ch } = dragStart

  if (drag === 'move') {
    cx = Math.max(0, Math.min(cx + dx, iw - cw))
    cy = Math.max(0, Math.min(cy + dy, ih - ch))
  } else {
    let nx = cx, ny = cy, nw = cw, nh = ch
    if (drag === 'nw') { nx = cx + dx; ny = cy + dy; nw = cw - dx; nh = ch - dy }
    if (drag === 'ne') { ny = cy + dy; nw = cw + dx; nh = ch - dy }
    if (drag === 'sw') { nx = cx + dx; nw = cw - dx; nh = ch + dy }
    if (drag === 'se') { nw = cw + dx; nh = ch + dy }

    const MIN = 30
    if (ar !== null) {
      // Keep aspect ratio — use width as master for se/ne, height for sw/nw
      if (drag === 'nw' || drag === 'sw') { nw = Math.max(MIN, nw); nh = nw / ar }
      else { nw = Math.max(MIN, nw); nh = nw / ar }
      if (drag === 'nw') { nx = cx + cw - nw; ny = cy + ch - nh }
      if (drag === 'ne') { ny = cy + ch - nh }
      if (drag === 'sw') { nx = cx + cw - nw }
    } else {
      nw = Math.max(MIN, nw)
      nh = Math.max(MIN, nh)
      if (drag === 'nw') { nx = cx + cw - nw; ny = cy + ch - nh }
      if (drag === 'ne') { ny = cy + ch - nh }
      if (drag === 'sw') { nx = cx + cw - nw }
    }

    // Clamp to image bounds
    nx = Math.max(0, nx)
    ny = Math.max(0, ny)
    if (nx + nw > iw) nw = iw - nx
    if (ny + nh > ih) nh = ih - ny

    cx = nx; cy = ny; cw = nw; ch = nh
  }

  crop = { x: Math.round(cx), y: Math.round(cy), w: Math.round(cw), h: Math.round(ch) }
  draw()
}

// --- Rotation ---
function rotate(deg: number) {
  rotation = (rotation + deg + 360) % 360
  initCanvas()
}

// --- Confirm / Cancel ---
function cancel() { open.value = false }

function confirm() {
  // Draw full-res cropped image
  const out = document.createElement('canvas')
  const { w: iw, h: ih } = rotatedSize()
  // Full-res scale factor
  out.width = crop.w
  out.height = crop.h
  const ctx = out.getContext('2d')!

  // Rotate image at native resolution
  const tmp = document.createElement('canvas')
  const r = ((rotation % 360) + 360) % 360
  if (r === 0 || r === 180) { tmp.width = img.naturalWidth; tmp.height = img.naturalHeight }
  else { tmp.width = img.naturalHeight; tmp.height = img.naturalWidth }
  const tc = tmp.getContext('2d')!
  tc.translate(tmp.width / 2, tmp.height / 2)
  tc.rotate((rotation * Math.PI) / 180)
  tc.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2)

  ctx.drawImage(tmp, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h)
  const dataUrl = out.toDataURL('image/png')
  emit('crop', dataUrl, props.src)
  open.value = false
}

onUnmounted(() => { drag = null })
</script>

<template>
  <v-dialog v-model="open" max-width="600" persistent>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <span>Recadrer le portrait</span>
        <div class="d-flex align-center gap-2">
          <v-btn-toggle v-model="aspectMode" density="compact" variant="outlined">
            <v-btn value="free" size="small">Libre</v-btn>
            <v-btn value="portrait" size="small">3:4</v-btn>
            <v-btn value="square" size="small">1:1</v-btn>
          </v-btn-toggle>
        </div>
      </v-card-title>

      <v-card-text class="pa-0" style="background: #111;">
        <div class="cropper-wrap">
          <img ref="cropImg" style="max-width:100%; display:block;" />
        </div>
      </v-card-text>

      <v-card-actions class="justify-space-between">
        <div class="d-flex gap-2">
          <v-btn icon size="small" @click="cropper?.rotate(-90)" title="Tourner gauche">
            <v-icon>mdi-rotate-left</v-icon>
          </v-btn>
          <v-btn icon size="small" @click="cropper?.rotate(90)" title="Tourner droite">
            <v-icon>mdi-rotate-right</v-icon>
          </v-btn>
          <v-btn icon size="small" @click="cropper?.reset()" title="Réinitialiser">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
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
import { ref, watch, nextTick } from 'vue'
import Cropper from 'cropperjs'

const props = defineProps<{ modelValue: boolean; src: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'crop', dataUrl: string, original: string): void
}>()

const open = ref(props.modelValue)
watch(() => props.modelValue, v => { open.value = v })
watch(open, v => emit('update:modelValue', v))

const cropImg = ref<HTMLImageElement | null>(null)
const cropper = ref<Cropper | null>(null)
const aspectMode = ref<'free' | 'portrait' | 'square'>('portrait')

const ASPECT: Record<string, number> = { free: NaN, portrait: 3 / 4, square: 1 }
watch(aspectMode, m => cropper.value?.setAspectRatio(ASPECT[m]))

watch(() => props.src, async (src) => {
  if (!src) return
  await nextTick()
  if (cropper.value) {
    cropper.value.destroy()
    cropper.value = null
  }
  if (!cropImg.value) return
  cropImg.value.src = src
  cropImg.value.onload = () => {
    cropper.value = new Cropper(cropImg.value!, {
      aspectRatio: ASPECT[aspectMode.value],
      viewMode: 1,
      autoCropArea: 1,
      background: false,
      responsive: true,
    })
  }
}, { immediate: true })

function cancel() {
  open.value = false
}

function confirm() {
  if (!cropper.value) return
  const canvas = cropper.value.getCroppedCanvas({ maxWidth: 1200, maxHeight: 1600 })
  const dataUrl = canvas.toDataURL('image/png')
  emit('crop', dataUrl, props.src)
  open.value = false
}
</script>

<style>
@import 'cropperjs/dist/cropper.css';
</style>

<style scoped>
.cropper-wrap {
  width: 100%;
  max-height: 420px;
  overflow: hidden;
}
</style>

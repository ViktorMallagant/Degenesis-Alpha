<template>
  <div class="chars-root">
    <!-- Header -->
    <div class="chars-header elevation-2">
      <div class="chars-header-title">{{ $t('messages.characters') }}</div>
      <div class="chars-header-actions">
        <v-btn prepend-icon="mdi-account-plus-outline" variant="outlined" color="red-darken-2" @click="emit('createNew')">
          {{ $t('messages.createNewCharacter') }}
        </v-btn>
        <v-btn prepend-icon="mdi-import" variant="outlined" @click="emit('import')">
          {{ $t('messages.importCharacter') }}
        </v-btn>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="characters.length === 0" class="chars-empty">
      <v-icon size="80" color="grey-darken-2" icon="mdi-account-group-outline"></v-icon>
      <div class="text-h6 text-grey-darken-2 mt-4">Aucun personnage sauvegardé.</div>
      <div class="text-body-2 text-grey-darken-1 mt-1">Créez un nouveau personnage pour commencer.</div>
    </div>

    <!-- Cards grid -->
    <div v-else class="chars-grid">
      <div
        v-for="character in characters"
        :key="character.name"
        class="char-card"
        @click="emit('load', character.name)"
      >
        <!-- Portrait -->
        <div class="char-card-portrait" @click.stop>
          <img v-if="character.portrait" :src="character.portrait" class="char-card-portrait-img" @click="emit('load', character.name)" />
          <div v-else class="char-card-portrait-placeholder" @click="emit('load', character.name)">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="char-placeholder-svg">
              <circle cx="50" cy="35" r="22" fill="#555" />
              <ellipse cx="50" cy="85" rx="34" ry="28" fill="#555" />
            </svg>
          </div>
          <!-- Crop overlay button -->
          <button v-if="character.portrait" class="char-portrait-crop-btn" @click.stop="openCrop(character)" title="Recadrer">
            <v-icon size="16" icon="mdi-crop"></v-icon>
          </button>
        </div>

        <!-- Info -->
        <div class="char-card-body">
          <div class="char-card-name">{{ character.name }}</div>
          <div class="char-card-rank">{{ rankLabel(character) }}</div>

          <!-- Logotypes -->
          <div class="char-card-icons">
            <img
              v-if="character.culture"
              :src="`${baseUrl}logotypes/cultures/${character.culture}.svg`"
              class="char-logotype"
              :class="isDark ? 'char-logotype--dark' : 'char-logotype--light'"
              :title="t(`culturesConceptsCults.${character.culture}`)"
            />
            <img
              v-if="character.concept"
              :src="`${baseUrl}logotypes/concepts/${character.concept}.svg`"
              class="char-logotype"
              :class="isDark ? 'char-logotype--dark' : 'char-logotype--light'"
              :title="t(`culturesConceptsCults.${character.concept}`)"
            />
            <img
              v-if="character.clan"
              :src="`${baseUrl}logotypes/clans/${character.clan}.svg`"
              class="char-logotype"
              :class="isDark ? 'char-logotype--dark' : 'char-logotype--light'"
              :title="t(`clans.${character.clan}`)"
            />
            <img
              v-else-if="character.cult"
              :src="`${baseUrl}logotypes/cults/${character.cult}.svg`"
              class="char-logotype"
              :class="isDark ? 'char-logotype--dark' : 'char-logotype--light'"
              :title="t(`culturesConceptsCults.${character.cult}`)"
            />
          </div>
        </div>

        <!-- Actions -->
        <div class="char-card-actions" @click.stop>
          <v-btn
            block
            variant="flat"
            color="red-darken-3"
            class="char-card-open-btn"
            @click="emit('load', character.name)"
          >
            Ouvrir
          </v-btn>
          <div class="char-card-secondary-actions">
            <button class="char-card-action-link" @click="shareChar(character)" :disabled="sharing === character.name">
              <v-icon size="13" icon="mdi-share-variant"></v-icon>
              {{ sharing === character.name ? '...' : $t('messages.shareCharacter') }}
            </button>
            <span class="char-card-action-sep">·</span>
            <button class="char-card-action-link char-card-action-link--danger" @click="confirmDelete(character.name)">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Crop dialog -->
    <ImageCropperDialog
      v-model="showCropDialog"
      :src="cropSrc"
      @crop="onCropConfirm"
    />

    <!-- Share snackbar -->
    <v-snackbar v-model="shareCopied" timeout="3000" color="green-darken-2">
      {{ $t('messages.shareCopied') }}
    </v-snackbar>

    <!-- Confirm delete dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Supprimer le personnage ?</v-card-title>
        <v-card-text>
          <strong>{{ pendingDeleteName }}</strong> sera définitivement supprimé. Cette action est irréversible.
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="deleteDialog = false">Annuler</v-btn>
          <v-btn color="red-darken-2" variant="flat" @click="doDelete">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import type { Character } from '@/store/character'
import { encodeCharacter } from '@/util/share'
import browserStorage from '@/store/browserStorage'
import { useApplicationStore } from '@/store/application'
import ImageCropperDialog from './ImageCropperDialog.vue'

const props = defineProps<{
  characters: Character[]
  activeCharacterName: string
}>()

const emit = defineEmits<{
  (e: 'load', name: string): void
  (e: 'delete', name: string): void
  (e: 'createNew'): void
  (e: 'import'): void
}>()

const { t } = useI18n()
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
const baseUrl = import.meta.env.BASE_URL
const appStore = useApplicationStore()

// Delete
const deleteDialog = ref(false)
const pendingDeleteName = ref('')
function confirmDelete(name: string) {
  pendingDeleteName.value = name
  deleteDialog.value = true
}
function doDelete() {
  emit('delete', pendingDeleteName.value)
  deleteDialog.value = false
}

// Crop
const showCropDialog = ref(false)
const cropSrc = ref('')
let cropTargetName = ''

function openCrop(character: Character) {
  cropTargetName = character.name
  cropSrc.value = character.portraitOriginal || character.portrait || ''
  showCropDialog.value = true
}

function onCropConfirm(croppedDataUrl: string, originalDataUrl: string) {
  const char = browserStorage.loadCharacter(cropTargetName)
  if (!char) return
  // Patch portrait fields on the raw JSON object and re-store
  const raw = char as any
  raw.portrait = croppedDataUrl
  raw.portraitOriginal = originalDataUrl
  browserStorage.storeCharacter(raw)
  appStore.refresh()
}

// Share
const sharing = ref<string | null>(null)
const shareCopied = ref(false)
async function shareChar(character: Character) {
  sharing.value = character.name
  const base = window.location.origin + window.location.pathname
  let url: string
  try {
    const res = await fetch('https://bytebin.lucko.me/post', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(character),
    })
    if (!res.ok) throw new Error(`bytebin status ${res.status}`)
    const { key } = await res.json()
    if (!key) throw new Error('no key returned')
    url = `${base}#bb=${key}`
  } catch {
    const encoded = await encodeCharacter(character)
    url = `${base}#view=${encoded}`
  }
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    window.open(url, '_blank')
  }
  sharing.value = null
  shareCopied.value = true
}

// Rank label
function rankLabel(character: Character): string {
  const cult = character.clan
    ? t(`clans.${character.clan}`)
    : t(`culturesConceptsCults.${character.cult}`)
  const rank = character.rank ? t(`ranks.${character.rank}`) : ''
  return rank ? `${cult} (${rank})` : cult
}
</script>

<style scoped>
.chars-root {
  min-height: 100vh;
  background: rgb(var(--v-theme-surface));
}

.chars-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px 28px;
  background: rgb(var(--v-theme-surface-variant));
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.chars-header-title {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-on-surface));
}

.chars-header-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.chars-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
}

.chars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 28px;
}

.char-card {
  background: rgb(var(--v-theme-surface-variant));
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.char-card:hover {
  border-color: rgba(var(--v-theme-primary), 0.5);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.35);
}

.char-card-portrait {
  position: relative;
  aspect-ratio: 3 / 4;
  background: #2a2a2a;
  overflow: hidden;
}

.char-card-portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.char-card-portrait-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333;
}

.char-placeholder-svg {
  width: 60%;
  height: 60%;
  opacity: 0.5;
}

.char-portrait-crop-btn {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.25);
  color: #fff;
  border-radius: 4px;
  padding: 4px 6px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s;
  display: flex;
  align-items: center;
}

.char-card-portrait:hover .char-portrait-crop-btn {
  opacity: 1;
}

.char-card-body {
  padding: 12px 12px 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.char-card-name {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.char-card-rank {
  font-size: 0.7rem;
  color: rgba(var(--v-theme-on-surface), 0.55);
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.char-card-icons {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

.char-logotype {
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
}

.char-logotype--dark {
  filter: invert(1) brightness(0.75);
}

.char-logotype--light {
  filter: brightness(0);
}

.char-card-actions {
  padding: 8px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.char-card-open-btn {
  font-size: 0.75rem !important;
  letter-spacing: 0.08em !important;
}

.char-card-secondary-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.char-card-action-link {
  background: none;
  border: none;
  color: rgba(var(--v-theme-on-surface), 0.4);
  font-size: 0.68rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 3px;
  transition: color 0.15s;
}

.char-card-action-link:hover {
  color: rgba(var(--v-theme-on-surface), 0.75);
}

.char-card-action-link--danger:hover {
  color: #ef5350;
}

.char-card-action-sep {
  color: rgba(var(--v-theme-on-surface), 0.25);
  font-size: 0.7rem;
}
</style>

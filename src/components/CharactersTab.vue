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
        :class="{ 'char-card--active': character.name === activeCharacterName }"
        @click="emit('load', character.name)"
      >
        <!-- Portrait -->
        <div class="char-card-portrait">
          <img v-if="character.portrait" :src="character.portrait" class="char-card-portrait-img" />
          <div v-else class="char-card-portrait-placeholder">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="char-placeholder-svg">
              <circle cx="50" cy="35" r="22" fill="#555" />
              <ellipse cx="50" cy="85" rx="34" ry="28" fill="#555" />
            </svg>
          </div>
          <div v-if="character.name === activeCharacterName" class="char-card-active-badge">
            <v-icon size="14" icon="mdi-check-circle"></v-icon> Actif
          </div>
        </div>

        <!-- Info -->
        <div class="char-card-body">
          <div class="char-card-name">{{ character.name }}</div>
          <div class="char-card-rank">
            {{ rankLabel(character) }}
          </div>

          <!-- Logotypes -->
          <div class="char-card-icons">
            <img
              v-if="character.culture"
              :src="`${baseUrl}logotypes/cultures/${character.culture}.svg`"
              class="char-logotype"
              :title="t(`culturesConceptsCults.${character.culture}`)"
            />
            <img
              v-if="character.concept"
              :src="`${baseUrl}logotypes/concepts/${character.concept}.svg`"
              class="char-logotype"
              :title="t(`culturesConceptsCults.${character.concept}`)"
            />
            <img
              v-if="character.clan"
              :src="`${baseUrl}logotypes/clans/${character.clan}.svg`"
              class="char-logotype"
              :title="t(`clans.${character.clan}`)"
            />
            <img
              v-else-if="character.cult"
              :src="`${baseUrl}logotypes/cults/${character.cult}.svg`"
              class="char-logotype"
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
            {{ character.name === activeCharacterName ? 'Continuer' : 'Ouvrir' }}
          </v-btn>
          <button class="char-card-delete-btn" @click="confirmDelete(character.name)">
            Supprimer
          </button>
        </div>
      </div>
    </div>

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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Character } from '@/store/character'

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
const baseUrl = import.meta.env.BASE_URL

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

function rankLabel(character: Character): string {
  const cult = character.clan
    ? t(`clans.${character.clan}`)
    : t(`culturesConceptsCults.${character.cult}`)
  const rank = character.rank ? t(`ranks.${character.rank}`) : ''
  return rank ? `${cult} — ${rank}` : cult
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

.char-card--active {
  border-color: rgb(var(--v-theme-primary));
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

.char-card-active-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgb(var(--v-theme-primary));
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 3px;
  letter-spacing: 0.05em;
}

.char-card-body {
  padding: 12px 12px 8px;
  flex: 1;
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
}

.char-card-rank {
  font-size: 0.7rem;
  color: rgba(var(--v-theme-on-surface), 0.55);
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.char-card-icons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.char-logotype {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: invert(1) brightness(0.75);
  flex-shrink: 0;
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

.char-card-delete-btn {
  background: none;
  border: none;
  color: rgba(var(--v-theme-on-surface), 0.35);
  font-size: 0.7rem;
  cursor: pointer;
  text-align: center;
  padding: 2px 0;
  transition: color 0.15s;
}

.char-card-delete-btn:hover {
  color: #ef5350;
}
</style>

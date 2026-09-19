<template>
  <section class="other-tab">
    <div class="other-tab__content">
      <header class="other-tab__header">
        <h1 class="text-h5 mb-1">{{ $t('messages.other.title') }}</h1>
        <p class="text-body-2 mb-0">{{ $t('messages.other.help') }}</p>
      </header>

      <section class="other-section">
        <h2>{{ $t('messages.other.scars') }}</h2>
        <div class="scars-grid">
          <v-text-field
            v-model="store.other.scars.groupName"
            :label="$t('messages.other.groupName')"
            variant="outlined"
            density="compact"
            :readonly="readonly"
          />
          <v-text-field
            v-model="store.other.scars.alignment"
            :label="$t('messages.other.alignment')"
            variant="outlined"
            density="compact"
            :readonly="readonly"
          />
          <v-textarea
            v-model="store.other.scars.constellation"
            :label="$t('messages.other.constellation')"
            variant="outlined"
            density="compact"
            rows="2"
            auto-grow
            :readonly="readonly"
          />
          <v-text-field
            v-model="store.other.scars.scarsValue"
            :label="$t('messages.other.scarsValue')"
            variant="outlined"
            density="compact"
            :readonly="readonly"
          />
          <div class="infamy-field">
            <span class="infamy-field__label">{{ $t('messages.other.infamy') }}</span>
            <ValueBoxes
              :count="6"
              :value="store.other.scars.infamy"
              :max="6"
              :min="0"
              :interactive="!readonly"
              @change="setInfamy"
            />
          </div>
        </div>
      </section>

      <section class="other-section">
        <h2>{{ $t('messages.other.complications') }}</h2>
        <v-textarea
          v-model="store.other.complications"
          :label="$t('messages.other.complications')"
          variant="outlined"
          rows="6"
          :readonly="readonly"
          hide-details
        />
      </section>

      <section class="other-section">
        <h2>{{ $t('messages.other.artifacts') }}</h2>
        <div class="artifacts-grid">
          <article
            v-for="(artifact, index) in store.other.artifacts"
            :key="index"
            class="artifact-card"
          >
            <h3>{{ $t('messages.other.artifactNumber', { number: index + 1 }) }}</h3>
            <v-text-field
              v-model="artifact.name"
              :label="$t('messages.other.artifactName')"
              variant="outlined"
              density="compact"
              :readonly="readonly"
            />
            <v-text-field
              v-model="artifact.activation"
              :label="$t('messages.other.activation')"
              variant="outlined"
              density="compact"
              :readonly="readonly"
            />
            <v-text-field
              v-model="artifact.operation"
              :label="$t('messages.other.operation')"
              variant="outlined"
              density="compact"
              :readonly="readonly"
            />
            <v-text-field
              v-model="artifact.appraisalValue"
              :label="$t('messages.other.appraisalValue')"
              variant="outlined"
              density="compact"
              :readonly="readonly"
            />
          </article>
        </div>
      </section>

      <section class="other-section">
        <h2>{{ $t('messages.other.notes') }}</h2>
        <div class="notes-grid">
          <v-text-field
            v-for="(_, index) in store.other.notes"
            :key="index"
            v-model="store.other.notes[index]"
            :label="$t('messages.other.noteNumber', { number: index + 1 })"
            variant="outlined"
            density="compact"
            :readonly="readonly"
            hide-details
          />
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import ValueBoxes from '@/components/ValueBoxes.vue'
import { useCharacterStore } from '@/store'

withDefaults(
  defineProps<{
    readonly?: boolean
  }>(),
  {
    readonly: false
  }
)

const store = useCharacterStore()

function setInfamy(value: number) {
  store.other.scars.infamy = Math.max(0, Math.min(6, Math.trunc(value)))
}
</script>

<style scoped>
.other-tab {
  min-height: calc(100vh - 112px);
  padding: clamp(16px, 3vw, 32px);
  color: #f5f5f5;
  background: radial-gradient(circle at 50% 0%, rgba(120, 0, 0, 0.16), transparent 32rem), #080808;
}

.other-tab__content {
  width: min(1400px, 100%);
  margin: 0 auto;
}

.other-tab__header {
  margin-bottom: 22px;
}

.other-tab__header p {
  color: rgba(255, 255, 255, 0.68);
}

.other-section {
  margin-bottom: 22px;
  padding: clamp(16px, 2vw, 24px);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.14);
  border-radius: 10px;
  background: rgb(var(--v-theme-surface));
}

.other-section h2 {
  margin: 0 0 12px;
  padding-bottom: 4px;
  border-bottom: 2px solid rgba(var(--v-theme-on-surface), 0.15);
  color: rgb(var(--v-theme-on-surface));
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.scars-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px 18px;
}

.infamy-field {
  display: flex;
  min-height: 48px;
  align-items: center;
  gap: 18px;
  padding: 0 12px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.28);
  border-radius: 4px;
}

.infamy-field__label {
  color: rgba(var(--v-theme-on-surface), 0.72);
  font-size: 1rem;
}

.artifacts-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.artifact-card {
  padding: 16px 16px 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.25);
}

.artifact-card h3 {
  margin: 0 0 14px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 18px;
}

@media (max-width: 900px) {
  .artifacts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  .scars-grid,
  .notes-grid {
    grid-template-columns: 1fr;
  }
}
</style>

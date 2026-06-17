<template>
  <div class="pa-1">
    <div class="pa-1 text-subtitle-2">
      {{ $t('messages.preferences.untranslatedLabels') }}
    </div>
    <v-btn-toggle
      :disabled="$i18n.locale == 'en'"
      v-model="store.displayTranslatedLabels"
      @update:model-value="updateTranslatedLabels"
      color="grey-darken-4"
      variant="outlined"
      density="comfortable"
      mandatory
    >
      <v-btn :value="false" :prepend-icon="mdiTranslateOff">{{
        $t('messages.preferences.displayOriginalLabels')
      }}</v-btn>
      <v-btn :value="true" :prepend-icon="mdiTranslate">{{
        $t('messages.preferences.displayTranslatedLabels')
      }}</v-btn>
    </v-btn-toggle>
    <div class="pa-1 text-caption text-grey-darken-1">
      <p>
        {{ $t(`messages.preferences.displayTranslatedLabelsDescription`) }}
      </p>
    </div>
  </div>
  <v-divider class="my-4"></v-divider>
  <div class="pa-1">
    <div class="pa-1 text-subtitle-2">Thème</div>
    <v-btn-toggle
      :model-value="currentTheme"
      @update:model-value="setTheme"
      color="grey-darken-4"
      variant="outlined"
      density="comfortable"
      mandatory
    >
      <v-btn value="dark" :prepend-icon="mdiWeatherNight">Sombre</v-btn>
      <v-btn value="light" :prepend-icon="mdiWhiteBalanceSunny">Clair</v-btn>
    </v-btn-toggle>
  </div>
  <v-divider class="my-4"></v-divider>
  <div class="pa-1">
    <div class="pa-1 text-subtitle-2">Vidéo d'introduction</div>
    <v-checkbox
      v-model="skipSplash"
      label="Ne plus lancer la vidéo au lancement du site"
      density="compact"
      hide-details
      @update:model-value="onSkipSplashChange"
    ></v-checkbox>
  </div>
  <v-divider class="my-4"></v-divider>
  <v-form>
    <div class="pa-1 text-subtitle-2">
      {{ $t('messages.locale') }}
    </div>
    <v-select
      v-model="$i18n.locale"
      :items="$i18n.availableLocales"
      @update:modelValue="browserStorage.storeLocale(i18n.locale.value)"
      variant="outlined"
      density="compact"
    ></v-select>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCharacterStore } from '@/store'
import browserStorage from '@/store/browserStorage'
import { mdiTranslate, mdiTranslateOff, mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
const store = useCharacterStore()
const i18n = useI18n()
const theme = useTheme()

const currentTheme = ref(theme.global.name.value)
const skipSplash = ref(localStorage.getItem('parasite-skip-splash') === 'true')

function onSkipSplashChange(value: boolean) {
  localStorage.setItem('parasite-skip-splash', String(value))
}

function setTheme(value: string) {
  theme.global.name.value = value
  currentTheme.value = value
  localStorage.setItem('parasite-theme', value)
}

function updateTranslatedLabels(value: boolean) {
  browserStorage.storeDisplayTranslatedLabels(value)
  store.displayTranslatedLabels = value
}
</script>

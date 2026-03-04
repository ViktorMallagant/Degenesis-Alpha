<template>
  <v-app id="app">
    <div id="mainNavigation" class="doNotPrint">
      <v-navigation-drawer v-model="showNavigationDrawer" color="grey-darken-4" width="320">
        <v-sheet v-if="!mobile" color="grey-darken-4" class="pa-4">
          <div class="logo">
            <v-img src="./logo_parasite.png" alt="Logo" class="logo-img" />
            <div class="appName label text-uppercase mt-2 text-grey">{{ appTagLine }}</div>
          </div>
        </v-sheet>
        <v-sheet color="grey-darken-4" class="pl-4"> </v-sheet>
        <v-divider v-if="appStore.storedCharacters.size > 0"></v-divider>
        <v-list>
          <v-list-subheader v-if="appStore.storedCharacters.size > 0" class="text-grey text-uppercase">
            {{ $t('messages.characters') }}
          </v-list-subheader>
          <v-list-item
            v-for="(character, index) in appStore.getStoredCharacters"
            :key="index"
            :value="index"
            role="button"
            @click="loadCharacter(character.name)"
            :title="character.name"
            :variant="character.name == store.characterName ? 'tonal' : 'plain'"
          >
            <template v-slot:prepend>
              <v-icon
                :icon="store.characterName == character.name ? mdiAccount : mdiAccountOutline"
              ></v-icon>
            </template>
            <v-list-item-subtitle>
              {{ `${cultureLabels().get(character.culture)}` }}
              {{ `${conceptLabels().get(character.concept)}` }}
              {{ `${cultLabels().get(character.clan || character.cult)}` }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider class="mt-2 mb-2"></v-divider>
          <v-list-item role="button" link class="createNewCharacterButton">
            {{ $t('messages.createNewCharacter') }}
            <template v-slot:prepend>
              <v-icon :icon="mdiAccountPlusOutline"></v-icon>
            </template>
            <v-dialog
              v-model="createNewCharacterDialog"
              activator=".createNewCharacterButton"
              width="auto"
            >
              <v-card class="createNewCharacterDialog">
                <v-card-title>
                  {{ $t('messages.createNewCharacter') }}
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="newCharacterName"
                      :label="$t('messages.characterName')"
                    ></v-text-field>
                  </v-form>
                  <v-alert
                    variant="tonal"
                    :icon="mdiInformation"
                    color="warning"
                    v-if="characterExists(newCharacterName)"
                  >
                    {{ $t('messages.characterAlreadyExists') }}
                  </v-alert>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="createNewCharacterDialog = false">{{
                    $t('messages.cancel')
                  }}</v-btn>
                  <v-btn
                    :disabled="
                      newCharacterName.trim().length == 0 || characterExists(newCharacterName)
                    "
                    @click="createNewCharacter"
                  >
                    {{ $t('messages.createNewCharacter') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item>
          <v-list-item role="button" link @click="triggerCharacterImport">
            {{ $t('messages.importCharacter') }}
            <template v-slot:prepend>
              <v-icon :icon="mdiImport"></v-icon>
            </template>
            <v-form ref="importForm" hidden>
              <v-file-input
                variant="outlined"
                :label="$t('messages.importCharacter')"
                ref="importFile"
                @change="importCharacter"
                accept="application/json"
              ></v-file-input>
            </v-form>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <v-list-item :title="$t('messages.preferences.label')" role="button" link class="py-4">
            <template v-slot:prepend>
              <v-icon :icon="mdiCogOutline"></v-icon>
            </template>
            <v-dialog v-model="showPreferencesDialog" activator="parent" width="auto">
              <v-card>
                <v-card-title>{{ $t('messages.preferences.label') }}</v-card-title>
                <v-card-text>
                  <AppPreferences></AppPreferences>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="showPreferencesDialog = !showPreferencesDialog">
                    {{ $t('messages.close') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="pa-4 pt-0 text-grey-darken-2">
            <span class="text-caption">
              This page is a community creation for the tabletop role playing game
              <a href="https://degenesis.com">Degenesis®</a>. Degenesis® is a trademark of
              <a href="https://sixmorevodka.com">SIXMOREVODKA® Studio GmbH</a>. All rights
              reserved. This page is not affiliated with SIXMOREVODKA Studio GmbH.
            </span>
            <br />
            <br />
            <a :href="config.sourceCodeRepo" target="_blank">Source code</a>
          </v-list-item>
        </template>
      </v-navigation-drawer>
      <v-app-bar color="grey-darken-4" v-if="$vuetify.display.mdAndDown" :elevation="2">
        <template v-slot:prepend>
          <v-app-bar-nav-icon
            @click="showNavigationDrawer = !showNavigationDrawer"
          ></v-app-bar-nav-icon>
          <v-img id="appBarIcon" class="ml-3 mr-5" src="/logo_red.svg" alt="Logo" />
        </template>
      </v-app-bar>
    </div>
    <v-main
      v-if="store.characterName.length > 0"
      :class="tab == 'sheet' ? 'bg-grey-lighten-3' : ''"
    >
      <v-tabs v-model="tab" bg-color="grey-darken-3">
        <v-tab value="edit">{{ $t('messages.editCharacter') }}</v-tab>
        <v-tab value="sheet">{{ $t('messages.characterSheet') }}</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="edit">
          <Editor> </Editor>
        </v-window-item>
        <v-window-item value="sheet">
          <div class="bg-grey-lighten-3">
            <Sheet></Sheet>
          </div>
        </v-window-item>
      </v-window>
    </v-main>
    <div v-if="store.characterName.length == 0" class="bg-grey-darken-4">
      <IntroPage></IntroPage>
    </div>
    <v-overlay
      v-model="showOverlay"
      persistent
      class="align-center justify-center bg-grey-darken-4"
    >
      <v-card color="grey-darken-4">
        <v-card-text>
          <div class="logo d-flex justify-center mt-3 mb-6">
            <div>
              <v-img src="/degenesis_red.png" alt="Logo" />
              <div class="appName label text-uppercase mt-3" style="font-size: 2em;">{{ appTagLine }}</div>
            </div>
          </div>
          <v-form @submit="checkPassword" class="passwordForm" style="width: 100%;">
            <v-text-field
              :error="showPasswordWarning"
              :label="$t('messages.password')"
              v-model="password"
              type="password"
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-btn type="submit">{{ $t('messages.enter') }}</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-overlay>
  </v-app>
</template>

<script setup lang="ts">
import IntroPage from '@/components/IntroPage.vue'
import AppPreferences from '@/components/AppPreferences.vue'
import Sheet from '@/components/SheetTab.vue'
import config from '@/config'
import { useCharacterStore } from '@/store'
import type { Character } from '@/store/character'
import browserStorage from '@/store/browserStorage'
import romanize from '@/util/romanize'
import {
  mdiAccount,
  mdiAccountOutline,
  mdiAccountPlusOutline,
  mdiImport,
  mdiInformation,
  mdiCogOutline
} from '@mdi/js'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'
import type { VFileInput, VForm } from 'vuetify/components'
import Editor from './components/EditorTab.vue'
import { useApplicationStore } from './store/application'

const store = useCharacterStore()
const appStore = useApplicationStore()
const i18n = useI18n()

/*
Show a password overlay if the beta password has been set. This doesn't need to really prevent access.
It exists to prevent Impressumspflicht and DSGVO violations.
 */
const password = ref('')
const showOverlay = ref(config.password != undefined && !browserStorage.loadHasUnlockedBeta())
const showPasswordWarning = ref(false)
const checkPassword = (e: any) => {
  e.preventDefault()
  if (password.value == config.password) {
    browserStorage.storeHasUnlockedBeta()
    showOverlay.value = false
  } else {
    showPasswordWarning.value = true
  }
}

const { appTagLine } = config

const cultures = ([] as string[]).concat(...config.culturesByName.keys())
const concepts = ([] as string[]).concat(...config.conceptsByName.keys())
const cults = ([] as string[]).concat(...config.cultsByName.keys())
const clans = ([] as string[]).concat(...config.clansByName.keys())

const cultureLabels = () =>
  new Map<string, string>(cultures.map((k) => [k, i18n.t(`culturesConceptsCults.${k}`)]))
const conceptLabels = () =>
  new Map<string, string>(
    concepts.map((k, idx) => [k, `${romanize(idx)}. ${i18n.t(`culturesConceptsCults.${k}`)}`])
  )
const cultLabels = () => {
  const cultTranslations: [string, string][] = cults.map((k) => [k, i18n.t(`culturesConceptsCults.${k}`)])
  const clanTranslations: [string, string][] = clans.map((k) => [k, i18n.t(`clans.${k}`)])
  const allTranslations = [...cultTranslations, ...clanTranslations]
  return new Map<string, string>(allTranslations)
}

const tab = ref('')

// persist state whenever it changes
watch(
  () => store.$state,
  (state) => {
    // we can't sensibly persist characters without a name, as the name is the storage key
    // and we must not save while a character is being loaded (state would be partial/corrupt)
    if (state.characterName && state.characterName.length > 0 && !state.isLoading) {
      browserStorage.storeCharacter(store.asCharacter)
      appStore.refresh()
    }
  },
  { deep: true }
)

const newCharacterName = ref('')
const createNewCharacterDialog = ref(false)
const createNewCharacter = () => {
  const newName = newCharacterName.value.trim()
  if (!characterExists(newName)) {
    store.$reset()
    store.setCharacterName(newName)
    browserStorage.storeCharacter(store.asCharacter)
    createNewCharacterDialog.value = false
    newCharacterName.value = ''
    // close the navigation in case we're on a mobile breakpoint
    showNavigationDrawer.value = !mobile.value
  }
}

const characterExists = browserStorage.characterIsStored

const loadCharacter = (characterName: string) => {
  const character = browserStorage.loadCharacter(characterName)
  if (character) {
    store.loadCharacter(character)
  }
  // close the navigation in case we're on a mobile breakpoint
  showNavigationDrawer.value = !mobile.value
}

const importForm = ref<VForm>()
const importFile = ref<VFileInput>()
const triggerCharacterImport = () => {
  importFile.value?.click()
}
const importCharacter = async () => {
  if (importFile.value && importFile.value.files && importFile.value.files.length == 1) {
    const content = await importFile.value.files[0].text()
    try {
      const parsed: Character = JSON.parse(content)
      if (parsed && parsed.storageVersion == 'v1') {
        store.loadCharacter(parsed)
        importForm.value?.reset()
      } else {
        console.warn('Invalid storage version: ', parsed.storageVersion)
      }
    } catch (e) {
      console.error(e)
    }
  } else {
    console.warn('File upload failed')
  }
}

const { mobile } = useDisplay()
const showNavigationDrawer = ref(!mobile.value)
const showPreferencesDialog = ref(false)

const storedLocale = browserStorage.loadLocale()
if (storedLocale) {
  i18n.locale.value = storedLocale
}

const storedDisplayTranslatedLabels = browserStorage.loadDisplayTranslatedLabels()
if (storedDisplayTranslatedLabels) {
  store.displayTranslatedLabels = storedDisplayTranslatedLabels
}
</script>
<style scoped>

#app {
  font-size: 12pt;
}
.appName {
  letter-spacing: 0.4em;
}

#appBarIcon {
  width: 4em;
}

a {
  color: #616161;
}

.createNewCharacterDialog {
  width: 30em;
  max-width: calc(100vw - 24px);
}

.passwordForm {
  width: 20em;
}

.logo-img {
  max-height: 6em;
  aspect-ratio: 2;
  margin-left: -50px;
}
</style>

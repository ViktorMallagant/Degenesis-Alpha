<template>
  <v-app id="app">
    <div id="mainNavigation" class="doNotPrint">
      <v-navigation-drawer v-model="showNavigationDrawer" color="grey-darken-4" width="320" :class="{ 'nav-glitching': navGlitch }">
        <v-sheet v-if="!mobile" color="grey-darken-4" class="pa-4">
          <div class="logo">
            <v-img src="./logo_parasite.png" alt="Logo" class="logo-img" />
            <div class="appName label text-uppercase mt-2 text-grey">{{ appTagLine }}</div>
          </div>
        </v-sheet>
        <v-sheet color="grey-darken-4" class="pl-4"> </v-sheet>
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            role="button"
            link
            @click="openCharactersGallery"
            :variant="charactersGalleryMode ? 'tonal' : 'plain'"
          >
            {{ $t('messages.characters') }}
            <template v-slot:prepend>
              <v-icon :icon="mdiAccountGroup"></v-icon>
            </template>
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
                  <v-form @submit.prevent="createNewCharacter">
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
          <v-list-item role="button" link @click="openNpcGenerator">
            {{ $t('messages.npcGenerator.navButton') }}
            <template v-slot:prepend>
              <v-icon :icon="mdiAccountQuestionOutline"></v-icon>
            </template>
          </v-list-item>
          <v-list-item role="button" link @click="openNameGenerator">
            {{ $t('messages.nameGenerator.navButton') }}
            <template v-slot:prepend>
              <v-icon :icon="mdiTagTextOutline"></v-icon>
            </template>
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
              reserved. This page is not affiliated with <a href="https://sixmorevodka.com">SIXMOREVODKA® Studio GmbH</a>.
            </span>
            <br />
            <br />
            <a href="https://github.com/ViktorMallagant/Degenesis-Alpha" target="_blank">Source code</a>
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
    <v-main v-if="charactersGalleryMode" class="bg-grey-darken-4">
      <CharactersTab
        :characters="appStore.getStoredCharacters"
        :active-character-name="store.characterName"
        @load="loadCharacterFromGallery"
        @delete="deleteCharacter"
        @create-new="openCreateNewDialog"
        @import="triggerCharacterImport"
      />
    </v-main>
    <v-main v-else-if="nameGeneratorMode" class="bg-grey-darken-4">
      <NameGeneratorTab />
    </v-main>
    <v-main v-else-if="npcGeneratorMode" class="bg-grey-lighten-3">
      <v-tabs v-model="npcTab" bg-color="grey-darken-3">
        <v-tab value="detailed">{{ $t('messages.npcGenerator.detailedTitle') }}</v-tab>
        <v-tab value="simple">{{ $t('messages.npcGenerator.simpleTitle') }}</v-tab>
      </v-tabs>
      <v-window v-model="npcTab">
        <v-window-item value="detailed">
          <NpcGeneratorTab></NpcGeneratorTab>
        </v-window-item>
        <v-window-item value="simple">
          <NpcSimpleGeneratorTab></NpcSimpleGeneratorTab>
        </v-window-item>
      </v-window>
    </v-main>
    <v-main
      v-else-if="!charactersGalleryMode && !nameGeneratorMode && store.characterName.length > 0"
      :class="[tab == 'sheet' ? 'bg-grey-lighten-3' : '', isSharedView ? 'shared-view-mode' : '']"
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
    <div v-if="!charactersGalleryMode && !npcGeneratorMode && !nameGeneratorMode && store.characterName.length == 0" class="bg-grey-darken-4">
      <IntroPage></IntroPage>
    </div>
    <v-snackbar v-model="ownCharSnackbar" timeout="6000" color="blue-darken-2">
      It's your own file—it opened from your local save.
    </v-snackbar>
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
  <SplashScreen />
  <TrigLawOverlay />
  <MesmerizedOverlay />
</template>

<script setup lang="ts">
import IntroPage from '@/components/IntroPage.vue'
import TrigLawOverlay from '@/components/TrigLawOverlay.vue'
import MesmerizedOverlay from '@/components/MesmerizedOverlay.vue'
import SplashScreen from '@/components/SplashScreen.vue'
import AppPreferences from '@/components/AppPreferences.vue'
import Sheet from '@/components/InventoryTab.vue'
import NpcGeneratorTab from '@/components/NpcGeneratorTab.vue'
import NpcSimpleGeneratorTab from '@/components/NpcSimpleGeneratorTab.vue'
import NameGeneratorTab from '@/components/NameGeneratorTab.vue'
import CharactersTab from '@/components/CharactersTab.vue'
import config from '@/config'
import { useCharacterStore } from '@/store'
import type { Character } from '@/store/character'
import { ITEMS } from '@/config/items'
import browserStorage from '@/store/browserStorage'
import romanize from '@/util/romanize'
import {
  mdiAccount,
  mdiAccountOutline,
  mdiAccountPlusOutline,
  mdiAccountQuestionOutline,
  mdiAccountGroup,
  mdiImport,
  mdiInformation,
  mdiCogOutline,
  mdiTagTextOutline
} from '@mdi/js'
import { ref, computed, watch, provide, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay, useTheme } from 'vuetify'
import type { VFileInput, VForm } from 'vuetify/components'
import Editor from './components/EditorTab.vue'
import { decodeCharacter } from '@/util/share'
import { useApplicationStore } from './store/application'
import { ranksByCult } from '@/config/cults/cults'

const store = useCharacterStore()
const appStore = useApplicationStore()

const isSharedView = ref(false)
provide('isSharedView', isSharedView)
const ownCharSnackbar = ref(false)

onMounted(async () => {
  const hash = window.location.hash.slice(1)
  const params = new URLSearchParams(hash)
  const bbKey = params.get('bb')
  const viewParam = params.get('view')

  try {
    let parsed: Character | null = null

    if (bbKey) {
      const res = await fetch(`https://bytebin.lucko.me/${bbKey}`)
      if (res.ok) parsed = JSON.parse(await res.text()) as Character
    } else if (viewParam) {
      parsed = await decodeCharacter(viewParam) as Character
    }

    if (parsed?.storageVersion === 'v1') {
      if (browserStorage.characterIsStored(parsed.name)) {
        // C'est la fiche de l'utilisateur courant — ouvrir depuis le local
        const local = browserStorage.loadCharacter(parsed.name)
        if (local) store.loadCharacter(local)
        ownCharSnackbar.value = true
      } else {
        // Marquer AVANT le chargement pour que le watch ne stocke pas ce personnage partagé
        isSharedView.value = true
        store.loadCharacter(parsed)
      }
      tab.value = 'edit'
    }
  } catch (e) {
    console.error('Failed to load shared character', e)
  }
})
const i18n = useI18n()
const theme = useTheme()

// Expose globals for the standalone rank-tree.js and fill-pdf.js scripts.
// Done in App.vue (always mounted) rather than AppPreferences (lazy dialog).
// Note: window.__i18n (the instance, with .global.t) is exposed in main.ts.
;(window as any).__charStore = store
;(window as any).__getRanks = (cult: any, clan: any) => ranksByCult(cult, clan)
;(window as any).__items = ITEMS

// Restore persisted theme
const _savedTheme = localStorage.getItem('parasite-theme')
if (_savedTheme === 'light' || _savedTheme === 'dark') {
  theme.global.name.value = _savedTheme
}

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

const tagLineIndex = ref(Math.floor(Math.random() * config.appTagLinesByLocale.fr.length))
const appTagLine = computed(() => {
  const locale = i18n.locale.value as keyof typeof config.appTagLinesByLocale
  const lines = config.appTagLinesByLocale[locale] || config.appTagLinesByLocale.fr
  return lines[tagLineIndex.value] ?? lines[0]
})

const cultures = ([] as string[]).concat(...config.culturesByName.keys())
const concepts = ([] as string[]).concat(...config.conceptsByName.keys())
const cults = ([] as string[]).concat(...config.cultsByName.keys())
const clans = ([] as string[]).concat(...config.clansByName.keys())

const cultureLabels = () =>
  new Map<string, string>(cultures.map((k) => [k, i18n.t(`culturesConceptsCults.${k}`)]))
const conceptLabels = () =>
  new Map<string, string>(
    concepts.map((k) => [k, i18n.t(`culturesConceptsCults.${k}`)])
  )
const cultLabels = () => {
  const cultTranslations: [string, string][] = cults.map((k) => [k, i18n.t(`culturesConceptsCults.${k}`)])
  const clanTranslations: [string, string][] = clans.map((k) => [k, i18n.t(`clans.${k}`)])
  const allTranslations = [...cultTranslations, ...clanTranslations]
  return new Map<string, string>(allTranslations)
}

const tab = ref('')

const navGlitch = ref(false)
setInterval(() => {
  navGlitch.value = true
  setTimeout(() => {
    tagLineIndex.value = Math.floor(Math.random() * config.appTagLinesByLocale.fr.length)
    navGlitch.value = false
  }, 600)
}, 60000)
;(window as any).__currentTab = tab
provide('currentTab', tab)

// persist state whenever it changes
watch(
  () => store.$state,
  (state) => {
    // we can't sensibly persist characters without a name, as the name is the storage key
    if (state.characterName && state.characterName.length > 0 && !isSharedView.value) {
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
    npcGeneratorMode.value = false
    charactersGalleryMode.value = false
    nameGeneratorMode.value = false
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
  npcGeneratorMode.value = false
  charactersGalleryMode.value = false
  nameGeneratorMode.value = false
  const character = browserStorage.loadCharacter(characterName)
  if (character) {
    store.loadCharacter(character)
  }
  // close the navigation in case we're on a mobile breakpoint
  showNavigationDrawer.value = !mobile.value
}

const npcGeneratorMode = ref(false)
const npcTab = ref('detailed')
const openNpcGenerator = () => {
  npcGeneratorMode.value = true
  charactersGalleryMode.value = false
  nameGeneratorMode.value = false
  showNavigationDrawer.value = !mobile.value
}

const nameGeneratorMode = ref(false)
const openNameGenerator = () => {
  nameGeneratorMode.value = true
  npcGeneratorMode.value = false
  charactersGalleryMode.value = false
  showNavigationDrawer.value = !mobile.value
}

const charactersGalleryMode = ref(false)
;(window as any).__charactersGalleryMode = charactersGalleryMode
;(window as any).__npcGeneratorMode = npcGeneratorMode
;(window as any).__nameGeneratorMode = nameGeneratorMode
const openCharactersGallery = () => {
  charactersGalleryMode.value = true
  npcGeneratorMode.value = false
  nameGeneratorMode.value = false
  showNavigationDrawer.value = !mobile.value
}

const loadCharacterFromGallery = (characterName: string) => {
  const character = browserStorage.loadCharacter(characterName)
  if (character) {
    store.loadCharacter(character)
  }
  charactersGalleryMode.value = false
  showNavigationDrawer.value = !mobile.value
}

const deleteCharacter = (characterName: string) => {
  browserStorage.deleteCharacter(characterName)
  if (store.characterName === characterName) {
    store.$reset()
  }
  appStore.refresh()
}

const openCreateNewDialog = () => {
  createNewCharacterDialog.value = true
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
<style>
/* Block all editing in shared view — global so it reaches child components */
.shared-view-mode .box,
.shared-view-mode .v-field,
.shared-view-mode .v-selection-control,
.shared-view-mode .v-slider {
  pointer-events: none !important;
}
</style>

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

<style>
.v-theme--dark .v-overlay__scrim {
  background: #000000 !important;
  opacity: 0.72 !important;
}

.nav-glitching {
  animation: nav-glitch 0.6s steps(1) forwards !important;
}

@keyframes nav-glitch {
  0%   { transform: translate(0, 0);    filter: none; }
  10%  { transform: translate(-4px, 0); filter: hue-rotate(90deg) brightness(1.4); clip-path: inset(15% 0 70% 0); }
  20%  { transform: translate(3px, 0);  filter: none; clip-path: inset(0); }
  30%  { transform: translate(-6px, 2px); filter: hue-rotate(180deg) brightness(1.6); clip-path: inset(55% 0 20% 0); }
  40%  { transform: translate(0, 0);    filter: none; clip-path: inset(0); }
  50%  { transform: translate(5px, -2px); filter: hue-rotate(270deg) saturate(3); clip-path: inset(30% 0 50% 0); }
  60%  { transform: translate(-3px, 0); filter: none; clip-path: inset(0); }
  70%  { transform: translate(4px, 1px);  filter: brightness(1.8) contrast(1.5); clip-path: inset(80% 0 5% 0); }
  80%  { transform: translate(0, 0);    filter: none; clip-path: inset(0); }
  90%  { transform: translate(-2px, 0); filter: hue-rotate(45deg); }
  100% { transform: translate(0, 0);    filter: none; clip-path: inset(0); }
}
</style>

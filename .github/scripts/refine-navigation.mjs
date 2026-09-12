import fs from 'node:fs'

const appPath = 'src/App.vue'
let text = fs.readFileSync(appPath, 'utf8')

function replaceOnce(oldText, newText, label) {
  const first = text.indexOf(oldText)
  const last = text.lastIndexOf(oldText)
  if (first === -1 || first !== last) {
    throw new Error(`${label}: expected exactly one match`)
  }
  text = text.replace(oldText, newText)
}

const nameItem = `          <v-list-item role="button" link @click="openNameGenerator">
            {{ $t('messages.nameGenerator.navButton') }}
            <template v-slot:prepend>
              <v-icon :icon="mdiTagTextOutline"></v-icon>
            </template>
          </v-list-item>
`

const timelineItem = `          <v-list-item
            link
            href="https://viktormallagant.github.io/Degenesis-Timeline/"
          >
            Timeline
            <template v-slot:prepend>
              <v-icon :icon="mdiClockOutline"></v-icon>
            </template>
          </v-list-item>
`
replaceOnce(nameItem, nameItem + timelineItem, 'timeline menu insertion')

replaceOnce(
  `    <v-main
      v-else-if="!charactersGalleryMode && !nameGeneratorMode && store.characterName.length > 0"
`,
  `    <v-main
      v-else-if="store.characterName.length > 0"
`,
  'character view condition'
)
replaceOnce(
  `    <div v-if="!charactersGalleryMode && !npcGeneratorMode && !nameGeneratorMode && store.characterName.length == 0" class="bg-grey-darken-4">
`,
  `    <div v-else class="bg-grey-darken-4">
`,
  'intro view condition'
)

replaceOnce("import romanize from '@/util/romanize'\n", '', 'unused romanize import')
replaceOnce(
  `import {
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
`,
  `import {
  mdiAccountGroup,
  mdiAccountPlusOutline,
  mdiAccountQuestionOutline,
  mdiClockOutline,
  mdiCogOutline,
  mdiImport,
  mdiInformation,
  mdiTagTextOutline
} from '@mdi/js'
`,
  'icon imports'
)

const labelsBlock = `const cultures = ([] as string[]).concat(...config.culturesByName.keys())
const concepts = ([] as string[]).concat(...config.conceptsByName.keys())
const cults = ([] as string[]).concat(...config.cultsByName.keys())
const clans = ([] as string[]).concat(...config.clansByName.keys())

const cultureLabels = () =>
  new Map<string, string>(cultures.map((k) => [k, i18n.t(\`culturesConceptsCults.\${k}\`)]))
const conceptLabels = () =>
  new Map<string, string>(
    concepts.map((k) => [k, i18n.t(\`culturesConceptsCults.\${k}\`)])
  )
const cultLabels = () => {
  const cultTranslations: [string, string][] = cults.map((k) => [k, i18n.t(\`culturesConceptsCults.\${k}\`)])
  const clanTranslations: [string, string][] = clans.map((k) => [k, i18n.t(\`clans.\${k}\`)])
  const allTranslations = [...cultTranslations, ...clanTranslations]
  return new Map<string, string>(allTranslations)
}

`
replaceOnce(labelsBlock, '', 'unused label helpers')

replaceOnce(
  `  if (!characterExists(newName)) {
    npcGeneratorMode.value = false
    charactersGalleryMode.value = false
    nameGeneratorMode.value = false
    store.$reset()
`,
  `  if (!characterExists(newName)) {
    setUtilityMode(null)
    isSharedView.value = false
    store.$reset()
`,
  'new character state reset'
)

const oldModes = `const characterExists = browserStorage.characterIsStored

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
`

const newModes = `const characterExists = browserStorage.characterIsStored

type UtilityMode = 'characters' | 'npc' | 'name' | null
const utilityMode = ref<UtilityMode>(null)
const charactersGalleryMode = computed(() => utilityMode.value === 'characters')
const npcGeneratorMode = computed(() => utilityMode.value === 'npc')
const nameGeneratorMode = computed(() => utilityMode.value === 'name')
const npcTab = ref('detailed')

const setUtilityMode = (mode: UtilityMode) => {
  utilityMode.value = mode
}

;(window as any).__charactersGalleryMode = charactersGalleryMode
;(window as any).__npcGeneratorMode = npcGeneratorMode
;(window as any).__nameGeneratorMode = nameGeneratorMode

const openNpcGenerator = () => {
  setUtilityMode('npc')
  showNavigationDrawer.value = !mobile.value
}

const openNameGenerator = () => {
  setUtilityMode('name')
  showNavigationDrawer.value = !mobile.value
}

const openCharactersGallery = () => {
  setUtilityMode('characters')
  showNavigationDrawer.value = !mobile.value
}

const loadCharacterFromGallery = (characterName: string) => {
  const character = browserStorage.loadCharacter(characterName)
  if (character) {
    isSharedView.value = false
    store.loadCharacter(character)
    setUtilityMode(null)
  }
  showNavigationDrawer.value = !mobile.value
}
`
replaceOnce(oldModes, newModes, 'utility mode consolidation')

replaceOnce(
  `      if (parsed && parsed.storageVersion == 'v1') {
        store.loadCharacter(parsed)
        importForm.value?.reset()
`,
  `      if (parsed && parsed.storageVersion === 'v1') {
        setUtilityMode(null)
        isSharedView.value = false
        store.loadCharacter(parsed)
        importForm.value?.reset()
        showNavigationDrawer.value = !mobile.value
`,
  'imported character state reset'
)

replaceOnce(
  `        const local = browserStorage.loadCharacter(parsed.name)
        if (local) store.loadCharacter(local)
        ownCharSnackbar.value = true
`,
  `        const local = browserStorage.loadCharacter(parsed.name)
        if (local) {
          isSharedView.value = false
          store.loadCharacter(local)
        }
        ownCharSnackbar.value = true
`,
  'local shared-link handling'
)

for (const token of ['timelineMode', 'openTimeline', 'TimelineTab']) {
  if (text.includes(token)) throw new Error(`Embedded timeline reference remains: ${token}`)
}

fs.writeFileSync(appPath, text)

<template>
  <v-toolbar class="pa-4 bg-grey-lighten-2 elevation-2" density="compact">
    <template v-slot:append>
      <v-btn @click="downloadCharacter" stacked
        >{{ $t('messages.exportCharacter') }}
        <v-icon :icon="mdiExport" />
      </v-btn>
      <v-btn v-if="characterExists(store.characterName)" stacked>
        {{ $t('messages.deleteCharacter') }}
        <v-icon :icon="mdiDelete" />
        <v-dialog v-model="deletionDialogOpen" activator="parent" width="auto">
          <v-card>
            <v-card-text>
              {{ $t('messages.confirmCharacterDeletion', { name: store.characterName }) }}
            </v-card-text>
            <v-card-actions>
              <v-btn @click="deletionDialogOpen = !deletionDialogOpen">
                {{ $t('messages.cancel') }}
              </v-btn>
              <v-btn color="red" @click="deleteCharacter(store.characterName)">
                {{ $t('messages.deleteCharacter') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </template>
  </v-toolbar>
  <div>
    <v-sheet>
      <v-container class="px-8 pt-8 ma-0" fluid>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <v-container fluid class="ma-0 pa-0">
                  <v-row>
                    <v-col cols="12" md="6" lg="5" xl="5">
                      <div class="text-h4">
                        <v-container class="pa-0">
                          <v-row>
                            <v-col id="name" class="d-flex align-center">
                              <span>{{ store.characterName }}</span
                              ><v-icon
                                role="button"
                                :icon="mdiPencil"
                                size="x-small"
                                class="text-grey-darken-1 ml-1 name-edit-button"
                                @click="newName = store.characterName; createRenamedCopy = false"
                              ></v-icon>
                              <v-dialog v-model="renameDialogOpen" activator="#name" width="auto">
                                <v-card>
                                  <v-card-text>
                                    {{
                                      $t('messages.renameCharacter', {
                                        name: store.characterName
                                      })
                                    }}
                                  </v-card-text>
                                  <v-card-text>
                                    <v-form>
                                      <v-text-field class="my-0" v-model="newName"></v-text-field>
                                      <v-checkbox class="my-0" v-model="createRenamedCopy" :label="$t('messages.createRenamedCopy')" />
                                    </v-form>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-btn @click="renameDialogOpen = !renameDialogOpen">
                                      {{ $t('messages.cancel') }}
                                    </v-btn>
                                    <v-btn color="red" @click="renameCharacter" :disabled="newName.trim().length == 0 || newName == store.characterName">
                                      {{ $t('messages.rename') }}
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="6" sm="2">
                              <v-text-field
                                v-model="store.age"
                                :label="$t('messages.age')"
                                variant="underlined"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6" sm="2">
                              <v-text-field
                                v-model="store.gender"
                                :label="$t('messages.gender')"
                                variant="underlined"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6" sm="2">
                              <v-text-field
                                v-model="store.height"
                                :label="$t('messages.height')"
                                variant="underlined"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6" sm="2">
                              <v-text-field
                                v-model="store.weight"
                                :label="$t('messages.weight')"
                                variant="underlined"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6" sm="2">
                              <v-text-field
                                v-model="store.experience"
                                :label="$t('messages.experience')"
                                variant="underlined"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6" sm="2">
                              <v-text-field
                                :model-value="store.computedDinars ? `${store.computedDinars.value} ${store.computedDinars.currency}` : ''"
                                :label="$t('messages.dinars')"
                                variant="underlined"
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6" lg="4" xl="3" class="d-flex flex-column align-center justify-center">
                      <div class="text-center">
                        <img
                          v-if="store.portrait"
                          :src="store.portrait"
                          style="width: 260px; height: 260px; object-fit: cover; border: 1px solid #888; cursor: pointer;"
                          @click="triggerPortraitUpload"
                        />
                        <div
                          v-else
                          @click="triggerPortraitUpload"
                          style="width: 260px; height: 260px; border: 2px dashed #888; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #888;"
                        >
                          Portrait
                        </div>
                        <input
                          ref="portraitInput"
                          type="file"
                          accept="image/*"
                          style="display: none;"
                          @change="onPortraitChange"
                        />
                        <div class="mt-2">
                          <v-btn size="small" @click="triggerPortraitUpload">Choisir</v-btn>
                          <v-btn v-if="store.portrait" size="small" class="ml-2" @click="store.portrait = ''">Supprimer</v-btn>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="4" md="4" lg="3" xl="2">
                      <EditorArchetypeSelector
                        type="culture"
                        :typeLabel="$t(`messages.culture`)"
                        :label="$t(`culturesConceptsCults.${store.culture.name}`)"
                        :description="$t(`culturesConceptsCults.${store.culture.name + 'Description'}`)"
                        :value="store.culture"
                        :items="cultures"
                        :labels="cultureLabels()"
                        :descriptions="cultureDescriptions()"
                        @change="store.setCulture"
                      ></EditorArchetypeSelector>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" lg="3" xl="2">
                      <EditorArchetypeSelector
                        type="concept"
                        :typeLabel="$t(`messages.concept`)"
                        :label="$t(`culturesConceptsCults.${store.concept.name}`)"
                        :description="$t(`culturesConceptsCults.${store.concept.name + 'Description'}`)"
                        :value="store.concept"
                        :items="concepts"
                        :labels="conceptLabels()"
                        :descriptions="conceptDescriptions()"
                        @change="store.setConcept"
                      ></EditorArchetypeSelector>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" lg="3" xl="2">
                      <EditorArchetypeSelector
                        type="cult"
                        :typeLabel="$t(`messages.cult`)"
                        :label="$t(`culturesConceptsCults.${store.cult.name}`)"
                        :description="$t(`culturesConceptsCults.${store.cult.name + 'Description'}`)"
                        :value="store.cult"
                        :items="cults"
                        :labels="cultLabels()"
                        :descriptions="cultDescriptions()"
                        @change="store.setCult"
                      ></EditorArchetypeSelector>
                    </v-col>
                    <v-col v-if="store.clan" cols="12" sm="4" md="4" lg="3" xl="2">
                      <EditorArchetypeSelector
                        type="clan"
                        :typeLabel="$t(`messages.clan`)"
                        :label="$t(`clans.${store.clan.name}`)"
                        :description="$t(`clans.${store.clan.name}Description`)"
                        :value="store.clan"
                        :items="clans"
                        :labels="clanLabels()"
                        :descriptions="clanDescriptions()"
                        @change="store.setClan"
                      ></EditorArchetypeSelector>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-divider></v-divider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pb-0">
                      <div class="text-subtitle-2">{{ $t('messages.buildPoints') }}</div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="4" lg="3" xl="2">
                      <PointMeter
                        :active="store.editorMode != EditorMode.Free"
                        :title="$t('messages.attributePoints')"
                        :value="store.spentPoints.attributes"
                        :max="availablePoints.attributes"
                      ></PointMeter>
                    </v-col>
                    <v-col cols="12" sm="4" lg="3" xl="2">
                      <PointMeter
                        :active="store.editorMode != EditorMode.Free"
                        :title="$t('messages.skillPoints')"
                        :value="store.spentPoints.skills"
                        :max="availablePoints.skills"
                      ></PointMeter>
                    </v-col>
                    <v-col cols="12" sm="4" lg="3" xl="2">
                      <PointMeter
                        :active="store.editorMode != EditorMode.Free"
                        :title="$t('messages.originPoints')"
                        :value="store.spentPoints.origins"
                        :max="availablePoints.origins"
                      ></PointMeter>
                    </v-col>
                    <v-col cols="12" sm="4" lg="3" xl="2">
                      <PointMeter
                        :active="store.editorMode != EditorMode.Free"
                        :title="$t('messages.potentialPoints')"
                        :value="store.spentPoints.potentials"
                        :max="availablePoints.potentials"
                      ></PointMeter>
                    </v-col>
                    <v-col cols="12" sm="4" lg="3" xl="2">
                      <PointMeter
                        :active="store.editorMode != EditorMode.Free"
                        :title="$t('messages.legaciesPoints')"
                        :value="store.spentPoints.legacies"
                        :max="availablePoints.legacies"
                      ></PointMeter>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  variant="text"
                  :prepend-icon="showBuildOptions ? mdiChevronUp : mdiChevronDown"
                  :append-icon="mdiCogOutline"
                  @click="showBuildOptions = !showBuildOptions"
                  >{{ $t('messages.buildOptions') }}</v-btn
                >
              </v-card-actions>
              <v-expand-transition>
                <div v-show="showBuildOptions">
                  <v-divider></v-divider>

                  <v-card-text class="bg-grey-lighten-4">
                    <v-row>
                      <v-col cols="12">
                        <BuildOptions />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-container class="px-8" fluid>
      <v-row>
        <v-col sm="6" md="4" cols="12" v-for="attr in attributes" v-bind:key="attr.name">
          <v-card class="pa-4">
            <AttributeAndSkillSelector :attribute="attr"></AttributeAndSkillSelector>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="6" md="4" cols="12">
          <v-card class="pa-4">
            <OriginSelector></OriginSelector>
          </v-card>
        </v-col>
        <v-col sm="6" md="5" cols="12">
          <v-card class="pa-4">
            <StatusMonitors></StatusMonitors>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="pa-4">
            <RankSelector></RankSelector>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="pa-4">
            <PotentialSelector></PotentialSelector>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="pa-4">
            <LegacySelector></LegacySelector>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import AttributeAndSkillSelector from '@/components/AttributeAndSkillSelector.vue'
import BuildOptions from '@/components/BuildOptions.vue'
import OriginSelector from '@/components/OriginSelector.vue'
import PointMeter from '@/components/PointMeter.vue'
import PotentialSelector from '@/components/PotentialSelector.vue'
import LegacySelector from '@/components/LegacySelector.vue'
import RankSelector from '@/components/RankSelector.vue'
import StatusMonitors from '@/components/StatusMonitors.vue'
import config from '@/config'
import type { Clan } from '@/config/model'
import { Concept, Cult, Culture } from '@/config/model'
import { EditorMode } from '@/config/modes'
import { useCharacterStore } from '@/store'
import { useApplicationStore } from '@/store/application'
import browserStorage from '@/store/browserStorage'
import romanize from '@/util/romanize'
import {
mdiChevronDown,
mdiChevronUp,
mdiCogOutline,
mdiDelete,
mdiExport,
mdiPencil
} from '@mdi/js'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'
import EditorArchetypeSelector from './EditorArchetypeSelector.vue'

const store = useCharacterStore()
const appStore = useApplicationStore()
const i18n = useI18n()

const portraitInput = ref<HTMLInputElement | null>(null)
const triggerPortraitUpload = () => portraitInput.value?.click()
const onPortraitChange = (ev: Event) => {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const MAX = 400
    let w = img.width
    let h = img.height
    if (w > MAX || h > MAX) {
      const s = Math.min(MAX / w, MAX / h)
      w = Math.round(w * s)
      h = Math.round(h * s)
    }
    canvas.width = w
    canvas.height = h
    canvas.getContext('2d')?.drawImage(img, 0, 0, w, h)
    store.portrait = canvas.toDataURL('image/png')
  }
  img.src = URL.createObjectURL(file)
  input.value = ''
}

const { attributes, availablePoints } = config

const cultures = ([] as Culture[]).concat(...config.culturesByName.values())
const concepts = ([] as Concept[]).concat(...config.conceptsByName.values())
const cults = ([] as Cult[]).concat(...config.cultsByName.values())
const clans = ([] as Clan[]).concat(...config.clansByName.values())

const cultureLabels = () =>
  new Map<Culture, string>(cultures.map((k) => [k, i18n.t(`culturesConceptsCults.${k.name}`)]))
const cultureDescriptions = () =>
  new Map<Culture, string>(cultures.map((k) => [k, i18n.t(`culturesConceptsCults.${k.name}Description`)]))
const conceptLabels = () =>
  new Map<Concept, string>(
    concepts.map((k, idx) => [k, `${romanize(idx)}. ${i18n.t(`culturesConceptsCults.${k.name}`)}`])
  )
const conceptDescriptions = () =>
  new Map<Concept, string>(
    concepts.map((k) => [k, i18n.t(`culturesConceptsCults.${k.name}Description`)])
  )
const cultLabels = () =>
  new Map<Cult, string>(cults.map((k) => [k, i18n.t(`culturesConceptsCults.${k.name}`)]))
const cultDescriptions = () =>
  new Map<Cult, string>(cults.map((k) => [k, i18n.t(`culturesConceptsCults.${k.name}Description`)]))
const clanLabels = () => new Map<Clan, string>(clans.map((k) => [k, i18n.t(`clans.${k.name}`)]))
const clanDescriptions = () => new Map<Clan, string>(clans.map((k) => [k, i18n.t(`clans.${k.name}Description`)]))

const characterExists = browserStorage.characterIsStored

const loadCharacter = (characterName: string) => {
  const character = browserStorage.loadCharacter(characterName)
  if (character) {
    store.loadCharacter(character)
  }
  // close the navigation in case we're on a mobile breakpoint
  showNavigationDrawer.value = !mobile.value
}

const deletionDialogOpen = ref(false)

const deleteCharacter = (name: string) => {
  browserStorage.deleteCharacter(name)
  if (name == store.characterName) {
    store.$reset()
  }
  deletionDialogOpen.value = false
  appStore.refresh()
  if (appStore.storedCharacters.size > 0) {
    loadCharacter(appStore.getStoredCharacters[0].name)
  }
}

const createDownload = (filename: string, text: string) => {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

const downloadCharacter = () => {
  createDownload('character.json', JSON.stringify(store.asCharacter))
}

const { mobile } = useDisplay()
const showNavigationDrawer = ref(!mobile.value)

const showBuildOptions = ref(false)

const newName = ref('')
const createRenamedCopy = ref(false)
const renameDialogOpen = ref(false)
const renameCharacter = () => {
  const oldName = store.characterName
  const nameCandidate = newName.value.trim()
  if (nameCandidate.length > 0 && (!characterExists(nameCandidate) || nameCandidate == oldName)) {
    store.setCharacterName(nameCandidate)
    if (!createRenamedCopy.value) {
      browserStorage.deleteCharacter(oldName)
    }
    renameDialogOpen.value = false
  }
}
</script>
<style scoped>
#appBarIcon {
  height: 2em;
}

a {
  color: #616161;
}

.show {
  opacity: 1;
  transition: opacity 0.5s;
}

.hide {
  opacity: 0;
  max-height: 0;
}

.name-edit-button {
  opacity: 0;
}

#name:hover .name-edit-button {
  opacity: 1;
}
</style>

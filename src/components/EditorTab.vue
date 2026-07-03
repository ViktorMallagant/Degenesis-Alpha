<template>
  <v-toolbar class="pa-4 bg-grey-lighten-2 elevation-2" density="compact">
    <template v-slot:append>
      <!-- Music player -->
      <v-tooltip :text="'There Is No Other - Tobias Lilja'" location="bottom">
        <template v-slot:activator="{ props: tooltipProps }">
          <div v-bind="tooltipProps" class="music-player d-flex align-center mr-2" style="gap: 8px;">
            <v-btn
              @click="musicPlayer.toggle()"
              stacked
              :color="musicPlayer.isPlaying.value ? 'red-darken-1' : undefined"
              style="min-width: 110px;"
            >
              {{ $t('messages.music') }} : {{ musicPlayer.isPlaying.value ? 'ON' : 'OFF' }}
              <v-icon :icon="musicPlayer.isPlaying.value ? mdiVolumeHigh : mdiVolumeOff" />
            </v-btn>
            <v-slider
              v-if="musicPlayer.isPlaying.value"
              :model-value="musicPlayer.volume.value"
              @update:model-value="musicPlayer.setVolume"
              min="0"
              max="0.3"
              step="0.005"
              style="width: 80px; min-width: 80px;"
              hide-details
              density="compact"
              color="red-darken-1"
            ></v-slider>
          </div>
        </template>
      </v-tooltip>
      <v-divider vertical class="mr-2 ml-1"></v-divider>
      <v-btn @click="downloadCharacter" stacked v-if="!isSharedView && currentTab === 'sheet'"
        >{{ $t('messages.exportCharacter') }}
        <v-icon :icon="mdiExport" />
      </v-btn>
      <v-btn @click="shareCharacter" stacked color="blue-darken-1">
        {{ $t('messages.shareCharacter') }}
        <v-icon :icon="mdiShareVariant" />
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
  <!-- Shared view banner -->
  <v-alert
    v-if="isSharedView"
    type="info"
    variant="tonal"
    class="mx-4 mt-4"
    title="Read-only file."
    text="This file is shared in read-only mode. Editing is disabled."
    closable
  ></v-alert>
  <v-alert
    v-if="isSharedView && sharedViewViolations.length > 0"
    type="warning"
    variant="tonal"
    class="mx-4 mt-2"
    title="Anomalies détectées"
  >
    <ul class="mt-1" style="padding-left:16px">
      <li v-for="v in sharedViewViolations" :key="v">{{ v }}</li>
    </ul>
  </v-alert>

  <!-- Snackbar: URL copiée -->
  <v-snackbar v-model="shareCopied" timeout="3000" color="green-darken-2">
    Lien copié dans le presse-papier !
  </v-snackbar>

  <div :style="isSharedView ? 'pointer-events: none; user-select: none' : ''">
    <v-sheet>
      <v-container class="px-8 pt-8 ma-0" fluid>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <v-container fluid class="ma-0 pa-0">
                  <div style="display: flex; gap: 0; align-items: stretch;">
                    <!-- Left side: info + cult selectors -->
                    <div style="flex: 1; min-width: 0;">
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
                              <v-tooltip
                                :text="$t('messages.lcNegativeTooltip')"
                                :disabled="store.remainingLC >= 0"
                                location="bottom"
                              >
                                <template v-slot:activator="{ props }">
                                  <v-text-field
                                    v-if="store.editorMode === 'free'"
                                    v-bind="props"
                                    :model-value="store.remainingLC"
                                    :label="$t('messages.dinars')"
                                    variant="underlined"
                                    type="number"
                                    :error="store.remainingLC < 0"
@update:model-value="val => { const bonus = store.hasLandlord ? 1000 : 0; store.setManualLC(val === '' || val === null ? null : Number(val) - bonus + store.spentLC) }"
                                  ></v-text-field>
                                  <v-text-field
                                    v-else
                                    v-bind="props"
                                    :model-value="store.computedDinars ? `${store.remainingLC} ${store.computedDinars.currency}` : ''"
                                    :label="$t('messages.dinars')"
                                    variant="underlined"
                                    :error="store.remainingLC < 0"
                                    readonly
                                  ></v-text-field>
                                </template>
                              </v-tooltip>
                            </v-col>
                          </v-row>
                        </v-container>
                      </div>
                      <v-row class="mt-2">
                        <v-col cols="12" :sm="store.clan ? '3' : '4'">
                          <template v-if="store.cultureSelected">
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
                          </template>
                          <template v-else>
                            <v-card class="ma-0 px-4 pt-5 ccc-placeholder" @click="showCultureDialog = true">
                              <div class="ccc-placeholder-inner">
                                <span class="ccc-placeholder-type">{{ $t('messages.culture') }}</span>
                                <v-icon size="32" color="grey-darken-1" :icon="mdiHelpCircleOutline"></v-icon>
                                <span class="ccc-placeholder-btn">{{ $t('messages.chooseCulture') }}</span>
                              </div>
                            </v-card>
                            <v-dialog v-model="showCultureDialog" width="auto">
                              <v-card>
                                <v-card-text>
                                  <CCCSelector
                                    type="culture"
                                    :title="$t('messages.culture')"
                                    :items="cultures"
                                    :labels="cultureLabels()"
                                    :descriptions="cultureDescriptions()"
                                    :value="store.culture"
                                    @change="(c) => { store.setCulture(c as any); showCultureDialog = false }"
                                  />
                                </v-card-text>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-col>
                        <v-col cols="12" :sm="store.clan ? '3' : '4'">
                          <template v-if="store.conceptSelected">
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
                          </template>
                          <template v-else>
                            <v-card class="ma-0 px-4 pt-5 ccc-placeholder" @click="showConceptDialog = true">
                              <div class="ccc-placeholder-inner">
                                <span class="ccc-placeholder-type">{{ $t('messages.concept') }}</span>
                                <v-icon size="32" color="grey-darken-1" :icon="mdiHelpCircleOutline"></v-icon>
                                <span class="ccc-placeholder-btn">{{ $t('messages.chooseConcept') }}</span>
                              </div>
                            </v-card>
                            <v-dialog v-model="showConceptDialog" width="auto">
                              <v-card>
                                <v-card-text>
                                  <CCCSelector
                                    type="concept"
                                    :title="$t('messages.concept')"
                                    :items="concepts"
                                    :labels="conceptLabels()"
                                    :descriptions="conceptDescriptions()"
                                    :value="store.concept"
                                    @change="(c) => { store.setConcept(c as any); showConceptDialog = false }"
                                  />
                                </v-card-text>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-col>
                        <v-col cols="12" :sm="store.clan ? '3' : '4'">
                          <template v-if="store.cultSelected">
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
                          </template>
                          <template v-else>
                            <v-card class="ma-0 px-4 pt-5 ccc-placeholder" @click="showCultDialog = true">
                              <div class="ccc-placeholder-inner">
                                <span class="ccc-placeholder-type">{{ $t('messages.cult') }}</span>
                                <v-icon size="32" color="grey-darken-1" :icon="mdiHelpCircleOutline"></v-icon>
                                <span class="ccc-placeholder-btn">{{ $t('messages.chooseCult') }}</span>
                              </div>
                            </v-card>
                            <v-dialog v-model="showCultDialog" width="auto">
                              <v-card>
                                <v-card-text>
                                  <CCCSelector
                                    type="cult"
                                    :title="$t('messages.cult')"
                                    :items="cults"
                                    :labels="cultLabels()"
                                    :descriptions="cultDescriptions()"
                                    :value="store.cult"
                                    @change="(c) => { store.setCult(c as any); showCultDialog = false }"
                                  />
                                </v-card-text>
                              </v-card>
                            </v-dialog>
                          </template>
                          <div v-if="store.sidewinderOldCult" class="text-caption inv-muted mt-1" style="font-size:11px;color:#aaa">
                            Ancien Culte : {{ $t(`culturesConceptsCults.${store.sidewinderOldCult.name}`) }}
                          </div>
                        </v-col>
                        <v-col v-if="store.clan" cols="12" sm="3">
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
                    </div>
                    <!-- Right side: portrait spanning full height -->
                    <div style="flex: 0 0 40%; display: flex; flex-direction: column; gap: 8px;">
                      <div style="position: relative; flex: 1; min-height: 200px; overflow: hidden;">
                        <img
                          v-if="store.portrait"
                          :src="store.portraitFiche || store.portraitOriginal || store.portrait"
                          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; cursor: pointer;"
                          @click="triggerPortraitUpload"
                        />
                        <div
                          v-else
                          @click="triggerPortraitUpload"
                          style="width: 100%; height: 100%; min-height: 200px; border: 2px dashed #888; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #888;"
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
                      </div>
                      <div style="display: flex; justify-content: center; gap: 8px; pointer-events: auto">
                        <v-btn v-if="!store.portrait" size="small" @click="triggerPortraitUpload">Choose</v-btn>
                        <v-btn v-if="store.portrait && !isSharedView" size="small" @click="openCropExisting">
                          <v-icon size="14" class="mr-1" :icon="mdiCrop"></v-icon>{{ $t('messages.editPortrait') }}
                        </v-btn>
                        <v-btn v-if="store.portrait" size="small" @click="downloadPortrait">{{ $t('messages.downloadPortrait') }}</v-btn>
                        <v-btn v-if="store.portrait && !isSharedView" size="small" @click="store.portrait = ''; store.portraitOriginal = ''; store.portraitFiche = ''">{{ $t('messages.deletePortrait') }}</v-btn>
                      </div>
                      <ImageCropperDialog
                        v-model="showCropDialog"
                        :src="cropSrc"
                        @crop="onCropConfirm"
                      />
                    </div>
                  </div>
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
                        :value="store.spentPoints.attributes + store.legacyChoiceAttributeTotalBonus"
                        :max="availablePoints.attributes + store.legacyXPAttributeBonus + store.legacyChoiceAttributeTotalBonus + store.legacyOffspringAttributePenalty"
                      ></PointMeter>
                    </v-col>
                    <v-col cols="12" sm="4" lg="3" xl="2">
                      <PointMeter
                        :active="store.editorMode != EditorMode.Free"
                        :title="$t('messages.skillPoints')"
                        :value="store.spentPoints.skills"
                        :max="availablePoints.skills + store.legacyXPSkillBonus"
                      ></PointMeter>
                    </v-col>
                    <v-col cols="12" sm="4" lg="3" xl="2">
                      <PointMeter
                        :active="store.editorMode != EditorMode.Free"
                        :title="$t('messages.originPoints')"
                        :value="store.spentPoints.origins"
                        :max="store.originBudget"
                      ></PointMeter>
                    </v-col>
                    <v-col cols="12" sm="4" lg="3" xl="2">
                      <PointMeter
                        :active="store.editorMode != EditorMode.Free"
                        :title="$t('messages.potentialPoints')"
                        :value="store.spentPoints.potentials"
                        :max="availablePoints.potentials + store.legacyXPPotentialBonus"
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

                  <v-card-text class="bg-surface-variant">
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
        <v-col cols="12" md="8" lg="6">
          <MentalDilemmaSelector />
        </v-col>
      </v-row>
      <v-row id="skills-section">
        <v-col sm="6" md="4" cols="12" v-for="attr in attributes" v-bind:key="attr.name">
          <v-card class="pa-4">
            <AttributeAndSkillSelector :attribute="attr"></AttributeAndSkillSelector>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="pb-0">
          <v-tooltip max-width="420" location="bottom">
            <template #activator="{ props }">
              <span v-bind="props" class="xp-cost-title">
                XP COST OF UPGRADES
                <span v-if="store.mentalPowerChoice" class="xp-cost-star">*</span>
              </span>
            </template>
            <div class="xp-tooltip-content">
              <p>Each increase costs XP equal to the <strong>new value × a factor</strong> based on the type:</p>
              <table class="xp-table">
                <tr>
                  <td>Non-preferred Attribute</td>
                  <td :class="(store.hasCreatureOfHabit || store.hasPrimordial || store.nonPrivAttrMultiplierReduction > 0) ? 'xp-modified' : ''">
                    × {{ ((store.hasCreatureOfHabit || store.hasPrimordial) ? 14 : 12) - store.nonPrivAttrMultiplierReduction }} XP
                    <span v-if="store.hasCreatureOfHabit || store.hasPrimordial" class="xp-badge xp-badge-up">+2</span>
                    <span v-if="store.nonPrivAttrMultiplierReduction > 0" class="xp-badge xp-badge-down">-{{ store.nonPrivAttrMultiplierReduction }}</span>
                  </td>
                </tr>
                <tr>
                  <td>Preferred Attribute <span class="xp-star">*</span></td>
                  <td :class="(store.hasCreatureOfHabit || store.hasPrimordial) ? 'xp-modified-down' : ''">
                    × {{ (store.hasCreatureOfHabit || store.hasPrimordial) ? '8' : '10' }} XP
                    <span v-if="store.hasCreatureOfHabit || store.hasPrimordial" class="xp-badge xp-badge-down">-2</span>
                  </td>
                </tr>
                <tr>
                  <td>Non-preferred Skill</td>
                  <td :class="(store.hasCreatureOfHabit || store.hasPrimordial || store.nonPrivSkillMultiplierReduction > 0) ? 'xp-modified' : ''">
                    × {{ ((store.hasCreatureOfHabit || store.hasPrimordial) ? 6 : 5) - store.nonPrivSkillMultiplierReduction }} XP
                    <span v-if="store.hasCreatureOfHabit || store.hasPrimordial" class="xp-badge xp-badge-up">+1</span>
                    <span v-if="store.nonPrivSkillMultiplierReduction > 0" class="xp-badge xp-badge-down">-{{ store.nonPrivSkillMultiplierReduction }}</span>
                  </td>
                </tr>
                <tr>
                  <td>Preferred Skill <span class="xp-star">*</span></td>
                  <td :class="(store.hasCreatureOfHabit || store.hasPrimordial) ? 'xp-modified-down' : ''">
                    × {{ (store.hasCreatureOfHabit || store.hasPrimordial) ? '3' : '4' }} XP
                    <span v-if="store.hasCreatureOfHabit || store.hasPrimordial" class="xp-badge xp-badge-down">-1</span>
                  </td>
                </tr>
              </table>
              <p v-if="store.hasCreatureOfHabit || store.hasPrimordial" class="xp-legacy-note">
                ✦ Héritage <strong>{{ store.hasCreatureOfHabit ? 'Routinier' : 'Impulsif' }}</strong> :
                coût réduit pour les {{ store.hasCreatureOfHabit ? 'attributs/compétences Concentration' : 'attributs/compétences Pulsions' }},
                augmenté pour les autres.
              </p>
              <p v-if="store.adaptabilityLevel > 0" class="xp-legacy-note">
                ✦ Potentiel <strong>Adaptabilité</strong> niv. {{ store.adaptabilityLevel }} :
                compétences non-préférées −{{ store.nonPrivSkillMultiplierReduction }}
                <span v-if="store.nonPrivAttrMultiplierReduction > 0">, attributs non-préférés −{{ store.nonPrivAttrMultiplierReduction }}</span>.
              </p>
              <p v-if="store.mentalPowerChoice" class="xp-preferred-note">
                <span class="xp-star">*</span> Préférés pour
                <strong>{{ store.mentalPowerChoice === 'primal' ? 'Pulsions' : 'Concentration' }}</strong> :
                {{ store.mentalPowerChoice === 'primal' ? 'PHY, CHA, INS et leurs compétences' : 'INT, AGI, PSY et leurs compétences' }}
              </p>
              <p v-else class="xp-preferred-note">
                <span class="xp-star">*</span> Choose Primal or Focus to view your preferred attributes and skills.
              </p>
            </div>
          </v-tooltip>
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
        <v-col cols="12" v-if="store.allModifiers.length > 0 || store.entrepreneurSocialPenalties.length > 0">
          <v-card class="pa-4">
            <v-card-title class="text-uppercase text-caption font-weight-bold">
              Modificateurs
            </v-card-title>
            <v-list density="compact">
              <v-list-item
                v-for="(mod, i) in store.allModifiers"
                :key="i"
                :subtitle="mod"
                class="modifier-item"
              ></v-list-item>
              <v-list-item
                v-for="({ cultKey, count }) in store.entrepreneurSocialPenalties"
                :key="'entr-' + cultKey"
                :subtitle="$t('messages.entrepreneurPenalty', { count, cult: $t('culturesConceptsCults.' + cultKey), plural: pluralSuffix(count) })"
                class="modifier-item"
              ></v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  <v-snackbar
    :model-value="!!store.errorMessage"
    @update:model-value="store.errorMessage = null"
    color="red-darken-3"
    :timeout="3500"
    location="bottom"
  >
    {{ store.errorMessage }}
  </v-snackbar>

  <!-- Bouton fixe Doué -->
  <v-btn
    v-if="store.hasGifted && store.giftedRemaining > 0"
    class="gifted-cancel-btn"
    color="red-darken-2"
    variant="flat"
    size="large"
    :prepend-icon="mdiClose"
    @click="store.setLegacy(giftedLegacy!, 0)"
  >
    Annuler l'Allocation
    <span class="gifted-cancel-counter">({{ store.giftedRemaining }}/6 restants)</span>
  </v-btn>
  </div>
</template>

<script setup lang="ts">
import AttributeAndSkillSelector from '@/components/AttributeAndSkillSelector.vue'
import MentalDilemmaSelector from '@/components/MentalDilemmaSelector.vue'
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
mdiClose,
mdiDelete,
mdiExport,
mdiPencil,
mdiCrop,
mdiShareVariant,
mdiVolumeHigh,
mdiVolumeOff,
mdiHelpCircleOutline
} from '@mdi/js'
import { useMusicPlayer } from '@/composables/useMusicPlayer'
import { ref, computed, inject } from 'vue'
import type { Ref } from 'vue'
import { AllLegacies } from '@/config/legacies'
import { useI18n } from 'vue-i18n'
import { encodeCharacter } from '@/util/share'
import { useDisplay } from 'vuetify'
import EditorArchetypeSelector from './EditorArchetypeSelector.vue'
import CCCSelector from './CCCSelector.vue'
import ImageCropperDialog from './ImageCropperDialog.vue'

const store = useCharacterStore()
const appStore = useApplicationStore()
const i18n = useI18n()
const isSharedView = inject<Ref<boolean>>('isSharedView', ref(false))
const currentTab = inject<Ref<string>>('currentTab', ref(''))
const musicPlayer = useMusicPlayer()

const pluralSuffix = (count: number): string => {
  if (count <= 1) return ''
  return i18n.locale.value === 'de' ? 'en' : 's'
}

const shareCopied = ref(false)
const shareCharacter = async () => {
  const base = window.location.origin + window.location.pathname
  let url: string

  try {
    // bytebin.lucko.me : API publique conçue pour les web apps, CORS natif, clé dans le body
    const res = await fetch('https://bytebin.lucko.me/post', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(store.asCharacter),
    })
    if (!res.ok) throw new Error(`bytebin status ${res.status}`)
    const { key } = await res.json()
    if (!key) throw new Error('no key returned')
    url = `${base}#bb=${key}`
  } catch (e) {
    console.warn('Share upload failed:', e)
    const encoded = await encodeCharacter(store.asCharacter)
    url = `${base}#view=${encoded}`
  }

  try {
    await navigator.clipboard.writeText(url)
  } catch {
    window.open(url, '_blank')
  }
  shareCopied.value = true
}

const sharedViewViolations = computed((): string[] => {
  if (!isSharedView.value) return []
  if (store.editorMode === EditorMode.Free) return []
  const t = i18n.t.bind(i18n)
  const violations: string[] = []

  // Attribute point total
  const attrSpent = store.spentPoints.attributes + store.legacyChoiceAttributeTotalBonus
  const attrMax = availablePoints.attributes + store.legacyXPAttributeBonus + store.legacyChoiceAttributeTotalBonus + store.legacyOffspringAttributePenalty
  if (attrSpent > attrMax) {
    violations.push(`Points d'attributs : ${attrSpent} dépensés pour ${attrMax} disponibles`)
  }

  // Each attribute individually
  for (const attr of config.attributes) {
    const val = store.attributeValue(attr)
    const max = store.attributeMax(attr)
    if (val > max) {
      violations.push(`${t(`attributes.${attr.name}`)} : valeur ${val} dépasse le max ${max}`)
    }
  }

  // Skill point total
  const skillSpent = store.spentPoints.skills
  const skillMax = availablePoints.skills + store.legacyXPSkillBonus
  if (skillSpent > skillMax) {
    violations.push(`Points de compétences : ${skillSpent} dépensés pour ${skillMax} disponibles`)
  }

  // Legacies taken without eligibility
  store.legacies.forEach((v, legacy) => {
    if (v > 0 && !store.eligibleLegacies.has(legacy)) {
      violations.push(`Héritage « ${legacy.name} » pris sans remplir les conditions`)
    }
  })

  // Potentials taken without eligibility
  store.potentials.forEach((v, potential) => {
    if (v > 0 && !store.eligiblePotentials.has(potential)) {
      violations.push(`Potentiel « ${t(`potentials.${potential.name}`)} » pris sans remplir les conditions`)
    }
  })

  return violations
})

const portraitInput = ref<HTMLInputElement | null>(null)
const showCropDialog = ref(false)
const cropSrc = ref('')

const triggerPortraitUpload = () => portraitInput.value?.click()

const downloadPortrait = () => {
  const a = document.createElement('a')
  a.href = store.portraitOriginal || store.portrait
  a.download = `${store.characterName || 'portrait'}.png`
  a.click()
}

function compressImage(src: string, maxPx: number, quality: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let w = img.width, h = img.height
      if (w > maxPx || h > maxPx) {
        const s = Math.min(maxPx / w, maxPx / h)
        w = Math.round(w * s); h = Math.round(h * s)
      }
      canvas.width = w; canvas.height = h
      canvas.getContext('2d')?.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.src = src
  })
}

const onPortraitChange = (ev: Event) => {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = async (e) => {
    const raw = (e.target?.result as string) ?? ''
    store.portraitFiche = ''
    // Compresse l'original à 1200px JPEG pour économiser le localStorage
    store.portraitOriginal = await compressImage(raw, 1200, 0.85)
    // Miniature 400px pour la galerie
    store.portrait = await compressImage(raw, 400, 0.82)
  }
  reader.readAsDataURL(file)
  input.value = ''
}

const openCropExisting = () => {
  // Toujours recadrer depuis l'original brut, jamais depuis un recadrage précédent
  cropSrc.value = store.portraitOriginal || store.portrait
  showCropDialog.value = true
}

const onCropConfirm = (croppedDataUrl: string) => {
  // portraitOriginal reste immuable — on écrit dans portraitFiche uniquement
  store.portraitFiche = croppedDataUrl
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

const giftedLegacy = computed(() => AllLegacies.find(l => l.name === 'gifted'))

const { mobile } = useDisplay()
const showNavigationDrawer = ref(!mobile.value)

const showBuildOptions = ref(false)
const showCultureDialog = ref(false)
const showConceptDialog = ref(false)
const showCultDialog = ref(false)

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
.xp-cost-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #bbb;
  cursor: help;
  border-bottom: 1px dotted #666;
  display: inline-block;
  text-transform: uppercase;
}
.xp-cost-star {
  color: #ef5350;
  font-weight: bold;
}
.xp-tooltip-content {
  font-size: 13px;
  line-height: 1.6;
}
.xp-table {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
}
.xp-table td {
  padding: 2px 8px;
}
.xp-table tr:nth-child(even) td {
  color: #bbb;
}
.xp-star {
  color: #ef5350;
  font-weight: bold;
}
.xp-preferred-note {
  margin-top: 8px;
  font-size: 12px;
  color: #ccc;
}
.xp-modified {
  color: #ef9a9a;
}
.xp-modified-down {
  color: #a5d6a7;
}
.xp-badge {
  font-size: 10px;
  font-weight: 700;
  margin-left: 4px;
  padding: 1px 4px;
  border-radius: 3px;
}
.xp-badge-up {
  background: rgba(239,83,80,0.25);
  color: #ef9a9a;
}
.xp-badge-down {
  background: rgba(76,175,80,0.2);
  color: #a5d6a7;
}
.xp-legacy-note {
  margin-top: 8px;
  font-size: 12px;
  color: #ffe082;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 6px;
}

.gifted-cancel-btn {
  position: fixed;
  bottom: 24px;
  left: 310px;
  z-index: 100;
  box-shadow: 0 4px 24px rgba(198,40,40,0.5);
}

.gifted-cancel-counter {
  margin-left: 6px;
  font-size: 0.8em;
  opacity: 0.85;
}

#appBarIcon {
  height: 2em;
}

.editor-lc-inline-input {
  font-size: 1rem;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.42);
  outline: none;
  width: 100%;
  padding: 4px 0;
  -moz-appearance: textfield;
}
.editor-lc-inline-input::-webkit-inner-spin-button,
.editor-lc-inline-input::-webkit-outer-spin-button { -webkit-appearance: none; }
.editor-lc-inline-input:focus {
  border-bottom: 2px solid rgb(var(--v-theme-primary));
}

a {
  color: #616161;
}

.ccc-placeholder {
  cursor: pointer;
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(var(--v-theme-on-surface), 0.2);
  transition: border-color 0.2s;
}
.ccc-placeholder:hover {
  border-color: rgba(var(--v-theme-primary), 0.5);
}
.ccc-placeholder-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 8px;
}
.ccc-placeholder-type {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), 0.45);
}
.ccc-placeholder-btn {
  font-size: 0.78rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
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

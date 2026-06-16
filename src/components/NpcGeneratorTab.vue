<template>
  <div class="npc-generator">
    <v-toolbar class="pa-4 bg-grey-lighten-2 elevation-2" density="compact">
      <template v-slot:append>
        <v-btn @click="generateNpc" stacked color="red-darken-2">
          {{ $t('messages.npcGenerator.generateButton') }}
          <v-icon :icon="mdiFileDocumentArrowRight" />
          <v-progress-circular
            v-if="isGenerating"
            class="ml-2"
            indeterminate
            size="20"
            color="white"
          ></v-progress-circular>
        </v-btn>
      </template>
    </v-toolbar>

    <v-container fluid class="px-8 pt-6">
      <v-row>
        <!-- ── Form ── -->
        <v-col cols="12" lg="6">
          <v-card class="pa-4 mb-4">
            <v-text-field
              v-model="npcName"
              :label="$t('messages.npcGenerator.npcName')"
              variant="underlined"
            ></v-text-field>
            <v-row>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="culture"
                  :label="$t('messages.chooseCulture')"
                  :items="cultureItems"
                  item-title="label"
                  item-value="value"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="concept"
                  :label="$t('messages.chooseConcept')"
                  :items="conceptItems"
                  item-title="label"
                  item-value="value"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="cult"
                  :label="$t('messages.chooseCult')"
                  :items="cultItems"
                  item-title="label"
                  item-value="value"
                  clearable
                ></v-select>
              </v-col>
            </v-row>
          </v-card>

          <v-card class="pa-4 mb-4">
            <HoverTooltip :description="$t('messages.npcGenerator.attributesTooltip')" class="prop-block">
              <div class="text-subtitle-2 text-uppercase mb-2 npc-section-title" style="cursor:help">{{ $t('messages.npcGenerator.attributesSection') }}</div>
            </HoverTooltip>
            <v-row>
              <v-col cols="12" sm="6" v-for="attr in attributes" :key="attr.name">
                <v-select
                  v-model.number="attributeQuality[attr.name]"
                  :label="$t(`attributes.${attr.name}`)"
                  :items="qualityItems"
                  item-title="label"
                  item-value="value"
                ></v-select>
              </v-col>
            </v-row>
          </v-card>

          <v-card class="pa-4 mb-4">
            <HoverTooltip :description="$t('messages.npcGenerator.otherStatsTooltip')" class="prop-block">
              <div class="text-subtitle-2 text-uppercase mb-2 npc-section-title" style="cursor:help">{{ $t('messages.npcGenerator.otherStatsSection') }}</div>
            </HoverTooltip>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model.number="egoQuality"
                  :label="$t('messages.npcGenerator.ego')"
                  :items="qualityItems"
                  item-title="label"
                  item-value="value"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model.number="healthQuality"
                  :label="$t('messages.npcGenerator.health')"
                  :items="qualityItems"
                  item-title="label"
                  item-value="value"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model.number="movementQuality"
                  :label="$t('messages.npcGenerator.movement')"
                  :items="qualityItems"
                  item-title="label"
                  item-value="value"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model.number="initiativeQuality"
                  :label="$t('messages.npcGenerator.initiative')"
                  :items="qualityItems"
                  item-title="label"
                  item-value="value"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model.number="passiveDefenseQuality"
                  :label="$t('messages.npcGenerator.passiveDefense')"
                  :items="qualityItems"
                  item-title="label"
                  item-value="value"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model.number="mentalDefenseQuality"
                  :label="$t('messages.npcGenerator.mentalDefense')"
                  :items="qualityItems"
                  item-title="label"
                  item-value="value"
                ></v-select>
              </v-col>
            </v-row>
            <v-alert
              variant="tonal"
              color="warning"
              :icon="mdiAlert"
              density="compact"
              class="mt-2"
            >
              {{ $t('messages.npcGenerator.passiveDefenseWarning') }}
            </v-alert>
          </v-card>

          <v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="attr in attributes" :key="attr.name">
              <v-expansion-panel-title>
                {{ $t('messages.npcGenerator.skillsSection') }} — {{ $t(`attributes.${attr.name}`) }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row>
                  <v-col cols="12" sm="6" v-for="skill in skillsByAttribute.get(attr) || []" :key="skill.name">
                    <v-select
                      v-model.number="skillQuality[skill.name]"
                      :label="$t(`skills.${skill.name}`)"
                      :items="qualityItems"
                      item-title="label"
                      item-value="value"
                      density="compact"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>

        <!-- ── Preview / PDF source ── -->
        <v-col cols="12" lg="6">
          <div id="npcSheet" class="npc-sheet pa-6">
            <div class="npc-sheet-title">{{ npcName.trim() || $t('messages.npcGenerator.title') }}</div>
            <div class="npc-sheet-subtitle">{{ archetypeLine }}</div>
            <v-divider class="my-3"></v-divider>

            <div class="npc-sheet-section-title">{{ $t('messages.npcGenerator.attributesSection') }}</div>
            <table class="npc-sheet-table">
              <tr v-for="attr in attributes" :key="attr.name">
                <td>{{ $t(`attributes.${attr.name}`) }}</td>
                <td class="npc-sheet-value">{{ attributeValue(attr.name) }}</td>
              </tr>
            </table>

            <v-divider class="my-3"></v-divider>
            <div class="npc-sheet-section-title">{{ $t('messages.npcGenerator.skillsSection') }}</div>
            <div class="npc-sheet-skills">
              <div class="npc-sheet-skill-group" v-for="attr in attributes" :key="attr.name">
                <table class="npc-sheet-table">
                  <tr v-for="skill in skillsByAttribute.get(attr) || []" :key="skill.name">
                    <td>{{ $t(`attributes.${attr.name}`).toUpperCase().slice(0, 3) }}+{{ $t(`skills.${skill.name}`) }}</td>
                    <td class="npc-sheet-value">{{ attributeValue(attr.name) + skillValue(skill.name) }}</td>
                  </tr>
                </table>
              </div>
            </div>

            <v-divider class="my-3"></v-divider>
            <div class="npc-sheet-section-title">{{ $t('messages.npcGenerator.otherStatsSection') }}</div>
            <table class="npc-sheet-table">
              <tr>
                <td>{{ $t('messages.npcGenerator.ego') }}</td>
                <td class="npc-sheet-value">{{ egoValue }}</td>
              </tr>
              <tr>
                <td>{{ $t('messages.fleshwounds') }}</td>
                <td class="npc-sheet-value">{{ fleshwoundsValue }}</td>
              </tr>
              <tr>
                <td>{{ $t('messages.trauma') }}</td>
                <td class="npc-sheet-value">{{ traumaValue }}</td>
              </tr>
              <tr>
                <td>{{ $t('messages.npcGenerator.movement') }}</td>
                <td class="npc-sheet-value">{{ movementValue }}</td>
              </tr>
              <tr>
                <td>{{ $t('messages.npcGenerator.initiative') }}</td>
                <td class="npc-sheet-value">{{ initiativeValue }}</td>
              </tr>
              <tr>
                <td>{{ $t('messages.npcGenerator.passiveDefense') }}</td>
                <td class="npc-sheet-value">{{ passiveDefenseValue }}</td>
              </tr>
              <tr>
                <td>{{ $t('messages.npcGenerator.mentalDefense') }}</td>
                <td class="npc-sheet-value">{{ mentalDefenseValue }}</td>
              </tr>
            </table>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { mdiAlert, mdiFileDocumentArrowRight } from '@mdi/js'
import domtoimage from 'dom-to-image'
import { jsPDF } from 'jspdf'
import slugify from 'slugify'
import config from '@/config'
import { Attributes, Skills, SkillsByAttribute } from '@/config/properties'
import { QUALITY_LEVELS, DEFAULT_QUALITY_INDEX, npcValue } from '@/config/npcStats'
import HoverTooltip from '@/components/HoverTooltip.vue'

const i18n = useI18n()

const attributes = Object.values(Attributes)
const skillsByAttribute = SkillsByAttribute

const npcName = ref('')
const culture = ref<string | null>(null)
const concept = ref<string | null>(null)
const cult = ref<string | null>(null)

const cultureItems = computed(() =>
  [...config.culturesByName.keys()].map((name) => ({ value: name, label: i18n.t(`culturesConceptsCults.${name}`) }))
)
const conceptItems = computed(() =>
  [...config.conceptsByName.keys()].map((name) => ({ value: name, label: i18n.t(`culturesConceptsCults.${name}`) }))
)
const cultItems = computed(() =>
  [...config.cultsByName.keys()].map((name) => ({ value: name, label: i18n.t(`culturesConceptsCults.${name}`) }))
)

const qualityItems = computed(() =>
  QUALITY_LEVELS.map((key, index) => ({ value: index, label: i18n.t(`messages.npcGenerator.qualityLevels.${key}`) }))
)

const archetypeLine = computed(() => {
  const parts = [culture.value, concept.value, cult.value]
    .filter((v): v is string => !!v)
    .map((name) => i18n.t(`culturesConceptsCults.${name}`))
  return parts.join(', ')
})

const attributeQuality = reactive<Record<string, number>>(
  Object.fromEntries(attributes.map((a) => [a.name, DEFAULT_QUALITY_INDEX]))
)
const skillQuality = reactive<Record<string, number>>(
  Object.fromEntries(Object.values(Skills).map((s) => [s.name, DEFAULT_QUALITY_INDEX]))
)

const egoQuality = ref(DEFAULT_QUALITY_INDEX)
const healthQuality = ref(DEFAULT_QUALITY_INDEX)
const movementQuality = ref(DEFAULT_QUALITY_INDEX)
const initiativeQuality = ref(DEFAULT_QUALITY_INDEX)
const passiveDefenseQuality = ref(DEFAULT_QUALITY_INDEX)
const mentalDefenseQuality = ref(DEFAULT_QUALITY_INDEX)

const attributeValue = (name: string) => npcValue('attribute', attributeQuality[name] ?? DEFAULT_QUALITY_INDEX)
const skillValue = (name: string) => npcValue('skill', skillQuality[name] ?? DEFAULT_QUALITY_INDEX)
const egoValue = computed(() => npcValue('ego', egoQuality.value))
const fleshwoundsValue = computed(() => npcValue('fleshwounds', healthQuality.value))
const traumaValue = computed(() => npcValue('trauma', healthQuality.value))
const movementValue = computed(() => npcValue('movement', movementQuality.value))
const initiativeValue = computed(() => npcValue('initiative', initiativeQuality.value))
const passiveDefenseValue = computed(() => npcValue('passiveDefense', passiveDefenseQuality.value))
const mentalDefenseValue = computed(() => npcValue('mentalDefense', mentalDefenseQuality.value))

const isGenerating = ref(false)
const generateNpc = () => {
  isGenerating.value = true
  const el = document.querySelector('#npcSheet')
  if (!el) {
    isGenerating.value = false
    throw new Error('Could not select element')
  }
  const scale = 3
  const width = el.clientWidth * scale
  const height = el.clientHeight * scale
  domtoimage
    .toPng(el, {
      width,
      height,
      style: {
        transform: 'scale(' + scale + ')',
        'transform-origin': 'top left'
      }
    })
    .then((dataUrl) => {
      const img = new Image()
      img.src = dataUrl
      const doc = new jsPDF('p', 'mm', 'A4')
      const pageWidth = doc.internal.pageSize.width
      const imgHeightMm = (height / width) * pageWidth
      doc.addImage({
        imageData: dataUrl,
        format: 'PNG',
        x: 0,
        y: 0,
        width: pageWidth,
        height: imgHeightMm,
        compression: 'FAST'
      })
      isGenerating.value = false
      const fileName = `${config.appName}-NPC${npcName.value.trim() ? '-' + slugify(npcName.value) : ''}.pdf`
      doc.save(fileName)
    })
    .catch((error) => {
      isGenerating.value = false
      console.error('oops, something went wrong!', error)
    })
}
</script>

<style scoped>
.npc-section-title {
  display: inline-block;
  border-bottom: 1px dotted #888;
}

.npc-sheet {
  background: white;
  color: black;
  border-radius: 4px;
  box-shadow: 0 0 12px rgba(0,0,0,0.2);
}

.npc-sheet-title {
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: uppercase;
}

.npc-sheet-subtitle {
  font-size: 0.9rem;
  opacity: 0.7;
}

.npc-sheet-section-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: black;
  color: white;
  padding: 2px 6px;
  margin-bottom: 6px;
}

.npc-sheet-table {
  width: 100%;
  border-collapse: collapse;
}

.npc-sheet-table td {
  padding: 2px 4px;
  border-bottom: 1px solid #ddd;
}

.npc-sheet-value {
  text-align: right;
  font-weight: 700;
  width: 3em;
}

.npc-sheet-skills {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 16px;
}
</style>

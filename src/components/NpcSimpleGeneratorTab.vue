<template>
  <div class="npc-generator">
    <v-toolbar class="pa-4 bg-grey-lighten-2 elevation-2" density="compact">
      <template v-slot:append>
        <v-btn @click="randomizeStats" stacked color="grey-darken-2" class="mr-2">
          Générer Aléatoirement
          <v-icon :icon="mdiDice6Outline" />
        </v-btn>
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
          </v-card>

          <v-card class="pa-4 mb-4">
            <HoverTooltip :description="$t('messages.npcGenerator.otherStatsTooltip')" class="prop-block">
              <div class="text-subtitle-2 text-uppercase mb-2 npc-section-title" style="cursor:help">{{ $t('messages.npcGenerator.otherStatsSection') }}</div>
            </HoverTooltip>
            <v-row>
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
                  v-model.number="egoQuality"
                  :label="$t('messages.npcGenerator.ego')"
                  :items="qualityItems"
                  item-title="label"
                  item-value="value"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model.number="attackQuality"
                  :label="$t('messages.npcGenerator.attack')"
                  :items="qualityItems"
                  item-title="label"
                  item-value="value"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model.number="dodgeQuality"
                  :label="$t('messages.npcGenerator.dodge')"
                  :items="qualityItems"
                  item-title="label"
                  item-value="value"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model.number="passiveDefenseQuality"
                  :label="$t('messages.npcGenerator.passiveDefense')"
                  :items="passiveDefenseItems"
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
                  v-model.number="healthQuality"
                  :label="$t('messages.npcGenerator.health')"
                  :items="qualityItems"
                  item-title="label"
                  item-value="value"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="armorValue"
                  :label="$t('messages.npcGenerator.armor')"
                  type="number"
                  min="0"
                  max="99"
                  @update:model-value="clampArmor"
                ></v-text-field>
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

          <v-card class="pa-4 mb-4">
            <div class="text-subtitle-2 text-uppercase mb-2">{{ $t('messages.npcGenerator.special') }}</div>
            <div class="text-caption text-grey-darken-1 mb-2">{{ $t('messages.npcGenerator.specialHint') }}</div>
            <v-select
              v-model="selectedSpecialSkills"
              :label="$t('messages.npcGenerator.specialSkillsLabel')"
              :items="skillItems"
              item-title="label"
              item-value="value"
              multiple
              chips
              closable-chips
            ></v-select>
            <v-row v-if="selectedSpecialSkills.length > 0">
              <v-col cols="12" sm="6" v-for="name in selectedSpecialSkills" :key="name">
                <v-text-field
                  v-model.number="specialSkillDice[name]"
                  :label="`${skillLabel(name)} — ${$t('messages.npcGenerator.specialDiceCount')}`"
                  type="number"
                  min="0"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- ── Preview / PDF source ── -->
        <v-col cols="12" lg="6">
          <div id="npcSimpleSheet" class="npc-sheet pa-6">
            <div class="npc-sheet-title">{{ npcName.trim() || $t('messages.npcGenerator.title') }}</div>
            <v-divider class="my-3"></v-divider>

            <div class="npc-sheet-section-title">{{ $t('messages.npcGenerator.otherStatsSection') }}</div>
            <table class="npc-sheet-table">
              <tr>
                <td>{{ $t('messages.npcGenerator.initiative') }}</td>
                <td class="npc-sheet-value">{{ initiativeValue }}</td>
              </tr>
              <tr>
                <td>{{ $t('messages.npcGenerator.ego') }}</td>
                <td class="npc-sheet-value">{{ egoValue }}</td>
              </tr>
              <tr>
                <td>{{ $t('messages.npcGenerator.attack') }}</td>
                <td class="npc-sheet-value">{{ attackValue }}D</td>
              </tr>
              <tr>
                <td>{{ $t('messages.npcGenerator.dodge') }}</td>
                <td class="npc-sheet-value">{{ dodgeValue }}D</td>
              </tr>
              <tr>
                <td>{{ $t('messages.npcGenerator.passiveDefense') }}</td>
                <td class="npc-sheet-value">{{ passiveDefenseValue }}</td>
              </tr>
              <tr>
                <td>{{ $t('messages.npcGenerator.movement') }}</td>
                <td class="npc-sheet-value">{{ movementValue }}</td>
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
                <td>{{ $t('messages.npcGenerator.armor') }}</td>
                <td class="npc-sheet-value">{{ armorValue }}</td>
              </tr>
            </table>

            <template v-if="selectedSpecialSkills.length > 0">
              <v-divider class="my-3"></v-divider>
              <div class="npc-sheet-section-title">{{ $t('messages.npcGenerator.special') }}</div>
              <table class="npc-sheet-table">
                <tr v-for="name in selectedSpecialSkills" :key="name">
                  <td>{{ skillLabel(name) }}</td>
                  <td class="npc-sheet-value">{{ specialSkillDice[name] ?? 0 }}D</td>
                </tr>
              </table>
            </template>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { mdiAlert, mdiFileDocumentArrowRight, mdiDice6Outline } from '@mdi/js'
import domtoimage from 'dom-to-image'
import { jsPDF } from 'jspdf'
import slugify from 'slugify'
import config from '@/config'
import { Skills } from '@/config/properties'
import { QUALITY_LEVELS, DEFAULT_QUALITY_INDEX, npcValue } from '@/config/npcStats'
import HoverTooltip from '@/components/HoverTooltip.vue'

const i18n = useI18n()

const npcName = ref('')

const qualityItems = computed(() =>
  QUALITY_LEVELS.map((key, index) => ({ value: index, label: i18n.t(`messages.npcGenerator.qualityLevels.${key}`) }))
)

const passiveDefenseItems = QUALITY_LEVELS.map((_, index) => ({ value: index, label: String(index + 1) }))

const initiativeQuality = ref(DEFAULT_QUALITY_INDEX)
const egoQuality = ref(DEFAULT_QUALITY_INDEX)
const attackQuality = ref(DEFAULT_QUALITY_INDEX)
const dodgeQuality = ref(DEFAULT_QUALITY_INDEX)
const passiveDefenseQuality = ref(DEFAULT_QUALITY_INDEX)
const movementQuality = ref(DEFAULT_QUALITY_INDEX)
const healthQuality = ref(DEFAULT_QUALITY_INDEX)
const armorValue = ref(0)
const clampArmor = () => {
  if (Number.isNaN(armorValue.value)) armorValue.value = 0
  armorValue.value = Math.max(0, Math.min(99, Math.round(armorValue.value)))
}

const initiativeValue = computed(() => npcValue('initiative', initiativeQuality.value))
const egoValue = computed(() => npcValue('ego', egoQuality.value))
const attackValue = computed(() => npcValue('attackDodge', attackQuality.value))
const dodgeValue = computed(() => npcValue('attackDodge', dodgeQuality.value))
const passiveDefenseValue = computed(() => npcValue('passiveDefense', passiveDefenseQuality.value))
const movementValue = computed(() => npcValue('movement', movementQuality.value))
const fleshwoundsValue = computed(() => npcValue('fleshwounds', healthQuality.value))
const traumaValue = computed(() => npcValue('trauma', healthQuality.value))

// ── Spécial: pick skills, enter dice count directly ──
const skillItems = computed(() =>
  Object.values(Skills).map((s) => ({ value: s.name, label: skillLabel(s.name) }))
)
function skillLabel(name: string): string {
  const skill = Object.values(Skills).find((s) => s.name === name)
  if (!skill) return name
  return `${i18n.t(`attributes.${skill.attribute.name}`).toUpperCase().slice(0, 3)}+${i18n.t(`skills.${skill.name}`)}`
}

const selectedSpecialSkills = ref<string[]>([])
const specialSkillDice = reactive<Record<string, number>>({})
watch(selectedSpecialSkills, (newVal) => {
  newVal.forEach((name) => {
    if (!(name in specialSkillDice)) specialSkillDice[name] = 0
  })
  Object.keys(specialSkillDice).forEach((name) => {
    if (!newVal.includes(name)) delete specialSkillDice[name]
  })
})

function randQuality(): number {
  return Math.floor(Math.random() * QUALITY_LEVELS.length)
}

function randomizeStats() {
  initiativeQuality.value = randQuality()
  egoQuality.value = randQuality()
  attackQuality.value = randQuality()
  dodgeQuality.value = randQuality()
  movementQuality.value = randQuality()
  healthQuality.value = randQuality()
  // Défense Passive fixe à 2 (index 1)
  passiveDefenseQuality.value = 1
  // Armure 1-6
  armorValue.value = Math.floor(Math.random() * 6) + 1
  // Pas de compétences spéciales
  selectedSpecialSkills.value = []
}

const isGenerating = ref(false)
const generateNpc = () => {
  isGenerating.value = true
  const el = document.querySelector('#npcSimpleSheet')
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
</style>

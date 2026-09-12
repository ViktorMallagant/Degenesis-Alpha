<template>
  <div class="timeline-page">
    <v-container fluid class="timeline-container">
      <div class="timeline-header">
        <div>
          <div class="timeline-kicker">HISTORY ARCHIVE</div>
          <h1>Degenesis Timeline</h1>
          <p>
            <strong>Note:</strong> Very few people are aware of the history prior to, during, and even after the Eshaton, especially in regards to Recombination Group, Project Tannhäuser and Sleepers. It is best to assume ignorance and ask your Gamemaster if your character knows a particular piece of information.
          </p>
        </div>
        <div class="timeline-stat">
          <span>{{ visibleEvents.length }}</span>
          <small>VISIBLE EVENTS</small>
        </div>
      </div>

      <div class="timeline-workspace">
        <div class="timeline-left">
          <v-card class="timeline-controls" variant="tonal">
            <v-card-text>
              <div class="control-copy">
                <strong>Timeline sources</strong>
                <span>Both canon tracks are enabled by default.</span>
              </div>
              <div class="source-toggles">
                <v-switch
                  v-model="generalEnabled"
                  label="General Canon"
                  color="red-darken-2"
                  density="compact"
                  hide-details
                  inset
                  :disabled="generalEnabled && !spitalianEnabled"
                />
                <v-switch
                  v-model="spitalianEnabled"
                  label="Spitalian Archives"
                  color="blue-grey-lighten-1"
                  density="compact"
                  hide-details
                  inset
                  :disabled="spitalianEnabled && !generalEnabled"
                />
              </div>
            </v-card-text>
          </v-card>

          <div class="source-key">
            <span v-if="generalEnabled" class="source-key-item general-key">
              <i></i> General Canon · Primal Punk pp. 340–352
            </span>
            <span v-if="spitalianEnabled" class="source-key-item spitalian-key">
              <i></i> Spitalian Archives · Primal Punk pp. 333–337
            </span>
          </div>

          <div class="scroll-hint">
            Distance represents elapsed time · Scroll down to move through history · Select a marker for details
          </div>

          <div class="timeline-frame">
            <div class="timeline-column-head" :class="columnClass">
              <div class="axis-label">YEAR</div>
              <div v-if="generalEnabled" class="lane-label general-label">
                <strong>GENERAL</strong>
                <small>CANON</small>
              </div>
              <div v-if="spitalianEnabled" class="lane-label spitalian-label">
                <strong>SPITALIAN</strong>
                <small>ARCHIVES</small>
              </div>
            </div>

            <div ref="timelineScroller" class="timeline-vertical-canvas" :class="columnClass" :style="canvasStyle">
              <div class="year-column"></div>

              <div v-if="generalEnabled" class="event-lane general-lane">
                <div class="lane-centerline"></div>
                <button
                  v-for="event in generalTimelineEvents"
                  :id="`timeline-${event.id}`"
                  :key="event.id"
                  type="button"
                  class="event-marker general-marker"
                  :class="{ selected: selectedEvent?.id === event.id }"
                  :style="positionStyle(event.year)"
                  :aria-label="`${event.year}: ${event.title}`"
                  @click="selectEvent(event)"
                >
                  <span class="marker-dot"></span>
                  <span class="marker-label">
                    <strong>{{ event.year }}</strong>
                    <span>{{ event.title }}</span>
                  </span>
                </button>
              </div>

              <div v-if="spitalianEnabled" class="event-lane spitalian-lane">
                <div class="lane-centerline"></div>
                <button
                  v-for="event in spitalianTimelineEvents"
                  :id="`timeline-${event.id}`"
                  :key="event.id"
                  type="button"
                  class="event-marker spitalian-marker"
                  :class="{ selected: selectedEvent?.id === event.id }"
                  :style="positionStyle(event.year)"
                  :aria-label="`${event.year}: ${event.title}`"
                  @click="selectEvent(event)"
                >
                  <span class="marker-dot"></span>
                  <span class="marker-label">
                    <strong>{{ event.year }}</strong>
                    <span>{{ event.title }}</span>
                  </span>
                </button>
              </div>

              <div
                v-for="year in axisYears"
                :key="`axis-${year}`"
                class="year-tick"
                :class="{ major: year % 50 === 0 }"
                :style="positionStyle(year)"
              >
                <span>{{ year }}</span>
              </div>
            </div>
          </div>
        </div>

        <v-card v-if="selectedEvent" class="event-detail" variant="elevated">
          <v-card-actions class="detail-actions">
            <v-btn variant="text" :disabled="selectedIndex <= 0" @click="moveSelection(-1)">
              Previous event
            </v-btn>
            <span>{{ selectedIndex + 1 }} / {{ visibleEvents.length }}</span>
            <v-btn
              variant="text"
              :disabled="selectedIndex < 0 || selectedIndex >= visibleEvents.length - 1"
              @click="moveSelection(1)"
            >
              Next event
            </v-btn>
          </v-card-actions>
          <v-divider />
          <v-card-text>
            <div class="detail-topline">
              <span
                class="detail-source"
                :class="selectedEvent.source === 'general' ? 'general-source' : 'spitalian-source'"
              >
                {{ timelineSourceInfo[selectedEvent.source].label }}
              </span>
              <span class="detail-pages">{{ timelineSourceInfo[selectedEvent.source].pages }}</span>
            </div>
            <div class="detail-heading">
              <span class="detail-year">{{ selectedEvent.year }}</span>
              <div class="detail-copy">
                <h2>{{ selectedEvent.title }}</h2>
                <p>{{ eventText(selectedEvent) }}</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import {
  generalTimelineEvents,
  spitalianTimelineEvents,
  timelineEvents,
  timelineSourceInfo,
  type TimelineEvent,
  type TimelineSource
} from '@/config/timeline'
import { timelineBookText } from '@/config/timelineBookText'

const generalEnabled = ref(true)
const spitalianEnabled = ref(true)
const timelineScroller = ref<HTMLElement | null>(null)

const PIXELS_PER_YEAR = 10
const TIMELINE_PADDING = 64
const AXIS_STEP = 25

const minimumEventYear = Math.min(...timelineEvents.map((event) => event.year))
const maximumEventYear = Math.max(...timelineEvents.map((event) => event.year))
const axisStart = Math.floor(minimumEventYear / AXIS_STEP) * AXIS_STEP
const axisEnd = Math.ceil(maximumEventYear / AXIS_STEP) * AXIS_STEP
const timelineHeight = (axisEnd - axisStart) * PIXELS_PER_YEAR + TIMELINE_PADDING * 2

const axisYears = Array.from(
  { length: Math.floor((axisEnd - axisStart) / AXIS_STEP) + 1 },
  (_, index) => axisStart + index * AXIS_STEP
)

const yearPosition = (year: number) =>
  TIMELINE_PADDING + (year - axisStart) * PIXELS_PER_YEAR

const positionStyle = (year: number) => ({
  top: `${yearPosition(year)}px`
})

const canvasStyle = computed(() => ({
  height: `${timelineHeight}px`
}))

const activeSources = computed<TimelineSource[]>(() => {
  const sources: TimelineSource[] = []
  if (generalEnabled.value) sources.push('general')
  if (spitalianEnabled.value) sources.push('spitalian')
  return sources
})

const columnClass = computed(() => ({
  'single-lane': activeSources.value.length === 1
}))

const visibleEvents = computed(() =>
  timelineEvents
    .filter((event) => activeSources.value.includes(event.source))
    .sort((a, b) => a.year - b.year || a.source.localeCompare(b.source))
)

const selectedEvent = ref<TimelineEvent>(generalTimelineEvents[0])

const selectedIndex = computed(() => {
  if (!selectedEvent.value) return -1
  return visibleEvents.value.findIndex((event) => event.id === selectedEvent.value.id)
})

const eventText = (event: TimelineEvent) => timelineBookText[event.id] ?? event.summary

const selectEvent = (event: TimelineEvent) => {
  selectedEvent.value = event
}

const scrollSelectedIntoView = async () => {
  await nextTick()
  if (!selectedEvent.value || !timelineScroller.value) return

  const marker = document.getElementById(`timeline-${selectedEvent.value.id}`)
  marker?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
}

const moveSelection = (direction: number) => {
  const nextIndex = selectedIndex.value + direction
  if (nextIndex < 0 || nextIndex >= visibleEvents.value.length) return

  selectedEvent.value = visibleEvents.value[nextIndex]
  void scrollSelectedIntoView()
}

watch(activeSources, () => {
  if (!selectedEvent.value || !activeSources.value.includes(selectedEvent.value.source)) {
    selectedEvent.value = visibleEvents.value[0]
    void scrollSelectedIntoView()
  }
})
</script>

<style scoped>
.timeline-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 80% 0%, rgba(146, 28, 28, 0.18), transparent 34rem),
    linear-gradient(180deg, #171717 0%, #0f0f0f 100%);
  color: #ececec;
}

.timeline-container {
  max-width: 1800px;
  padding: 42px clamp(16px, 3vw, 56px) 64px;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
  margin-bottom: 28px;
}

.timeline-kicker {
  color: #bdbdbd;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.35em;
  margin-bottom: 8px;
}

.timeline-header h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.6rem);
  font-weight: 300;
  letter-spacing: 0.04em;
  line-height: 1;
}

.timeline-header p {
  max-width: 1050px;
  margin: 18px 0 0;
  color: #bdbdbd;
  font-size: 1rem;
  line-height: 1.65;
}

.timeline-header p strong {
  color: #e1e1e1;
}

.timeline-stat {
  min-width: 150px;
  border-left: 2px solid #9b2226;
  padding: 8px 0 6px 18px;
}

.timeline-stat span {
  display: block;
  font-size: 2.1rem;
  line-height: 1;
}

.timeline-stat small {
  display: block;
  margin-top: 8px;
  color: #9e9e9e;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
}

.timeline-workspace {
  display: grid;
  grid-template-columns: minmax(390px, 520px) minmax(0, 1fr);
  align-items: start;
  gap: clamp(18px, 2.5vw, 34px);
}

.timeline-left {
  min-width: 0;
}

.timeline-controls {
  background: rgba(255, 255, 255, 0.045) !important;
  border: 1px solid rgba(255, 255, 255, 0.09);
  margin-bottom: 12px;
}

.timeline-controls :deep(.v-card-text) {
  padding: 16px 18px 10px;
}

.control-copy strong,
.control-copy span {
  display: block;
}

.control-copy span {
  color: #9e9e9e;
  font-size: 0.82rem;
  margin-top: 3px;
}

.source-toggles {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 18px;
  margin-top: 8px;
}

.source-toggles :deep(.v-switch) {
  min-width: 190px;
}

.source-key {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  min-height: 28px;
  margin: 0 2px 10px;
  color: #a8a8a8;
  font-size: 0.72rem;
}

.source-key-item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.source-key-item i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.general-key i {
  background: #c93838;
}

.spitalian-key i {
  background: #90a4ae;
}

.scroll-hint {
  padding: 0 2px 8px;
  color: #747474;
  font-size: 0.7rem;
  text-align: left;
}

.timeline-frame {
  overflow: visible;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.28);
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.24);
}

.timeline-column-head,
.timeline-vertical-canvas {
  display: grid;
  grid-template-columns: 80px repeat(2, minmax(0, 1fr));
}

.timeline-column-head.single-lane,
.timeline-vertical-canvas.single-lane {
  grid-template-columns: 80px minmax(0, 1fr);
}

.timeline-column-head {
  position: sticky;
  top: 0;
  z-index: 8;
  min-height: 56px;
  background: #151515;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px 8px 0 0;
}

.axis-label,
.lane-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: 0 10px;
}

.axis-label {
  color: #8b8b8b;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.lane-label {
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

.lane-label strong {
  font-size: 0.74rem;
  letter-spacing: 0.1em;
}

.lane-label small {
  margin-top: 3px;
  color: #757575;
  font-size: 0.59rem;
  letter-spacing: 0.1em;
}

.general-label {
  box-shadow: inset 0 3px #a92d30;
}

.spitalian-label {
  box-shadow: inset 0 3px #78909c;
}

.timeline-vertical-canvas {
  position: relative;
  width: 100%;
  min-height: 1000px;
}

.year-column {
  grid-column: 1;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.015);
}

.event-lane {
  position: relative;
  min-width: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.045);
}

.lane-centerline {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.17);
}

.year-tick {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.045);
  pointer-events: none;
}

.year-tick.major {
  background: rgba(255, 255, 255, 0.09);
}

.year-tick span {
  position: absolute;
  left: 9px;
  top: 0;
  transform: translateY(-50%);
  color: #9b9b9b;
  font-size: 0.98rem;
  font-weight: 500;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.year-tick.major span {
  color: #c0c0c0;
}

.event-marker {
  position: absolute;
  left: 50%;
  z-index: 3;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #e0e0e0;
  cursor: pointer;
  transform: translate(-50%, -50%);
  outline: none;
}

.marker-dot {
  position: absolute;
  top: 7px;
  left: 7px;
  width: 10px;
  height: 10px;
  border: 2px solid #151515;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.general-marker .marker-dot {
  background: #c93838;
}

.spitalian-marker .marker-dot {
  background: #90a4ae;
}

.event-marker:hover .marker-dot,
.event-marker:focus-visible .marker-dot,
.event-marker.selected .marker-dot {
  transform: scale(1.5);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.46);
}

.marker-label {
  position: absolute;
  left: calc(100% + 7px);
  top: 50%;
  display: none;
  width: 168px;
  padding: 7px 9px;
  transform: translateY(-50%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 4px;
  background: #202020;
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.38);
  text-align: left;
  pointer-events: none;
}

.event-marker:nth-of-type(even) .marker-label {
  left: auto;
  right: calc(100% + 7px);
}

.event-marker:hover,
.event-marker:focus-visible,
.event-marker.selected {
  z-index: 6;
}

.event-marker:hover .marker-label,
.event-marker:focus-visible .marker-label {
  display: block;
}

.marker-label strong,
.marker-label span {
  display: block;
}

.marker-label strong {
  color: #ababab;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
}

.marker-label span {
  margin-top: 2px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.25;
}

.event-detail {
  position: sticky;
  top: 24px;
  margin: 0;
  background: #1a1a1a !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.event-detail :deep(.v-card-text) {
  padding: clamp(22px, 3vw, 38px);
}

.detail-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px 16px;
  margin-bottom: 24px;
}

.detail-source {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 3px 9px;
  border-radius: 2px;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.general-source {
  background: rgba(184, 50, 54, 0.2);
  color: #ef9a9a;
  border: 1px solid rgba(184, 50, 54, 0.42);
}

.spitalian-source {
  background: rgba(120, 144, 156, 0.18);
  color: #cfd8dc;
  border: 1px solid rgba(120, 144, 156, 0.4);
}

.detail-pages {
  color: #777;
  font-size: 0.72rem;
}

.detail-heading {
  display: grid;
  grid-template-columns: minmax(132px, 178px) minmax(0, 1fr);
  gap: clamp(18px, 3vw, 40px);
}

.detail-year {
  display: block;
  color: #d7d7d7;
  font-size: clamp(2.2rem, 4.2vw, 4rem);
  font-weight: 200;
  letter-spacing: -0.04em;
  line-height: 0.95;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.detail-copy {
  min-width: 0;
}

.detail-heading h2 {
  margin: 0 0 10px;
  color: #f0f0f0;
  font-size: clamp(1.3rem, 2.2vw, 2rem);
  font-weight: 400;
}

.detail-heading p {
  max-width: 1100px;
  margin: 0;
  color: #bdbdbd;
  font-size: 0.95rem;
  line-height: 1.72;
  white-space: pre-line;
}

.detail-actions {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 58px;
  padding: 7px 12px;
}

.detail-actions > :first-child {
  justify-self: start;
}

.detail-actions > :last-child {
  justify-self: end;
}

.detail-actions span {
  color: #777;
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 1000px) {
  .timeline-workspace {
    grid-template-columns: 1fr;
  }

  .event-detail {
    position: static;
    grid-row: 2;
  }

  .timeline-left {
    grid-row: 1;
  }
}

@media (max-width: 700px) {
  .timeline-container {
    padding-top: 24px;
  }

  .timeline-header {
    align-items: flex-start;
  }

  .timeline-stat {
    display: none;
  }

  .source-toggles {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }

  .source-toggles :deep(.v-switch) {
    min-width: 0;
  }

  .timeline-column-head,
  .timeline-vertical-canvas {
    grid-template-columns: 70px repeat(2, minmax(0, 1fr));
  }

  .timeline-column-head.single-lane,
  .timeline-vertical-canvas.single-lane {
    grid-template-columns: 70px minmax(0, 1fr);
  }

  .axis-label,
  .lane-label {
    padding: 0 7px;
  }

  .lane-label strong {
    font-size: 0.63rem;
  }

  .lane-label small {
    font-size: 0.52rem;
  }

  .year-tick span {
    left: 6px;
    font-size: 0.98rem;
  }

  .marker-label {
    width: 136px;
  }

  .detail-heading {
    grid-template-columns: 1fr;
  }

  .detail-year {
    font-size: 2.5rem;
  }

  .detail-actions {
    grid-template-columns: 1fr 1fr;
  }

  .detail-actions span {
    display: none;
  }
}
</style>

<style>
/* Timeline is the final main-navigation entry. Draw a clock face without adding another App.vue icon dependency. */
#mainNavigation .v-list > .v-list-item:last-child .v-icon > svg {
  display: none;
}

#mainNavigation .v-list > .v-list-item:last-child .v-icon::before {
  content: '';
  display: block;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 50%;
  background:
    linear-gradient(currentColor, currentColor) 7px 3px / 2px 6px no-repeat,
    linear-gradient(currentColor, currentColor) 8px 8px / 5px 2px no-repeat;
  box-sizing: border-box;
}
</style>
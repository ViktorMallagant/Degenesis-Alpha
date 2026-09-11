<template>
  <div class="timeline-page">
    <v-container fluid class="timeline-container">
      <div class="timeline-header">
        <div>
          <div class="timeline-kicker">HISTORY ARCHIVE</div>
          <h1>Degenesis Timeline</h1>
          <p>
            Compare the general canon chronology with the Spitalian Archives on one shared,
            linear historical axis. Distance on the timeline now represents actual elapsed time.
          </p>
        </div>
        <div class="timeline-stat">
          <span>{{ visibleEvents.length }}</span>
          <small>VISIBLE EVENTS</small>
        </div>
      </div>

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

      <div class="timeline-frame">
        <div class="lane-labels" :class="{ 'single-lane': activeSources.length === 1 }">
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

        <div ref="timelineScroller" class="timeline-scroller" tabindex="0">
          <div class="timeline-canvas" :style="canvasStyle">
            <div class="year-axis">
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

            <div v-if="generalEnabled" class="event-lane general-lane">
              <div
                v-for="year in axisYears"
                :key="`general-grid-${year}`"
                class="lane-gridline"
                :class="{ major: year % 50 === 0 }"
                :style="positionStyle(year)"
              ></div>
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
              <div
                v-for="year in axisYears"
                :key="`spitalian-grid-${year}`"
                class="lane-gridline"
                :class="{ major: year % 50 === 0 }"
                :style="positionStyle(year)"
              ></div>
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
          </div>
        </div>
      </div>

      <div class="scroll-hint">
        Distance represents elapsed time · Scroll horizontally to move through history · Select a marker for details
      </div>

      <v-card v-if="selectedEvent" class="event-detail" variant="elevated">
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
        <v-divider />
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
      </v-card>
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

const PIXELS_PER_YEAR = 14
const TIMELINE_PADDING = 92
const AXIS_STEP = 25

const minimumEventYear = Math.min(...timelineEvents.map((event) => event.year))
const maximumEventYear = Math.max(...timelineEvents.map((event) => event.year))
const axisStart = Math.floor(minimumEventYear / AXIS_STEP) * AXIS_STEP
const axisEnd = Math.ceil(maximumEventYear / AXIS_STEP) * AXIS_STEP
const timelineWidth = (axisEnd - axisStart) * PIXELS_PER_YEAR + TIMELINE_PADDING * 2

const axisYears = Array.from(
  { length: Math.floor((axisEnd - axisStart) / AXIS_STEP) + 1 },
  (_, index) => axisStart + index * AXIS_STEP
)

const yearPosition = (year: number) =>
  TIMELINE_PADDING + (year - axisStart) * PIXELS_PER_YEAR

const positionStyle = (year: number) => ({
  left: `${yearPosition(year)}px`
})

const canvasStyle = computed(() => ({
  width: `${timelineWidth}px`
}))

const activeSources = computed<TimelineSource[]>(() => {
  const sources: TimelineSource[] = []
  if (generalEnabled.value) sources.push('general')
  if (spitalianEnabled.value) sources.push('spitalian')
  return sources
})

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
  marker?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
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
  max-width: 780px;
  margin: 18px 0 0;
  color: #bdbdbd;
  font-size: 1rem;
  line-height: 1.65;
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

.timeline-controls {
  background: rgba(255, 255, 255, 0.045) !important;
  border: 1px solid rgba(255, 255, 255, 0.09);
  margin-bottom: 14px;
}

.timeline-controls :deep(.v-card-text) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 20px;
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
  align-items: center;
  gap: 22px;
}

.source-toggles :deep(.v-switch) {
  min-width: 180px;
}

.source-key {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  min-height: 28px;
  margin: 0 0 10px;
  color: #a8a8a8;
  font-size: 0.75rem;
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

.timeline-frame {
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.28);
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.24);
}

.lane-labels {
  display: grid;
  grid-template-rows: 54px 142px 142px;
  position: relative;
  z-index: 4;
  background: #151515;
  border-right: 1px solid rgba(255, 255, 255, 0.11);
}

.lane-labels.single-lane {
  grid-template-rows: 54px 142px;
}

.axis-label,
.lane-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 18px;
}

.axis-label {
  color: #757575;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.lane-label {
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.lane-label strong {
  font-size: 0.74rem;
  letter-spacing: 0.12em;
}

.lane-label small {
  margin-top: 3px;
  color: #757575;
  font-size: 0.61rem;
  letter-spacing: 0.12em;
}

.general-label {
  box-shadow: inset 3px 0 #a92d30;
}

.spitalian-label {
  box-shadow: inset 3px 0 #78909c;
}

.timeline-scroller {
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-color: #555 #1b1b1b;
  scrollbar-width: thin;
}

.timeline-scroller:focus-visible {
  outline: 2px solid #78909c;
  outline-offset: -2px;
}

.timeline-canvas {
  position: relative;
  min-width: 100%;
}

.year-axis {
  position: relative;
  height: 54px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.018);
}

.year-tick,
.lane-gridline {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(255, 255, 255, 0.045);
}

.year-tick.major,
.lane-gridline.major {
  background: rgba(255, 255, 255, 0.085);
}

.year-tick span {
  position: absolute;
  top: 19px;
  left: 7px;
  color: #8d8d8d;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.year-tick.major span {
  color: #b0b0b0;
}

.event-lane {
  position: relative;
  height: 142px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.event-lane::before {
  content: '';
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.18);
}

.event-marker {
  position: absolute;
  top: 70px;
  z-index: 2;
  width: 22px;
  height: 34px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #e0e0e0;
  cursor: pointer;
  transform: translate(-11px, -17px);
  outline: none;
}

.marker-dot {
  position: absolute;
  top: 12px;
  left: 6px;
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
  transform: scale(1.45);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.42);
}

.marker-label {
  position: absolute;
  left: 11px;
  bottom: calc(100% + 7px);
  display: none;
  width: 156px;
  padding: 7px 9px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 4px;
  background: #202020;
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.38);
  text-align: left;
  pointer-events: none;
}

.event-marker:nth-of-type(even) .marker-label {
  bottom: auto;
  top: calc(100% + 7px);
}

.event-marker:hover .marker-label,
.event-marker:focus-visible .marker-label,
.event-marker.selected .marker-label {
  display: block;
}

.marker-label strong,
.marker-label span {
  display: block;
}

.marker-label strong {
  color: #9f9f9f;
  font-size: 0.64rem;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
}

.marker-label span {
  margin-top: 2px;
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.25;
}

.event-marker.selected {
  z-index: 3;
}

.event-marker.selected .marker-label {
  border-color: rgba(255, 255, 255, 0.34);
  background: #292929;
}

.scroll-hint {
  padding: 8px 2px 0;
  color: #747474;
  font-size: 0.7rem;
  text-align: right;
}

.event-detail {
  margin-top: 22px;
  background: #1a1a1a !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.event-detail :deep(.v-card-text) {
  padding: clamp(20px, 3vw, 34px);
}

.detail-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
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

@media (max-width: 800px) {
  .timeline-container {
    padding-top: 24px;
  }

  .timeline-header {
    align-items: flex-start;
  }

  .timeline-stat {
    display: none;
  }

  .timeline-controls :deep(.v-card-text) {
    align-items: flex-start;
    flex-direction: column;
  }

  .source-toggles {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }

  .source-toggles :deep(.v-switch) {
    min-width: 0;
  }

  .timeline-frame {
    grid-template-columns: 92px minmax(0, 1fr);
  }

  .axis-label,
  .lane-label {
    padding: 0 10px;
  }

  .lane-label strong {
    font-size: 0.63rem;
  }

  .lane-label small {
    font-size: 0.54rem;
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

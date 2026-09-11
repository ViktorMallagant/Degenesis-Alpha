<template>
  <div class="timeline-page">
    <v-container fluid class="timeline-container">
      <div class="timeline-header">
        <div>
          <div class="timeline-kicker">HISTORY ARCHIVE</div>
          <h1>Degenesis Timeline</h1>
          <p>
            Compare the general canon chronology with the Spitalian Archives on one shared
            historical axis. Enable either source by itself or display both to compare what each
            record chooses to emphasize.
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
            <div class="year-grid timeline-grid">
              <div v-for="year in years" :key="`year-${year}`" class="year-cell">
                <span>{{ year }}</span>
              </div>
            </div>

            <div v-if="generalEnabled" class="event-grid timeline-grid general-grid">
              <div v-for="year in years" :key="`general-${year}`" class="event-cell">
                <button
                  v-if="eventAt('general', year)"
                  :id="`timeline-${eventAt('general', year)?.id}`"
                  type="button"
                  class="event-marker general-marker"
                  :class="{ selected: selectedEvent?.id === eventAt('general', year)?.id }"
                  @click="selectEvent(eventAt('general', year)!)"
                >
                  <span class="event-year">{{ year }}</span>
                  <span class="event-title">{{ eventAt('general', year)?.title }}</span>
                </button>
              </div>
            </div>

            <div v-if="spitalianEnabled" class="event-grid timeline-grid spitalian-grid">
              <div v-for="year in years" :key="`spitalian-${year}`" class="event-cell">
                <button
                  v-if="eventAt('spitalian', year)"
                  :id="`timeline-${eventAt('spitalian', year)?.id}`"
                  type="button"
                  class="event-marker spitalian-marker"
                  :class="{ selected: selectedEvent?.id === eventAt('spitalian', year)?.id }"
                  @click="selectEvent(eventAt('spitalian', year)!)"
                >
                  <span class="event-year">{{ year }}</span>
                  <span class="event-title">{{ eventAt('spitalian', year)?.title }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="scroll-hint">Scroll horizontally to move through history. Select an event for details.</div>

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
            <div>
              <h2>{{ selectedEvent.title }}</h2>
              <p>{{ selectedEvent.summary }}</p>
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
  timelineSourceInfo,
  type TimelineEvent,
  type TimelineSource
} from '@/config/timeline'

const generalEnabled = ref(true)
const spitalianEnabled = ref(true)
const timelineScroller = ref<HTMLElement | null>(null)

const activeSources = computed<TimelineSource[]>(() => {
  const sources: TimelineSource[] = []
  if (generalEnabled.value) sources.push('general')
  if (spitalianEnabled.value) sources.push('spitalian')
  return sources
})

const visibleEvents = computed(() => {
  return [...generalTimelineEvents, ...spitalianTimelineEvents]
    .filter((event) => activeSources.value.includes(event.source))
    .sort((a, b) => a.year - b.year || a.source.localeCompare(b.source))
})

const years = computed(() => {
  return [...new Set(visibleEvents.value.map((event) => event.year))].sort((a, b) => a - b)
})

const eventIndex = computed(() => {
  const index = new Map<string, TimelineEvent>()
  for (const event of visibleEvents.value) {
    index.set(`${event.source}-${event.year}`, event)
  }
  return index
})

const eventAt = (source: TimelineSource, year: number) => {
  return eventIndex.value.get(`${source}-${year}`)
}

const canvasStyle = computed(() => ({
  '--timeline-columns': String(Math.max(years.value.length, 1))
}))

const selectedEvent = ref<TimelineEvent>(generalTimelineEvents[0])

const selectedIndex = computed(() => {
  if (!selectedEvent.value) return -1
  return visibleEvents.value.findIndex((event) => event.id === selectedEvent.value.id)
})

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
  grid-template-rows: 54px 128px 128px;
  position: relative;
  z-index: 3;
  background: #151515;
  border-right: 1px solid rgba(255, 255, 255, 0.11);
}

.lane-labels.single-lane {
  grid-template-rows: 54px 128px;
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
  width: calc(var(--timeline-columns) * 154px);
  min-width: 100%;
}

.timeline-grid {
  display: grid;
  grid-template-columns: repeat(var(--timeline-columns), minmax(154px, 1fr));
}

.year-grid {
  height: 54px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.018);
}

.year-cell {
  display: flex;
  align-items: center;
  padding-left: 12px;
  color: #8d8d8d;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
  border-left: 1px solid rgba(255, 255, 255, 0.045);
}

.event-grid {
  height: 128px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  position: relative;
}

.event-grid::before {
  content: '';
  position: absolute;
  top: 63px;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.14);
}

.event-cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 8px;
  border-left: 1px solid rgba(255, 255, 255, 0.032);
}

.event-marker {
  position: relative;
  z-index: 1;
  width: 138px;
  min-height: 76px;
  padding: 10px 11px 9px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  background: #1d1d1d;
  color: #e0e0e0;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  transition: transform 120ms ease, border-color 120ms ease, background 120ms ease;
}

.event-marker::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 4px;
}

.event-marker:hover,
.event-marker:focus-visible {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.35);
  background: #252525;
  outline: none;
}

.event-marker.selected {
  border-color: rgba(255, 255, 255, 0.58);
  background: #292929;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12), 0 8px 22px rgba(0, 0, 0, 0.38);
}

.general-marker::before {
  background: #b83236;
}

.spitalian-marker::before {
  background: #78909c;
}

.event-year {
  display: block;
  color: #999;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.event-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-top: 5px;
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.25;
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
  grid-template-columns: minmax(92px, 130px) 1fr;
  gap: clamp(18px, 3vw, 40px);
}

.detail-year {
  color: #d7d7d7;
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  font-weight: 200;
  letter-spacing: -0.04em;
  line-height: 0.9;
}

.detail-heading h2 {
  margin: 0 0 10px;
  color: #f0f0f0;
  font-size: clamp(1.3rem, 2.2vw, 2rem);
  font-weight: 400;
}

.detail-heading p {
  max-width: 980px;
  margin: 0;
  color: #bdbdbd;
  font-size: 0.95rem;
  line-height: 1.7;
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

  .detail-actions {
    grid-template-columns: 1fr 1fr;
  }

  .detail-actions span {
    display: none;
  }
}
</style>

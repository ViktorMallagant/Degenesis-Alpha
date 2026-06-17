<template>
  <div class="changelog">
    <div class="changelog-title">{{ $t('messages.changelog.title') }}</div>
    <div v-if="loading" class="changelog-loading">{{ $t('messages.changelog.loading') }}</div>
    <div v-else-if="error" class="changelog-error">{{ $t('messages.changelog.error') }}</div>
    <ul v-else class="changelog-list">
      <li v-for="entry in entries" :key="entry.sha" class="changelog-entry">
        <span class="changelog-tag" :class="entry.type">{{ entry.type === 'feat' ? 'NEW' : 'FIX' }}</span>
        <span class="changelog-msg">{{ entry.message }}</span>
        <span class="changelog-date">{{ entry.date }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Entry {
  sha: string
  type: 'feat' | 'fix'
  message: string
  date: string
}

const loading = ref(true)
const error = ref(false)
const entries = ref<Entry[]>([])

const REPO = 'Katsu6624/degenesis-parasite.github.io'

onMounted(async () => {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/commits?per_page=100&t=${Date.now()}`)
    if (!res.ok) throw new Error()
    const commits = await res.json()
    const result: Entry[] = []
    for (const c of commits) {
      const msg: string = c.commit.message.split('\n')[0].trim()
      const featMatch = msg.match(/^feat:\s*(.+)$/i)
      const fixMatch = msg.match(/^fix:\s*(.+)$/i)
      if (featMatch || fixMatch) {
        const type = featMatch ? 'feat' : 'fix'
        const message = (featMatch?.[1] ?? fixMatch?.[1] ?? '').trim()
        const raw = c.commit.author.date
        const date = new Date(raw).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
        result.push({ sha: c.sha, type, message, date })
        if (result.length >= 7) break
      }
    }
    entries.value = result
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.changelog {
  font-family: monospace;
  color: #ccc;
}

.changelog-title {
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #fff;
  border-bottom: 1px solid #cc0000;
  padding-bottom: 6px;
  margin-bottom: 12px;
}

.changelog-loading,
.changelog-error {
  font-size: 0.8rem;
  color: #888;
  font-style: italic;
}

.changelog-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.changelog-entry {
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: baseline;
  gap: 10px;
  font-size: 0.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 6px;
}

.changelog-tag {
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  padding: 1px 4px;
  border-radius: 2px;
  text-align: center;
}

.changelog-tag.feat {
  background: #cc0000;
  color: #fff;
}

.changelog-tag.fix {
  background: #444;
  color: #aaa;
}

.changelog-msg {
  color: #ddd;
  line-height: 1.4;
}

.changelog-date {
  color: #555;
  font-size: 0.7rem;
  white-space: nowrap;
}
</style>

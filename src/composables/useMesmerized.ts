import { ref } from 'vue'

const active = ref(false)
const numbers = ref<{ id: number; value: number; style: Record<string, string> }[]>([])
let triggered = false

const POOL = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

function spawnBatch() {
  const count = 15 + Math.floor(Math.random() * 11)
  const batch = []
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 360
    const dist = 30 + Math.random() * 55
    const dx = Math.cos((angle * Math.PI) / 180) * dist
    const dy = Math.sin((angle * Math.PI) / 180) * dist
    const size = 1.2 + Math.random() * 3.5
    const opacity = 0.6 + Math.random() * 0.4
    const duration = 2.5 + Math.random() * 3
    const delay = Math.random() * 1.5
    batch.push({
      id: i,
      value: POOL[Math.floor(Math.random() * POOL.length)],
      style: {
        '--dx': `${dx}vw`,
        '--dy': `${dy}vh`,
        top: `${10 + Math.random() * 80}%`,
        left: `${10 + Math.random() * 80}%`,
        fontSize: `${size}rem`,
        opacity: String(opacity),
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      },
    })
  }
  numbers.value = batch
}

export function triggerMesmerized(baseUrl: string) {
  if (triggered) return
  triggered = true
  const audio1 = new Audio(`${baseUrl}prank/mesmerized.mp3`)
  const audio2 = new Audio(`${baseUrl}prank/mesmerized-voices.mp3`)
  audio1.volume = 0.9
  audio2.volume = 1.0
  active.value = true
  spawnBatch()
  audio1.play()
  audio2.play()
  audio2.addEventListener('ended', () => {
    audio1.pause()
    active.value = false
    numbers.value = []
  })
}

export function useMesmerized() {
  return { active, numbers }
}

import { ref, watch } from 'vue'

const isPlaying = ref(false)
const volume = ref(0.03)
let audio: HTMLAudioElement | null = null

export function useMusicPlayer() {
  function init() {
    if (audio) return
    audio = new Audio(import.meta.env.BASE_URL + 'there-is-no-other.mp3')
    audio.loop = true
    audio.volume = volume.value
  }

  function toggle() {
    init()
    if (isPlaying.value) {
      audio!.pause()
      isPlaying.value = false
    } else {
      audio!.play()
      isPlaying.value = true
    }
  }

  function setVolume(v: number) {
    volume.value = v
    if (audio) audio.volume = v
  }

  watch(volume, (v) => {
    if (audio) audio.volume = v
  })

  return { isPlaying, volume, toggle, setVolume }
}

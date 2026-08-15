import { Character } from './character'

const loadCharacter = (name: string) => {
  const saved = localStorage.getItem(`character-${name}`)
  if (saved) {
    const parsed: Character = JSON.parse(saved)
    return parsed
  }
  return undefined
}

const isQuotaExceeded = (error: unknown): boolean => {
  const e = error as { name?: string; code?: number }
  return (
    e?.name === 'QuotaExceededError' ||
    e?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    e?.code === 22 ||
    e?.code === 1014
  )
}

const tryStoreCharacter = (key: string, character: unknown): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(character))
    return true
  } catch (error) {
    if (!isQuotaExceeded(error)) throw error
    return false
  }
}

const storeCharacter = (character: Character) => {
  const key = `character-${character.name}`

  // Normal path: preserve every image variant.
  if (tryStoreCharacter(key, character)) return 'full'

  // The high-resolution source is useful for re-cropping, but redundant for
  // displaying the character. Drop it first if browser storage is exhausted.
  const withoutOriginal = {
    ...character,
    portraitOriginal: undefined,
  }
  if (tryStoreCharacter(key, withoutOriginal)) {
    console.warn(`Character ${character.name} saved without portraitOriginal because localStorage is full.`)
    return 'withoutOriginal'
  }

  // Preserve one usable portrait before sacrificing image data entirely.
  const preferredPortrait = character.portraitFiche || character.portrait || character.portraitOriginal
  const singlePortrait = {
    ...character,
    portrait: preferredPortrait || undefined,
    portraitOriginal: undefined,
    portraitFiche: undefined,
  }
  if (tryStoreCharacter(key, singlePortrait)) {
    console.warn(`Character ${character.name} saved with a single portrait because localStorage is full.`)
    return 'singlePortrait'
  }

  // Last resort: never allow an image quota problem to prevent age, gender,
  // potentials, inventory, etc. from being persisted.
  const metadataOnly = {
    ...character,
    portrait: undefined,
    portraitOriginal: undefined,
    portraitFiche: undefined,
  }
  if (tryStoreCharacter(key, metadataOnly)) {
    console.warn(`Character ${character.name} saved without portrait data because localStorage is full.`)
    return 'metadataOnly'
  }

  console.error(`Unable to persist character ${character.name}: localStorage quota is exhausted.`)
  return 'failed'
}

const deleteCharacter = (name: string) => {
  localStorage.removeItem(`character-${name}`)
}

const keyToCharacterName = (localStorageKey: string) =>
  localStorageKey.replace(new RegExp(/^character-/), '')

const loadAllCharacterNames = () => {
  return Object.keys(localStorage)
    .filter((localStorageKey) => localStorageKey.startsWith('character-'))
    .map(keyToCharacterName)
    .sort((a, b) => (a > b ? -1 : 1))
}

const loadAllCharacters = () => {
  return loadAllCharacterNames().flatMap((name) => {
    const char = loadCharacter(name)
    if (char) {
      return [{
        name: name,
        character: char
      }]
    }
    return []
  })
}

const characterIsStored = (name: string) => {
  return loadAllCharacterNames().includes(name)
}

const loadLocale = () => {
  return localStorage.getItem('locale')
}

const storeLocale = (locale: string) => {
  localStorage.setItem('locale', locale)
}

const storeHasUnlockedBeta = () => {
  localStorage.setItem('beta-unlock', 'true')
}

const loadHasUnlockedBeta = () => {
  return localStorage.getItem('beta-unlock') == 'true'
}

const loadDisplayTranslatedLabels = (): boolean => {
  return localStorage.getItem('preference-display-translated-labels') == 'true'
}

const storeDisplayTranslatedLabels = (value: boolean) => {
  localStorage.setItem('preference-display-translated-labels', value.toString())
}

export default {
  loadCharacter,
  storeCharacter,
  deleteCharacter,
  loadAllCharacters,
  characterIsStored,
  loadLocale,
  storeLocale,
  storeHasUnlockedBeta,
  loadHasUnlockedBeta,
  loadDisplayTranslatedLabels,
  storeDisplayTranslatedLabels
}

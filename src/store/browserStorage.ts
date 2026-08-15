import { Character } from './character'
import portraitStorage, { type PortraitData } from './portraitStorage'

const characterKey = (name: string) => `character-${name}`

const stripPortraits = (character: Character): Character => ({
  ...character,
  portrait: undefined,
  portraitOriginal: undefined,
  portraitFiche: undefined,
}) as Character

const extractPortraits = (character: Character): PortraitData => ({
  portrait: character.portrait || undefined,
  portraitOriginal: character.portraitOriginal || undefined,
  portraitFiche: character.portraitFiche || undefined,
})

const hasPortraitData = (character: Character): boolean =>
  Boolean(character.portrait || character.portraitOriginal || character.portraitFiche)

const mergeCachedPortraits = (character: Character): Character => {
  const cached = portraitStorage.getPortraits(character.name)
  if (!cached) return character

  return {
    ...character,
    portrait: cached.portrait ?? character.portrait,
    portraitOriginal: cached.portraitOriginal ?? character.portraitOriginal,
    portraitFiche: cached.portraitFiche ?? character.portraitFiche,
  } as Character
}

const loadCharacter = (name: string) => {
  const saved = localStorage.getItem(characterKey(name))
  if (saved) {
    const parsed: Character = JSON.parse(saved)
    return mergeCachedPortraits(parsed)
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

const storeCharacterInLocalStorageFallback = (character: Character) => {
  const key = characterKey(character.name)

  if (tryStoreCharacter(key, character)) return 'full'

  const withoutOriginal = {
    ...character,
    portraitOriginal: undefined,
  }
  if (tryStoreCharacter(key, withoutOriginal)) return 'withoutOriginal'

  const preferredPortrait = character.portraitFiche || character.portrait || character.portraitOriginal
  const singlePortrait = {
    ...character,
    portrait: preferredPortrait || undefined,
    portraitOriginal: undefined,
    portraitFiche: undefined,
  }
  if (tryStoreCharacter(key, singlePortrait)) return 'singlePortrait'

  const metadataOnly = stripPortraits(character)
  if (tryStoreCharacter(key, metadataOnly)) return 'metadataOnly'

  console.error(`Unable to persist character ${character.name}: localStorage quota is exhausted.`)
  return 'failed'
}

const storeCharacter = (character: Character) => {
  if (!portraitStorage.isAvailable()) {
    return storeCharacterInLocalStorageFallback(character)
  }

  const key = characterKey(character.name)
  const metadataOnly = stripPortraits(character)

  // Character mechanics remain synchronous and tiny in localStorage.
  if (!tryStoreCharacter(key, metadataOnly)) {
    console.error(`Unable to persist character ${character.name}: localStorage quota is exhausted.`)
    return 'failed'
  }

  const portraits = extractPortraits(character)
  void portraitStorage.storePortraits(character.name, portraits).catch((error) => {
    console.error(`Unable to persist portraits for ${character.name} in IndexedDB.`, error)

    // Rare fallback for browsers that lose IndexedDB access mid-session: retain
    // one useful image locally without allowing portraits to block metadata saves.
    const preferredPortrait = portraits.portraitFiche || portraits.portrait || portraits.portraitOriginal
    if (preferredPortrait) {
      tryStoreCharacter(key, { ...metadataOnly, portrait: preferredPortrait })
    }
  })

  return 'indexedDB'
}

const deleteCharacter = (name: string) => {
  localStorage.removeItem(characterKey(name))
  void portraitStorage.deletePortraits(name).catch((error) => {
    console.warn(`Unable to remove IndexedDB portrait data for ${name}.`, error)
  })
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

/**
 * Load the IndexedDB portrait cache before Vue mounts, then migrate any legacy
 * portrait data embedded in character localStorage records. A character is only
 * stripped from localStorage after its portrait data has been written to
 * IndexedDB successfully, so migration is lossless and safely retryable.
 */
const initializeStorage = async (): Promise<void> => {
  const indexedDbReady = await portraitStorage.initialize()
  if (!indexedDbReady) return

  for (const name of loadAllCharacterNames()) {
    const key = characterKey(name)
    const saved = localStorage.getItem(key)
    if (!saved) continue

    try {
      const parsed = JSON.parse(saved) as Character
      if (!hasPortraitData(parsed)) continue

      await portraitStorage.storePortraits(name, extractPortraits(parsed))
      localStorage.setItem(key, JSON.stringify(stripPortraits(parsed)))
    } catch (error) {
      // Leave this character untouched in localStorage. Migration will retry on
      // the next page load rather than risking portrait loss.
      console.warn(`Portrait migration deferred for ${name}.`, error)
    }
  }
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
  initializeStorage,
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

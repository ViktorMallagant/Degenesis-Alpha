export interface PortraitData {
  portrait?: string
  portraitOriginal?: string
  portraitFiche?: string
}

interface PortraitRecord extends PortraitData {
  name: string
}

const DB_NAME = 'degenesis-alpha'
const DB_VERSION = 1
const STORE_NAME = 'portraits'

const portraitCache = new Map<string, PortraitData>()
let dbPromise: Promise<IDBDatabase> | null = null
let available = false

const openDatabase = (): Promise<IDBDatabase> => {
  if (dbPromise) return dbPromise

  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not available in this browser.'))
      return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'name' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('Unable to open portrait database.'))
  })

  return dbPromise
}

const requestToPromise = <T>(request: IDBRequest<T>): Promise<T> =>
  new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed.'))
  })

const transactionDone = (transaction: IDBTransaction): Promise<void> =>
  new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB transaction failed.'))
    transaction.onabort = () => reject(transaction.error ?? new Error('IndexedDB transaction was aborted.'))
  })

const normalizePortraits = (data: PortraitData): PortraitData => {
  const normalized: PortraitData = {}
  if (data.portrait) normalized.portrait = data.portrait
  if (data.portraitOriginal) normalized.portraitOriginal = data.portraitOriginal
  if (data.portraitFiche) normalized.portraitFiche = data.portraitFiche
  return normalized
}

const hasPortraitData = (data: PortraitData): boolean =>
  Boolean(data.portrait || data.portraitOriginal || data.portraitFiche)

const initialize = async (): Promise<boolean> => {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(STORE_NAME, 'readonly')
    const records = await requestToPromise(
      transaction.objectStore(STORE_NAME).getAll() as IDBRequest<PortraitRecord[]>
    )

    portraitCache.clear()
    records.forEach(({ name, portrait, portraitOriginal, portraitFiche }) => {
      portraitCache.set(name, normalizePortraits({ portrait, portraitOriginal, portraitFiche }))
    })
    available = true
    return true
  } catch (error) {
    available = false
    console.warn('IndexedDB portrait storage is unavailable; using localStorage fallback.', error)
    return false
  }
}

const getPortraits = (name: string): PortraitData | undefined => portraitCache.get(name)

const storePortraits = async (name: string, data: PortraitData): Promise<void> => {
  const normalized = normalizePortraits(data)

  if (!hasPortraitData(normalized)) {
    await deletePortraits(name)
    return
  }

  // Update synchronously so the rest of the app can continue using synchronous
  // character loading even though IndexedDB itself is asynchronous.
  portraitCache.set(name, normalized)

  if (!available) throw new Error('IndexedDB portrait storage is unavailable.')

  const db = await openDatabase()
  const transaction = db.transaction(STORE_NAME, 'readwrite')
  transaction.objectStore(STORE_NAME).put({ name, ...normalized } satisfies PortraitRecord)
  await transactionDone(transaction)
}

const deletePortraits = async (name: string): Promise<void> => {
  portraitCache.delete(name)
  if (!available) return

  const db = await openDatabase()
  const transaction = db.transaction(STORE_NAME, 'readwrite')
  transaction.objectStore(STORE_NAME).delete(name)
  await transactionDone(transaction)
}

const isAvailable = (): boolean => available

export default {
  initialize,
  getPortraits,
  storePortraits,
  deletePortraits,
  isAvailable,
}

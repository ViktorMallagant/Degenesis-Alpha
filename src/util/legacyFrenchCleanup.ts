import { watch } from 'vue'

/**
 * A small compatibility layer for French text that predates the i18n conversion
 * and is still hard-coded in legacy Vue/templates or standalone scripts.
 *
 * This only translates while the active locale is English. When the locale
 * changes away from English, any DOM text changed by this layer is restored so
 * the proper locale can render normally.
 */
const exactFrenchToEnglish = new Map<string, string>([
  ['Fiche en lecture seule', 'Read-only character sheet'],
  [
    'Cette fiche est partagée en mode lecture seule. Les modifications sont désactivées.',
    'This character sheet is shared in read-only mode. Editing is disabled.'
  ],
  ['Anomalies détectées', 'Issues detected'],
  ['Lien copié dans le presse-papier !', 'Link copied to clipboard!'],
  [
    "C'est ta propre fiche — elle s'est ouverte depuis ta sauvegarde locale.",
    'This is your own character sheet — it has been opened from your local save.'
  ],
  ['Générer Aléatoirement', 'Randomize'],

  // Emergency fallback names from the legacy standalone rank-tree script.
  ['Médiateur', 'Mediator'],
  ['Diffuseur', 'Streamer'],
  ['Paradigme', 'Paradigma'],
  ['Occulteur', 'Shutter'],
  ['Fusible', 'Fuse'],
  ['Zéro', 'Zero'],
  ['Aiguilles', 'Needle']
])

const frenchPatterns: Array<[RegExp, string]> = [
  [/\bAncien Culte\s*:/g, 'Former Cult:'],
  [/\bMalus(?=\s*[-−])/g, 'Penalty'],
  [/\bNiv\.\s*(\d+)/g, 'Lvl. $1'],
  [/\bniv\.\s*(\d+)/g, 'lvl. $1'],
  [/(\d+)\s+av\./g, '$1 adv.'],
  [/\bRess\.\s*Entrepreneur\b/g, 'Entrepreneur Res.'],
  [/\bRessources\b/g, 'Resources'],
  [/\bGratuit\b/g, 'Free'],
  [/\bAttribut\s+(\d+)\b/g, 'Attribute $1'],
  [/\bBase\s+:/g, 'Base:']
]

function preserveOuterWhitespace(source: string, replacement: string): string {
  const leading = source.match(/^\s*/)?.[0] ?? ''
  const trailing = source.match(/\s*$/)?.[0] ?? ''
  return `${leading}${replacement}${trailing}`
}

export function translateLegacyFrenchText(source: string): string {
  const trimmed = source.trim()
  const exact = exactFrenchToEnglish.get(trimmed)
  if (exact !== undefined) return preserveOuterWhitespace(source, exact)

  return frenchPatterns.reduce(
    (value, [pattern, replacement]) => value.replace(pattern, replacement),
    source
  )
}

export function installLegacyFrenchCleanup(getLocale: () => string): void {
  const originalText = new WeakMap<Text, string>()
  const originalAttributes = new WeakMap<Element, Map<string, string>>()
  const watchedAttributes = ['title', 'aria-label', 'placeholder']

  const processText = (node: Text) => {
    const previousOriginal = originalText.get(node)

    if (getLocale() !== 'en') {
      if (
        previousOriginal !== undefined &&
        node.data === translateLegacyFrenchText(previousOriginal)
      ) {
        node.data = previousOriginal
      }
      originalText.delete(node)
      return
    }

    if (previousOriginal !== undefined) {
      const previousTranslation = translateLegacyFrenchText(previousOriginal)
      if (node.data === previousTranslation) return

      // Vue may have replaced a dynamic value (for example Niv. 1 -> Niv. 2).
      // Treat that fresh value as the new source instead of restoring stale text.
      if (node.data !== previousOriginal) originalText.set(node, node.data)
    } else {
      originalText.set(node, node.data)
    }

    const source = originalText.get(node) ?? node.data
    const translated = translateLegacyFrenchText(source)
    if (translated !== node.data) node.data = translated
  }

  const processElementAttributes = (element: Element) => {
    let originals = originalAttributes.get(element)

    for (const name of watchedAttributes) {
      const current = element.getAttribute(name)
      if (current == null) continue

      const previousOriginal = originals?.get(name)
      if (getLocale() !== 'en') {
        if (
          previousOriginal !== undefined &&
          current === translateLegacyFrenchText(previousOriginal)
        ) {
          element.setAttribute(name, previousOriginal)
        }
        originals?.delete(name)
        continue
      }

      if (!originals) {
        originals = new Map<string, string>()
        originalAttributes.set(element, originals)
      }

      if (previousOriginal !== undefined) {
        const previousTranslation = translateLegacyFrenchText(previousOriginal)
        if (current === previousTranslation) continue
        if (current !== previousOriginal) originals.set(name, current)
      } else {
        originals.set(name, current)
      }

      const source = originals.get(name) ?? current
      const translated = translateLegacyFrenchText(source)
      if (translated !== current) element.setAttribute(name, translated)
    }
  }

  const processTree = (root: Node) => {
    if (root.nodeType === Node.TEXT_NODE) {
      processText(root as Text)
      return
    }

    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return

    if (root.nodeType === Node.ELEMENT_NODE) processElementAttributes(root as Element)

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
    )
    let current = walker.nextNode()
    while (current) {
      if (current.nodeType === Node.TEXT_NODE) processText(current as Text)
      else processElementAttributes(current as Element)
      current = walker.nextNode()
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        processText(mutation.target as Text)
      } else if (mutation.type === 'attributes') {
        processElementAttributes(mutation.target as Element)
      } else {
        mutation.addedNodes.forEach(processTree)
      }
    }
  })

  if (document.documentElement) {
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: watchedAttributes
    })
    processTree(document.documentElement)
  }

  watch(
    () => getLocale(),
    () => {
      if (document.documentElement) processTree(document.documentElement)
    }
  )

  // A few old utilities use native browser dialogs rather than Vue components.
  // Translate only known legacy French strings and leave every other message alone.
  const nativeAlert = window.alert.bind(window)
  const nativeConfirm = window.confirm.bind(window)
  const nativePrompt = window.prompt.bind(window)

  window.alert = (message?: unknown) =>
    nativeAlert(
      getLocale() === 'en' && typeof message === 'string'
        ? translateLegacyFrenchText(message)
        : message as any
    )

  window.confirm = (message?: string) =>
    nativeConfirm(
      getLocale() === 'en' && typeof message === 'string'
        ? translateLegacyFrenchText(message)
        : message
    )

  window.prompt = (message?: string, defaultValue?: string) =>
    nativePrompt(
      getLocale() === 'en' && typeof message === 'string'
        ? translateLegacyFrenchText(message)
        : message,
      defaultValue
    )
}

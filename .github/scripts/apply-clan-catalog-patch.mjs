import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'

const catalogPath = 'src/config/messages/clans/catalog.ts'
const patchPath = '.github/clan-catalog-patch.ts'

if (!existsSync(patchPath)) {
  console.log('No clan catalog patch to apply.')
  process.exit(0)
}

let catalog = readFileSync(catalogPath, 'utf8')
const patch = readFileSync(patchPath, 'utf8').trim()

function findObjectDefinition(source, name) {
  const marker = `const ${name} =`
  const start = source.indexOf(marker)
  if (start < 0) return null

  const braceStart = source.indexOf('{', start + marker.length)
  if (braceStart < 0) throw new Error(`Opening brace not found for ${name}`)

  let depth = 0
  let quote = null
  let escaped = false

  for (let i = braceStart; i < source.length; i++) {
    const ch = source[i]

    if (quote) {
      if (escaped) {
        escaped = false
        continue
      }
      if (ch === '\\') {
        escaped = true
        continue
      }
      if (ch === quote) quote = null
      continue
    }

    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch
      continue
    }

    if (ch === '{') depth++
    if (ch === '}') {
      depth--
      if (depth === 0) {
        let end = i + 1
        while (source[end] === '\r' || source[end] === '\n') end++
        return { start, end }
      }
    }
  }

  throw new Error(`Closing brace not found for ${name}`)
}

const definitions = [...patch.matchAll(/^const\s+([A-Za-z0-9_]+(?:Clans|Ranks|Potentials))\s*=/gm)]
  .map(match => match[1])

if (definitions.length === 0) {
  throw new Error('Clan patch contains no Clans, Ranks, or Potentials objects.')
}

const newBlocks = []
for (const name of definitions) {
  const patchRange = findObjectDefinition(patch, name)
  if (!patchRange) throw new Error(`Patch object not found: ${name}`)
  const block = patch.slice(patchRange.start, patchRange.end).trimEnd()

  const existingRange = findObjectDefinition(catalog, name)
  if (existingRange) {
    catalog = catalog.slice(0, existingRange.start) + block + '\n\n' + catalog.slice(existingRange.end)
  } else {
    newBlocks.push(block)
  }
}

if (newBlocks.length > 0) {
  const marker = 'const sharedClans = {'
  const index = catalog.indexOf(marker)
  if (index < 0) throw new Error('sharedClans marker not found')
  catalog = catalog.slice(0, index) + newBlocks.join('\n\n') + '\n\n' + catalog.slice(index)
}

const sharedMap = {
  Clans: 'sharedClans',
  Ranks: 'sharedRanks',
  Potentials: 'sharedPotentials'
}

for (const name of definitions) {
  const suffix = Object.keys(sharedMap).find(value => name.endsWith(value))
  if (!suffix) continue

  const sharedName = sharedMap[suffix]
  const spread = `  ...${name},`
  if (catalog.includes(spread)) continue

  const marker = `const ${sharedName} = {\n`
  if (!catalog.includes(marker)) throw new Error(`${sharedName} marker not found`)
  catalog = catalog.replace(marker, `${marker}${spread}\n`)
}

writeFileSync(catalogPath, catalog)
unlinkSync(patchPath)
console.log(`Applied ${definitions.length} clan catalog object(s).`)

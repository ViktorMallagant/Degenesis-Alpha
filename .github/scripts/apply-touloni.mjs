import { readFileSync, writeFileSync } from 'node:fs'

const catalogPath = 'src/config/messages/clans/catalog.ts'
const blockPath = '.github/touloni-catalog-block.txt'

let catalog = readFileSync(catalogPath, 'utf8')
const block = readFileSync(blockPath, 'utf8').trimEnd()

if (!catalog.includes('const touloniClans = {')) {
  const marker = 'const sharedClans = {'
  if (!catalog.includes(marker)) throw new Error('sharedClans marker not found')
  catalog = catalog.replace(marker, `${block}\n\n${marker}`)
}

const additions = [
  ['const sharedClans = {\n', 'const sharedClans = {\n  ...touloniClans,\n', '...touloniClans,'],
  ['const sharedRanks = {\n', 'const sharedRanks = {\n  ...touloniRanks,\n', '...touloniRanks,'],
  ['const sharedPotentials = {\n', 'const sharedPotentials = {\n  ...touloniPotentials,\n', '...touloniPotentials,']
]

for (const [marker, replacement, sentinel] of additions) {
  if (!catalog.includes(sentinel)) {
    if (!catalog.includes(marker)) throw new Error(`Marker not found: ${marker}`)
    catalog = catalog.replace(marker, replacement)
  }
}

writeFileSync(catalogPath, catalog)

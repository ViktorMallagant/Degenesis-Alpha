import { expect, test } from 'vitest'
import localizedMessages from '../../src/config/messages'

test('normalizes Réactivité to Reaction in English without changing French', () => {
  expect(JSON.stringify(localizedMessages.en)).not.toContain('Réactivité')
  expect(localizedMessages.en.culturesConceptsCults.hellveticsDescription).toContain('Reaction')
  expect(localizedMessages.fr.skills.reaction).toBe('Réactivité')
})

test('normalizes Distributor terminology to Dispenser in English', () => {
  expect(JSON.stringify(localizedMessages.en)).not.toMatch(/\bDistributors?\b/)
  expect(localizedMessages.en.ranks.solarDescription).toContain("Dispensers' generators")
  expect(localizedMessages.en.ranks.solarDescription).toContain("Dispenser's technology")
})

test('normalizes the Drives skill to Primal without changing ordinary prose', () => {
  const englishMessages = JSON.stringify(localizedMessages.en)

  expect(englishMessages).not.toMatch(/\bDrives\b/)
  expect(localizedMessages.en.potentials.artifactSenseDescription).toContain('INS+Primal')
  expect(localizedMessages.en.potentials.afterlifeDescription).toContain('Primal value')
  expect(localizedMessages.en.potentials.soulDrainDescription).toContain('Primal skill')
  expect(localizedMessages.en.potentials.dangerSenseDescription).toContain('wariness drives them')
})

import { expect, test } from 'vitest'
import localizedMessages from '../../src/config/messages'

test('normalizes Réactivité to Reaction in English without changing French', () => {
  expect(JSON.stringify(localizedMessages.en)).not.toContain('Réactivité')
  expect(localizedMessages.en.culturesConceptsCults.hellveticsDescription).toContain('Reaction')
  expect(localizedMessages.fr.skills.reaction).toBe('Réactivité')
})

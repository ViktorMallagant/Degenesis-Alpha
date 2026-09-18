import { beforeEach, describe, expect, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCharacterStore } from '../../src/store'
import { defaultOtherDetails } from '../../src/config/otherDetails'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Other character details', () => {
  test('begin empty and are saved and restored', () => {
    const store = useCharacterStore()
    expect(store.other).toEqual(defaultOtherDetails())

    store.other.scars.groupName = 'The Ashen Hand'
    store.other.scars.infamy = 4
    store.other.complications = 'Owes the Judges\nMarked by the Primer'
    store.other.artifacts[0].name = 'Sonic Key'
    store.other.notes[9] = 'Meet the Chronicler at dawn.'

    const character = store.asCharacter
    store.$reset()
    store.loadCharacter(character)

    expect(store.other.scars.groupName).toBe('The Ashen Hand')
    expect(store.other.scars.infamy).toBe(4)
    expect(store.other.complications).toContain('Marked by the Primer')
    expect(store.other.artifacts[0].name).toBe('Sonic Key')
    expect(store.other.notes[9]).toBe('Meet the Chronicler at dawn.')
  })

  test('normalizes missing rows and clamps infamy', () => {
    const store = useCharacterStore()
    const character = store.asCharacter
    character.other = {
      scars: {
        groupName: 'Scars',
        alignment: '',
        constellation: '',
        scarsValue: '',
        infamy: 99
      },
      artifacts: [{ name: 'One', activation: '', operation: '', appraisalValue: '' }],
      notes: ['First']
    }

    store.loadCharacter(character)

    expect(store.other.scars.infamy).toBe(6)
    expect(store.other.artifacts).toHaveLength(3)
    expect(store.other.notes).toHaveLength(10)
    expect(store.other.notes[0]).toBe('First')
  })
})

import { setActivePinia, createPinia } from 'pinia'
import { useCharacterStore } from '../../src/store/index'
import { expect, test, beforeEach } from 'vitest'

import { Attributes, Origins, Skills } from '../../src/config/properties'
import config from '../../src/config'
import { EditorMode } from '../../src/config/modes'
import { Asceticism } from '../../src/config/potentials/common'
import { Character } from '../../src/store/character'
import { Recruit } from '../../src/config/cults/spitalians/ranks'
import { Scout } from '../../src/config/cults/clanners/clans/hunterGatherers'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('An unmodified character has zero spent points', () => {
  const store = useCharacterStore()
  expect(store.spentPoints.attributes).toEqual(0)
  expect(store.spentPoints.skills).toEqual(0)
  expect(store.spentPoints.origins).toEqual(0)
})

test('A character is exported', () => {
  const store = useCharacterStore()

  // Given the state contains various values
  inputSampleCharacter(store)

  // When the character is exported
  const character = store.asCharacter

  // Then the values reflect the state prior to export
  expect(character.name).toEqual('test name')

  expect(character.attributes.filter((v) => v[0] === Attributes.agility.name)[0]).toEqual([
    Attributes.agility.name,
    2
  ])
  expect(character.attributes.filter((v) => v[0] === Attributes.body.name)[0]).toEqual([
    Attributes.body.name,
    1
  ])

  expect(character.skills.filter((v) => v[0] === Skills.focus.name)[0]).toEqual([
    Skills.focus.name,
    1
  ])
  expect(character.skills.filter((v) => v[0] === Skills.artifactLore.name)[0]).toEqual([
    Skills.artifactLore.name,
    0
  ])

  expect(character.origins.filter((v) => v[0] === Origins.allies.name)[0]).toEqual([
    Origins.allies.name,
    1
  ])
  expect(character.origins.filter((v) => v[0] === Origins.resources.name)[0]).toEqual([
    Origins.resources.name,
    0
  ])

  expect(character.culture).toEqual(config.cultures.Africa.name)
  expect(character.concept).toEqual(config.concepts.Disciple.name)
  expect(character.cult).toEqual(config.cults.Clanners.name)
  expect(character.clan).toEqual(config.clans.HunterGatherers.name)
  expect(character.rank).toEqual(Scout.name)

  expect(character.age).toEqual('test age')
  expect(character.gender).toEqual('test gender')
  expect(character.height).toEqual('test height')
  expect(character.weight).toEqual('test weight')

  expect(character.potentials).toEqual([[Asceticism.name, 2]])

  // The legacy free mode flag is not exported, since it has been replaced by editorMode
  expect(character.editorMode).toEqual(EditorMode.Free)
})

test('Exporting and importing does not change a character', () => {
  const store = useCharacterStore()

  // Given the state contains various values
  inputSampleCharacter(store)

  // When the character is exported, imported and exported again
  const character = store.asCharacter
  store.loadCharacter(character)
  const importedCharacter = store.asCharacter

  // Then the initial character and the re-exported character are the same
  expect(character).toEqual(importedCharacter)
})

test('Character without optional attributes can be deserialized', () => {
  const store = useCharacterStore()

  const characterJson =
    '{"storageVersion":"v1","name":"test","culture":"borca","concept":"adventurer","cult":"spitalians","rank":"recruit","attributes":[["body",4],["agility",1],["charisma",1],["intellect",1],["psyche",3],["instinct",1]],"skills":[["athletics",0],["brawl",0],["force",0],["melee",0],["stamina",0],["toughness",4],["crafting",0],["dexterity",0],["navigation",0],["mobility",0],["projectiles",0],["stealth",0],["arts",0],["conduct",0],["expression",0],["leadership",0],["negotiation",0],["seduction",0],["artifactLore",0],["engineering",0],["focus",0],["legends",0],["medicine",0],["science",0],["cunning",0],["deception",0],["domination",0],["faith",0],["reaction",0],["willpower",2],["empathy",0],["orienteering",0],["perception",0],["primal",2],["survival",0],["taming",0]],"origins":[["allies",0],["authority",0],["network",0],["renown",3],["resources",0],["secrets",0]]}'
  const parsed: Character = JSON.parse(characterJson)
  expect(parsed.storageVersion).toEqual('v1')

  store.loadCharacter(parsed)
  expect(store.rank.name).toEqual(Recruit.name)
  expect(store.age).toEqual('')
  expect(store.gender).toEqual('')
  expect(store.height).toEqual('')
  expect(store.weight).toEqual('')
  expect(store.editorMode).toEqual(EditorMode.Default)

  expect(store.potentials).toEqual(new Map())
})

function inputSampleCharacter(store) {
  store.setCharacterName('test name')
  store.setEditorMode(EditorMode.Free)
  store.setAttribute(Attributes.agility, 2)
  store.setSkill(Skills.focus, 1)
  store.setOrigin(Origins.allies, 1)
  store.setCulture(config.cultures.Africa)
  store.setConcept(config.concepts.Disciple)
  store.setCult(config.cults.Clanners)
  store.setClan(config.clans.HunterGatherers)
  store.setRank(Scout)
  store.setPotential(Asceticism, 2)

  store.age = 'test age'
  store.gender = 'test gender'
  store.height = 'test height'
  store.weight = 'test weight'
}

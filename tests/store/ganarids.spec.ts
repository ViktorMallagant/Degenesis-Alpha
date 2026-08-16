import { expect, test } from 'vitest'
import config from '../../src/config'
import { ranksByCult } from '../../src/config/cults/cults'
import { cultSpecificPotentials } from '../../src/config/potentials'
import { Skills } from '../../src/config/properties'
import { ganaridsMessages } from '../../src/config/messages/clans/ganarids'

test('Ganarids uses its dedicated preferred skills and rank tree', () => {
  const clan = config.clans.Ganarids

  expect(clan.bonusSkillNames).toEqual([
    'stealth',
    'conduct',
    'expression',
    'deception',
    'empathy'
  ])

  const ranks = ranksByCult(config.cults.Clanners, clan)
  expect(ranks.map((rank) => rank.name)).toEqual([
    'ganarids-grub',
    'ganarids-larva',
    'ganarids-pupa',
    'ganarids-imago',
    'ganarids-moth'
  ])
  expect(ranks.map((rank) => rank.hierarchyLevel)).toEqual([1, 2, 3, 4, 5])
})

test('Harmonious is available only to Ganarids and displays its infestation prerequisite', () => {
  const ganaridPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Ganarids)
    .map((potential) => potential.name)
  const druidPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Druids)
    .map((potential) => potential.name)

  expect(ganaridPotentials).toContain('harmonious')
  expect(druidPotentials).not.toContain('harmonious')
  expect(ganaridsMessages.en.potentials.harmoniousDescription).toContain('Spore Infestation (5)')
})

test('Moth accepts either Faith 11 or Willpower 11', () => {
  const moth = ranksByCult(config.cults.Clanners, config.clans.Ganarids)
    .find((rank) => rank.name === 'ganarids-moth')

  expect(moth).toBeDefined()
  const faithOrWillpower = moth?.requiredSkills[0]
  expect(faithOrWillpower?.check([Skills.faith.withValue(11)])).toBe(true)
  expect(faithOrWillpower?.check([Skills.willpower.withValue(11)])).toBe(true)
  expect(faithOrWillpower?.check([Skills.faith.withValue(10), Skills.willpower.withValue(10)])).toBe(false)
})

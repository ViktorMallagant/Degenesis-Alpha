import { expect, test } from 'vitest'
import config from '../../src/config'
import { ranksByCult } from '../../src/config/cults/cults'
import { cultSpecificPotentials } from '../../src/config/potentials'
import { Origins, Skills } from '../../src/config/properties'

test('Druids uses its dedicated preferred skills and rank tree', () => {
  const clan = config.clans.Druids

  expect(clan.bonusSkillNames).toEqual([
    'athletics',
    'stealth',
    'artifactLore',
    'survival',
    'taming'
  ])

  const ranks = ranksByCult(config.cults.Clanners, clan)
  expect(ranks.map((rank) => rank.name)).toEqual([
    'druids-relay',
    'druids-resistor',
    'druids-battery',
    'druids-solenoid',
    'druids-amplifier',
    'druids-conductor',
    'druids-diode',
    'druids-simulacrum'
  ])
  expect(ranks.map((rank) => rank.hierarchyLevel)).toEqual([1, 2, 2, 3, 3, 4, 5, 5])
})

test("Nature's Canon is available only to Druids", () => {
  const druidPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Druids)
    .map((potential) => potential.name)
  const pictonPotentials = cultSpecificPotentials(config.cults.Clanners, config.clans.Pictons)
    .map((potential) => potential.name)

  expect(druidPotentials).toContain('naturesCanon')
  expect(pictonPotentials).not.toContain('naturesCanon')
})

test('Conductor enforces its Authority requirement', () => {
  const conductor = ranksByCult(config.cults.Clanners, config.clans.Druids)
    .find((rank) => rank.name === 'druids-conductor')

  expect(conductor).toBeDefined()
  expect(conductor?.requiredOrigins[0].check([Origins.authority.withValue(4)])).toBe(true)
  expect(conductor?.requiredOrigins[0].check([Origins.authority.withValue(3)])).toBe(false)
})

test('Diode and Simulacrum enforce their high-level skill requirements', () => {
  const ranks = ranksByCult(config.cults.Clanners, config.clans.Druids)
  const diode = ranks.find((rank) => rank.name === 'druids-diode')
  const simulacrum = ranks.find((rank) => rank.name === 'druids-simulacrum')

  expect(diode).toBeDefined()
  expect(diode?.requiredSkills[0].check([Skills.deception.withValue(11)])).toBe(true)
  expect(diode?.requiredSkills[0].check([Skills.deception.withValue(10)])).toBe(false)
  expect(diode?.requiredOrigins[0].check([Origins.network.withValue(5)])).toBe(true)

  expect(simulacrum).toBeDefined()
  expect(simulacrum?.requiredSkills[0].check([Skills.toughness.withValue(10)])).toBe(true)
  expect(simulacrum?.requiredSkills[0].check([Skills.toughness.withValue(9)])).toBe(false)
})

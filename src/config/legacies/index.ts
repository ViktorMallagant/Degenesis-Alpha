import type { Attribute, Origin, Skill, SkillWithAttribute, Value } from '../properties'
import type { Concept } from '../model'

import type { Legacy } from './legacy'
import { Legacies } from './legacies'

export const AllLegacies: Legacy[] = Array.from(Legacies.values())

export const PotentialsByName = new Map(
  AllLegacies.map((legacy) => [legacy.name, legacy])
)

export function eligibleLegacies(
  attributes: Array<Value<Attribute>>,
  skills: Array<Value<SkillWithAttribute>>,
  origins: Array<Value<Origin>>,
  mentalPowerSkill: Skill,
  mentalResistanceSkill: Skill,
  concept: Concept,
): Set<Legacy> {
  return new Set(
    AllLegacies.filter((legacy) =>
      legacy.isAttainable(
        attributes,
        skills,
        origins,
        mentalPowerSkill,
        mentalResistanceSkill,
        concept,
      )
    )
  )
}

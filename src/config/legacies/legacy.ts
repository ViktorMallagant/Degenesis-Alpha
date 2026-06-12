import type { Concept } from '../model'
import type { Attribute, Origin, Skill, SkillWithAttribute, Value } from '../properties'
import type { Requirement } from '../requirements'
import type { LegacyEffect } from './effects'

export class Legacy {
  constructor(
    readonly name: string,
    readonly requiredSkills: Requirement<SkillWithAttribute>[],
    readonly requiredAttributes: Requirement<Attribute>[],
    readonly requiredOrigins: Requirement<Origin>[],
    readonly mentalPowerSkill?: Skill,
    readonly mentalResistanceSkill?: Skill,
    readonly requiredConcepts: string[] = [],
    readonly effects: LegacyEffect[] = []
  ) {}

  isAttainable(
    attributes: Array<Value<Attribute>>,
    skills: Array<Value<SkillWithAttribute>>,
    origins: Array<Value<Origin>>,
    mentalPowerSkill: Skill,
    mentalResistanceSkill: Skill,
    concept: Concept,
  ): boolean {
    return (
      this.conceptEligible(concept) &&
      this.attributesEligible(attributes) &&
      this.skillsEligible(skills) &&
      this.originsEligible(origins) &&
      this.mentalPowerSkillEligible(mentalPowerSkill) &&
      this.mentalResistanceSkillEligible(mentalResistanceSkill)
    )
  }

  private conceptEligible(concept: Concept): boolean {
    return this.requiredConcepts.length === 0 || this.requiredConcepts.includes(concept.name)
  }

  private attributesEligible(attributes: Array<Value<Attribute>>): boolean {
    return this.requiredAttributes.reduce(
      (eligible, requirement) => eligible && requirement.check(attributes),
      true
    )
  }

  private skillsEligible(skills: Array<Value<SkillWithAttribute>>): boolean {
    return this.requiredSkills.reduce(
      (eligible, requirement) => eligible && requirement.check(skills),
      true
    )
  }

  private originsEligible(origins: Array<Value<Origin>>): boolean {
    return this.requiredOrigins.reduce(
      (eligible, requirement) => eligible && requirement.check(origins),
      true
    )
  }

  private mentalPowerSkillEligible(mentalPowerSkill: Skill): boolean {
    return this.mentalPowerSkill == undefined || this.mentalPowerSkill.name == mentalPowerSkill.name
  }

  private mentalResistanceSkillEligible(mentalResistanceSkill: Skill): boolean {
    return (
      this.mentalResistanceSkill == undefined ||
      this.mentalResistanceSkill.name == mentalResistanceSkill.name
    )
  }
}

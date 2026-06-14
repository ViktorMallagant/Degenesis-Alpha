import type { Clan } from '../model'
import type { Cult } from '../model'
import type { Attribute, Origin, Skill, SkillWithAttribute, Value } from '../properties'
import type { Rank, RankRequirement } from '../ranks/ranks'
import type { Requirement } from '../requirements'

export class Potential {
  constructor(
    readonly name: string,
    readonly cult: Cult | undefined,
    readonly requiredSkills: Requirement<SkillWithAttribute>[],
    readonly requiredAttributes: Requirement<Attribute>[],
    readonly requiredOrigins: Requirement<Origin>[],
    readonly minimumRanks: RankRequirement[],
    readonly mentalPowerSkill?: Skill,
    readonly mentalResistanceSkill?: Skill,
    readonly clan?: Clan,
    readonly modifiers: string[] = [],
  ) {}

  isAttainable(
    cult: Cult,
    attributes: Array<Value<Attribute>>,
    skills: Array<Value<SkillWithAttribute>>,
    origins: Array<Value<Origin>>,
    rank: Rank,
    mentalPowerSkill: Skill | null,
    mentalResistanceSkill: Skill | null,
    clan: Clan|undefined,
  ): boolean {
    return (
      this.cultEligible(cult) &&
      this.attributesEligible(attributes) &&
      this.skillsEligible(skills) &&
      this.originsEligible(origins) &&
      this.rankEligible(rank) &&
      this.mentalPowerSkillEligible(mentalPowerSkill) &&
      this.mentalResistanceSkillEligible(mentalResistanceSkill) &&
      this.clanEligible(clan)
    )
  }

  private cultEligible(cult: Cult): boolean {
    return this.cult == undefined || this.cult.name == cult.name
  }

  private clanEligible(clan: Clan|undefined): boolean {
    return this.clan == undefined || this.clan.name == clan?.name
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

  private rankEligible(rank: Rank): boolean {
    return this.minimumRanks.reduce(
      (eligible, requirement) => eligible && requirement.check([rank]),
      true
    )
  }

  private mentalPowerSkillEligible(mentalPowerSkill: Skill | null): boolean {
    if (this.mentalPowerSkill == undefined) return true
    if (mentalPowerSkill == null) return false
    return this.mentalPowerSkill.name == mentalPowerSkill.name
  }

  private mentalResistanceSkillEligible(mentalResistanceSkill: Skill | null): boolean {
    if (this.mentalResistanceSkill == undefined) return true
    if (mentalResistanceSkill == null) return false
    return this.mentalResistanceSkill.name == mentalResistanceSkill.name
  }
}

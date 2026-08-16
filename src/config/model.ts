import type { Skill, Attribute } from "./properties";

export interface Named {
  name: string
}
export declare type Translator = (value: string, ...args: unknown[]) => string
export declare type Translatable = { name: string; format: (translator: Translator) => string }

export class Cult implements Named {
  constructor(
    readonly name: string,
    readonly bonusSkills: Array<Skill>
  ) {
    this.bonusSkillNames = bonusSkills.map((s) => s.name)
  }
  readonly bonusSkillNames: Array<string>
}

export class Culture implements Named {
  constructor(name: string, bonusAttributes: Array<Attribute>, bonusSkills: Array<Skill>) {
    this.name = name
    this.bonusAttributes = bonusAttributes
    this.bonusSkills = bonusSkills
    this.bonusSkillNames = bonusSkills.map((s) => s.name)
  }
  readonly name: string
  readonly bonusAttributes: Array<Attribute>
  readonly bonusSkills: Array<Skill>
  readonly bonusSkillNames: Array<string>
}

export class Concept implements Named {
  constructor(name: string, index: number, bonusAttribute: Attribute, bonusSkills: Array<Skill>) {
    this.name = name
    this.index = index
    this.bonusAttribute = bonusAttribute
    this.bonusSkills = bonusSkills
    this.bonusSkillNames = bonusSkills.map((s) => s.name)
  }
  readonly name: string
  readonly index: number
  readonly bonusAttribute: Attribute
  readonly bonusSkills: Array<Skill>
  readonly bonusSkillNames: Array<string>
  format = (translator: Translator) => translator('concepts.' + this.index)
}

export interface ClanRules {
  // Automatic successes applied specifically to Mental Defense rolls.
  // Kept distinct from dice bonuses so clan rules such as +1S are not
  // accidentally represented as a change to PSY, Faith, or Willpower.
  mentalDefenseSuccessBonus?: number
}

export class Clan {
  constructor(
    readonly name: string,
    readonly bonusSkills: Skill[],
    readonly rules: ClanRules = {}
  ) {
    this.bonusSkillNames = bonusSkills.map((s) => s.name)
  }
  readonly bonusSkillNames: Array<string>

  get mentalDefenseSuccessBonus(): number {
    return this.rules.mentalDefenseSuccessBonus ?? 0
  }
}

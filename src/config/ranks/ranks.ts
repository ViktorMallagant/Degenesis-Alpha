import type { Clan } from '../model'
import type { Translatable, Cult, Translator } from '../model'
import { SkillWithAttribute, Origin, type Value } from '../properties'
import { type Requirement } from '../requirements'

export class Rank implements Translatable {
  constructor(
    readonly name: string,
    readonly cult: Cult,
    readonly requiredSkills: Array<Requirement<SkillWithAttribute>>,
    readonly requiredOrigins: Array<Requirement<Origin>>,
    readonly parentRanks: Array<Rank>,
    readonly isOutsideHierarchy: boolean = false,
    hierarchyLevelOverride: number | undefined = undefined,
    readonly description?: string,
    readonly clan?: Clan,
    readonly requiredRanks: Array<Rank> = []
  ) {
    this.hierarchyLevel = parentRanks.reduce(
      (level, parent) => Math.max(level, parent.hierarchyLevel + 1),
      1
    )
    this.hierarchyLevel = hierarchyLevelOverride ?? this.hierarchyLevel
    this.hierarchyLevelString = (isOutsideHierarchy && hierarchyLevelOverride === undefined) ? 'X' : `${this.hierarchyLevel}`
    this.ancestors = new Set(
      parentRanks.flatMap((parent) => Array.from(parent.ancestors).concat(parent))
    )
  }
  format(translator: Translator) {
    return translator(`ranks.${this.name}`)
  }
  readonly hierarchyLevel: number
  readonly hierarchyLevelString: string
  readonly ancestors: Set<Rank>

  isEligible(
    cult: Cult,
    skills: Array<Value<SkillWithAttribute>>,
    origins: Array<Value<Origin>>,
    clan?: Clan,
  ): boolean {
    if (this.cult.name != cult.name) {
      return false
    }
    if (this.clan && this.clan?.name != clan?.name) {
      return false
    }
    const skillsEligible = this.requiredSkills.reduce(
      (eligible, requirement) => eligible && requirement.check(skills),
      true
    )
    const originsEligible = this.requiredOrigins.reduce(
      (eligible, requirement) => eligible && requirement.check(origins),
      true
    )
    const anyParentEligible =
      this.parentRanks.length == 0 ||
      this.parentRanks.reduce((eligible, parent) => {
        const parentEligible = parent.isEligible(cult, skills, origins, clan)
        return eligible || parentEligible
      }, false)
    const allRequiredRanksEligible =
      this.requiredRanks.length === 0 ||
      this.requiredRanks.some((req) => req.isEligible(cult, skills, origins, clan))
    return skillsEligible && originsEligible && anyParentEligible && allRequiredRanksEligible
  }

  compare(other: Rank): number {
    if (this.hierarchyLevel < other.hierarchyLevel) {
      return -1
    } else if (this.hierarchyLevel == other.hierarchyLevel) {
      return this.name.localeCompare(other.name)
    }
    return 1
  }

  formatPrerequisites(translator: Translator): string[] {
    return [...this.requiredSkills, ...this.requiredOrigins].map((requirement) =>
      requirement.format(translator)
    )
  }
}

export const cultRank =
  (cult: Cult) =>
  (
    name: string,
    requiredSkills: Requirement<SkillWithAttribute>[],
    requiredOrigins: Requirement<Origin>[],
    parentRanks: Array<Rank> = [],
    isOutsideHierarchy: boolean = false,
    hierarchyLevelOverride: number | undefined = undefined,
    description: string | undefined = undefined,
    requiredRanks: Array<Rank> = []
  ): Rank => {
    return new Rank(
      name,
      cult,
      requiredSkills,
      requiredOrigins,
      parentRanks,
      isOutsideHierarchy,
      hierarchyLevelOverride,
      description,
      undefined,
      requiredRanks
    )
  }

export interface RankRequirement {
  ranks: Rank[]
  check(items: Rank[]): boolean
  format(translator: Translator): string
}

class MinimumRank implements RankRequirement {
  constructor(readonly rank: Rank) {
    this.ranks = [rank]
  }
  readonly ranks: Rank[]
  check(items: Rank[]): boolean {
    return items.reduce(
      (anyMatches, item) =>
        anyMatches || item.name == this.rank.name || item.ancestors.has(this.rank),
      false
    )
  }
  format(translator: Translator): string {
    return translator(`ranks.${this.rank.name}`)
  }
}

export function atLeastRank(item: Rank): RankRequirement {
  return new MinimumRank(item)
}

class Either implements RankRequirement {
  constructor(readonly requirements: RankRequirement[]) {
    this.ranks = requirements.reduce((ranks, current) => ranks.concat(current.ranks), [] as Rank[])
  }
  readonly ranks: Rank[]
  check(items: Rank[]): boolean {
    return this.requirements.reduce(
      (satisfied, current) => satisfied || current.check(items),
      false
    )
  }
  format(translator: Translator): string {
    return this.requirements.map((requirement) => requirement.format(translator)).join('/')
  }
}

export function eitherRank(...requirements: RankRequirement[]): RankRequirement {
  return new Either(requirements)
}

export function atLeastRankLevel(allRanks: Rank[], level: number): RankRequirement {
  return new Either(allRanks.filter((rank) => rank.hierarchyLevel == level).map(atLeastRank))
}

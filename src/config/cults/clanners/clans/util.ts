import type { Clan } from '@/config/model'
import type { Origin, SkillWithAttribute } from '@/config/properties'
import type { Requirement } from '@/config/requirements'
import { Rank, type RankContextRequirement } from '../../../ranks/ranks'
import { Clanners } from '../'

export const clanRank =
  (clan: Clan) =>
  (
    name: string,
    requiredSkills: Requirement<SkillWithAttribute>[],
    requiredOrigins: Requirement<Origin>[],
    parentRanks: Array<Rank> = [],
    isOutsideHierarchy: boolean = false,
    hierarchyLevelOverride: number | undefined = undefined,
    requiredRanks: Array<Rank> = [],
    contextRequirements: Array<RankContextRequirement> = []
  ): Rank => {
    return new Rank(
      `${clan.name}-${name}`,
      Clanners,
      requiredSkills,
      requiredOrigins,
      parentRanks,
      isOutsideHierarchy,
      hierarchyLevelOverride,
      clan.name,
      clan,
      requiredRanks,
      contextRequirements
    )
  }
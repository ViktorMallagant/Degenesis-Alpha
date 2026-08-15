import { ClannerRanks } from '../cults/clanners/ranks'
import { RanksByCults, ranksByCult } from '../cults/cults'
import config from '../index'
import type { Clan, Cult } from '../model'
import type { Origin, SkillWithAttribute, Value } from '../properties'
import type { Rank, RankEligibilityContext } from './ranks'

const Cults = config.cults

const AllRanks: Rank[] = Array.from(RanksByCults.values()).flatMap((ranks) => ranks)
const RanksByName: Map<string, Rank> = new Map(AllRanks.map((rank) => [rank.name, rank]))

function browserRankContext(): RankEligibilityContext {
  const rawAge = (globalThis as any).__charStore?.age
  const parsedAge = Number.parseInt(rawAge ?? '', 10)
  return { age: Number.isNaN(parsedAge) ? undefined : parsedAge }
}

export function eligibleRanks(
  cult: Cult,
  skills: Array<Value<SkillWithAttribute>>,
  origins: Array<Value<Origin>>,
  clan?: Clan,
  context?: RankEligibilityContext
): Set<Rank> {
  const ranksForCult = ranksByCult(cult, clan)
  const resolvedContext = context ?? browserRankContext()
  return new Set(
    ranksForCult.filter((rank) => rank.isEligible(cult, skills, origins, clan, resolvedContext))
  )
}

export function minimumRank(cult: Cult, clan: Clan|undefined): Rank {
  const ranksForCult = ranksByCult(cult, clan)
  return ranksForCult
    .filter((rank) => !rank.isOutsideHierarchy && rank.hierarchyLevel > 0)
    .reduce((min, rank) => (min.compare(rank) < 0 ? min : rank), ranksForCult[0])
}

export function rankByName(name: string) {
  return RanksByName.get(name)
}

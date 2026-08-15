import { clanRanks } from './ranks'

const HUNTER_GATHERER_TEMPLATE_CLANS = ['cockroaches']

function cloneRankTranslations(
  sourceClan: string,
  targetClans: string[],
  translations: Record<string, string>
): Record<string, string> {
  const result: Record<string, string> = {}
  const prefix = `${sourceClan}-`

  for (const [key, value] of Object.entries(translations)) {
    if (!key.startsWith(prefix)) continue
    const suffix = key.slice(prefix.length)
    for (const targetClan of targetClans) {
      result[`${targetClan}-${suffix}`] = value
    }
  }

  return result
}

function buildHunterGathererAliases(translations: Record<string, string>) {
  return cloneRankTranslations(
    'hunterGatherers',
    HUNTER_GATHERER_TEMPLATE_CLANS,
    translations
  )
}

export const clanTemplateRanks = {
  de: buildHunterGathererAliases(clanRanks.de as Record<string, string>),
  en: buildHunterGathererAliases(clanRanks.en as Record<string, string>),
  fr: buildHunterGathererAliases(clanRanks.fr as Record<string, string>)
}

export const statusTrackKeys = [
  'ego',
  'sporeInfestations',
  'fleshwounds',
  'trauma'
] as const

export type StatusTrackKey = (typeof statusTrackKeys)[number]

export type StatusSoftSelections = Record<StatusTrackKey, number[]>

export function defaultStatusSoftSelections(): StatusSoftSelections {
  return {
    ego: [],
    sporeInfestations: [],
    fleshwounds: [],
    trauma: []
  }
}

export function normalizeStatusPoints(value: unknown): number[] {
  if (!Array.isArray(value)) return []

  return Array.from(
    new Set(
      value
        .map(Number)
        .filter(point => Number.isFinite(point) && point >= 1 && point <= 24)
        .map(Math.trunc)
    )
  ).sort((left, right) => left - right)
}

export function normalizeStatusSoftSelections(
  value?: Partial<StatusSoftSelections>
): StatusSoftSelections {
  return {
    ego: normalizeStatusPoints(value?.ego),
    sporeInfestations: normalizeStatusPoints(value?.sporeInfestations),
    fleshwounds: normalizeStatusPoints(value?.fleshwounds),
    trauma: normalizeStatusPoints(value?.trauma)
  }
}

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

function normalizePoints(value: unknown): number[] {
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
    ego: normalizePoints(value?.ego),
    sporeInfestations: normalizePoints(value?.sporeInfestations),
    fleshwounds: normalizePoints(value?.fleshwounds),
    trauma: normalizePoints(value?.trauma)
  }
}

export type ArtifactDetails = {
  name: string
  activation: string
  operation: string
  appraisalValue: string
}

export type OtherDetails = {
  scars: {
    groupName: string
    alignment: string
    constellation: string
    scarsValue: string
    infamy: number
  }
  complications: string
  artifacts: ArtifactDetails[]
  notes: string[]
}

const emptyArtifact = (): ArtifactDetails => ({
  name: '',
  activation: '',
  operation: '',
  appraisalValue: ''
})

export function defaultOtherDetails(): OtherDetails {
  return {
    scars: {
      groupName: '',
      alignment: '',
      constellation: '',
      scarsValue: '',
      infamy: 0
    },
    complications: '',
    artifacts: [emptyArtifact(), emptyArtifact(), emptyArtifact()],
    notes: Array.from({ length: 10 }, () => '')
  }
}

export function normalizeOtherDetails(value?: Partial<OtherDetails>): OtherDetails {
  const defaults = defaultOtherDetails()
  const scars = value?.scars || defaults.scars
  const numericInfamy = Number(scars.infamy)

  return {
    scars: {
      groupName: String(scars.groupName || ''),
      alignment: String(scars.alignment || ''),
      constellation: String(scars.constellation || ''),
      scarsValue: String(scars.scarsValue || ''),
      infamy: Number.isFinite(numericInfamy)
        ? Math.max(0, Math.min(6, Math.trunc(numericInfamy)))
        : 0
    },
    complications: String(value?.complications || ''),
    artifacts: Array.from({ length: 3 }, (_, index) => {
      const artifact = value?.artifacts?.[index]
      return {
        name: String(artifact?.name || ''),
        activation: String(artifact?.activation || ''),
        operation: String(artifact?.operation || ''),
        appraisalValue: String(artifact?.appraisalValue || '')
      }
    }),
    notes: Array.from({ length: 10 }, (_, index) => String(value?.notes?.[index] || ''))
  }
}

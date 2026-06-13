import { type Clan } from '@/config/model'
import { EditorMode } from '@/config/modes'
import {
  ITEMS,
  ResourceMode,
  ADVANCEMENT_THRESHOLDS,
  advancementsToLevel,
  levelToMinAdvancements,
  type InventoryPurchase,
} from '@/config/items'
import { PotentialsByName, eligiblePotentials } from '@/config/potentials'
import type { Potential } from '@/config/potentials/potential'
import { AllLegacies, eligibleLegacies } from '@/config/legacies'
import type { Legacy } from '@/config/legacies/legacy'
import {
  Attribute,
  Attributes,
  Origin,
  Skill,
  SkillWithAttribute,
  Skills,
  Value,
  type Property
} from '@/config/properties'
import { eligibleRanks, minimumRank, rankByName } from '@/config/ranks'
import type { Rank } from '@/config/ranks/ranks'
import { defineStore } from 'pinia'
import config from '../config'
import browserStorage from './browserStorage'
import { Character } from './character'
import type { Culture, Concept, Cult } from '@/config/model'

const attributeMinValue = config.pointLimits.attributes.min
const skillMinValue = config.pointLimits.skills.min
const originMinValue = config.pointLimits.origins.min
const potentialMinValue = config.pointLimits.potentials.min

class SpentPoints {
  constructor(
    readonly attributes: number,
    readonly skills: number,
    readonly origins: number,
    readonly potentials: number,
    readonly legacies: number
  ) {}
}

export type State = {
  characterName: string
  culture: Culture
  concept: Concept
  cult: Cult
  clan?: Clan
  rank: Rank
  attributes: Map<Attribute, number>
  skills: Map<Skill, number>
  origins: Map<Origin, number>
  potentials: Map<Potential, number>
  legacies: Map<Legacy, number>
  highlightedItems: Set<Property | Rank>
  editorMode: EditorMode
  displayTranslatedLabels: boolean
  age: string
  gender: string
  height: string
  weight: string
  experience: string
  portrait: string
  isLoading: boolean
  inventory: InventoryPurchase[]
  resourceMode: ResourceMode
  manualLC: number | null
  legacyChoices: Record<string, { attributes?: string[]; skills?: string[] }>
  errorMessage: string | null
}

export const useCharacterStore = defineStore('character', {
  state: (): State => ({
    characterName: '',
    culture: Object.values(config.cultures)[0],
    concept: Object.values(config.concepts)[0],
    cult: Object.values(config.cults)[0],
    clan: undefined,
    rank: minimumRank(Object.values(config.cults)[0], undefined),
    attributes: new Map(config.attributes.map((x) => [x, attributeMinValue])),
    skills: new Map(config.skills.map((x) => [x, skillMinValue])),
    origins: new Map(config.origins.map((x) => [x, originMinValue])),
    potentials: new Map(),
    legacies: new Map(),
    highlightedItems: new Set(),
    editorMode: EditorMode.Default,
    displayTranslatedLabels: browserStorage.loadDisplayTranslatedLabels(),
    age: '',
    gender: '',
    height: '',
    weight: '',
    experience: '',
    portrait: '',
    isLoading: false,
    inventory: [],
    resourceMode: ResourceMode.A,
    manualLC: null,
    legacyChoices: {},
    errorMessage: null,
  }),
  getters: {
    attributeValue:
      (state) =>
      (attr: Attribute): number => {
        return state.attributes.get(attr) || attributeMinValue
      },
    skillValue: (state) => (skill: Skill) => state.skills.get(skill) || skillMinValue,
    originValue: (state) => (origin: Origin) => state.origins.get(origin) || originMinValue,
    potentialValue: (state) => (potential: Potential) =>
      state.potentials.get(potential) || potentialMinValue,
    legacyValue: (state) => (legacy: Legacy) =>
      state.legacies.get(legacy) || 0,
    attributeMax: (state) => (attr: Attribute) => {
      const limit = config.pointLimits.attributes.max
      const bonusFromCulture = state.culture.bonusAttributes.includes(attr) ? 1 : 0
      const bonusFromConcept = state.concept.bonusAttribute.name == attr.name ? 1 : 0
      return limit + bonusFromCulture + bonusFromConcept
    },
    skillMax:
      (state) =>
      (skill: Skill): number => {
        const limit = config.pointLimits.skills.max
        const bonusFromCulture = state.culture.bonusSkills.includes(skill) ? 1 : 0
        const bonusFromConcept = state.concept.bonusSkills.includes(skill) ? 1 : 0
        const bonusFromCult = state.cult.bonusSkills.includes(skill) ? 1 : 0
        const bonusFromClan = (state.clan?.bonusSkills || []).includes(skill) ? 1 : 0
        return limit + bonusFromCulture + bonusFromConcept + bonusFromCult + bonusFromClan
      },
    originMax(): number {
      return config.pointLimits.origins.max
    },
    // ── Legacy effect helpers ────────────────────────────────────────────────
    activeLegacyEffects(): import('@/config/legacies/effects').LegacyEffect[] {
      const effects: import('@/config/legacies/effects').LegacyEffect[] = []
      this.legacies.forEach((v, legacy) => {
        if (v > 0) effects.push(...legacy.effects)
      })
      return effects
    },
    legacyAttributeBonus(): (name: string) => number {
      return (name: string) => {
        let total = this.activeLegacyEffects
          .filter(e => e.type === 'attribute' && (e as any).name === name)
          .reduce((sum, e) => sum + (e as any).bonus, 0)
        this.legacies.forEach((v, legacy) => {
          if (v > 0) {
            const chosen = this.legacyChoices[legacy.name]?.attributes || []
            for (const e of legacy.effects) {
              if (e.type === 'choiceAttribute' && chosen.includes(name)) {
                total += e.bonus
              }
            }
          }
        })
        return total
      }
    },
    legacySkillStaticBonus(): (name: string) => number {
      return (name: string) =>
        this.activeLegacyEffects
          .filter(e => e.type === 'skill' && (e as any).name === name)
          .reduce((sum, e) => sum + (e as any).bonus, 0)
    },
    legacySkillBonus(): (name: string) => number {
      return (name: string) => {
        if (this.hasSuperstitious && (name === 'science' || name === 'engineering')) return 0
        let total = this.activeLegacyEffects
          .filter(e => e.type === 'skill' && (e as any).name === name)
          .reduce((sum, e) => sum + (e as any).bonus, 0)
        this.legacies.forEach((v, legacy) => {
          if (v > 0) {
            const chosen = this.legacyChoices[legacy.name]?.skills || []
            for (const e of legacy.effects) {
              if (e.type === 'choiceSkill' && chosen.includes(name)) {
                total += e.bonus
              }
            }
          }
        })
        return total
      }
    },
    legacyOriginBonus(): (name: string) => number {
      return (name: string) =>
        this.activeLegacyEffects
          .filter(e => e.type === 'origin' && (e as any).name === name)
          .reduce((sum, e) => sum + (e as any).bonus, 0)
    },
    legacyEgoMaxBonus(): number {
      return this.activeLegacyEffects
        .filter(e => e.type === 'egoMax')
        .reduce((sum, e) => sum + (e as any).bonus, 0)
    },
    legacySporeMaxBonus(): number {
      return this.activeLegacyEffects
        .filter(e => e.type === 'sporeMax')
        .reduce((sum, e) => sum + (e as any).bonus, 0)
    },
    legacyXPAttributeBonus(): number {
      return this.activeLegacyEffects
        .filter(e => e.type === 'xpAttributeBonus')
        .reduce((sum, e) => sum + (e as any).points, 0)
    },
    legacyXPSkillBonus(): number {
      return this.activeLegacyEffects
        .filter(e => e.type === 'xpSkillBonus')
        .reduce((sum, e) => sum + (e as any).points, 0)
    },
    legacyXPOriginBonus(): number {
      return this.activeLegacyEffects
        .filter(e => e.type === 'xpOriginBonus')
        .reduce((sum, e) => sum + (e as any).points, 0)
    },
    hasOptimized(): boolean {
      let found = false
      this.legacies.forEach((v, legacy) => { if (v > 0 && legacy.name === 'optimized') found = true })
      return found
    },
    originBudget(): number {
      if (this.hasOptimized) return 1
      return config.availablePoints.origins + this.legacyXPOriginBonus
    },
    legacyXPPotentialBonus(): number {
      return this.activeLegacyEffects
        .filter(e => e.type === 'xpPotentialBonus')
        .reduce((sum, e) => sum + (e as any).points, 0)
    },
    legacyModifiers(): string[] {
      return this.activeLegacyEffects
        .filter(e => e.type === 'modifier')
        .map(e => (e as any).description)
    },
    effectiveAttributeValue(): (attr: Attribute) => number {
      return (attr: Attribute) =>
        Math.max(1, (this.attributeValue(attr) || 1) + this.legacyAttributeBonus(attr.name))
    },
    effectiveSkillValue(): (skill: Skill) => number {
      return (skill: Skill) =>
        Math.max(0, (this.skillValue(skill) || 0) + this.legacySkillBonus(skill.name))
    },
    effectiveOriginValue(): (origin: Origin) => number {
      return (origin: Origin) =>
        Math.max(0, (this.originValue(origin) || 0) + this.legacyOriginBonus(origin.name))
    },
    spentPoints: (state): SpentPoints => {
      let spentAttributePoints = 0
      state.attributes.forEach((v) => {
        spentAttributePoints = spentAttributePoints + (v - attributeMinValue)
      })
      let spentSkillPoints = 0
      state.skills.forEach((v) => {
        spentSkillPoints = spentSkillPoints + (v - skillMinValue)
      })
      let spentOriginPoints = 0
      state.origins.forEach((v) => {
        spentOriginPoints = spentOriginPoints + (v - originMinValue)
      })
      const spentPotentialPoints = [...state.potentials.values()].reduce((a, b) => a + b, 0)
      const spentLegacyPoints = [...state.legacies.values()].reduce((a, b) => a + b, 0)
      return new SpentPoints(
        spentAttributePoints,
        spentSkillPoints,
        spentOriginPoints,
        spentPotentialPoints,
        spentLegacyPoints
      )
    },
    mentalResistanceSkill(): Skill {
      if ((this.skillValue(Skills.willpower) || 0) > 0) {
        return Skills.willpower
      } else {
        return Skills.faith
      }
    },
    mentalPowerSkill(): Skill {
      if ((this.skillValue(Skills.primal) || 0) > 0) {
        return Skills.primal
      } else {
        return Skills.focus
      }
    },
    isActiveSkill(): (skill: Skill) => boolean {
      return (skill: Skill) => {
        return (
          skill.antagonist != this.mentalPowerSkill &&
          skill.antagonist != this.mentalResistanceSkill
        )
      }
    },
    asCharacter: (state): Character => {
      const attributes = [] as [string, number][]
      state.attributes.forEach((v, attr) => attributes.push([attr.name, v]))
      const skills = [] as [string, number][]
      state.skills.forEach((v, skill) => skills.push([skill.name, v]))
      const origins = [] as [string, number][]
      state.origins.forEach((v, origin) => origins.push([origin.name, v]))
      const potentials = [] as [string, number][]
      state.potentials.forEach((v, potential) => potentials.push([potential.name, v]))
      const legacies = [] as [string, number][]
      state.legacies.forEach((v, legacy) => legacies.push([legacy.name, v]))
      return new Character(
        state.characterName,
        state.culture.name,
        state.concept.name,
        state.cult.name,
        state.rank.name,
        attributes,
        skills,
        origins,
        potentials,
        legacies,
        state.age,
        state.gender,
        state.height,
        state.weight,
        // When saving, we can safely remove the legacy editor mode, as it is replaced by editorMode
        undefined,
        state.editorMode,
        state.clan?.name,
        state.experience,
        state.portrait,
        state.inventory,
        state.resourceMode,
        state.manualLC,
        Object.keys(state.legacyChoices).length > 0 ? state.legacyChoices : undefined,
      )
    },
    maxEgo(): number {
      const bonus = this.legacyEgoMaxBonus
      switch (this.mentalPowerSkill) {
        case Skills.focus:
          return 2 * (this.effectiveAttributeValue(Attributes.intellect) + this.effectiveSkillValue(Skills.focus)) + bonus
        default:
          return 2 * (this.effectiveAttributeValue(Attributes.instinct) + this.effectiveSkillValue(Skills.primal)) + bonus
      }
    },
    maxSporeInfestations(): number {
      return (
        2 * (this.effectiveAttributeValue(Attributes.psyche) + this.effectiveSkillValue(this.mentalResistanceSkill))
        + this.legacySporeMaxBonus
      )
    },
    maxFleshwounds(): number {
      return 2 * (this.effectiveAttributeValue(Attributes.body) + this.effectiveSkillValue(Skills.toughness))
    },
    maxTrauma(): number {
      return this.effectiveAttributeValue(Attributes.body) + this.effectiveAttributeValue(Attributes.psyche)
    },
    // Starting wealth per cult: [amount, currency]. Total = (rankLevel + resources) * amount.
    computedDinars(): { value: number; factor: number; currency: string; rankLevel: number; resources: number } | null {
      const cultFactors: Record<string, [number, string]> = {
        anabaptists: [50, 'LC'],
        anubians: [100, 'dinars'],
        apocalyptics: [200, 'LC'],
        palers: [50, 'LC'],
        chroniclers: [128, 'LC'],
        clanners: [50, 'LC'],
        scrappers: [50, 'LC'],
        scourgers: [100, 'dinars'],
        hellvetics: [50, 'LC'],
        jehammedans: [100, 'LC'],
        judges: [50, 'LC'],
        neolibyans: [1000, 'dinars'],
        spitalians: [100, 'LC']
      }
      if (!this.cult) return null
      const factor = cultFactors[this.cult.name]
      if (!factor) return null
      const rankLevel = this.rank ? this.rank.hierarchyLevel || 1 : 1
      let resources = 0
      this.origins.forEach((v, o) => {
        if (o.name === 'resources') resources = v + this.legacyOriginBonus('resources')
      })
      return {
        value: (rankLevel + resources) * factor[0],
        factor: factor[0],
        currency: factor[1],
        rankLevel,
        resources
      }
    },
    baseResourcesLevel(): number {
      let val = 0
      this.origins.forEach((v, o) => { if (o.name === 'resources') val = v })
      return val
    },
    resourceDecrements(): number {
      return this.inventory.filter(p => p.decrementedResources).length
    },
    effectiveResourcesLevel(): number {
      return Math.max(0, this.baseResourcesLevel - this.resourceDecrements)
    },
    resourceAdvancements(): number {
      return levelToMinAdvancements(this.baseResourcesLevel)
    },
    remainingAdvancements(): number {
      const spent = this.inventory
        .filter(p => p.purchasedWithResources)
        .reduce((sum, p) => {
          const item = ITEMS.find(i => i.id === p.itemId)
          return sum + (item?.resources ?? 0)
        }, 0)
      return Math.max(0, this.resourceAdvancements - spent)
    },
    effectiveResourcesLevelForModeC(): number {
      return advancementsToLevel(this.remainingAdvancements)
    },
    hasEntrepreneur(): boolean {
      let found = false
      this.legacies.forEach((v, legacy) => { if (v > 0 && legacy.name === 'entrepreneur') found = true })
      return found
    },
    hasSuperstitious(): boolean {
      let found = false
      this.legacies.forEach((v, legacy) => { if (v > 0 && legacy.name === 'superstitious') found = true })
      return found
    },
    effectiveResourcesLevelForOtherCult(): number {
      if (!this.hasEntrepreneur) return 0
      if (this.resourceMode === ResourceMode.C) {
        return Math.max(0, this.effectiveResourcesLevelForModeC - 2)
      }
      return Math.max(0, this.effectiveResourcesLevel - 2)
    },
    remainingLC(): number {
      const base = (this.editorMode === EditorMode.Free && this.manualLC !== null)
        ? this.manualLC
        : (this.computedDinars?.value ?? 0)
      const spent = this.inventory
        .filter(p => !p.purchasedWithResources)
        .reduce((sum, p) => {
          const item = ITEMS.find(i => i.id === p.itemId)
          return sum + (item?.value ?? 0) * (p.level ?? 1)
        }, 0)
      return base - spent
    },
    inventoryItems(): Array<{ purchase: InventoryPurchase; index: number }> {
      return this.inventory.map((purchase, index) => ({ purchase, index }))
    },

    attributeValues(): Value<Attribute>[] {
      return Array.from(this.attributes.entries()).map(([a, v]) => a.withValue(v))
    },
    skillValues(): Value<SkillWithAttribute>[] {
      return Array.from(this.skills.entries()).map(([s, v]) =>
        s.withValue(v + this.attributeValue(s.attribute))
      )
    },
    originValues(): Value<Origin>[] {
      return Array.from(this.origins.entries()).map(([o, v]) => o.withValue(v))
    },
    eligibleRanks(): Set<Rank> {
      return eligibleRanks(this.cult, this.skillValues, this.originValues, this.clan)
    },
    eligiblePotentials(): Set<Potential> {
      return eligiblePotentials(
        this.cult,
        this.attributeValues,
        this.skillValues,
        this.originValues,
        this.rank,
        this.mentalPowerSkill,
        this.mentalResistanceSkill,
        this.clan
      )
    },
    eligibleLegacies(): Set<Legacy> {
      const set = eligibleLegacies(
        this.attributeValues,
        this.skillValues,
        this.originValues,
        this.mentalPowerSkill,
        this.mentalResistanceSkill,
        this.concept,
      )
      if (this.editorMode !== EditorMode.Free && this.spentPoints.origins > 1) {
        set.forEach(l => { if (l.name === 'optimized') set.delete(l) })
      }
      if (this.editorMode !== EditorMode.Free) {
        const scienceVal = this.skills.get(Skills.science) ?? 0
        const engineeringVal = this.skills.get(Skills.engineering) ?? 0
        if (scienceVal > 0 || engineeringVal > 0) {
          set.forEach(l => { if (l.name === 'superstitious') set.delete(l) })
        }
      }
      return set
    },
    anyPointLimitExceeded(): boolean {
      return (
        this.spentPoints.attributes > config.availablePoints.attributes + this.legacyXPAttributeBonus ||
        this.spentPoints.skills > config.availablePoints.skills + this.legacyXPSkillBonus ||
        this.spentPoints.origins > this.originBudget ||
        this.spentPoints.potentials > config.availablePoints.potentials + this.legacyXPPotentialBonus ||
        this.spentPoints.legacies > config.availablePoints.legacies
      )
    }
  },
  actions: {
    loadCharacter(character: Character) {
      this.isLoading = true
      this.$reset()
      this.isLoading = true  // $reset() remet isLoading à false, on le remet à true
      this.setCharacterName(character.name)
      this.editorMode = character.editorMode ?? EditorMode.Default
      character.attributes.forEach(([name, v]) => {
        const attribute = config.attributesByName.get(name)
        attribute && this.attributes.set(attribute, v)
      })
      character.skills.forEach(([name, v]) => {
        const skill = config.skillsByName.get(name)
        skill && this.skills.set(skill, v)
      })
      const culture = config.culturesByName.get(character.culture)
      culture && this.setCulture(culture)
      const concept = config.conceptsByName.get(character.concept)
      concept && this.setConcept(concept)
      const cult = config.cultsByName.get(character.cult)
      cult && this.setCult(cult)
      character.origins.forEach(([name, v]) => {
        const origin = config.originsByName.get(name)
        origin && this.setOrigin(origin, v)
      })
      const clan = character.clan && config.clansByName.get(character.clan)
      clan && this.setClan(clan)
      character.potentials &&
        character.potentials.forEach(([name, v]) => {
          const potential = PotentialsByName.get(name)
          potential && this.setPotential(potential, v)
        })
      character.legacies &&
        character.legacies.forEach(([name, v]) => {
          const legacy = AllLegacies.find(l => l.name === name)
          legacy && this.setLegacy(legacy, v)
        })
      if (character.rank) {
        const rank = rankByName(character.rank || '')
        if (rank) {
          this.setRank(rank)
        }
      } else {
        this.setRank(minimumRank(this.cult, this.clan))
      }
      this.age = character.age || ''
      this.gender = character.gender || ''
      this.height = character.height || ''
      this.weight = character.weight || ''
      this.experience = character.experience || ''
      this.portrait = character.portrait || ''
      this.inventory = character.inventory ? [...character.inventory] : []
      this.resourceMode = character.resourceMode ?? ResourceMode.A
      this.manualLC = character.manualLC ?? null
      this.legacyChoices = character.legacyChoices ? { ...character.legacyChoices } : {}
      this.isLoading = false
    },
    adjustProperties() {
      if (this.editorMode == EditorMode.HardLimits) {
        this.attributes.forEach((currentValue, attr) => {
          const maxValue = this.attributeMax(attr)
          const newValue = Math.min(currentValue, maxValue)
          if (newValue !== currentValue) {
            this.setAttribute(attr, newValue)
          }
        })
        this.skills.forEach((currentValue, skill) => {
          const maxValue = this.skillMax(skill)
          const newValue = Math.min(currentValue, maxValue)
          if (newValue !== currentValue) {
            this.setSkill(skill, newValue)
          }
        })
        this.origins.forEach((currentValue, origin) => {
          const maxValue = this.originMax
          const newValue = Math.min(currentValue, maxValue)
          if (newValue !== currentValue) {
            this.setOrigin(origin, newValue)
          }
        })
      }
      this.adjustPotentials()
    },
    adjustPotentials() {
      this.potentials.forEach((_currentValue, potential) => {
        if (
          !potential.isAttainable(
            this.cult,
            this.attributeValues,
            this.skillValues,
            this.originValues,
            this.rank,
            this.mentalPowerSkill,
            this.mentalResistanceSkill,
            this.clan
          )
        ) {
          this.potentials.delete(potential)
        }
      })
    },
    setCulture(culture: Culture) {
      this.culture = culture
      this.adjustProperties()
    },
    setConcept(concept: Concept) {
      this.concept = concept
      this.adjustProperties()
    },
    setCult(cult: Cult) {
      if (this.cult != cult) {
        if (cult.name == config.cults.Clanners.name) {
          this.clan = Object.values(config.clans)[0]
        } else {
          this.clan = undefined
        }
        this.rank = minimumRank(cult, this.clan)
      }
      this.cult = cult
      this.adjustProperties()
    },
    setClan(clan: Clan) {
      if (this.cult.name == config.cults.Clanners.name) {
        if (clan.name != this.clan?.name) {
          this.rank = minimumRank(this.cult, clan)
        }
        this.clan = clan
        this.adjustProperties()
      }
    },
    setRank(rank: Rank) {
      if (rank.cult.name == this.cult.name) {
        if (rank.isEligible(this.cult, this.skillValues, this.originValues, this.clan)) {
          this.rank = rank
        }
      }
      this.adjustPotentials()
    },
    setAttribute(attribute: Attribute, value: number) {
      const newValue = () => {
        switch (this.editorMode) {
          case EditorMode.SoftLimits:
            return Math.min(value, 6)
          case EditorMode.Free:
            return Math.min(value, 6)
          default: {
            const boundedValue = Math.min(value, this.attributeMax(attribute))
            const currentValue = this.attributeValue(attribute)
            const expectedPointSpend = boundedValue - currentValue
            const maximumPointSpend =
              config.availablePoints.attributes + this.legacyXPAttributeBonus - this.spentPoints.attributes
            const boundedPointSpend = Math.min(expectedPointSpend, maximumPointSpend)
            return currentValue + boundedPointSpend
          }
        }
      }
      this.attributes.set(attribute, Math.max(config.pointLimits.attributes.min, newValue()))
      this.adjustRank()
      this.adjustProperties()
    },
    setSkill(skill: Skill, value: number) {
      if (this.hasSuperstitious && (skill.name === 'science' || skill.name === 'engineering') && this.editorMode !== EditorMode.Free) {
        this.errorMessage = "L'héritage Superstitieux vous empêche de mettre des points en Sciences et Technologie."
        return
      }
      switch (skill) {
        case Skills.willpower:
          this.skills.set(Skills.faith, 0)
          break
        case Skills.faith:
          this.skills.set(Skills.willpower, 0)
          break
        case Skills.focus:
          this.skills.set(Skills.primal, 0)
          break
        case Skills.primal:
          this.skills.set(Skills.focus, 0)
          break
      }

      const newValue = () => {
        switch (this.editorMode) {
          case EditorMode.SoftLimits:
            return Math.min(value, 6)
          case EditorMode.Free:
            return Math.min(value, 6)
          default: {
            const boundedValue = Math.min(value, this.skillMax(skill) - this.legacySkillStaticBonus(skill.name))
            const currentValue = this.skillValue(skill)
            const expectedPointSpend = boundedValue - currentValue
            const maximumPointSpend = config.availablePoints.skills + this.legacyXPSkillBonus - this.spentPoints.skills
            const boundedPointSpend = Math.min(expectedPointSpend, maximumPointSpend)
            return currentValue + boundedPointSpend
          }
        }
      }
      this.skills.set(skill, Math.max(config.pointLimits.skills.min, newValue()))
      this.adjustRank()
      this.adjustProperties()
    },
    setOrigin(origin: Origin, value: number) {
      const newValue = () => {
        switch (this.editorMode) {
          case EditorMode.SoftLimits:
            return Math.min(value, 6)
          case EditorMode.Free:
            return Math.min(value, 6)
          default: {
            const boundedValue = Math.min(value, config.pointLimits.origins.max)
            const currentValue = this.originValue(origin)
            const expectedPointSpend = boundedValue - currentValue
            const maximumPointSpend = this.originBudget - this.spentPoints.origins
            const boundedPointSpend = Math.min(expectedPointSpend, maximumPointSpend)
            return currentValue + boundedPointSpend
          }
        }
      }
      this.origins.set(origin, Math.max(config.pointLimits.skills.min, newValue()))
      this.adjustRank()
      this.adjustProperties()
    },
    setPotential(potential: Potential, value: number) {
      const newValue = () => {
        switch (this.editorMode) {
          case EditorMode.SoftLimits:
            return Math.min(value, 3)
          case EditorMode.Free:
            return Math.min(value, 3)
          default: {
            const boundedValue = Math.min(value, config.pointLimits.potentials.max)
            const currentValue = this.potentialValue(potential)
            const expectedPointSpend = boundedValue - currentValue
            const maximumPointSpend =
              config.availablePoints.potentials + this.legacyXPPotentialBonus - this.spentPoints.potentials
            const boundedPointSpend = Math.min(expectedPointSpend, maximumPointSpend)
            return currentValue + boundedPointSpend
          }
        }
      }

      // In HardLimits mode, only allow eligible potentials
      if (this.editorMode === EditorMode.HardLimits && !this.eligiblePotentials.has(potential)) {
        return
      }
      
      this.potentials.set(potential, newValue())
    },
    setLegacyChoices(legacyName: string, choices: { attributes?: string[]; skills?: string[] } | null) {
      if (!choices || ((!choices.attributes || choices.attributes.length === 0) && (!choices.skills || choices.skills.length === 0))) {
        const updated = { ...this.legacyChoices }
        delete updated[legacyName]
        this.legacyChoices = updated
      } else {
        this.legacyChoices = { ...this.legacyChoices, [legacyName]: choices }
      }
    },
    setLegacy(legacy: Legacy, value: number) {
      const newValue = () => {
        switch (this.editorMode) {
          case EditorMode.SoftLimits:
            return Math.min(value, 1)
          case EditorMode.Free:
            return Math.min(value, 1)
          default:
            return value
        }
      }
      
      // In HardLimits mode, only allow eligible legacies
      if (this.editorMode === EditorMode.HardLimits && !this.eligibleLegacies.has(legacy)) {
        return
      }
      // Block Optimized if origins already spent (non-free mode)
      if (legacy.name === 'optimized' && newValue() > 0 && this.editorMode !== EditorMode.Free && this.spentPoints.origins > 1) {
        return
      }
      
      if (newValue() <= 0) {
        this.legacies.delete(legacy)
        this.setLegacyChoices(legacy.name, null)
      } else {
        this.legacies.set(legacy, newValue())
      }
    },
    setCharacterName(name: string) {
      this.characterName = name
    },
    setManualLC(value: number | null) {
      this.manualLC = value
    },
    setEditorMode(mode: EditorMode) {
      // We can't switch to HardLimits if any point limit is exceeded, because we can't decide what to truncate
      if (!(mode == EditorMode.HardLimits && this.anyPointLimitExceeded)) {
        this.editorMode = mode
        this.adjustProperties()
      }
    },
    adjustRank() {
      if (!this.rank.isEligible(this.cult, this.skillValues, this.originValues, this.clan)) {
        this.rank = minimumRank(this.cult, this.clan)
      }
      this.adjustPotentials()
    },
    isHighlighted(item: Property | Rank) {
      return this.highlightedItems.has(item)
    },
    setItemHighlighted(item: Property | Rank, isHighlighted: boolean) {
      if (isHighlighted) {
        this.highlightedItems.add(item)
      } else {
        this.highlightedItems.delete(item)
      }
    },
    setHighlighted(...items: (Property | Rank)[]) {
      items.forEach((p) => this.setItemHighlighted(p, true))
    },
    unsetHighlighted(...items: (Property | Rank)[]) {
      items.forEach((p) => this.setItemHighlighted(p, false))
    },
    flashHighlighted(...items: (Attribute | Skill | Origin | Rank)[]) {
      this.setHighlighted(...items)
      setTimeout(() => {
        this.unsetHighlighted(...items)
      }, 3000)
    },
    buyItemWithLC(itemId: string, level = 1) {
      const item = ITEMS.find(i => i.id === itemId)
      if (!item) return
      if (this.remainingLC < item.value * level) return
      this.inventory.push({ itemId, purchasedWithResources: false, decrementedResources: false, level: level > 1 ? level : undefined })
    },
    buyItemWithResources(itemId: string) {
      const item = ITEMS.find(i => i.id === itemId)
      if (!item || item.resources === undefined) return

      const isOtherCult = item.cult !== undefined && item.cult !== this.cult?.name

      if (isOtherCult) {
        const isExpertMode = this.editorMode === EditorMode.Free
        if (!this.hasEntrepreneur && !isExpertMode) return

        let canBuy = false
        let decrements = false

        if (isExpertMode) {
          // Mode expert : mêmes règles que son propre culte
          if (this.resourceMode === ResourceMode.A) {
            canBuy = item.resources <= this.effectiveResourcesLevel
            decrements = canBuy
          } else if (this.resourceMode === ResourceMode.B) {
            canBuy = item.resources <= this.effectiveResourcesLevel
            decrements = canBuy && item.resources === this.effectiveResourcesLevel
          } else {
            canBuy = item.resources <= this.effectiveResourcesLevelForModeC
            decrements = false
          }
        } else {
          // Entrepreneur : malus -2
          const level = this.effectiveResourcesLevelForOtherCult
          canBuy = level >= 1 && item.resources <= level
          if (this.resourceMode === ResourceMode.A) {
            decrements = canBuy
          } else if (this.resourceMode === ResourceMode.B) {
            decrements = canBuy && item.resources === level
          }
        }

        if (!canBuy) return
        this.inventory.push({ itemId, purchasedWithResources: true, decrementedResources: decrements })
        return
      }

      let canBuy = false
      let decrements = false

      if (this.resourceMode === ResourceMode.A) {
        canBuy = item.resources <= this.effectiveResourcesLevel
        decrements = canBuy
      } else if (this.resourceMode === ResourceMode.B) {
        canBuy = item.resources <= this.effectiveResourcesLevel
        decrements = item.resources === this.effectiveResourcesLevel
      } else {
        canBuy = item.resources <= this.effectiveResourcesLevelForModeC
        decrements = false
      }

      if (!canBuy) return
      this.inventory.push({ itemId, purchasedWithResources: true, decrementedResources: decrements })
    },
    removeInventoryItem(index: number) {
      this.inventory.splice(index, 1)
    },
    setResourceMode(mode: ResourceMode) {
      this.resourceMode = mode
    },
  }
})

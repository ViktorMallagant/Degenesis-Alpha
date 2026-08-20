import type { Clan } from '@/config/model'
import { Potential } from '@/config/potentials/potential'
import { Skills, SkillWithAttribute, Attribute, Origin, Skill } from '@/config/properties'
import type { RankRequirement } from '@/config/ranks/ranks'
import { atLeastSkill, either, type Requirement } from '@/config/requirements'
import { Clans } from './clans'
import { Clanners } from '.'

export const FriendOfTheLion = clanPotential(Clans.Touloni, 'friendOfTheLion', [], [], [], [])

export const CulturalMemory = clanPotential(Clans.Stukov, 'culturalMemory', [], [], [], [])

export const EsotericCure = clanPotential(Clans.Brenni, 'esotericCure', [], [], [], [])

export const Earthbound = clanPotential(Clans.Providers, 'earthbound', [], [], [], [])

export const Spiritshaper = clanPotential(Clans.SteelMasters, 'spiritshaper', [], [], [], [])

export const StonyCalm = clanPotential(
  Clans.Britoni,
  'stonyCalm',
  [],
  [],
  [],
  [],
  Skills.focus
)

// Bloodthirsty also requires the Picton to have eaten Star Food. The current
// character model does not track that story-state prerequisite, so it remains
// explicit in the Potential description while INS+Primal 8 is enforced here.
export const Bloodthirsty = clanPotential(
  Clans.Pictons,
  'bloodthirsty',
  [atLeastSkill(Skills.primal, 8)],
  [],
  [],
  []
)

export const NaturesCanon = clanPotential(Clans.Druids, 'naturesCanon', [], [], [], [])

export const LombardiBlood = clanPotential(Clans.Lombardi, 'lombardiBlood', [], [], [], [])

export const MotherOfAllVirtues = clanPotential(
  Clans.Vigilantes,
  'motherOfAllVirtues',
  [],
  [],
  [],
  []
)

export const ForgottenByDeath = clanPotential(
  Clans.Romanos,
  'forgottenByDeath',
  [],
  [],
  [],
  []
)

export const Martyrdom = clanPotential(Clans.Flayers, 'martyrdom', [], [], [], [])

export const Premonition = clanPotential(Clans.StukovNomads, 'premonition', [], [], [], [])

export const TrialByFire = clanPotential(Clans.Storskis, 'trialByFire', [], [], [], [])

export const Toxicity = clanPotential(Clans.Phosphorites, 'toxicity', [], [], [], [])

export const RigorMortis = clanPotential(Clans.Cockroaches, 'rigorMortis', [], [], [], [])

// Harmonious requires Spore Infestation (5). The current character model tracks
// maximum Spore Infestation but not a character's current infestation score, so
// the prerequisite remains explicit in the Potential description rather than
// being approximated with a different statistic.
export const Harmonious = clanPotential(Clans.Ganarids, 'harmonious', [], [], [], [])

export const BloodCall = clanPotential(
  Clans.Sanglier,
  'bloodCall',
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith
)

export const LanceThrust = clanPotential(
  Clans.Bordenoir,
  'lanceThrust',
  [],
  [],
  [],
  [],
  Skills.focus
)

export const Brotherhood = clanPotential(Clans.Resistance, 'brotherhood', [], [], [], [])

export const ThroughAdversity = clanPotential(Clans.Pneumancers, 'throughAdversity', [], [], [], [])

export const Apnea = clanPotential(
  Clans.Pneumancers,
  'apnea',
  [atLeastSkill(Skills.stamina, 6)],
  [],
  [],
  []
)

// TODO: custom prerequisites necessary to correctly implement this
export const TheApex = clanPotential(
  Clans.Exalters,
  'theApex',
  [either(atLeastSkill(Skills.focus, 10), atLeastSkill(Skills.primal, 10))],
  [],
  [],
  []
)

export const FormerGlory = clanPotential(
  Clans.Exalters,
  'formerGlory',
  [],
  [],
  [],
  []
)

export const ClannerPotentials = [
  FriendOfTheLion,
  CulturalMemory,
  EsotericCure,
  Earthbound,
  Spiritshaper,
  StonyCalm,
  Bloodthirsty,
  NaturesCanon,
  LombardiBlood,
  MotherOfAllVirtues,
  ForgottenByDeath,
  Martyrdom,
  Premonition,
  TrialByFire,
  Toxicity,
  RigorMortis,
  Harmonious,
  BloodCall,
  LanceThrust,
  Brotherhood,
  ThroughAdversity,
  Apnea,
  TheApex,
  FormerGlory
]

function clanPotential(
  clan: Clan,
  name: string,
  requiredSkills: Requirement<SkillWithAttribute>[],
  requiredAttributes: Requirement<Attribute>[],
  requiredOrigins: Requirement<Origin>[],
  minimumRanks: RankRequirement[],
  mentalPowerSkill?: Skill,
  mentalResistanceSkill?: Skill
) {
  return new Potential(
    name,
    Clanners,
    requiredSkills,
    requiredAttributes,
    requiredOrigins,
    minimumRanks,
    mentalPowerSkill,
    mentalResistanceSkill,
    clan
  )
}

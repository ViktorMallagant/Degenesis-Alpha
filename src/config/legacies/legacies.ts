import { Legacy } from './legacy'
import { Attributes, Skills, Origins } from '../properties'
import { atLeastAttribute, atLeastSkill, either, atLeastOrigin, atMostOrigin } from '../requirements'

const m = (description: string) => ({ type: 'modifier' as const, description })
const attr = (name: string, bonus: number) => ({ type: 'attribute' as const, name, bonus })
const attrEx = (name: string, bonus: number) => ({ type: 'attribute' as const, name, bonus, exceedsMax: true as const })
const skill = (name: string, bonus: number) => ({ type: 'skill' as const, name, bonus })
const skillEx = (name: string, bonus: number) => ({ type: 'skill' as const, name, bonus, exceedsMax: true as const })
const origin = (name: string, bonus: number) => ({ type: 'origin' as const, name, bonus })
const xp = (points: number) => ({ type: 'xpSkillBonus' as const, points })

export const Entrepreneur = new Legacy('entrepreneur', [], [], [atLeastOrigin(Origins.resources, 3)], undefined, undefined, ['creator', 'conqueror', 'visionary'], [
  m('Ressources applicable à n\'importe quel Culte avec malus -2. Chaque utilisation envers un autre Culte donne -1D aux jets sociaux avec les autres Cultes pendant 1 semaine.'),
])
export const Patron = new Legacy('patron', [], [], [atLeastOrigin(Origins.allies, 2)], undefined, undefined, [], [
  xp(4),
  m('Votre mécène vous protège, mais peut exiger des tâches en retour. S\'il est déçu, il vous abandonnera.'),
])
export const Outcast = new Legacy('outcast', [], [], [atMostOrigin(Origins.allies, 1), atMostOrigin(Origins.authority, 1), atMostOrigin(Origins.network, 1)], undefined, undefined, [], [
  xp(6),
  m('-2D à tous les jets d\'interaction sociale dans toute zone où votre Culte est dominant.'),
])
export const Optimized = new Legacy('optimized', [], [], [], undefined, undefined, ['seeker', 'healer', 'chosen', 'disciple'], [
  xp(6),
  m('Max 1 point dans les historiques à la création. -1D INS+Empathie en permanence.'),
])
export const Firebrand = new Legacy('firebrand', [], [], [atLeastOrigin(Origins.renown, 3)], undefined, undefined, ['conqueror', 'zealot', 'righteous'], [
  m('CHA+Commandement +2S quand vous dirigez d\'anciens disciples. Quand Renommée atteint 5, vos ennemis envoient des assassins.'),
])
export const Landlord = new Legacy('landlord', [], [], [atLeastOrigin(Origins.resources, 3), atLeastOrigin(Origins.authority, 1)], undefined, undefined, [], [
  origin('renown', 1),
  m('1 000 LC de revenus mensuels. Si Ressources < 2 : perte de la propriété, -3 Autorité et -3 Renommée.'),
])
export const Offspring = new Legacy('offspring', [], [atLeastAttribute(Attributes.intellect, 2), atLeastAttribute(Attributes.charisma, 2)], [], undefined, undefined, [], [
  attrEx('body', 1),
  attrEx('instinct', 1),
  attr('charisma', -1),
  attr('intellect', -1),
])
export const DarkSecret = new Legacy('darksecret', [], [], [atLeastOrigin(Origins.secrets, 3), atLeastOrigin(Origins.allies, 1)], undefined, undefined, [], [
  origin('secrets', 3),
  m('Si le secret est révélé publiquement, un agent de haut rang est envoyé pour vous éliminer.'),
])
export const Heritage = new Legacy('heritage', [], [], [], undefined, undefined, ['traditionalist', 'abomination', 'chosen'], [
  { type: 'xpPotentialBonus' as const, points: 1 },
  m('Aucun historique ne peut dépasser 4 sans approbation.'),
])
export const Debitor = new Legacy('debitor', [], [], [atLeastOrigin(Origins.renown, 2)], undefined, undefined, [], [
  xp(5),
  origin('resources', 1),
  m('-2D interactions sociales avec marchands qui vous connaissent. -4D avec ceux que vous avez escroqués.'),
])
export const Famous = new Legacy('famous', [], [], [atLeastOrigin(Origins.renown, 3)], undefined, undefined, [], [
  m('+2D à toutes les interactions sociales. Décroit de 1D par semaine une fois que les gens vous connaissent vraiment, jusqu\'à -1D.'),
])
export const Assassin = new Legacy('assassin', [], [], [], undefined, undefined, [], [
  origin('secrets', 2),
  skill('stealth', 1),
  skill('dexterity', 1),
  m('Jets d\'interaction sociale avec le Culte de votre victime : -2D (Ascète), -4D (Sublime).'),
])
export const Rawhide = new Legacy('rawhide', [], [], [], undefined, undefined, ['abomination', 'destroyer', 'defiler', 'visionary'], [
  attrEx('psyche', 1),
  m('+1D défense mentale. Chaque échec de défense mentale = perte d\'Égo égale à la difficulté du jet.'),
])
export const Outlaw = new Legacy('outlaw', [], [], [atLeastOrigin(Origins.renown, 2), atLeastOrigin(Origins.authority, 2)], undefined, undefined, [], [
  skill('stealth', 1),
  skill('cunning', 1),
  m('+1D interactions sociales avec criminels. Prime sur votre tête : 250 LC × somme de vos 2 plus hauts Historiques.'),
])
export const CreatureOfHabit = new Legacy('creatureofhabit', [], [], [], Skills.focus, undefined, [], [
  m('Coût XP -2 pour attributs privilégiés, -1 pour compétences privilégiées. Coût XP +2 pour attributs non-privilégiés, +1 pour compétences non-privilégiées.'),
])
export const Marked = new Legacy('marked', [], [], [atLeastOrigin(Origins.secrets, 2)], undefined, undefined, ['adventurer', 'seeker', 'heretic', 'abomination'], [
  { type: 'sporeMax' as const, bonus: 5 },
  { type: 'choiceSkill' as const, bonus: 1, count: 1, scope: 'ins' as const, description: '+2 to an INS skill of your choice' },
  m('+5 valeur maximale de sporulation temporaire. -3D pour éviter de retomber dans la dépendance.'),
])
export const Experienced = new Legacy('experienced', [], [], [], undefined, undefined, [], [
  xp(6),
  { type: 'xpOriginBonus' as const, points: 1 },
  { type: 'xpPotentialBonus' as const, points: 2 },
  { type: 'choiceAttribute' as const, bonus: -1, count: 2, description: '-1 to two attributes of your choice' },
])
export const Sidewinder = new Legacy('sidewinder', [], [], [atLeastOrigin(Origins.network, 1), atLeastOrigin(Origins.secrets, 3)], undefined, undefined, ['heretic', 'defiler', 'abomination'], [
  xp(6),
  m('Le bonus de compétence de l\'ancien Culte reste applicable à la création. -5D interactions sociales avec l\'ancien Culte si reconnu.'),
])
export const Renegade = new Legacy('renegade', [], [], [atLeastOrigin(Origins.network, 3)], undefined, undefined, [], [
  m('Vous pouvez appliquer vos historiques à deux Cultes différents du vôtre. -2D avec eux si vous agissez contre eux.'),
])
export const Vindicated = new Legacy('vindicated', [], [], [atLeastOrigin(Origins.renown, 1)], undefined, undefined, [], [
  origin('renown', 3),
  m('+1D interactions sociales avec criminels. -2D avec individus qui connaissent votre passé.'),
])
export const Unforgiven = new Legacy('unforgiven', [], [], [], undefined, undefined, [], [
  { type: 'egoMax', bonus: 6 },
  skill('faith', 1),
  skill('willpower', 1),
  skill('focus', 1),
  skill('primal', 1),
  m('Objectif : retrouver l\'assassin de votre proche. Sans le traquer activement pendant 1 semaine, vous ne pouvez plus reconstituer votre réserve d\'Égo par le Concept.'),
])
export const Lurker = new Legacy('lurker', [], [], [atLeastOrigin(Origins.network, 2)], undefined, undefined, [], [
  xp(3),
  m('Si votre Historique Secrets atteint 4, ceux qui vous faisaient confiance se retournent contre vous.'),
])
export const Solo = new Legacy('solo', [], [], [], undefined, undefined, [], [
  skillEx('empathy', 1),
  skillEx('orienteering', 1),
  skillEx('perception', 1),
  skillEx('primal', 1),
  skillEx('survival', 1),
  skillEx('taming', 1),
  m('2 points d\'Égo pour agir en étroite collaboration avec quelqu\'un, sinon -1D à toutes vos actions.'),
])
export const Abducted = new Legacy('abducted', [], [], [atLeastOrigin(Origins.secrets, 3)], undefined, undefined, ['abomination'], [
  { type: 'xpAttributeBonus' as const, points: 1 },
  m('Vous débutez avec 3 points de sporulation permanente.'),
])
export const Veteran = new Legacy('veteran', [], [], [atLeastOrigin(Origins.renown, 2), atLeastOrigin(Origins.authority, 2)], undefined, undefined, [], [
  origin('renown', 2),
  origin('allies', 2),
  { type: 'choiceSkill' as const, bonus: 2, count: 1, scope: 'combat' as const, description: '+2 to a combat skill of your choice' },
  m('Si vous perdez un combat ou une mission, tous vos Historiques baissent de 2.'),
])
export const Journeyman = new Legacy('journeyman', [], [], [atLeastOrigin(Origins.network, 2), atLeastOrigin(Origins.resources, 1)], undefined, undefined, ['adventurer', 'traveler'], [
  origin('network', 1),
  m('+1D INS+Orientation. Alliés et Autorité ne peuvent pas dépasser 3.'),
])
export const Superstitious = new Legacy('superstitious', [], [], [], undefined, undefined, ['healer', 'traditionalist', 'zealot', 'disciple'], [
  { type: 'choiceSkill' as const, bonus: 2, count: 1, scope: 'ins' as const, description: '+2 to an INT skill of your choice' },
  m('Peut dépasser le max normal. Science et Technologie ne peuvent pas dépasser 0.'),
])
export const FamilyBond = new Legacy('familybond', [], [], [atLeastOrigin(Origins.allies, 1), atLeastOrigin(Origins.network, 1)], undefined, undefined, [], [
  origin('resources', 2),
  origin('allies', 2),
  m('Bonus applicables dans votre Culture d\'origine. Si vous rejetez votre famille, tous vos Historiques baissent de 2.'),
])
export const Gifted = new Legacy('gifted', [], [], [], undefined, undefined, ['creator', 'seeker', 'visionary'], [
  m('+6 points dans des compétences de CHA ou d\'INT (peut dépasser le max normal). -2D à tous les jets de Défense mentale.'),
])
export const TechTuned = new Legacy('techtuned', [atLeastSkill(Skills.artifactLore, 6)], [], [atLeastOrigin(Origins.renown, 2)], undefined, undefined, [], [
  origin('renown', 2),
  m('+2D pour rassembler un groupe de chercheurs de ferraille. Chaque mauvaise estimation perd 1 Renommée et réduit ce bonus de 1D (max -2D).'),
])
export const Vigilante = new Legacy('vigilante', [], [], [], undefined, undefined, ['conqueror', 'chosen', 'protector', 'righteous'], [
  { type: 'xpPotentialBonus' as const, points: 1 },
  { type: 'choiceSkill' as const, bonus: 2, count: 1, scope: 'faithOrWillpower' as const, description: '+2 to Faith or Willpower (your choice)' },
  m('-2D interactions sociales avec forces de l\'ordre et entités criminelles.'),
])
export const CannonFodder = new Legacy('cannonfodder', [], [], [atLeastOrigin(Origins.renown, 2)], undefined, undefined, ['martyr', 'conqueror', 'destroyer'], [
  skillEx('brawl', 1),
  skillEx('melee', 1),
  skillEx('projectiles', 1),
  m('+1 à toutes les compétences de combat (peut dépasser le max normal). -2D à tous les jets d\'interactions sociales pacifiques.'),
])
export const Seer = new Legacy('seer', [], [], [atLeastOrigin(Origins.authority, 3)], undefined, undefined, ['healer', 'mediator', 'chosen', 'righteous'], [
  skillEx('empathy', 2),
  skillEx('perception', 2),
  m('+2 aux compétences ci-dessus peut dépasser le max normal. -1D à tous les jets nécessitant d\'examiner le monde présent.'),
])
export const Repugnant = new Legacy('repugnant', [], [], [], undefined, undefined, [], [
  m('PSY+Domination +2S pour intimider. -1S à toutes les compétences de CHA sauf CHA+Art.'),
])
export const Taken = new Legacy('taken', [], [], [], undefined, undefined, [], [
  skillEx('survival', 1),
  { type: 'choiceSkill' as const, bonus: 1, count: 1, scope: 'faithOrWillpower' as const, description: '+1 to Faith or Willpower (your choice; can exceed the normal maximum)' },
  m('Peut dépasser le max normal pour les compétences ci-dessus. 2 points d\'Égo pour éviter de suivre une piste liée à votre passé, sinon -2D pour le reste de la journée.'),
])
export const Lowlife = new Legacy('lowlife', [], [], [atLeastOrigin(Origins.renown, 2), atLeastOrigin(Origins.network, 1)], undefined, undefined, [], [
  m('+2D interactions sociales avec criminels. -2D interactions sociales avec forces de l\'ordre.'),
])
export const Henchman = new Legacy('henchman', [], [], [atLeastOrigin(Origins.renown, 1), atLeastOrigin(Origins.secrets, 1)], undefined, undefined, [], [
  xp(6),
  m('Si vous agissez contre votre Culte, Alliés/Autorité/Ressources baissent de 2. Vos supérieurs peuvent décider de vous faire taire.'),
])
export const Mesmerized = new Legacy('mesmerized', [], [], [atLeastOrigin(Origins.secrets, 3)], undefined, undefined, [], [
  xp(8),
  m('-1D défense mentale contre la mémétique. Le Dormeur qui vous a contrôlé vous cherche toujours.'),
])
export const Programmed = new Legacy('programmed', [], [], [atLeastOrigin(Origins.secrets, 2)], undefined, undefined, [], [
  { type: 'xpPotentialBonus' as const, points: 1 },
  m('Jet de Défense mentale (2) pour résister à agir selon votre conditionnement.'),
])
export const Primordial = new Legacy('primordial', [], [], [], Skills.primal, undefined, [], [
  m('Coût XP -2 pour attributs privilégiés, -1 pour compétences privilégiées. Coût XP +2 pour attributs non-privilégiés, +1 pour compétences non-privilégiées.'),
])
export const Idolatrist = new Legacy('idolatrist', [], [], [atLeastOrigin(Origins.renown, 3)], undefined, undefined, ['ruler', 'conqueror', 'chosen', 'visionary'], [
  m('+2D à toutes les compétences de CHA tant que Renommée > 2. 1 Égo pour créer quelque chose de nouveau, sinon -2D.'),
])
export const Inheritor = new Legacy('inheritor', [], [], [atLeastOrigin(Origins.allies, 2), atLeastOrigin(Origins.authority, 1)], undefined, undefined, [], [
  origin('resources', 2),
  origin('allies', 1),
  m('Si Alliés passe sous 2, Ressources tombe à 0.'),
])
export const Impostor = new Legacy('impostor', [atLeastSkill(Skills.deception, 7)], [], [atLeastOrigin(Origins.secrets, 2), atLeastOrigin(Origins.allies, 2)], undefined, undefined, [], [
  m('Tous vos Historiques peuvent être appliqués à un autre Culte. 1 Égo pour maintenir votre histoire cohérente lors d\'un mensonge, sinon +2D pour détecter le mensonge.'),
])

export const Legacies = [
    Entrepreneur,
    Patron,
    Outcast,
    Optimized,
    Firebrand,
    Landlord,
    Offspring,
    DarkSecret,
    Heritage,
    Debitor,
    Famous,
    Assassin,
    Rawhide,
    Outlaw,
    CreatureOfHabit,
    Marked,
    Experienced,
    Sidewinder,
    Renegade,
    Vindicated,
    Unforgiven,
    Lurker,
    Solo,
    Abducted,
    Veteran,
    Journeyman,
    Superstitious,
    FamilyBond,
    Gifted,
    TechTuned,
    Vigilante,
    CannonFodder,
    Seer,
    Repugnant,
    Taken,
    Lowlife,
    Henchman,
    Mesmerized,
    Programmed,
    Primordial,
    Idolatrist,
    Inheritor,
    Impostor
]

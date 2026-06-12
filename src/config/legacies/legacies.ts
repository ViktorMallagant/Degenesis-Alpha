import { Legacy } from './legacy'
import { Attributes, Skills, Origins } from '../properties'
import { atLeastAttribute, atLeastSkill, either, atLeastOrigin } from '../requirements'

export const Entrepreneur = new Legacy('entrepreneur', [], [], [atLeastOrigin(Origins.resources, 3)], undefined, undefined, ['creator', 'conqueror', 'visionary'])
export const Patron = new Legacy('patron', [], [], [atLeastOrigin(Origins.allies, 2)], undefined, undefined)
export const Outcast = new Legacy('outcast', [], [], [], undefined, undefined)
export const Optimized = new Legacy('optimized', [], [], [], undefined, undefined, ['seeker', 'healer', 'chosen', 'disciple'])
export const Firebrand = new Legacy('firebrand', [], [], [atLeastOrigin(Origins.renown, 3)], undefined, undefined, ['conqueror', 'zealot', 'righteous'])
export const Landlord = new Legacy('landlord', [], [], [atLeastOrigin(Origins.resources, 3), atLeastOrigin(Origins.authority, 1)], undefined, undefined)
export const Offspring = new Legacy('offspring', [], [atLeastAttribute(Attributes.intellect, 2), atLeastAttribute(Attributes.charisma, 2)], [], undefined, undefined)
export const DarkSecret = new Legacy('darksecret', [], [], [atLeastOrigin(Origins.secrets, 3), atLeastOrigin(Origins.allies, 1)], undefined, undefined)
export const Heritage = new Legacy('heritage', [], [], [], undefined, undefined, ['traditionalist', 'abomination', 'chosen'])
export const Debitor = new Legacy('debitor', [], [], [atLeastOrigin(Origins.renown, 2)], undefined, undefined)
export const Famous = new Legacy('famous', [], [], [atLeastOrigin(Origins.renown, 3)], undefined, undefined)
export const Assassin = new Legacy('assassin', [], [], [], undefined, undefined)
export const Rawhide = new Legacy('rawhide', [], [], [], undefined, undefined, ['abomination', 'destroyer', 'defiler', 'visionary'])
export const Outlaw = new Legacy('outlaw', [], [], [atLeastOrigin(Origins.renown, 2), atLeastOrigin(Origins.authority, 2)], undefined, undefined)
export const CreatureOfHabit = new Legacy('creatureofhabit', [], [], [], Skills.focus, undefined)
export const Marked = new Legacy('marked', [], [], [atLeastOrigin(Origins.secrets, 2)], undefined, undefined, ['adventurer', 'seeker', 'heretic', 'abomination'])
export const Experienced = new Legacy('experienced', [], [], [], undefined, undefined)
export const Sidewinder = new Legacy('sidewinder', [], [], [atLeastOrigin(Origins.network, 1), atLeastOrigin(Origins.secrets, 3)], undefined, undefined, ['heretic', 'defiler', 'abomination'])
export const Renegade = new Legacy('renegade', [], [], [atLeastOrigin(Origins.network, 3)], undefined, undefined)
export const Vindicated = new Legacy('vindicated', [], [], [atLeastOrigin(Origins.renown, 1)], undefined, undefined)
export const Unforgiven = new Legacy('unforgiven', [], [], [], undefined, undefined)
export const Lurker = new Legacy('lurker', [], [], [atLeastOrigin(Origins.network, 2)], undefined, undefined)
export const Solo = new Legacy('solo', [], [], [], undefined, undefined)
export const Abducted = new Legacy('abducted', [], [], [atLeastOrigin(Origins.secrets, 3)], undefined, undefined)
export const Veteran = new Legacy('veteran', [], [], [atLeastOrigin(Origins.renown, 2), atLeastOrigin(Origins.authority, 2)], undefined, undefined)
export const Journeyman = new Legacy('journeyman', [], [], [atLeastOrigin(Origins.network, 2), atLeastOrigin(Origins.resources, 1)], undefined, undefined, ['adventurer', 'traveler'])
export const Superstitious = new Legacy('superstitious', [], [], [], undefined, undefined, ['healer', 'traditionalist', 'zealot', 'disciple'])
export const FamilyBond = new Legacy('familybond', [], [], [atLeastOrigin(Origins.allies, 1), atLeastOrigin(Origins.network, 1)], undefined, undefined)
export const Gifted = new Legacy('gifted', [], [], [], undefined, undefined, ['creator', 'seeker', 'visionary'])
export const TechTuned = new Legacy('techtuned', [atLeastSkill(Skills.artifactLore, 6)], [], [atLeastOrigin(Origins.renown, 2)], undefined, undefined)
export const Vigilante = new Legacy('vigilante', [], [], [], undefined, undefined, ['conqueror', 'chosen', 'protector', 'righteous'])
export const CannonFodder = new Legacy('cannonfodder', [], [], [atLeastOrigin(Origins.renown, 2)], undefined, undefined, ['martyr', 'conqueror', 'destroyer'])
export const Seer = new Legacy('seer', [], [], [atLeastOrigin(Origins.authority, 3)], undefined, undefined, ['healer', 'mediator', 'chosen', 'righteous'])
export const Repugnant = new Legacy('repugnant', [], [], [], undefined, undefined)
export const Taken = new Legacy('taken', [], [], [], undefined, undefined)
export const Lowlife = new Legacy('lowlife', [], [], [atLeastOrigin(Origins.renown, 2), atLeastOrigin(Origins.network, 1)], undefined, undefined)
export const Henchman = new Legacy('henchman', [], [], [atLeastOrigin(Origins.renown, 1), atLeastOrigin(Origins.secrets, 1)], undefined, undefined)
export const Mesmerized = new Legacy('mesmerized', [], [], [atLeastOrigin(Origins.secrets, 3)], undefined, undefined)
export const Programmed = new Legacy('programmed', [], [], [atLeastOrigin(Origins.secrets, 2)], undefined, undefined)
export const Primordial = new Legacy('primordial', [], [], [], Skills.primal, undefined)
export const Idolatrist = new Legacy('idolatrist', [], [], [atLeastOrigin(Origins.renown, 3)], undefined, undefined, ['ruler', 'conqueror', 'chosen', 'visionary'])
export const Inheritor = new Legacy('inheritor', [], [], [atLeastOrigin(Origins.resources, 2), atLeastOrigin(Origins.allies, 1)], undefined, undefined)
export const Impostor = new Legacy('impostor', [atLeastSkill(Skills.deception, 7)], [], [atLeastOrigin(Origins.secrets, 2), atLeastOrigin(Origins.allies, 2)], undefined, undefined)

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
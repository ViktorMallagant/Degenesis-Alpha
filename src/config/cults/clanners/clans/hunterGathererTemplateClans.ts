import { createHunterGathererClan } from './hunterGathererTemplate'

const mechansTemplate = createHunterGathererClan('mechans')
const phosphoritesTemplate = createHunterGathererClan('phosphorites')
const enemoiTemplate = createHunterGathererClan('enemoi')
const stukovNomadsTemplate = createHunterGathererClan('stukovNomads')
const storskisTemplate = createHunterGathererClan('storskis')
const corpseEatersTemplate = createHunterGathererClan('corpseEaters')
const gargantiTemplate = createHunterGathererClan('garganti')
const voivodulesTemplate = createHunterGathererClan('voivodules')
const matadorsTemplate = createHunterGathererClan('matadors')
const flayersTemplate = createHunterGathererClan('flayers')
const adrianiTemplate = createHunterGathererClan('adriani')
const lombardiTemplate = createHunterGathererClan('lombardi')
const vigilantesTemplate = createHunterGathererClan('vigilantes')
const romanosTemplate = createHunterGathererClan('romanos')
const masaiTemplate = createHunterGathererClan('masai')
const shabathTemplate = createHunterGathererClan('shabath')

export const Mechans = mechansTemplate.clan
export const Phosphorites = phosphoritesTemplate.clan
export const Enemoi = enemoiTemplate.clan
export const StukovNomads = stukovNomadsTemplate.clan
export const Storskis = storskisTemplate.clan
export const CorpseEaters = corpseEatersTemplate.clan
export const Garganti = gargantiTemplate.clan
export const Voivodules = voivodulesTemplate.clan
export const Matadors = matadorsTemplate.clan
export const Flayers = flayersTemplate.clan
export const Adriani = adrianiTemplate.clan
export const Lombardi = lombardiTemplate.clan
export const Vigilantes = vigilantesTemplate.clan
export const Romanos = romanosTemplate.clan
export const Masai = masaiTemplate.clan
export const Shabath = shabathTemplate.clan

export const HunterGathererTemplateClanRanks = [
  ...mechansTemplate.ranks,
  ...phosphoritesTemplate.ranks,
  ...enemoiTemplate.ranks,
  ...stukovNomadsTemplate.ranks,
  ...storskisTemplate.ranks,
  ...corpseEatersTemplate.ranks,
  ...gargantiTemplate.ranks,
  ...voivodulesTemplate.ranks,
  ...matadorsTemplate.ranks,
  ...flayersTemplate.ranks,
  ...adrianiTemplate.ranks,
  ...lombardiTemplate.ranks,
  ...vigilantesTemplate.ranks,
  ...romanosTemplate.ranks,
  ...masaiTemplate.ranks,
  ...shabathTemplate.ranks
]

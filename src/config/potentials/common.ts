import { Potential } from './potential'
import { Attributes, Skills } from '../properties'
import { atLeastAttribute, atLeastSkill, either } from '../requirements'

export const Asceticism = new Potential(
  'asceticism',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Peut sauter (1) repas par niveau de Potentiel sans malus.']
)
export const EtherCall = new Potential(
  'etherCall',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à tous les jets en opposition contre un adversaire infesté par les spores (si Sporulation personnelle ≥ 5).']
)
export const MovingMountains = new Potential(
  'movingMountains',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['En situation désespérée : (1) succès supplémentaire par niveau à (1) action. Utilisable une fois tous les 3 jours.']
)
export const ElephantSkin = new Potential(
  'elephantSkin',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['(1) point d\'armure naturelle par niveau. −1D par niveau à CHA+Séduction.']
)
export const Brainwave = new Potential(
  'brainwave',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à un unique jet d\'INT. Utilisable une fois par jour.']
)
export const DangerSense = new Potential(
  'dangerSense',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Quand un danger menace : +1D par niveau à INS+Perception.']
)
export const Sleek = new Potential(
  'sleek',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau aux jets pour se libérer d\'une prise, d\'une immobilisation ou de chaînes.']
)
export const CouldBeWorse = new Potential(
  'couldBeWorse',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Les malus de Traumatisme sont réduits de (1) par niveau de Potentiel.']
)
export const Marathon = new Potential(
  'marathon',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à PHY+Vigueur pour les jets liés à la course.']
)
export const Unyielding = new Potential(
  'unyielding',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  Skills.willpower,
  undefined,
  ['Une fois par confrontation : +1D par niveau à la Défense mentale pour contrer une Attaque mentale.']
)
export const NumberCruncher = new Potential(
  'numberCruncher',
  undefined,
  [],
  [atLeastAttribute(Attributes.intellect, 4)],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à tout ce qui peut être résolu par les mathématiques ou la logique.']
)
export const UntoDeath = new Potential(
  'untoDeath',
  undefined,
  [atLeastSkill(Skills.leadership, 10)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Fidèles combattant pour le personnage : récupèrent (1) Égo/round en sa présence. +1 Initiative par niveau au round 1.']
)
export const Hawkeye = new Potential(
  'hawkeye',
  undefined,
  [atLeastSkill(Skills.projectiles, 8), atLeastSkill(Skills.perception, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à AGI+Armes à projectiles pour les cibles hors portée effective.']
)
export const FirstLanguage = new Potential(
  'firstLanguage',
  undefined,
  [atLeastSkill(Skills.orienteering, 4), atLeastSkill(Skills.primal, 4)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Ne se perd jamais, trouve toujours nourriture et eau. (1) succès automatique par niveau à ses jets d\'INS+Compétence.']
)
export const VipersTongue = new Potential(
  'vipersTongue',
  undefined,
  [atLeastSkill(Skills.seduction, 9)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Après séduction réussie : Défense mentale de la cible réduite de 1D par niveau lors de toute tentative d\'influence.']
)
export const Undefeatable = new Potential(
  'undefeatable',
  undefined,
  [
    atLeastSkill(Skills.mobility, 10),
    either(atLeastSkill(Skills.brawl, 10), atLeastSkill(Skills.melee, 10))
  ],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['En combat rapproché : +1 Défense passive par niveau pour (1) Égo par niveau et par round.']
)
export const Paragon = new Potential(
  'paragon',
  undefined,
  [atLeastSkill(Skills.leadership, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Alliés combattant sous ses ordres : +1D aux jets de défense ou soutien. CHA+Commandement (3) → alliés récupèrent (niveau) Égo.']
)
export const Ambidextrous = new Potential(
  'ambidextrous',
  undefined,
  [atLeastSkill(Skills.mobility, 6)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Malus de combat ambidextre réduit de (1) par niveau. Les dés doivent encore être divisés entre les attaques.']
)
export const ToughAsNails = new Potential(
  'toughAsNails',
  undefined,
  [atLeastSkill(Skills.toughness, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Sur le point de perdre conscience (Égo) : Défense mentale (4) +1D par niveau → si succès, toute la dernière perte d\'Égo est annulée.']
)
export const Luminary = new Potential(
  'luminary',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['(1) déclencheur par niveau à tous jets de la compétence choisie. −1D par niveau aux autres compétences du même attribut.']
)
export const FoolsFate = new Potential(
  'foolsFate',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Après un jet : relancer 1D par 2 Égo dépensés (maximum = niveau). Une seule utilisation par lancer ; doit garder le nouveau résultat.']
)
export const Beastmaster = new Potential(
  'beastmaster',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à INS+Dressage. (1) déclencheur par niveau aux jets avec les créatures liées.']
)
export const QuickEye = new Potential(
  'quickEye',
  undefined,
  [atLeastSkill(Skills.perception, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Annule 1D de malus lié à la vitesse par niveau (déplacement, cibles actives ou en mouvement, vitesse de véhicule).']
)
export const Mole = new Potential(
  'mole',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Chaque round entier à couvert : +1 Défense passive (max = niveau). Réinitialisé en quittant ou perdant le couvert.']
)
export const PitFighter = new Potential(
  'pitFighter',
  undefined,
  [atLeastSkill(Skills.brawl, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Corps désarmé : +niveau à Force pour Étourdissement ; ou supprimer Étourdissement pour infliger des dégâts de fracture.']
)
export const Goliath = new Potential(
  'goliath',
  undefined,
  [atLeastSkill(Skills.force, 6)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à PHY+Force. Annule 1D d\'encombrement par niveau. +niveau à Force pour les dégâts en corps à corps. Besoin du double de nourriture.']
)
export const Adaptability = new Potential(
  'adaptability',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Achat de compétences/attributs non privilégiés : multiplicateur réduit de 1 (compétences niv. 1, attributs niv. 2), et des deux de 2 au niv. 3.']
)
export const Pariah = new Potential(
  'pariah',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Avec son propre Culte/clan : −1D par niveau à PSY et CHA. Avec tout autre Culte/clan : +1D à la place.']
)
export const Herald = new Potential(
  'herald',
  undefined,
  [atLeastSkill(Skills.leadership, 6)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à la Défense mentale. Alliés optant pour ce jet gagnent (1) succès auto par déclencheur du héraut ; si le héraut échoue, ils échouent automatiquement.']
)
export const Rebel = new Potential(
  'rebel',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Rallier sa cause : +1D par niveau à PSY et CHA. Chaque Renommée bravant le pouvoir = +1 Alliés. Malus = Renommée aux jets PSY/CHA envers les Cultes désignés.']
)

export const CommonPotentials = [
  Asceticism,
  EtherCall,
  MovingMountains,
  ElephantSkin,
  Brainwave,
  DangerSense,
  Sleek,
  CouldBeWorse,
  Marathon,
  Unyielding,
  NumberCruncher,
  UntoDeath,
  Hawkeye,
  FirstLanguage,
  VipersTongue,
  Undefeatable,
  Paragon,
  Ambidextrous,
  ToughAsNails,
  Luminary,
  FoolsFate,
  Beastmaster,
  QuickEye,
  Mole,
  PitFighter,
  Goliath,
  Adaptability,
  Pariah,
  Herald,
  Rebel
]

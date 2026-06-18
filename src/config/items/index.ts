export type ItemCategory =
  | 'armesDeLutte'
  | 'armesDeCorpsACorps'
  | 'armesDeJet'
  | 'armesAProjectiles'
  | 'armesDePoing'
  | 'fusils'
  | 'armesLourdes'
  | 'munitions'
  | 'explosifs'
  | 'armesSoniques'
  | 'agentsChimiques'
  | 'armures'
  | 'boucliers'
  | 'equipementDeSurvieBasique'
  | 'pieges'
  | 'sourcesLumineuses'
  | 'orientationPistage'
  | 'escalade'
  | 'materielDeCouchage'
  | 'transport'
  | 'danslOmbre'
  | 'technologie'
  | 'disquesSolaires'
  | 'modulesChroniqueurs'
  | 'modulesHarnaisHellvetiques'
  | 'talismansEmblemes'
  | 'communication'
  | 'masquesAGaz'
  | 'artillerie'
  | 'vehiculesMontures'
  | 'equipementMedical'
  | 'huilesElyseennes'
  | 'pharmacopee'
  | 'achatArtefacts'
  | 'artefacts'
  | 'brulures'
  | 'equipementSurvie'
  | 'gestionEnergie'
  | 'poudreNoire'
  | 'restesPsychonautiques'
  | 'chassePsychonautes'
  | 'primalisme'
  | 'artefactsLegendaires'

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  armesDeLutte: 'Armes de Lutte',
  armesDeCorpsACorps: 'Armes de Corps à Corps',
  armesDeJet: 'Armes de Jet',
  armesAProjectiles: 'Armes à Projectiles',
  armesDePoing: 'Armes de Poing',
  fusils: 'Fusils',
  armesLourdes: 'Armes Lourdes',
  munitions: 'Munitions',
  explosifs: 'Explosifs',
  armesSoniques: 'Armes Soniques',
  agentsChimiques: 'Agents Chimiques',
  armures: 'Armures',
  boucliers: 'Boucliers',
  equipementDeSurvieBasique: 'Équipement de Survie Basique',
  pieges: 'Pièges',
  sourcesLumineuses: 'Sources Lumineuses / Feu',
  orientationPistage: 'Orientation / Pistage',
  escalade: 'Escalade',
  materielDeCouchage: 'Matériel de Couchage',
  transport: 'Transport',
  danslOmbre: 'Dans l\'Ombre',
  technologie: 'Technologie',
  disquesSolaires: 'Disques Solaires',
  modulesChroniqueurs: 'Modules pour Combinaison de Chroniqueurs',
  modulesHarnaisHellvetiques: 'Modules pour Harnais Hellvétiques',
  talismansEmblemes: 'Talismans / Emblèmes',
  communication: 'Communication',
  masquesAGaz: 'Masques à Gaz',
  artillerie: 'Artillerie',
  vehiculesMontures: 'Véhicules / Montures',
  equipementMedical: 'Équipement Médical',
  huilesElyseennes: 'Huiles Élyséennes',
  pharmacopee: 'Pharmacopée',
  achatArtefacts: 'Achat d\'Artéfacts',
  artefacts: 'Artéfacts',
  brulures: 'Types de Brûlure',
  equipementSurvie: 'Équipement de Survie',
  gestionEnergie: 'Gestion d\'Énergie',
  poudreNoire: 'Poudre Noire',
  restesPsychonautiques: 'Restes Psychonautiques',
  chassePsychonautes: 'Chasse aux Psychonautes',
  primalisme: 'Primalisme Commun',
  artefactsLegendaires: 'Artéfacts Légendaires',
}

export const CATEGORY_ORDER: ItemCategory[] = [
  'armesDeLutte',
  'armesDeCorpsACorps',
  'armesDeJet',
  'armesAProjectiles',
  'armesDePoing',
  'fusils',
  'armesLourdes',
  'munitions',
  'explosifs',
  'armesSoniques',
  'agentsChimiques',
  'armures',
  'boucliers',
  'equipementDeSurvieBasique',
  'pieges',
  'sourcesLumineuses',
  'orientationPistage',
  'escalade',
  'materielDeCouchage',
  'transport',
  'danslOmbre',
  'technologie',
  'disquesSolaires',
  'modulesChroniqueurs',
  'modulesHarnaisHellvetiques',
  'talismansEmblemes',
  'communication',
  'masquesAGaz',
  'artillerie',
  'vehiculesMontures',
  'equipementMedical',
  'huilesElyseennes',
  'pharmacopee',
  'achatArtefacts',
  'artefacts',
  'brulures',
  'equipementSurvie',
  'gestionEnergie',
  'poudreNoire',
  'restesPsychonautiques',
  'chassePsychonautes',
  'primalisme',
  'artefactsLegendaires',
]

export interface Item {
  id: string
  name: string
  category: ItemCategory
  cult?: string
  caliber?: string
  handling?: string
  range?: string
  damage?: string
  magazine?: string
  properties?: string
  encumbrance?: number
  techLevel?: string
  slots?: number
  value: number
  resources?: number
  armorValue?: string
  description?: string
  image?: string
  levelable?: boolean
}

export interface InventoryPurchase {
  itemId: string
  purchasedWithResources: boolean
  decrementedResources: boolean
  level?: number
  entrepreneurResources?: boolean
  fromLegacy?: string
  free?: boolean
}

export enum ResourceMode {
  A = 'A',
  B = 'B',
  C = 'C',
}

// Minimum advancements for each resource level (0–6)
export const ADVANCEMENT_THRESHOLDS = [0, 2, 5, 9, 14, 20, 27]

export function advancementsToLevel(advancements: number): number {
  for (let lvl = 6; lvl >= 0; lvl--) {
    if (advancements >= ADVANCEMENT_THRESHOLDS[lvl]) return lvl
  }
  return 0
}

export function levelToMinAdvancements(level: number): number {
  return ADVANCEMENT_THRESHOLDS[Math.max(0, Math.min(6, level))]
}

const IMG = 'https://raw.githubusercontent.com/greedyj4ck/DEGENESIS-FoundryVTT/main/icons/items/'

export const ITEMS: Item[] = [
  // ─── MUNITIONS ───
  {
    id: 'mun-50gl', name: '.50 GL', category: 'munitions', damage: '12', techLevel: 'IV', value: 70,
    image: IMG + 'ammo/50gl.png',
    description: '<b>.50 GL — « TONNERRE »</b><br>Un très gros calibre à impact extrême. Le gaz pressurisé dans la balle est capable de détruire les armes les moins résistantes. On a plutôt tendance à échanger ces munitions qu\'à les utiliser.',
  },
  {
    id: 'mun-357', name: '.357', category: 'munitions', damage: '6', techLevel: 'IV', value: 20, image: IMG + 'ammo/357.png',
    description: '<b>.357 — « CUIVRE »</b><br>À l\'Ère de la Bête, les humains chassaient tout ce qui avait de la chair et des os. Ils utilisaient principalement des carabines et des petits pistolets de calibre .357.<br><br>Aujourd\'hui, des enfants trouvent encore des cartouches dans la poussière. Ils les récupèrent, puis les troquent dans les manufactures contre du pain et de la soupe. Ces cartouches sont alors nettoyées, polies, puis remplies de poudre et de balles. Les vieux stocks de munitions se font extrêmement rares.',
  },
  {
    id: 'mun-44', name: '.44', category: 'munitions', damage: '10', techLevel: 'IV', value: 50, image: IMG + 'ammo/44.png',
    description: '<b>.44 — « ALPINE »</b><br>Munition très puissante pour revolvers à double action. Au sud de la Borca, la découverte d\'un entrepôt fit sensation il y a dix hivers de cela. Le site fut exploité, et les munitions envahirent les marchés du canton. La plupart des balles de calibre .44 vendues à Justitienne ou à Wroclaw proviennent de cet endroit.',
  },
  {
    id: 'mun-556', name: '5.56x45 mm', category: 'munitions', damage: '11', techLevel: 'IV', value: 60, image: IMG + 'ammo/5_56x45mm.png',
    description: '<b>5.56×45 mm OEU — « DIGITAL »</b><br>Calibre standard des nations de l\'OTAN au XXIe siècle. Bien que l\'OEU ait pris définitivement la place de l\'OTAN, les performances de ces munitions leur permirent de continuer à être utilisées, et ce, jusqu\'à aujourd\'hui.<br><br>Une balle 5.56 × 45 mm OEU est vraiment efficace contre une cible humaine non protégée, mais percera difficilement une armure lourde si la cible est éloignée.',
  },
  {
    id: 'mun-balle-blindee-hf', name: 'Balle Blindée HF', category: 'munitions', damage: '11', techLevel: 'IV', value: 80, image: IMG + 'ammo/hf_full_jacket.png',
    description: '<b>BALLE BLINDÉE HAUTE FRÉQUENCE</b><br>Équivalent du calibre 5.56 × 45 mm OEU, ce type de munitions fut modifié par les Hellvétiques pour être utilisé à haute fréquence de tir avec leurs défricheurs. C\'est la couche de Téflon qui entoure chaque cartouche qui rend cette utilisation possible.',
  },
  {
    id: 'mun-pointe-creuse-hf', name: 'Balle Pointe Creuse HF', category: 'munitions', damage: '14', techLevel: 'IV', value: 80, image: IMG + 'ammo/hf_hollow_point.png',
    description: '<b>BALLE POINTE CREUSE À HAUTE FRÉQUENCE</b><br>Munition pour défricheur qui ressemble elle aussi au 5.56 × 45 mm OEU, et qui est conçue pour infliger le plus de dégâts possibles aux tissus humains. En contrepartie, sa puissance de pénétration reste limitée.',
  },
  {
    id: 'mun-flechette-chasse', name: '5.56 mm Fléchette CHASSE', category: 'munitions', damage: '13', techLevel: 'V', value: 220, image: IMG + 'ammo/5_56_hunter_flechette.png',
    description: '<b>FLÉCHETTE DE CHASSE — « FRAGMENTEUR »</b><br>Ces fléchettes à très haute vitesse initiale possèdent une excellente puissance de pénétration. Bien que prohibées sur les champs de bataille, elles furent utilisées dans certains conflits.<br><br>Alors que des cartouches normales peuvent être en partie recyclées, c\'est impossible dans le cas des fléchettes. Une fois tirées, elles se déforment dans leur cible et deviennent inutilisables. La précision requise pour leur fabrication s\'est perdue lors du cataclysme. Les fléchettes sont considérées comme extrêmement rares et vendues à des prix exorbitants sur les marchés.',
  },
  {
    id: 'mun-46x30', name: '4.6x30 mm', category: 'munitions', damage: '7', techLevel: 'IV', value: 30, image: IMG + 'ammo/4_6x30mm.png',
    description: '<b>4.6×30 MM</b><br>Munition standard de l\'OTAN et ensuite de l\'OEU pour pistolets et pistolets mitrailleurs. Disponible de manière éparse, elle se trouve généralement près des barricades et des casernes de l\'OEU.',
  },
  {
    id: 'mun-9mm', name: '9 mm', category: 'munitions', damage: '9', techLevel: 'IV', value: 40, image: IMG + 'ammo/9mm.png',
    description: '<b>9 MM OEU</b><br>Les armes de calibre 9 mm ont presque toutes disparu, et les quelques munitions encore trouvables résident dans leurs chargeurs. Il est fort probable que la production de munitions de calibre 9 mm OEU ait été stoppée plusieurs années avant l\'Eshaton.',
  },
  {
    id: 'mun-5x30-sans-douille', name: '5x30 mm Sans Douille', category: 'munitions', damage: '8', techLevel: 'V', value: 180, image: IMG + 'ammo/5x30mm_caseless.png',
    description: '<b>5×30 MM SANS DOUILLE</b><br>Balle sans douille à bonnes propriétés balistiques. Le projectile est fiché dans un bloc de poudre comprimée et durcie qui s\'enflamme entièrement lors du tir. Aucun fabricant connu ne sait produire ces munitions.',
  },
  {
    id: 'mun-cal12-chevrotine', name: 'Calibre 12 (Chevrotine)', category: 'munitions', damage: '10', properties: 'Dispersion', techLevel: 'III', value: 10, image: IMG + 'ammo/caliber_12_buckshot.png',
    description: '<b>CALIBRE 12</b><br>Les Ferrailleurs adorent les munitions de calibre 12. Ils remplissent les munitions, épaisses comme un pouce, de vis, de clous, de cailloux, de sel ou de chevrotine. Ils expérimentent aussi différents mélanges de poudre. Ce calibre ne fonctionne qu\'avec les fusils de chasse.',
  },
  {
    id: 'mun-cal12-fusil', name: 'Calibre 12 (Munition à fusil)', category: 'munitions', damage: '10', techLevel: 'III', value: 20, image: IMG + 'ammo/caliber_12_rifle_barrel_ammo.png',
    description: '<b>CALIBRE 12</b><br>Les Ferrailleurs adorent les munitions de calibre 12. Ils remplissent les munitions, épaisses comme un pouce, de vis, de clous, de cailloux, de sel ou de chevrotine. Ils expérimentent aussi différents mélanges de poudre. Ce calibre ne fonctionne qu\'avec les fusils de chasse.',
  },
  {
    id: 'mun-balle-plomb', name: 'Balle en plomb et poudre noire', category: 'munitions', damage: '8', techLevel: 'III', value: 10, image: IMG + 'ammo/lead_bullet.png',
    description: '<b>BALLES EN PLOMB ET POUDRE NOIRE</b><br>Pour produire une balle en plomb, il faut du plomb fondu et une tour. Le plomb est versé dans une passoire au sommet de la tour. Lors de sa chute, il prend une forme arrondie, durcit, puis atterrit dans un morceau de tissu en contrebas.<br><br>Pour la poudre à propulsion, du charbon de bois, du salpêtre et du soufre sont broyés, mélangés, puis enroulés dans de fines bandelettes de cellulose. La poudre et la balle sont ensuite chargées dans l\'arme par la bouche du canon. Le mécanisme de platine à silex crée une étincelle dans le canon, ce qui enflamme la charge de poudre.',
  },
  {
    id: 'mun-ecube', name: 'E-Cube', category: 'munitions', techLevel: 'V', value: 1000, image: IMG + 'ammo/e_cube_full.png',
    description: '<b>E-CUBE</b><br>L\'E-Cube est un réservoir d\'énergie rechargeable utilisé sur des armes énergétiques telles que le ravageur, l\'électrocuteur ou le fustigateur. Son aspect cubique et compact lui permet d\'alimenter d\'innombrables artefacts. Les Chroniqueurs sont à l\'affût de toute trouvaille, et rachètent tout ce qu\'ils peuvent. Les E-Cubes se trouvent donc rarement sur les marchés, et leur prix est astronomique.',
  },
  { id: 'mun-fleche', name: 'Flèche', category: 'munitions', techLevel: 'I', value: 1, image: IMG + 'ammo/arrow.png' },
  { id: 'mun-carreau', name: 'Carreau', category: 'munitions', techLevel: 'II', value: 5, image: IMG + 'ammo/bolt.png' },
  { id: 'mun-petro', name: 'Bidon de pétro', category: 'munitions', properties: '5 LC en Afrika', techLevel: 'III', value: 300, image: IMG + 'ammo/can_of_petro.png' },

  // ─── ARMES DE LUTTE ───
  {
    id: 'bracelet-poignard',
    name: 'Bracelet Poignard',
    category: 'armesDeLutte',
    cult: 'apocalyptics',
    handling: '+2D',
    range: '1',
    damage: '2+F/2',
    properties: 'Régularité (2DC), Camouflage (4S)',
    techLevel: 'II',
    slots: 1,
    value: 40,
    resources: 1,
    image: IMG + 'brawl/blade bracelet.png',
  },
  {
    id: 'gant-de-diffuseur',
    name: 'Gant de Diffuseur',
    category: 'armesDeLutte',
    cult: 'chroniclers',
    handling: '+2D',
    range: '1',
    damage: 'Étourdissement (5)',
    magazine: '30',
    techLevel: 'IV',
    slots: 1,
    value: 4200,
    resources: 3,
    image: IMG + 'brawl/streamer_glove.png',
  },
  {
    id: 'poings-de-fer',
    name: 'Poings de Fer',
    category: 'armesDeLutte',
    handling: '+2D',
    range: '1',
    damage: '1+F/2',
    properties: 'Contondant',
    techLevel: 'II',
    slots: 1,
    value: 10,
    resources: 1,
    image: IMG + 'brawl/brass knuckles.png',
  },

  // ─── ARMES DE POING ───
  {
    id: 'pistol-9mm',
    name: 'Pistolet',
    category: 'armesDePoing',
    image: IMG + 'handguns/pistol.png',
    caliber: '9mm',
    handling: '-',
    range: '10/40',
    damage: '9',
    magazine: '12',
    properties: '-',
    encumbrance: 1,
    techLevel: 'III',
    slots: 1,
    value: 1200,
  },
  // ─── ARMES DE CORPS À CORPS ───
  {
    id: 'knife',
    name: 'Couteau',
    category: 'armesDeCorpsACorps',
    image: IMG + 'melee/knife.png',
    handling: '+1D',
    range: '1',
    damage: '2+F/3',
    properties: 'Régularité (2DC)',
    encumbrance: 1,
    techLevel: 'II',
    slots: 1,
    value: 40,
  },
  { id: 'broyeur', name: 'Broyeur', category: 'armesDeCorpsACorps', cult: 'scrappers', image: IMG + 'melee/crusher.png', handling: '-2D', range: '1', damage: '2+F/2', properties: 'Contondant', encumbrance: 3, techLevel: 'I', slots: 6, value: 600, resources: 1, description: '<b>Broyeur</b><br>Les Ferrailleurs construisent des armes de Corps à corps à partir de fragments d\'artefacts. Ils assemblent des lames de scie, des pics et des éclats de verre.<br><br><b>SPÉCIALITÉ :</b> le Broyeur possède plus d\'Emplacements que n\'importe quelle autre arme.' },
  { id: 'baton-de-belier', name: 'Bâton de Bélier', category: 'armesDeCorpsACorps', cult: 'jehammedans', image: IMG + 'melee/ram_staff.png', handling: '-2D', range: '2', damage: 'F/3', properties: 'Contondant, Étendard (Attaque +1D)', encumbrance: 3, techLevel: 'I', slots: 1, value: 3300, resources: 4, description: '<b>Bâton de Bélier</b><br>Symbole de la puissance du Culte et de son unité d\'esprit. Avant une bataille importante, l\'Icônide confie ce bâton à l\'Isaaki qui mènera les Glaives de Jehammet à la victoire.<br><br><b>SPÉCIALITÉ :</b> lors d\'un combat, les Jehammétans ralliés autour du bâton se sentent inspirés : sur un rayon de 20 pas, ils bénéficient de +1D à leurs jets d\'attaque.' },
  { id: 'baton-d-ibis', name: "Bâton d'Ibis", category: 'armesDeCorpsACorps', cult: 'apocalyptics', image: IMG + 'melee/ibis_staff.png', handling: '-2D', range: '2', damage: 'F/3', properties: 'Fragile', encumbrance: 2, techLevel: 'I', slots: 1, value: 220, description: "<b>Bâton d'Ibis</b><br>Ce bâton permet aux Ibis afrikains d'afficher clairement leur rang, mais il est totalement inutile au combat. Ses gravures délicates et la tête d'ibis au bec recourbé sculptée sont fragiles et peuvent se briser aisément.<br><br><b>SPÉCIALITÉ :</b> ce bâton offre à l'Ibis un sauf-conduit en territoire Fléau." },
  { id: 'beche', name: 'Bêche', category: 'armesDeCorpsACorps', image: IMG + 'melee/spade.png', range: '1', damage: '3+F/3', encumbrance: 2, techLevel: 'II', slots: 2, value: 40 },
  { id: 'chaine-de-lames', name: 'Chaîne de Lames', category: 'armesDeCorpsACorps', image: IMG + 'melee/chain_of_blades.png', handling: '-2D', range: '3', damage: '3+F/3', properties: 'Incontrôlable (3)', encumbrance: 2, techLevel: 'II', slots: 1, value: 40 },
  { id: 'cimeterre', name: 'Cimeterre', category: 'armesDeCorpsACorps', cult: 'jehammedans', image: IMG + 'melee/scimitar.png', range: '1', damage: '6+F/3', encumbrance: 2, techLevel: 'II', slots: 1, value: 600, resources: 3, description: '<b>Cimeterre</b><br>Cette arme traditionnelle fait partie des lames préférées des Jehammétans. Les Ismaeli portent de simples sabres d\'acier mal équilibrés tandis que les Issaki utilisent des sabres en acier de Damas.<br><br><b>SPÉCIALITÉ :</b> aucune' },
  { id: 'corne', name: 'Corne', category: 'armesDeCorpsACorps', cult: 'jehammedans', image: IMG + 'melee/horn.png', handling: '+1D', range: '1', damage: '9+F/3', encumbrance: 1, techLevel: 'V', value: 24000, resources: 6, description: '<b>Corne</b><br>Cette épée inhabituelle ressemble à une corne allongée. Tranchante comme une lame de rasoir et dentelée, elle est aussi résistante que le diamant et d\'une blancheur immaculée. Il faut être très proche d\'Ariès pour obtenir le droit de porter cette arme.<br><br><b>SPÉCIALITÉ :</b> aucune' },
  { id: 'dague-courbe', name: 'Dague Courbe', category: 'armesDeCorpsACorps', cult: 'neolibyans', image: IMG + 'melee/curved_dagger.png', handling: '+1D', range: '1', damage: '2+F/3', properties: 'Spécial', encumbrance: 1, techLevel: 'II', slots: 2, value: 180, resources: 3, description: '<b>Dague Courbe</b><br>Pour un Néolybien, une dague courbe sert plus de symbole que d\'arme. La lame symbolise ses rapports à l\'Afrique antique. Les dagues courbes sont incrustées d\'or et de pierres précieuses.<br><br><b>SPÉCIALITÉ :</b> des Emplacements supplémentaires afin d\'ajouter des décorations.' },
  { id: 'dague-koummya', name: 'Dague Koummya', category: 'armesDeCorpsACorps', cult: 'apocalyptics', image: IMG + 'melee/kouyama_dagger.png', handling: '+1D', range: '1', damage: '2+F/3', encumbrance: 1, techLevel: 'II', slots: 1, value: 50, resources: 1, description: '<b>Dague Koummya</b><br>Cette dague courbe traditionnelle sert aux jeunes Apocalyptiques afrikains à afficher leur force. Cela fait bien évidemment sourire les Apocalyptiques plus âgés comme les Marabouts et les Ibis. Toutefois, entre des mains habiles, la dague koummya reste une arme dangereuse, et certains migrateurs afrikains s\'en servent toute leur vie durant.<br><br><b>SPÉCIALITÉ :</b> aucune' },
  { id: 'dilacerateur', name: 'Dilacérateur', category: 'armesDeCorpsACorps', cult: 'spitalians', image: IMG + 'melee/splayer.png', handling: '-1D', range: '2', damage: '4+F/3', properties: 'Lacération (2DC, +1D dégâts)', encumbrance: 3, techLevel: 'IV', slots: 2, value: 2800, description: '<b>Dilacérateur</b><br>De vieilles histoires prétendent que l\'OEU fit usage de dilacérateurs lors d\'opérations de pacification à l\'époque d\'antan. Dans la hampe réside un cylindre de stockage cinétique, constamment alimenté par un levier de pompage, ce qui écarte les lames. Si le levier est rabattu, les lames extérieures se ferment rapidement et puissamment sur la lame centrale.<br><br><b>SPÉCIALITÉ :</b> capacité spéciale « Lacération » – si une attaque réussit avec 2 déclencheurs, le Spitalier peut refermer les lames d\'un coup sec et infliger ainsi 1D de dégâts supplémentaires. Au mieux, il peut infliger +4 dégâts.' },
  { id: 'electrocuteur', name: 'Électrocuteur', category: 'armesDeCorpsACorps', cult: 'chroniclers', image: IMG + 'melee/shocker.png', range: '1', magazine: '16', damage: 'Étourdissement (8)', encumbrance: 1, techLevel: 'IV', slots: 1, value: 2400, resources: 3, description: '<b>Électrocuteur</b><br>Les Chroniqueurs se tiennent généralement éloignés des combats. Mais lorsqu\'un gant de Diffuseur ne suffit pas à maîtriser son adversaire, les Chroniqueurs sont aussi équipés de son grand frère : l\'électrocuteur. Cette arme a la taille d\'un bras et est alimentée par six E-Cubes qui se déchargent sur le corps de l\'adversaire par simple pression d\'un bouton. Une douce odeur de viande rôtie se propage ensuite dans les environs…<br><br><b>SPÉCIALITÉ :</b> aucune' },
  { id: 'espadon', name: 'Espadon', category: 'armesDeCorpsACorps', cult: 'anabaptists', image: IMG + 'melee/bidenhander.png', handling: '-2D', range: '2', damage: '8+F/3', properties: 'Choc (2DC), Spécial', encumbrance: 3, techLevel: 'II', slots: 2, value: 1400, resources: 2, description: '<b>Espadon</b><br>Brandir une houe peut certes rappeler Rebus et réchauffer les cœurs, mais les Orgiastiques préfèrent utiliser les deux mètres de lame acérée en acier forgé de leur espadon. Énormes, difficiles à manier, ces armes insensées furent conçues pour des guerres qui le sont elles-mêmes. Certains espadons disposent d\'un mécanisme à ressort qui permet de faire jaillir une dague dissimulée dans la poignée.<br><br><b>SPÉCIALITÉ :</b> possède la propriété « Choc (2DC) ». Si l\'Orgiastique ne parvient pas à manier son arme correctement (moins de 2 déclencheurs), il peut sortir la dague de la poignée et s\'en servir pour combattre lors du round suivant.' },
  { id: 'epee-preservalis', name: 'Épée Preservalis', category: 'armesDeCorpsACorps', cult: 'spitalians', image: IMG + 'melee/preservalis_sword.png', range: '1', damage: '7+F/2', encumbrance: 2, techLevel: 'III', slots: 2, value: 1800, description: '<b>Épée Preservalis</b><br>La lame d\'acier noir, bien huilée et coupante comme un scalpel, peut trancher os et tendons en un seul coup. Elle est parfaitement équilibrée et d\'une excellente ergonomie.<br><br><b>SPÉCIALITÉ :</b> aucune' },
  { id: 'epee', name: 'Épée', category: 'armesDeCorpsACorps', image: IMG + 'melee/sword.png', range: '1', damage: '6+F/3', encumbrance: 2, techLevel: 'II', slots: 2, value: 600 },
  { id: 'faucille-d-ammout', name: "Faucille d'Ammout", category: 'armesDeCorpsACorps', cult: 'anubians', image: IMG + 'melee/ammit_sickle.png', range: '1', damage: '7+F/2', properties: 'Dégâts spéciaux (Aberrants, +3)', encumbrance: 2, techLevel: 'II', slots: 2, value: 3200, resources: 6, description: "<b>Faucille d'Ammout</b><br>La faucille d'Ammout est bien plus rare que le khépesh. D'après les légendes, sa lame fut forgée en fer de météorite il y a plusieurs millénaires dans un cratère d'Afrique centrale. Le tout premier roi nubien, Alara, aurait soi-disant porté une de ces armes lorsqu'il accéda au trône. Les lames sont marquées et noircies par le temps, seules leurs extrémités sont encore tranchantes. Cette arme porte ce nom, car les Hogons firent cadeau de ces faucilles aux énigmatiques Ammouts.<br><br><b>SPÉCIALITÉ :</b> +3 dégâts contre les Aberrants." },
  { id: 'flissa', name: 'Flissa', category: 'armesDeCorpsACorps', cult: 'apocalyptics', image: IMG + 'melee/flyssa.png', range: '1', damage: '7+F/3', encumbrance: 2, techLevel: 'II', slots: 2, value: 1600, resources: 3, description: '<b>Flissa</b><br>La Flissa est un sabre à large lame au dos droit. Prisée par les Busards afrikains, elle est signe de haut rang.<br><br><b>SPÉCIALITÉ :</b> aucune' },
  { id: 'fleau', name: 'Fléau', category: 'armesDeCorpsACorps', image: IMG + 'melee/flail.png', handling: '-1D', range: '2', damage: '2+F/3', properties: 'Contondant, Talisman (+1D Anabaptistes)', encumbrance: 2, techLevel: 'I', slots: 1, value: 5 },
  { id: 'fleau-de-guerre', name: 'Fléau de Guerre', category: 'armesDeCorpsACorps', cult: 'anabaptists', image: IMG + 'melee/war_flail.png', handling: '-1D', range: '2', damage: '2+F/2', properties: 'Contondant, Talisman (+1D)', encumbrance: 3, techLevel: 'I', slots: 1, value: 30, resources: 1 },
  { id: 'fourche', name: 'Fourche', category: 'armesDeCorpsACorps', image: IMG + 'melee/pitchfork.png', range: '2', damage: '2+F/3', properties: 'Talisman (+1D Anabaptistes)', encumbrance: 2, techLevel: 'I', slots: 1, value: 5 },
  { id: 'fustigateur', name: 'Fustigateur', category: 'armesDeCorpsACorps', cult: 'scourgers', image: IMG + 'melee/scourge.png', handling: '-2D', range: '3', damage: '3+F/3', magazine: '22', properties: 'Étourdissement (8), Incontrôlable (3)', encumbrance: 1, techLevel: 'IV', slots: 2, value: 1900, resources: 2, description: '<b>Fustigateur</b><br>Les Afrikains subirent le fustigateur introduit par l\'envahisseur hybrispagnol avant de se soulever et d\'arracher ces fouets électriques des mains de leur oppresseur. Depuis ce jour, le fustigateur est devenu le symbole de la liberté afrikaine. Un manche isolé contient un E-Cube qui alimente des fils sous tension de plus de 3 m de long terminés par des crochets. Lorsqu\'il touche sa cible, les fils créent une décharge électrique sous la forme d\'éclairs bleus, dans une odeur d\'ozone et de chair brûlée.<br><br><b>SPÉCIALITÉ :</b> aucune' },
  { id: 'goupilles-en-acier', name: 'Goupilles en Acier', category: 'armesDeCorpsACorps', cult: 'apocalyptics', image: IMG + 'melee/steel_cotters.png', range: '1', properties: 'Spécial, Pénétration (2)', encumbrance: 1, techLevel: 'II', value: 5, resources: 1, description: '<b>Goupilles en Acier</b><br>Cette arme est utilisée par les assassins qui l\'enfoncent sournoisement dans la chair de leur victime. Celle-ci, prise de spasmes, palpe sa blessure et tente d\'extraire les goupilles sans jamais y parvenir. Elle succombe à une mort lente et douloureuse.<br><br><b>SPÉCIALITÉ :</b> sur un jet d\'attaque réussi, les goupilles se retrouvent dans le corps de l\'adversaire et infligent 1 point de dégât par round (qui ignore l\'armure). Pour extraire les morceaux de métal et arrêter les dégâts continus, il faut réussir un test d\'AGI+Dextérité (3). L\'Apocalyptique se retrouve sans arme après avoir réussi son attaque.' },
  { id: 'grappin', name: 'Grappin', category: 'armesDeCorpsACorps', image: IMG + 'melee/grapple_1.png', handling: '-1D', range: '3', damage: '2+F/3', encumbrance: 2, techLevel: 'II', slots: 1, value: 30 },
  { id: 'hache-de-bataille', name: 'Hache de Bataille', category: 'armesDeCorpsACorps', image: IMG + 'melee/battle_axe.png', handling: '-2D', range: '2', damage: '6+F/2', properties: 'Choc (2DC)', encumbrance: 3, techLevel: 'II', slots: 2, value: 750 },
  { id: 'hache-en-pierre', name: 'Hache en Pierre', category: 'armesDeCorpsACorps', image: IMG + 'melee/stone_axe.png', handling: '-2D', range: '1', damage: '3+F/2', properties: 'Contondant', encumbrance: 3, techLevel: 'I', slots: 1, value: 120 },
  { id: 'hache', name: 'Hache', category: 'armesDeCorpsACorps', image: IMG + 'melee/hand_axe.png', range: '1', damage: '4+F/3', encumbrance: 1, techLevel: 'II', slots: 1, value: 50 },
  { id: 'houe-de-cavalier', name: 'Houe de Cavalier', category: 'armesDeCorpsACorps', image: IMG + 'melee/riding_pick.png', range: '1', damage: '5+F/2', encumbrance: 1, techLevel: 'II', slots: 2, value: 300 },
  { id: 'instruments-chirurgicaux', name: 'Instruments Chirurgicaux', category: 'armesDeCorpsACorps', cult: 'spitalians', image: IMG + 'melee/surgical_tools.png', range: '1', damage: '3+F/3', encumbrance: 1, techLevel: 'III', slots: 1, value: 1000, resources: 3, description: '<b>Instruments Chirurgicaux</b><br>Scalpels, agrafes, et scies constituent les outils d\'un Chirurgien, et indiquent de manière flagrante sa position au sein de la hiérarchie de son service. Cela fait cinq siècles que ces instruments furent sortis de leur emballage stérile. Tout docteur digne de ce nom possède ses propres instruments, conçus à partir des meilleurs matériaux par les maîtres de l\'acier en Purgare par la famille Sforza. Néanmoins, le coût est proportionnel à la qualité.<br><br><b>SPÉCIALITÉ :</b> il existe 3 niveaux d\'outils chirurgicaux. Ils procurent +1D par niveau pour le traitement de Traumatismes par opération chirurgicale.' },
  { id: 'khepesh', name: 'Khépesh', category: 'armesDeCorpsACorps', cult: 'anubians', image: IMG + 'melee/khopesh.png', range: '1', damage: '6+F/2', properties: 'Dégâts spéciaux (Aberrants, +2)', encumbrance: 2, techLevel: 'II', slots: 2, value: 1800, resources: 3, description: '<b>Khépesh</b><br>Les mythes prétendent que seul un khépesh choisi par Anubis peut trancher la ligne de vie d\'une créature sans toucher sa chair et ses organes. Ce sont principalement les Faucilles et les Ammout qui emmènent cette épée au pays des Corbeaux, afin d\'éliminer les vagues de Psychonautes. Tous les khépeshs sont anciens. Ils furent retirés des chambres du Caire par ceux du Premier Cercle et transmis aux Anubiens qui s\'en sont montrés dignes. Seuls une centaine d\'entre eux existent toujours.<br><br><b>SPÉCIALITÉ :</b> +2 dégâts contre les Psychonautes.' },
  { id: 'lame-en-verre', name: 'Lame en Verre', category: 'armesDeCorpsACorps', image: IMG + 'melee/shard_dagger.png', range: '1', damage: '4+F/3', properties: 'Fragile', encumbrance: 1, techLevel: 'I', slots: 1, value: 5 },
  { id: 'lance-ancestrale', name: 'Lance Ancestrale', category: 'armesDeCorpsACorps', cult: 'scourgers', image: IMG + 'melee/ancestor_spear.png', range: '2', damage: '4+F/3', properties: 'Talisman (+2D)', encumbrance: 2, techLevel: 'I', slots: 2, value: 500, description: '<b>Lance Ancestrale</b><br>Avant d\'obtenir son premier fusil, le jeune guerrier doit apprendre à maîtriser la lance, l\'arme traditionnelle des Fléaux. S\'il accomplit un fait héroïque avec celle-ci, l\'exploit sera aussi attribué à l\'arme. Elle sera alors considérée comme bénie et dotée d\'une âme, probablement celle d\'un ancêtre ou d\'un esprit bienveillant qui guide la main du Fléau. Les guerriers traitent une telle lance avec respect, puis la font passer de main en main au sein du groupe à la mort de son propriétaire.<br><br><b>SPÉCIALITÉ :</b> les armes dotées d\'une âme ne sont jamais vendues. Un Fléau doit prouver sa valeur sur le champ de bataille afin de recevoir de son Dumisaï l\'honneur de porter une telle arme. Entre ses mains, le guerrier se sent invincible : +2D aux tests de PSY+Foi/Volonté.' },
  { id: 'lance', name: 'Lance', category: 'armesDeCorpsACorps', image: IMG + 'melee/lance.png', range: '2', damage: '4+F/3', encumbrance: 2, techLevel: 'I', slots: 1, value: 50 },
  { id: 'marteau-de-jugement', name: 'Marteau de Jugement', category: 'armesDeCorpsACorps', cult: 'judges', image: IMG + 'melee/judgement_hammer.png', handling: '-2D', range: '1', damage: '1+F', properties: 'Contondant, Choc (3DC)', encumbrance: 3, techLevel: 'III', slots: 2, value: 1500, description: '<b>Marteau de Jugement</b><br>Le Juge Suprême a instauré la tradition qui veut que l\'on rende un jugement avec un marteau, tradition qui persiste jusqu\'à aujourd\'hui. Chaque Juge des Villes reçoit un de ces solides marteaux en acier lorsqu\'il est nommé. Il n\'attendra pas longtemps avant de pouvoir l\'utiliser. Un Marteau de jugement ne sert pas juste de décoration. Il symbolise le pouvoir exécutif du Juge. Le manche mesure 1 m de long, et lui aussi ne comprend aucune décoration.<br><br><b>SPÉCIALITÉ :</b> un Marteau de jugement possède la propriété négative « Choc (3DC) ». Cela peut être atténué par un Potentiel.' },
  { id: 'masse', name: 'Masse', category: 'armesDeCorpsACorps', image: IMG + 'melee/sledgehammer.png', handling: '-2D', range: '1', damage: 'F', properties: 'Contondant, Choc (3DC)', encumbrance: 4, techLevel: 'II', slots: 1, value: 280 },
  { id: 'masse-d-armes', name: "Masse d'Armes", category: 'armesDeCorpsACorps', image: IMG + 'melee/mace.png', range: '1', damage: '4+F/2', properties: 'Contondant', encumbrance: 2, techLevel: 'II', slots: 1, value: 350 },
  { id: 'massue-roi-cafard', name: 'Massue en Fer du Roi Cafard', category: 'armesDeCorpsACorps', cult: 'clanners', image: IMG + 'melee/iron_club_of_the_cockroach_king.png', handling: '-3D', range: '2', damage: '2+F', properties: 'Contondant, Choc (3DC)', encumbrance: 5, techLevel: 'I', slots: 2, value: 300 },
  { id: 'massue', name: 'Massue', category: 'armesDeCorpsACorps', image: IMG + 'melee/club.png', range: '1', damage: '2+F/2', properties: 'Contondant', encumbrance: 3, techLevel: 'I', slots: 2, value: 20 },
  { id: 'morgenstern', name: 'Morgenstern', category: 'armesDeCorpsACorps', image: IMG + 'melee/morning_star.png', handling: '-1D', range: '1', damage: '5+F/2', properties: 'Contondant', encumbrance: 2, techLevel: 'II', slots: 2, value: 400 },
  { id: 'pioche', name: 'Pioche', category: 'armesDeCorpsACorps', image: IMG + 'melee/pickaxe.png', range: '1', damage: '1+F', properties: 'Choc (3DC)', encumbrance: 4, techLevel: 'II', slots: 1, value: 450 },
  { id: 'pistolet-a-injection', name: "Pistolet à Injection", category: 'armesDeCorpsACorps', cult: 'spitalians', image: IMG + 'melee/injector_gun.png', range: '1', properties: 'Spécial, Pénétration (4)', encumbrance: 1, techLevel: 'IV', slots: 1, value: 1400, resources: 4, description: "<b>Pistolet à Injection</b><br>Un Anesthésiste préfère l'utilisation d'un pistolet à injection lorsqu'il s'agit d'introduire dans un point précis de l'organisme un agent chimique ou une substance médicinale.<br><br><b>SPÉCIALITÉ :</b> sur une attaque de Corps à corps réussie, le pistolet est pressé contre la cible et lui injecte son contenu." },
  { id: 'sabre-de-damas', name: 'Sabre de Damas', category: 'armesDeCorpsACorps', cult: 'jehammedans', image: IMG + 'melee/damascene_saber.png', range: '1', damage: '7+F/3', encumbrance: 2, techLevel: 'V', slots: 2, value: 2800, resources: 5 },
  { id: 'sabre', name: 'Sabre', category: 'armesDeCorpsACorps', image: IMG + 'melee/saber.png', range: '1', damage: '6+F/3', encumbrance: 1, techLevel: 'II', slots: 2, value: 600 },
  { id: 'stylet', name: 'Stylet', category: 'armesDeCorpsACorps', image: IMG + 'melee/stiletto.png', range: '1', damage: '2+F/3', properties: 'Régularité (2DC)', encumbrance: 1, techLevel: 'II', slots: 1, value: 25 },

  // ─── ARMES DE JET ───
  { id: 'atlatl', name: 'Atlatl', category: 'armesDeJet', image: IMG + 'thrown/atlatl.png', handling: '-1D', range: '10/30', damage: '3+F/2', magazine: '1', encumbrance: 2, techLevel: 'I', slots: 1, value: 50, description: '<b>Atlatl</b><br>Un propulseur de javelines en bois et os, hérité des chasseurs-cueilleurs. Cette ancienne technologie de Scavengers et tribus nomades permet de lancer des javelines plus loin et avec plus de force qu\'à la main nue.' },
  { id: 'bola', name: 'Bola', category: 'armesDeJet', image: IMG + 'thrown/bola.png', handling: '-2D', range: '3/10', damage: 'F/3', magazine: '1', properties: 'Enchevêtrement (-3D), Incontrôlable (3)', encumbrance: 1, techLevel: 'I', value: 20 },
  { id: 'couteau-de-lancer', name: 'Couteau de Lancer', category: 'armesDeJet', image: IMG + 'thrown/throwing_knife.png', range: '3/10', damage: '3+F/3', magazine: '1', encumbrance: 1, techLevel: 'II', slots: 1, value: 40 },
  { id: 'filet', name: 'Filet', category: 'armesDeJet', image: IMG + 'thrown/net.png', handling: '-2D', range: '2/5', magazine: '1', properties: 'Enchevêtrement (-5D)', encumbrance: 1, techLevel: 'II', value: 30 },
  { id: 'fronde', name: 'Fronde', category: 'armesDeJet', image: IMG + 'thrown/sling.png', handling: '-1D', range: '5/15', damage: '2+F/3', magazine: '1', properties: 'Contondant', encumbrance: 1, techLevel: 'I', slots: 1, value: 5 },
  { id: 'hache-de-jet', name: 'Hache de Jet', category: 'armesDeJet', image: IMG + 'thrown/throwing_axe.png', range: '3/10', damage: '3+F/2', magazine: '1', encumbrance: 1, techLevel: 'II', slots: 1, value: 50 },
  { id: 'harpon-jet', name: 'Harpon', category: 'armesDeJet', image: IMG + 'thrown/harpoon.png', range: '5/15', damage: 'F', magazine: '1', encumbrance: 2, techLevel: 'II', slots: 1, value: 50 },
  { id: 'pierre', name: 'Pierre', category: 'armesDeJet', image: IMG + 'thrown/stone.png', range: '5/30', damage: 'F/2', properties: 'Contondant', encumbrance: 1, techLevel: 'I', value: 0 },
  { id: 'shuriken', name: 'Shuriken', category: 'armesDeJet', image: IMG + 'thrown/shuriken.png', range: '3/10', damage: '2+F/2', magazine: '1', encumbrance: 1, techLevel: 'I', value: 20 },

  // ─── ARMES À PROJECTILES ───
  { id: 'arbalete', name: 'Arbalète', category: 'armesAProjectiles', image: IMG + 'projectiles/crossbow.png', caliber: 'Carreaux', range: '15/60', damage: '10', magazine: '1', encumbrance: 3, techLevel: 'II', slots: 1, value: 400 },
  { id: 'arbalete-harpon', name: 'Arbalète Harpon', category: 'armesAProjectiles', cult: 'apocalyptics', image: IMG + 'projectiles/harpoon_crossbow.png', caliber: 'Harpon', handling: '-2D', range: '10/40', damage: '8', magazine: '1', encumbrance: 4, techLevel: 'II', slots: 1, value: 600, resources: 2, description: '<b>Arbalète Harpon</b><br>Un harpon en métal récupéré, monté sur arbalète et relié par un câble. Les Apocalyptiques pêcheurs l\'utilisent pour attraper les grandes créatures du Styx ou des marécages. Un déclencheur permet de récupérer le câble après l\'impact.' },
  { id: 'arbalete-lourde', name: 'Arbalète Lourde', category: 'armesAProjectiles', image: IMG + 'projectiles/heavy_crossbow.png', caliber: 'Carreaux', handling: '-2D', range: '20/80', damage: '12', magazine: '1', encumbrance: 4, techLevel: 'II', slots: 2, value: 800 },
  { id: 'arbalete-repetition', name: 'Arbalète à Répétition', category: 'armesAProjectiles', image: IMG + 'projectiles/repeating_crossbow.png', caliber: 'Carreaux', range: '15/60', damage: '10', magazine: '4', encumbrance: 2, techLevel: 'III', slots: 2, value: 2000 },
  { id: 'arc-composite', name: 'Arc Composite', category: 'armesAProjectiles', image: IMG + 'projectiles/composite_bow.png', caliber: 'Flèches', range: '15/60', damage: '8+F/3', magazine: '1', encumbrance: 1, techLevel: 'IV', slots: 2, value: 2000 },
  { id: 'arc', name: 'Arc', category: 'armesAProjectiles', image: IMG + 'projectiles/bow.png', caliber: 'Flèches', handling: '-1D', range: '10/40', damage: '6+F/3', magazine: '1', encumbrance: 1, techLevel: 'I', slots: 2, value: 200 },
  { id: 'sarbacane', name: 'Sarbacane', category: 'armesAProjectiles', image: IMG + 'projectiles/blow_gun.png', caliber: 'Clous', range: '3/12', damage: '4', magazine: '1', techLevel: 'I', slots: 0, value: 30 },

  // ─── FUSILS ───
  { id: 'carabine-neo', name: 'Carabine (Neo.)', category: 'fusils', cult: 'neolibyans', image: IMG + 'rifles/hunting_rifle_neo.png', caliber: '.357', handling: '+1D', range: '30/120', damage: '6', magazine: '4', properties: 'Spécial', encumbrance: 2, techLevel: 'IV', slots: 2, value: 1800, resources: 3 },
  { id: 'carabine', name: 'Carabine', category: 'fusils', image: IMG + 'rifles/military_carabine.png', caliber: '.357', range: '30/120', damage: '6', magazine: '4', encumbrance: 2, techLevel: 'IV', slots: 2, value: 900 },
  { id: 'defricheur-fusil-blinf', name: 'Défricheur', category: 'fusils', cult: 'hellvetics', image: IMG + 'rifles/trailblazer_fm.png', caliber: 'Balle Blindée HF', range: '30/120', damage: '11', magazine: '35', properties: 'Régularité (3DC), Rafale (3)', encumbrance: 2, techLevel: 'IV', slots: 2, value: 18000 },
  { id: 'defricheur-fusil-chevrotine', name: 'Défricheur', category: 'fusils', cult: 'hellvetics', image: IMG + 'rifles/trailblazer_buckshot.png', caliber: 'Chevrotine', range: '10/40', damage: '10', magazine: '3', properties: 'Dispersion', encumbrance: 2, techLevel: 'IV', slots: 2, value: 18000 },
  { id: 'defricheur-fusil-creuse', name: 'Défricheur', category: 'fusils', cult: 'hellvetics', image: IMG + 'rifles/trailblazer_hp.png', caliber: 'Pointe Creuse HF', range: '30/120', damage: '14', magazine: '35', properties: 'Régularité (3DC), Rafale (3)', encumbrance: 2, techLevel: 'IV', slots: 2, value: 18000 },
  { id: 'fusil-de-chasse', name: 'Fusil de Chasse', category: 'fusils', image: IMG + 'rifles/shotgun.png', caliber: '12 mm / Chevrotine', range: '5/20', damage: '10', magazine: '4', properties: 'Dispersion, Double canon', encumbrance: 2, techLevel: 'IV', slots: 2, value: 1500 },
  { id: 'fusil-de-precision', name: 'Fusil de Précision', category: 'fusils', image: IMG + 'rifles/sniper_rifle.png', caliber: '5.56x45mm', range: '50/400', damage: '11', magazine: '6', properties: 'Sensible', encumbrance: 3, techLevel: 'IV', slots: 2, value: 4000 },
  { id: 'fusil-d-assaut', name: "Fusil d'Assaut", category: 'fusils', cult: 'scourgers', image: IMG + 'rifles/assault_rifle.png', caliber: '5.56x45mm', range: '30/120', damage: '11', magazine: '30', properties: 'Rafale (3)', encumbrance: 2, techLevel: 'IV', slots: 1, value: 12000 },
  { id: 'fusil-d-exception', name: "Fusil d'Exception", category: 'fusils', cult: 'neolibyans', image: IMG + 'rifles/masterpiece_rifle.png', caliber: '.50 GL', handling: '+2D', range: '50/400', damage: '12', magazine: '1', properties: 'Coup de tonnerre', encumbrance: 2, techLevel: 'IV', slots: 1, value: 14000, resources: 5 },
  { id: 'fusil-fongicide', name: 'Fusil Fongicide', category: 'fusils', cult: 'spitalians', image: IMG + 'rifles/fungicide_rifle.png', caliber: 'Cartouches', range: '2/8', damage: 'Spécial', magazine: 'Spécial', encumbrance: 2, techLevel: 'IV', slots: 2, value: 2300, resources: 2, description: '<b>Fusil Fongicide</b><br>Le fusil à fongicide spitalier fonctionne comme un lance-flamme alimenté par cartouches ou réservoir externe. Il peut projeter divers produits chimiques : fongicides, pesticides, produits incendiaires à deux réactifs, agents chimiques.<br><br>Un antidote prévu pour l\'utilisateur peut être rangé dans la crosse. Une cartouche contient assez d\'agents actifs pour 10 utilisations.' },
  { id: 'fusil-mitrailleur-leger', name: 'Fusil Mitrailleur Léger', category: 'fusils', image: IMG + 'rifles/light_mg.png', caliber: '5.56x45mm', handling: '-1D', range: '30/80', damage: '11', magazine: 'Cartouchière', properties: 'Rafale (4), Enrayement', encumbrance: 4, techLevel: 'IV', slots: 2, value: 5000 },
  { id: 'fusil-a-flechettes', name: 'Fusil à Fléchettes', category: 'fusils', image: IMG + 'rifles/flechette_rifle.png', caliber: 'Fléchettes', handling: '+2D', range: '30/120', damage: '13', magazine: '60', properties: 'Régularité (1DC), Rafale (5)', encumbrance: 2, techLevel: 'V', value: 32000 },
  { id: 'fusil-a-pompe', name: 'Fusil à Pompe', category: 'fusils', image: IMG + 'rifles/pump_gun.png', caliber: '12 mm', range: '5/40', damage: '10', magazine: '4', encumbrance: 2, techLevel: 'IV', slots: 2, value: 2000 },
  { id: 'merveille', name: 'Merveille', category: 'fusils', cult: 'scrappers', image: IMG + 'rifles/marvel.png', caliber: 'Balle en plomb', range: '10/40', damage: '8', magazine: '1', properties: 'Charg. par gueule', encumbrance: 2, techLevel: 'III', slots: 6, value: 1400, resources: 1, description: '<b>Merveille</b><br>Le fusil d\'un Ferrailleur est aussi unique que la main qui le tient. Très peu de fouilles-poussière font confiance aux armes retrouvées sous les ruines. De ce fait, ils vissent, soudent et assemblent leur propre fusil à partir de ce qu\'ils trouvent. Le résultat est rarement esthétique, mais au moins, l\'objet est unique.<br><br>Les merveilles disposent du plus grand nombre d\'Emplacements.' },
  { id: 'mousquet-de-juge', name: 'Mousquet de Juge', category: 'fusils', cult: 'judges', image: IMG + 'rifles/judges_musket.png', caliber: 'Balle en plomb', range: '10/40', damage: '8', magazine: '1', properties: 'Charg. par gueule', encumbrance: 2, techLevel: 'III', slots: 2, value: 900, resources: 2, description: '<b>Mousquet de Juge</b><br>Ce fusil à chargement par la bouche fabriqué dans les usines des Maîtres de l\'Acier à Justitienne est la réplique exacte des mousquets du XVIIe siècle. On le charge de poudre et d\'une balle en plomb, comprimée avec une tige. Il ne peut tirer qu\'une seule fois avant d\'être rechargé.<br><br>Il existe quelques mousquets à double canon, chacun disposant de sa propre détente. Charger prend 2 actions par canon.' },
  { id: 'ravageur', name: 'Ravageur', category: 'fusils', image: IMG + 'rifles/soul_burner.png', caliber: 'E-Cube', handling: '+2D', range: '50/400', damage: '16', magazine: '15', properties: 'Encodage biométrique, Spécial, Mortel, Terrifiant (4)', encumbrance: 2, techLevel: 'VI', value: 56000 },
  { id: 'sagur-72', name: 'Sagur-72', category: 'fusils', image: IMG + 'rifles/sagur-72.png', caliber: '5x30 mm cl', handling: '+2D', range: '30/120', damage: '8', magazine: '35', properties: 'Régularité (2DC), Rafale (3)', encumbrance: 2, techLevel: 'V', value: 27000 },

  // ─── ARMES LOURDES ───
  { id: 'calcinateur', name: 'Calcinateur', category: 'armesLourdes', cult: 'anabaptists', image: IMG + 'heavy_weapons/spitfire.png', caliber: 'Pétro', handling: '-2D', range: '3/10', damage: '15', magazine: '12', properties: 'Incendiaire, Spécial', encumbrance: 3, techLevel: 'III', slots: 2, value: 3800, resources: 3, description: '<b>Calcinateur</b><br>Les épées sont impuissantes face aux nuées de spores et aux épidémies des Aberrants. Cependant, le jet de flamme produit par un calcinateur les réduit en cendres. Les Orgiastiques baptisent leurs ennemis par le feu.<br><br>Son réservoir pressurisé est son point faible : un coup visé (difficulté +2) infligeant au minimum 4 dégâts peut le percer et déclencher une explosion (dégâts 14). L\'Orgiastique a 1D rounds pour lâcher l\'arme avant l\'explosion.' },
  { id: 'fusil-mitrailleur-lourd', name: 'Fusil Mitrailleur Lourd', category: 'armesLourdes', image: IMG + 'heavy_weapons/heavy_mg.png', caliber: '5.56x45 mm', handling: '-2D', range: '50/200', damage: '11', magazine: 'Cartouchière', properties: 'Rafale (10), Enrayement', encumbrance: 6, techLevel: 'IV', slots: 2, value: 8000 },
  { id: 'lance-grenades', name: 'Lance-Grenades', category: 'armesLourdes', image: IMG + 'heavy_weapons/grenade_launcher.png', caliber: 'Grenades', handling: '-2D', range: '20/60', damage: 'Spécial', magazine: '1', properties: 'Déviation', encumbrance: 2, techLevel: 'IV', slots: 2, value: 1900 },
  { id: 'lance-missiles', name: 'Lance-Missiles', category: 'armesLourdes', image: IMG + 'heavy_weapons/rocket_launcher.png', caliber: 'Missile', range: '10/60', damage: '15', magazine: '1', properties: 'Antiblindage, Explosif', encumbrance: 4, techLevel: 'IV', slots: 2, value: 4200 },
  { id: 'lance-cartouches', name: 'Lance Cartouches', category: 'armesLourdes', cult: 'spitalians', image: IMG + 'heavy_weapons/cartridge_launcher.png', caliber: 'Cartouches', handling: '-2D', range: '20/60', damage: 'Spécial', magazine: '4', properties: 'Déviation', encumbrance: 3, techLevel: 'IV', slots: 2, value: 2800, resources: 3, description: '<b>Lance-Cartouches</b><br>Un fusil à fongicide projette son produit sur une faible distance, mais les grenades tirées par un lance-cartouches peuvent atteindre une portée bien plus grande et libérer les mêmes agents actifs sur un rayon de plusieurs pas.<br><br>Les grenades rebondissent et n\'atterrissent généralement jamais là où le tireur le souhaite (propriété Déviation). Elles peuvent aussi être lancées à la main, équipées d\'un minuteur, ou utilisées comme mines à pression.' },
  { id: 'pneumo-marteau', name: 'Pneumo-Marteau', category: 'armesLourdes', cult: 'clanners', image: IMG + 'heavy_weapons/pneumo_hammer.png', caliber: 'Carreau/Charbon', handling: '-2D', range: '10/30', damage: '10', magazine: '12', properties: 'Coup de tonnerre, Spécial', encumbrance: 3, techLevel: 'III', slots: 2, value: 1500, description: '<b>Pneumo-Marteau</b><br>Un marteau cloueur pneumatique chauffé au charbon jusqu\'à ce que la pression de vapeur soit atteinte. Un système de valves redirige la vapeur dans les canons l\'un après l\'autre, propulsant des clous similaires à des carreaux d\'arbalète.<br><br>Cette arme requiert plus de 5 minutes pour atteindre sa température opérationnelle. Elle peut aussi servir de bombe : si toutes les valves sont fermées, la pression augmente jusqu\'à une détonation de puissance 12.' },

  // ─── EXPLOSIFS ───
  { id: 'bouteille-explosive', name: 'Bouteille Explosive', category: 'explosifs', cult: 'jehammedans', image: IMG + 'grenades/frag_grenade.png', damage: '6', magazine: '1', properties: 'Incendiaire, Explosif, Spécial', encumbrance: 1, techLevel: 'II', value: 60, resources: 1, description: '<b>Bouteille Explosive</b><br>Les Djihad-warriors fabriquent leurs bouteilles explosives à partir d\'alcool de récupération versé dans des bouteilles en verre, avec un tissu imbibé en guise de mèche. Simples mais efficaces, ces armes incendiaires sont l\'arme de prédilection des guerriers Jehammedans lors de leurs raids.' },
  { id: 'explosifs', name: 'Explosifs', category: 'explosifs', cult: 'hellvetics', image: IMG + 'grenades/frag_grenade.png', damage: '16', magazine: '1', properties: 'Coup de tonnerre, Explosif', encumbrance: 1, techLevel: 'IV', value: 800, resources: 3 },
  { id: 'poudre-noire', name: 'Poudre Noire', category: 'explosifs', image: IMG + 'grenades/frag_grenade.png', damage: '10', magazine: '1', properties: 'Coup de tonnerre, Explosif', encumbrance: 1, techLevel: 'II', value: 100 },
  { id: 'tnt', name: 'TNT', category: 'explosifs', image: IMG + 'grenades/frag_grenade.png', damage: '14', magazine: '1', properties: 'Coup de tonnerre, Explosif', encumbrance: 1, techLevel: 'III', value: 300 },

  // ─── ARMES SONIQUES ───
  { id: 'raccordeur', name: 'Raccordeur', category: 'armesSoniques', cult: 'chroniclers', image: IMG + 'sonic/cascader.png', caliber: '4x E-Cube', range: '10', damage: '1+DC Trauma', magazine: '8', properties: 'Coup de tonnerre, Dégâts de zone (45°)', encumbrance: 2, techLevel: 'IV', value: 6000, resources: 5, description: '<b>Raccordeur</b><br>Un vocodeur branché à un raccordeur, sorte de sceptre muni de blocs amplificateurs et de haut-parleurs, transforme une voix nasillarde en un rugissement de colère divine. Les pentes de montagnes tremblent, des avalanches se créent. La pression sonore perfore les tympans, peut faire tomber un individu au sol et briser ses côtes.<br><br>Les raccordeurs sont des armes de zone qui touchent indifféremment alliés et ennemis dans un cône de 45°.' },
  { id: 'vocodeur', name: 'Vocodeur', category: 'armesSoniques', cult: 'chroniclers', image: IMG + 'sonic/vocoder.png', caliber: 'E-Cube', range: '10', damage: '1+DC Égo', properties: 'Coup de tonnerre, Dégâts de zone (45°)', encumbrance: 1, techLevel: 'IV', value: 1500, resources: 1, description: '<b>Vocodeur</b><br>Cet appareil module les sons et les distord, surmodule aussi les voix et les amplifie. Un micro est placé dans le masque en cuir, le modulateur et le haut-parleur sont accrochés à la cage thoracique. Le volume peut être réglé du murmure subtil au tintamarre infernal audible des kilomètres à la ronde.<br><br>Un vocodeur correctement utilisé constitue l\'arme la plus efficace d\'un Chroniqueur.' },

  // ─── AGENTS CHIMIQUES ───
  { id: 'aerosol-ex-eg1', name: "Aérosol d'EX/EG-1", category: 'agentsChimiques', cult: 'spitalians', image: IMG + 'equipment/ex.svg', properties: 'Exsporiateur virtuel (-1 + déclencheurs, 10 min)', techLevel: 'V', value: 1500, resources: 6, description: '<b>Aérosol d\'EX/EG-1</b><br>Injecteur : oui' },
  { id: 'bande-noire', name: 'Bande Noire', category: 'agentsChimiques', cult: 'spitalians', image: IMG + 'equipment/narcotics.svg', properties: 'Narcotique (6, 6 Égo)', techLevel: 'IV', value: 600, resources: 5, description: '<b>Bande Noire</b><br>Une bande noire sur une cartouche symbolise l\'anesthésiant de combat le plus puissant produit par le Spital. Officiellement, seuls les Anesthésistes sont autorisés à l\'utiliser. Inhalé, cet aérosol incolore à base d\'opioïdes et d\'anesthésiants provoque une perte de conscience dans la majorité des cas.' },
  { id: 'gaz-chlore', name: 'Gaz Chloré', category: 'agentsChimiques', cult: 'spitalians', image: IMG + 'equipment/discharge.svg', properties: 'Empoisonné (5, 1 Traumatisme/round, Puissance -1/round, jet PHY+Résistance stoppe l\'empoisonnement)', techLevel: 'III', value: 120, resources: 4, description: '<b>Gaz Chloré</b><br>Le gaz chloré fait partie des agents chimiques les plus dangereux du Spital. Inhalé, il détruit les tissus pulmonaires : des morceaux rosâtres se déchirent, les bronches se remplissent de liquide, la respiration devient rauque. La chlorine est bien plus lourde que l\'air et retombe sur le sol — elle est parfaitement adaptée à l\'élimination de Psychonautes dans les vallées à anneaux concentriques.<br><br>Uniquement sous forme de munitions pour lance-cartouches, de grenades ou de mines. Ne se dissipe qu\'avec de forts vents.' },
  { id: 'irritant', name: 'Irritant', category: 'agentsChimiques', cult: 'spitalians', image: IMG + 'equipment/discharge.svg', properties: 'Empoisonné (5, -3D, récupération +1D par round)', techLevel: 'IV', value: 70, resources: 3, description: '<b>Lacrymogène</b><br>La bromoacétone constitue le principal composant de tout agent lacrymogène. Ce liquide à l\'odeur âcre provoque de sérieuses irritations lorsqu\'il entre en contact avec les yeux et les muqueuses. Les dégâts ne causent aucune blessure, mais infligent un malus général (-3D) via la propriété Empoisonné.' },
  { id: 'marqueur-pheromonal', name: 'Marqueur Phéromonal', category: 'agentsChimiques', cult: 'spitalians', image: IMG + 'equipment/flycatcher.svg', properties: 'Appât (peste phéromancienne)', techLevel: 'IV', value: 30, resources: 3, description: '<b>Marqueur Phéromonal</b><br>Les Pharmaciens répliquent le marquage phéromonal des nuées d\'insectes en Franka. Dissous dans un liquide sirupeux puis chargés dans des cartouches, ils permettent aux Spitaliers de scinder des nuées et de les attirer vers des brasiers.<br><br>Une dose attire tout insecte dans un rayon de 20 pas, pendant quelques minutes. Les phéromones de synthèse se détériorent par oxydation. Utile uniquement contre la peste phéromancienne.' },
  { id: 'poussiere-de-feu', name: 'Poussière de Feu', category: 'agentsChimiques', cult: 'spitalians', image: IMG + 'equipment/blazing_ichor.svg', properties: 'Crée dégâts de feu comme le calcinateur (8)', techLevel: 'IV', value: 80, resources: 3, description: '<b>Poussière de Feu</b><br>Enduit de phosphore sous forme de poussière blanche, elle s\'enflamme à la seconde même de son contact avec l\'oxygène et produit de puissantes flammes blanches. La poussière de feu ne forme pas de nuage. Les dégâts se produisent immédiatement et ne s\'infligent qu\'une seule fois.' },
  { id: 'sp-4016-th', name: 'SP 4016 TH', category: 'agentsChimiques', cult: 'spitalians', image: IMG + 'equipment/narcotics.svg', properties: 'Empoisonné (4, -2D, durée : 1 jour)', techLevel: 'IV', value: 50, resources: 2, description: '<b>SP 4016 TH</b><br>Ce fongicide s\'utilise principalement pour combattre la Sepsie. Sa forte contenance en soufre assèche les champs de spores. Une pulvérisation sur un lit de Sepsie la fera disparaître en quelques heures, et le fongicide empêche l\'émergence de nouvelles spores pendant plusieurs mois.<br><br>Tout contact avec le SP 4016 (Puissance 4) provoque l\'apparition de pustules irritantes sur tout le corps (-2D à toutes les actions). Elles disparaissent après un jour complet.' },

  // ─── ARMURES ───
  { id: 'armure-composite', name: 'Armure Composite', category: 'armures', image: IMG + 'armor/composite_armor.png', armorValue: '6', properties: 'Pare-balles (9)', encumbrance: 2, techLevel: 'V', slots: 1, value: 28000 },
  { id: 'armure-ferrailleur', name: 'Armure de Ferrailleur', category: 'armures', image: IMG + 'armor/scrapper_armor.png', armorValue: '4', properties: 'Instable (6)', encumbrance: 3, techLevel: 'II', slots: 6, value: 700 },
  { id: 'armure-plaques-renforcees', name: 'Armure de Plaques Renforcées', category: 'armures', image: IMG + 'armor/reinforced_metal_plate_armor.png', armorValue: '5', properties: 'Massif (7)', encumbrance: 4, techLevel: 'II', slots: 2, value: 750 },
  { id: 'armure-soie-druschinnik', name: 'Armure de Soie Druschinnik', category: 'armures', cult: 'clanners', image: IMG + 'armor/druschinnik_silk_armor.png', armorValue: '3', encumbrance: 1, techLevel: 'III', value: 600, resources: 4 },
  { id: 'armure-cuir', name: 'Armure en Cuir', category: 'armures', image: IMG + 'armor/leather_armor.png', armorValue: '3', encumbrance: 2, techLevel: 'II', slots: 2, value: 320 },
  { id: 'assemblage-fibres-ceramique', name: 'Assemblage Fibres de Céramique', category: 'armures', image: IMG + 'armor/ceramic_fiber_weave.png', armorValue: '5', properties: 'Pare-balles (8), Hermétique (+1S)', encumbrance: 2, techLevel: 'V', slots: 1, value: 22000 },
  { id: 'cape-fourrure', name: 'Cape de Fourrure', category: 'armures', image: IMG + 'armor/fur_cape.png', armorValue: '1', encumbrance: 1, techLevel: 'I', value: 40 },
  { id: 'cape-mammouth', name: 'Cape en Peau de Mammouth', category: 'armures', image: IMG + 'armor/mammoth_hide_wrap.png', armorValue: '2', encumbrance: 2, techLevel: 'I', value: 100 },
  { id: 'casque-belier', name: 'Casque de Bélier (Arianoï)', category: 'armures', cult: 'jehammedans', image: IMG + 'armor/ram_helmet_arianoi.png', armorValue: '1', properties: 'Terrifiant (3)', encumbrance: 1, techLevel: 'I', value: 100, resources: 1, description: '<b>Casque de Bélier</b><br>Un Arianoï ne porte généralement ce casque encombrant qu\'au combat. La vision d\'un crâne de bélier sur un corps humain choque les faibles d\'esprit ou les personnes de peu de foi.' },
  { id: 'chapeau-manteau', name: 'Chapeau et Manteau', category: 'armures', cult: 'judges', image: IMG + 'armor/judges_hat_and_coat.png', armorValue: '2', encumbrance: 2, techLevel: 'II', slots: 2, value: 180, resources: 1 },
  { id: 'combinaison-chroniqueur', name: 'Combinaison de Chroniqueur', category: 'armures', cult: 'chroniclers', image: IMG + 'armor/chroniclers_suit.png', armorValue: '2', properties: 'Première impression (+1D)', encumbrance: 1, techLevel: 'IV', slots: 2, value: 300, resources: 2, description: '<b>Combinaison de Chroniqueur</b><br>Une combinaison de Chroniqueur regorge d\'appareils technologiques. Des câbles relient les blocs E-Cubes à des fixations velcro sur le dos, les bras et les jambes. Des capteurs enregistrent tous les mouvements et les transmettent à des microcontrôleurs.<br><br>Elle est toujours équipée d\'applications lumineuses surnommées « éclats », impressionnantes à voir. Nombre de Clanistes reculent d\'un pas face à elles.' },
  { id: 'combinaison-preserviste', name: 'Combinaison de Préserviste', category: 'armures', cult: 'spitalians', image: IMG + 'armor/preservist_variety.png', armorValue: '3', properties: 'Hermétique (+4S)', encumbrance: 3, techLevel: 'III', slots: 2, value: 800, resources: 4 },
  { id: 'combinaison-hygieniste', name: "Combinaison d'Hygiéniste", category: 'armures', cult: 'spitalians', image: IMG + 'armor/hygienist_suit.png', armorValue: '2', properties: 'Hermétique (+6S)', encumbrance: 3, techLevel: 'III', slots: 3, value: 900, resources: 3, description: '<b>Combinaison d\'Hygiéniste</b><br>Plus imposante que la spitalière, la combinaison d\'hygiéniste est équipée d\'un casque intégralement fermé et d\'une bouteille d\'oxygène. Elle est particulièrement adaptée aux missions dans des zones à forte contamination.<br><br>La bouteille d\'oxygène équivaut à un masque à gaz de niveau III.' },
  { id: 'combinaison-spitaliere', name: 'Combinaison Spitalière', category: 'armures', cult: 'spitalians', image: IMG + 'armor/spitalian_suit.png', armorValue: '2', properties: 'Hermétique (+4S), Respecté (Patients, +1D)', encumbrance: 2, techLevel: 'III', slots: 2, value: 300, resources: 2, description: '<b>Combinaison Spitalière</b><br>Cette combinaison en néoprène est hermétique et ne laisse donc passer aucune bactérie. Elle donne aux docteurs une protection relativement complète contre des environnements infectés.<br><br>Cette combinaison change un homme banal en véritable sauveur aux yeux d\'un malade. Son porteur obtient +1D aux jets d\'interactions sociales. La combinaison spitalière comporte un masque à gaz de niveau II.' },
  { id: 'cotte-mailles', name: 'Cotte de Mailles', category: 'armures', image: IMG + 'armor/chain_mail.png', armorValue: '4', encumbrance: 3, techLevel: 'II', slots: 1, value: 400 },
  { id: 'cuirasse-amsumo', name: 'Cuirasse AMSUMO', category: 'armures', image: IMG + 'armor/amsumo_casing.png', armorValue: '8', properties: 'Massif (10)', encumbrance: 3, techLevel: 'V', slots: 1, value: 9000 },
  { id: 'gilet-pare-balles-casque', name: 'Gilet Pare-Balles et Casque', category: 'armures', cult: 'scourgers', image: IMG + 'armor/flak_jacket_and_helmet.png', armorValue: '4', encumbrance: 1, techLevel: 'IV', slots: 1, value: 1600, resources: 2 },
  { id: 'gilet-pare-balles-lion', name: 'Gilet Pare-Balles et Casque de Lion', category: 'armures', cult: 'scourgers', image: IMG + 'armor/flak_jacket_and_lion_helmet.png', armorValue: '4', encumbrance: 2, techLevel: 'IV', slots: 1, value: 1600 },
  { id: 'harnais', name: 'Harnais', category: 'armures', cult: 'hellvetics', image: IMG + 'armor/harness.png', armorValue: '5', properties: 'Ignifugé (8)', encumbrance: 3, techLevel: 'IV', slots: 2, value: 4800, description: '<b>Harnais</b><br>Le harnais hellvétique représente le deuxième équipement le plus important pour les soldats après leur défricheur. Cette armure fut perfectionnée à l\'époque où les Hellvétiques construisirent leurs ponts, et elle fut rendue réfractaire. Elle n\'offre pas seulement une excellente protection balistique, mais limite aussi la chaleur infernale près de la Malédiction de la Faucheuse.<br><br>Les plaques peuvent être renforcées et vernies dans les usines de la forteresse : meilleure valeur d\'armure, mais propriété Cassant (-1 point d\'armure permanent après 12 dégâts en un seul coup).' },
  { id: 'harnais-ultraresistant', name: 'Harnais Ultrarésistant', category: 'armures', cult: 'hellvetics', image: IMG + 'armor/heavy_duty_harness.png', armorValue: '7', properties: 'Massif (9), Ignifugé (8), Spécial', encumbrance: 4, techLevel: 'V', slots: 3, value: 8000, resources: 4, description: '<b>Harnais Ultrarésistant</b><br>Le harnais ultrarésistant est un exosquelette recouvert de plaques, personnalisé à chaque mission. Il octroie Force +3D. Toute attaque et défense active, ainsi que toute action basée sur la motricité précise, subit un malus de -2D.' },
  { id: 'harnais-eclaireur', name: "Harnais d'Éclaireur", category: 'armures', cult: 'hellvetics', image: IMG + 'armor/spotter_harness.png', armorValue: '3', properties: 'Camouflage (5)', encumbrance: 2, techLevel: 'IV', slots: 2, value: 3500, resources: 3, description: '<b>Harnais d\'Éclaireur</b><br>Sur cette variante conçue pour les missions de reconnaissance et d\'infiltration, les plaques en céramique du harnais normal sont remplacées par un maillage de fibres renforcées, plus souple. Cette armure plus légère permet de porter par-dessus une tenue de camouflage.' },
  { id: 'harnais-caoutchouc', name: 'Harnais en Caoutchouc', category: 'armures', image: IMG + 'armor/rubber_harness.png', armorValue: '4', properties: 'Isolant', encumbrance: 3, techLevel: 'II', slots: 2, value: 650 },
  { id: 'manteau-cuir', name: 'Manteau en Cuir', category: 'armures', image: IMG + 'armor/leather_coat.png', armorValue: '2', encumbrance: 2, techLevel: 'I', slots: 2, value: 120 },
  { id: 'tenue-graphene', name: 'Tenue de Combat en Graphène', category: 'armures', image: IMG + 'armor/graph_combat_suit.png', armorValue: '7', properties: 'Pare-balles (10), Hermétique (+2S)', encumbrance: 3, techLevel: 'VI', value: 60000 },
  { id: 'toison-noire', name: 'Toison Noire (Arianoï)', category: 'armures', cult: 'jehammedans', image: IMG + 'armor/black_fleece_arianoi.png', armorValue: '3', properties: 'Ignifugé (8), Isolant, Terrifiant (5)', encumbrance: 1, techLevel: 'VI', value: 16000, resources: 6, description: '<b>Toison Noire</b><br>Cette toison d\'un noir profond et liquide a des boucles qui s\'agitent comme prises dans une tempête, même si aucune brise ne souffle. Les Spitaliers connaissent ce phénomène : un essaim de nanites. Ils ne parviennent pas à expliquer comment ces nanites restent accrochées à la toison sans réduire tout ce qu\'ils touchent en coraux de carbone.<br><br>La simple vision de cette toison enveloppée de nanites peut terrifier n\'importe qui.' },
  { id: 'veste-kevlar', name: 'Veste Kevlar', category: 'armures', image: IMG + 'armor/kevlar_jacket.png', armorValue: '4', properties: 'Pare-balles (7)', encumbrance: 2, techLevel: 'III', slots: 1, value: 1400 },
  { id: 'vetements-sales', name: 'Vêtements Sales', category: 'armures', image: IMG + 'armor/salted_clothing.png', armorValue: '1', properties: 'Instable (4)', encumbrance: 1, techLevel: 'I', value: 20 },

  // ─── BOUCLIERS ───
  { id: 'bouclier-tunnels', name: 'Bouclier des Tunnels', category: 'boucliers', cult: 'hellvetics', image: IMG + 'shields/tunnel_shield.png', armorValue: '+4D/+2', handling: '-2D', encumbrance: 3, techLevel: 'IV', value: 450, resources: 2, description: '<b>Bouclier des Tunnels</b><br>Le bouclier des tunnels est une plaque de métal rectangulaire équipée d\'une lanière de bras, conçue pour les combats dans les couloirs étroits des bunkers. Entièrement blindé, il couvre le combattant de la tête aux genoux.<br><br>Dans un couloir large d\'un seul homme, le porteur bénéficie d\'une armure de +4D/+2. Dans un espace ouvert, l\'armure est de +2D/+1.' },
  { id: 'bouclier-plaques-metal', name: 'Bouclier en Plaques de Métal', category: 'boucliers', image: IMG + 'shields/sheet_metal_shield.png', armorValue: '+1D/0', handling: '-1D', encumbrance: 1, techLevel: 'II', value: 40 },
  { id: 'bouclier-plastique', name: 'Bouclier en Plastique', category: 'boucliers', image: IMG + 'shields/plastic_shield.png', armorValue: '+2D/0', handling: '-1D', encumbrance: 1, techLevel: 'III', value: 220 },
  { id: 'bouclier-ovale', name: 'Bouclier Ovale', category: 'boucliers', cult: 'scourgers', image: IMG + 'shields/oval_shield.png', armorValue: '+2D/+1', handling: '-1D', encumbrance: 2, techLevel: 'II', value: 250, resources: 1, description: '<b>Bouclier Ovale</b><br>Le bouclier ovale des Flagellants est fabriqué de bois épais renforcé de métal récupéré. Léger et maniable, il permet de parer les coups tout en restant mobile sur le champ de bataille.<br><br>Les Fouetteurs l\'utilisent en tandem avec leur fouet, profitant de la courte longueur pour ne pas se gêner lors de l\'attaque.' },

  // ─── ARMES DE POING (suite) ───
  { id: 'defricheur-blinf', name: 'Défricheur à Canon Scié', category: 'armesDePoing', cult: 'hellvetics', image: IMG + 'handguns/stubbed_trailblazer_fm.png', caliber: 'Balle Blindée HF', range: '15/60', damage: '11', magazine: '20', properties: 'Régularité (2DC)', encumbrance: 2, techLevel: 'V', slots: 2, value: 14000, resources: 4 },
  { id: 'defricheur-creuse', name: 'Défricheur à Canon Scié', category: 'armesDePoing', cult: 'hellvetics', image: IMG + 'handguns/stubbed_trailblazer_hp.png', caliber: 'Pointe Creuse HF', range: '15/60', damage: '14', magazine: '20', properties: 'Régularité (2DC)', encumbrance: 2, techLevel: 'V', slots: 2, value: 14000, resources: 4 },
  { id: 'moulinette', name: 'Moulinette', category: 'armesDePoing', cult: 'scrappers', image: IMG + 'handguns/grinder.png', caliber: 'Poudre noire', range: '5/20', damage: '8', magazine: '1', properties: 'Charg. par gueule, Dispersion', encumbrance: 2, techLevel: 'III', slots: 2, value: 600, resources: 4, description: '<b>Moulinette</b><br>Un pistolet à poudre noire fabriqué par les Récupérateurs, assemblé à partir de pièces récupérées dans les ruines industrielles. Son canon évasé provoque une dispersion notable à longue portée, mais dévastateur à bout portant.<br><br>Doit être rechargé par la gueule après chaque coup, mais ses munitions sont faciles à fabriquer.' },
  { id: 'pistolet-automatique', name: 'Pistolet Automatique', category: 'armesDePoing', image: IMG + 'handguns/automatic_pistol.png', caliber: '4.6x30 mm', range: '10/40', damage: '7', magazine: '20', properties: 'Régularité (3DC)', encumbrance: 1, techLevel: 'IV', slots: 2, value: 2500 },
  { id: 'pistolet-de-detresse', name: 'Pistolet de Détresse', category: 'armesDePoing', image: IMG + 'handguns/signal_pistol.png', caliber: 'Spécial', range: '15/60', damage: '5', magazine: '1', properties: 'Incendiaire', encumbrance: 1, techLevel: 'IV', slots: 2, value: 900 },
  { id: 'pistolet-lourd', name: 'Pistolet Lourd', category: 'armesDePoing', image: IMG + 'handguns/heavy_pistol.png', caliber: '.50 GL', range: '10/40', damage: '12', magazine: '12', properties: 'Coup de tonnerre', encumbrance: 1, techLevel: 'IV', slots: 2, value: 2800 },
  { id: 'pistolet-mitrailleur', name: 'Pistolet Mitrailleur', category: 'armesDePoing', cult: 'palers', image: IMG + 'handguns/submachine_gun.png', caliber: '4.6x30 mm', range: '10/40', damage: '7', magazine: '35', properties: 'Régularité (2DC), Rafales (3)', encumbrance: 2, techLevel: 'IV', slots: 2, value: 3500, resources: 3, description: '<b>Pistolet Mitrailleur</b><br>Compact et fiable, ce pistolet mitrailleur récupéré dans les archives technologiques des Distributeurs tire en mode semi-automatique ou par rafales. Les Blafards l\'utilisent pour protéger les équipes d\'exploration dans les sous-sols dangereux.' },
  { id: 'pistolet-a-silex', name: 'Pistolet à Silex', category: 'armesDePoing', cult: 'judges', image: IMG + 'handguns/flintlock_pistol.png', caliber: 'Balle en plomb', range: '5/20', damage: '8', magazine: '1', properties: 'Charg. par gueule', encumbrance: 1, techLevel: 'III', slots: 1, value: 300, resources: 2, description: '<b>Pistolet à Silex</b><br>L\'arme de poing emblématique des Juges, forgée à la main par les armuriers de la confrérie. Son mécanisme à silex est entretenu avec soin — une arme qui ne peut tirer qu\'un coup, mais dont le coup est lourd de sens.<br><br>Le Juge qui dégaine ce pistolet signifie qu\'un verdict définitif a été rendu.' },
  { id: 'revolver', name: 'Revolver', category: 'armesDePoing', image: IMG + 'handguns/revolver.png', caliber: '.44', range: '10/40', damage: '10', magazine: '6', encumbrance: 1, techLevel: 'III', slots: 2, value: 1200 },

  // ─── ÉQUIPEMENT DE SURVIE BASIQUE (Nourriture) ───
  { id: 'filtre-eau', name: 'Filtre à Eau', category: 'equipementDeSurvieBasique', image: IMG + 'equipment/water_filter.svg', properties: 'Rend de l\'eau sale potable', techLevel: 'III', value: 120 },
  { id: 'gourde', name: 'Gourde', category: 'equipementDeSurvieBasique', image: IMG + 'equipment/flask.svg', properties: 'Eau pour 2 jours', techLevel: 'I', value: 10 },
  { id: 'materiel-peche', name: 'Matériel de Pêche', category: 'equipementDeSurvieBasique', image: IMG + 'equipment/fishing_gear.svg', properties: 'INS+Survie : +1D', techLevel: 'I', value: 5 },
  { id: 'ustensiles-cuisine', name: 'Ustensiles de Cuisine', category: 'equipementDeSurvieBasique', image: IMG + 'equipment/cooking_equipment.svg', properties: 'Cuisiner racines et légumes', techLevel: 'II', value: 30 },

  // ─── PIÈGES ───
  { id: 'chausse-trappe', name: 'Chausse-Trappe', category: 'pieges', image: IMG + 'equipment/pitfall.svg', properties: 'Discrétion 2, Spécial', techLevel: 'I', value: 0 },
  { id: 'fil-de-detente', name: 'Fil de Détente', category: 'pieges', image: IMG + 'equipment/tripwire.svg', properties: 'Discrétion 5, Perd son action, explosion potentielle', techLevel: 'II', value: 5 },
  { id: 'mine', name: 'Mine', category: 'pieges', image: IMG + 'equipment/mine.svg', properties: 'Discrétion 4, Spécial', encumbrance: 1, techLevel: 'III', value: 0 },
  { id: 'piege-a-ours', name: 'Piège à Ours', category: 'pieges', image: IMG + 'equipment/bear_trap.svg', properties: 'Discrétion 4, 8 Dégâts', encumbrance: 1, techLevel: 'II', value: 30 },

  // ─── SOURCES LUMINEUSES / FEU ───
  { id: 'allumettes', name: 'Allumettes', category: 'sourcesLumineuses', image: IMG + 'equipment/matches.svg', properties: '10 utilisations', techLevel: 'II', value: 25 },
  { id: 'briquet', name: 'Briquet', category: 'sourcesLumineuses', image: IMG + 'equipment/lighter.svg', properties: 'Rechargeable', techLevel: 'III', value: 180 },
  { id: 'huile-lampe', name: 'Huile pour Lampe', category: 'sourcesLumineuses', image: IMG + 'equipment/lamp_oil.svg', properties: 'Pour lampe à huile', techLevel: 'II', value: 10 },
  { id: 'lampe-huile', name: 'Lampe à Huile', category: 'sourcesLumineuses', image: IMG + 'equipment/oil_lamp.svg', properties: 'Réduit le malus d\'obscurité de 2 points, 2 heures', techLevel: 'II', value: 40 },
  { id: 'rayon-soleil', name: 'Rayon de Soleil', category: 'sourcesLumineuses', cult: 'palers', image: IMG + 'equipment/firefly.svg', properties: 'Malus d\'obscurité -2, 100 heures par E-Cube', encumbrance: 1, techLevel: 'IV', value: 1200, resources: 2, description: '<b>Rayon de Soleil</b><br>Une lampe frontale à DEL alimentée par un E-Cube, conçue par les Blafards pour les explorations souterraines prolongées. Sa lumière blanche froide rappelle aux Blafards la surface qu\'ils n\'ont jamais vue.<br><br>Un E-Cube dure 100 heures et réduit le malus d\'obscurité à -2 dans un rayon de 10 m.' },
  { id: 'silex-amadou', name: 'Silex et Amadou', category: 'sourcesLumineuses', image: IMG + 'equipment/flint_and_tinder.svg', properties: 'L\'amadou met plusieurs minutes à s\'enflammer', techLevel: 'I', value: 20 },
  { id: 'torche', name: 'Torche', category: 'sourcesLumineuses', image: IMG + 'equipment/torch.svg', properties: 'Réduit le malus d\'obscurité de 1 point, 30 min', techLevel: 'I', value: 3 },
  { id: 'oeil-cyclope', name: 'Œil de Cyclope', category: 'sourcesLumineuses', cult: 'palers', image: IMG + 'equipment/cyclops_eye.svg', properties: 'Aucun malus d\'obscurité (vision nocturne Blafards), sinon malus -2', encumbrance: 2, techLevel: 'V', value: 14000, resources: 3, description: '<b>Œil de Cyclope</b><br>Un casque de vision nocturne à amplification de lumière, récupéré ou assemblé par les techniciens Blafards. L\'objectif unique au centre donne à son porteur une apparence de cyclope — d\'où le surnom.<br><br>Les Blafards, dont les yeux sont déjà adaptés aux ténèbres, n\'ont aucun malus d\'obscurité en le portant. Pour les autres, le malus est réduit à -2.' },

  // ─── ORIENTATION / PISTAGE ───
  { id: 'astrolabe', name: 'Astrolabe', category: 'orientationPistage', cult: 'neolibyans', image: IMG + 'equipment/astrolabe.svg', properties: 'INS+Orientation : +1D', techLevel: 'II', value: 650, resources: 1, description: '<b>Astrolabe</b><br>Les astrolabes, bien plus décoratifs qu\'utiles, sont encore utilisés par les navigateurs pour déterminer les points cardinaux en fonction de la hauteur du soleil ou des astres.' },
  { id: 'atlas', name: 'Atlas', category: 'orientationPistage', cult: 'neolibyans', image: IMG + 'equipment/atlas.svg', properties: 'Améliorable (1-3). INS+Orientation : +niveau × 1D', techLevel: 'II', value: 1000, resources: 2, levelable: true },
  { id: 'atlas-rg', name: 'Atlas RG', category: 'orientationPistage', cult: 'palers', image: IMG + 'equipment/rg_atlas.svg', properties: 'INS+Orientation : +2D', techLevel: 'V', value: 4500, resources: 3, description: '<b>Atlas RG</b><br>Les Blafards ne possèdent pas tous un disque solaire orbital pour leur montrer le chemin. Dans ces cas-là, ils se fient aux bons vieux atlas RG. Les cartes montrent des routes qui n\'existent plus et des lacs devenus cuves couvertes de poussière. Seuls les points de repère récemment ajoutés par les Blafards permettent de s\'orienter avec elles.' },
  { id: 'boussole', name: 'Boussole', category: 'orientationPistage', image: IMG + 'equipment/compass.svg', properties: 'INS+Orientation : +1D', techLevel: 'III', value: 220 },
  { id: 'bracelet-transpondeur', name: 'Bracelet Transpondeur', category: 'orientationPistage', cult: 'hellvetics', image: IMG + 'equipment/transponder_bracelet.svg', properties: 'Bracelet détecté par le navigateur, portée 20m', techLevel: 'V', value: 580, resources: 1, description: '<b>Bracelet Transpondeur</b><br>Les Éclaireurs camouflent généralement le transmetteur avec des lanières de cuir, et le portent autour du cou ou du poignet. Un navigateur peut détecter le signal du transmetteur à 20 pas de distance pour ensuite le représenter par un point sur la carte. Ainsi, un Hellvétique peut identifier un Éclaireur au beau milieu d\'une foule.' },
  { id: 'carte-regionale', name: 'Carte Régionale', category: 'orientationPistage', image: IMG + 'equipment/regional_map.svg', properties: 'INS+Orientation : +1D', techLevel: 'II', value: 40 },
  { id: 'jumelles', name: 'Jumelles', category: 'orientationPistage', cult: 'hellvetics', image: IMG + 'equipment/binocular.svg', properties: 'Observation à distance : INS+Perception : +4D', techLevel: 'IV', value: 5200, resources: 2, description: '<b>Jumelles</b><br>Toutes les paires de jumelles dont dispose l\'armée hellvétique proviennent de stocks datant de l\'époque d\'antan. Elles font partie de l\'équipement standard de tout abri périphérique et de tout Éclaireur.' },
  { id: 'materiel-mesure', name: 'Matériel de Mesure', category: 'orientationPistage', cult: 'spitalians', image: IMG + 'equipment/gauging_material.svg', properties: 'Calibre un vocalisateur noumenon ou un mollusk sur un Chakra, difficulté : niveau', techLevel: 'IV', value: 600, resources: 4 },
  { id: 'substances-mesure', name: 'Substances de Mesure', category: 'orientationPistage', cult: 'spitalians', image: IMG + 'equipment/gauging_material.svg', properties: 'Améliorable (1-3). Réduit de niveau la difficulté pour détecter un Psychonaute ou un champ de spores d\'Extase calibré ; augmente de niveau la difficulté pour toutes les autres Extases', techLevel: 'IV', value: 600, resources: 4, levelable: true, description: '<b>Substances de Mesure</b><br>Grâce à des extraits de spores épigénétiquement modifiés, des vocalisateurs noumenon et des mollusks peuvent être calibrés sur un Chakra bien particulier.<br><br><b>SPÉCIALITÉ</b> : la difficulté pour détecter un Psychonaute ou un champ de spores d\'Extase similaire est réduite d\'un nombre de points équivalent au niveau de la substance de mesure (niveau 1 à 3). Néanmoins, la difficulté augmente d\'un nombre de points similaire pour toutes les autres Extases. Tout calibrage est permanent, et un intercalibrage détruira les tissus du Mollusk.' },
  { id: 'navigateur', name: 'Navigateur', category: 'orientationPistage', cult: 'hellvetics', image: IMG + 'equipment/pathfinder.svg', properties: 'INS+Orientation : +4D', encumbrance: 2, techLevel: 'V', value: 15000, resources: 4, description: '<b>Navigateur</b><br>Cet ordinateur de navigation dispose d\'un écran de 25 centimètres, d\'une boussole intégrée et d\'un module de réception. Les cartes enregistrées datent de l\'époque d\'antan, mais des marqueurs désignant différentes villes post-Eshaton ont été rajoutés. Des balises de navigation fournies par les hauts gradés permettent d\'adapter les cartes aux missions.' },
  { id: 'traqueur', name: 'Traqueur', category: 'orientationPistage', cult: 'chroniclers', image: IMG + 'equipment/tracker.svg', properties: 'Détecte les transpondeurs, portée 100 m', encumbrance: 1, techLevel: 'V', value: 4400, resources: 4, description: '<b>Traqueur</b><br>Un transpondeur est injecté dans le corps des Fusibles et parfois d\'autres Chroniqueurs afin de pouvoir les localiser par la suite. Le traqueur n\'indique pas de direction : il se contente de clignoter de plus en plus rapidement lorsqu\'il se rapproche de sa cible.' },
  { id: 'vocalisateur-noumenon', name: 'Vocalisateur Noumenon', category: 'orientationPistage', cult: 'spitalians', image: IMG + 'equipment/noumenon_vocalizer.svg', properties: 'Détecte les appels éthériques', encumbrance: 2, techLevel: 'IV', value: 2400, resources: 3 },

  // ─── ESCALADE ───
  { id: 'baudrier', name: 'Baudrier', category: 'escalade', image: IMG + 'equipment/climbing_harness.svg', properties: 'Utilisé avec une corde : PHY+Athlétisme : +1D', techLevel: 'III', value: 400 },
  { id: 'corde-10m', name: 'Corde 10m', category: 'escalade', image: IMG + 'equipment/10m_of_rope.svg', properties: 'Souvent nécessaire pour escalader', techLevel: 'II', value: 60 },

  // ─── MATÉRIEL DE COUCHAGE ───
  { id: 'couverture-sac-couchage', name: 'Couverture/Sac de Couchage', category: 'materielDeCouchage', image: IMG + 'equipment/blanket_sleeping_bag.svg', properties: 'Sommeil récupérateur : guérit 1 Blessure Superficielle par nuit', encumbrance: 2, techLevel: 'I', value: 10 },
  { id: 'filet-camouflage', name: 'Filet de Camouflage', category: 'materielDeCouchage', image: IMG + 'equipment/camo_net.svg', properties: 'Rend le lieu de repos plus difficile à repérer par des ennemis : +2', encumbrance: 2, techLevel: 'II', value: 60 },
  { id: 'moustiquaire', name: 'Moustiquaire', category: 'materielDeCouchage', image: IMG + 'equipment/insect_net.svg', properties: 'Protège des insectes', encumbrance: 2, techLevel: 'II', value: 80 },
  { id: 'tente', name: 'Tente', category: 'materielDeCouchage', image: IMG + 'equipment/tent.svg', properties: 'Protège des intempéries', encumbrance: 3, techLevel: 'I', value: 120 },

  // ─── TRANSPORT ───
  { id: 'charrette-bras', name: 'Charrette à Bras', category: 'transport', cult: 'scrappers', image: IMG + 'equipment/carrying_rig.svg', properties: 'Améliorable (1-3). Encombrement -1 × niveau', techLevel: 'II', value: 100, resources: 1 },
  { id: 'sac-dos', name: 'Sac à Dos', category: 'transport', image: IMG + 'equipment/backpack.svg', properties: 'Encombrement -2 pour les objets dans le sac à dos ; peut être posé au sol', encumbrance: 1, techLevel: 'I', value: 15 },
  { id: 'traineau', name: 'Traîneau', category: 'transport', image: IMG + 'equipment/sleigh.svg', properties: 'Encombrement -3 pour les objets sur le traîneau ; peut être posé', encumbrance: 1, techLevel: 'I', value: 20 },

  // ─── DANS L'OMBRE ───
  { id: 'crochet', name: 'Crochet', category: 'danslOmbre', image: IMG + 'equipment/lock_pick.svg', properties: 'Permet à l\'utilisateur de crocheter des serrures mécaniques', techLevel: 'II', value: 20 },
  { id: 'peinture-camouflage', name: 'Peinture de Camouflage', category: 'danslOmbre', image: IMG + 'equipment/camo_paint.svg', properties: 'AGI+Furtivité : +2D', techLevel: 'I', value: 15 },
  { id: 'periscope', name: 'Périscope', category: 'danslOmbre', cult: 'scrappers', image: IMG + 'equipment/periscope.svg', properties: 'Terrain difficile : AGI+Furtivité : +2D', techLevel: 'II', value: 100, resources: 2 },
  { id: 'sesamite', name: 'Sésamite', category: 'danslOmbre', cult: 'palers', image: IMG + 'equipment/sesamite.svg', properties: 'Crochetage : AGI+Dextérité : +3D', techLevel: 'V', value: 18000, resources: 5, description: '<b>Sésamite</b><br>Qui dit serrure dit ouverture, un état d\'esprit qui convient aux Blafards équipés d\'une sésamite, un crochet électrique. Les mécanismes de la sésamite cliquettent et bourdonnent une fois dans la serrure. Le Blafard, les yeux fermés, prête une oreille attentive et déplace précautionneusement l\'artefact jusqu\'à ce qu\'un claquement survienne.<br><br>Ne peut s\'utiliser sur les serrures électroniques des Distributeurs.' },
  { id: 'trousseau-cles', name: 'Trousseau de Clés', category: 'danslOmbre', cult: 'apocalyptics', image: IMG + 'equipment/key_ring.svg', properties: 'Crochetage : AGI+Dextérité : +1D', techLevel: 'II', value: 400, resources: 3, description: '<b>Trousseau de Clés</b><br>Les Pics-verts ont bâti des centaines d\'établissements, et ils possèdent une clé pour chacun d\'entre eux. Il est même probable que parmi toutes ces clés, il en existe quelques-unes capables d\'ouvrir d\'autres serrures.' },

  // ─── TECHNOLOGIE ───
  { id: 'cisailles-pneumatiques', name: 'Cisailles à Métaux Pneumatiques', category: 'technologie', cult: 'scrappers', image: IMG + 'equipment/pneumatic_metal_shears.svg', properties: 'Obstacles en métal : PHY+Force : +4D', encumbrance: 3, techLevel: 'IV', value: 1800, resources: 3, description: '<b>Cisailles à Métaux Pneumatiques</b><br>Afin d\'atteindre les profondeurs de l\'époque d\'antan avec tous ses artefacts, les Récupérateurs dépendent de cet équipement encombrant. Grâce aux cisailles à métaux pneumatiques, ils peuvent ouvrir des endroits condamnés et découper des montagnes entières de métal.<br><br>Du moment que les cisailles possèdent un point d\'appui, elles donnent +4D à PHY+Force pour dégager d\'énormes obstacles en métal.' },
  { id: 'drones-flux', name: 'Drones du Flux et Affichage', category: 'technologie', cult: 'chroniclers', image: IMG + 'equipment/stream_drones.svg', properties: 'INS+Perception : +10, maximum 4 drones, 10 m', techLevel: 'V', value: 19000, resources: 6, description: '<b>Drones du Flux</b><br>Des gyropropulseurs vrombissants soulèvent ces drones du sol. Des objectifs oculaires ajustent leur contraste puis transfèrent leurs images stabilisées sur un écran d\'affichage grand comme la paume de la main, situé sur le bras du Chroniqueur.<br><br>Un Chroniqueur équipé de drones actifs ne peut être pris par surprise. Un drone possède une valeur d\'armure de 3 et une structure de 2. Il ne peut s\'éloigner de plus de 10 m de l\'écran.' },
  { id: 'grenade-impulsion', name: 'Grenade à Impulsion', category: 'technologie', image: IMG + 'grenades/frag_grenade.png', properties: 'Détruit toute l\'électronique sur un rayon de 10 m', techLevel: 'V', value: 6000, description: '<b>Grenade à Impulsion</b><br>Un feu de Saint Elme virevolte dans le tube, quand tout à coup les lampes fluorescentes explosent en une pluie d\'étincelles. Tous les appareils électroniques dans un rayon de 10 m sont définitivement morts.<br><br>Les AMSUMO résistants subissent tout de même 2 points de Traumatisme. Les disques solaires et les mécanismes de verrouillage des Distributeurs sont immunisés.' },
  { id: 'imprimante-lettres', name: 'Imprimante à Lettres de Change', category: 'technologie', cult: 'chroniclers', image: IMG + 'equipment/draft_printer.svg', properties: 'Par mois : 50 LC × Ressources', techLevel: 'IV', value: 4000, resources: 2, description: '<b>Imprimante à Lettres de Change</b><br>Un clavier numérique aux touches effacées, des chiffres de couleur ambre clignotant sur l\'écran d\'affichage. La machine recrache un morceau de papier thermique imprimé : une lettre de change des Chroniqueurs.<br><br>Ces imprimantes produisent de l\'argent papier et pourraient déstabiliser l\'économie européenne. Chacune est limitée à un montant maximal, réinitialisable uniquement par un Fragment situé dans un Serveur.' },
  { id: 'liaison-approvisionnement', name: 'Liaison Montante d\'Approvisionnement', category: 'technologie', cult: 'hellvetics', image: IMG + 'equipment/forager_uplink.svg', properties: 'Ressources 6 pour armes, munitions, nourriture', encumbrance: 2, techLevel: 'V', value: 33000, resources: 4, description: '<b>Liaison Montante d\'Approvisionnement</b><br>Les Approvisionneurs se connectent au réseau de la Forteresse alpine à partir de leur ordinateur portatif afin de commander armes et munitions. Résistante et équipée d\'une batterie longue durée, la liaison vers l\'ordinateur central bénéficie du plus haut niveau de cryptage, ce qui attise la convoitise des Chroniqueurs.' },
  { id: 'mouchards-surveillance', name: 'Mouchards et Équip. de Surveillance', category: 'technologie', cult: 'spitalians', image: IMG + 'equipment/radio.svg', properties: 'Difficile à détecter : AGI+Furtivité : +2 succès lors de l\'installation', techLevel: 'IV', value: 2200, resources: 1, description: '<b>Mouchards et Appareils d\'Écoute</b><br>Les Hippocrates assurent le maintien de l\'ordre dans le Spital. Grâce à des mouchards et autres appareils d\'écoute, ils restent au fait des différentes opinions et idées exprimées ici ou là.<br><br>Pour planter un mouchard, l\'Hippocrate lance AGI+Furtivité et obtient +2 succès grâce à sa petite taille. La distance de transmission est d\'environ 20 m.' },
  { id: 'outils-electroniques', name: 'Outils Électroniques', category: 'technologie', cult: 'palers', image: IMG + 'equipment/electronics_tools.svg', properties: 'Manipulation d\'appareils électroniques : +1D aux tests d\'action', techLevel: 'IV', value: 2400, resources: 2, description: '<b>Outils Électroniques</b><br>Getrell lui-même n\'aurait jamais imaginé que les Distributeurs puissent survivre sans encombre au passage des siècles. Les abris souterrains recèlent de nombreux outils et pièces détachées qui n\'attendent que d\'être retrouvés afin de réparer les pannes du système électrique.' },
  { id: 'trousse-outils', name: 'Trousse à Outils', category: 'technologie', cult: 'scrappers', image: IMG + 'equipment/toolkit.svg', properties: 'Améliorable (1-3). AGI+Artisanat et AGI+Dextérité : +1D × niveau', encumbrance: 2, techLevel: 'III', value: 600, resources: 2, levelable: true },

  // ─── DISQUES SOLAIRES ───
  { id: 'disque-arbitre', name: 'Arbitre', category: 'disquesSolaires', cult: 'palers', image: IMG + 'equipment/arbiter.svg', properties: 'S\'infiltre dans les systèmes RG : INT+Connaissance des Artefacts : +2D ; peut activer et désactiver tout disque', encumbrance: 1, techLevel: 'VI', value: 44000, resources: 6 },
  { id: 'disque-cataracto', name: 'Cataracto', category: 'disquesSolaires', cult: 'palers', image: IMG + 'equipment/cataract.svg', properties: 'Bourdonnement désagréable ; interagit avec l\'orbital ; scanne les environs par ultrason', encumbrance: 1, techLevel: 'V', value: 12000, resources: 3 },
  { id: 'disque-orbital', name: 'Orbital', category: 'disquesSolaires', cult: 'palers', image: IMG + 'equipment/orbital.svg', properties: 'Affiche les cartes des environs, peut être mis à jour avec les cartes des abris souterrains', encumbrance: 1, techLevel: 'V', value: 22000, resources: 4 },
  { id: 'disque-phaeton', name: 'Phaëton', category: 'disquesSolaires', cult: 'palers', image: IMG + 'equipment/phaethon.svg', properties: 'S\'illumine ; ouvre les portails dans les Distributeurs', encumbrance: 1, techLevel: 'V', value: 18000, resources: 3 },
  { id: 'disque-quantum', name: 'Quantum', category: 'disquesSolaires', cult: 'palers', image: IMG + 'equipment/quantum.svg', properties: 'Détecte autres disques quantum. La portée dépend du niveau', encumbrance: 1, techLevel: 'V', value: 9000 },
  { id: 'disque-quasar', name: 'Quasar', category: 'disquesSolaires', cult: 'palers', image: IMG + 'equipment/quasar.svg', properties: 'Capteur solaire, peut recharger tout autre disque', encumbrance: 1, techLevel: 'V', value: 38000, resources: 5 },

  // ─── MODULES POUR COMBINAISON DE CHRONIQUEURS ───
  { id: 'mod-decharge-electrique', name: 'Décharge Électrique', category: 'modulesChroniqueurs', cult: 'chroniclers', image: IMG + 'equipment/discharge.svg', properties: 'Défense : l\'ennemi subit une perte de 1 point d\'Égo par niveau, doit se recharger pendant 2 rounds', encumbrance: 1, techLevel: 'IV', value: 1000, resources: 3, levelable: true },
  { id: 'mod-dome-rayonnant', name: 'Dôme Rayonnant', category: 'modulesChroniqueurs', cult: 'chroniclers', image: IMG + 'equipment/dome_of_rays.svg', properties: 'Superstition : interactions sociales : +1D × niveau', encumbrance: 1, techLevel: 'IV', value: 1000, resources: 2, levelable: true },
  { id: 'mod-freon', name: 'Fréon', category: 'modulesChroniqueurs', cult: 'chroniclers', image: IMG + 'equipment/freon.svg', properties: 'Attaque : activation + AGI+Armes à projectiles : +2D. Pénétration (5), Dégâts 1 × niveau', encumbrance: 1, techLevel: 'IV', value: 2000, resources: 4, levelable: true },
  { id: 'mod-fumigateur', name: 'Fumigateur', category: 'modulesChroniqueurs', cult: 'chroniclers', image: IMG + 'equipment/fumor.svg', properties: 'Défense passive sur 2 rounds : +1 × niveau, le niveau détermine le nombre de charges', encumbrance: 1, techLevel: 'IV', value: 2500, resources: 2, levelable: true },
  { id: 'mod-hurleur', name: 'Hurleur', category: 'modulesChroniqueurs', cult: 'chroniclers', image: IMG + 'equipment/screamer.svg', properties: 'Fait fuir les pickpockets avec un hurlement à haute fréquence', encumbrance: 1, techLevel: 'IV', value: 500, resources: 2 },
  { id: 'mod-lumiere-verte', name: 'Lumière Verte', category: 'modulesChroniqueurs', cult: 'chroniclers', image: IMG + 'equipment/greenlight.svg', properties: 'Cône de 45° : la cible subit +2 difficulté en malus général, Durée : 2 rounds, Refroidissement 3 rounds', encumbrance: 1, techLevel: 'V', value: 4000, resources: 4, levelable: true },
  { id: 'mod-source', name: 'Source', category: 'modulesChroniqueurs', cult: 'chroniclers', image: IMG + 'equipment/source.svg', properties: 'Niveau égal au total des niveaux de tous les modules à alimenter', encumbrance: 2, techLevel: 'V', value: 5000, resources: 2, levelable: true },

  // ─── MODULES POUR HARNAIS HELLVÉTIQUES ───
  { id: 'mod-circuit-refroidissement', name: 'Circuit de Refroidissement', category: 'modulesHarnaisHellvetiques', cult: 'hellvetics', image: IMG + 'equipment/cooling_aggregate.svg', properties: 'Résiste aux chaleurs extrêmes, 1 Emplacement', techLevel: 'V', value: 5000, resources: 4 },
  { id: 'mod-decoupeur', name: 'Découpeur', category: 'modulesHarnaisHellvetiques', cult: 'hellvetics', image: IMG + 'equipment/cutting_tool.svg', properties: 'Inutile en attaque, 20 points de dégâts par round sur un obstacle, 3 Emplacements', techLevel: 'IV', value: 1200, resources: 2 },
  { id: 'mod-foreur-tunnel', name: 'Foreur à Tunnel', category: 'modulesHarnaisHellvetiques', cult: 'hellvetics', image: IMG + 'equipment/tunnel_driller.svg', properties: 'Béton et roche : 10 points de dégâts par round, réservoir à risque d\'être touché, -6D en combat, 3 Emplacements', techLevel: 'IV', value: 1000, resources: 2 },
  { id: 'mod-poids-lourd', name: 'Poids Lourd', category: 'modulesHarnaisHellvetiques', cult: 'hellvetics', image: IMG + 'equipment/heavyweight.svg', properties: 'PHY+Force : +6D, nécessite 2 Emplacements', techLevel: 'V', value: 6800, resources: 3 },
  { id: 'mod-soudeur-arc', name: 'Soudeur à l\'Arc', category: 'modulesHarnaisHellvetiques', cult: 'hellvetics', image: IMG + 'equipment/arc_welder.svg', properties: '15 points de dégâts sur un obstacle, réservoir à risque d\'être touché, détonation sur au moins 4 dégâts, 3 Emplacements', techLevel: 'IV', value: 2000, resources: 3 },

  // ─── TALISMANS / EMBLÈMES ───
  { id: 'codex-edition-speciale', name: 'Codex, Édition Spéciale', category: 'talismansEmblemes', cult: 'judges', image: IMG + 'equipment/codex_se.svg', properties: '1 round de méditation : +1 point d\'Égo ; CHA+Expression : +2D', techLevel: 'II', value: 800, resources: 3 },
  { id: 'codex', name: 'Codex', category: 'talismansEmblemes', cult: 'judges', image: IMG + 'equipment/codex.svg', properties: '1 round de méditation : +1 point d\'Égo', techLevel: 'II', value: 300, description: '<b>Codex</b><br>Sur les terres sans foi ni loi, le Codex, avec ses règles, ses lois et ses épigrammes, est le refuge du Juge. Ce livre relié en cuir, transporté dans une sacoche à la ceinture, ne quitte jamais son propriétaire.<br><br>Les Juges de haut rang possèdent un Codex annoté et doté d\'un glossaire. Cette version spéciale procure +2D à CHA+Expression lorsqu\'ils prononcent un jugement.' },
  { id: 'doigt-anubis', name: 'Doigt d\'Anubis', category: 'talismansEmblemes', cult: 'anubians', image: IMG + 'equipment/anubis_finger.svg', properties: 'Identifie les Anubiens', techLevel: 'I', value: 9000, description: '<b>Doigt d\'Anubis</b><br>Cet os orné de cercles et de spirales gravées a la taille d\'un avant-bras. Sa surface brille, polie par les milliers de mains entre lesquelles il est passé. Une extrémité est pointue et jaunie.<br><br>Si une ampoule apparaît sur la peau d\'un Afrikain après qu\'un Anubien l\'a égratignée avec cet os, alors cet Afrikain est destiné à suivre la voie d\'Anubis. Sur un Initié potentiel, la marque prendra 12 heures ; sur un Hogon, quelques secondes.' },
  { id: 'icones', name: 'Icônes', category: 'talismansEmblemes', cult: 'jehammedans', image: IMG + 'equipment/icons.svg', properties: 'En rapport avec la situation : +2D à tous les tests d\'action', encumbrance: 2, techLevel: 'I', value: 200, description: '<b>Icône</b><br>Après plusieurs jours de privations et de prières, l\'Icônide quitte ses quartiers affaibli, mais heureux : Dieu a accordé à sa tribu un témoignage de sa faveur. Une Icône est toujours en rapport avec un acte ou une mission précise. Dès que l\'acte a été accompli, l\'Icône devient un objet sacré, ramenée au sein de la communauté.' },
  { id: 'enseignements-jehammet', name: 'Les Enseignements de Jehammet', category: 'talismansEmblemes', cult: 'jehammedans', image: IMG + 'equipment/jehammeds_teachings.svg', properties: '+2D aux interactions sociales au sein du Culte', techLevel: 'II', value: 2000, resources: 3, description: '<b>Les Enseignements de Jehammet</b><br>Ces parchemins contenant les enseignements de Jehammet sont conservés dans des étuis en laiton. Ils ne sont sortis et déroulés que lors des jours saints. Le souffle de Dieu touche quiconque est autorisé à lire ces écrits.' },
  { id: 'testament-jehammet', name: 'Le Testament de Jehammet / Les Bienfaits d\'Ariès', category: 'talismansEmblemes', cult: 'jehammedans', image: IMG + 'equipment/jehammeds_will.svg', properties: '+4D aux interactions sociales au sein du Culte', techLevel: 'II', value: 6000, resources: 5, description: '<b>Le Testament de Jehammet / Les Bienfaits d\'Ariès</b><br>Ces parchemins conservés dans des étuis dorés révéleraient les véritables buts et intentions de Jehammet. Transmis de Prophète en Prophète, aucun d\'entre eux n\'est parvenu à déchiffrer ces textes. Les Arianoï nomment ces mêmes parchemins les « Bienfaits d\'Ariès ».' },
  { id: 'livre-comptes-calculette', name: 'Livre de Comptes : Calculette', category: 'talismansEmblemes', cult: 'neolibyans', image: IMG + 'equipment/balancer_pocket_calculator.svg', properties: 'Maths : INT+Technologie : +4D', techLevel: 'IV', value: 20000, resources: 3 },
  { id: 'livre-comptes-piege', name: 'Livre de Comptes : Piège', category: 'talismansEmblemes', cult: 'neolibyans', image: IMG + 'equipment/balancer_trap.svg', properties: 'Tentative d\'ouverture : poison de Puissance 5, -1 point d\'Égo par round ; s\'estompe après 4 heures', techLevel: 'III', value: 8000, resources: 2 },
  { id: 'livre-comptes-verrou', name: 'Livre de Comptes : Verrou', category: 'talismansEmblemes', cult: 'neolibyans', image: IMG + 'equipment/balancer_lock.svg', properties: 'Empêche de regarder le contenu ; crochetage : AGI+Dextérité (5)', techLevel: 'III', value: 4000, resources: 2 },
  { id: 'livre-comptes', name: 'Livre de Comptes', category: 'talismansEmblemes', cult: 'neolibyans', image: IMG + 'equipment/balancer.svg', properties: 'Si perdu : +4D pour toute affaire commerciale menée contre ancien propriétaire', techLevel: 'II', value: 500, description: '<b>Livre de Comptes</b><br>Ce livre épais à la couverture décorée avec de la fourrure de lion ou des bandes de métal est utilisé pour rassembler concessions de vente, accords de tractations importantes et factures. Aucun Néolybien ne se sépare jamais de son livre de comptes.<br><br>Si le livre de comptes d\'un Néolybien est volé par un concurrent, le nouveau propriétaire bénéficie pendant une année entière de +4D pour toute affaire commerciale menée contre la victime du vol.' },
  { id: 'masque-fleau', name: 'Masque de Fléau', category: 'talismansEmblemes', cult: 'scourgers', image: IMG + 'equipment/scourger_mask.svg', properties: 'Attaque Mentale : PSY+Foi/Volonté : +2D', techLevel: 'I', value: 140, resources: 1, description: '<b>Masque de Fléau</b><br>Symbole des rapports étroits que les Fléaux entretiennent avec leurs ancêtres, le masque sert aussi de moyen d\'intimidation. Chaque Fléau façonne le sien à partir d\'un morceau de bois de son pays et le peint comme son père le lui a enseigné.<br><br>La perte de ce second visage terrifiant en pays étranger est considérée comme un signe funeste.' },
  { id: 'masque-anubis', name: 'Masque d\'Anubis', category: 'talismansEmblemes', cult: 'anubians', image: IMG + 'equipment/anubis_mask.svg', properties: '+1D aux interactions sociales avec des Afrikains', techLevel: 'I', value: 200, description: '<b>Masque d\'Anubis</b><br>Lorsqu\'un Anubien porte ce masque, le corps peint en noir avec de la résine d\'arbre, il devient Anubis de manière symbolique. Il est désormais intouchable, et les légendes prétendent qu\'il possède la puissance d\'un dieu. Ce masque est utilisé lors de tout rituel important.' },
  { id: 'outils-jugement', name: 'Outils de Jugement', category: 'talismansEmblemes', cult: 'judges', image: IMG + 'equipment/judgement_tools.svg', properties: 'Permet de marquer les hors-la-loi', techLevel: 'II', value: 40, resources: 1, description: '<b>Outils de Jugement</b><br>Rares sont les crimes que les Juges punissent de mort ou d\'emprisonnement. Au lieu de cela, les coupables sont marqués de couleurs particulières. Ces outils sont contenus dans la sacoche en cuir du Juge : marquants de couleur, un fer à marquer, un briquet et des charbons utilisés sur les récidivistes, les violeurs et les assassins.' },
  { id: 'peintures-corporelles', name: 'Peintures Corporelles', category: 'talismansEmblemes', cult: 'clanners', image: IMG + 'equipment/body_paint.svg', properties: 'Peintures de guerre : PSY+Foi/Volonté : +2D', techLevel: 'I', value: 30, resources: 1, description: '<b>Peintures Corporelles</b><br>L\'application de peintures corporelles est une tradition que partagent de nombreuses tribus. Qu\'il s\'agisse des Massaïs ou des nomades de Pollen, chacune possède ses propres motifs traditionnels.<br><br>Une peinture de camouflage donne +2D aux tests d\'AGI+Furtivité ; les peintures de guerre traditionnelles renforcent PSY+Foi/Volonté de 2D.' },
  { id: 'pierre-ame', name: 'Pierre d\'Âme', category: 'talismansEmblemes', cult: 'anubians', image: IMG + 'equipment/soul_stones.svg', properties: 'La cible est un fidèle : +1D aux interactions sociales', techLevel: 'I', value: 800, description: '<b>Pierres d\'Âme</b><br>L\'astéroïde Dhoruba fit pleuvoir du ciel de la roche en fusion qui refroidit dans sa descente et toucha le sol sous forme de perles de verre noir. Les Anabiens s\'en servent pour alimenter les superstitions et prétendent entrer en contact avec les ancêtres par leur entremise.<br><br>Ces pierres doivent être visibles pour que leur effet se produise.' },
  { id: 'pierre-sigillaire', name: 'Pierre Sigillaire', category: 'talismansEmblemes', cult: 'jehammedans', image: IMG + 'equipment/seal_stone.svg', properties: 'Autorité +1', techLevel: 'I', value: 300, resources: 2, description: '<b>Pierre Sigillaire</b><br>Ces petits disques en argile cuite estampillés du nom de « Jehammet » se trouvent un peu partout. La légende prétend que le prophète en personne aurait gravé son nom dessus. Bien qu\'il s\'agisse sûrement de contrefaçons, ces pierres permettent à ceux qui en ressentent le besoin de se rapprocher un peu plus du divin.' },
  { id: 'soleil-sinistre', name: 'Soleil Sinistre', category: 'talismansEmblemes', cult: 'palers', image: IMG + 'equipment/grim_sun.svg', properties: 'Défense mentale : PSY+Foi/Volonté : +1D', techLevel: 'II', value: 190, resources: 1, description: '<b>Soleil Sinistre</b><br>Les Blafards ne sont pas tous jugés dignes de posséder un disque solaire. Par conséquent, les moins chanceux travaillent sous la froide lueur de leurs moniteurs à la création de talismans embossés de plaques de métal circulaires ornées d\'un soleil sinistre. Ces copies ne possèdent aucune fonction disque solaire, mais inspirent tout de même leur porteur.' },
  { id: 'tarot-apocalyptique', name: 'Tarot Apocalyptique', category: 'talismansEmblemes', cult: 'apocalyptics', image: IMG + 'equipment/apocalyptic_tarot.svg', properties: 'Entre les mains d\'une Corneille : CHA+Commandement : +1D', techLevel: 'II', value: 560, description: '<b>Tarot Apocalyptique</b><br>Les cartes déterminent la route que doivent prendre les migrateurs. Elles mélangent fortune, destinée et la volonté de la Corneille. Chaque paquet est superbement conçu sur le plan artistique. Les symboles archétypaux n\'ont pas changé depuis plusieurs siècles et se superposent aux évènements mondiaux, aux Clans et aux Cultes.' },
  { id: 'tatouages-clans', name: 'Tatouages de Clans', category: 'talismansEmblemes', cult: 'clanners', image: IMG + 'equipment/clan_tattoos.svg', properties: 'PSY+Foi/Volonté : +1D', techLevel: 'I', value: 150, resources: 1 },
  { id: 'etoile-jehammet', name: 'Étoile de Jehammet', category: 'talismansEmblemes', cult: 'jehammedans', image: IMG + 'equipment/jehammeds_star.svg', properties: 'Saraeli : Renommée +2', techLevel: 'I', value: 90, description: '<b>Étoile de Jehammet</b><br>Lorsqu\'une Saraeli donne naissance à un Isaaki, l\'Abrami de la tribu, les yeux baignés de larmes, donne à cette femme l\'étoile de Jehammet. Cette étoile en feuille d\'or accrochée à un fil tressé confirme qu\'elle a répondu aux attentes de Jehammet.' },

  // ─── COMMUNICATION ───
  { id: 'liaison-montante-portative', name: 'Liaison Montante Portative', category: 'communication', cult: 'chroniclers', image: IMG + 'equipment/portable_uplink.svg', properties: 'Installer l\'antenne puis établir la liaison montante : INT+Légendes : +2D, INT+Technologie : +1D, Appel de détresse (1 Renommée)', encumbrance: 3, techLevel: 'IV', value: 3500, resources: 6, description: '<b>Liaison Montante Portative</b><br>Un émetteur portable qui permet aux Chroniqueurs de se connecter aux Serveurs depuis n\'importe quel endroit en Europe. Déployer l\'antenne télescopique prend plusieurs minutes, mais une fois la liaison établie, l\'accès au Flux est total.<br><br>Peut être utilisé pour envoyer un appel de détresse au coût d\'1 point de Renommée.' },
  { id: 'radio', name: 'Radio', category: 'communication', image: IMG + 'equipment/radio.svg', properties: 'Communication radio, portée 5 km', encumbrance: 1, techLevel: 'IV', value: 1500 },
  { id: 'sac-radio', name: 'Sac Radio', category: 'communication', cult: 'hellvetics', image: IMG + 'equipment/radio_backpack.svg', properties: 'Communication radio, portée 200 km', encumbrance: 3, techLevel: 'IV', value: 6000, resources: 3, description: '<b>Sac Radio</b><br>Un émetteur-récepteur radio haute puissance porté en sac à dos, standard dans les convois Hellvétiques. Chiffré sur les fréquences militaires de la Forteresse Alpine, il permet de coordonner les unités dispersées sur le champ de bataille ou d\'appeler des renforts sur une portée allant jusqu\'à 200 km.' },

  // ─── MASQUES À GAZ ───
  { id: 'charbon-actif', name: 'Charbon Actif', category: 'masquesAGaz', image: IMG + 'equipment/charcoal_absorber.svg', properties: 'Niveau 2 : +2S', techLevel: 'III', value: 200 },
  { id: 'tissu-respirant', name: 'Tissu Respirant', category: 'masquesAGaz', image: IMG + 'equipment/breathing_cloth.svg', properties: 'Niveau 1 : +1S lors de contamination de spores, germes, et toxines environnementales', techLevel: 'I', value: 5 },
  { id: 'respirateur', name: 'Respirateur', category: 'masquesAGaz', image: IMG + 'equipment/breathing_apparatus.svg', properties: 'Niveau 3 : +3S, contient assez d\'oxygène pour 1 heure, puis tombe au niveau 2', encumbrance: 2, techLevel: 'IV', value: 600 },

  // ─── ARTILLERIE ───
  { id: 'canon', name: 'Canon', category: 'artillerie', image: IMG + 'heavy_weapons/steam_cannon.png', caliber: 'Obus', handling: '–', range: '100/400', damage: '18', magazine: '4', properties: 'Coup de tonnerre, Empl. utilisés 4, Empl. 2', techLevel: 'IV', value: 22000 },
  { id: 'catapulte', name: 'Catapulte', category: 'artillerie', image: IMG + 'heavy_weapons/cartridge_launcher.png', caliber: 'Pierres', handling: '-2D', range: '50/200', damage: '14', magazine: '1', properties: 'Empl. utilisés 4, Empl. 2', techLevel: 'II', value: 3000 },
  { id: 'lance-flammes', name: 'Lance-Flammes', category: 'artillerie', image: IMG + 'heavy_weapons/spitfire.png', caliber: 'Pétro', handling: '+2D', range: '10/30', damage: '12', magazine: '20', properties: 'Incendiaire, Empl. utilisés 2, Empl. 1', techLevel: 'III', value: 6000 },
  { id: 'lance-harpons', name: 'Lance-Harpons', category: 'artillerie', image: IMG + 'heavy_weapons/rocket_launcher.png', caliber: 'Harpon', handling: '–', range: '20/60', damage: '10', magazine: '1', properties: 'Empl. utilisés 2, Empl. 1', techLevel: 'III', value: 2200 },
  { id: 'mitrailleuse', name: 'Mitrailleuse', category: 'artillerie', image: IMG + 'heavy_weapons/heavy_mg.png', caliber: '5.56×45mm', handling: '-2D', range: '50/200', damage: '11', magazine: 'Bande', properties: 'Rafale (10), Enrayement, Empl. utilisés 1, Empl. 2', techLevel: 'IV', value: 8000 },

  // ─── VÉHICULES / MONTURES ───
  { id: 'autobastion', name: 'Autobastion', category: 'vehiculesMontures', cult: 'neolibyans', image: IMG + 'equipment/tank.svg', properties: 'Vit. 2, Acc. 1, Frein. 1, Armure 6, Carrosserie 200, Structure 100, Empl. 6', techLevel: 'IV', value: 1500000, resources: 6, description: '<b>Autobastion</b><br>L\'Autobastion est un véhicule blindé lourd néo-libyen, un monument d\'acier récupéré soudé en forteresse roulante. Lent mais quasiment imprenable, il sert de base mobile lors des grandes opérations militaires dans le désert.<br><br>Son armure épaisse et sa Carrosserie de 200 en font l\'une des plateformes de combat les plus résistantes d\'Europe, bien que sa vitesse de croisière soit désespérément lente.' },
  { id: 'buggy-ferrailleur', name: 'Buggy de Ferrailleur', category: 'vehiculesMontures', image: IMG + 'equipment/carrying_rig.svg', properties: 'Vit. 3, Acc. 2, Frein. 1, Armure 4, Carrosserie 20, Structure 10, Empl. 2', techLevel: 'III', value: 1500 },
  { id: 'charrette-autoportee', name: 'Charrette Autoportée', category: 'vehiculesMontures', cult: 'scrappers', image: IMG + 'equipment/carrying_rig.svg', properties: 'Vit. 1, Acc. 1, Frein. 1, Armure –, Carrosserie 10, Structure 5, Empl. –', techLevel: 'III', value: 800, resources: 4 },
  { id: 'kom', name: 'Kom', category: 'vehiculesMontures', cult: 'scourgers', image: IMG + 'equipment/carrying_rig.svg', properties: 'Vit. 5, Acc. 3, Frein. 2, Armure 4, Carrosserie 20, Structure 10, Empl. 2', techLevel: 'IV', value: 4500, description: '<b>Kom</b><br>Le Kom est la monture mécanique des Flagellants — un tricycle blindé à moteur récupéré, idéal pour les raids rapides. Agile et relativement léger, il peut traverser des terrains accidentés que les véhicules lourds ne peuvent pas franchir.<br><br>Les Fouetteurs le personnalisent avec des pointes, du fil barbelé et des peintures tribales pour intimider leurs ennemis.' },
  { id: 'moto', name: 'Moto', category: 'vehiculesMontures', image: IMG + 'equipment/carrying_rig.svg', properties: 'Vit. 6, Acc. 3, Frein. 1, Armure –, Carrosserie 10, Structure 5, Empl. 1', techLevel: 'III', value: 2000 },
  { id: 'moto-apocalyptique', name: 'Moto d\'Apocalyptique', category: 'vehiculesMontures', cult: 'apocalyptics', image: IMG + 'equipment/carrying_rig.svg', properties: 'Vit. 6, Acc. 3, Frein. 2, Armure 2, Carrosserie 15, Structure 7, Empl. 2', techLevel: 'IV', value: 4200, resources: 5 },
  { id: 'traineau-automobile', name: 'Traîneau Automobile', category: 'vehiculesMontures', image: IMG + 'equipment/sleigh.svg', properties: 'Vit. 2, Acc. 1, Frein. 1, Armure 4, Carrosserie 15, Structure 7, Empl. 1', techLevel: 'III', value: 1200 },
  { id: 'bateau', name: 'Bateau', category: 'vehiculesMontures', image: IMG + 'equipment/carrying_rig.svg', properties: 'Vit. 1, Acc. 1, Frein. 1 round, Armure –, Carrosserie 10, Structure 5, Empl. 1', techLevel: 'II', value: 500 },
  { id: 'bateau-hors-bord', name: 'Bateau Hors-Bord', category: 'vehiculesMontures', cult: 'scourgers', image: IMG + 'equipment/carrying_rig.svg', properties: 'Vit. 5, Acc. 3, Frein. 2 rounds, Armure 4, Carrosserie 50, Structure 25, Empl. 3', techLevel: 'IV', value: 55000, resources: 5 },
  { id: 'catamaran', name: 'Catamaran', category: 'vehiculesMontures', cult: 'apocalyptics', image: IMG + 'equipment/carrying_rig.svg', properties: 'Vit. 4, Acc. 2, Frein. 5 rounds, Armure 3, Carrosserie 40, Structure 20, Empl. 4', techLevel: 'IV', value: 40000, resources: 4 },
  { id: 'catamaran-arme', name: 'Catamaran Armé', category: 'vehiculesMontures', cult: 'apocalyptics', image: IMG + 'equipment/carrying_rig.svg', properties: 'Vit. 3, Acc. 2 rounds, Frein. 8 rounds, Armure 5, Carrosserie 100, Structure 50, Empl. 14', techLevel: 'IV', value: 120000, resources: 6 },
  { id: 'dhow', name: 'Dhow', category: 'vehiculesMontures', image: IMG + 'equipment/carrying_rig.svg', properties: 'Vit. 2, Acc. 1, Frein. 3 rounds, Armure 2, Carrosserie 20, Structure 10, Empl. 2', techLevel: 'II', value: 6000 },
  { id: 'navire-marchand', name: 'Navire Marchand', category: 'vehiculesMontures', cult: 'neolibyans', image: IMG + 'equipment/carrying_rig.svg', properties: 'Vit. 2, Acc. 2 rounds, Frein. 10 rounds, Armure 2, Carrosserie 50, Structure 25, Empl. 4', techLevel: 'III', value: 35000, resources: 3 },
  { id: 'petrolier', name: 'Pétrolier', category: 'vehiculesMontures', cult: 'neolibyans', image: IMG + 'equipment/tank.svg', properties: 'Vit. 2, Acc. 5 rounds, Frein. 20 rounds, Armure 5, Carrosserie 200, Structure 100, Empl. 8', techLevel: 'IV', value: 800000, resources: 6 },
  { id: 'cheval-allure', name: 'Cheval d\'Allure', category: 'vehiculesMontures', image: IMG + 'equipment/allure.svg', properties: 'Vit. 1, Acc. 1, Frein. 1, Armure –, Blessures 12, Trauma 6, Empl. –', techLevel: 'I', value: 400 },
  { id: 'cheval-charge', name: 'Cheval de Charge', category: 'vehiculesMontures', image: IMG + 'equipment/allure.svg', properties: 'Vit. 2, Acc. 1, Frein. 1, Armure 1, Blessures 18, Trauma 9, Empl. 1', techLevel: 'I', value: 2500 },
  { id: 'cheval-jugement', name: 'Cheval de Jugement', category: 'vehiculesMontures', cult: 'judges', image: IMG + 'equipment/allure.svg', properties: 'Vit. 3, Acc. 2, Frein. 1, Armure –, Blessures 16, Trauma 8, Empl. 2', techLevel: 'I', value: 5500, resources: 3, description: '<b>Cheval de Jugement</b><br>Les Juges élèvent et entraînent leurs chevaux depuis le poulain, forgeant un lien indéfectible entre cavalier et monture. Ces chevaux sont sélectionnés pour leur endurance et leur courage au combat.<br><br>Un Cheval de Jugement est plus qu\'un moyen de transport — c\'est un compagnon et un symbole du pouvoir des Juges sur les routes d\'Europe.' },
  { id: 'cheval-newcrest', name: 'Cheval de Newcrest', category: 'vehiculesMontures', cult: 'spitalians', image: IMG + 'equipment/allure.svg', properties: 'Vit. 3, Acc. 2, Frein. 2, Armure –, Blessures 18, Trauma 9, Empl. 3', techLevel: 'I', value: 8000, resources: 5 },
  { id: 'mammouth', name: 'Mammouth', category: 'vehiculesMontures', cult: 'scrappers', image: IMG + 'equipment/carrying_rig.svg', properties: 'Vit. 2, Acc. 1, Frein. 1, Armure 3, Blessures 36, Trauma 18, Empl. 2', techLevel: 'I', value: 15000, resources: 6 },

  // ─── ÉQUIPEMENT MÉDICAL ───
  { id: 'apothecarium', name: 'Apothécarium', category: 'equipementMedical', cult: 'spitalians', image: IMG + 'equipment/bandage.svg', properties: 'Analyse de substances et production de médicaments : INT+Science : +1S × niveau, 10 doses', encumbrance: 1, techLevel: 'IV', value: 2500, resources: 4, levelable: true, description: '<b>Apothécarium</b><br>Brûleurs à gaz, pilons, éprouvettes et un large panel de produits chimiques contenus dans des verres et des petits sachets, le tout rangé dans une valise. Un apothécarium fournit au Pharmacien un laboratoire portable avec lequel il peut créer poisons ou médicaments, mais aussi analyser diverses maladies.<br><br>Il existe 3 niveaux d\'apothécariums. Un apothécarium peut produire 10 médicaments avant de devoir être réapprovisionné dans une base spitalière.' },
  { id: 'bandages', name: 'Bandages', category: 'equipementMedical', image: IMG + 'equipment/bandage.svg', properties: 'Juste après avoir subi la blessure : récupération de 1 Blessure Superficielle', techLevel: 'I', value: 10 },
  { id: 'creuset', name: 'Creuset', category: 'equipementMedical', cult: 'anubians', image: IMG + 'equipment/crucible.svg', properties: 'Production de médicaments ou de poisons : INT+Science : +1D', techLevel: 'I', value: 150, resources: 2, description: '<b>Creuset</b><br>Dans ces réceptacles en pierre noire, les guérisseurs anubiens broient différentes terres et plantes, les mélangent et lient le tout à de la graisse pour fabriquer des baumes et des potions. Les rumeurs prétendent que ces creusets sont fabriqués en pierre de météorite.<br><br>Le matériau avec lequel les creusets sont fabriqués est antibactérien et antimycosique.' },
  { id: 'outils-chirurgicaux', name: 'Outils Chirurgicaux', category: 'equipementMedical', cult: 'spitalians', image: IMG + 'equipment/surgical_tools.svg', properties: 'Traitement des Traumatismes : INT+Médecine : +1D × niveau', encumbrance: 1, techLevel: 'III', value: 1000, resources: 3, levelable: true, description: '<b>Outils Chirurgicaux</b><br>Scalpels, agrafes et scies constituent les outils d\'un Chirurgien. Alors que le Spital procure aux Chirurgiens tout le nécessaire pour une opération, cela fait cinq siècles que certains instruments furent sortis de leur emballage stérile. Tout docteur digne de ce nom possède ses propres instruments, conçus à partir des meilleurs matériaux.<br><br>Il existe 3 niveaux d\'outils chirurgicaux.' },
  { id: 'sequenceur', name: 'Séquenceur', category: 'equipementMedical', cult: 'spitalians', image: IMG + 'equipment/sequencer.svg', properties: 'Médicament/poison personnalisé : +2 Puissance sur une cible précise', techLevel: 'V', value: 4500, resources: 5, description: '<b>Séquenceur</b><br>Les Épigénéticiens portent un intérêt tout particulier aux composants mêmes de la vie. Ils analysent leurs trouvailles dans un séquenceur qui, au bout de quelques minutes, recrache un code en 20 caractères alphanumériques permettant de déterminer les origines de la personne, ses maladies congénitales et ses faiblesses.<br><br>Lorsqu\'un Épigénéticien analyse un échantillon, il peut personnaliser un médicament ou un poison en fonction de l\'individu. Pour ce dernier, la Puissance du remède augmente de +2.' },
  { id: 'trousse-terrain', name: 'Trousse de Terrain', category: 'equipementMedical', cult: 'spitalians', image: IMG + 'equipment/field_kit.svg', properties: 'INT+Médecine : +2D, 5 doses', encumbrance: 1, techLevel: 'III', value: 250, resources: 2, description: '<b>Trousse de Terrain</b><br>Au minimum, un docteur dans chaque escouade spitalière de taille normale transporte sur lui une trousse de terrain. Cette trousse de secours comprend du matériel pour les premiers soins, des instruments chirurgicaux et d\'analyse, des fongicides, des pesticides ainsi que des médicaments.<br><br>La trousse de terrain est utilisable 5 fois avant de devoir la remplir à nouveau dans une base spitalière.' },

  // ─── PHARMACOPÉE ───
  { id: 'antibiotique', name: 'Antibiotique', category: 'pharmacopee', cult: 'spitalians', image: IMG + 'equipment/antibiotics.svg', properties: '+2S × niveau au jet de résistance contre les infections bactériennes', techLevel: 'III', value: 100, resources: 3, levelable: true },
  { id: 'antidote', name: 'Antidote', category: 'pharmacopee', cult: 'spitalians', image: IMG + 'equipment/antidote.svg', properties: '+2S × niveau au jet de résistance contre l\'empoisonnement', techLevel: 'III', value: 100, resources: 3, levelable: true },
  { id: 'antidouleur', name: 'Antidouleur', category: 'pharmacopee', cult: 'spitalians', image: IMG + 'equipment/pain_killers.svg', properties: 'Annule les malus de 2 × niveau points de Traumatisme', techLevel: 'III', value: 200, resources: 4, levelable: true },
  { id: 'distillat', name: 'Distillat, 1L', category: 'pharmacopee', image: IMG + 'equipment/distillate.svg', properties: 'Désinfection, interne et externe', techLevel: 'I', value: 20 },
  { id: 'ex', name: 'EX', category: 'pharmacopee', cult: 'spitalians', image: IMG + 'equipment/ex.svg', properties: 'Réduit la sporulation de 1D', techLevel: 'IV', value: 200, resources: 2 },
  { id: 'fruit-douat', name: 'Fruit de Douât', category: 'pharmacopee', cult: 'anubians', image: IMG + 'equipment/duat_fruit.svg', properties: 'Niveau 1-6 : les Anubiens peuvent catalyser un fruit de niveau maximum égal à leur rang', techLevel: 'I', value: 200, resources: 1, levelable: true, description: '<b>Fruit de Douât</b><br>Récoltés au plus profond des Psychovores, ces fruits portent en eux la Vorace. Ils n\'éclatent pas en jus sucré, mais en fragments qui pénètrent la peau et nécrosent les tissus.<br><br>Les Anubiens, partiellement immunisés, peuvent mâcher le fruit pour initier une catalyse extrêmement dangereuse. Un Anubien peut catalyser un fruit sans danger tant que son niveau ne dépasse pas son rang.' },
  { id: 'herbes-medicinales', name: 'Herbes Médicinales', category: 'pharmacopee', image: IMG + 'equipment/healing_herbs.svg', properties: 'Lors d\'une intervention médicale : INT+Médecine : +1D, 1 dose', techLevel: 'I', value: 30 },
  { id: 'huile-mardouk', name: 'Huile de Mardouk', category: 'pharmacopee', cult: 'anubians', image: IMG + 'equipment/marduk_oil.svg', properties: 'Résistance aux influences phéromanciennes : +4S pendant 1 heure', techLevel: 'I', value: 400 },
  { id: 'narcotique', name: 'Narcotique', category: 'pharmacopee', cult: 'spitalians', image: IMG + 'equipment/narcotics.svg', properties: 'Préparation chirurgicale : le Chirurgien obtient INT+Médecine : +1D × niveau', techLevel: 'III', value: 300, resources: 4, levelable: true },
  { id: 'sang-douat', name: 'Sang de Douât', category: 'pharmacopee', cult: 'anubians', image: IMG + 'equipment/duat_blood.svg', properties: 'Panacée : jet de résistance : +1S × niveau', techLevel: 'I', value: 300, resources: 1, levelable: true, description: '<b>Sang de Douât</b><br>Lorsqu\'un Anubien survit à la catalyse d\'un fruit de Douât, la source de toute vie coule dans ses veines. Son sang est prélevé, mélangé à différentes terres, puis offert comme panacée aux Afrikains qui s\'en montrent dignes.<br><br>Pris comme remède, il purifie le corps de tout germe, mais aussi de la Vorace. Le sang de Douât est considéré comme un antidote universel dont la Puissance est égale à son niveau.' },
  { id: 'sang-aries', name: 'Sang d\'Ariès', category: 'pharmacopee', cult: 'jehammedans', image: IMG + 'equipment/blood_of_aries.svg', properties: 'Régénération de 1 point de Blessure par heure, 1 dose par jour, Addictif', techLevel: 'VI', value: 3000, resources: 6, description: '<b>Sang d\'Ariès</b><br>Ceux qui boivent de ce sang servi dans des crânes de bélier ne font plus qu\'un avec Ariès, et ressentent sa vitalité parcourir leur corps.<br><br>Pour chaque jour que le Jehammétan passe sans cette concoction, son maximum de points d\'Égo diminue de 1. Lorsqu\'il atteint 0, son corps dépasse le stade de la dépendance et perd sa capacité de régénération. Une simple gorgée de sang d\'Ariès ravive l\'Arianoï et restaure son maximum.' },
  { id: 'stimulant', name: 'Stimulant', category: 'pharmacopee', cult: 'spitalians', image: IMG + 'equipment/stimulants.svg', properties: 'PSY+Réactivité : +1D × niveau pendant plusieurs heures', techLevel: 'III', value: 200, resources: 4, levelable: true },

  // ─── HUILES ÉLYSÉENNES ───
  { id: 'huile-perat', name: 'Perat', category: 'huilesElyseennes', cult: 'anabaptists', image: IMG + 'equipment/perat.svg', properties: '4 heures : PSY+Foi/Volonté et INS+Perception : +1D × niveau', techLevel: 'II', value: 50, resources: 1, levelable: true, description: '<b>Perat</b><br>La Perat est l\'huile élyséenne la plus répandue. Les Orgiastiques et les Ascètes s\'en oignent et elle les accompagne lors de leurs toutes premières années. Elle inspire les esprits et aiguise les sens.' },
  { id: 'huile-hiddekel', name: 'Hiddekel', category: 'huilesElyseennes', cult: 'anabaptists', image: IMG + 'equipment/hiddekel.svg', properties: '4 heures : INS+Pulsions et PSY+Réactivité : +1D × niveau', techLevel: 'II', value: 100, resources: 2, levelable: true, description: '<b>Hiddekel</b><br>Les Fureurs considèrent la Hiddékel comme une bénédiction divine. Massée sur le cuir chevelu, elle attise leur agressivité, enflamme leur résolution et les élève au rang d\'avatars dans leur guerre contre le Démiurge.' },
  { id: 'huile-gehon', name: 'Géhon', category: 'huilesElyseennes', cult: 'anabaptists', image: IMG + 'equipment/gehon.svg', properties: '4 heures : INT+Concentration : +1D × niveau, malus de Traumatisme : -1D × niveau', techLevel: 'II', value: 100, resources: 2, levelable: true, description: '<b>Géhon</b><br>La douleur et la fatigue disparaissent, consumées par le feu brûlant de la Géhon. Puis, plus profondément, un océan de contemplation et de focalisation s\'ouvre.' },
  { id: 'huile-pischon', name: 'Pischon', category: 'huilesElyseennes', cult: 'anabaptists', image: IMG + 'equipment/pischon.svg', properties: '4 heures : CHA+Expression et PSY+Foi : +1D × niveau', techLevel: 'II', value: 1000, resources: 4, levelable: true, description: '<b>Pischon</b><br>Les Anabaptistes considèrent les arbres poussant sur les rives de la rivière Pischon comme les plus sacrés de tous. Les ingrédients qui composent la Pischon sont rares et précieux, et le mélange lui-même n\'est connu que des Élyséens les plus vénérables. La Pischon est une véritable manne pour les Baptistes et les Conseillers.' },
  { id: 'huile-styx', name: 'Styx', category: 'huilesElyseennes', cult: 'anabaptists', image: IMG + 'equipment/styx.svg', properties: '30 min : par round de combat : -1 point de dégât par niveau, ensuite : 1 Traumatisme par niveau', techLevel: 'II', value: 200, resources: 5, description: '<b>Styx</b><br>Toute blessure infligée ne saignera qu\'un bref instant avant de se changer en ouverture de couleur pâle. Quiconque se retrouve oint des eaux du Styx ne ressent aucune douleur et se considère comme invincible.<br><br>Malgré sa puissance, le Styx ronge l\'Anabaptiste de l\'intérieur. Lorsque les effets s\'estompent, il subit un nombre de points de Traumatisme équivalent au niveau de l\'huile.' },
  { id: 'huile-acheron', name: 'Achéron', category: 'huilesElyseennes', cult: 'anabaptists', image: IMG + 'equipment/acheron.svg', properties: 'Vision éthérique : niveau 1 = 10 m, niveau 2 = 100 m, niveau 3 = 300 m, ensuite : sporulation', techLevel: 'II', value: 200, resources: 5, description: '<b>Achéron</b><br>Le Styx détruit le corps, et l\'Achéron l\'âme. Massée sur le cuir chevelu, cette huile ouvre un champ de perception bien plus large que celui du commun des mortels et donne un aperçu du monde éthéré du Démiurge. Aucun champ de spores, Psychonaute ou Léperos ne peut se soustraire à cette vision — mais ils contemplent tous l\'Anabaptiste en retour.<br><br>Suite à l\'effet, l\'Anabaptiste subit une sporulation équivalente au niveau de l\'huile.' },

  // ─── ACHAT D'ARTÉFACTS ───
  { id: 'artefact-tech-i', name: 'Tech I', category: 'achatArtefacts', image: IMG + 'equipment/toolkit.svg', properties: 'Disponible partout (matières premières uniquement), Vente : –', techLevel: 'I', value: 1 },
  { id: 'artefact-tech-ii', name: 'Tech II', category: 'achatArtefacts', image: IMG + 'equipment/toolkit.svg', properties: 'Uniquement disponible dans un Clan / Ne peut être vendu qu\'à un Clan, Vente : 5', techLevel: 'II', value: 15 },
  { id: 'artefact-tech-iii', name: 'Tech III', category: 'achatArtefacts', image: IMG + 'equipment/toolkit.svg', properties: 'Disponible aussi dans les halls des Ferrailleurs, Vente : 25', techLevel: 'III', value: 80 },
  { id: 'artefact-tech-iv', name: 'Tech IV', category: 'achatArtefacts', image: IMG + 'equipment/electronics_tools.svg', properties: 'Halls des Ferrailleurs / manufactures, Vente : 80', techLevel: 'IV', value: 200 },
  { id: 'artefact-tech-v', name: 'Tech V', category: 'achatArtefacts', image: IMG + 'equipment/electronics_tools.svg', properties: 'Non vendu par les Chroniqueurs, Vente : 200', techLevel: 'V', value: 600 },
  { id: 'artefact-tech-vi', name: 'Tech VI', category: 'achatArtefacts', image: IMG + 'equipment/electronics_tools.svg', properties: 'Non vendu par les Chroniqueurs, Vente : 600', techLevel: 'VI', value: 2000 },

  // ─── ARMES DE LUTTE (nouvelles) ───
  { id: 'gants-rasoirs', name: 'Gants Rasoirs', category: 'armesDeLutte', image: IMG + 'brawl/razor_gloves.png', handling: '+1D', damage: '2+F/3', properties: 'Étourdissement (F/4), Effroyable (1), Régularité (3DC)', slots: 1, techLevel: 'I', value: 50 },
  { id: 'garrot-lutte', name: 'Garrot', category: 'armesDeLutte', image: IMG + 'brawl/garotte.png', handling: '-4D', damage: 'F/3', properties: 'Étourdissement (F/3), Spécial', techLevel: 'I', value: 10 },
  { id: 'scindo', name: 'Scindo', category: 'armesDeLutte', image: IMG + 'brawl/scindo.png', handling: '+1D', damage: '3+F/2', properties: 'Régularité (3DC), Spécial', encumbrance: 1, techLevel: 'II', value: 250, resources: 3 },

  // ─── MUNITIONS (nouvelles) ───
  { id: 'mini-grenaille', name: '.410 – « Mini » Grenaille', category: 'munitions', image: IMG + 'ammo/410_tiny_shot.png', damage: '7', techLevel: 'III', value: 7 },
  { id: 'mini-chevrotine', name: '.410 – « Mini » Chevrotine', category: 'munitions', image: IMG + 'ammo/410_tiny_slug.png', damage: '7', techLevel: 'III', value: 7 },
  { id: '762-poing', name: '7.62 – « Poing »', category: 'munitions', image: IMG + 'ammo/7_62_fist.png', damage: '13', techLevel: 'IV', value: 70 },
  { id: '14mm-danger', name: '14 mm – « Danger »', category: 'munitions', image: IMG + 'ammo/14mm_danger.png', damage: '15', techLevel: 'IV', value: 200 },
  { id: 'balle-fragmentation', name: 'Balle à Fragmentation', category: 'munitions', image: IMG + 'ammo/fragger_round.png', damage: '14', techLevel: 'V', value: 500 },
  { id: 'cartouche-freon', name: 'Cartouche au Fréon', category: 'munitions', image: IMG + 'ammo/freon_cartridge.png', damage: '5', techLevel: 'V', value: 75, resources: 2 },

  // ─── VÉHICULES (nouveaux) ───
  { id: 'camion-citerne', name: 'Camion-Citerne', category: 'vehiculesMontures', cult: 'neolibyans', image: IMG + 'equipment/tank.svg', properties: 'Vit. Max 3, Acc. 2, Frein. 1, Carrosserie 40, Structure 20, Empl. 3, Réservoir 20 000L', techLevel: 'III', value: 45000, resources: 5 },

  // ─── ÉQUIPEMENT MÉDICAL (nouveaux) ───
  { id: 'centrifugeuse-plasma', name: 'Centrifugeuse à Plasma', category: 'equipementMedical', image: IMG + 'equipment/plasma_centrifuge.svg', properties: 'Crée du plasma pour transfusion. 12 utilisations par E-Cube', encumbrance: 5, techLevel: 'IV', value: 3500 },
  { id: 'fluides-intraveineux', name: 'Fluides Intraveineux', category: 'equipementMedical', image: IMG + 'equipment/intraveinous_fluids.svg', properties: 'Améliore les effets des transfusions', encumbrance: 1, techLevel: 'IV', value: 200 },
  { id: 'garrot-medical', name: 'Garrot', category: 'equipementMedical', image: IMG + 'equipment/tourniquet.svg', properties: 'Stoppe les hémorragies', techLevel: 'II', value: 25 },
  { id: 'eclisse', name: 'Éclisse', category: 'equipementMedical', image: IMG + 'equipment/splint.svg', properties: '(+2D) pour résister à la Complication Réouverture', encumbrance: 1, techLevel: 'I', value: 50 },
  { id: 'prothese-simple', name: 'Prothèse Simple', category: 'equipementMedical', image: IMG + 'equipment/simple_prosthetic.svg', properties: 'Le fonctionnement du membre subit un malus de (-1D) (-2D pour les manipulations fines)', encumbrance: 2, techLevel: 'II', value: 250 },
  { id: 'prothese-avancee', name: 'Prothèse Avancée', category: 'equipementMedical', image: IMG + 'equipment/advanced_prosthetic.svg', properties: 'Après acclimatation, le membre fonctionne normalement', encumbrance: 2, techLevel: 'IV', value: 25000 },
  { id: 'equipement-soins-intensifs', name: 'Équipement de Soins Intensifs', category: 'equipementMedical', image: IMG + 'equipment/intensive_care_equipment.svg', properties: 'Fournit des bonus pour résister aux infections et restaurer les dégâts d\'attributs. 1 utilisation par E-Cube', encumbrance: 8, techLevel: 'IV', value: 40000 },
  { id: 'don-getrell', name: 'Don de Getrell', category: 'equipementMedical', cult: 'palers', image: IMG + 'equipment/getrells_gift.svg', properties: 'Un jet réussi d\'INT+Médecine soigne (3) Blessures superficielles supplémentaires', encumbrance: 1, techLevel: 'IV', value: 6000, resources: 5 },
  { id: 'soif-ammout', name: 'Soif d\'Ammout', category: 'equipementMedical', cult: 'anubians', image: IMG + 'equipment/ammits_craving.svg', properties: 'Le Hogon dépasse les limitations humaines durant une journée', techLevel: 'I', value: 0, resources: 6 },

  // ─── PHARMACOPÉE (nouvelles) ───
  { id: 'alcool', name: 'Alcool', category: 'pharmacopee', image: IMG + 'equipment/alcohol.svg', properties: 'Niveau (1) à (4) ; Désinfecte les blessures ; Spécial', techLevel: 'I', value: 10 },
  { id: 'purge-rouge', name: 'Purge Rouge', category: 'pharmacopee', image: IMG + 'equipment/the_red_purge.svg', properties: 'Nettoie le corps de toutes sporulation temporaire, poison et parasites ; Inflige (12) Traumatismes, (-1) par dose de concoction de lilas bue au cours du rituel', techLevel: 'II', value: 0, resources: 3 },
  { id: 'stimulants-katharsys', name: 'Stimulants', category: 'pharmacopee', image: IMG + 'equipment/stimulants.svg', properties: 'Niveau (1) à (3) ; Durant (2 × Niveau) heures, PSY+Réaction (+1D × Niveau) ; Durant (4 × Niveau) heures, aucun malus ne peut excéder la limite naturelle ; Après l\'effet : Blessures superficielles = heures au-delà de la limite', techLevel: 'III', value: 200, resources: 3, levelable: true },
  { id: 'lycanol', name: 'Lycanol', category: 'pharmacopee', cult: 'palers', image: IMG + 'equipment/lycanol.svg', properties: '+2 Armure pendant (8) heures ; Face à une lumière vive, le Blafard est aveuglé : -4D pour les jets de Vision', techLevel: 'IV', value: 500, resources: 4 },
  { id: 'cataracte-drogue', name: 'Cataracte', category: 'pharmacopee', cult: 'apocalyptics', image: IMG + 'equipment/blood_timer.svg', properties: 'Limite de dépense d\'Égo augmentée à (6), perte de (1) Égo par round', techLevel: 'II', value: 150, resources: 2 },
  { id: 'steroides-anabolisants', name: 'Stéroïdes Anabolisants', category: 'pharmacopee', image: IMG + 'equipment/anabolic_steroids.svg', properties: '+4D à PHY+Force durant (6) heures ; Jet de PHY+Vigueur (4) à partir du 4ème round de combat. Échec : perte de (5) Égo, Échec critique : mort au bout de (4) rounds', techLevel: 'III', value: 0, resources: 5 },

  // ─── TYPES DE BRÛLURE ───
  { id: 'brulure-bion', name: 'Bion', category: 'brulures', image: IMG + 'equipment/burn.svg', properties: 'Chakra : Coccyx, Chakra terrestre : Pollen/Pandora. Résistance aux maladies, au poison, au froid : +Puissance succès', techLevel: 'I', value: 20 },
  { id: 'brulure-gloire', name: 'Gloire', category: 'brulures', image: IMG + 'equipment/burn.svg', properties: 'Chakra : Plexus solaire, Chakra terrestre : Purgare/Nox. Mental : +Puissance succès ; PHY : +Puissance/2', techLevel: 'I', value: 30 },
  { id: 'brulure-unite', name: 'Unité', category: 'brulures', image: IMG + 'equipment/burn.svg', properties: 'Chakra : Cœur, Chakra terrestre : Franka/Souffrance. CHA+Négociation : +Puissance ; CHA+Expression : +Puissance ; Aucun malus dû au stress ou à un danger mortel', techLevel: 'I', value: 10 },
  { id: 'brulure-muse', name: 'Muse', category: 'brulures', image: IMG + 'equipment/burn.svg', properties: 'Chakra : Gorge, Chakra terrestre : Balkhans/Usud. INS+Perception : +Puissance ; INS+Empathie : +Puissance ; peut transférer succès et déclencheurs (max. Puissance), -1 Égo', techLevel: 'I', value: 20 },
  { id: 'brulure-argus', name: 'Argus', category: 'brulures', image: IMG + 'equipment/burn.svg', properties: 'Chakra : Front, Chakra terrestre : Hybrispanie/Mirar. Initiative : +Puissance Dés ; Ne peut être pris par surprise', techLevel: 'I', value: 30 },
  { id: 'brulure-discordia', name: 'Discordia', category: 'brulures', image: IMG + 'equipment/burn.svg', properties: 'Chakra terrestre : Discordance. Lancer un dé : 1-5 : un attribut au hasard tombe à 1 point pendant 6h. 6 : un attribut passe à 6 points pendant 6h', techLevel: 'I', value: 60 },

  // ─── ÉQUIPEMENT DE SURVIE ───
  { id: 'tagalmast', name: 'Tagalmast', category: 'equipementSurvie', image: IMG + 'equipment/tagalmast.svg', properties: 'Annule (1D) d\'Inconfort dû à la chaleur', techLevel: 'II', value: 30 },
  { id: 'impermeable', name: 'Imperméable', category: 'equipementSurvie', image: IMG + 'equipment/raincoat.svg', properties: 'Annule (1D) de malus dû au vent et (1D) d\'Inconfort dû à la pluie ou à la neige', techLevel: 'III', value: 40 },
  { id: 'fourrure-hiver', name: 'Fourrure d\'Hiver', category: 'equipementSurvie', image: IMG + 'equipment/winter_furs.svg', properties: 'Annule (1D) d\'Inconfort dû au froid ou à un climat polaire ; Retire les malus d\'Égo dus au froid ou à un climat polaire. Cultes : Garganti, Britoni, Pictons', encumbrance: 1, techLevel: 'I', value: 60, resources: 1 },
  { id: 'lunettes-polarisees', name: 'Lunettes Polarisées', category: 'equipementSurvie', image: IMG + 'equipment/polarized_glasses.svg', properties: 'Annule (2D) de malus de Vision dus à la pluie, la neige ou le brouillard', techLevel: 'IV', value: 750 },
  { id: 'raquettes', name: 'Raquettes', category: 'equipementSurvie', image: IMG + 'equipment/snow_shoes.svg', properties: 'La neige n\'est plus un terrain difficile ; Enc. (0) tant qu\'elles sont portées sur la neige. Cultes : Garganti, Ferrailleurs', encumbrance: 1, techLevel: 'II', value: 100, resources: 2 },

  // ─── GESTION D'ÉNERGIE ───
  { id: 'e-cube', name: 'E-Cube', category: 'gestionEnergie', image: IMG + 'equipment/e-cube.svg', properties: 'Cellule énergétique universelle. Stockage : E-Cube (120 Qt)', techLevel: 'V', value: 1000 },
  { id: 'cellule-interne', name: 'Cellule Interne', category: 'gestionEnergie', image: IMG + 'equipment/internal_cell.svg', properties: 'Spécifique à certains objets, nécessite un connecteur spécial. Stockage : Cellule interne (Niveau Qt)', techLevel: 'V', value: 10, levelable: true },
  { id: 'bidon', name: 'Bidon', category: 'gestionEnergie', image: IMG + 'equipment/blue_barrel.svg', properties: 'Contenant à liquide (-2 Enc.). Stockage : Réservoir (20L)', encumbrance: 1, techLevel: 'I', value: 10 },
  { id: 'tonneau', name: 'Tonneau', category: 'gestionEnergie', image: IMG + 'equipment/blue_barrel.svg', properties: 'Contenant à liquide. Stockage : Réservoir (160L)', encumbrance: 32, techLevel: 'I', value: 50 },
  { id: 'reservoir', name: 'Réservoir', category: 'gestionEnergie', image: IMG + 'equipment/blue_barrel.svg', properties: 'Contenant à liquide générique. Stockage : Réservoir (Niveau L), Enc. Niveau/5', techLevel: 'II', value: 10, levelable: true },
  { id: 'reservoir-pressurise', name: 'Réservoir Pressurisé', category: 'gestionEnergie', image: IMG + 'equipment/pressure_tank.svg', properties: 'Stockage : Réservoir pressurisé (Niveau L), Enc. Niveau/5', techLevel: 'III', value: 20, levelable: true },
  { id: 'relais-kappa', name: 'Relais Kappa', category: 'gestionEnergie', cult: 'palers', image: IMG + 'equipment/kappa_relay.svg', properties: 'Recharge la technologie des Blafards et de RG. Stockage : Relais Kappa (6 000 Qt)', techLevel: 'V', value: 40000 },
  { id: 'panneau-solaire', name: 'Panneau Solaire', category: 'gestionEnergie', image: IMG + 'equipment/solar_panel.svg', properties: 'Génère (8/24/60) Qt par heure d\'ensoleillement. Empl. 2/1/1, Tech IV/V/VI', techLevel: 'IV', value: 1500, levelable: true },
  { id: 'moulin-eau', name: 'Moulin à Eau', category: 'gestionEnergie', image: IMG + 'equipment/watermill.svg', properties: 'Génère (30) Qt par. Empl. 2', techLevel: 'IV', value: 17000 },
  { id: 'moulin-vent', name: 'Moulin à Vent', category: 'gestionEnergie', image: IMG + 'equipment/windmill.svg', properties: 'Génère (30) Qt par heure venteuse. Les tempêtes endommagent le moulin. Empl. 2', techLevel: 'V', value: 9500 },
  { id: 'generateur-petro', name: 'Générateur à Pétro', category: 'gestionEnergie', image: IMG + 'equipment/petro_generator.svg', properties: '(1)L de pétro génère 20 Qt. Stockage : Réservoir (40L), Empl. 2', techLevel: 'V', value: 5300 },
  { id: 'generateur-charbon', name: 'Générateur à Charbon', category: 'gestionEnergie', image: IMG + 'equipment/coal_generator.svg', properties: '(1)kg de charbon génère 18 Qt. Stockage : Machine à vapeur (100 kg), Empl. 2', techLevel: 'III', value: 18000 },

  // ─── ARMES DE CORPS À CORPS (Katharsys) ───
  { id: 'tronconneuse', name: 'Tronçonneuse', category: 'armesDeCorpsACorps', cult: 'scourgers', image: IMG + 'melee/chainsaw.png', handling: '-2D', range: '1', damage: '8+F/2', properties: 'Incendiaire, Spécial', encumbrance: 3, techLevel: 'IV', slots: 2, value: 2300, resources: 4 },
  { id: 'machette', name: 'Machette', category: 'armesDeCorpsACorps', image: IMG + 'melee/machete.png', handling: '+1D', range: '1', damage: '3+F/3', encumbrance: 1, techLevel: 'II', slots: 1, value: 450 },
  { id: 'pique', name: 'Pique', category: 'armesDeCorpsACorps', image: IMG + 'melee/pike.png', range: '2', damage: '3+F/3', encumbrance: 2, techLevel: 'I', slots: 1, value: 250 },
  { id: 'brise-lame', name: 'Brise-Lame', category: 'armesDeCorpsACorps', image: IMG + 'melee/sword_breaker.png', handling: '-1D', range: '1', damage: '5+F/3', properties: 'Spécial', encumbrance: 2, techLevel: 'III', slots: 1, value: 800 },
  { id: 'rapiere', name: 'Rapière', category: 'armesDeCorpsACorps', image: IMG + 'melee/rapier.png', handling: '+1D', range: '1', damage: '4+F/3', properties: 'Régularité (2DC)', encumbrance: 1, techLevel: 'II', slots: 2, value: 900 },
  { id: 'lance-katharsys', name: 'Lance', category: 'armesDeCorpsACorps', image: IMG + 'melee/lance.png', range: '2', damage: '4+F/3', encumbrance: 2, techLevel: 'I', slots: 1, value: 100 },

  // ─── POUDRE NOIRE ───
  { id: 'flasque-poudre', name: 'Flasque de Poudre', category: 'poudreNoire', image: IMG + 'ammo/powderflask.svg', properties: 'Permet de recharger une arme à poudre noire', techLevel: 'II', value: 100 },
  { id: 'cartouche-papier', name: 'Cartouche en Papier', category: 'poudreNoire', image: IMG + 'ammo/papercartridge.svg', properties: 'Munition pré-chargée pour arme à poudre noire', techLevel: 'II', value: 20 },
  { id: 'cartouche-papier-perso', name: 'Cartouche en Papier Personnalisée', category: 'poudreNoire', image: IMG + 'ammo/papercartridge.svg', properties: 'Niveau 1 à 3 ; cartouche sur mesure pour effets spéciaux. Base : 32 LC + 2 × niveau', techLevel: 'III', value: 2, levelable: true },

  // ─── ARMES DE POING (Katharsys) ───
  { id: 'derringer', name: 'Derringer', category: 'armesDePoing', image: IMG + 'handguns/derringer.png', caliber: '.357', handling: '+1D', range: '5/20', damage: '6', magazine: '2', properties: 'Discret, Camouflage (2), Double Canon', encumbrance: 1, techLevel: 'III', slots: 1, value: 800 },
  { id: 'revolver-resistance-grenaille', name: 'Révolver de la Résistance (Grenaille)', category: 'armesDePoing', image: IMG + 'handguns/resistance_revolver_shot.png', caliber: '.410', range: '5/20', damage: '7', magazine: '2', encumbrance: 1, techLevel: 'III', slots: 1, value: 1000 },
  { id: 'revolver-resistance-chevrotine', name: 'Révolver de la Résistance (Chevrotine)', category: 'armesDePoing', image: IMG + 'handguns/resistance_revolver_slug.png', caliber: '.410', range: '5/20', damage: '7', magazine: '2', properties: 'Dispersion', encumbrance: 1, techLevel: 'III', slots: 1, value: 1000 },
  { id: 'fusil-canon-scie-corneille', name: 'Fusil à Canon Scié Corneille', category: 'armesDePoing', cult: 'apocalyptics', image: IMG + 'handguns/ravens_sawnoff.png', caliber: '12 mm', range: '5/20', damage: '10', magazine: '2', properties: 'Dispersion, Double canon', encumbrance: 2, techLevel: 'III', slots: 2, value: 1550, resources: 2 },
  { id: 'poivriere-grenaille', name: 'Poivrière (Grenaille)', category: 'armesDePoing', image: IMG + 'handguns/pepperbox_shot.png', caliber: '.410', handling: '-1D', range: '5/15', damage: '7', magazine: '4', properties: 'Dispersion', encumbrance: 1, techLevel: 'II', slots: 1, value: 800 },
  { id: 'poivriere-chevrotine', name: 'Poivrière (Chevrotine)', category: 'armesDePoing', image: IMG + 'handguns/pepperbox_slug.png', caliber: '.410', handling: '-1D', range: '5/15', damage: '7', magazine: '4', encumbrance: 1, techLevel: 'II', slots: 1, value: 800 },
  { id: 'smartgun', name: 'Smartgun', category: 'armesDePoing', cult: 'scourgers', image: IMG + 'handguns/smartgun.png', caliber: '4.6×30mm', handling: '+2D', range: '10/40', damage: '7', magazine: '20', properties: 'Encodage biométrique, Régularité (3DC)', encumbrance: 1, techLevel: 'VI', slots: 1, value: 40000, resources: 6 },

  // ─── FUSILS (Katharsys) ───
  { id: 'carabine-air-comprime', name: 'Carabine à Air Comprimé', category: 'fusils', image: IMG + 'rifles/repeating_air_rifle.png', caliber: '.357', range: '15/60', damage: '6', magazine: '8', properties: 'Rechargement Long (1H), Sensible', encumbrance: 2, techLevel: 'III', slots: 2, value: 3000 },
  { id: 'fragger', name: 'Fragger', category: 'fusils', image: IMG + 'rifles/fragger.png', caliber: 'Balles à fragmentation', range: '30/80', damage: '14', magazine: '6', properties: 'Explosif (zone), Spécial', encumbrance: 3, techLevel: 'V', slots: 2, value: 30000 },
  { id: 'tube-canon', name: 'Tube Canon', category: 'fusils', image: IMG + 'rifles/pipe_rifle.png', caliber: 'Balle en plomb', range: '5/30', damage: '8', magazine: '1', properties: 'Charg. par gueule', encumbrance: 2, techLevel: 'II', slots: 2, value: 4000 },
  { id: 'carabine-militaire-blafards', name: 'Carabine Militaire', category: 'fusils', cult: 'palers', image: IMG + 'rifles/military_carabine.png', caliber: '.357', range: '30/120', damage: '6', magazine: '10', encumbrance: 2, techLevel: 'IV', slots: 2, value: 8000, resources: 3 },
  { id: 'fusil-de-guerre', name: 'Fusil de Guerre', category: 'fusils', image: IMG + 'rifles/battle_rifle.png', caliber: '7.62', range: '50/200', damage: '13', magazine: '10', properties: 'Sensible', encumbrance: 3, techLevel: 'IV', slots: 2, value: 9000 },
  { id: 'fusil-pompe-antiemeutes', name: 'Fusil Pompe Antiémeutes', category: 'fusils', image: IMG + 'rifles/riot_shotgun.png', caliber: '12 mm', range: '5/30', damage: '10', magazine: '6', properties: 'Dispersion', encumbrance: 2, techLevel: 'III', slots: 2, value: 4500 },

  // ─── ARMES LOURDES (Katharsys) ───
  { id: 'fusil-anti-materiel', name: 'Fusil Anti-Matériel', category: 'armesLourdes', image: IMG + 'heavy_weapons/anti-materiel_rifle.png', caliber: '14 mm', handling: '-2D', range: '100/400', damage: '15', magazine: '5', properties: 'Antiblindage, Sensible', encumbrance: 4, techLevel: 'IV', slots: 2, value: 7500 },
  { id: 'canon-vapeur-katharsys', name: 'Canon à Vapeur', category: 'armesLourdes', image: IMG + 'heavy_weapons/steam_cannon.png', caliber: 'Obus', handling: '-2D', range: '100/400', damage: '18', magazine: '4', properties: 'Coup de tonnerre, Explosif, Empl. 4', techLevel: 'IV', value: 25000 },
  { id: 'denier', name: 'Denier', category: 'armesLourdes', cult: 'palers', image: IMG + 'heavy_weapons/denier.png', caliber: 'E-Cube', handling: '+1D', range: '50/200', damage: '14', magazine: '10', properties: 'Encodage biométrique, Spécial', encumbrance: 3, techLevel: 'VI', slots: 2, value: 24000, resources: 5 },
  { id: 'canon-rotatif', name: 'Canon Rotatif', category: 'armesLourdes', cult: 'judges', image: IMG + 'heavy_weapons/rotary_gun.png', caliber: 'Balle en plomb', handling: '-2D', range: '30/100', damage: '8', magazine: '6', properties: 'Rafale (4), Charg. par gueule', encumbrance: 5, techLevel: 'III', slots: 2, value: 4000, resources: 2 },
  { id: 'lanceur-marqueur', name: 'Lanceur de Marqueur', category: 'armesLourdes', cult: 'spitalians', image: IMG + 'heavy_weapons/marker_launcher.png', caliber: 'Marqueur', range: '20/60', damage: 'Spécial', magazine: '4', properties: 'Marque les cibles phéromonales', encumbrance: 2, techLevel: 'IV', slots: 2, value: 1500, resources: 2 },
  { id: 'tribut-nullpellia', name: 'Tribut de Nullpellia', category: 'armesLourdes', image: IMG + 'heavy_weapons/nullpelias_toll.png', caliber: 'E-Cube', handling: '-2D', range: '50/200', damage: '20', magazine: '1', properties: 'Coup de tonnerre, Explosif, Terrifiant (5), Mortel, Spécial', encumbrance: 6, techLevel: 'VI', value: 80000 },

  // ─── RESTES PSYCHONAUTIQUES ───
  { id: 'reste-luciole', name: 'Luciole', category: 'restesPsychonautiques', image: IMG + 'equipment/firefly.svg', properties: 'Réduit le malus d\'obscurité de 2D ; Permanent', encumbrance: 0, techLevel: 'I', value: 300 },
  { id: 'reste-armes-aberrantes', name: 'Armes Aberrantes', category: 'restesPsychonautiques', image: IMG + 'equipment/abberant_weaponry.svg', range: '1', damage: '5+F/2', properties: 'Terrifiant (2)', encumbrance: 2, techLevel: 'I', value: 1000 },
  { id: 'reste-eclat-ame', name: 'Éclat d\'Âme', category: 'restesPsychonautiques', image: IMG + 'equipment/soulburst.svg', properties: 'Accorde un bonus de points d\'Égo ; Niveau 1 à 3', techLevel: 'II', value: 400, levelable: true },
  { id: 'reste-ravee', name: 'Ravee', category: 'restesPsychonautiques', image: IMG + 'equipment/ravee.svg', properties: 'Améliore l\'attribut PHY', techLevel: 'I', value: 2200 },
  { id: 'reste-larma', name: 'Larma', category: 'restesPsychonautiques', image: IMG + 'equipment/larma.svg', properties: 'Détecte les Dushani proches, ainsi que leurs Phénomènes', techLevel: 'I', value: 400 },
  { id: 'reste-muk', name: 'Muk', category: 'restesPsychonautiques', image: IMG + 'equipment/muk.svg', properties: 'Détruit les Phénomènes dushani proches', encumbrance: 2, techLevel: 'I', value: 900 },
  { id: 'reste-jabuka', name: 'Jabuka', category: 'restesPsychonautiques', image: IMG + 'equipment/jabuka.svg', properties: 'Repère les anomalies géographiques', techLevel: 'I', value: 700 },
  { id: 'reste-ichor-feu', name: 'Ichor de Feu', category: 'restesPsychonautiques', image: IMG + 'equipment/ichor_hounds.svg', range: '10/20', damage: '6', properties: 'Déviation, Explosion, Incendiaire ; Attire les faux-bourdons', encumbrance: 1, techLevel: 'I', value: 300 },
  { id: 'reste-lampe-lard', name: 'Lampe à Lard', category: 'restesPsychonautiques', image: IMG + 'equipment/lard_light.svg', properties: 'Réduit le malus d\'obscurité de 2D ; (12) heures', techLevel: 'I', value: 50 },
  { id: 'reste-reverie', name: 'Rêverie', category: 'restesPsychonautiques', image: IMG + 'equipment/dreamtime.svg', properties: 'Crée un rêve commun', techLevel: 'I', value: 400 },
  { id: 'reste-purifieur', name: 'Purifieur', category: 'restesPsychonautiques', image: IMG + 'equipment/purifier.svg', properties: 'Purifie l\'eau', encumbrance: 1, techLevel: 'I', value: 1000 },
  { id: 'reste-allure', name: 'Allure', category: 'restesPsychonautiques', image: IMG + 'equipment/allure.svg', properties: 'Améliore toutes les compétences de CHA ; Niveau 1 à 3', techLevel: 'II', value: 500, levelable: true },
  { id: 'reste-coquilles-memorielles', name: 'Coquilles Mémorielles', category: 'restesPsychonautiques', image: IMG + 'equipment/memory_shells.svg', properties: 'Permet d\'expérimenter la vie d\'autres individus ; Altère des compétences déterminées aléatoirement', techLevel: 'I', value: 1800 },
  { id: 'reste-yeux-destin', name: 'Yeux du Destin', category: 'restesPsychonautiques', image: IMG + 'equipment/eyes_of_destiny.svg', properties: 'Permet de vivre une vision du futur', techLevel: 'I', value: 1200 },
  { id: 'reste-lentilles-distorsion', name: 'Lentilles à Distorsion', category: 'restesPsychonautiques', image: IMG + 'equipment/warplense.svg', properties: 'Permet de voir les auras ; Améliore la vision', techLevel: 'I', value: 1600 },
  { id: 'reste-coeur-brulant', name: 'Cœur Brûlant', category: 'restesPsychonautiques', image: IMG + 'equipment/burning_heart.svg', properties: 'Source de guérison de la dernière chance', encumbrance: 1, techLevel: 'I', value: 1100 },
  { id: 'reste-boite-stase', name: 'Boîte de Stase', category: 'restesPsychonautiques', image: IMG + 'equipment/pandoras_leftover.svg', properties: 'Crée un terrifiant abysse dans une boîte', encumbrance: 2, techLevel: 'I', value: 3000 },
  { id: 'reste-filet-sombre', name: 'Filet Sombre', category: 'restesPsychonautiques', image: IMG + 'equipment/byssus_net.svg', damage: '4', properties: 'Camouflage (4)', encumbrance: 2, techLevel: 'I', value: 600 },
  { id: 'reste-billes-noires', name: 'Billes Noires', category: 'restesPsychonautiques', image: IMG + 'equipment/black_marbles.svg', range: '15/30', properties: 'Nuage (10m, 4), Déviation', techLevel: 'I', value: 900 },
  { id: 'reste-bombe-infectieuse', name: 'Bombe Infectieuse', category: 'restesPsychonautiques', image: IMG + 'equipment/infection_bomb.svg', handling: '-1D', range: '10/20', damage: '3', properties: 'Nuage (4m), Déviation, Incendiaire', encumbrance: 1, techLevel: 'I', value: 1600 },
  { id: 'reste-dard-menthu', name: 'Dard de Menthu', category: 'restesPsychonautiques', image: IMG + 'equipment/menthus_sting.svg', properties: 'Endommage la Sporulation des Psychonautes ; Niveau 1 à 3', techLevel: 'II', value: 300, levelable: true },
  { id: 'reste-lotus', name: 'Lotus', category: 'restesPsychonautiques', image: IMG + 'equipment/lotus.svg', properties: 'Réduit la Défense mentale de l\'utilisateur ; Niveau 1 à 3', techLevel: 'II', value: 100, levelable: true },

  // ─── CHASSE AUX PSYCHONAUTES ───
  { id: 'fourmis-de-garde', name: 'Fourmis de Garde', category: 'chassePsychonautes', image: IMG + 'equipment/ant_watch.svg', properties: 'Détecte les Phéromanciens jusqu\'à (500)m', encumbrance: 2, techLevel: 'II', value: 70 },
  { id: 'sangblier', name: 'Sangblier', category: 'chassePsychonautes', cult: 'clanners', image: IMG + 'equipment/blood_timer.svg', properties: 'Détecte les perturbations temporelles', encumbrance: 1, techLevel: 'II', value: 500, resources: 2 },
  { id: 'harpe-des-balkhans', name: 'Harpe des Balkhans', category: 'chassePsychonautes', image: IMG + 'equipment/balkhani_harp.svg', properties: 'Détecte les Phénomènes dushani', techLevel: 'I', value: 40 },
  { id: 'gobe-mouche', name: 'Gobe-Mouche', category: 'chassePsychonautes', image: IMG + 'equipment/flycatcher.svg', properties: 'Détecte les Psychokinésistes jusqu\'à (1)km', encumbrance: 1, techLevel: 'II', value: 40 },
  { id: 'limiers-ichor', name: 'Limiers d\'Ichor', category: 'chassePsychonautes', cult: 'clanners', image: IMG + 'equipment/ichor_hounds.svg', properties: 'Détecte les phéromones. Culte : Britoni', techLevel: 'II', value: 20000, resources: 6 },
  { id: 'pointeur-laser', name: 'Pointeur Laser', category: 'chassePsychonautes', image: IMG + 'equipment/laser_scatter.svg', properties: 'Détecte l\'influence des Psychokinésistes. Utilise des E-Cubes ; 12 heures par charge. Cultes : Hellvétiques, Blafards', encumbrance: 1, techLevel: 'IV', value: 700, resources: 3 },
  { id: 'aimant-chakra', name: 'Aimant Chakra', category: 'chassePsychonautes', image: IMG + 'equipment/chakra_magnet.svg', properties: 'Détecte les champs de spores ou les puissants Psychonautes jusqu\'à (100)m', techLevel: 'III', value: 100 },
  { id: 'vermine-des-spores', name: 'Vermine des Spores', category: 'chassePsychonautes', image: IMG + 'equipment/flycatcher.svg', properties: 'Détecte les Psychonautes et les Léperos', techLevel: 'I', value: 70 },
  { id: 'mine-mollusk', name: 'Mine Mollusk', category: 'chassePsychonautes', cult: 'spitalians', image: IMG + 'equipment/mollusk_mine.svg', properties: 'Camouflage (4), Explosif (Dégâts 14), Coup de Tonnerre ; Explose lorsqu\'un Psychonaute dans sa phase primaire entre dans les (2)m', encumbrance: 1, techLevel: 'III', value: 1000, resources: 3 },

  // ─── PRIMALISME COMMUN ───
  { id: 'bile-de-gendo', name: 'Bile de Gendo', category: 'primalisme', cult: 'clanners', image: IMG + 'equipment/gendos_bile.svg', properties: 'Le buveur ignore les malus de Traumatismes et la limite de dépense d\'Ego. Puis il meurt', techLevel: 'I', value: 90, resources: 3 },
  { id: 'lait-de-mammouth', name: 'Lait de Mammouth', category: 'primalisme', cult: 'clanners', image: IMG + 'equipment/mammoths_milk.svg', properties: 'Le coût en XP de l\'attribut PHY est réduit. Culte : Garganti', encumbrance: 1, techLevel: 'I', value: 10, resources: 3 },
  { id: 'cosse-de-pandora', name: 'Cosse de Pandora', category: 'primalisme', image: IMG + 'equipment/pandoras_leftover.svg', properties: 'Rejeton pandorien avec divers effets', techLevel: 'IV', value: 500 },
  { id: 'tete-d-hydre', name: 'Tête d\'Hydre', category: 'primalisme', image: IMG + 'equipment/hydras_head.svg', properties: 'Détecte le champ de spore discordant le plus proche (2km)', encumbrance: 2, techLevel: 'II', value: 1000 },
  { id: 'filet-byssus', name: 'Filet Byssus', category: 'primalisme', image: IMG + 'equipment/byssus_net.svg', handling: '-2D', range: '2/5', damage: '0', properties: 'Enchevêtrement (-6D)', encumbrance: 1, techLevel: 'II', value: 150 },
  { id: 'decrocheur', name: 'Décrocheur', category: 'primalisme', cult: 'apocalyptics', image: IMG + 'equipment/husk_wire.svg', properties: 'Cache la sporulation ; Niveau 1 à 3', techLevel: 'III', value: 80, resources: 2, levelable: true },
  { id: 'petit-warui', name: 'Petit Warui', category: 'primalisme', cult: 'neolibyans', image: IMG + 'equipment/little_warui.svg', properties: 'Permet d\'outrepasser la barrière de la langue', techLevel: 'I', value: 500, resources: 1 },

  // ─── ARTÉFACTS LÉGENDAIRES ───
  { id: 'art-ancev', name: 'Ancev', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Accorde une force et une endurance surhumaines. Stockage : Cellule interne (50Qt)', magazine: '1', techLevel: 'VI', value: 15000 },
  { id: 'art-autotune', name: 'Autotune', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Répare les autres artefacts. Ne peut pas subir de Surchauffe. Stockage : Inconnu', techLevel: 'VI', value: 150000 },
  { id: 'art-omniinterprete', name: 'Omninterprète', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Traduit les langues ; 1Qt par heure d\'utilisation. Stockage : Cellule interne (25Qt)', techLevel: 'VI', value: 4000 },
  { id: 'art-covet', name: 'Covet', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', range: '20/50', properties: 'Manipule le magnétisme. Stockage : 4 × E-Cube (480Qt)', magazine: '12', encumbrance: 3, techLevel: 'VI', value: 20000 },
  { id: 'art-antikythera', name: 'Antikythera', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Fournit des informations sur les alentours. Stockage : E-Cube (120Qt)', magazine: '10', encumbrance: 2, techLevel: 'VI', value: 8000 },
  { id: 'art-hypertruqueur', name: 'Hypertruqueur', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Contrecarre les logiciels de reconnaissance faciale. Stockage : Cellule interne (60Qt)', magazine: '20', techLevel: 'VI', value: 9000 },
  { id: 'art-reinitialiseur', name: 'Réinitialiseur', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Drone réparateur d\'AMSUMOs. Stockage : Inconnu', techLevel: 'VI', value: 10000 },
  { id: 'art-deadbolt', name: 'Deadbolt', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Interfère avec les nanites des Dormeurs. Stockage : Cellule interne (5Qt)', magazine: '5', encumbrance: 1, techLevel: 'VI', value: 10000 },
  { id: 'art-conflagrateur', name: 'Conflagrateur', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Sort les Dormeurs de leur cryosommeil. Stockage : Cellule interne (1000Qt)', magazine: '4', techLevel: 'VI', value: 1000 },
  { id: 'art-larmes-orphelin', name: 'Larmes d\'Orphelin', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', range: '10/40', properties: 'Nuage (5m, 10), Étourdissement (4), Déviation, Terrifiant (4). Stockage : Cellule interne (200Qt)', magazine: '1', techLevel: 'VI', value: 1500 },
  { id: 'art-gardien', name: 'Gardien', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Cache le Concept de l\'utilisateur. Stockage : Cellule interne (20Qt)', magazine: '4', techLevel: 'VI', value: 2000 },
  { id: 'art-disparite', name: 'Disparité', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Draine la vie de la cible pour restaurer celle de l\'utilisateur. Stockage : Inconnu', techLevel: 'VI', value: 25000 },
  { id: 'art-sepulcre', name: 'Sépulcre', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Préserve parfaitement de petits objets. Stockage : E-Cube (120Qt)', magazine: '1', techLevel: 'VI', value: 12000 },
  { id: 'art-achille', name: 'Achille', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Les nanites du Dormeur entrent en surrégime. Stockage : Cellule interne (50Qt)', magazine: '1', techLevel: 'VI', value: 6000 },
  { id: 'art-revenant', name: 'Revenant', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Stocke et transfère des souvenirs. Stockage : 4 × E-Cube (480Qt)', magazine: '20', encumbrance: 1, techLevel: 'VI', value: 18000 },
  { id: 'art-radiance', name: 'Radiance', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', range: '40/120', damage: '4', properties: 'Mortel, Pénétration (10). Stockage : 5 × E-Cube (600Qt)', magazine: '4', encumbrance: 2, techLevel: 'VI', value: 50000 },
  { id: 'art-memorial', name: 'Mémorial', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Permet d\'imiter les compétences et Potentiels de l\'adversaire. Stockage : E-Cube (120Qt)', magazine: '8', techLevel: 'VI', value: 5000 },
  { id: 'art-keres', name: 'KEReS', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', armorValue: '6', properties: 'Pare-balle (9) ; -2D pour toucher le porteur. Stockage : Inconnu', encumbrance: 3, techLevel: 'VI', value: 45000 },
  { id: 'art-hierarque', name: 'Hiérarque', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Améliore les interactions avec un Concept spécifique. Stockage : Cellule interne (30Qt)', magazine: '15', techLevel: 'VI', value: 5500 },
  { id: 'art-decathlon', name: 'Décathlon', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Améliore temporairement l\'endurance. Stockage : Cellule interne (100Qt)', magazine: '5', techLevel: 'VI', value: 2500 },
  { id: 'art-simula', name: 'Simula', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Copie le visage de la cible. Stockage : Cellule interne (180Qt)', magazine: '3', encumbrance: 2, techLevel: 'VI', value: 8000 },
  { id: 'art-echo', name: 'Écho', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Crée une parfaite copie holographique de l\'utilisateur. Stockage : 2 × E-Cube (240Qt)', magazine: '10', techLevel: 'VI', value: 2750 },
  { id: 'art-omniprophete', name: 'Omniprophète', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Enregistre le Concept des passants ; fonctionne durant une journée. Stockage : E-Cube (120Qt)', magazine: '1', encumbrance: 2, techLevel: 'VI', value: 7500 },
  { id: 'art-matrice-tromperie', name: 'Matrice de Tromperie', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Trompe les verrouillages biométriques. Stockage : Cellule interne (240Qt)', magazine: '4', techLevel: 'VI', value: 5000 },
  { id: 'art-visualiseur', name: 'Visualiseur', category: 'artefactsLegendaires', image: IMG + 'equipment/darkknet.svg', properties: 'Révèle les objets électriques proches. Stockage : E-Cube (120Qt)', magazine: '1', techLevel: 'VI', value: 2500 },
]

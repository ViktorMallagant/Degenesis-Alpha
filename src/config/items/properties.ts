export const WEAPON_PROPERTY_DESCRIPTIONS: Record<string, string> = {
  'antiblindage': '<b>ANTI-ARMOR</b><br>This extremely compact, high-speed projectile punches through armor like paper.<br><br>Armor-piercing projectiles do not inherently deal more damage, but they ignore special armor properties such as "Massive" or "Bulletproof".',

  'camouflage': '<b>CAMOUFLAGE (DIFFICULTY)</b><br>A weapon with the « Camouflage » property does not really look like a weapon, or can be easily concealed. The value of this property represents the difficulty of penetrating the disguise via an INS+Perception check.',

  'chargement par la gueule': '<b>MUZZLE-LOADING</b><br>The weapon is loaded with powder and then a projectile through the muzzle. This procedure takes time—specifically, two actions.',
  'charg. par gueule': '<b>MUZZLE-LOADING</b><br>The weapon is loaded with powder and then a projectile through the muzzle. This procedure takes time—specifically, two actions.',

  'choc': '<b>IMPACT (TRIGGER)</b><br>This weapon is heavy and unwieldy, but in the hands of a professional, it becomes a true engine of destruction. The fighter can only attack or defend during their next action if they roll the required number of triggers. If they fail to do so, they lose their balance and must spend one action to regain their grip on the weapon. Alternatively, they may choose to drop it and fight unarmed.',

  'contondant': '<b>BLUNT</b><br>Judgment hammers and maces are blunt weapons that are particularly effective against armor possessing the property « Massive ».',

  'coup de tonnerre': '<b>THUNDER STRIKE</b><br>Each shot rings out like a thunderclap, sending dust swirling and snow tumbling from the trees. A thunderclap will send a herd of mammoths stampeding, and other animals will flee.',

  'dégâts de zone': '<b>AREA DAMAGE (ANGLE)</b><br>The weapon does not aim at a specific target but covers an area defined in degrees. Anything within this area takes damage.',

  'dégâts spéciaux': '<b>SPECIAL DAMAGE (ENEMY TYPE, DAMAGE)</b><br>A weapon with "Special Damage" is designed to deal specific damage to a certain type of enemy.',

  'déviation': '<b>DEVIATION</b><br>Grenades and other indirect weapons never exactly hit their target. Every successful attack goes along with a roll (1D). The result is the deviation of the intended target in meters. The Triggers are subtracted from the result: the more Triggers, the more exact the attack.<br><br>When an attack fails, you roll 2D to determine the distance in meters between the impact point of the missile and the intended target.',

  'dispersion': '<b>SCATTER</b><br>The weapon fires dozens of projectiles that spread out in a cone-shaped area of ​​effect to strike the target. Although buckshot can tear gaping holes in a target at close range, its destructive power dissipates rapidly after just a few meters.<br><br>The damage values ​​listed in the weapon\'s stats therefore apply only at short range. At greater distances, the damage is reduced by 4 points. However, no range penalty applies in this case.',

  'double canon': '<b>DOUBLE BARRELED</b><br>The weapon has two barrels that can be fired together or independently. Whatever the attacker decides to do, he only needs one Attack roll. To shoot from both barrels doubles the Damage.',

  'enchevêtrement': '<b>ENTANGLED (MOVEMENT PENALTY)</b><br>A bola entangles the legs, a net makes movement impossible: weapons with the "Entangled" Quality bring a penalty on all Skills requiring movement in addition to their standard Damage. The attack\'s Triggers are not added to the Damage, but to the penalty. The fighter can try to free himself with his next Action: by force (BOD+Force) or by wiggling out of the entanglement (AGI+Mobility). The Difficulty is 2. However, the penalty applies. A companion can come to his aid and roll BOD+Force (2) as his Action to tear the net or the bola away from his comrade.',

  'encodage biométrique': '<b>BIOMETRICALLY ENCODED (DIFFICULTY)</b><br>The shaft contains biometrical sensors that are only triggered when the right person wields the weapon. Often, the electronics hum and vibrate to show their readiness. In the hands of a stranger, nothing happens: he cannot fire the weapon. To switch off this protective mechanism or change the encoding, the circuits have to be formatted or bypassed. Both require a skillful technician with an electronics workshop. He first has to make an Action roll on AGI+Crafting against the Difficulty of the Quality to lay bare the electronics. With INT+Engineering (Difficulty), he identifies the circuitry, understands its workings, and manipulates it. If one of the rolls fails, the Difficulty rises by 1. If it rises to 12, the weapon powers down. The only value it now has is its scrap value.',

  'enrayement': '<b>JAMMING</b><br>Jamming is a curse, and a shooter who uses a weapon with this Quality should resign to his fate. If he rolls more 1s than 6s when attacking, the weapon jams. It takes (1) Action to remove the jam.',

  'étendard': '<b>STANDARD (BONUS)</b><br>You fight for a common cause, carry it out onto the battlefield, are brothers and sisters in spirit—and the standard inspires and unites you all. As long as it is raised, everyone around it adds its bonus as dice to their Attack rolls.',

  'étourdissement': '<b>DAZED (EGO DAMAGE)</b><br>A weapon with this Quality does not cause Flesh Wounds, but instead directly reduces Ego Points. Unless noted differently, armor reduces the Damage.',

  'explosif': '<b>EXPLOSIVE</b><br>The ammo used detonates in a fireball and destroys everything in a certain radius. Apply the explosion rules.',

  'fragile': '<b>FRAGILE</b><br>If at least one die rolls a 1, the weapon shatters. If the Action was successful, it at least causes Damage.',

  'incendiaire': '<b>FIRE HAZARDOUS</b><br>The ammo the weapon uses ignites its target. Apply the fire rules.,

  'incontrôlable': '<b>OUT OF CONTROL (DIFFICULTY)</b><br>Some weapons are just as dangerous for their wielder as for those he attacks. If the attacker misses his target, he has to get his weapon under control again: he rolls BOD+Melee (Difficulty). If this roll fails, too, the weapon hurts him as if it had attacked him.',

  'mortel': '<b>FATAL</b><br>Thermonuclear detonations, the invisible death from a microwave ray gun, or a nanite infection ignore armor and tear or otherwise destroy the creature from the inside. A weapon with the "FATAL" Quality causes Trauma Damage.',

  'nuage': '<b>CLOUD (RADIUS, AMOUNT OF TIME)</b><br>When a grenade is detonated, its agent spreads and covers an area with a radius of several meters. If there is no wind, the cloud hovers above the battlefield for a few Combat Rounds before dissipating. If someone remains in the cloud, the Damage or other effects are cumulative unless stated otherwise.',

  'pénétration': '<b>PIERCING (ARMOR RATING)</b><br>The bullet or the charge fired pierces any armor up to the Armor rating in brackets completely. Any Armor rating above the number in brackets is subtracted from the Damage as usual or—depending on the weapon—the bullet is completely deflected.',

  'rafale': '<b>SALVOES (NUMBER OF ROUNDS)</b><br>Some automatic weapons have a high rate of fire. This gives them the "Salvoes" Quality. The shooter can fire several bullets in rapid succession—and thus in (1) Action. The maximum number of bullets fired is listed in the brackets. Every bullet increases the Handling by +1D and the Damage by (1). If several targets are close together and the shooter wants to move the weapon, he splits his attack dice evenly between targets, rounded down.<br><br>He rolls for every target and determines the Damage; the extra Damage is also divided between the targets. If he fires a salvo of 5 bullets against 3 targets, the extra Damage of (5) decreases to (1) point of Damage per target (5 divided by 3 is 1, rounded down). Of course, a salvo cannot hit more targets than it contained bullets.',

  'régularité': '<b>SMOOTH RUNNING (TRIGGER)</b><br>The perfect weapon for attacks in rapid succession. If the fighter reaches at least the stated number of Triggers with his Attack roll, he may attack again right afterwards, though this time with a penalty of -2D.<br><br>Smooth Running can be activated on these extra attacks, but the penalty rises by -2D with every additional attack.',

  'sensible': '<b>SENSITIVE</b><br>High-precision weapons like sniper rifles are sensitive to jolting. When a fighter with such a weapon is forced into melee or is attacked, 1T is enough for the opponent to Damage the weapon: its Handling permanently decreases by -1D.<br><br>Skilled craftsmen can repair a damaged weapon. They roll AGI+Crafting: the Tech Level of the weapon and the Damage taken determine the Difficulty. If the roll succeeds, the Damage is repaired. If it fails, the Handling decreases by another -1D.',

  'spécial': '<b>SPECIAL</b><br>This weapon has special rules described in its detailed entry.',

  'talisman': '<b>TALISMAN (BONUS)</b><br>This item has a sentimental value that cannot be measured in Armor rating or piercing force: it gives its wearer extra dice on PSY+Faith/Willpower.',

  'terrifiant': '<b>TERRIFYING (DIFFICULTY)</b><br>The mere sight of this weapon strikes fear into an enemy\'s heart: all opponents must succeed on a PSY+Faith/Willpower check against the property\'s difficulty or suffer a -2D penalty to their next action. At the start of each combat round, they can regain their composure with a successful action check. Once the check succeeds, the opponent becomes immune for the remainder of the combat.',

  // Weapon properties
  'lacération': '<b>LACÉRATION</b><br>Si une attaque réussit avec 2 déclencheurs, le combattant peut refermer les lames d\'un coup sec et infliger ainsi 1D de dégâts supplémentaires. Les 2DC utilisés ne comptent pas dans le calcul des dégâts. Cela signifie que si le joueur n\'obtient que 1 en dégâts supplémentaires, il infligera 1 point de dégâts en moins que s\'il avait décidé de ne pas utiliser « Lacération ». Au mieux, il peut infliger +4 dégâts.',

  'effroyable': '<b>EFFROYABLE (NIVEAU)</b><br>Hérissée de lames dentelées ou de pointes menaçantes, cette arme a été conçue pour qu\'une cuisante douleur persiste longtemps après avoir touché sa cible. Une arme disposant de cette propriété ajoute (1) déclencheur bonus par niveau lorsqu\'elle cause une Complication (au moins un déclencheur doit être préalablement dépensé pour infliger la Complication).',

  'assommement': '<b>ASSOMMEMENT (NIVEAU)</b><br>Les armes avec la propriété Assommement secouent leurs cibles et font vibrer leurs pensées à l\'intérieur de leur crâne, retardant toute réaction de leur part. La cible subit la Complication Désorientation, à un niveau égal à celui de la propriété.',

  'panique': '<b>PANIQUE (NIVEAU)</b><br>Les effets de cette arme sont plus que terrifiants. Quiconque voit une telle arme exercer ses ravages doit effectuer un jet de Défense mentale dont la difficulté est égale au niveau de la propriété. En cas d\'échec, la cible est affectée par la Complication Obusite.',

  'rechargement long': '<b>RECHARGEMENT LONG (DURÉE)</b><br>De nombreuses armes ont un processus de rechargement presque impossible à parachever pendant un combat. Le temps requis est indiqué juste après le nom de la propriété.',

  'chargement unique': '<b>CHARGEMENT UNIQUE (NOMBRE DE BALLES)</b><br>Cette arme ne se recharge pas par un magasin amovible, un chargeur ou un barillet, mais elle a une porte de chargement ou un magasin tubulaire qui oblige à charger les balles une à une. Le nombre de munitions pouvant être chargées en une seule action est spécifié par le niveau de la propriété.',

  'silencieux': '<b>SILENCIEUX</b><br>Cette arme produit un bruit minimal lors du tir, rendant difficile la localisation du tireur et ne déclenchant pas de panique chez les témoins éloignés.',

  'discret': '<b>DISCRET</b><br>Cette arme est de petite taille ou facilement dissimulable. Elle peut être portée sans attirer l\'attention.',

  // Armor properties
  'cassant': '<b>CASSANT (VALEUR DE DÉGÂTS CRITIQUES)</b><br>Les plaques d\'armures peuvent être durcies, ce qui renforce la valeur d\'armure de 1 point. Toutefois, ce procédé rend aussi le matériau cassant. Si l\'armure subit un certain nombre de dégâts (déterminé par la valeur de la propriété), les plaques se rompent et perdent 1 point permanent de leur valeur d\'armure.',

  'hermétique': '<b>HERMÉTIQUE (SUCCÈS BONUS)</b><br>Cette armure offre une protection fiable contre les toxines, les germes et les sporulations. Lors d\'un jet pour contrer une contamination, le porteur obtient des succès automatiques égaux à la valeur de la propriété.',

  'ignifugé': '<b>IGNIFUGÉ (ARMURE)</b><br>Une armure ignifugée montre tout son potentiel dans les flammes infernales d\'un calcinateur : la valeur de la propriété est utilisée au lieu de la valeur d\'armure. En outre, l\'armure ne s\'enflamme jamais.',

  'instable': '<b>INSTABLE (VALEUR DE DÉGÂTS CRITIQUES)</b><br>Des plaques en fer boulonnées entre elles ou des morceaux de cuir et de métal attachés par des câbles peuvent être assemblés très rapidement. Cependant, chaque coup les affaiblit. Si les dégâts atteignent ou dépassent la valeur de la propriété, l\'armure instable perd 1 point de sa valeur d\'armure. Il est possible de récupérer 1 point d\'armure avec 1 kg de rebuts et un test d\'AGI+Artisanat.',

  'isolant': '<b>ISOLANT</b><br>Ce matériau protège entièrement le porteur de l\'armure contre les décharges électriques. Tout dégât d\'électricité est réduit à zéro.',

  'massif': '<b>MASSIF (ARMURE)</b><br>Armure constituée de plaques ou moulée en une seule pièce. Les lames, les objets tranchants ou pointus sont repoussés ou déviés : le score de protection contre ces armes est plus élevé (valeur d\'armure = valeur de la propriété).<br><br>Cependant, une armure massive est sujette aux dégâts infligés par des armes contondantes. Si les dégâts causés par des armes contondantes (déclencheurs inclus) sont supérieurs à la valeur d\'armure normale, des Blessures Superficielles sont infligées normalement, mais les déclencheurs infligent des Traumatismes supplémentaires.',

  'pare-balles': '<b>PARE-BALLES (ARMURE)</b><br>Une armure pare-balles absorbe l\'énergie cinétique d\'un projectile tiré par une arme à feu. Sur ce type d\'attaques, la valeur de la propriété se substitue à la valeur d\'armure.',

  'pare-balle': '<b>PARE-BALLE (ARMURE)</b><br>Une armure pare-balles absorbe l\'énergie cinétique d\'un projectile tiré par une arme à feu. Sur ce type d\'attaques, la valeur de la propriété se substitue à la valeur d\'armure.',

  'première impression': '<b>PREMIÈRE IMPRESSION (BONUS)</b><br>L\'armure impressionne, et son porteur bénéficie d\'un bonus aux interactions sociales lors de tout premier contact avec des étrangers.',

  'respecté': '<b>RESPECTÉ (GROUPE CIBLÉ, DÉS BONUS)</b><br>Cette armure est respectée par une partie de la population. Son porteur bénéficie d\'un bonus de dés pour toute interaction sociale avec ce groupe de personnes.',

  'terrifiant (armure)': '<b>TERRIFIANT (DIFFICULTÉ)</b><br>Un aspect de l\'armure suscite une peur instinctive chez ceux qui la contemplent. Si leur test de PSY+Foi/Volonté échoue, ils subissent un malus de -2D à leurs attaques contre le porteur de l\'armure. Ce jet peut s\'effectuer avant chaque attaque : une fois cette peur vaincue, ils deviennent immunisés pour le reste du combat.',

  // Chemical agents
  'appât': '<b>APPÂT (CIBLE)</b><br>Un appât attire toujours une personne en particulier, ou bien un groupe de personnes aux caractéristiques identiques. Il influence le comportement, la plupart du temps par le biais de phéromones qui attirent la cible.',

  'empoisonné': '<b>EMPOISONNÉ (PUISSANCE, EFFET, DURÉE)</b><br>L\'agent chimique attaque le métabolisme de sa cible. Elle doit réussir un jet de PHY+Résistance contre la Puissance de l\'agent pour contrer ses effets. Les masques à gaz et les armures dotées de la propriété « Hermétique » offrent une protection sous forme de succès automatiques, à condition que l\'agent n\'ait été ni ingéré ni injecté.',

  'exsporiateur virtuel': '<b>EXSPORIATEUR VIRTUEL (EXSPORIATEUR, DURÉE)</b><br>L\'effet catalytique des spores est bloqué pendant une certaine durée, et le degré de sporulation chez un Léperos ou un Psychonaute diminue temporairement d\'un nombre égal aux points d\'exsporiateur. Une fois le temps écoulé, la cible regagne son nombre total en Infestations de Spores.',

  'narcotique': '<b>NARCOTIQUE (PUISSANCE, DÉGÂTS)</b><br>Un narcotique endommage le système nerveux. Un jet de PHY+Résistance est autorisé. Les masques à gaz et les armures dotées de la propriété « Hermétique » offrent une protection. En cas d\'échec, les points de dégâts ainsi que les déclencheurs sont retirés du nombre de points d\'Égo de l\'ennemi.',

  // Traps
  'discrétion': '<b>DISCRÉTION (DIFFICULTÉ)</b><br>La première valeur d\'un piège indique sa discrétion. Si une victime potentielle s\'approche, elle peut repérer le piège à temps avec un jet réussi d\'INS+Perception. La valeur détermine la difficulté. Si le jet échoue, la victime s\'approche trop près et le piège se déclenche.',
}

export function getPropertyDescription(propertyText: string): string | undefined {
  const base = propertyText.trim().split('(')[0].trim().toLowerCase()
  return WEAPON_PROPERTY_DESCRIPTIONS[base]
}

export function parseProperties(str: string | undefined): string[] {
  if (!str) return []
  const result: string[] = []
  let depth = 0
  let current = ''
  for (const char of str) {
    if (char === '(') depth++
    else if (char === ')') depth--
    if (char === ',' && depth === 0) {
      if (current.trim()) result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  if (current.trim()) result.push(current.trim())
  return result
}

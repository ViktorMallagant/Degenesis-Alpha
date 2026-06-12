export const WEAPON_PROPERTY_DESCRIPTIONS: Record<string, string> = {
  'antiblindage': '<b>ANTIBLINDAGE</b><br>Ce projectile extrêmement compact et rapide perfore les armures comme du papier.<br><br>Les projectiles antiblindage ne génèrent pas foncièrement plus de dégâts, mais ils ignorent les propriétés spéciales qu\'une armure peut posséder, comme « Massif » ou « Pare-balles ».',

  'camouflage': '<b>CAMOUFLAGE (DIFFICULTÉ)</b><br>Une arme qui dispose de la propriété « Camouflage » ne ressemble pas vraiment à une arme, ou peut se dissimuler facilement. La valeur de cette propriété équivaut à la difficulté pour déjouer le camouflage grâce à un test d\'INS+Perception.',

  'chargement par la gueule': '<b>CHARGEMENT PAR LA GUEULE</b><br>L\'arme est chargée avec de la poudre puis avec un projectile par la gueule du canon. Cette procédure prend du temps, c\'est-à-dire 2 actions.',
  'charg. par gueule': '<b>CHARGEMENT PAR LA GUEULE</b><br>L\'arme est chargée avec de la poudre puis avec un projectile par la gueule du canon. Cette procédure prend du temps, c\'est-à-dire 2 actions.',

  'choc': '<b>CHOC (DÉCLENCHEUR)</b><br>Cette arme est lourde et très peu maniable, mais entre les mains d\'un professionnel, elle devient un véritable engin de destruction. Le combattant ne peut attaquer ou se défendre lors de sa prochaine action que s\'il obtient le nombre nécessaire de déclencheurs indiqués. S\'il n\'y parvient pas, il perd l\'équilibre et devra dépenser 1 action pour pouvoir à nouveau empoigner son arme. Il peut aussi décider de la lâcher et se battre à mains nues.',

  'contondant': '<b>CONTONDANT</b><br>Les marteaux de jugement et les massues sont des armes contondantes particulièrement efficaces contre les armures dotées de la propriété « Massif ».',

  'coup de tonnerre': '<b>COUP DE TONNERRE</b><br>Chaque tir résonne comme un coup de tonnerre qui fait virevolter la poussière et tomber la neige des arbres. Un coup de tonnerre provoquera la débandade d\'un troupeau de mammouths, et les autres animaux fuiront.',

  'dégâts de zone': '<b>DÉGÂTS DE ZONE (ANGLE)</b><br>L\'arme ne vise pas une cible directement, mais couvre une zone exprimée en degrés. Tout ce qui se trouve à l\'intérieur de cette zone subit des dégâts.',

  'dégâts spéciaux': '<b>DÉGÂTS SPÉCIAUX (TYPE D\'ENNEMI, DÉGÂTS)</b><br>Une arme dotée de « Dégâts spéciaux » est conçue pour infliger des dégâts particuliers à un certain type d\'ennemis.',

  'déviation': '<b>DÉVIATION</b><br>Les grenades et les autres armes indirectes ne touchent jamais vraiment leur cible sur le coup. Sur toute attaque réussie, un jet de dé est nécessaire (1D) ; le résultat donne le déportement en nombre de mètres par rapport à la cible visée. Les déclencheurs sont soustraits du résultat : plus il y a de déclencheurs, plus l\'attaque sera précise.<br><br>Si l\'attaque échoue, il faudra lancer 2D pour déterminer la distance entre le point d\'impact du missile et la cible visée.',

  'dispersion': '<b>DISPERSION</b><br>L\'arme tire des dizaines de projectiles qui se répandent sur une zone d\'effet conique et touchent la cible. Bien que la chevrotine puisse créer des trous béants dans une cible à faible portée, sa puissance de destruction se dissipe vite après quelques mètres de distance.<br><br>Les dégâts indiqués dans les caractéristiques de l\'arme ne valent donc qu\'à portée courte. Pour des distances plus grandes, les dégâts diminuent de 4 points. En revanche, aucun malus de distance ne s\'applique ici.',

  'double canon': '<b>DOUBLE CANON</b><br>L\'arme dispose de deux canons qui peuvent être utilisés en même temps ou séparément. Dans un cas comme dans l\'autre, cela ne coûte qu\'un seul jet d\'attaque. Tirer avec les deux canons en même temps double les dégâts.',

  'enchevêtrement': '<b>ENCHEVÊTREMENT (MALUS AU MOUVEMENT)</b><br>Un bola s\'enroule autour des jambes, et un filet rend tout mouvement impossible. Les armes dotées de cette propriété imposent un malus à toutes les compétences qui nécessitent un mouvement, en plus des dégâts infligés. Les déclencheurs du jet d\'attaque ne s\'ajoutent pas aux dégâts, mais au malus.<br><br>Le combattant pourra tenter de se libérer avec sa prochaine action : par la force (PHY+Force) ou en se tortillant (AGI+Mobilité). La difficulté est de 2. Une autre personne peut effectuer un test de PHY+Force (2) afin d\'arracher le filet ou le bola.',

  'encodage biométrique': '<b>ENCODAGE BIOMÉTRIQUE (DIFFICULTÉ)</b><br>La crosse contient un capteur biométrique qui déclenche l\'arme uniquement lorsque la bonne personne est détectée. Entre les mains d\'un étranger, l\'arme ne tire pas.<br><br>Pour désactiver ce mécanisme ou modifier l\'encodage, un technicien doit réussir un test d\'AGI+Artisanat puis d\'INT+Technologie (difficulté). Si l\'un des jets échoue, la difficulté augmente de 1. Si elle atteint 12, l\'arme se désactive définitivement.',

  'enrayement': '<b>ENRAYEMENT</b><br>Tout tireur qui utilise une arme avec cette propriété devra se résigner à son triste sort. S\'il obtient plus de 1 que de 6 sur son jet d\'attaque, l\'arme s\'enraye le prochain round. Désenrayer une arme coûte 1 action.',

  'étendard': '<b>ÉTENDARD (BONUS)</b><br>Vous combattez pour la même cause, vos frères et sœurs unis dans un même esprit. Vous brandissez cet étendard sur le champ de bataille ; il vous inspire et vous soude. Tant qu\'il est levé, tout le monde autour de lui bénéficie d\'un bonus.',

  'étourdissement': '<b>ÉTOURDISSEMENT (DÉGÂTS D\'ÉGO)</b><br>Une arme dotée de cette propriété n\'inflige pas de Blessures Superficielles, mais s\'en prend aux points d\'Égo. Sauf indication contraire, les valeurs d\'armure réduisent les dégâts.',

  'explosif': '<b>EXPLOSIF</b><br>La munition utilisée explose en une boule de feu et détruit tout sur un rayon donné. Utilisez les règles sur les explosions.',

  'fragile': '<b>FRAGILE</b><br>Si au moins un 1 est obtenu sur un jet, l\'arme se brise en morceau. Si l\'action est tout de même réussie, elle infligera ses dégâts.',

  'incendiaire': '<b>INCENDIAIRE</b><br>Les munitions de l\'arme utilisée embrasent la cible. Utilisez les règles de feu.',

  'incontrôlable': '<b>INCONTRÔLABLE (DIFFICULTÉ)</b><br>Certaines armes représentent un véritable danger à la fois pour l\'utilisateur et pour la personne attaquée. Si l\'attaquant manque sa cible, il lui faut reprendre le contrôle de son arme avec un jet de PHY+Corps à corps (difficulté). En cas d\'échec ici aussi, l\'arme le blesse comme s\'il s\'était attaqué lui-même.',

  'mortel': '<b>MORTEL</b><br>Les explosions thermonucléaires, le rayon invisible du pistolet à micro-ondes ou une infection de nanites ignorent toute armure. Ils détruisent toute créature de l\'intérieur. Une arme dotée de la propriété « Mortel » inflige directement des Traumatismes.',

  'nuage': '<b>NUAGE (RAYON, DURÉE)</b><br>Lorsqu\'une grenade explose, ses agents actifs se dispersent et recouvrent une zone d\'un rayon de plusieurs mètres. En l\'absence de vent, le nuage plane au-dessus du champ de bataille pendant quelques rounds de combat avant de se dissiper. Sauf indication contraire, les dégâts sont cumulatifs pour quiconque reste dans le nuage.',

  'pénétration': '<b>PÉNÉTRATION (VALEUR D\'ARMURE)</b><br>La balle ou la charge explosive pénètre complètement une armure de valeur inférieure ou égale à celle indiquée entre parenthèses. Toute valeur supérieure sera soustraite des points de dégât comme à l\'accoutumée ou bien, en fonction de l\'arme, la balle sera simplement déviée.',

  'rafale': '<b>RAFALE (NOMBRE DE BALLES)</b><br>Certaines armes automatiques possèdent une forte cadence de tir. Le tireur peut tirer plusieurs balles en succession rapide en 1 action (nombre indiqué entre parenthèses). Chaque balle accroît la Maniabilité de +1D et les dégâts de 1 point.<br><br>Si plusieurs cibles sont proches les unes des autres, les dés d\'attaque sont divisés de manière égale entre les cibles. Une rafale ne peut pas toucher plus de cibles qu\'elle ne tire de balles.',

  'régularité': '<b>RÉGULARITÉ (DÉCLENCHEUR)</b><br>L\'arme parfaite pour des attaques à succession rapide. Si le combattant atteint sur son jet d\'attaque le nombre de déclencheurs indiqué, il peut immédiatement attaquer de nouveau, mais avec un malus de -2D cette fois-ci. Cela peut se produire plusieurs fois d\'affilée, mais les malus se cumulent à raison de -2D à chaque attaque supplémentaire.',

  'sensible': '<b>SENSIBLE</b><br>Les armes à haute précision comme les fusils de sniper sont sensibles aux chocs. Lorsqu\'un combattant équipé d\'une telle arme est contraint de se battre au corps à corps ou lorsqu\'il est attaqué, 1DC suffit à son adversaire pour endommager l\'arme : sa Maniabilité baisse de manière permanente de 1D.<br><br>Un artisan doué peut réparer l\'arme endommagée avec un test d\'AGI+Artisanat.',

  'spécial': '<b>SPÉCIAL</b><br>Cette arme possède des règles spéciales décrites dans sa fiche détaillée.',

  'talisman': '<b>TALISMAN (BONUS)</b><br>Cet objet possède une valeur sentimentale qui ne peut se mesurer en valeur d\'armure ou en force de pénétration : elle donne à son porteur des dés supplémentaires aux tests de PSY+Foi/Volonté.',

  'terrifiant': '<b>TERRIFIANT (DIFFICULTÉ)</b><br>La simple vision de cette arme provoque la peur dans le cœur d\'un ennemi : tous les adversaires doivent réussir un jet de PSY+Foi/Volonté contre la difficulté de la propriété ou subir un malus de -2D sur leur prochaine action. Au début de chaque round de combat, ils peuvent reprendre leurs esprits sur un test d\'action réussi. Lorsque le jet est réussi une fois, l\'adversaire devient immunisé pour le reste du combat.',

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

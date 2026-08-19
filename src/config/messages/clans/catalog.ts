// Canonical source for all Clan-facing message text.
//
// Add or edit Clan names/descriptions, Rank names/descriptions, and Clan
// Potentials here. The rest of the application consumes the flattened
// `clanMessages` export at the bottom of this file.

const templateClanMessages = {
  cockroaches: 'Cockroaches',
  cockroachesDescription: `The <b>Cockroaches</b> are one of Borca’s largest and most savage Clanner peoples, occupying territory east of the Protectorate and united by a deep hatred of the Judges and the civilization they represent. Organized into numerous broods and warbands—including groups such as the <b>Sphingids, Winged Ones, and Weavers</b>—they follow brutal tribal traditions centered on strength, fertility, ancestor-like Totems, prophetic Augurs, Broodmothers, and immensely powerful warriors known as <b>Cockroach Kings</b>. Their society prizes survival and conquest above individual life: weaker warriors are considered expendable, while successful fighters earn the right to reproduce and strengthen future generations. Technologically primitive compared with the Protectorate, they compensate through enormous numbers, stealth, knowledge of Borca’s ruins and underground passages, coordinated swarm tactics, and ruthless close combat. After generations of being driven back and slaughtered by the Judges, the Cockroaches have begun surging north again, infiltrating settlements such as Justitian, overrunning Protectorate positions, and becoming one of the principal forces behind the growing <b>Clan Wars</b> threatening to tear Borca apart.`,

  mechans: 'Mechans',
  mechansDescription: `The <b>Mechans</b> are a technologically advanced and notoriously ruthless Borcan Clan descended from the followers of the legendary <b>Mechanist</b>, whose recovered machinery and engineering knowledge helped create the industrial Cauldron City of <b>Nullpellia</b>. Treating the Mechanist almost as a sacred figure, the Mechans became an insular priest-technocracy obsessed with machines, steam power, pressure systems, and ancient technology, maintaining their society through intimidation, forced labor, kidnapping, and human tribute from neighboring peoples. Their arsenal includes sophisticated devices such as <b>Freon-based weapons</b>, and they once controlled the <b>Pneumancers</b>, a heavily armed slave-warrior caste created to defend their territory and crush resistance. Eventually displaced from Nullpellia after losing political control and facing the Pneumancers’ rebellion, the surviving Mechans turned outward, infiltrating settlements and brutally imposing their authority; by 2596 they had seized <b>Wetzlar</b>, enslaving its population and beginning its transformation into another Cauldron City. Unlike many Clans who rely primarily on numbers or brute strength, the Mechans are dangerous because of their technical knowledge, calculated cruelty, coercive social control, and willingness to weaponize forgotten technology against anyone standing between them and the restoration of their power.`,

  phosphorites: 'Phosphorites',
  phosphoritesDescription: `The <b>Phosphorites</b> are a ferocious Borcan Clan from the toxic <b>Ramein region</b>, a people shaped by generations of exposure to chemical and biological hazards until many possess extraordinary resistance to poisons that would cripple outsiders. Their society revolves around brutal warrior traditions led by fearsome champions known as <b>Bale Lords</b>, while shock troops such as the <b>Heart Eaters</b> tear into enemy formations ahead of them; the Clan also scavenges ancient ruins and bunker systems for forbidden weapons that can give its warriors a technological edge. Their defining philosophy is essentially <b>“burn bright or burn out”</b>: aggression, endurance, vengeance, and spectacular violence are virtues, with the strongest warriors expected to carve their legend into the wasteland before death finally catches them.`,

  enemoi: 'Enemoi',
  enemoiDescription: `The <b>Enemoi</b> are a highly advanced, nomadic Borcan Clan descended from the survivors of an ancient convoy that struggled to preserve order and humanity after the Eshaton. Traveling aboard five enormous, interconnected <b>UEO trucks</b>—including <b>Aquila, Furnace, Sagittarius, Orion, and the fortress-like Citadel</b>—they roam the lands south of the Protectorate dispensing medicine, knowledge, weapons, and their own uncompromising form of justice. Rather than conquering territory, the Enemoi see themselves as temporary custodians of the democratic ideals of the Bygone world: they arbitrate disputes between Clans, punish criminals when local communities cannot or will not, and believe that one day humanity will choose a legitimate government to which they can finally surrender their authority. Their sophisticated vehicles, laboratories, workshops, armories, and advanced firearms make them a <b>Tech Level V</b> force far beyond most Clans.`,

  stukovNomads: 'Stukov Nomads',
  stukovNomadsDescription: `The <b>Stukov Nomads</b> are the fiercely isolationist descendants of people who fled into the <b>Stukov Desert</b> during the Judges’ conquest of the Black Lung, choosing the deadly salt wastes over submission to the Protectorate. They have survived there for generations as highly mobile desert tribes, treating outsiders—especially Scrappers searching for buried Bygone technology—as thieves and invaders. Their entire culture is adapted to an environment of shifting salt dunes where conventional landmarks are almost useless: specialized <b>Dune Walkers</b> memorize ancestral routes step by step and can reproduce them years later, while other Nomads patiently observe strangers from concealment until they can anticipate their behavior in battle. They employ primitive weapons, camouflage, ambushes, poisoned arrows, and even deliberately contaminate temporary watering holes with <b>Dust Worm larvae</b> to discourage trespassers. Despite their comparatively low technology, the Nomads are extraordinarily difficult to hunt in their own territory because they know the desert intimately and generally decide when and where encounters occur. Their traditions also preserve practices such as the <b>Red Purge</b>, an ordeal once used to test tribal leaders, suggesting that endurance, physical resilience, and mastery of their hostile homeland are fundamental to their identity.`,

  storskis: 'Storskis',
  storskisDescription: `The <b>Storskis</b> are an East Borcan Clan of engineers, merchants, and railway nomads whose civilization revolves around massive armored <b>steam locomotives</b> running along a rail network they have painstakingly restored and expanded over centuries. Their tradition begins with <b>Jegor Storski</b>, who repaired an ancient steam engine and proved that Bygone railways could be reclaimed; his descendants turned that achievement into an entire way of life, operating heavily fortified trains that carry <b>mail, food, weapons, passengers, and trade goods</b> between otherwise isolated settlements from East Borca toward Pollen. Storski society is organized around extended train-families: outsiders who prove hardworking may marry into the Clan, while ambitious young Storskis eventually leave to earn the resources necessary to build locomotives and establish new family lines. Status is closely tied to the power and quality of one's train—disputes can even be settled through locomotive races—and their mastery of steam engineering gives them enormous influence in regions where advanced technology is scarce.`,

  corpseEaters: 'Corpse Eaters',
  corpseEatersDescription: `The <b>Corpse Eaters</b> are a primitive, cannibalistic Clanner people associated with the wilderness around the <b>Janus Crater and the western fringes of the Protectorate</b>, feared by nearby settlements as raiders and predators rather than merely another neighboring tribe. They are <b>Tech Level I</b>, living in tribal groups and practicing ritual consumption of human remains; <b>Frekka</b>, for example, is a Corpse Eater <b>Shaman who directs her tribe in the consumption of the dead and fallen</b>.`,

  garganti: 'Garganti',
  gargantiDescription: `The <b>Garganti</b> are a nomadic Clanner people from the far northeast of <b>Pollen</b>, renowned for living in an unusually close symbiosis with enormous <b>mammoths</b> that serve as mounts, pack animals, shelter, and a fundamental part of their culture. Garganti travel immense distances across the frozen wastes atop these beasts, wrapping themselves in heavy mammoth furs and sustaining themselves partly on mammoth milk; their relationship with the animals is deeply spiritual, and harming or poisoning a mammoth is treated as an almost unforgivable offense. They are generally described as stern, quiet, hardy people whose survival depends more on animal mastery, endurance, and knowledge of the frozen wilderness than on advanced technology; mechanically they are associated with <b>Tech Level II</b> and exceptional animal-handling traditions.`,

  voivodules: 'Voivodules',
  voivodulesDescription: `The <b>Voivodules</b> are an aristocratic Balkhan Clan whose identity is built around <b>bloodline, kinship, tradition, and the right to rule</b>. They see themselves as the custodians of old Balkhan customs and trace their ancestry back through generations to the founders of their people, taking enormous pride in noble lineage and family loyalty; kinship is the most important thing to a Voivodule. Their highest-ranking members can rise to become <b>Voivodes</b>, the warlords and rulers who dominate much of the Balkhan and have driven many of the major Cults from direct political control, creating semi-independent <b>Voivodates</b> centered on powerful cities and territories. Unlike more egalitarian or survival-driven Clans, the Voivodules think in terms of inherited status, family honor, obligation, patronage, and dynastic ambition; rivalries between bloodlines can be vicious, but threats to the family can instantly override personal disputes.`,

  matadors: 'Matadors',
  matadorsDescription: `The <b>Matadores</b> are a wandering Castilian Clan who preserve the spectacle, pageantry, and martial tradition of the old bullfighter while transforming it into a code suited to the post-Eshaton world. Traveling in brightly decorated carts from the <b>Castilian high plateau toward the African lands</b>, they seek dangerous beasts and other monstrous prey upon which to prove their courage and skill, but follow an important taboo: <b>a true Matador does not fight humans</b>. Their flamboyant clothing, theatrical bearing, and signature <b>estocs</b> can make them look almost frivolous beside harsher Clans, yet their entire identity rests on disciplined bravery, precision, reputation, and confronting lethal creatures at close quarters.`,

  flayers: 'Flayers',
  flayersDescription: `The <b>Flayers</b> are a deeply religious Purgan Clan whose beliefs center on <b>suffering, sacred blood, purification, and martyrdom</b>. They follow the teachings of a mysterious figure known as the <b>Penitent</b> and travel from village to village as itinerant preachers, often appearing gaunt, scarred, and physically abused because they deliberately subject themselves to pain as proof of faith. Flayers believe blood must be kept spiritually and physically pure; disease, parasites, anemia, and other corruptions of the body are interpreted as signs that the <b>Demiurge</b> is at work within a person, while even Flayer blood itself is collected and consumed by believers who hope it will cleanse or protect them. Their power is therefore less military than <b>charismatic and populist</b>: a Flayer who endures beating or self-inflicted torment in public can turn suffering into political theater, inspiring ordinary people to anger and even violence on their behalf—a trait represented mechanically by the <b>Martyrdom</b> Potential. This makes them both a religious movement and a dangerous social force in Purgare, where their teachings have spread well beyond the Clan itself and occasionally bring them into direct competition with the region’s dominant <b>Anabaptists</b>.`,

  adriani: 'Adriani',
  adrianiDescription: `The <b>Adriani</b> are a <b>Tech Level III</b> Clan of settlers in the <b>Adriatic Basin</b>, descended largely from Anabaptists who became exhausted by the endless war against the Jehammedans and chose surrender and coexistence instead of continuing the bloodshed. Their ancestors abandoned their old family identities, formed a new Clan, tilled the land, traded with Jehammedans, and gradually adopted many Jehammedan customs—especially their strong emphasis on family, marriage, work, and social order. That accommodation, however, created a deep <b>generational divide</b>: many older Adriani idealize Jehammedan society and want their families increasingly integrated with it, while younger Adriani often reject those expectations, resent being treated as instruments of their elders’ dream, and have begun looking back toward their Anabaptist heritage instead. Some youths even mark themselves with the distinctive <b>three-dot forehead tattoo</b>, openly signaling identification with the culture their ancestors abandoned. The result is a Clan founded on peace that is now being pulled apart from within—not primarily by an outside enemy, but by competing ideas of identity, religion, family obligation, and what the Adriani are supposed to become.`,

  romanos: 'Romanos',
  romanosDescription: `The <b>Romanos</b> are a <b>Tech Level III</b> Clan centered on <b>Roma, the Eternal City</b>, in southern Purgare, widely despised as criminals, swindlers, scavengers, and bandits living beneath the influence of more powerful Cults. From childhood many Romanos are drawn into a cycle of <b>Burn, vice, poverty, crime, and petty commerce</b>, while Apocalyptics exploit their addictions and Neolibyans purchase the artwork, relics, and cultural treasures they dig from the ruins—often for a fraction of their real value. Yet beneath this degraded reputation, Romanos culture retains strong traditions of <b>cunning, industriousness, tenacity, negotiation, and mercantile skill</b>, with individuals rising from anonymous <b>Nobodies</b> into Pushers, Soldatos, information-brokering <b>Edges</b>, and eventually territorial <b>Barons</b> who style themselves as dukes, princes, and kings over portions of Roma. They are notionally organized into large family clans, although “Romano” has increasingly become a broader label for Roma's impoverished underclass regardless of ancestry. Their greatest weakness is <b>division</b>: the Cults deliberately encourage rivalry and infighting among Romanos factions, keeping them dependent and politically harmless. Nevertheless, if an exceptional leader, a <b>Caesar</b>, could unite the feuding families, the Romanos might throw off Cult domination and become a major power in Purgare; alternatively, a sufficiently ruthless <b>Croesus</b> can simply exploit the system and become fabulously wealthy while leaving everyone else trapped within it.`,

  masai: 'Masai',
  masaiDescription: `The <b>Masai</b> are a <b>Tech Level IV African Clan of nomadic hunters and mercenaries</b> who live in and off the great jungles of northern Africa, surviving through exceptional tracking, hunting, and wilderness skills rather than agriculture or manufacturing. Because they produce little that can be traded directly for <b>Dinars</b>, many Masai earn wealth by selling what they do best: their services as professional hunters, scouts, guides, and killers of dangerous animals. Their reputation is therefore less that of a settled political power and more that of highly mobile specialists who understand terrain and predators better than almost anyone else and can turn that expertise into mercenary employment. Masai are also culturally distinct from the major African Cults because their loyalties remain primarily with their own people rather than with Neolibyan commerce or Scourger military hierarchy, even though either might hire them when skilled trackers are needed.`,

  shabath: 'Shabath',
  shabathDescription: `The <b>Shabath</b> are a <b>Tech Level V Clan of scientists, explorers, and xenobiological hunters</b> who travel the <b>Discordance Zone</b> studying the strange life spawned by the Primer and searching for a way to defeat the <b>Psychovores</b>. Their ancestors once explored Africa’s Great Lakes aboard a technologically advanced vessel called the <b>Origin</b>, until roughly five generations ago it became trapped in an expanding mass of Psychovore vegetation; forced to abandon the ship, the survivors carried away their scientific equipment and powerful devices called <b>resonators</b>. Their legendary elder <b>Magame Thorn</b> was supposedly able to hear and communicate with the Psychovores themselves, which would actually part before her, but after her death the Clan redirected much of its research toward the mysterious <b>Discordance</b>, where their resonators proved capable of repelling or manipulating newly emerging creatures.`
}

const baseClanNames = {
  de: {
    hunterGatherers: 'Jäger und Sammler',
    ...templateClanMessages,
    touloni: 'Touloni',
    sanglier: 'Sanglier',
    bordenoir: 'Bordenoir',
    resistance: 'Resistance',
    pneumancers: 'Pneumanten',
    exalters: 'Exalter',
  },
  en: {
    hunterGatherers: 'Hunter Gatherers',
    ...templateClanMessages,
    touloni: 'Touloni',
    sanglier: 'Sanglier',
    bordenoir: 'Bordenoir',
    resistance: 'Resistance',
    pneumancers: 'Pneumancers',
    exalters: 'Exalters',

    // These six descriptions are intentionally kept here as the single place
    // to replace them when source material is supplied.
    hunterGatherersDescription: 'Hunter Gatherers description',
    touloniDescription: 'Touloni description',
    sanglierDescription: 'Sanglier description',
    bordenoirDescription: 'Bordenoir description',
    resistanceDescription: 'Resistance description',
    pneumancersDescription: 'Pneumancers description',
    exaltersDescription: 'Exalters description',
  },
  fr: {
    hunterGatherers: 'Chasseurs Cueilleurs',
    ...templateClanMessages,
    touloni: 'Touloni',
    sanglier: 'Sanglier',
    bordenoir: 'Bordenoir',
    resistance: 'Résistance',
    pneumancers: 'Pneumanciens',
    exalters: 'Exaltiens',
    hunterGatherersDescription: 'Chasseurs Cueilleurs description',
    touloniDescription: 'Touloni description',
    sanglierDescription: 'Sanglier description',
    bordenoirDescription: 'Bordenoir description',
    resistanceDescription: 'Résistance description',
    pneumancersDescription: 'Pneumanciens description',
    exaltersDescription: 'Exaltiens description',
  }
}

const baseClanRanks = {
  de: {
    'hunterGatherers-scout': 'Späher',
    'hunterGatherers-hunter': 'Jäger',
    'hunterGatherers-gatherer': 'Sammler',
    'hunterGatherers-tribalWarrior': 'Stammeskrieger',
    'hunterGatherers-shaman': 'Schamane',
    'hunterGatherers-champion': 'Champion',
    'hunterGatherers-chieftain': 'Häuptling',
    'hunterGatherers-founder': 'Klanvater',

    'touloni-chiot': 'Chiot',
    'touloni-beauMonde': 'Beau Monde',
    'touloni-marin': 'Marin',
    'touloni-officier': 'Officier',
    'touloni-artisan': 'Artisan',
    'touloni-dignitaire': 'Dignitaire',
    'touloni-ancien': 'Ancien',
    'touloni-patriarche': 'Patriarche',

    'sanglier-baisse': 'Baisse',
    'sanglier-sang': 'Sang',
    'sanglier-veine': 'Veine',
    'sanglier-os': 'Os',
    'sanglier-vertebre': 'Vertèbre',
    'sanglier-ventricule': 'Ventricule',
    'sanglier-neurone': 'Neurone',
    'sanglier-cerveau': 'Cerveau',

    'bordenoir-mouton': 'Mouton',
    'bordenoir-capricorne': 'Capricorne',
    'bordenoir-faucon': 'Faucon',
    'bordenoir-mineur': 'Mineur',
    'bordenoir-moniteur': 'Moniteur',
    'bordenoir-colonel': 'Colonel',
    'bordenoir-poing': 'Poing',
    'bordenoir-crane': 'Crâne',

    'resistance-cadet': 'Cadet',
    'resistance-chasseur': 'Chasseur',
    'resistance-gendarme': 'Gendarme',
    'resistance-commandant': 'Commandant',
    'resistance-savant': 'Savant',
    'resistance-général': 'Général',
    'resistance-maréchal': 'Maréchal',
    'resistance-grandSavant': 'Grand Savant',

    'pneumancers-picker': 'Sammler',
    'pneumancers-smogger': 'Smogger',
    'pneumancers-boiler': 'Heizer',
    'pneumancers-assembler': 'Fertiger',
    'pneumancers-rigger': 'Rigger',
    'pneumancers-herald': 'Herold',
    'pneumancers-warcrafter': 'Kriegswerker',
    'pneumancers-engine': 'Triebwerk',

    'exalters-imperfect': 'Imperfect',
    'exalters-solemn': 'Solemn',
    'exalters-benign': 'Benign',
    'exalters-vigil': 'Vigil',
    'exalters-ariadne': 'Ariadne',
    'exalters-imperative': 'Imperative',
    'exalters-zodiac': 'Zodiac',
    'exalters-concordant': 'Concordant'
  },
  en: {
    'hunterGatherers-scout': 'Scout',
    'hunterGatherers-hunter': 'Hunter',
    'hunterGatherers-gatherer': 'Gatherer',
    'hunterGatherers-tribalWarrior': 'Tribal Warrior',
    'hunterGatherers-shaman': 'Shaman',
    'hunterGatherers-champion': 'Champion',
    'hunterGatherers-chieftain': 'Chieftain',
    'hunterGatherers-founder': 'Founder',

    'touloni-chiot': 'Chiot',
    'touloni-beauMonde': 'Beau Monde',
    'touloni-marin': 'Marin',
    'touloni-officier': 'Officier',
    'touloni-artisan': 'Artisan',
    'touloni-dignitaire': 'Dignitaire',
    'touloni-ancien': 'Ancien',
    'touloni-patriarche': 'Patriarche',

    'sanglier-baisse': 'Baisse',
    'sanglier-sang': 'Sang',
    'sanglier-veine': 'Veine',
    'sanglier-os': 'Os',
    'sanglier-vertebre': 'Vertèbre',
    'sanglier-ventricule': 'Ventricule',
    'sanglier-neurone': 'Neurone',
    'sanglier-cerveau': 'Cerveau',

    'bordenoir-mouton': 'Mouton',
    'bordenoir-capricorne': 'Capricorne',
    'bordenoir-faucon': 'Faucon',
    'bordenoir-mineur': 'Mineur',
    'bordenoir-moniteur': 'Moniteur',
    'bordenoir-colonel': 'Colonel',
    'bordenoir-poing': 'Poing',
    'bordenoir-crane': 'Crâne',

    'resistance-cadet': 'Cadet',
    'resistance-chasseur': 'Chasseur',
    'resistance-gendarme': 'Gendarme',
    'resistance-commandant': 'Commandant',
    'resistance-savant': 'Savant',
    'resistance-général': 'Général',
    'resistance-maréchal': 'Maréchal',
    'resistance-grandSavant': 'Grand Savant',

    'pneumancers-picker': 'Picker',
    'pneumancers-smogger': 'Smogger',
    'pneumancers-boiler': 'Boiler',
    'pneumancers-assembler': 'Assembler',
    'pneumancers-rigger': 'Rigger',
    'pneumancers-herald': 'Herald',
    'pneumancers-warcrafter': 'Warcrafter',
    'pneumancers-engine': 'Engine',

    'exalters-imperfect': 'Imperfect',
    'exalters-solemn': 'Solemn',
    'exalters-benign': 'Benign',
    'exalters-vigil': 'Vigil',
    'exalters-ariadne': 'Ariadne',
    'exalters-imperative': 'Imperative',
    'exalters-zodiac': 'Zodiac',
    'exalters-concordant': 'Concordant',

    'hunterGatherers-scoutDescription': 'Young and agile, these small-statured individuals weave through a maze of tunnels and narrow passages. Obstacles littering their path do not slow them down. They observe enemy movements and relay this information to the Clan.<br/><br/><b>REQUIREMENTS:</b> -<br/><b>RESULT:</b> The Scout monitors enemies and keeps watch over the Clan\'s territorial boundaries. They gain <b>+1D</b> to all attack rolls when protecting the Clan.<br/><b>EQUIPMENT:</b> Primitive club; sling; if Tech Level >II, musket or flintlock pistol.',
    'hunterGatherers-hunterDescription': 'They track deer and other wild animals over long distances, waiting for the prey to exhaust itself before delivering the killing blow. These expeditions into the wilds involve days spent following tracks or lying in patient wait. The Hunter\'s return—game in hand—is always fervently celebrated by their kin.<br/><br/><b>REQUIREMENTS:</b> <b>BOD+STAMINA</b> 4 ; <b>AGI+PROJECTILES</b> 6 ; <b>INS+SURVIVAL</b> 6<br/><b>RESULT:</b> While on their Clan\'s lands, the Hunter gains <b>+2D</b> on hunting expeditions. Their mastery of the natural environment is remarkable(<b>+2D</b> to <b>AGI+STEALTH</b>).<br/><b>EQUIPMENT:</b> Traps; spear; bow or, if Tech Level >III, hunting rifle',
    'hunterGatherers-gathererDescription': 'Each season, they know which plants are bearing fruit and how to prepare them. They are also usually responsible for looking after and educating the clan\'s youngest members.<br/><br/><b>REQUIREMENTS:</b> <b>CHA+NEGOTIATION</b> 4 ; <b>CHA+CONDUCT</b> 6 ; <b>INS+ORIENTEERING</b> 6<br/><b>RESULT:</b> The Gatherer has mastered the territory, its plant resources, and its natural rhythms (<b>+2D</b> for foraging for berries and roots) and knows the right time to trade with traveling merchants. Their diplomatic skills help defuse tensions between neighboring clans.<br/><b>EQUIPMENT:</b> Standard leather maps (<b>+1D</b> to <b>INS+ORIENTEERING</b>)',
    'hunterGatherers-tribalWarriorDescription': 'Gendos prowl the ruins, driven by a desire to destroy the weakest members of opposing clans. Outlaws and rival clans fight tooth and nail for every scrap of sustenance. Warriors stand as the bulwark between their people and a hostile world. Once focused primarily on securing food, they now dedicate their entire lives to the art of war.<br/><br/><b>REQUIREMENTS:</b> <b>BOD+MELEE</b> 8; <b>AGI+PROJECTILES</b> 6; <b>BOD+BRAWL</b> 7 or, if Tech Level >2, <b>AGI+CRAFTING</b> 7; <b>RENOWN</b> 3<br/><b>RESULT:</b> Within a warrior clan, the Tribal Warrior gains +2 <b>AUTHORITY</b>. Fed by Gatherers and Hunters, he trains daily in combat alongside his brothers-in-arms. At higher Tech Levels, he takes on the roles of technician and military instructor.<br/><b>EQUIPMENT:</b> Sword or other melee weapon; at Tech Level >III, automatic or pump-action rifle',
    'hunterGatherers-shamanDescription': 'The brutality of the world is a fact of life. Yet, some individuals are not built to take part in it. They prefer to explore the depths of the human condition, deciphering signs in the clouds or in a heap of bones. This unique sensitivity awakens the shamanic gift within them. Using plants and animal materials, they craft remedies that accelerate healing or restore vigor. They embody the deep soul of the clan.<br/><br/><b>REQUIREMENTS:</b> <b>CHA+NEGOTIATION</b> 7; <b>INT+LEGENDS</b> 8; <b>INS+EMPATHY</b> 7; <b>SECRETS</b> 3<br/><b>RESULT:</b> The Shaman confronts destiny to safeguard the Clan. They sanctify talismans, bind ancestral spirits and divine powers into tattoos (granting <b>+1D</b> to <b>PHY+FAITH</b>), and ritually prepare warriors for the prospect of death. At a Technological Level >2, the Shaman becomes a Sage, the guardian of legal memory and the enforcer of clan rules (<b>+2D</b> to <b>INT+LEGENDS</b>).<br/><b>EQUIPMENT:</b> Bone necklaces; talismans; oracle stones; at Tech Level > II, books of law, contracts, and the Clan\’s mark in iron or stone',
    'hunterGatherers-championDescription': 'Dozens of battles led at the head of the clan; every confrontation won through physical might and tactical brilliance. A revered warrior figure, he embodies strength and self-mastery in their purest forms. Should he pass on to the Father of All Things, his descendants would honor him with offerings and keep the memory of his great deeds alive.<br/><br/><b>REQUIREMENTS:</b> <b>PHY+FORCE</b> 8 ou <b>CHA+ARTS</b> 8 ; Combat Skill (<b>BOD+BRAWL</b>, <b>BOD+MELEE</b>, or <b>AGI+PROJECTILES</b>) or Technology Skill (<b>INT+TECHNOLOGY</b>, <b>INT+SCIENCE</b>, or <b>INT+ARTIFACT KNOWLEDGE</b>) 10; <b>RENOWN</b> 6<br/><b>RESULT:</b> In primitive clans, only might and cunning determine rank. Those who excel and tip the scales toward victory attain the status of Champion, etched into the collective memory. The Shaman extols the Champion’s legendary valor, and Tribal Warriors aspire to follow in his footsteps. In more advanced communities (Tech Level >2), engineers and artists can also achieve this supreme recognition and lead the clan by example. Whether primitive or scholar, the Champion has unrestricted access to the Clan’s resources.<br/><b>EQUIPMENT:</b> -',
    'hunterGatherers-chieftainDescription': 'The path of arms leads to the summit just as surely as marriage alliances do. As a warrior, he surpassed his peers, capable of felling the most formidable adversary with a single blow. As a shaman, he demonstrated wisdom and foresight, opening the clan to spiritual and religious dimensions. Now at the head of his clan, it falls to him to lead his people. None shall publicly oppose his decisions.<br/><br/><b>REQUIREMENTS:</b> The current Chieftain must step down; <b>AUTHORITY</b> 5; <b>ALLIES</b> 5; <b>RESOURCES</b> 3<br/><b>RESULT:</b> Whether former warrior or spiritual guide, the Chieftain continues his journey as the sole embodiment of power. He leads military campaigns or strengthens ties with neighbors while developing the settlement.<br/><b>EQUIPMENT:</b> The Clan\’s preferred weapon, upgraded once; the symbol of his rule is a headdress, mask, helmet, or armor, and a signet ring',
    'hunterGatherers-founderDescription': 'His ability to envision the future in its entirety always set him apart. Through ingenuity and diplomacy, he rallied others to his cause; one by one, scattered clans eventually joined him. He gathered the fragmented pieces and united the majority of them: a new clan emerged. To its members, he is father, brother, priest, and leader all at once.<br/><br/><b>REQUIREMENTS:</b> Unified families to form a Clan. <b>CHA+LEADERSHIP</b> 10 ; <b>CHA+CONDUCT</b> 10 or <b>PSY+DOMINATION</b> 10 ; <b>AUTHORITY</b> 6<br/><b>RESULT:</b> Whether through force of arms or negotiation, the Founder has united several Clans, created a cultural fusion, and forged a lasting alliance. A new Clan is born. The Founder wields influence that places him at odds with established Cults. Everyone seeks to approach him, from diplomats to assassins. A single decision of his can upend balances of power that have held firm for generations.<br/><b>EQUIPMENT:</b> The symbol of his rule is a special weapon or a sacred object.',
  },
  fr: {
    'hunterGatherers-scout': 'Éclaireurs',
    'hunterGatherers-hunter': 'Chasseur',
    'hunterGatherers-gatherer': 'Cueilleur',
    'hunterGatherers-tribalWarrior': 'Guerrier Tribal',
    'hunterGatherers-shaman': 'Chaman',
    'hunterGatherers-champion': 'Champion',
    'hunterGatherers-chieftain': 'Chef',
    'hunterGatherers-founder': 'Fondateur',
    'touloni-chiot': 'Chiot',
    'touloni-beauMonde': 'Beau Monde',
    'touloni-marin': 'Marin',
    'touloni-officier': 'Officier',
    'touloni-artisan': 'Artisan',
    'touloni-dignitaire': 'Dignitaire',
    'touloni-ancien': 'Ancien',
    'touloni-patriarche': 'Patriarche',
    'sanglier-baisse': 'Baisse',
    'sanglier-sang': 'Sang',
    'sanglier-veine': 'Veine',
    'sanglier-os': 'Os',
    'sanglier-vertebre': 'Vertèbre',
    'sanglier-ventricule': 'Ventricule',
    'sanglier-neurone': 'Neurone',
    'sanglier-cerveau': 'Cerveau',
    'bordenoir-mouton': 'Mouton',
    'bordenoir-capricorne': 'Capricorne',
    'bordenoir-faucon': 'Faucon',
    'bordenoir-mineur': 'Mineur',
    'bordenoir-moniteur': 'Moniteur',
    'bordenoir-colonel': 'Colonel',
    'bordenoir-poing': 'Poing',
    'bordenoir-crane': 'Crâne',
    'resistance-cadet': 'Cadet',
    'resistance-chasseur': 'Chasseur',
    'resistance-gendarme': 'Gendarme',
    'resistance-commandant': 'Commandant',
    'resistance-savant': 'Savant',
    'resistance-général': 'Général',
    'resistance-maréchal': 'Maréchal',
    'resistance-grandSavant': 'Grand Savant',
    'pneumancers-picker': 'Picker',
    'pneumancers-smogger': 'Smogger',
    'pneumancers-boiler': 'Boiler',
    'pneumancers-assembler': 'Assembler',
    'pneumancers-rigger': 'Rigger',
    'pneumancers-herald': 'Herald',
    'pneumancers-warcrafter': 'Warcrafter',
    'pneumancers-engine': 'Engine',
    'exalters-imperfect': 'Imperfect',
    'exalters-solemn': 'Solemn',
    'exalters-benign': 'Benign',
    'exalters-vigil': 'Vigil',
    'exalters-ariadne': 'Ariadne',
    'exalters-imperative': 'Imperative',
    'exalters-zodiac': 'Zodiac',
    'exalters-concordant': 'Concordant',
    'hunterGatherers-scoutDescription': `Jeunes et agiles, ces individus de petite stature se faufilent à travers un dédale de tunnels et de passages étroits. Les obstacles jonchant leur chemin ne les ralentissent pas. Ils observent les mouvements adverses et transmettent ces informations au Clan.<br/><br/><b>CONDITION</b> : -<br/><b>EFFET</b> : l'Éclaireur surveille les ennemis et veille sur les limites territoriales du Clan. Il bénéficie de <b>+1D</b> à tous les jets d'attaque lorsqu'il protège le Clan.<br/>ÉQUIPEMENT : masse primitive ; fronde ; si Niveau technologique >2, révolver simple`,
    'hunterGatherers-hunterDescription': `Ils pistaient chevreuils et ruminants sauvages sur de longues distances, attendant leur épuisement avant de porter le coup fatal. Des expéditions de plusieurs jours dans les terres désolées, à suivre les traces ou à guetter patiemment. Le retour du Chasseur, gibier en main, est toujours célébré avec ferveur par les siens.<br/><br/><b>CONDITION</b> : <b>PHY+VIGUEUR</b> 4 ; <b>AGI+ARMES À PROJECTILES</b> 6 ; <b>INS+SURVIE</b> 6<br/><b>EFFET</b> : sur les terres de son Clan, le Chasseur gagne <b>+2D</b> lors de ses expéditions de chasse. Sa maîtrise de l'environnement naturel est remarquable (<b>+2D</b> à <b>AGI+FURTIVITÉ</b>).<br/>ÉQUIPEMENT : pièges ; lance ; arc ou, si Niveau technologique >3, fusil de chasse`,
    'hunterGatherers-gathererDescription': `Chaque saison, ils savent quelles plantes fructifient et comment les préparer. Ils assurent également, le plus souvent, la garde et l'éducation des plus jeunes membres du clan.<br/><br/><b>CONDITION</b> : <b>CHA+NÉGOCIATION</b> 4 ; <b>CHA+CONSIDÉRATION</b> 6 ; <b>INS+ORIENTATION</b> 6<br/><b>EFFET</b> : le Cueilleur maîtrise le territoire, ses ressources végétales et ses rythmes naturels (<b>+2D</b> pour la recherche de baies et de racines) et sait identifier le bon moment pour commercer avec les marchands itinérants. Leurs aptitudes diplomatiques apaisent les tensions entre Clans voisins.<br/>ÉQUIPEMENT : cartes en cuir ordinaires (<b>+1D</b> à <b>INS+ORIENTATION</b>)`,
    'hunterGatherers-tribalWarriorDescription': `Les gendos rôdent parmi les décombres, animés d'une volonté de détruire les plus faibles du clan adverse. Hors-la-loi et clans rivaux s'arrachent chaque ressource de subsistance. Les Guerriers constituent le rempart entre les leurs et un monde hostile. Autrefois préoccupés avant tout par la survie alimentaire, ils consacrent désormais leur existence entière au métier des armes.<br/><br/><b>CONDITION</b> : <b>PHY+CORPS À CORPS</b> 8 ; <b>AGI+ARMES À PROJECTILES</b> 6 ; <b>PHY+LUTTE</b> 7 ou si Niveau technologique >2 <b>AGI+ARTISANAT</b> 7 ; <b>RENOMMÉE</b> 3<br/><b>EFFET</b> : au sein d'un Clan guerrier, le Guerrier Tribal gagne +2 <b>AUTORITÉ</b>. Nourri par Cueilleurs et Chasseurs, il s'entraîne quotidiennement au combat avec ses frères d'armes. À un niveau technologique supérieur, il endosse les fonctions de technicien et d'instructeur militaire.<br/>ÉQUIPEMENT : épée ou autre arme de Corps à corps ; à un Niveau technologique >3, fusil automatique ou à pompe`,
    'hunterGatherers-shamanDescription': `La brutalité du monde est une évidence. Mais certains individus ne sont pas façonnés pour y participer. Ils préfèrent explorer les tréfonds de la condition humaine, déceler des signes dans les nuages ou dans un amoncellement d'os. Cette sensibilité particulière éveille en eux le don chamanique. Ils élaborent, à partir de plantes et de matières animales, des remèdes qui accélèrent la guérison ou restaurent la vigueur. Ils constituent l'âme profonde du clan.<br/><br/><b>CONDITION</b> : <b>CHA+NÉGOCIATION</b> 7 ; <b>INT+LÉGENDES</b> 8 ; <b>INS+EMPATHIE</b> 7 ; <b>SECRETS</b> 3<br/><b>EFFET</b> : le Chaman affronte le destin pour préserver son Clan. Il sanctifie les talismans, emprisonne les esprits ancestraux et les puissances divines dans des tatouages (conférant <b>+1D</b> à <b>PSY+FOI</b>), et prépare rituellement les guerriers à l'éventualité de la mort. À un Niveau technologique >2, le Chaman devient Sage, garant de la mémoire juridique et de l'application des règles claniques (<b>+2D</b> à <b>INT+LÉGENDES</b>).<br/>ÉQUIPEMENT : colliers d'os ; talismans ; pierres divinatoires ; à un Niveau technologique >2, livres de loi, contrats, marque du Clan sur du fer ou de la pierre`,
    'hunterGatherers-championDescription': `Des dizaines de batailles à la tête du clan, chaque confrontation remportée par la puissance physique et l'intelligence tactique. Figure guerrière vénérée, il incarne la force et la maîtrise de soi dans leur expression la plus pure. S'il devait rejoindre le Père de toute chose, ses descendants lui offriraient des offrandes et perpétueraient le souvenir de ses hauts faits.<br/><br/><b>CONDITION</b> : <b>PHY+FORCE</b> 8 ou <b>CHA+ART</b> 8 ; Compétence de Combat (<b>PHY+LUTTE</b>, <b>PHY+CORPS À CORPS</b> ou <b>AGI+ARMES À PROJECTILES</b>) ou de Technologie (<b>INT+TECHNOLOGIE</b>, <b>INT+SCIENCE</b> ou <b>INT+CONNAISSANCE DES ARTEFACTS</b>) 10 ; <b>RENOMMÉE</b> 6<br/><b>EFFET</b> : dans les Clans primitifs, seules la puissance et l'astuce déterminent le rang. Ceux qui excellent et font pencher la balance vers la victoire accèdent au statut de Champion, gravé dans la mémoire collective. Le Chaman exalte la valeur légendaire du Champion, et les Guerriers Tribaux aspirent à marcher dans ses traces. Dans les communautés plus développées (Niveau technologique >2), ingénieurs et artistes peuvent également atteindre cette reconnaissance suprême et guider le clan par l'exemple. Primitif ou érudit, le Champion dispose sans restriction des ressources du Clan.<br/>ÉQUIPEMENT : -`,
    'hunterGatherers-chieftainDescription': `La voie des armes mène au sommet avec autant de certitude que les alliances matrimoniales. En tant que guerrier, il surpassa ses pairs, capable de terrasser le plus redoutable de ses adversaires d'un seul coup. En tant que chaman, il fit la preuve de sa sagesse et de sa clairvoyance, ouvrant le clan aux dimensions spirituelles et religieuses. Désormais à la tête de son clan, il lui appartient de conduire les siens. Nul ne s'opposera publiquement à ses décisions.<br/><br/><b>CONDITION</b> : Le Chef actuel doit laisser sa place ; <b>AUTORITÉ</b> 5 ; <b>ALLIÉS</b> 5 ; <b>RESSOURCES</b> 3<br/><b>EFFET</b> : ancien guerrier ou guide spirituel, le Chef continue son parcours en tant que seule incarnation du pouvoir. Il dirige des campagnes militaires ou consolide les liens avec les voisins tout en développant l'établissement.<br/>ÉQUIPEMENT : l'arme préférée du Clan, améliorée une fois ; le symbole de son règne est une coiffe, un masque, un casque ou une armure et une chevalière`,
    'hunterGatherers-founderDescription': `Sa capacité à envisager l'avenir dans sa globalité le distingua toujours. Par l'ingéniosité et la diplomatie, il rallia d'autres à sa cause et, clan dispersé après clan dispersé, tous finirent par le rejoindre. Il rassembla les fragments épars et en assembla la majeure partie : un nouveau clan émergea. Pour ses membres, il est à la fois père, frère, prêtre et chef.<br/><br/><b>CONDITION</b> : a unifié les familles pour former un Clan. <b>CHA+COMMANDEMENT</b> 10 ; <b>CHA+CONSIDÉRATION</b> 10 ou <b>PSY+DOMINATION</b> 10 ; <b>AUTORITÉ</b> 6<br/><b>EFFET</b> : par les armes ou la négociation, le Fondateur a fédéré plusieurs Clans, créé une fusion culturelle et tissé une alliance durable. Un nouveau Clan est né. Le Fondateur exerce ainsi une influence qui le place en opposition aux Cultes en place. Tout le monde cherche à l'approcher, qu'il s'agisse de diplomates ou d'assassins. Chacune de ses décisions peut ébranler des équilibres établis depuis des générations.<br/>ÉQUIPEMENT : le symbole de son règne est une arme spéciale ou un objet sacré.`,
  }
}

const HUNTER_GATHERER_TEMPLATE_CLANS = [
  'cockroaches',
  'mechans',
  'phosphorites',
  'enemoi',
  'stukovNomads',
  'storskis',
  'corpseEaters',
  'garganti',
  'voivodules',
  'matadors',
  'flayers',
  'adriani',
  'romanos',
  'masai',
  'shabath'
]

function cloneRankTranslations(
  sourceClan: string,
  targetClans: string[],
  translations: Record<string, string>
): Record<string, string> {
  const result: Record<string, string> = {}
  const prefix = `${sourceClan}-`

  for (const [key, value] of Object.entries(translations)) {
    if (!key.startsWith(prefix)) continue
    const suffix = key.slice(prefix.length)
    for (const targetClan of targetClans) {
      result[`${targetClan}-${suffix}`] = value
    }
  }

  return result
}

function buildHunterGathererAliases(translations: Record<string, string>) {
  return cloneRankTranslations(
    'hunterGatherers',
    HUNTER_GATHERER_TEMPLATE_CLANS,
    translations
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Detailed Clan message bundles
// ─────────────────────────────────────────────────────────────────────────────

const stukovClans = {
  stukov: 'Stukov',
  stukovDescription: `The <b>Stukov</b> are divided into countless family trees and are deeply embedded into the structure of Justitian, nurturing solid relationships with its leaders, the Judges. Characters from this Clan are silver tongued and have sharp wits, giving Players strong opportunities for dealing with Uptown and the Judiciary, along with the larger population in general. <b>Stukov characters in Justitian gain +1 to their Network Background while in the city.</b>`
}

const stukovRanks = {
  'stukov-citizen': 'Citizen',
  'stukov-citizenDescription': `The Stukov have been molded over time to become the perfect members of Justitian’s society, and as such the vast majority of them are citizens by birthright.<br/><br/><b>PREREQUISITE:</b> -<br/><b>RESULT:</b> They gain access to Uptown, where they can brush shoulders with the Judges and other members of the upper class, and are exempt from the 20% guest tax on purchases.<br/><b>EQUIPMENT:</b> Citizenship papers; Stukov trinkets (Talisman, +1D PSY+Faith/Willpower)`,
  'stukov-factotum': 'Factotum',
  'stukov-factotumDescription': `A Stukov enters adulthood running odd jobs, serving as a trusted courier between the Advocate Houses of his district, working as a waterbearer, guild apprentice, city guide, or generalist artisan. If he displays talent and punctuality, his customers begin remembering his name and the steep climb through the social hierarchy begins. If he lands an apprenticeship with a local guild at the Old Fortress, he’ll be introduced into the intricacies of their draughtsmanship: delicate carvings, intricately designed fabrics, finely wrought metalworks; the Stukov are known for their craft in a vast array of disciplines, and have been for generations.<br/><br/><b>PREREQUISITE:</b> AGI+Crafting 6, CHA+Arts 6, CHA+Conduct 5<br/><b>RESULT:</b> The Factotum continues this great tradition in his own way, choosing a particular trade to make his own specialty, gaining +1D to all AGI+Crafting or CHA+Arts rolls related to carrying it out. Additionally, he adds +1 to his Network Background, as he develops a web of clients throughout the city.<br/><b>EQUIPMENT:</b> Permission waiver allowing the Factotum to sell their goods on the Forecourt, following approval from the Office of Certification; Small workshop in the Stukov Quarter loaned from a family member.`,
  'stukov-quartermaster': 'Quartermaster',
  'stukov-quartermasterDescription': `A city as large as Justitian requires all kinds of administration, or the colossal distribution network that keeps it alive would collapse within a week's time. That’s where specialized Quartermasters take over as public functionaries, overseeing the dispersal of goods across the districts, measuring the daily consumption of water from the Public Wells, inspecting the food quality on the Civic Markets, or ordering the construction of salt containers across Downtown.<br/><br/><b>PREREQUISITE:</b> CHA+Leadership 5D, INT+Science 6D, PSY+Cunning 5D<br/><b>RESULT:</b> The Quartermasters file their pedantic reports to the Offices in Uptown, and often use the opportunity to snitch on rivals, gaining access to privileges in return: from tax cuts to cheaper asking prices for real estate. If a Quartermaster plays their game right, they can begin to amass square footage after square footage of rental space, extrapolating their income streams. The Judges turn a blind eye. It’s to be expected.<br/><b>EQUIPMENT:</b> Register of food and water stores across the city; Papers permitting them to requisition a team of 1D workers for essential tasks; Ability to acquire real estate from Urbanists, giving them +1 Resources per 1000 Drafts spent, to a maximum of 4.`,
  'stukov-firewatch': 'Fire Watch',
  'stukov-firewatchDescription': `The Sprenger family tree is one of the premier bloodlines to offer their sons and daughters to the service, and joining the Fire Watch is somewhat of a tradition among Stukov who are physically capable and protective of their home. Members are on call at all times, working tirelessly across the city, extinguishing flames and rescuing lives, rushing into danger night after night to keep the population safe.<br/><br/><b>PREREQUISITE:</b> BOD+Force 7, BOD+Toughness 7, CHA+Conduct 6<br/><b>RESULT:</b> Pass grueling tests, and you're accepted into this elite force - but that’s just the beginning. Now it’s time to prove yourself to your peers and superiors, learn on the job, and climb the peculiar organization on your own. Lone wolves better fuck off: if a squad doesn’t work together perfectly, people die.<br/><b>EQUIPMENT:</b> Fire Watch uniform and firefighting equipment (Fire ax, water hose, dust bucket); Rank badge (novice, linebacker, Officer); Monthly salary (novice: 5 Drafts/day, linebacker: 20 Drafts/day, Officer: 50 Drafts/day); Daily rations`,
  'stukov-guildleader': 'Guild Leader',
  'stukov-guildleaderDescription': `Talent, discipline, specialization, and tedious effort turn a Factotum into a master over time. Once the laborers of the Stukov conglomerate in one of the great crafting guilds, their voices begin to influence the political landscape of Uptown, establishing price binding for public goods and pushing competitors out of the civic districts.<br/><br/><b>PREREQUISITE:</b> AGI+Crafting 8, CHA+Arts 8, CHA+Leadership 6, Authority 4<br/><b>RESULT:</b> Each of these guilds has a Guild Leader at its helm, oftentimes the most skilled or storied member, who is renowned throughout the city as a master of their art. As such they gain +2 Renown, and a growing following of other artisans and craftsmen.<br/><b>EQUIPMENT:</b> Ornate seal of their guild; Keys to a workshop of their discipline in the Old Fortress; High quality tools of their trade, recipes and blueprints, as well as books compiling theoretical knowledge (+1D to AGI+Crafting rolls)`,
  'stukov-urbanist': 'Urbanist',
  'stukov-urbanistDescription': `With hundreds of thousands calling it home, Justitian has a constant need for new living spaces to place its steadily blossoming population. The task of managing this demand falls to the Urbanists, real-estate brokers who have accumulated several swathes of lucrative rental space, from shops leased along the Stallion Streets, to highly coveted guest rooms on the Forecourt. With lease money flowing in from multiple sources, their appetites grow for owning even more land, thereby enforcing their iron grip on the populace of the city, controlling who is allowed to live where, and gaining permission to grant and deny purchases and evict uncooperative tenants - or just those they dislike. However, they must play it safe. Kicking out a Protector’s wife and child from their abode in the Stukov Quarter can backfire quickly.<br/><br/><b>PREREQUISITE:</b> Network 4, Resources 4, PSY+Cunning 6<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Deeds to a number properties across Justitian equal to their Resources Background, which may be rented out as they please. They gain +500 CD per month from each, however they also take on the responsibility to keep them at least somewhat maintained: should their Resources ever fall below (2), the Department of Urban Development will expropriate them`,
  'stukov-deputy': 'Deputy',
  'stukov-deputyDescription': `A Deputy has ascended to one of the most critical positions in Justitian, the highest level any of their Clan is likely to climb in the bureaucratic labyrinth of Uptown. Deputies work in line with the Offices, dictating the lives of every single person living within the limits of the city, collecting reports from Quartermasters and negotiating with city officials and Advocates alike on the development of civil legislature.<br/><br/><b>PREREQUISITE:</b> CHA+Negotiation 8, INT+Legends 7, PSY+Cunning 7<br/><b>RESULT:</b> Deputies gain the ability to apply their Authority Background to all citizens of Justitian, and can also influence other members of their Office for favourable outcomes or legal changes by spending the appropriate Background Points.<br/><b>EQUIPMENT:</b> Signet ring of the Officials; Official uniform (+1D to interactions with citizens)`,
  'stukov-partisan': 'Partisan',
  'stukov-partisanDescription': `A Deputy has ascended to one of the most critical positions in Justitian, the highest level any of their Clan is likely to climb in the bureaucratic labyrinth of Uptown. Deputies work in line with the Offices, dictating the lives of every single person living within the limits of the city, collecting reports from Quartermasters and negotiating with city officials and Advocates alike on the development of civil legislature.<br/><br/><b>PREREQUISITE:</b> Age &gt; 60, CHA+Leadership 10, INT+Legends 8, Authority 5<br/><b>RESULT:</b> Despite their lack of real power, the Partisans’ voices still carry some weight: they gain +1 Authority and +2D on rolls to command other Stukov.<br/><b>EQUIPMENT:</b> The Mark of Stukov, a finely crafted disk bearing the symbol of their Clan’s founder, passed down for centuries`
}

const stukovPotentials = {
  culturalMemory: 'Cultural Memory',
  culturalMemoryDescription: `While the Stukov have suffered under centuries of oppression attempting to smother their ancestral heritage, the roots of their past are still buried deep.<br/><br/><b>RESULT:</b> They add +1D per Potential Level to <b>INT+Legends</b> rolls concerning the historical and geographical features of the Black Lung, and <b>INS+Orienteering</b> rolls when traveling in the region.`
}

const brenniClans = {
  brenni: 'Brenni',
  brenniDescription: `Characters from the <b>Brenni Clan</b> ride the line between civil society and the dark underworld of Justitian, and give an inroad for Players and their groups into the murky criminal networks of the city. They have some talent as healers, but their real value comes from their other skills, whether it’s their social maneuverability or their aptitude for creating deadly poisons. <b>While in Justitian, Brenni can apply their Allies Background to any of the city’s criminal elements - Carrion Birds, Cartel, or anyone else staying under the Judges’ radar.</b>`
}

const brenniRanks = {
  'brenni-aide': 'Aide',
  'brenni-aideDescription': `They scurry about between the legs of the more experienced members of their Clan, rushing to and fro to bring reagents, herbs, chemicals, or medical supplies to their betters. They are apprenticed to a higher ranking Brenni, and they’d better learn quickly in order to make themselves useful.<br/><br/><b>PREREQUISITE:</b> -<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Small notebook which is to be filled with recipes and notes from their mentor; Basic healing herbs for practice (+1D to INT+Medicine, single use).`,
  'brenni-guru': 'Guru',
  'brenni-guruDescription': `While they are yet to master the art of healing, still unable to mix together herbs and concoctions to create the miracle cures of the Alchemists, they have been able to extensively study and practise the crafts of physiotherapy, acupuncture, and more. Extensive knowledge of human anatomy allows them to fix a patient's inflamed tendons, relieve them from a lumbago, or increase their general mobility. Gurus provide first aid, give medical or nutritional advice, and release organic tissue from pain and stress.<br/><br/><b>PREREQUISITE:</b> INT+Medicine 6, INT+Science 5, INS+Perception 6<br/><b>RESULT:</b> Once a Guru begins making their first forays into the underground, they gain +1 Network related to Justitian’s underworld.<br/><b>EQUIPMENT:</b> Texts detailing the pressure points, energy paths, and chakras of the human body, giving them +1D to CHA+Expression or INT+Medicine when using those facts to heal a patient.`,
  'brenni-brewer': 'Brewer',
  'brenni-brewerDescription': `The Brewers of Brennen are some of the best in their field, and their spirits are famed among the people of the Protectorate. They have been able to land a job at a distillery or brewery in Justitian, and quickly find the Judges and other members of high society amongst their clientele. The Anabaptists, on the other hand, don’t yet know if they should consider the Brewers of Brennen as rivals or drinking buddies. Whatever the case, as a Brewer the Brenni can acquire some of the rarest spices to upgrade his brandies and liqueurs with goods normally unavailable on the civic markets; a special permit allows him to import uncertified stimulants from places like Liqua and out of the Jehammedan Quarter.<br/><br/><b>PREREQUISITE:</b> INT+Science 7, CHA+Arts 6, CHA+Conduct 5<br/><b>RESULT:</b> His newfound influence catapults him into Uptown and grants citizenship: he gains +1 Network point related to Justitian’s upper class.<br/><b>EQUIPMENT:</b> Citizenship papers; A bottle of the alcohol produced by his workplace.`,
  'brenni-toxician': 'Toxician',
  'brenni-toxicianDescription': `Once a Brenni continues on his journey into the shadows of the Clan, his work moves from the open street into the hidden back rooms and underground laboratories, where he hones his craft in creating ever more lethal concoctions and poisons for his more sinister clients. Toxicians require a spotless network of suppliers, often using Brewers as frontmen to gain access to chemical substances otherwise unavailable to them. Additionally, their expanded network allows them to import potent toxins via Justitian’s many black markets and have these caches stashed in secret locations across the city. A secret tattoo, featuring a serpent encircling the moon, identifies Toxicians to one another.<br/><br/><b>PREREQUISITE:</b> INT+Science 8, BOD+Toughness 6, PSY+Cunning 7<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Keys to workshops and stores throughout Justitian; High quality herbs and chemicals (+1D to INT+Science when creating toxins).`,
  'brenni-apothecary': 'Apothecary',
  'brenni-apothecaryDescription': `The Apothecary sets himself apart from the crowd, developing his healing skills further and applying his arcane and mystical knowledge to create herbal remedies and cures that can drag heavily injured patients back from the brink of death. The Brenni is now the go-to doctor for the downtrodden and the criminals of Justitian, and he’s paid well in return - both for his services, and for his discretion.<br/><br/><b>PREREQUISITE:</b> INT+Medicine 8, INT+Legends 6<br/><b>RESULT:</b> Using their laboratories, Apothecaries gain the ability to produce a wide variety of substances with equally diverse effects. With a roll of INT+Medicine (5) they can create one dose of any standard pharmaceutical agent - stimulants, narcotics, antibiotics, and more - and for every (2) Triggers the drug’s level rises by 1.<br/><b>EQUIPMENT:</b> Extensive scriptures passed down from their ancestors on curative agents and herbal mixtures, giving them +2D to INT+Medicine; A laboratory in Brennen where they can conduct their experiments uninterrupted.`,
  'brenni-alchemist': 'Alchemist',
  'brenni-alchemistDescription': `The Brenni has been practising and studying his chosen discipline for a lifetime, and there are only a few areas that he hasn’t touched. Whether he turns his hand towards miracle cures or fatal poisons, whatever he produces is intensely effective or potentially deadly. Now he has access to the full resources of his Clan, along with the respect amongst the underground drug lords of the Cartel and the Carrion Birds. Furthermore he acts as the relay for commands issued by the secretive Meisters, calling meetings in underground halls and supposedly deserted chambers to inform the other Brenni of the contents of the messages he has received.<br/><br/><b>PREREQUISITE:</b> INT+Medicine or INT+Science 9, INT+Legends 6<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Only the Alchemists have access to the reagents and knowledge required to perform the Red Purge, an ancient technique to expunge all toxins and poisons from a body. However, it is taboo for them to accept payment in coin, only a suitable favor is permitted.`,
  'brenni-meister': 'Meister',
  'brenni-meisterDescription': `It is said they can turn lead into gold, that they were fed by their mothers with blood instead of milk, and that they can perceive the lifeline of a human being by touch alone. The Meisters work in total obscurity, blending in with the common members of the Clan in their daily lives, distributing their orders to their brethren through coded messages and dead drops. What’s known: there are seven of them at a time, with each new member chosen by the other six only if one of them steps down or passes away. They direct the Brenni in their movements, and are more essential than ever now as they struggle to maintain their identity under the heel of the Spitalians and Judges. Each Meister is an unparalleled practitioner of their hermetic lore, and whenever they command an action it is backed with ancestral power.<br/><br/><b>PREREQUISITE:</b> Secrets 5, INT+Legends 10, PSY+Cunning 10<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Keys to access the deserted dungeons of Brennen, where Brennus once performed his miracles. Now, they are used for the meetings of the Meisters.`,
  'brenni-inheritor': 'Inheritor',
  'brenni-inheritorDescription': `There can only ever be a single Inheritor. In times of great need, when the Brenni are on the brink of ruin, the Meisters gather to choose a suitable vessel for the spirit of their great ancestor, Brennus. The Inheritor imbibes an ancient mixture of potent chemicals and herbs which has been passed down through the Clan for generations, allowing him to contact and communicate with the original Founder of the Clan, receiving his instructions on the correct path through an emergency. Only three Inheritors have been chosen throughout the history of the Brenni, and each time they emerged from their spiritual journey with unearthly knowledge, cunningly navigating any obstacles in their path.<br/><br/><b>PREREQUISITE:</b> Chosen by the Meisters; Survived at least one Red Purge<br/><b>RESULT:</b> The Inheritor’s Authority, Allies, and Secrets scores can never be less than 6.<br/><b>EQUIPMENT:</b> A single vial of the ancient mixture, which wracks their body as it expands their mind, causing them to take (2) Trauma Damage; The robes of Brennus (+4D to interactions with Brenni).`
}

const brenniPotentials = {
  esotericCure: 'Esoteric Cure',
  esotericCureDescription: `The Brenni are masters of all kinds of esoteric and mystical remedies, some of which are nothing but placebos - not that the patients eagerly reaching for their wallets know that.<br/><br/><b>RESULT:</b> A roll on <b>CHA+Expression</b>, with <b>+1D per Potential Level</b>, against a target’s Mental Defense allows the Brenni to convince them of their “cure” enough to regain a single Ego Point or Flesh Wound. However, this can only be done once per day, and if a patient ever succeeds in their Mental Defense they can no longer be affected by the cure.`
}

const providersClans = {
  providers: 'Providers',
  providersDescription: `Provider characters take their place in a tight-knit family group, toughened from the labor in the fields and able to weather any sort of abuse. As characters they bring the clout of their bloodline with them into every confrontation, along with the strength that comes from heaving around heavy farming tools all day, and a knowledge of the Rubble which can’t be matched. <b>They add +1 to their Allies Background while in and around Justitian.</b>`
}

const providersRanks = {
  'providers-runner': 'Runner',
  'providers-runnerDescription': `They know how to chop off a chicken’s head, milk the cow, and mill the grains. What they lack in strength, age, or responsibility, they make up for with simple tasks, such as handling communication between the different Provider communities, rushing back and forth as messengers for their elders. In this manner, they get to know all of their relatives in the different settlements across the Rubble, and similarly they all get to know the Runner. Eventually they’ll meet their teenage sweetheart on one of the open fields this way.<br/><br/><b>PREREQUISITE:</b> -<br/><b>RESULT:</b> They add +1 to their Allies Background score.<br/><b>EQUIPMENT:</b> A good pair of boots; Messenger bag; Sketched out maps of the Rubble`,
  'providers-bruiser': 'Bruiser',
  'providers-bruiserDescription': `By now, news about the Cooperative has spread throughout Downtown. Standing up to the mighty Justitian, a group of farmers finally digging in their heels and refusing to give up another inch of the ground they fought so hard to cultivate. The organization is idolised by the Providers, even if many are still too scared of reprisal to join themselves.<br/><br/>Bruisers are the muscle of the Cooperative, showing face whenever there’s a Provider in trouble whether he’s part of their organization yet or not. A Hygienist inspecting a farm is confronted with a pair of beefy ranchers to remind him that he’s at their mercy out here. A Juryman browbeating a family into paying him a tithe is dragged into a barn and tossed out with a black eye. The Bruisers keep the parcels safe, if only as a deterrent against the abuse of power.<br/><br/><b>PREREQUISITE:</b> BOD+Melee 6 or BOD+Brawl 6, Allies 2<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Shortened farm tools (Practical enough for plausible deniability, but more effective as weapons)`,
  'providers-harvester': 'Harvester',
  'providers-harvesterDescription': `The Harvester knows his land better than any high-and-mighty doctor with a shaved head and neoprene suit ever will. He tastes the wind to predict the next dust storm rolling through, how to lay out his crops so the roots grow best, and he can tell when his donkey is about to fall ill and needs rest. He’s spent long, arduous years accumulating experience under his parents’ tutelage, and now he’s putting it to good use.<br/><br/>The bulk of the Provider population is made up of Harvesters, each of them working for their relatives throughout the seasons. Eventually, during one of the annual Harvest festivals, they and their sweetheart will finally tie the braided rope knot representing two bloodlines becoming one and enter into marriage. Now, it’s time to work on starting up a new family line.<br/><br/><b>PREREQUISITE:</b> BOD+Force 6D, BOD+Stamina 6D, INS+Survival 6D<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Donkey and cart inherited from their parents; Keys to access the communal Provider storehouses; Permission waivers to own property in the Rubble`,
  'providers-vandal': 'Vandal',
  'providers-vandalDescription': `Every movement needs its goons, but without direction the Bruisers would just aimlessly mill about without any strategy. Ardon himself can’t direct the thousands of members throughout the Rubble, and as such, a more local leadership cadre is needed. That’s where the Vandals come in.<br/><br/>They are the Cooperative’s enforcers, each tasked personally by Ardon with the goal of managing a sector of Provider territory. Within their assigned patch of land, they are the core of the group’s presence. They set targets for the Bruisers, cozy up with the local Brigadiers and Patriarchs, and get to know every Protector and Juryman assigned to the region - hunting for blackmail material. They are identified by a tattoo of the Cooperative’s crest on their forearm, a crossed cleaver and scythe.<br/><br/><b>PREREQUISITE:</b> PSY+Domination 8, CHA+Leadership 8, Authority 4<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Tattoo of the Cooperative (Talisman, +1D PSY+Faith/Willpower); Encryption key for passing messages to other Vandals`,
  'providers-supplier': 'Supplier',
  'providers-supplierDescription': `While some Providers handle the entire process of planting, harvesting, and selling their goods alone, the smart ones let the Suppliers do it. Way back in their family history, one of their ancestors was gifted to or chosen by one of the great Advocate families, or a similarly powerful group in Uptown. It was only a small interaction, but Providers take every opportunity they can get. Using their family connections they were able to sneak their way into Justitian and wrap their heads around its labyrinthine systems.<br/><br/>Now, the Suppliers use their knowledge and contacts to exploit Justitian as much as possible to make good profits for their fellow Providers, along with securing any of the resources their brethren require to keep their farms running. The other farmers simply look on in confusion and shrug - they don’t get it, but it makes them money, so who cares.<br/><br/><b>PREREQUISITE:</b> CHA+Negotiation 7D, PSY+Cunning 7D, Network 4<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> List of sellers and market stalls that are receptive to their goods; Notebook filled with notes on sales and profits`,
  'providers-brigadier': 'Brigadier',
  'providers-brigadierDescription': `While the years of turmoil following the Providers relocation into the Rubble left many of their cultural and religious frameworks battered and broken, it was the Brigadiers who were able to carry the Clan through the storm and emerge intact on the other side. They have started a family of their own, putting their offspring to work as Harvester, and using their newfound liberation from the backbreaking labor of the fields they turn their hand towards a different kind of cultivation.<br/><br/>The Brigadier has learned the basic building blocks of the Providers’ sacred rituals from his own parents as a Harvester, but only now does he fully immerse himself. He orchestrates the marriages of his children, organizes the preparations of the yearly Harvest festival, and leads the celebration of Providers who pass away. In good years the Brigadier is a symbol of prosperity, in bad years, he is the rock of wisdom.<br/><br/><b>PREREQUISITE:</b> Started a family, INS+Survival 8D, INT+Legends 6D<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Permission waivers to own property in the Neighborhood of the Providers`,
  'providers-juryman': 'Village Juryman',
  'providers-jurymanDescription': `A Provider who manages to distinguish himself from his peers in the eyes of a Judge will be elevated to the post of Village Juryman. He receives his very own insignia and the approval of the Judiciary to dish out justice. In the eyes of the law, he’s now the penultimate authority in the Rubble, second only to the Judges themselves.<br/><br/><b>PREREQUISITE:</b> Sponsored by an existing Judge, Basic understanding of the Codex, Ability to read and write, BOD+Melee 6D, PSY+Domination 6D<br/><b>RESULT:</b> For some, this is the opportunity they’ve been waiting for. They use their newfound power to give back to their families, and add +1 to their Allies Backgrounds. Others, however, see this as a chance for personal gain beyond their wildest dreams. They instead add +3 to their Network Background with the Judges, but can no longer use their Resources with their own Clan.<br/><b>EQUIPMENT:</b> Juryman insignia, allowing them to pass judgement on minor crimes and carry weapons in Justitian; Citizenship papers`,
  'providers-patriarch': 'Patriarch',
  'providers-patriarchDescription': `The Patriarch reigns among the Providers, ruling over a host of families related by blood. He presides over his small kingdom from a home passed down from generation to generation, filled with iconography of the harvest gods and symbolism depicting the Providers and their heritage.<br/><br/>Patriarchs are also responsible for administering justice within the Clan. When a Harvester brings an accusation against another Provider for adultery, or a Supplier is caught skimming an unjust profit, they are brought before the Patriarchs of the bloodlines involved. The two elders will listen to the stories of each, pray for guidance, and deliver a verdict. In severe cases, the guilty party is exiled from the Clan completely, marked with an ancient symbol of a tree split down the middle to brand him as a pariah.<br/><br/><b>PREREQUISITE:</b> Several successful farms operated by their offspring, Authority 5, CHA+Leadership 10D<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Permission waivers to own property in Fielding; A cohort of farms and communities owned by their offspring who all call them their Patriarch`
}

const providersPotentials = {
  earthbound: 'Earthbound',
  earthboundDescription: `No matter where they are, or how desolate the environment, the Providers will make it work. They have tremendous knowledge of herbalism and geology, and know exactly how to reap the best from the land.<br/><br/><b>RESULT:</b> They add +1S per Potential Level to all <b>INS+Survival</b> rolls to forage for food or find supplies in the natural landscape around them.`
}

const steelMastersClans = {
  steelmasters: 'Steel Masters',
  steelmastersDescription: `Steel Master characters are uniquely positioned. No one else is granted so much by the Judges: protection, high quality equipment, and an impenetrable fortress for a home. At the same time, they are placed under strict limitations, and must receive permission from the Judges to move throughout the city. However, they are far from defenseless; a hammer that can bend steel can easily break bone. <b>Steel Master characters can apply their Allies and Resources Backgrounds to the Judges.</b>`
}

const steelMastersRanks = {
  'steelmasters-fledgling': 'Fledgling',
  'steelmasters-fledglingDescription': `The colossal forges of the Steel Masters are never empty, but the spirits abhor wastefulness. The task of the Fledglings in the workshop is to recover the slag from the top of the melted metal before it is cast, so it can be recycled and reused. A life of humility lies ahead of them, as they begin their training as craftsmen in line with the family’s traditions, shadowing a Shaper or Metallurgist while they work.<br/><br/><b>PREREQUISITE:</b> -<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Skimming rod and bucket; Rudimentary safety gear (heavy gloves, leather apron)`,
  'steelmasters-shaper': 'Shaper',
  'steelmasters-shaperDescription': `The sound of their hammers rings out across the city as they shape and temper the steel into its final form. Shapers are the sum of the Clan’s workforce, toiling ceaselessly to craft the Judiciary’s war machine.<br/><br/>When not on shift in the Steel Monolith’s workshops, they retreat to the Ogota chambers where they spend their time studying the works of the Steel Masters of old, attempting to gain insight into their expertise at manipulating the elements that make up the world and soothing the spirits through meditation and prayer. They blend spirituality with forging techniques and turn worship into work.<br/><br/><b>PREREQUISITE:</b> Ogota, AGI+Crafting 7, BOD+Force 6<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Smithing hammer; Blacksmithing gear; Steel Master Clan insignia`,
  'steelmasters-metallurgist': 'Metallurgist',
  'steelmasters-metallurgistDescription': `While the Steel Masters are kept well supplied by the Judges, the quality of their raw material leaves much to be desired. It is the responsibility of the Metallurgists to ensure that only the highest quality scrap is melted down for final use, and to control the additives in the steel to maintain its strength. They are permitted to access the lowest levels of the Steel Monolith, inspecting and rejecting anything they deem unsuitable.<br/><br/>While they still maintain the core tenets of the Steel Masters’ beliefs, Metallurgists are far more grounded than their Ogota brethren - they have to be, otherwise they’d never get along with the Ropers in the Powder Mill, or the Scrappers who haul in the piles of recovered metal from the Ironworks.<br/><br/><b>PREREQUISITE:</b> Gotokai, INS+Perception 6, INT+Science 7<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Restricted Downtown pass; Logbook for materials`,
  'steelmasters-foreman': 'Foreman',
  'steelmasters-foremanDescription': `The Foreman is given the task of venturing out into Downtown to seek out the discarded detritus that will be used by the Steel Masters to create the useful tools the Judiciary needs. He cooperates with the Judges as he trawls through the scrapyards of Tech-Central, and is given permission to hire up to 10 Scavengers to haul material back to the Steel Monolith.<br/><br/>Downtown is an unfamiliar and strange place for the Foremen, and every one of them will react differently to the experience of mingling with the unwashed masses of Justitian. Some watch the passersby with mouths agape, baffled by the strange habits of these people. Others are disgusted by the lack of cleanliness and respect on display. Only one thing is universally recognized: things make much more sense in the Monolith.<br/><br/><b>PREREQUISITE:</b> Ogota, CHA+Negotiation 6, Network 3<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Procurement Permit, giving the Foreman access to Downtown to make purchases for the Steel Masters`,
  'steelmasters-overseer': 'Overseer',
  'steelmasters-overseerDescription': `The Judges always need more firepower, and the flow of work orders is neverending. Despite that, they refuse to accept even the slightest lapse in quality, and as such the responsibility of the Overseers never ends. The Overseer supervises their brethren, performing final checks before they are sent out to the Judges. He has full authority over other Steel Masters on the workshop floor, and can reject any work that doesn’t meet his standards.<br/><br/>Lately, more and more parts have been discarded due to poor material quality. The Overseers have been scrambling to track down the cause for months, now, but their progress has been blocked. The Ogota Foremen refuse to speak to the Gotokai Overseers in everything but the most cursory fashion, and any attempt to seek out an explanation for the poor steel being sent to the Crown is met with a curt dismissal. As the schism deepens the division between the families, a solution seems impossible.<br/><br/><b>PREREQUISITE:</b> Gotokai, CHA+Leadership 8, INS+Perception 8, Authority 3<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Overseer badge; Proofing tools (Measurement instruments, special symbol to be hammered into parts when complete and marked for approval)`,
  'steelmasters-artificer': 'Artificer',
  'steelmasters-artificerDescription': `He has been working for years, learning how to mold and lull the spirits to create the most effective and prized weapons in the Judicial arsenal. His work is so renowned and effective that he has been personally named by an Executioner or Arbiter to create a masterpiece of blacksmithing for their personal collection.<br/><br/>The Artificers blend the two families of the Steel Monolith, combining the expertise of both bloodlines in a single caste of expert craftsmen. Traditionally, they are supposed to abandon any of the prejudices of their background. In practice, though, the schism rippling through the Steel Masters has affected the Artificers just as much, and despite working to keep up appearances the cracks are beginning to show. How can they pretend to work together when not even their family leaders can see eye-to-eye?<br/><br/><b>PREREQUISITE:</b> AGI+Crafting 8, CHA+Arts 7, Network 4<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> A personal workshop where they are given the best materials and equipment, along with a Judicial patron who sponsors their work`,
  'steelmasters-steelmasterogota': 'Steel Master: Ogota',
  'steelmasters-steelmasterogotaDescription': `It can’t go on like this. The Steel Masters are slowly withering away, and the reason couldn’t be more clear to the current Ogota Steel Master, Danislai. Distraction.<br/><br/>The Gotokai branch of the family have become obsessed with leaving the safety and sanctity of their home in the clouds, proclaiming their reasons to be “bringing new talent into the fold”, but that isn’t the real truth. They’ve grown too weak to handle the responsibility of their bloodline, the knowledge of their unique heritage which must not be sullied.<br/><br/>There can only be one solution; for the Steel Masters to survive the Gotokai must be made to understand that the Steel Monolith is where they belong. If only Heza saw it too. Until then, Danislai focuses on his own position as the unparalleled master craftsman of the Steel Masters, able to do on his own in a day what a team of Shapers would struggle to match in a week.<br/><br/><b>PREREQUISITE:</b> Danislai Ogota choosing a suitable successor from his offspring, AGI+Crafting 11<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Key to the Judges’ arsenal; The Flag (passed down from his ancestors, regenerates 1D Ego every time he meditates over the symbol); Access to the crown of the Steel Monolith, the sacred grounds where only the leaders of each family may go`,
  'steelmasters-steelmastergotokai': 'Steel Master: Gotokai',
  'steelmasters-steelmastergotokaiDescription': `It can’t go on like this. The Steel Masters are slowly withering away, and the reason couldn’t be more clear to the current Gotokai Steel Master, Heza. Isolation.<br/><br/>The Clan has been trapped in the Steel Monolith for generations, prohibited from bringing in new blood, learning new techniques, or even indulging in any luxury. The Ogota say that this is for the best, that the ruffians in Downtown would ruin the purity of their line, but that isn’t the real truth. They’ve just grown too comfortable with captivity, like a bird too terrified to leave its cage even when the door is open.<br/><br/>There can only be one solution; for the Steel Masters to survive the Ogota must be made to understand that staying confined in this prison cell is an impossibility. If only Danislai saw it too. Until then, Heza does his best to maintain the standard of his Clan’s work as their most skilled inspector, capable of spotting at a glance defects the current crop of Overseers would need hours of measuring to detect.<br/><br/><b>PREREQUISITE:</b> Heza Gotokai choosing a suitable successor from his offspring, AGI+Crafting 11<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Key to the Judges’ arsenal; Ancient nautical map of the route taken by the ancient barges (passed down from his ancestors); Access to the crown of the Steel Monolith, the sacred grounds where only the leaders of each family may go`
}

const steelMastersPotentials = {
  spiritshaper: 'Spiritshaper',
  spiritshaperDescription: `The Steel Master has gained an understanding of the spirits, able to work with diligence and patience to tame and influence them to achieve perfection.<br/><br/><b>RESULT:</b> He gains +1S per Potential level to all <b>AGI+Crafting</b> rolls related to weapon smithing.`
}

const britoniClans = {
  britoni: 'Britoni',
  britoniDescription: `The Britoni are the mirror of their land, and are inextricably interwoven into the fabric of the existing society. They follow their own path, refusing to be beholden to any Cult. Characters belonging to this Clan will find themselves part of a rugged, survivalist culture that spans the entire region, and will find kinsmen in every corner - but not all of them are as friendly and unified as they once were. <b>Britoni add +1 to their Allies Background when they are in their Clan’s territory.</b>`
}

const britoniRanks = {
  'britoni-kelp': 'Kelp',
  'britoni-kelpDescription': `Just as seaweed can take root in every nook and cranny of shoreline nurtured by sea water, so too does the Kelp find their way into every aspect of Britoni society. They can be found all throughout the Northwest, sticking to the beaches and rustling beneath the footsteps of their more esteemed relatives. Eventually, they’ll grow up, leave their roots behind, and set out for something else.<br/><br/><b>PREREQUISITE:</b> -<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Small ivory token of Britoni heritage`,
  'britoni-waverider': 'Waverider',
  'britoni-waveriderDescription': `Land isn’t enough for him. Too stable, too safe, too barren. Out on the open waters of the Atlantic, clinging to a hunting boat as it rocks past the waves, harpoon raised and ready, that’s where a Waverider belongs. Alone against the might of the unforgiving sea he’d be swept away by the next gust, but in a hunting pack with a dozen other Britoni he pushes back against the tide.<br/><br/>Every week he sets out from his home port, going after seals, fish, and occasionally small whales. He is the provider for an entire family back home, taking everything he needs to feed his tribe. Even as he curses the rolling waves and bemoans the salt spray stinging his eyes, he nourishes thanks to the great life-giver of the Britoni – anyone who fails to respect the Grey Mother is destined to find themselves crushed between her merciless thighs.<br/><br/><b>PREREQUISITE:</b> INS+Survival 5, BOD+Melee 6<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Harpoon; Whalebone whistle to signal to his hunting pack`,
  'britoni-anchor': 'Anchor',
  'britoni-anchorDescription': `The sea molds the Britoni and cares for them, but not everyone can easily sprout flippers and rush out onto the waters. Instead, the Anchors have their own crucial role in the Clan. They rest ashore, arming the villages while Waveriders and Bullkillers are gone for the hunt. Anchors process the catch hauled back by their brethren; they carve up seals, strain out blubber, skin valuable pelts from sea lions, and strain oil from whale carcasses. In the evenings, they light the street lanterns or man the lighthouses to guide the hunters back to safety.<br/><br/>The Anchors are also responsible for handling trade between the many towns and settlements of the Britoni, ensuring that those located inland are kept supplied with food from the ports, and that other resources are correctly passed from village to village to ensure the entire region remains active.<br/><br/><b>PREREQUISITE:</b> INT+Science 4, AGI+Crafting 6, Network 2<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Workshop in their home town where they can process the catch of the day; Tools required for their work (Toolkit, Lvl 1)`,
  'britoni-bullkiller': 'Bullkiller',
  'britoni-bullkillerDescription': `Anyone can become a Waverider if they’ve got the guts to step away from the safety of land and take on responsibility, but that’s nothing but a drop in the bucket. The Bullkiller has stared a walrus down as part of the annual hunt and killed it in a fight, man against beast. He came away from the encounter battered and bruised, but victorious, claiming an ivory tusk which he will carve and engrave with his own personal epic.<br/><br/>Each Bullkiller is the focal point of an entire community, and represents the pinnacle of the lives of most Britoni. He is a symbol of masculinity, and an emblem of the Clan’s pride – one man defies the ocean, just as the Britoni defy the world. Now he leads a pack of Waveriders out on each foray, always looking for prey worthy of his skill: walrus bulls, sharks, and sea lions.<br/><br/><b>PREREQUISITE:</b> AGI+Navigation 6, CHA+Leadership 8, Renown 3, Killed a walrus during the annual hunt with their bare hands<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Jet-ski with mounted harpoon launcher; Carved ivory tusk bearing his legacy (Talisman, +1D)`,
  'britoni-balmer': 'Balmer',
  'britoni-balmerDescription': `While the Britoni thrive on the gifts the stormy Atlantic provides them, their lives are far from harmonious. Shipwrecks, feisty prey, hunts gone wrong, even just brawls in taprooms all give the hunters more than their fair share of injuries, and it’s the Balmer’s task to patch them back up. She works in Balsam Houses and healing shacks throughout Briton, relying on the old, tried and true ways of medicine to set her brethren back on their feet and send them on their way.<br/><br/>The Balmer does more than just heal the body, she also soothes the soul. She provides spiritual guidance for the members of her Clan, reads the guts of seals to predict future snowfalls, and performs rituals over those suffering from a vast array of ailments. The Anabaptists are unhappy with this remnant of the old traditionalist practices of the Britoni, but they lack the influence to purge it entirely.<br/><br/><b>PREREQUISITE:</b> INT+Medicine 8, INS+Empathy 6, Allies 3<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> She takes no payment for her services, but the gratitude received from her people leaves her wanting for nothing; A workshop where she can care for patients (+2D for INT+Medicine)`,
  'britoni-prow': 'Prow',
  'britoni-prowDescription': `The Prow cuts through the spray, resolute and implacable. He has proven himself to be exceptional in his own right, whether out on the waters leading a band of Bullkillers to bring down legendary prey, or on land forging communities and managing hundreds of his kinsmen. The Prow leads, and others follow. In times past he would act as the King’s personal advisor, counted among the closest members of Oppolus’ royal hunting party, but things have changed.<br/><br/>Now, the Prow must take on a more diplomatic role as the Oppolids attempt to divide the Clan amongst themselves. He acts as an advisor and mediator, using his weathered calm and steady nerves to resolve disputes between chieftains in a wide range of different harbors, representing the will of the Oppolid he’s sworn fealty to.<br/><br/><b>PREREQUISITE:</b> AGI+Projectiles 9 or BOD+Melee 9, INS+Survival 7, Renown 4, Authority 3<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Speedboat with pintle mounted cannon; Personalized insignia to paint on his shield or cloak; Symbol of his Oppolid`,
  'britoni-oppolid': 'Oppolid',
  'britoni-oppolidDescription': `Oppolus is – was – recognized by the Britoni as the greatest, wisest, and most decorated King of all. However, despite his long list of achievements and accomplishments, not everyone was as appeased by his rule. The Oppolids, his twelve natural born sons and daughters, looked on his blatant favoritism of his two Anabaptist brats with disdain and disgust; they all knew they were just as capable, they knew that they would be able to steer Briton on their own. Their moment has come.<br/><br/>The Oppolids have stepped up and taken charge in the aftermath of their father’s downfall, each carving out a small piece of the formerly united realm as their own. Each must choose his or her own method to rule. Does he crack down on his people with an iron fist, only to be rebuked by the rugged survivalist nature of the Britoni? Does she soothe worries and calm tempers with words of advice, only to find her people growing complacent in the face of the dangers arrayed against them? The Oppolids have a lot to live up to – only time will tell if they can handle the responsibility.<br/><br/><b>PREREQUISITE:</b> Directly descended from Oppolus or married to one of his children, CHA+Leadership 10, Renown 5<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Personal signet ring; Hunting horn with their symbol; Castle or stronghold from which they rule their domain`,
  'britoni-whaler': 'Whaler',
  'britoni-whalerDescription': `All of Briton knows the Whaler for his skill. If he wanted to be King he could snap his fingers and make it so, and the Oppolids wouldn’t dare stand in his way. However, he has far more important things to take care of.<br/><br/>The Whaler has more experience than anyone who ever traversed the Atlantic, and has ventured farther than any other competitor. He leads a team of handpicked Prows and Bullkillers out on his expeditions, and when the annual hunt during the Day of Ganaress rolls around, it’s his ship that draws the most attention and speculation – what mighty beast will the Whaler bring home today? He is always sought after by Neolibyans and Leopards, along with the best Scrappers of Saint Brieuc, to give advice on sailing paths or dead-zones in the current where floating debris might sink to the bottom. His great exploits, bringing down sperm whales and orcas, are part of what make him special, but not the only thing. His knowledge of foreign shores is worth the weight of a captured whale in gold.<br/><br/>Whenever he regales a crowd with tales of Gaelik, Iceland, or the foreign Azores, everyone is stunned into silence by these exploits they’ll never personally lay eyes on. As the Black Water slithers ashore, more and more eyes turn his way, especially as stories of great leviathans and hulking monsters rising from the waters filter out into the Clan. Maybe the Whaler will meet his match out in the Atlantic, facing down hell itself.<br/><br/><b>PREREQUISITE:</b> INS+Survival 10, AGI+Navigation 10, INS+Orienteering 10, Renown 5<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> His legendary stories and tales will have anyone falling head-over-heels to supply him with whatever he needs: the Whaler has Resources (6), and will never find himself lacking for equipment`
}

const britoniPotentials = {
  riptide: 'Riptide',
  riptideDescription: `The ocean buckles, towers above with fury, and crashes down, but the Britoni doesn’t give an inch. Whenever he gets hit, he weathers the blow and fights back harder, funneling the pain into boundless rage. He turns his anger toward his enemies and cuts them apart.<br/><br/><b>RESULT:</b> When a Britoni attacks any opponent who has previously dealt Damage to him, he adds +1D per Potential Level to his Attack roll.`
}

const pictonsClans = {
  pictons: 'Pictons',
  pictonsDescription: `Two hundred years ago, the Pictons were introduced to their God, Argyre. He made them grasp their true purpose, and turned them into attack dogs hunting down his enemies and delivering his revenge. To fulfil their destiny they were bestowed with bleeding edge technology, while their bodies were warped to operate far beyond normal human capacity. Yet the Pictons are also intensely superstitious, fearing the ire of their Carrion Lord more than any mortal opponent, and savage. Their worship and deeply implanted memetic subroutines make them obedient and zealous, while also shielding them from mental strain - <b>Picton characters add +1S to all Mental Defense rolls.</b>`
}

const pictonsRanks = {
  'pictons-orbiter': 'Orbiter',
  'pictons-orbiterDescription': `Like scattered debris they drift through Argyre’s territory, unfocused and with unfinished conditioning. They paint themselves in the Vulture’s symbols, gaze up in awe at the stars, but they don’t understand – not yet. By day they return to the subterranean world of their Clan, where the Meme Chambers and video screens show them glimpses of the wonders that once were. If they’re lucky, they’ll even see a flash of their God, his scarred and twisted visage giving them a glance, nothing more.<br/><br/><b>PREREQUISITE:</b> -<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> A can of glowing paint and a few scraps of food. It’s all they deserve for now`,
  'pictons-trajector': 'Trajector',
  'pictons-trajectorDescription': `The Trajector no longer orbits aimlessly. Now he hunts. His indoctrination has proceeded far enough that he is permitted to venture out to keep the Rotten God’s domain secure. He isn’t yet allowed to go after the world killers, so instead he patrols the borders of Britain, tearing apart those reckless or foolish enough to cross into Argyre’s kingdom. Anything he kills he brings back to the warrens beneath London, where it can be reused or eaten.<br/><br/>In the dark, bright symbols flash before his mind’s eye. The memetics are setting in, taking control, and his fear of the Vulture has grown into zealous obedience – if only to guarantee survival. One of his broodmates, the least productive, was chosen for a demonstration of Argyre’s power, and he still sees the horrifying sight whenever he blinks. He will not fail.<br/><br/><b>PREREQUISITE:</b> BOD+Toughness 6, INS+Survival 5<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Automatic pistol; Serrated knife (Modified knife with Gruesome (2))`,
  'pictons-booster': 'Booster',
  'pictons-boosterDescription': `Just as a satellite needs a rocket to propel it into orbit, the Pictons roaming across Britain need the Boosters to push them to new heights. They toil away in the deep chambers of Argyre’s demesne, watching over the cultivation vats and hormone farms which are used to create the star food, the Vulture’s gift to his hellhounds. It fuels the body, ensures the mind is ready for conditioning, and allows anyone to operate at a level close to the Ambrosia induced world killers.<br/><br/>Chemicals can be harvested using their God’s technology, but the meat to feed the Pictons must be sourced from elsewhere, either from corpses dragged in by the Trajectors or sliced from the bodies of those who failed the Rotten God. Palers are a snack. Scrappers a full meal. Everything is taken and reused.<br/><br/><b>PREREQUISITE:</b> AGI+Dexterity 5, INT+Science 6, Secrets 2<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Access to Argyre’s outlying laboratories, giving +2D on any INT+Science rolls to create drugs or chemical substances`,
  'pictons-stareater': 'Star Eater',
  'pictons-stareaterDescription': `The Star Eater has ascended beyond the limits of the puny scavengers scrabbling around the edges of the Rotten God’s realm. The star food has made him strong, made him fast, made him resilient. He can shrug off injuries that would have killed his former self and push his body to the absolute maximum. His conditioning is pristine, every thought tinted with fearful reverence and every impulse done in accordance with glowing symbols blazing in his mind. He doesn’t understand them, but he still recognizes and follows their instructions.<br/><br/>The Vulture has decided that the Star Eater is ready and able to begin hunting the world killers, and the memetics in his head have been tuned to inspire absolute and endless hatred for the Sleepers and their actions. The Star Eater uses the tools of the Rotten God to devastate his prey and drag them kicking and screaming back to Argyre’s labor camps. They killed the world, but he eats stars. He wins.<br/><br/><b>PREREQUISITE:</b> BOD+Stamina 7, INT+Legends 6, PSY+Cunning 6, Secrets 2<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Star food; Submachine gun with any modifications he can strap or bolt on, up to 2 Slots`,
  'pictons-deathwalker': 'Death Walker',
  'pictons-deathwalkerDescription': `The other Pictons shrink back as he approaches, even though they know he’s needed. The warriors have returned with broken bodies, one of the females has had a difficult birth, an improperly stitched wound has torn open again. He bears a polished disc in his right hand, sharpened to the point it parts flesh like water, and in his left he holds a small kit filled with the pastes and extracts developed for this purpose in the Rotten God’s deepest chambers. The process will be painful, but the Death Walker will ensure their mortal frames work again – or he will see to it that their cadaver is put to better use. It’s all the same in the eyes of the Vulture.<br/><br/>The Death Walker has been inducted and trained in the art of repairing the shells of Argyre’s hellions, keeping them moving even past the point where a lesser creature would be limp and lifeless. He adorns his skin with bright markings triggering the memetic patterns of panic and fear in his subjects, and he hides his face with a horrifying mask – terror provides the adrenaline to fight on. This, of course, requires that the subject be restrained and operated on without painkillers, but this is irrelevant. They will be healed or they will be recycled.<br/><br/><b>PREREQUISITE:</b> CHA+Expression 6, INT+Medicine 8, PSY+Domination 7, Secrets 3<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Death Walkers are bestowed with strange medicines and medical equipment created by Bygone machines in Argyre’s labs, but they were designed with function rather than comfort in mind. He adds +4S to all INT+Medicine rolls to patch up other Pictons, at the cost of inflicting (4) Ego Damage whenever he conducts an operation`,
  'pictons-nebula': 'Nebula',
  'pictons-nebulaDescription': `The Vulture has permitted him to access the deepest sections under London, the steaming maze filled with the stench of rotten flesh and decorated with the perfectly preserved corpses of the world killers. He has been shown the idyllic environments of the past in the holo-chambers, walked through the Vulture's hydroponic gardens, and been made to understand the necessary justice he is delivering to the Sleepers in the name of his God.<br/><br/>The Nebula has also been given a limited degree of access to the memetic programming swirling through the minds of the Pictons under his command, which he uses to his benefit out in the wastelands to embolden his Star Eaters while they hunt for signs of the Vulture’s sworn nemesis buried in the dust. He is well aware that the same commands and triggers exist in his head, but he gives it no further thought – the Rotten God is never to be questioned.<br/><br/><b>PREREQUISITE:</b> BOD+Melee or AGI+Projectiles 8, CHA+Leadership 9, PSY+Domination 9, Secrets 4<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Anti-Sleeper artifacts from the vaults as needed for his missions (Deadbolt, Achilles, Deception Matrix); Void Grenades; Argyre’s yoke`,
  'pictons-gemini': 'Gemini',
  'pictons-geminiDescription': `Argyre is all-powerful, but not even he can monitor every corner of his realm at once, much less organize the hordes of Sleepers being worked to death in his labor camps. As such, he appoints a Gemini to oversee his kingdom while his attention is on more critical matters. The Gemini is given control over the yokes around the necks of the prisoners, allowing him to correctly motivate any rebellious or reluctant world killers with a burst of blinding pain.<br/><br/>Additionally, the Gemini is responsible for the mental programming of the lower ranking Pictons. He defines their memetic routines in the Meme Chambers, modulates the pitch and tone of the subliminals broadcast all throughout the warrens, and evaluates the overall progress of each clutch to ensure they are developing correctly. Only Argyre himself could override the Gemini’s influence.<br/><br/><b>PREREQUISITE:</b> INT+Science 9, PSY+Cunning, Deception, or Domination 11, INS+Taming 8, Secrets 5, Chosen by Argyre<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Code plate which can be used to flash up symbols to control the Pictons with memetic imagery (+4S to CHA+Leadership against other Pictons); Master control circuit for Argyre’s yoke`,
  'pictons-pulsar': 'Pulsar',
  'pictons-pulsarDescription': `None shine brighter than the Pulsar. He has been chosen as Argyre’s herald to the wretches crawling around the corpse of Europe, given the most critical tasks which the Rotten God cannot accomplish due to his banishment by the Free Spirits. He has been equipped with arsenals that could topple entire Clans in the blink of an eye, and can command the full cooperation of any other Picton with but a simple order. Only one Pulsar is ever chosen, and each is fully aware that their service ends only with their death. That’s just fine, it’s what God wants. The last three perished venturing into Borca to confront the Sleeper Prophets of Exalt and disable their Corresponder. Time to try again.<br/><br/><b>PREREQUISITE:</b> BOD+Toughness 10, BOD+Force 8, CHA+Leadership 9, Authority 5, Chosen by Argyre<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Starfield, allowing him to communicate with Argyre even in distant lands; Any offensive artifact from the Vulture’s vault, personally modified to be as lethal as possible`
}

const pictonsPotentials = {
  implantedExpertise: 'Implanted Expertise',
  implantedExpertiseDescription: `The Picton has been implanted with an untapped reserve of training and knowledge, deep in the recesses of his subconscious mind. This expertise is inaccessible unless in conjunction to a situation related to his task, set by Argyre himself. A single Skill per Potential level, chosen by the Game Master, suddenly rises by a number of Points equal to the Picton’s rank value for a single scene, even beyond the normal limit of 6, but the benefits collapse soon thereafter. The Picton is unable to reconjure the information that has only been implanted, never truly experienced.`
}

const druidsClans = {
  druids: 'Druids',
  druidsDescription: `The threats arrayed against their homeland are manifold, and the Horned God has abandoned them to go on his own venture. The Druids are alone. Characters belonging to this enigmatic Clan take their place amongst its elite - with a maximum population of 216, each member of this reclusive group must be exceptional, or they’ll be replaced. The Druids were once able to remain isolated, with very few areas of overlap with the world beyond their realm, but now they must step out and make new allies. They know the hinterlands and dense forests better than anyone; <b>Druid characters add +2D to INS+Survival while in Briton.</b>`
}

const druidsRanks = {
  'druids-relay': 'Relay',
  'druids-relayDescription': `Relays prowl through Cernunnos’ territory, searching for the materials needed to keep their God awake and operational. Additionally, they perform as scouts, stealthily drifting around the outskirts of the forest and alerting animals as well as their brethren whenever danger presents itself. They haven’t yet been given much responsibility, but that’s no excuse for complacency – should a child be born and the Limit breached, the Relays will be the first to be culled.<br/><br/><b>PREREQUISITE:</b> -<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Palm-sized metal detector (+2D to scavenging for metallic items)`,
  'druids-resistor': 'Resistor',
  'druids-resistorDescription': `No outsider is permitted to enter the deepest areas of Cernunnos’ dwelling. It is the Resistor’s calling to ensure that the border is maintained. He lays out all of the realm’s defenses: tripwires strung between tree trunks to trigger terrifying holographic projections, pitfalls cleverly disguised with carpets of twigs, leaves, and camouflage fabric, and a host more methods, all of which combine to create an impenetrable barrier for entry.<br/><br/>Whenever a child is born in the Clan, a trio of Resistors are assigned to them to ensure they remain safe at all times, and to keep up their education. These three Druids each take on a single aspect of the child’s education – one on practical matters, one on the spiritual, and the last handles personal development. To a Clan as restricted in size as the Druids, every child is precious – or too much.<br/><br/><b>PREREQUISITE:</b> AGI+Crafting 6, PSY+Cunning 4<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Tools and equipment needed to create their traps (+2D to AGI+Stealth when hiding traps); Camouflage clothing and gear (+1D to AGI+Stealth)`,
  'druids-battery': 'Battery',
  'druids-batteryDescription': `The Druids follow the will of their Horned God, and would never harm an animal or intrude upon its life in order to sustain or clothe themselves. Instead, they take after Cernunnos and only use what the land itself provides. The Battery oversees the hydroponic growth pods constructed according to his God’s designs, preparing food for his Clan and using synthetic processes to create the materials needed for construction. Additionally, he is tasked with respectfully using the bodies of animals which have naturally perished in the forest to create the furs and cloaks which keep the Druids warm in the cold winter months.<br/><br/>The Battery also uses his knowledge to revitalize the creations of the Amplifiers when their spark has faded. He doesn’t yet have the understanding to replicate the designs, but he knows enough to piece them back together.<br/><br/><b>PREREQUISITE:</b> INT+Science 6, INS+Survival 5<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Hydroponic farms and growth beds deep in Cernunnos’ realm (+2D to INT+Science when creating and harvesting food)`,
  'druids-solenoid': 'Solenoid',
  'druids-solenoidDescription': `The traps and distractions of the Resistors are often not enough to dissuade the foolhardy outsiders who refuse to even attempt to listen to the natural world around them, and would be incapable of understanding it if they did. As such, the Solenoids are forced to act. They coat themselves in war paint reminiscent of their God to intimidate and distract observers, and use weapons created from the Bygone imagery they’ve been shown by Cernunnos.<br/><br/>Once, the Druids were content to remain isolated from the world beyond their borders, living off the land in harmony with nature. Now, though, their isolation must end. More and more incursions into their realm from sources the Clan is barely capable of understanding threaten their livelihood. They have to reach out, for the first time in their history. The Solenoids take up the mantle of ambassadors, making contact with the Britoni and Anabaptists and guiding refugees through the Gauntlet to receive supplies and aid.<br/><br/><b>PREREQUISITE:</b> AGI+Projectiles 7, AGI+Mobility 6, Network 2<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Scatterpaint concocted by the Batteries; Compound bow; 5 Whispertip arrows`,
  'druids-amplifier': 'Amplifier',
  'druids-amplifierDescription': `Cernunnos has offered the Amplifier a glimpse into the depths of his soul, gazing at flickering images drawn in the air showing strange contraptions and unseen landscapes. Each Amplifier has studied these visions feverishly and divined the correct methods, materials, and processes needed to recreate the arcane technology on display. From the Chroniclers who once tried to push into the forest he takes circuitry and transistors, from the Scrappers he scavenges metal and advanced materials, and using his own ingenuity he creates new, electrical life.<br/><br/>The Amplifiers are the technical craftsmen of the Druids, lacking the understanding of electricity and technology to truly know what they’re piecing together, instead wrapping their creations up in mythology and arcane explanations. The bracelets which allow the Druids to communicate with each other use energy lines to pass messages, while the metallic eyes strung throughout the treetops contain spirits which report back on their findings to a central observer.<br/><br/><b>PREREQUISITE:</b> INT+Legends 8, AGI+Crafting 7, CHA+Expression 6<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Extensive records and logs passed down by the Druids on Cernunnos’ designs, interlaced with legends and myth. Amplifiers may substitute INT+Legends for INT+Engineering when creating or modifying equipment`,
  'druids-conductor': 'Conductor',
  'druids-conductorDescription': `The Clan knows that their God is wise and in possession of knowledge far beyond any mortal comprehension, yet throughout the decades he hasn’t uttered a single word. Instead, the three Conductors interpret the images and movements of the Horned God, each divining the meaning of the visions he is blessed with in his own way. One of them interprets through the lens of Cernunnos speaking of the present, another views it as a reflection of the past, and the third sees it as a prediction of the future. Together, they convey the directives and decrees of the Horned God.<br/><br/>In times when the mechanical God left to challenge the wicked creatures encroaching upon the Druids’ domain from the east the Conductors would take charge of the Clan and lead them until Cernunnos returned. Now that he has left to prowl through the ruins of Aquitaine, the Conductors have taken control once again – but this time, they’re uncertain if their God will return.<br/><br/><b>PREREQUISITE:</b> CHA+Leadership 9, INS+Empathy 8, INS+Perception 8, Authority 4<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Each Conductor wears a mask representing his aspect of the trio, passed down from generation to generation. While wearing it, he adds +2D to CHA+Leadership when trying to influence other Druids`,
  'druids-diode': 'Diode',
  'druids-diodeDescription': `The Druids are an insular group, but even before the recent chaos it was necessary for Cernunnos to have an agent on the outside to maintain awareness of the situation beyond his forest’s borders. This is the task of the Diode, an operative equipped with Cernunnos’ most advanced surveillance and infiltration technology. The Diode disguises himself as a beggar or vagabond, using his equipment to spy on the highest echelons of society and planting bugs and trackers all over Briton. His network of contacts and sources spans Franka, and whenever anything happens he’s among the first to know – which means his God knows as well.<br/><br/>The only catch: the Diode can never rejoin his people without the Limit being broken. He must make his way through the years alone, with only the silent company of his God watching through his eyes to stave off isolation. On his travels he encounters experiences no member of his Clan has ever witnessed before. He despises it all.<br/><br/><b>PREREQUISITE:</b> PSY+Deception 11, CHA+Conduct 10, INS+Empathy 10, Network 5<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Deepfake; Omnispeech; Simula; Optical implant allowing Cernunnos to see through his eyes; Coordinates of a dead-drop location where he can pass information directly to the Conductors, only used in desperate situations`,
  'druids-simulacrum': 'Simulacrum',
  'druids-simulacrumDescription': `Cernunnos is unlike the other gods and spirits clung to by Clans across Europe. He is physically manifest in the world, able to directly intervene in situations that affect his people and use his mechanical might to lift them out of danger. Sometimes not even this is enough, and the Conductors fail to fully understand the warnings and directions silently communicated through holographic projections and symbols traced in the sky. The Horned God must become fully materialized.<br/><br/>In dire emergencies, Cernunnos chooses a Simulacrum, a single Druid willing to make the ultimate sacrifice for his God. He is led into a hidden refuge, deep in the Forest of the Druids, where Cernunnos’ maintenance station is located. Inside, a crown of circuitry with two antler-like antennae rests on a steel throne. When it is worn, Cernunnos’ consciousness overrides the impulses of the host, and the Horned God steps forth as a living, breathing incarnation, capable of leading his people through any situation. When the crisis passes, Cernunnos’ mind returns to his body, but the Simulacrum’s neural pathways have been destroyed in the process. He will be remembered as a hero.<br/><br/><b>PREREQUISITE:</b> Willing to sacrifice his life for God, BOD+Toughness 10<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Cernunnos’ Crown; 5 Starling arrows; Any modification for his bow, custom made by the Amplifiers`
}

const druidsPotentials = {
  naturesCanon: "Nature's Canon",
  naturesCanonDescription: `Cernunnos is capable of drifting through the world without disturbing a single leaf on the forest floor, and interacting with the animals as if they could understand him by design. The Druids take after his example, learning to interpret the rhythm of the woods and the unspoken language of nature. The Druids adds +1S per Potential level to all rolls related to understanding and taming animals.`
}

const ganaridsClans = {
  ganarids: 'Ganarids',
  ganaridsDescription: `The hive has been scattered and left as thousands of dispersed particles, each of them slowly finding their own path to safety and security. Ganarid characters are entirely unique, straddling two hierarchies as they hide within a greater Cult or Clan, masquerading as a regular member while still cognizant of their true nature - the inheritors of Ganaress’ kingdom, waiting for his return. They play a dangerous game, though: if their identity as insidious agents is discovered, they'll be executed with no remorse. Ganarids have an alternate character creation process, detailed in their rank hierarchy.`
}

const ganaridsRanks = {
  'ganarids-grub': 'Grub',
  'ganarids-grubDescription': `He hasn’t yet found his purpose, or is still trying to piece together his individuality from the convoluted mass of the Ganarid collective. He quietly drifts through the hinterlands of Briton, or slips through the cracks of society as a faceless, nameless citizen of any number of villages and cities throughout Franka. People see him for what he is; a loner, a stranger, someone without his friends or partners. Any relationships he does strike up with the other dregs of civilization are trivial at best, and built on shaky foundations.<br/><br/>With Franka in turmoil due to a cascade of recent events, he’s in a dangerous position – humans resort to violence when frightened, and they inevitably direct their suspicion and retribution against outsiders, and unknowns. He must find himself a new identity, and do so quick.<br/><br/><b>PREREQUISITE:</b> Former member of Ganaress’ hive<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> Nothing but what he can scrounge up, cast aside by human society`,
  'ganarids-larva': 'Larva',
  'ganarids-larvaDescription': `Stage one of his development. The Larva has found a Cult or Clan which seems receptive to his infiltration. He gets entangled with its members, begins to ask the right questions, and eventually takes the plunge of joining them as an initiate. A tattoo to the brow and a nose ring through the septum turn him into a Touched one, while volunteering to defend Franka in the name of the ancient nation puts him into the uniform of the Resistance – he grits his teeth and soldiers on.<br/><br/>The Larva applies himself completely to the disguise, and sheds his identity as a Ganarid, at least on the outside. At night, in the dorms of the church or in the packed sleeping room of a Britoni inn, he still hears the whispers of the collective, of his people. They’ll keep him company.<br/><br/><b>PREREQUISITE:</b> INS+Empathy 5, PSY+Deception 4<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> A small, hand carved idol of Ganaress he keeps stashed away, hidden from anyone. It’s his only reminder of the past`,
  'ganarids-pupa': 'Pupa',
  'ganarids-pupaDescription': `Digging deeper, sinking further. The Pupa has risen beyond the lowest ranks of his chosen target’s hierarchy, and has begun to take on tasks for his superiors. He pretends to be nothing more than a driven, eager-to-please Agent rushing to-and-fro for a Mediator, or an industrious Badger jostling for position amidst the Mud Crabs on Briton’s many beaches. To his growing network of friends, contacts, and suppliers, that’s all he is, no reason for any additional suspicion. The Pupa has managed to secure a solid shell around himself, and has found some measure of safety in his current situation – but it’s not enough, not yet. He can still go higher, take on more responsibilities and make more connections, find a secure haven to wait out the months or years until the return of his King.<br/><br/><b>PREREQUISITE:</b> CHA+Conduct 7, PSY+Cunning 6<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> In a disused part of his barracks, or a ruined shack close to his church, he has created a tiny shrine to his King where he can reflect on everything that was taken from him`,
  'ganarids-imago': 'Imago',
  'ganarids-imagoDescription': `The Imago is so deeply entrenched in his new role that his superiors have even begun giving him responsibility over others. Now, along with his tightly knit and expansive web of contacts all linked back to his false identity, he has acquired a group of subordinates and allies he can call upon in times of stress. No outsider would dare question his origins or background now, and he’s built up enough goodwill that any challenger from the inside will be subtly pushed into silence. He leads hunts out onto the waters as a Britoni Bullkiller, recalls the great human history of Franka as a Savant of the Resistance, and preaches the word of the Neognosis as an Elysian. The Ganarid can relax, his masquerade complete.<br/><br/>Except, the murmur of the collective keeps growing stronger, the memories of his kin mixing into his dreams, a call growing louder and louder with each passing day. He’s not finished yet. One last step.<br/><br/><b>PREREQUISITE:</b> CHA+Leadership 6, CHA+Expression 8, INS+Empathy 8<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> He can’t be overt about his worship, but he does as much as he can to stave off the voices in his head. He finds opportunities to slip away to a large shrine, far out of sight, where he connects with his detached brethren. Soon, the time will come when they can truly reunite.`,
  'ganarids-moth': 'Moth',
  'ganarids-mothDescription': `Ascendent. The Moth sheds the trappings of his infiltrated target, emerging from the cocoon of disguise to take on a blazing new form. His stigma has reawakened, whether due to an imperfect removal or a heavy dose of new Sepsis infestation, and the ether has chosen him to be a new Idol bearer – even if he represents a King which no longer exists, and is yet to be reborn. He is a leader to the other Ganarids, infecting them with his vision and determination, guiding them towards the light.<br/><br/>He directs the Ganarids throughout Briton and beyond, subtly influencing them with instructions broadcast through their collective unconscious. His mind is strong, and his voice firm as the members of his hive find themselves dancing to the tune of their superior. When the time comes, he will take his rightful place at Ganaress’ side, heft the banner of the true King, and stand at the crest of an army which will sweep across the land. The mistakes of the past will not be repeated this time.<br/><br/><b>PREREQUISITE:</b> PSY+Faith/Willpower 11, PSY+Domination 9, CHA+Leadership 10<br/><b>RESULT:</b> -<br/><b>EQUIPMENT:</b> His hands worked on autopilot, carving out the shapes using the skills and knowledge of his kin. Now, the Idol mask rests on his face, and commands all other Ganarids to answer (Talisman, +3D)`
}

const ganaridsPotentials = {
  harmonious: 'Harmonious',
  harmoniousDescription: `<b>PREREQUISITE:</b> Spore Infestation (5)<br/><br/>Unconsciously, the Ganarids have been sharing their collective identity ever since they were inducted into Ganaress’ hive. Despite the loss of their King, the connection to the rest of the hive remains, however tenuous, and in times of need the Ganarid can access the skills of his brethren. In a stressful situation, the Ganarid can spend up to the Potential level in Ego Points to raise the value of a single Skill of his choice by the same amount for the duration of a scene, once per day.`
}

const touloniClans = {
  touloni: 'Touloni',
  touloniDescription: `The <b>Touloni</b> are the dominant Clan of <b>Toulon in southern Franka</b>, a prosperous coastal people whose identity rests on <b>family, fishing, craftsmanship, trade, and hard-earned independence</b>. After generations of being courted and then abandoned by the Anabaptists, Spitalians, and Chroniclers, the Touloni grew deeply skeptical of the great Cults; when the <b>Neolibyans</b> arrived, the Clan instead forged an alliance with them that brought Toulon greater autonomy, commercial freedom, and prosperity. Their society is organized around <b>five great families</b>, whose elders—the <b>Anciens</b>—quietly guide the city, ensure children receive basic education, and encourage young Touloni to serve in the <b>Beau Monde militia</b>, work as fishermen and sailors, or pursue education and commerce with Neolibyan financial backing. Touloni merchants and artisans have consequently spread trading posts and manufactories as far as <b>Perpignan, Montpellier, and Toulouse</b>, while their close dealings with the African “Lions” have made them shrewd negotiators capable of recognizing and turning bad deals to their advantage. Yet beneath their growing wealth they remain fundamentally a <b>seafaring, working-class Clan</b>: fishermen are considered the heart of Touloni culture, renowned for hard labor, earthy humor, wine, large families, and an infectious enjoyment of life. In essence, the Touloni are <b>Franka’s pragmatic merchant-mariner Clan</b>—family-minded, increasingly wealthy, politically adaptable, and determined never again to surrender their future to outsiders promising salvation.`
}

const touloniRanks = {
  'touloni-chiot': 'Chiot',
  'touloni-chiotDescription': `<b>PREREQUISITE:</b> -<br/><b>RESULT:</b> Touloni rarely remain whelps after their 13th birthday. Should that be the case, though, deadbeats are chased through the city as assistants and runners, because that’s all they’re good for.<br/><b>EQUIPMENT:</b> -`,

  'touloni-beauMonde': 'Beau Monde',
  'touloni-beauMondeDescription': `<b>PREREQUISITE:</b> AGI+Projectiles 6, CHA+Conduct 6, INS+Orienteering 6, Authority 2<br/><b>RESULT:</b> Should a Touloni pass the initial exams—an endurance test running through the swamps with gear on his back, and a brief discussion on the history of the Clan—he can count himself among the members of a proud organization. Despite the Beau Monde having had their primary purpose, defense of Toulon, superseded by the influx of Scourgers from the south, they still keep up their combat readiness and training, whether from matching the drills and exercises carried out by the African warriors sharing their city, or by leaving Toulon and joining up with other groups.<br/><br/>The Touloni keep the Beau Monde well supplied, and its members are trained to use their home territory to their advantage at all times. Members of the Beau Monde add +2D to INS+Orienteering in and around Toulon.<br/><b>EQUIPMENT:</b> Reinforced uniform; Beret; Saber; Rifle; Maps of Toulon`,

  'touloni-marin': 'Marin',
  'touloni-marinDescription': `<b>PREREQUISITE:</b> BOD+Toughness 5, BOD+Melee 6, AGI+Navigation 6, INS+Orienteering 5<br/><b>RESULT:</b> Toulon’s meteoric expansion under the auspicious gaze of Hamza the Raider would have been impossible without the blood, sweat, and tears of the Marins. They set sail from Port Lagagne every day at first light, their small boats setting out into the Mediterranean in the hundreds, and cast out their nets to bring home enough food to keep their city in good health. The vast majority of the Touloni can call themselves Marins, and are proud of that. In the evenings they return to their home and spend their hard-earned Dinars in the markets and shops—economic stimulation, Hamza would say with a grin.<br/><br/>The fishermen and sailors of the Clan are popular regulars in the city and the coastal villages. Marins pay only two thirds of the regular prices for all kinds of services in Toulon and its vicinity.<br/><b>EQUIPMENT:</b> Fishing knife (personal weapon, Handling +2D instead of +1D)`,

  'touloni-officier': 'Officier',
  'touloni-officierDescription': `<b>PREREQUISITE:</b> BOD+Melee 7, AGI+Projectiles 7, AGI+Navigation 7 or CHA+Conduct 7, CHA+Leadership 6, Authority 3, Renown 3<br/><b>RESULT:</b> Standing tall at the prow of his ship on the open waters, the Officier can be clearly seen by anyone for miles around, resplendent in an elaborate uniform fitting of his position as a high-ranking member of the Beau Monde. He commands the coast guard, coordinates patrols through the nearby swamps, and discusses policing matters with the Scourgers in Toulon. The Cults, and the people of Franka, consider him incorruptible, and his Network Background rises by (2).<br/><br/>Additionally, the Officier builds up an extraordinary web of contacts in the hinterland of Franka, negotiating passage fees directly with the Resistance, and enjoying free lodging with the people in the area of Toulon. His influence expands into the Rhône delta where his squads sometimes hunt smugglers in shallow tributaries or crush pockets of rebels.<br/><b>EQUIPMENT:</b> Uniform; Beret; Saber or cutlass; Rifle`,

  'touloni-artisan': 'Artisan',
  'touloni-artisanDescription': `<b>PREREQUISITE:</b> AGI+Crafting 7, CHA+Arts 7, INT+Science 6<br/><b>RESULT:</b> It starts as an idle pastime for a Marin, whittling away at a block of wood to help him whittle away the hours spent out at sea waiting for his fishing nets to fill up, or a few idle brushstrokes in the evenings after his family has eaten to get an idea out of his head and onto a page. However, over time as his talent develops and is recognised, it begins to turn into something more. His carvings are spotted by eager Neolibyan tourists wanting to bring home a bit of their own Frankan culture, the painting is chosen to adorn the entrance hall of a local shop, and his name begins to filter out into the public domain. Soon, he makes enough to give up the life at sea, and dedicate himself entirely to the craft.<br/><br/>Artisans are particularly respected, giving them (+2) Renown. The majority of them work in one of Toulon’s workshops, or set up their own in the hinterland, but the real talents choose the path of the artist and master their craft. Many own parlors and booths in Port Lagagne and count Neolibyans, or African Leopards in disguise, as patrons. In any case, their income grows: (+2) Resources.<br/><b>EQUIPMENT:</b> Crafting tools (Level 2)`,

  'touloni-dignitaire': 'Dignitaire',
  'touloni-dignitaireDescription': `<b>PREREQUISITE:</b> CHA+Conduct 7, CHA+Negotiation 7, PSY+Cunning 8, Authority 4, Secrets 2<br/><b>RESULT:</b> As an Officier he made a daring arrest of a dangerous rebel out in the swamps, or proved himself time and again by coordinating well with Spitalians and Scourgers alike. As an Artisan he built up a strong network of contacts and patrons, carving out a niche for himself with words as artfully deployed as his works. Either way, the Anciens of the five Touloni families took notice, and made him an offer to become a Dignitaire. He leaves his previous role behind, and becomes an ambassador operating on behalf of the Touloni in the many settlements and villages around the city. He is a master of diplomacy, and knows how to turn any situation in his Clan’s favor. His Allies and Resources Backgrounds both increase by (+2). Additionally, he is assigned a personal guard consisting of six members of the Beau Monde.<br/><br/>All of the villages in Toulon’s sphere of influence each have a single Dignitaire assigned to them to manage and coordinate their resources and economy, with each of them paying taxes to their Dignitaire which he uses to both fuel Toulon’s economy, and to stimulate any changes in his particular settlement. When nobody is looking, he pockets some of the tax money for himself. It’s to be expected.<br/><b>EQUIPMENT:</b> Chain of office; Neolibyan seal of oaths (for diplomatic purposes); Letters of credit from the Grantors (worth 2,000 Dinars); Recording device; Carrier pigeons`,

  'touloni-ancien': 'Ancien',
  'touloni-ancienDescription': `<b>PREREQUISITE:</b> Elder of one of the five families of Toulon<br/><b>RESULT:</b> Since time immemorial the Touloni have counted themselves as the members of five ancestral families, stretching back through the ages. Their elders bear the weight of that heritage, along with the knowledge and experience refined and honed by years of service to the Clan. Each of the five Anciens is individually the leader of his family, maintaining a close eye on his descendants and setting their course, while also joining together with his four contemporaries to determine the path of the Clan as a whole. They rarely make public appearances, content to pass down their directives through shadowy networks of representatives bearing their unique family crests, but whenever they appear their proclamations shake the city.<br/><br/>The Anciens are exceptionally well connected to a vast array of contacts, informants, and negotiation partners: they add +2D to all CHA+Negotiation rolls, and have a permanent bonus of Network (+3). Only the Patriarche has the authority in the Clan to overrule them on any matter, and they use their influence to apply immense diplomatic pressure, hold back vital shipments to force a result they find acceptable, or raise scathing tolls on the Scorched Path to fund efforts closer to home.<br/><b>EQUIPMENT:</b> Family crest; Numerous bills of credit (worth 5,000 Dinars)`,

  'touloni-patriarche': 'Patriarche',
  'touloni-patriarcheDescription': `<b>PREREQUISITE:</b> Must be appointed by the Anciens<br/><b>RESULT:</b> There hasn’t been a Patriarche in Toulon for a long time. Only in times of war or other dire need do the Anciens choose a single Touloni, usually a Dignitaire, to elevate to the position. The Patriarche is given the full and unconditional backing of the Clan for the duration of the emergency, and can use any and all of the Clan’s resources without consulting the Anciens. He becomes the commander-in-chief of the Beau Monde, directing their missions all over Franka and using his own strategic skills, along with a council of Officiers, to determine the path to victory.<br/><b>EQUIPMENT:</b> Access to the Patriarche bunker below the Fortress of Toulon; Radio equipment; Medical supplies; Escape boat; Letter of asylum for the Neolibyan embassy at Montpellier.`
}

const touloniPotentials = {
  friendOfTheLion: 'Friend of the Lion',
  friendOfTheLionDescription: `<b>PREREQUISITE:</b> -<br/><br/>The Touloni are used to living amongst Lions; they are hard to outsmart.<br/><br/><b>RESULT:</b> With Friend of the Lion, a character gets <b>+1D per Potential Level</b> to <b>CHA+Negotiation</b> and <b>PSY+Cunning</b> to recognize a bad deal and turn it to a good one with a smile.`
}

const sharedClans = {
  ...touloniClans,
  ...stukovClans,
  ...brenniClans,
  ...providersClans,
  ...steelMastersClans,
  ...britoniClans,
  ...pictonsClans,
  ...druidsClans,
  ...ganaridsClans,
}

const sharedRanks = {
  ...touloniRanks,
  ...stukovRanks,
  ...brenniRanks,
  ...providersRanks,
  ...steelMastersRanks,
  ...britoniRanks,
  ...pictonsRanks,
  ...druidsRanks,
  ...ganaridsRanks,
}

const sharedPotentials = {
  ...touloniPotentials,
  ...stukovPotentials,
  ...brenniPotentials,
  ...providersPotentials,
  ...steelMastersPotentials,
  ...britoniPotentials,
  ...pictonsPotentials,
  ...druidsPotentials,
  ...ganaridsPotentials,
}

function buildLocale(locale: 'de' | 'en' | 'fr') {
  const baseRanks = baseClanRanks[locale] as Record<string, string>
  return {
    clans: {
      ...baseClanNames[locale],
      ...sharedClans,
    },
    ranks: {
      ...baseRanks,
      ...buildHunterGathererAliases(baseRanks),
      ...sharedRanks,
    },
    potentials: {
      ...sharedPotentials,
    },
  }
}

export const clanMessages = {
  de: buildLocale('de'),
  en: buildLocale('en'),
  fr: buildLocale('fr'),
}

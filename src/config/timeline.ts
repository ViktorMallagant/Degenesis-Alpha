export type TimelineSource = 'general' | 'spitalian'

export interface TimelineEvent {
  id: string
  year: number
  title: string
  summary: string
  source: TimelineSource
}

export const timelineSourceInfo: Record<
  TimelineSource,
  { label: string; shortLabel: string; pages: string }
> = {
  general: {
    label: 'General Canon',
    shortLabel: 'General',
    pages: 'Primal Punk, pp. 340–352'
  },
  spitalian: {
    label: 'Spitalian Archives',
    shortLabel: 'Spitalian',
    pages: 'Primal Punk, pp. 333–337'
  }
}

const general = (year: number, title: string, summary: string): TimelineEvent => ({
  id: `general-${year}`,
  year,
  title,
  summary,
  source: 'general'
})

const spitalian = (year: number, title: string, summary: string): TimelineEvent => ({
  id: `spitalian-${year}`,
  year,
  title,
  summary,
  source: 'spitalian'
})

export const generalTimelineEvents: TimelineEvent[] = [
  general(2043, 'The United Nations Fractures', 'Conflict over American dominance pushes the already weakened United Nations toward collapse. Major European states suspend their dues, reform movements gather momentum, and the UN presence in Nairobi closes.'),
  general(2045, 'A New World Order', 'Old alliances splinter into continental power blocs. The UEO and UAO emerge, while China expands its influence through protectorate-style alliances with neighboring states, including Mongolia and Kazakhstan.'),
  general(2046, 'The Mammoth Returns', 'A well-preserved mammoth is recovered from Arctic permafrost. Researchers in Helsinki successfully clone the animal, opening a new era of practical genetic reconstruction.'),
  general(2047, 'The UN Becomes a Forum', 'Attempts to restore the old United Nations fail. The organization survives mainly as a meeting place for the new blocs, while even NATO’s purpose is openly questioned.'),
  general(2050, 'China Looks West', 'Chinese trade and infrastructure investment transform Mongolia and Kazakhstan. Critics suspect the transport network is as useful for strategic expansion toward the Caspian as it is for commerce.'),
  general(2051, 'The Transhuman Era', 'Technological patents surge, advanced implants and prostheses become commonplace, and Recombination Group nanite research promises a medical revolution. Salim Mushar declares the Information Age over and the Transhuman Era begun.'),
  general(2053, 'Life in the Stream', 'The Stream becomes a surrogate reality woven into daily life, commerce, identity, communication, and entertainment. Resistance to pervasive technological integration remains marginal.'),
  general(2055, 'AIDS Vanquished', 'HIV is considered theoretically conquered. A worldwide treatment campaign begins, while UAO forces manage the resulting migrations and General Heshimu rises to international prominence.'),
  general(2057, 'The Year of the Sects', 'Religious and esoteric movements flourish in the Transhuman Era. Jehammed and Recombination Group co-founder Gerome Getrell become two of the era’s most influential spiritual figures.'),
  general(2064, 'HIV-Extreme', 'A previously unknown disease erupts around Côte d’Ivoire and Abidjan, spreading with alarming speed. The Pasteur Institute identifies it as an aggressive HIV strain, inflaming anti-American unrest across parts of Africa.'),
  general(2065, 'The Plague Crosses Africa', 'HIV-E spreads across the continent and proves airborne. Public life changes radically as masks, isolation, and fear become ordinary parts of survival.'),
  general(2066, 'Agadez Swells', 'Recombination Group announces progress toward an HIV-E serum. Refugees flood north into Agadez while Algeria and Libya close their borders, tearing at the political unity of Africa.'),
  general(2067, 'The Mediterranean Blockade', 'Algeria collapses under refugee pressure and Libya requests European help. The UEO fleet blocks passage toward Europe and begins destroying vessels before they can leave African ports.'),
  general(2068, 'The Africa Conflict', 'The blockade turns into open war. Armed refugee groups, European forces, coastal militias, and quarantine systems collide around the Mediterranean.'),
  general(2069, 'Machines Go to War', 'Thousands die at sea and under UEO fire. AMSUMO police robots are deployed in combat, but technological deterrence cannot overcome the desperation driving the refugees.'),
  general(2070, 'Asteroids Detected', 'The OWL telescope in Peru identifies several unknown asteroids on a probable collision course with Earth. The warning receives less attention than the war already raging around the Mediterranean.'),
  general(2071, 'The Silver Horde', 'The threat from space is confirmed. The Paladin asteroid-defense system is hurried into service, ultimately placing 211 satellites under control from Spitsbergen, while Recombination Group serum production and Project Tannhäuser accelerate.'),
  general(2072, 'The System Fails', 'Virus waves choke the Stream and repeatedly carry the signature 2^16. Recombination Group expands its storage facilities as fears grow that the digital system itself may be turning hostile.'),
  general(2073, 'The Eshaton', 'The Paladin defense fails and the asteroid swarm strikes on March 13. Global civilization collapses under impacts, earthquakes, fire, tsunamis, ash, electromagnetic disruption, and the destruction of the Stream; the catastrophe becomes known as the Eshaton.'),
  general(2074, 'The Day After', 'Survivors attempt reconstruction through local committees, military engineers, and emergency administrations. In Africa, the Sun Band incident leaves a vast corridor devastated by the atmospheric passage of an asteroid fragment.'),
  general(2075, 'The Reaper’s Blow', 'A vast tectonic rupture splits Central Europe from north to south. Germany, Switzerland, and Italy are torn by lava, earthquakes, and blowholes, making overland passage nearly impossible.'),
  general(2076, 'Europe Tears Open', 'The Reaper’s Blow widens. Settlements are crushed between upheaved rock and rivers of molten stone as Central Europe continues to break apart.'),
  general(2079, 'The Second Wave', 'HIVE reaches northern Europe and social order finally collapses beneath the epidemic. The Southern Ruhr Crisis Center barricades itself in ruined Dortmund; its doctors will become the ancestors of the Spitalians.'),
  general(2080, 'HIVE Engulfs Europe', 'No European or North African country remains untouched by HIVE. Survivors abandon the old population centers while ash, vermin, and silence claim the cities.'),
  general(2082, 'The Twilight Years', 'The post-Eshaton climate cools dramatically. Communications remain crippled, the Stream is considered lost forever, and emergency organizations struggle to rebuild without the old world’s logistical networks.'),
  general(2090, 'The Spital Opens', 'The Spitalians end their long isolation and establish the first containment zones around their headquarters, beginning a new campaign against disease and disorder.'),
  general(2095, 'The Seas Begin to Freeze', 'The Janus Crater disrupts the Gulf Stream. Europe’s climate deteriorates further as the North Sea and Baltic begin to freeze.'),
  general(2097, 'The Era of the Beast', 'Despair and social collapse trigger a wave of uncontrolled violence. Settlements are terrorized by raiders and antisocial groups as surviving institutions lose their grip.'),
  general(2102, 'The Chroniclers Emerge', 'Streamers occupy the freight yard that will become Justitian and search the ruins for pre-Eshaton knowledge. Locals begin calling them Chroniclers.'),
  general(2109, 'A Bubble of Static Stream', 'A Streamer group discovers a great collection of texts beneath Cologne Cathedral and, nearby, a surviving pocket of Static Stream on an old server. The data is slowly extracted and carried home.'),
  general(2122, 'The Libyan', 'An enterprising African merchant builds a growing trade network in grain and manufactured goods. His successors will remember him simply as the Libyan.'),
  general(2132, 'Rebus the Baptist', 'Cults and sects flourish in the ruins, but most vanish with their founders. Rebus’s practical form of faith endures, drawing farmers into a movement that will become the Anabaptists.'),
  general(2146, 'Exalt Is Founded', 'The founding of Exalt ends the Era of the Beast within its sphere of influence. Organized patrols pacify the surrounding region even while Clans remain dangerous beyond the city’s reach.'),
  general(2148, 'The Dictate of Faith', 'Anabaptists storm Cologne Cathedral and deprive the Chroniclers of their greatest surviving cache of old texts and data, bringing the Streamer movement close to ruin.'),
  general(2160, 'The Masai Depart', 'The Masai leave the Ngorongoro Crater and enter a transformed, largely deserted landscape.'),
  general(2173, 'The First Cascade', 'One hundred years after the Eshaton, Recombination Group Dispensers release the first Sleeper generation, the 100s. They begin manipulating settlements, restoring infrastructure, and preparing the world for later generations.'),
  general(2185, 'East Borca Awakens', 'A warmer, wetter climate east of the Reaper’s Blow allows forests to spread and life to return across East Borca.'),
  general(2210, 'Blood on the Adriatic', 'Purgans and Balkhani meet in the fertile Adriatic lowlands and both claim the land. Their confrontation turns violent and establishes the roots of a centuries-long frontier conflict.'),
  general(2215, 'The Neolibyans Expand', 'The Libyan’s commercial legacy has become the Neolibyan Cult. Its merchants move beyond Africa and begin exploiting the abandoned coasts of western Purgare, with Syracuse becoming an important port.'),
  general(2265, 'The Invasion of Africa', 'Spanish forces bridge the Strait of Gibraltar in search of African oil. Africa initially lacks the strength to stop the invaders from stripping resources from the north.'),
  general(2269, 'Hybrispania Is Born', 'African forces drive the Spanish invasion back across Gibraltar and seize Andalusia as compensation. Spain’s old identity fades and the land increasingly becomes known as Hybrispania.'),
  general(2270, 'Exalt Ascendant', 'Exalt grows into a powerful economic center whose influence reaches far beyond its walls, provoking envy throughout Borca.'),
  general(2273, 'The Second Cascade', 'The 200s awaken from Balkhan Dispensers, but prolonged cryostasis has damaged their memories. Confused Sleepers clash with the Balkhani while Palers still regard them as divinely appointed leaders.'),
  general(2305, 'Visitors from the East', 'Thirteen great Chinese sailing barges reach Franka. Mistaken at first for invaders, their crews present themselves as merchants and explorers and begin studying the land.'),
  general(2310, 'The Adriatic Front', 'Purgans and Balkhani fortify the Adria with trenches and barriers. Spitalian infirmary cities arise on the Purgan side, provoking attacks on Spitalian facilities by enraged Balkhani elsewhere in Europe.'),
  general(2320, 'The Ice Barrier Advances', 'The expanding Ice Barrier pushes Scandinavian survivors south toward former Germany. Their migration helps revive Borcan culture and carries Jehammedan influence into the nomadic forest tribes.'),
  general(2333, 'Anabaptists Enter Purgare', 'The Anabaptists begin organized conversion efforts in Purgare, adding a new religious power to the already contested region.'),
  general(2373, 'The Third Cascade Fails', 'The 300-year Sleepers are due to awaken, but their Dispensers remain closed. Whether the failure comes from the 2^16 corruption or interference inside the bunkers remains unknown.'),
  general(2381, 'The First Judge', 'The First Judge appears in northern Borca and begins imposing a new vision of justice that will eventually shape an entire Cult.'),
  general(2390, 'Argyre Claims Britain', 'Argyre, the Vulture, uses Sleeper technology and Ambrosia to dominate other Sleepers. He declares Britain his domain and warns outsiders away.'),
  general(2410, 'Justitian Founded', 'Chroniclers and Judges jointly found Justitian, establishing the city that will become the great political and legal center of Borca.'),
  general(2482, 'The City Wars', 'The Sleeper Cultrin awakens with his memories intact, activates other Sleepers through buried memetics, and builds a powerful army from old weapons and mercenaries. His campaign destabilizes Borca until resistance, disease, and his sudden disappearance fracture the force he created.'),
  general(2495, 'Exalt Falls', 'War veterans and irregulars tear Exalt apart from within. The Exalters abandon the city, agriculture collapses, and the once-great center becomes a ghost town.'),
  general(2496, 'Liqua Rises', 'Refugees from Exalt establish Liqua, a city built around reliable water, gambling, vice, and the freedom of those who escaped the old order.'),
  general(2498, 'The Protectorate Is Born', 'As Exalt fades, Justitian’s Protectors extend their influence across neighboring settlements. Their network becomes the Justitian Protectorate.'),
  general(2512, 'The Great Library', 'Archivists from Praha Republika begin construction of the Great Library in Osman while expeditions search the ruins of East Borca for surviving texts.'),
  general(2515, 'The Archivists Vanish', 'Praha’s Archivists disappear from the Great Library. Legend claims that Death himself carried them into the depths.'),
  general(2531, 'The Protectorate Flourishes', 'Justitian expands over several square kilometers. The Spitalians accept a loose alliance with the Protectorate while preserving their own independence and privileges.'),
  general(2563, 'The Needle Tower Disaster', 'The Chroniclers send sixteen elite Fragments across the Reaper’s Blow to establish a new information network. Isolation, power, and wealth corrupt several of them, and at least Iridium and Chromium establish independent domains.'),
  general(2573, 'The Dispensers Fail', 'The most recent scheduled Sleeper release demonstrates how badly Recombination Group systems have deteriorated. Dispensers open irregularly and the old plan continues to unravel.'),
  general(2586, 'Archot’s Monument Falls', 'A Jehammedan assassin destroys Supreme Judge Archot’s monument in Justitian. Sectarian violence follows, an Isaakii is murdered, and a thousand Swords of Jehammed march west before the Reaper’s Blow stops them.'),
  general(2591, 'The Adriatic War Exhausts Itself', 'Centuries of conflict between Jehammedans and Anabaptists along the Adriatic have lost much of their intensity. Both sides remain hostile, but both are badly depleted.'),
  general(2593, 'The Signal and Chernobog', 'A pulsed AM signal begins repeating across Europe and is traced toward the Balkhan. At the same time Chernobog awakens, gathers forest Clans, and smashes through Praha Republika’s defenses.'),
  general(2594, 'The Clans Rise', 'Clans attack Osman, Judges, merchants, and frontier settlements across Borca while the Protectorate begins to crumble. Voivodes seize power in the Balkhan, and old enemies among the Cults begin exploring alliances.'),
  general(2595, 'Today', 'The known world stands at a new turning point: the Protectorate faces the Clans, Cults close ranks, Chernobog marches, and unanswered questions surrounding Argyre, the Great Library, and the future of Europe remain open.')
]

export const spitalianTimelineEvents: TimelineEvent[] = [
  spitalian(2073, 'Primer Seeded', 'The asteroid strikes devastate humanity but seed Primer matter across the northern hemisphere. Fragments also reach the south, while the massive body later called Colossus sinks into the Atlantic.'),
  spitalian(2100, 'Sepsis Takes Hold', 'Most Primer matter across Europe and Asia has developed into Sepsis. Yellowstone ash hinders its spread in America, while Central Africa shows the first Primer-driven plant and pollen adaptations.'),
  spitalian(2200, 'The Spore Age', 'Pandora becomes a breeding ground for altered insects and primordial life, Souffrance spores enter the drug trade, and Sepsis begins expanding uncontrollably. African Primer vegetation spreads along the Equator.'),
  spitalian(2221, 'The First Psychonauts', 'Documented paranormal phenomena emerge in humans, especially around former Poland. The earliest Psychonauts appear, although the Spitalians will not understand their connection to Sepsis until decades later.'),
  spitalian(2235, 'Colossus Opens', 'A seaquake exposes part of Colossus. Primer-adapted arthropods hatch and begin spreading through the oceans, first dismissed on Franka’s shores as strange crabs.'),
  spitalian(2240, 'Souffrance Changes', 'Souffrance becomes notorious both for Burn and for the increasingly alien ecology inside the crater, including great vents and insect systems saturated with pheromones.'),
  spitalian(2267, 'Paris Falls', 'Insect swarms and Sepsis overwhelm a sinking, marsh-bound Paris. Mother spore fields bloom in the city, destroy defensive works, and force the population to abandon the region.'),
  spitalian(2270, 'Three Raptures', 'Biokinesis, Pregnocticism, and Dushan are recognized as established European Raptures, each tied to powerful Mother spore fields and their Earth Chakras.'),
  spitalian(2290, 'A New African Climate', 'Permanent rainfall transforms the Congo basin into a vast lake, opening water routes into central Africa even as Primer vegetation continues to block passage farther south.'),
  spitalian(2300, 'War on the Primer', 'Methane emissions and accelerated insect evolution around Souffrance convince the Spitalians that Sepsis is directly responsible. Their organized campaign against the Primer begins.'),
  spitalian(2302, 'The Fourth Rapture', 'Neolibyans encounter Psychokinetics in western Purgare. From the beginning, the Spitalian record treats this fourth Rapture as unusually dangerous and unpredictable.'),
  spitalian(2306, 'The Pheromancers', 'Highly specialized Psychonauts emerge from Frankan Mother spore fields and dominate insect swarms. Local communities accept them, while Spitalian warnings are rejected and the doctors are expelled.'),
  spitalian(2312, 'The Festering', 'Spitalians destroy the Mother spore field at Menden with extreme measures. Their victory creates the Festering, a spreading region contaminated by entropic nanites.'),
  spitalian(2320, 'Primer Enters the Water', 'African Primer pollen spreads through waterways. Lake Victoria develops a proliferating algal layer that is carried down the Nile.'),
  spitalian(2360, 'The Key', 'Alien vegetation flourishes along the Nile. Rather than destroy it, the Anubians study and experiment with the growths, calling them the Key.'),
  spitalian(2390, 'New Spitalian Weapons', 'The Spitalians suppress Sepsis more effectively in Borca using Mollusks, improved fungicides, and Echein spiders bred to prey on spore-carrying insects.'),
  spitalian(2455, 'Discordance Theory', 'Spore adaptation weakens Spitalian fungicides, but a new phenomenon offers hope: interference between European Chakras and African Psychovores appears to disrupt the Primer network, killing Dushani and producing failed mutations.'),
  spitalian(2470, 'Chakra Quakes', 'Discordant signals corrupt the Biokinetic Earth Chakra. Many Biokinetics die or go mad before the collective sheds the damaged generation and begins producing replacements.'),
  spitalian(2476, 'The Discordance Zone', 'The worst instability subsides, but Mother spore fields around the Mediterranean remain trapped in distorted resonance. People begin calling the affected region the Discordance Zone.'),
  spitalian(2492, 'Danzig Occupied', 'Spitalian forces enter Danzig without meaningful resistance. Many Pollners flee, and the city becomes the Cult’s primary base for operations deeper into Pollen.'),
  spitalian(2512, 'The Spore Wall', 'The eastern passage closes as Sepsis joins Pollen and Balkhan infestations into a barrier. Spitalians build linked Destruction Fortresses to burn and poison a corridor through it.'),
  spitalian(2535, 'The Raze Expands', 'Africa’s Psychovore belt grows and transmits dangerous genetic information through pollen and thorns. Expeditions return altered, younger, or without coherent memory, while some previously divided tribes begin communicating across language barriers.'),
  spitalian(2544, 'The Corridor Breaks', 'Earth walls from the spore fields sever the Destruction Fortress rail links. A major Spitalian expedition disappears and the Sepsis closes the breach.'),
  spitalian(2562, 'Vasco’s Fall', 'Dr. Hernez Vasco returns from Pandora transformed and challenges official doctrine, arguing that the Primer may be ancient life-seeding DNA rather than a simple invader. Two days after presenting his theory, he flees with thirty-six followers.'),
  spitalian(2570, 'Vasco Escapes', 'Preservists locate Vasco near Laibach, but he defeats them and disappears. Later reports place him in multiple locations, though the Cult dismisses most sightings.'),
  spitalian(2575, 'The Body of Vasco', 'Famulancers recover a corpse identified as Vasco from a Briton research bunker. Later sightings prove that Vasco still lives, and the preserved body is transferred to Consultant Petrova’s HIVE research group.'),
  spitalian(2587, 'Hot Spots', 'Preservists discover circular regions of inexplicably thawed ground near Lodz. They initially blame Biokinetics, an interpretation later shown to be wrong.'),
  spitalian(2588, 'Something Beneath Lodz', 'Excavations uncover a crackling white mass of nerves and muscle that radiates heat but dies quickly after exposure. Samples are taken to Danzig for study.'),
  spitalian(2589, 'The First Fractal Forest', 'Pollen nomads admit planting bulbs in Hot Spots, while Spitalians discover a Fractal Forest near Breslau. The phenomena appear unrelated to ordinary spore infestation in the Clanners.'),
  spitalian(2590, 'Metamorphosis Witnessed', 'Danzig Preservists watch a decaying spore field transform into a Fractal Forest and document its defenses. The event proves that Hot Spots and Fractal Forests are not products of the Earth Chakra.'),
  spitalian(2591, 'The Fractal Pattern', 'Hundreds of Hot Spots and Fractal Forests reveal vast fractal coils when mapped. Spitalians suspect Hot Spots transform existing spore fields and search for a possible center south of Danzig.'),
  spitalian(2593, 'Debate over the Forests', 'Anabaptists begin protecting Fractal Forests, while the Spitalians debate whether they are a threat or an opportunity. Apocalyptics burn them because their spread destroys profitable Burn fields.'),
  spitalian(2594, 'The Qabis Mission', 'At the invitation of Tripol’s Bank of Commerce, Spitalians land in Qabis and begin direct study of the African Psychovores under the watch of the Anubians.'),
  spitalian(2595, 'Today: Unanswered Questions', 'Discordance remains poorly understood, Fractal Forests have changed the war against the Primer, and research into Africa’s vegetation belt has only just begun.')
]

export const timelineEvents: TimelineEvent[] = [
  ...generalTimelineEvents,
  ...spitalianTimelineEvents
]

export const WEAPON_PROPERTY_DESCRIPTIONS: Record<string, string> = {
  'anti-armor': '<b>ANTI-ARMOR</b><br>This extremely compact, high-speed projectile punches through armor like paper.<br><br>Armor-piercing projectiles do not inherently deal more damage, but they ignore special armor properties such as "Massive" or "Bulletproof".',

  'camouflage': '<b>CAMOUFLAGE (DIFFICULTY)</b><br>A weapon with the « Camouflage » property does not really look like a weapon, or can be easily concealed. The value of this property represents the difficulty of penetrating the disguise via an INS+Perception check.',

  'muzzle loader': '<b>MUZZLE LOADER</b><br>The weapon is loaded with powder and then a projectile through the muzzle. This procedure takes time—specifically, two actions.',

  'impact': '<b>IMPACT (TRIGGER)</b><br>This weapon is heavy and unwieldy, but in the hands of a professional, it becomes a true engine of destruction. The fighter can only attack or defend during their next action if they roll the required number of triggers. If they fail to do so, they lose their balance and must spend one action to regain their grip on the weapon. Alternatively, they may choose to drop it and fight unarmed.',

  'blunt': '<b>BLUNT</b><br>Judgment hammers and maces are blunt weapons that are particularly effective against armor possessing the property « Massive ».',

  'Thunder Strike': '<b>THUNDER STRIKE</b><br>Each shot rings out like a thunderclap, sending dust swirling and snow tumbling from the trees. A thunderclap will send a herd of mammoths stampeding, and other animals will flee.',

  'Area Damage': '<b>AREA DAMAGE (ANGLE)</b><br>The weapon does not aim at a specific target but covers an area defined in degrees. Anything within this area takes damage.',

  'Special Damage': '<b>SPECIAL DAMAGE (ENEMY TYPE, DAMAGE)</b><br>A weapon with "Special Damage" is designed to deal specific damage to a certain type of enemy.',

  'Deviation': '<b>DEVIATION</b><br>Grenades and other indirect weapons never exactly hit their target. Every successful attack goes along with a roll (1D). The result is the deviation of the intended target in meters. The Triggers are subtracted from the result: the more Triggers, the more exact the attack.<br><br>When an attack fails, you roll 2D to determine the distance in meters between the impact point of the missile and the intended target.',

  'dispersion': '<b>SCATTER</b><br>The weapon fires dozens of projectiles that spread out in a cone-shaped area of ​​effect to strike the target. Although buckshot can tear gaping holes in a target at close range, its destructive power dissipates rapidly after just a few meters.<br><br>The damage values ​​listed in the weapon\'s stats therefore apply only at short range. At greater distances, the damage is reduced by 4 points. However, no range penalty applies in this case.',

  'double barreled': '<b>DOUBLE BARRELED</b><br>The weapon has two barrels that can be fired together or independently. Whatever the attacker decides to do, he only needs one Attack roll. To shoot from both barrels doubles the Damage.',

  'entangled': '<b>ENTANGLED (MOVEMENT PENALTY)</b><br>A bola entangles the legs, a net makes movement impossible: weapons with the "Entangled" Quality bring a penalty on all Skills requiring movement in addition to their standard Damage. The attack\'s Triggers are not added to the Damage, but to the penalty. The fighter can try to free himself with his next Action: by force (BOD+Force) or by wiggling out of the entanglement (AGI+Mobility). The Difficulty is 2. However, the penalty applies. A companion can come to his aid and roll BOD+Force (2) as his Action to tear the net or the bola away from his comrade.',

  'biometrically encoded': '<b>BIOMETRICALLY ENCODED (DIFFICULTY)</b><br>The shaft contains biometrical sensors that are only triggered when the right person wields the weapon. Often, the electronics hum and vibrate to show their readiness. In the hands of a stranger, nothing happens: he cannot fire the weapon. To switch off this protective mechanism or change the encoding, the circuits have to be formatted or bypassed. Both require a skillful technician with an electronics workshop. He first has to make an Action roll on AGI+Crafting against the Difficulty of the Quality to lay bare the electronics. With INT+Engineering (Difficulty), he identifies the circuitry, understands its workings, and manipulates it. If one of the rolls fails, the Difficulty rises by 1. If it rises to 12, the weapon powers down. The only value it now has is its scrap value.',

  'jamming': '<b>JAMMING</b><br>Jamming is a curse, and a shooter who uses a weapon with this Quality should resign to his fate. If he rolls more 1s than 6s when attacking, the weapon jams. It takes (1) Action to remove the jam.',

  'standard': '<b>STANDARD (BONUS)</b><br>You fight for a common cause, carry it out onto the battlefield, are brothers and sisters in spirit—and the standard inspires and unites you all. As long as it is raised, everyone around it adds its bonus as dice to their Attack rolls.',

  'dazed': '<b>DAZED (EGO DAMAGE)</b><br>A weapon with this Quality does not cause Flesh Wounds, but instead directly reduces Ego Points. Unless noted differently, armor reduces the Damage.',

  'explosive': '<b>EXPLOSIVE</b><br>The ammo used detonates in a fireball and destroys everything in a certain radius. Apply the explosion rules.',

  'fragile': '<b>FRAGILE</b><br>If at least one die rolls a 1, the weapon shatters. If the Action was successful, it at least causes Damage.',

  'fire hazardous': '<b>FIRE HAZARDOUS</b><br>The ammo the weapon uses ignites its target. Apply the fire rules.',

  'Out of Control': '<b>OUT OF CONTROL (DIFFICULTY)</b><br>Some weapons are just as dangerous for their wielder as for those he attacks. If the attacker misses his target, he has to get his weapon under control again: he rolls BOD+Melee (Difficulty). If this roll fails, too, the weapon hurts him as if it had attacked him.',

  'fatal': '<b>FATAL</b><br>Thermonuclear detonations, the invisible death from a microwave ray gun, or a nanite infection ignore armor and tear or otherwise destroy the creature from the inside. A weapon with the "FATAL" Quality causes Trauma Damage.',

  'Cloud': '<b>CLOUD (RADIUS, AMOUNT OF TIME)</b><br>When a grenade is detonated, its agent spreads and covers an area with a radius of several meters. If there is no wind, the cloud hovers above the battlefield for a few Combat Rounds before dissipating. If someone remains in the cloud, the Damage or other effects are cumulative unless stated otherwise.',

  'piercing': '<b>PIERCING (ARMOR RATING)</b><br>The bullet or the charge fired pierces any armor up to the Armor rating in brackets completely. Any Armor rating above the number in brackets is subtracted from the Damage as usual or—depending on the weapon—the bullet is completely deflected.',

  'salvoes': '<b>SALVOES (NUMBER OF ROUNDS)</b><br>Some automatic weapons have a high rate of fire. This gives them the "Salvoes" Quality. The shooter can fire several bullets in rapid succession—and thus in (1) Action. The maximum number of bullets fired is listed in the brackets. Every bullet increases the Handling by +1D and the Damage by (1). If several targets are close together and the shooter wants to move the weapon, he splits his attack dice evenly between targets, rounded down.<br><br>He rolls for every target and determines the Damage; the extra Damage is also divided between the targets. If he fires a salvo of 5 bullets against 3 targets, the extra Damage of (5) decreases to (1) point of Damage per target (5 divided by 3 is 1, rounded down). Of course, a salvo cannot hit more targets than it contained bullets.',

  'Smooth Running': '<b>SMOOTH RUNNING (TRIGGER)</b><br>The perfect weapon for attacks in rapid succession. If the fighter reaches at least the stated number of Triggers with his Attack roll, he may attack again right afterwards, though this time with a penalty of -2D.<br><br>Smooth Running can be activated on these extra attacks, but the penalty rises by -2D with every additional attack.',

  'sensitive': '<b>SENSITIVE</b><br>High-precision weapons like sniper rifles are sensitive to jolting. When a fighter with such a weapon is forced into melee or is attacked, 1T is enough for the opponent to Damage the weapon: its Handling permanently decreases by -1D.<br><br>Skilled craftsmen can repair a damaged weapon. They roll AGI+Crafting: the Tech Level of the weapon and the Damage taken determine the Difficulty. If the roll succeeds, the Damage is repaired. If it fails, the Handling decreases by another -1D.',

  'Special': '<b>SPECIAL</b><br>This weapon has special rules described in its detailed entry.',

  'talisman': '<b>TALISMAN (BONUS)</b><br>This item has a sentimental value that cannot be measured in Armor rating or piercing force: it gives its wearer extra dice on PSY+Faith/Willpower.',

  'terrifying': '<b>TERRIFYING (DIFFICULTY)</b><br>The mere sight of this weapon strikes fear into an enemy\'s heart: all opponents must succeed on a PSY+Faith/Willpower check against the property\'s difficulty or suffer a -2D penalty to their next action. At the start of each combat round, they can regain their composure with a successful action check. Once the check succeeds, the opponent becomes immune for the remainder of the combat.',

  // Weapon properties
  'Splaying': '<b>Splaying</b><br>If an attack succeeds with 2 triggers, the fighter can snap the blades shut to deal 1 additional die of damage. The 2 triggers used do not count toward the damage calculation. This means that if the player rolls only a 1 for the additional damage, they will deal 1 point less damage than if they had chosen not to use "Splaying." At best, they can deal +4 damage.',

  'gruesome': '<b>GRUESOME (RATING)</b><br>Bristling with serrated blades or menacing spikes, this weapon is designed to ensure that searing pain lingers long after striking its target. A weapon with this property grants (1) bonus trigger per level when it causes a Complication (at least one trigger must be spent initially to inflict the Complication).',

  'Stun': '<b>STUN (RATING)</b><br>Weapons with the Stun property shake their targets and rattle their thoughts inside their skulls, delaying any reaction on their part. The target suffers the Disoriented Complication at a level equal to that of the property.',

  'panic': '<b>PANIC (RATING)</b><br>The effects of this weapon are truly terrifying. Anyone who witnesses such a weapon wreaking havoc must make a Mental Defense check with a difficulty equal to the property\'s level. On a failure, the target suffers from the Shell Shock Complication.',

  'Extended Reload': '<b>EXTENDED RELOAD (TIME)</b><br>Many weapons have a reloading process that is nearly impossible to complete during combat. The time required is indicated right after the name of the property.',

  'Single Loader': '<b>SINGLE LOADER (NUMBER OF ROUNDS)</b><br>This weapon does not reload via a detachable magazine, a clip, or a cylinder; instead, it features a loading gate or tubular magazine that requires rounds to be loaded one by one. The number of rounds that can be loaded in a single action is determined by the level of the property.',

  'silent': '<b>SILENT</b><br>This weapon produces minimal noise when fired, making it difficult to locate the shooter and avoiding panic among distant witnesses.',

  'discreet': '<b>DISCREET</b><br>This weapon is small or easily concealed. It can be carried without attracting attention.',

  // Armor properties
  'Brittle': '<b>BRITTLE (CRITICAL DAMAGE RATING)</b><br>Armor plates can be hardened, increasing their armor value by 1 point. However, this process also makes the material brittle. If the armor sustains a certain amount of damage (determined by the property\'s value), the plates shatter and permanently lose 1 point of armor value.',

  'sealed': '<b>SEALED (BONUSSUCCESSES)</b><br>The armor offers reliable protection from environmental toxins, germs, and spore infestation. When rolling against contamination, the wearer automatically adds Successes.',

  'fire resistant': '<b>Fire Resistant (ARMOR)</b><br>Fire-resistant armor proves its worth in a Spitfire\'s inferno: instead of the normal Armor rating, the rating of the Quality is used. Also, the armor never ignites.',

  'unstable': '<b>UNSTABLE (CRITICAL DAMAGE RATING)</b><br>Riveted iron plates or layers of leather and sheets tied together with wire can be improvised quickly, but every blow weakens them, cuts through cords and tears away plates. If the Damage reaches or surpasses the Quality rating, an Unstable armor loses 1 point of its Armor rating. With 1 kg of scrap (of a level that equals at least Tech Level of the armor) and a roll on AGI+Crafting (Tech Level), 1 point of Armor rating can be recovered.',

  'insulated': '<b>INSULATED</b><br>The material completely protects from electrical discharges. Any electrical Damage is reduced to zero.',

  'massive': '<b>MASSIVE (ARMOR)</b><br>The armor is made from plates or cast in one piece; the material is hard and inflexible. Blades, edges, and pointed weapons are repelled or deflected. The protection against these weapons is higher (Armor rating = Quality rating).<br><br> On the other hand, Massive armor is susceptible to damage from Blunt weapons. A hammer can dent the material. It changes its shape and applies pressure on organs and bones until they give in and burst or break. Even if such armor is hard to penetrate, the wearer can die from internal injuries.<br><br> If the Damage (including Triggers) from a Blunt weapons is higher than the normal Armor rating disregarding "Massive", Flesh Wounds are caused as usual. The Triggers, however, cause additional Trauma.',

  'bulletproof': '<b>BULLETPROOF (ARMOR)</b><br>Bulletproof armor absorbs the kinetic energy of a projectile fired from a gun, and the wearer takes less Damage: when hit by bullets the Armor rating equals the Quality rating.',

  'first impression': '<b>FIRST IMPRESSION (BONUS)</b><br>The armor impresses. At first contact, its wearer gets bonus dice to all social interactions with strangers.',

  'respected': '<b>RESPECTED (TARGET GROUP, BONUS DICE)</b><br>The armor is respected by a certain part of the population. Its wearer gets bonus dice on social interactions with this group.',

  'terrifying (armor)': '<b>TERRIFYING (DIFFICULTY)</b><br>Something about the armor awakens a primal fear in those who see it. If their Action roll on PSY+Faith/Willpower (Difficulty) fails, they can only attack the wearer of the armor with a -2D penalty.<br><br> They can roll before every attack: once the fear is vanquished, they are immune for the rest of the combat. Only the highest source of the Quality is accounted for.',

  // Chemical agents
  'Attractant': '<b>ATTRACTANT (TARGET)</b><br>A lure always attracts a specific individual or a group of people sharing identical characteristics. It influences behavior, usually through pheromones that draw in the target.',

  'poisoned': '<b>POISONED (POTENCY, EFFECT, DURATION)</b><br>The chemical agent attacks the target\'s metabolism. The target must succeed on a PHY+Resistance check against the agent\'s Potency to resist its effects. Gas masks and armor with the "Sealed" quality provide protection in the form of automatic successes, provided the agent was neither ingested nor injected.',

  'pseudo desporing': '<b>PSEUDO DESPOREING (DESPORING, DURATION)</b><br>The catalytic effect of the spores is blocked for a certain duration, and the level of sporulation in a Leperos or Psychonaut temporarily decreases by an amount equal to the Exsporiator points. Once the time has elapsed, the target regains its total number of Spore Infestations.',

  'narcotic': '<b>NARCOTIC (POTENCY, DAMAGE)</b><br>Narcotics cripple the nervous system. As with "Poisoned", a roll on BOD+Toughness is permitted. Gas masks and the "Sealed" Quality protect against narcotics. In case of a failure, the Damage plus Triggers is subtracted from the enemy\'s Ego Points.',

  // Traps
  'hidden': '<b>HIDDEN (DIFFICULTY)</b><br>A trap\'s first value indicates its stealth. If a potential victim approaches, they can spot the trap in time with a successful INS+Perception roll. This value determines the difficulty. If the roll fails, the victim gets too close and the trap triggers.',
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

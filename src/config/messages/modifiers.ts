// Translation dictionary for free-text "modifier" strings attached to Legacies and Potentials.
// These strings are stored as raw French text in the data layer (src/config/legacies/legacies.ts
// and src/config/cults/*/potentials.ts, src/config/potentials/common.ts) rather than i18n keys,
// so this lookup table maps the exact French source text to its EN/DE translation.
// Used by store.legacyModifiers / store.potentialModifiers via translateModifier().
export const modifierTranslations: Record<string, { en: string; de: string }> = {
  "Ressources applicable à n'importe quel Culte avec malus -2. Chaque utilisation envers un autre Culte donne -1D aux jets sociaux avec les autres Cultes pendant 1 semaine.": {
    en: "Resources can be applied to any Cult with a -2 penalty. Each use toward another Cult gives -1D to social rolls with other Cults for 1 week.",
    de: "Ressourcen sind bei jedem Kult mit -2 Malus anwendbar. Jede Nutzung gegenüber einem anderen Kult ergibt -1W auf soziale Würfe mit anderen Kulten für 1 Woche."
  },
  "Votre mécène vous protège, mais peut exiger des tâches en retour. S'il est déçu, il vous abandonnera.": {
    en: "Your patron protects you, but may demand tasks in return. If disappointed, they will abandon you.",
    de: "Dein Patron schützt dich, kann aber im Gegenzug Aufgaben verlangen. Ist er enttäuscht, wird er dich fallen lassen."
  },
  "-2D à tous les jets d'interaction sociale dans toute zone où votre Culte est dominant.": {
    en: "-2D to all social interaction rolls in any area where your Cult is dominant.",
    de: "-2W auf alle sozialen Interaktionswürfe in jedem Gebiet, in dem dein Kult dominant ist."
  },
  "Max 1 point dans les historiques à la création. -1D INS+Empathie en permanence.": {
    en: "Max 1 point in Origins at creation. Permanent -1D to INS+Empathy.",
    de: "Max. 1 Punkt in Hintergründen bei der Erstellung. Dauerhaft -1W auf INS+Empathie."
  },
  "CHA+Commandement +2S quand vous dirigez d'anciens disciples. Quand Renommée atteint 5, vos ennemis envoient des assassins.": {
    en: "CHA+Leadership +2S when leading former disciples. When Renown reaches 5, your enemies send assassins.",
    de: "CHA+Führung +2E, wenn du frühere Anhänger führst. Wenn Ruf 5 erreicht, schicken deine Feinde Attentäter."
  },
  "1 000 LC de revenus mensuels. Si Ressources < 2 : perte de la propriété, -3 Autorité et -3 Renommée.": {
    en: "1,000 LC monthly income. If Resources < 2: loss of the property, -3 Authority and -3 Renown.",
    de: "1.000 LC monatliches Einkommen. Wenn Ressourcen < 2: Verlust des Besitzes, -3 Autorität und -3 Ruf."
  },
  "Si le secret est révélé publiquement, un agent de haut rang est envoyé pour vous éliminer.": {
    en: "If the secret is revealed publicly, a high-ranking agent is sent to eliminate you.",
    de: "Wird das Geheimnis öffentlich aufgedeckt, wird ein hochrangiger Agent geschickt, um dich auszuschalten."
  },
  "Aucun historique ne peut dépasser 4 sans approbation.": {
    en: "No Origin can exceed 4 without approval.",
    de: "Kein Hintergrund kann ohne Genehmigung 4 überschreiten."
  },
  "-2D interactions sociales avec marchands qui vous connaissent. -4D avec ceux que vous avez escroqués.": {
    en: "-2D social interactions with merchants who know you. -4D with those you have swindled.",
    de: "-2W soziale Interaktionen mit Händlern, die dich kennen. -4W mit denen, die du betrogen hast."
  },
  "+2D à toutes les interactions sociales. Décroit de 1D par semaine une fois que les gens vous connaissent vraiment, jusqu'à -1D.": {
    en: "+2D to all social interactions. Decreases by 1D per week once people really get to know you, down to -1D.",
    de: "+2W auf alle sozialen Interaktionen. Sinkt um 1W pro Woche, sobald die Leute dich wirklich kennen, bis zu -1W."
  },
  "Jets d'interaction sociale avec le Culte de votre victime : -2D (Ascète), -4D (Sublime).": {
    en: "Social interaction rolls with your victim's Cult: -2D (Ascetic), -4D (Sublime).",
    de: "Soziale Interaktionswürfe mit dem Kult deines Opfers: -2W (Asket), -4W (Erhabener)."
  },
  "+1D défense mentale. Chaque échec de défense mentale = perte d'Égo égale à la difficulté du jet.": {
    en: "+1D Mental Defense. Each failed Mental Defense = Ego loss equal to the roll's difficulty.",
    de: "+1W mentale Verteidigung. Jeder fehlgeschlagene Wurf auf mentale Verteidigung = Ego-Verlust in Höhe der Schwierigkeit des Wurfs."
  },
  "+1D interactions sociales avec criminels. Prime sur votre tête : 250 LC × somme de vos 2 plus hauts Historiques.": {
    en: "+1D social interactions with criminals. Bounty on your head: 250 Drafts X the sum of your 2 highest Origins.",
    de: "+1W soziale Interaktionen mit Kriminellen. Kopfgeld auf dich: 250 LC × die Summe deiner 2 höchsten Hintergründe."
  },
  "Coût XP -2 pour attributs privilégiés, -1 pour compétences privilégiées. Coût XP +2 pour attributs non-privilégiés, +1 pour compétences non-privilégiées.": {
    en: "XP cost -2 for privileged attributes, -1 for privileged skills. XP cost +2 for non-privileged attributes, +1 for non-privileged skills.",
    de: "XP-Kosten -2 für privilegierte Attribute, -1 für privilegierte Fertigkeiten. XP-Kosten +2 für nicht privilegierte Attribute, +1 für nicht privilegierte Fertigkeiten."
  },
  "+5 valeur maximale de sporulation temporaire. -3D pour éviter de retomber dans la dépendance.": {
    en: "+5 maximum temporary Spore Infestation value. -3D to avoid relapsing into addiction.",
    de: "+5 maximaler temporärer Sporenbefall-Wert. -3W, um nicht in die Abhängigkeit zurückzufallen."
  },
  "Le bonus de compétence de l'ancien Culte reste applicable à la création. -5D interactions sociales avec l'ancien Culte si reconnu.": {
    en: "The former Cult's skill bonus remains applicable at creation. -5D social interactions with the former Cult if recognized.",
    de: "Der Fertigkeitsbonus des früheren Kults bleibt bei der Erstellung anwendbar. -5W soziale Interaktionen mit dem früheren Kult, falls erkannt."
  },
  "Vous pouvez appliquer vos historiques à deux Cultes différents du vôtre. -2D avec eux si vous agissez contre eux.": {
    en: "You can apply your Origins to two Cults different from your own. -2D with them if you act against them.",
    de: "Du kannst deine Hintergründe auf zwei Kulte anwenden, die nicht deine eigenen sind. -2W mit ihnen, wenn du gegen sie handelst."
  },
  "+1D interactions sociales avec criminels. -2D avec individus qui connaissent votre passé.": {
    en: "+1D social interactions with criminals. -2D with individuals who know your past.",
    de: "+1W soziale Interaktionen mit Kriminellen. -2W mit Personen, die deine Vergangenheit kennen."
  },
  "Objectif : retrouver l'assassin de votre proche. Sans le traquer activement pendant 1 semaine, vous ne pouvez plus reconstituer votre réserve d'Égo par le Concept.": {
    en: "Goal: find your loved one's killer. If you don't actively hunt them for 1 week, you can no longer restore your Ego pool through your Concept.",
    de: "Ziel: den Mörder eines geliebten Menschen finden. Jagst du ihn nicht aktiv für 1 Woche, kannst du deinen Ego-Vorrat nicht mehr über dein Konzept auffüllen."
  },
  "Si votre Historique Secrets atteint 4, ceux qui vous faisaient confiance se retournent contre vous.": {
    en: "If your Secrets Origin reaches 4, those who trusted you turn against you.",
    de: "Erreicht dein Hintergrund Geheimnisse 4, wenden sich diejenigen, die dir vertraut haben, gegen dich."
  },
  "2 points d'Égo pour agir en étroite collaboration avec quelqu'un, sinon -1D à toutes vos actions.": {
    en: "2 Ego points to act in close collaboration with someone, otherwise -1D to all your actions.",
    de: "2 Ego-Punkte, um eng mit jemandem zusammenzuarbeiten, sonst -1W auf alle deine Aktionen."
  },
  "abomination": {
    en: "abomination",
    de: "Abscheulichkeit"
  },
  "Vous débutez avec 3 points de sporulation permanente.": {
    en: "You start with 3 points of permanent Spore Infestation.",
    de: "Du beginnst mit 3 Punkten dauerhaftem Sporenbefall."
  },
  "Si vous perdez un combat ou une mission, tous vos Historiques baissent de 2.": {
    en: "If you lose a fight or a mission, all your Origins drop by 2.",
    de: "Verlierst du einen Kampf oder eine Mission, sinken alle deine Hintergründe um 2."
  },
  "+1D INS+Orientation. Alliés et Autorité ne peuvent pas dépasser 3.": {
    en: "+1D INS+Orienteering. Allies and Authority cannot exceed 3.",
    de: "+1W INS+Orientierung. Verbündete und Autorität können 3 nicht überschreiten."
  },
  "Peut dépasser le max normal. Science et Technologie ne peuvent pas dépasser 0.": {
    en: "Can exceed the normal max. Science and Engineering cannot exceed 0.",
    de: "Kann das normale Maximum überschreiten. Wissenschaft und Technik können 0 nicht überschreiten."
  },
  "Bonus applicables dans votre Culture d'origine. Si vous rejetez votre famille, tous vos Historiques baissent de 2.": {
    en: "Bonuses apply within your home Culture. If you reject your family, all your Origins drop by 2.",
    de: "Boni gelten in deiner Heimat-Kultur. Verstößt du deine Familie, sinken alle deine Hintergründe um 2."
  },
  "+6 points dans des compétences de CHA ou d'INT (peut dépasser le max normal). -2D à tous les jets de Défense mentale.": {
    en: "+6 points in CHA or INT skills (can exceed the normal max). -2D to all Mental Defense rolls.",
    de: "+6 Punkte in CHA- oder INT-Fertigkeiten (kann das normale Maximum überschreiten). -2W auf alle Würfe der mentalen Verteidigung."
  },
  "+2D pour rassembler un groupe de chercheurs de ferraille. Chaque mauvaise estimation perd 1 Renommée et réduit ce bonus de 1D (max -2D).": {
    en: "+2D to gather a group of scrap hunters. Each bad estimate loses 1 Renown and reduces this bonus by 1D (max -2D).",
    de: "+2W, um eine Gruppe von Schrottsuchern zu versammeln. Jede Fehleinschätzung kostet 1 Ruf und verringert diesen Bonus um 1W (max. -2W)."
  },
  "-2D interactions sociales avec forces de l'ordre et entités criminelles.": {
    en: "-2D social interactions with law enforcement and criminal entities.",
    de: "-2W soziale Interaktionen mit Ordnungskräften und kriminellen Organisationen."
  },
  "+1 à toutes les compétences de combat (peut dépasser le max normal). -2D à tous les jets d'interactions sociales pacifiques.": {
    en: "+1 to all combat skills (can exceed the normal max). -2D to all peaceful social interaction rolls.",
    de: "+1 auf alle Kampffertigkeiten (kann das normale Maximum überschreiten). -2W auf alle friedlichen sozialen Interaktionswürfe."
  },
  "+2 aux compétences ci-dessus peut dépasser le max normal. -1D à tous les jets nécessitant d'examiner le monde présent.": {
    en: "+2 to the skills above can exceed the normal max. -1D to all rolls requiring examination of the present world.",
    de: "+2 auf die obigen Fertigkeiten kann das normale Maximum überschreiten. -1W auf alle Würfe, die eine Untersuchung der gegenwärtigen Welt erfordern."
  },
  "PSY+Domination +2S pour intimider. -1S à toutes les compétences de CHA sauf CHA+Art.": {
    en: "PSY+Domination +2S to intimidate. -1S to all CHA skills except CHA+Arts.",
    de: "PSY+Dominieren +2E zum Einschüchtern. -1E auf alle CHA-Fertigkeiten außer CHA+Künste."
  },
  "Peut dépasser le max normal pour les compétences ci-dessus. 2 points d'Égo pour éviter de suivre une piste liée à votre passé, sinon -2D pour le reste de la journée.": {
    en: "Can exceed the normal max for the skills above. 2 Ego points to avoid following a lead tied to your past, otherwise -2D for the rest of the day.",
    de: "Kann das normale Maximum für die obigen Fertigkeiten überschreiten. 2 Ego-Punkte, um nicht einer Spur aus deiner Vergangenheit zu folgen, sonst -2W für den Rest des Tages."
  },
  "+2D interactions sociales avec criminels. -2D interactions sociales avec forces de l'ordre.": {
    en: "+2D social interactions with criminals. -2D social interactions with law enforcement.",
    de: "+2W soziale Interaktionen mit Kriminellen. -2W soziale Interaktionen mit Ordnungskräften."
  },
  "Si vous agissez contre votre Culte, Alliés/Autorité/Ressources baissent de 2. Vos supérieurs peuvent décider de vous faire taire.": {
    en: "If you act against your Cult, Allies/Authority/Resources drop by 2. Your superiors may decide to silence you.",
    de: "Handelst du gegen deinen Kult, sinken Verbündete/Autorität/Ressourcen um 2. Deine Vorgesetzten können beschließen, dich zum Schweigen zu bringen."
  },
  "-1D défense mentale contre la mémétique. Le Dormeur qui vous a contrôlé vous cherche toujours.": {
    en: "-1D Mental Defense against memetics. The Sleeper who controlled you is still looking for you.",
    de: "-1W mentale Verteidigung gegen Memetik. Der Schläfer, der dich kontrolliert hat, sucht noch immer nach dir."
  },
  "Jet de Défense mentale (2) pour résister à agir selon votre conditionnement.": {
    en: "Mental Defense roll (2) to resist acting according to your conditioning.",
    de: "Wurf auf mentale Verteidigung (2), um dem Handeln nach deiner Konditionierung zu widerstehen."
  },
  "+2D à toutes les compétences de CHA tant que Renommée > 2. 1 Égo pour créer quelque chose de nouveau, sinon -2D.": {
    en: "+2D to all CHA skills as long as Renown > 2. 1 Ego to create something new, otherwise -2D.",
    de: "+2W auf alle CHA-Fertigkeiten, solange Ruf > 2 ist. 1 Ego, um etwas Neues zu erschaffen, sonst -2W."
  },
  "Si Alliés passe sous 2, Ressources tombe à 0.": {
    en: "If Allies drops below 2, Resources falls to 0.",
    de: "Sinkt Verbündete unter 2, fällt Ressourcen auf 0."
  },
  "Tous vos Historiques peuvent être appliqués à un autre Culte. 1 Égo pour maintenir votre histoire cohérente lors d'un mensonge, sinon +2D pour détecter le mensonge.": {
    en: "All your Origins can be applied to another Cult. 1 Ego to keep your story consistent during a lie, otherwise +2D to detect the lie.",
    de: "Alle deine Hintergründe können auf einen anderen Kult angewendet werden. 1 Ego, um deine Geschichte bei einer Lüge konsistent zu halten, sonst +2W, um die Lüge zu entdecken."
  },
  "Peut sauter (1) repas par niveau de Potentiel sans malus.": {
    en: "Can skip (1) meal per Potential level without penalty.",
    de: "Kann (1) Mahlzeit pro Potenzial-Stufe ohne Malus auslassen."
  },
  "+1D par niveau à tous les jets en opposition contre un adversaire infesté par les spores (si Sporulation personnelle ≥ 5).": {
    en: "+1D per level to all opposed rolls against a spore-infested opponent (if personal Spore Infestation ≥ 5).",
    de: "+1W pro Stufe auf alle Gegenwürfe gegen einen sporenverseuchten Gegner (falls eigener Sporenbefall ≥ 5)."
  },
  "En situation désespérée : (1) succès supplémentaire par niveau à (1) action. Utilisable une fois tous les 3 jours.": {
    en: "In a desperate situation: (1) extra success per level on (1) action. Usable once every 3 days.",
    de: "In einer aussichtslosen Lage: (1) zusätzlicher Erfolg pro Stufe auf (1) Aktion. Einmal alle 3 Tage einsetzbar."
  },
  "(1) point d'armure naturelle par niveau. −1D par niveau à CHA+Séduction.": {
    en: "(1) point of natural armor per level. −1D per level to CHA+Seduction.",
    de: "(1) Punkt natürliche Rüstung pro Stufe. −1W pro Stufe auf CHA+Verführung."
  },
  "+1D par niveau à un unique jet d'INT. Utilisable une fois par jour.": {
    en: "+1D per level to a single INT roll. Usable once per day.",
    de: "+1W pro Stufe auf einen einzelnen INT-Wurf. Einmal pro Tag einsetzbar."
  },
  "Quand un danger menace : +1D par niveau à INS+Perception.": {
    en: "When danger threatens: +1D per level to INS+Perception.",
    de: "Wenn Gefahr droht: +1W pro Stufe auf INS+Wahrnehmung."
  },
  "+1D par niveau aux jets pour se libérer d'une prise, d'une immobilisation ou de chaînes.": {
    en: "+1D per level to rolls to break free from a hold, restraint, or chains.",
    de: "+1W pro Stufe auf Würfe, um sich aus einem Griff, einer Fesselung oder Ketten zu befreien."
  },
  "Les malus de Traumatisme sont réduits de (1) par niveau de Potentiel.": {
    en: "Trauma penalties are reduced by (1) per Potential level.",
    de: "Trauma-Mali werden um (1) pro Potenzial-Stufe verringert."
  },
  "+1D par niveau à PHY+Vigueur pour les jets liés à la course.": {
    en: "+1D per level to BOD+Stamina for running-related rolls.",
    de: "+1W pro Stufe auf KÖR+Ausdauer für laufbezogene Würfe."
  },
  "Une fois par confrontation : +1D par niveau à la Défense mentale pour contrer une Attaque mentale.": {
    en: "Once per confrontation: +1D per level to Mental Defense to counter a Mental Attack.",
    de: "Einmal pro Konfrontation: +1W pro Stufe auf mentale Verteidigung, um einen Mentalangriff abzuwehren."
  },
  "+1D par niveau à tout ce qui peut être résolu par les mathématiques ou la logique.": {
    en: "+1D per level to anything that can be solved through mathematics or logic.",
    de: "+1W pro Stufe auf alles, was durch Mathematik oder Logik gelöst werden kann."
  },
  "Fidèles combattant pour le personnage : récupèrent (1) Égo/round en sa présence. +1 Initiative par niveau au round 1.": {
    en: "Followers fighting for the character: recover (1) Ego/round in their presence. +1 Initiative per level on round 1.",
    de: "Anhänger, die für den Charakter kämpfen: erholen (1) Ego/Runde in seiner Gegenwart. +1 Initiative pro Stufe in Runde 1."
  },
  "+1D par niveau à AGI+Armes à projectiles pour les cibles hors portée effective.": {
    en: "+1D per level to AGI+Projectiles for targets beyond effective range.",
    de: "+1W pro Stufe auf GEW+Schusswaffen für Ziele außerhalb der effektiven Reichweite."
  },
  "Ne se perd jamais, trouve toujours nourriture et eau. (1) succès automatique par niveau à ses jets d'INS+Compétence.": {
    en: "Never gets lost, always finds food and water. (1) automatic success per level on their INS+Skill rolls.",
    de: "Verirrt sich nie, findet immer Nahrung und Wasser. (1) automatischer Erfolg pro Stufe auf seine INS+Fertigkeit-Würfe."
  },
  "Après séduction réussie : Défense mentale de la cible réduite de 1D par niveau lors de toute tentative d'influence.": {
    en: "After a successful seduction: target's Mental Defense reduced by 1D per level for any influence attempt.",
    de: "Nach erfolgreicher Verführung: mentale Verteidigung des Ziels um 1W pro Stufe verringert bei jedem Beeinflussungsversuch."
  },
  "En combat rapproché : +1 Défense passive par niveau pour (1) Égo par niveau et par round.": {
    en: "In close combat: +1 Passive Defense per level for (1) Ego per level and per round.",
    de: "Im Nahkampf: +1 passive Verteidigung pro Stufe für (1) Ego pro Stufe und pro Runde."
  },
  "Alliés combattant sous ses ordres : +1D aux jets de défense ou soutien. CHA+Commandement (3) → alliés récupèrent (niveau) Égo.": {
    en: "Allies fighting under their orders: +1D to defense or support rolls. CHA+Leadership (3) → allies recover (level) Ego.",
    de: "Verbündete, die unter seinem Kommando kämpfen: +1W auf Verteidigungs- oder Unterstützungswürfe. CHA+Führung (3) → Verbündete erholen (Stufe) Ego."
  },
  "Malus de combat ambidextre réduit de (1) par niveau. Les dés doivent encore être divisés entre les attaques.": {
    en: "Ambidextrous combat penalty reduced by (1) per level. Dice must still be divided between attacks.",
    de: "Malus für beidhändigen Kampf um (1) pro Stufe verringert. Die Würfel müssen weiterhin zwischen den Angriffen aufgeteilt werden."
  },
  "Sur le point de perdre conscience (Égo) : Défense mentale (4) +1D par niveau → si succès, toute la dernière perte d'Égo est annulée.": {
    en: "About to lose consciousness (Ego): Mental Defense (4) +1D per level → on success, the last Ego loss is entirely cancelled.",
    de: "Kurz vor dem Bewusstseinsverlust (Ego): mentale Verteidigung (4) +1W pro Stufe → bei Erfolg wird der letzte Ego-Verlust vollständig aufgehoben."
  },
  "(1) déclencheur par niveau à tous jets de la compétence choisie. −1D par niveau aux autres compétences du même attribut.": {
    en: "(1) trigger per level on all rolls of the chosen skill. −1D per level to other skills of the same attribute.",
    de: "(1) Auslöser pro Stufe auf alle Würfe der gewählten Fertigkeit. −1W pro Stufe auf andere Fertigkeiten desselben Attributs."
  },
  "Après un jet : relancer 1D par 2 Égo dépensés (maximum = niveau). Une seule utilisation par lancer ; doit garder le nouveau résultat.": {
    en: "After a roll: reroll 1 die per 2 Ego spent (maximum = level). Only one use per roll; must keep the new result.",
    de: "Nach einem Wurf: 1 Würfel pro 2 ausgegebene Ego neu werfen (Maximum = Stufe). Nur eine Anwendung pro Wurf; das neue Ergebnis muss übernommen werden."
  },
  "+1D par niveau à INS+Dressage. (1) déclencheur par niveau aux jets avec les créatures liées.": {
    en: "+1D per level to INS+Taming. (1) trigger per level on rolls with bonded creatures.",
    de: "+1W pro Stufe auf INS+Zähmen. (1) Auslöser pro Stufe bei Würfen mit gebundenen Kreaturen."
  },
  "Annule 1D de malus lié à la vitesse par niveau (déplacement, cibles actives ou en mouvement, vitesse de véhicule).": {
    en: "Cancels 1D of speed-related penalty per level (movement, active or moving targets, vehicle speed).",
    de: "Hebt 1W geschwindigkeitsbezogenen Malus pro Stufe auf (Bewegung, aktive oder sich bewegende Ziele, Fahrzeuggeschwindigkeit)."
  },
  "Chaque round entier à couvert : +1 Défense passive (max = niveau). Réinitialisé en quittant ou perdant le couvert.": {
    en: "Each full round spent in cover: +1 Passive Defense (max = level). Reset upon leaving or losing cover.",
    de: "Jede ganze Runde in Deckung: +1 passive Verteidigung (max. = Stufe). Wird zurückgesetzt, wenn die Deckung verlassen oder verloren wird."
  },
  "Corps désarmé : +niveau à Force pour Étourdissement ; ou supprimer Étourdissement pour infliger des dégâts de fracture.": {
    en: "Unarmed: +level to Force for Stun; or remove Stun to inflict fracture damage instead.",
    de: "Unbewaffnet: +Stufe auf Kraft für Betäubung; oder Betäubung entfernen, um stattdessen Bruchschaden zuzufügen."
  },
  "+1D par niveau à PHY+Force. Annule 1D d'encombrement par niveau. +niveau à Force pour les dégâts en corps à corps. Besoin du double de nourriture.": {
    en: "+1D per level to BOD+Force. Cancels 1D of encumbrance per level. +level to Force for melee damage. Needs double the food.",
    de: "+1W pro Stufe auf KÖR+Kraft. Hebt 1W Behinderung pro Stufe auf. +Stufe auf Kraft für Nahkampfschaden. Benötigt die doppelte Menge Nahrung."
  },
  "Achat de compétences/attributs non privilégiés : multiplicateur réduit de 1 (compétences niv. 1, attributs niv. 2), et des deux de 2 au niv. 3.": {
    en: "Purchasing non-privileged skills/attributes: multiplier reduced by 1 (skills lvl. 1, attributes lvl. 2), and both by 2 at lvl. 3.",
    de: "Kauf nicht privilegierter Fertigkeiten/Attribute: Multiplikator um 1 verringert (Fertigkeiten Stufe 1, Attribute Stufe 2), und beide um 2 bei Stufe 3."
  },
  "Avec son propre Culte/clan : −1D par niveau à PSY et CHA. Avec tout autre Culte/clan : +1D à la place.": {
    en: "With your own Cult/clan: −1D per level to PSY and CHA. With any other Cult/clan: +1D instead.",
    de: "Mit dem eigenen Kult/Clan: −1W pro Stufe auf PSY und CHA. Mit jedem anderen Kult/Clan: stattdessen +1W."
  },
  "+1D par niveau à la Défense mentale. Alliés optant pour ce jet gagnent (1) succès auto par déclencheur du héraut ; si le héraut échoue, ils échouent automatiquement.": {
    en: "+1D per level to Mental Defense. Allies opting into this roll gain (1) auto success per trigger of the herald; if the herald fails, they automatically fail.",
    de: "+1W pro Stufe auf mentale Verteidigung. Verbündete, die sich für diesen Wurf entscheiden, erhalten (1) automatischen Erfolg pro Auslöser des Herolds; scheitert der Herold, scheitern sie automatisch."
  },
  "Rallier sa cause : +1D par niveau à PSY et CHA. Chaque Renommée bravant le pouvoir = +1 Alliés. Malus = Renommée aux jets PSY/CHA envers les Cultes désignés.": {
    en: "Rallying to their cause: +1D per level to PSY and CHA. Each point of Renown defying authority = +1 Allies. Penalty = Renown to PSY/CHA rolls toward the designated Cults.",
    de: "Für die eigene Sache gewinnen: +1W pro Stufe auf PSY und CHA. Jeder Ruf-Punkt, der der Macht die Stirn bietet = +1 Verbündete. Malus = Ruf auf PSY/CHA-Würfe gegenüber den bezeichneten Kulten."
  },
  "Le malus de Traumatisme est réduit de (1) par niveau de Potentiel.": {
    en: "The Trauma penalty is reduced by (1) per Potential level.",
    de: "Der Trauma-Malus wird um (1) pro Potenzial-Stufe verringert."
  },
  "Attaque −5D+niveau dés : si réussit → ennemi inconscient et perd tous ses Égo ; si rate → désarmé (1) round.": {
    en: "Attack at −5D+level dice: on success → enemy unconscious and loses all their Ego; on failure → disarmed for (1) round.",
    de: "Angriff mit −5W+Stufe Würfeln: bei Erfolg → Gegner bewusstlos und verliert all sein Ego; bei Misserfolg → für (1) Runde entwaffnet."
  },
  "Si ≥ (6−niveau) dégâts infligés en une seule attaque : récupère immédiatement (1) Égo.": {
    en: "If ≥ (6−level) damage is dealt in a single attack: immediately recover (1) Ego.",
    de: "Wenn ≥ (6−Stufe) Schaden in einem einzigen Angriff verursacht wird: sofort (1) Ego zurückgewinnen."
  },
  "Contre un phénomène psychonautique avec ≥1 déclencheur : lance (niveau) dés supplémentaires et ajoute le résultat le plus élevé comme succès à la Défense mentale.": {
    en: "Against a psychonautic phenomenon with ≥1 trigger: roll (level) extra dice and add the highest result as a success to Mental Defense.",
    de: "Gegen ein psychonautisches Phänomen mit ≥1 Auslöser: würfle (Stufe) zusätzliche Würfel und füge das höchste Ergebnis als Erfolg zur mentalen Verteidigung hinzu."
  },
  "+1D par niveau à INS+Perception pour repérer Psychonautes, Léperos et champs de spores.": {
    en: "+1D per level to INS+Perception to spot Psychonauts, Leperos, and spore fields.",
    de: "+1W pro Stufe auf INS+Wahrnehmung, um Psychonauten, Leperos und Sporenfelder zu entdecken."
  },
  "Si blessures > 50% (Blessures + Traumatismes) : rage jusqu'à fin du combat — aucune limite d'Égo max mais Défense active impossible. Niveau unique.": {
    en: "If wounds > 50% (Fleshwounds + Traumas): rage until the end of combat — no max Ego limit but Active Defense is impossible. Single level.",
    de: "Wenn Verletzungen > 50% (Fleischwunden + Traumata): Rage bis zum Ende des Kampfes — keine Ego-Höchstgrenze, aber aktive Verteidigung unmöglich. Einzelne Stufe."
  },
  "(3) Égo → double les déclencheurs d'une attaque PHY+Corps à corps. Utilisable (niveau) fois par jour.": {
    en: "(3) Ego → doubles the triggers of a BOD+Melee attack. Usable (level) times per day.",
    de: "(3) Ego → verdoppelt die Auslöser eines KÖR+Nahkampf-Angriffs. (Stufe) Mal pro Tag einsetzbar."
  },
  "Attaque mentale INS+Empathie +1D/niveau : si réussit → ennemi −(déclencheurs+1) dés aux actions de combat physique contre lui jusqu'à fin de scène (annulé si le personnage attaque).": {
    en: "Mental attack INS+Empathy +1D/level: on success → enemy −(triggers+1) dice to physical combat actions against them until the end of the scene (cancelled if the character attacks).",
    de: "Mentalangriff INS+Empathie +1W/Stufe: bei Erfolg → Gegner −(Auslöser+1) Würfel auf körperliche Kampfaktionen gegen ihn bis zum Ende der Szene (aufgehoben, falls der Charakter angreift)."
  },
  "PSY+Dom +1D/niveau vs Défense mentale : si échec → cible −1D par déclencheur à tous ses jets au prochain round.": {
    en: "PSY+Domination +1D/level vs Mental Defense: on failure → target −1D per trigger to all their rolls on the next round.",
    de: "PSY+Dominieren +1W/Stufe vs. mentale Verteidigung: bei Misserfolg → Ziel −1W pro Auslöser auf alle seine Würfe in der nächsten Runde."
  },
  "Feinte PSY+Tromperie vs INS+Perception → si succès : PHY+Corps à corps +1D/niveau (diff. +4, Terrifiant (2), Choc (4DC), tous dégâts Mortels).": {
    en: "Feint PSY+Deception vs INS+Perception → on success: BOD+Melee +1D/level (diff. +4, Terrifying (2), Shock (4DC), all damage Lethal).",
    de: "Finte PSY+Täuschung vs. INS+Wahrnehmung → bei Erfolg: KÖR+Nahkampf +1W/Stufe (Schw. +4, Furchteinflößend (2), Schock (4SK), aller Schaden Tödlich)."
  },
  "Jet combiné PSY+Foi + INT+Médecine +1D/niveau pour soigner. Peut choisir de soigner Égo au lieu de Blessures superficielles.": {
    en: "Combined PSY+Faith + INT+Medicine roll +1D/level to heal. Can choose to heal Ego instead of Fleshwounds.",
    de: "Kombinierter Wurf PSY+Glaube + INT+Medizin +1W/Stufe zum Heilen. Kann sich entscheiden, Ego statt Fleischwunden zu heilen."
  },
  "À Traumatismes max : sacrifier (1) attribut (max permanent réduit) pour effacer (1) Traumatisme par niveau.": {
    en: "At max Trauma: sacrifice (1) attribute (permanent max reduced) to erase (1) Trauma per level.",
    de: "Bei maximalem Trauma: (1) Attribut opfern (dauerhaftes Maximum verringert), um (1) Trauma pro Stufe zu tilgen."
  },
  "INS+Empathie +1D/niveau vs Défense mentale pour détecter les mensonges. Jet combiné Empathie+Pulsions avec ≥2 déclencheurs révèle la nature (Léperos/faux-bourdon → porteur Amorce/Infiltré → brûlé/Dormeur).": {
    en: "INS+Empathy +1D/level vs Mental Defense to detect lies. Combined Empathy+Primal roll with ≥2 triggers reveals the nature (Leperos/drone → Amorce carrier/Infiltrator → Burned/Sleeper).",
    de: "INS+Empathie +1W/Stufe vs. mentale Verteidigung, um Lügen zu erkennen. Kombinierter Wurf Empathie+Primal mit ≥2 Auslösern offenbart die Natur (Leperos/Drohne → Amorce-Träger/Infiltrator → Verbrannter/Schläfer)."
  },
  "1 fois/jour/niveau : dépenser (1) Égo avant un jet → les 5 comptent comme déclencheurs supplémentaires mais les 2 comptent comme des 1.": {
    en: "1 time/day/level: spend (1) Ego before a roll → 5s count as extra triggers but 2s count as 1s.",
    de: "1 Mal/Tag/Stufe: (1) Ego vor einem Wurf ausgeben → 5er zählen als zusätzliche Auslöser, aber 2er zählen als 1er."
  },
  "Par tranche de (3/2/1) dégâts infligés à un Psychonaute (selon niveau) : il perd également (1) point de Sporulation.": {
    en: "For every (3/2/1) damage dealt to a Psychonaut (depending on level): they also lose (1) point of Spore Infestation.",
    de: "Pro (3/2/1) Schaden an einem Psychonauten (je nach Stufe): er verliert zusätzlich (1) Punkt Sporenbefall."
  },
  "Entre dans un coma indiscernable de la mort pendant (4−niveau) jours. Se réveille sain. Cumulable avec Pitié d'Anubis.": {
    en: "Enters a coma indistinguishable from death for (4−level) days. Wakes up healthy. Stackable with Anubis's Mercy.",
    de: "Fällt für (4−Stufe) Tage in ein Koma, das nicht von Tod zu unterscheiden ist. Wacht gesund auf. Kombinierbar mit Anubis' Gnade."
  },
  "Résistance à la Vorace et à la catalyse : difficulté réduite de (1) par niveau.": {
    en: "Resistance to the Voracious and to catalysis: difficulty reduced by (1) per level.",
    de: "Widerstand gegen die Gefräßige und gegen Katalyse: Schwierigkeit um (1) pro Stufe verringert."
  },
  "Sent les perturbations de l'Onde à 100m/1km/10km selon niveau. +1 déclencheur par niveau contre Psychonautes, bêtes des spores et Léperos.": {
    en: "Senses disturbances in the Wave at 100m/1km/10km depending on level. +1 trigger per level against Psychonauts, spore beasts, and Leperos.",
    de: "Spürt Störungen in der Welle auf 100m/1km/10km je nach Stufe. +1 Auslöser pro Stufe gegen Psychonauten, Sporenbestien und Leperos."
  },
  "Après mort par Traumatismes : combat pendant (1) round par niveau avant de succomber réellement. Armes gagnent la propriété Terrifiant (2×niveau).": {
    en: "After death by Trauma: keeps fighting for (1) round per level before actually succumbing. Weapons gain the Terrifying property (2×level).",
    de: "Nach dem Tod durch Trauma: kämpft (1) Runde pro Stufe weiter, bevor er wirklich erliegt. Waffen erhalten die Eigenschaft Furchteinflößend (2×Stufe)."
  },
  "(2) déclencheurs → frénésie : +1D attaque et +1 dégâts par niveau et par round ; désactive Défense active. Réactiver chaque round : (2) déclencheurs + 1 Blessure dès round 2.": {
    en: "(2) triggers → frenzy: +1D attack and +1 damage per level and per round; disables Active Defense. Reactivate each round: (2) triggers + 1 Fleshwound from round 2 onward.",
    de: "(2) Auslöser → Rausch: +1W Angriff und +1 Schaden pro Stufe und pro Runde; deaktiviert aktive Verteidigung. Jede Runde reaktivieren: (2) Auslöser + 1 Fleischwunde ab Runde 2."
  },
  "1 fois/mois : vision de l'avenir selon niveau (secondes/minutes/heures) → +2D par niveau à l'action entrevue.": {
    en: "1 time/month: vision of the future depending on level (seconds/minutes/hours) → +2D per level to the foreseen action.",
    de: "1 Mal/Monat: Vision der Zukunft je nach Stufe (Sekunden/Minuten/Stunden) → +2W pro Stufe auf die vorhergesehene Aktion."
  },
  "1 fois/jour : INS+Perception (6−niveau) pour recevoir un présage cryptique sur un événement futur.": {
    en: "1 time/day: INS+Perception (6−level) to receive a cryptic omen about a future event.",
    de: "1 Mal/Tag: INS+Wahrnehmung (6−Stufe), um ein kryptisches Omen über ein zukünftiges Ereignis zu erhalten."
  },
  "+1 Défense passive par niveau. Attaques ciblées à difficulté (+4−niveau) : Étourdissement (4) et Régularité (2DC) pour coups, Étourdissement (6) et Enchevêtrement (4) pour prises.": {
    en: "+1 Passive Defense per level. Targeted attacks at difficulty (+4−level): Stun (4) and Regularity (2DC) for strikes, Stun (6) and Entangle (4) for holds.",
    de: "+1 passive Verteidigung pro Stufe. Gezielte Angriffe mit Schwierigkeit (+4−Stufe): Betäubung (4) und Regelmäßigkeit (2SK) für Schläge, Betäubung (6) und Verstrickung (4) für Griffe."
  },
  "(3) Égo + (3) rounds méditation → immunité aux influences Psychonautes pendant (niveau) rounds, puis +1 succès auto par niveau à Défense mentale pour le reste de la scène.": {
    en: "(3) Ego + (3) rounds of meditation → immunity to Psychonaut influences for (level) rounds, then +1 auto success per level to Mental Defense for the rest of the scene.",
    de: "(3) Ego + (3) Runden Meditation → Immunität gegen Psychonauten-Einflüsse für (Stufe) Runden, danach +1 automatischer Erfolg pro Stufe auf mentale Verteidigung für den Rest der Szene."
  },
  "Chaque Traumatisme reçu au combat : +1 dégâts à toutes les attaques Lutte et Corps à corps suivantes (maximum = niveau).": {
    en: "Each Trauma received in combat: +1 damage to all subsequent Brawl and Melee attacks (maximum = level).",
    de: "Jedes im Kampf erhaltene Trauma: +1 Schaden auf alle folgenden Faustkampf- und Nahkampfangriffe (Maximum = Stufe)."
  },
  "1 fois/mois/niveau : entrer dans Sommeil de Sekhmet avec ≥1 Trauma → gagner XP = valeur de Concentration ou Pulsions.": {
    en: "1 time/month/level: enter Sekhmet's Sleep with ≥1 Trauma → gain XP = Focus or Primal value.",
    de: "1 Mal/Monat/Stufe: Sekhmets Schlaf mit ≥1 Trauma betreten → XP = Wert von Fokus oder Primal gewinnen."
  },
  "Concentration : (1) Blessure → (1) Égo. Pulsions : (1) Égo → (1) Blessure guérie. Maximum (2×niveau) échanges par jour.": {
    en: "Focus: (1) Fleshwound → (1) Ego. Primal: (1) Ego → (1) Fleshwound healed. Maximum (2×level) exchanges per day.",
    de: "Fokus: (1) Fleischwunde → (1) Ego. Primal: (1) Ego → (1) Fleischwunde geheilt. Maximum (2×Stufe) Tausche pro Tag."
  },
  "Coup ciblé PHY+Lutte (+4−niveau difficulté) → cible −1D par niveau à attaques et défenses pendant (niveau) rounds ; mouvement réduit.": {
    en: "Targeted BOD+Brawl strike (+4−level difficulty) → target −1D per level to attacks and defenses for (level) rounds; reduced movement.",
    de: "Gezielter KÖR+Faustkampf-Schlag (+4−Stufe Schwierigkeit) → Ziel −1W pro Stufe auf Angriffe und Verteidigungen für (Stufe) Runden; reduzierte Bewegung."
  },
  "Chaque round sans dépenser d'Égo en Initiative : +1 au maximum d'Égo dépensable au prochain round. Délai maximum = niveau de Potentiel.": {
    en: "Each round without spending Ego on Initiative: +1 to the maximum Ego spendable on the next round. Maximum delay = Potential level.",
    de: "Jede Runde ohne Ego-Ausgabe für Initiative: +1 auf das maximal ausgebbare Ego in der nächsten Runde. Maximale Verzögerung = Potenzial-Stufe."
  },
  "Peut retarder douleur et dégâts subis de (1) round par niveau (max 3), y compris les malus de Traumatismes.": {
    en: "Can delay pain and damage suffered by (1) round per level (max 3), including Trauma penalties.",
    de: "Kann erlittenen Schmerz und Schaden um (1) Runde pro Stufe verzögern (max. 3), einschließlich Trauma-Mali."
  },
  "Sacrifice jusqu'à (2×niveau) dés de Défense active → si défense réussit, la prochaine attaque obtient ce nombre en déclencheurs.": {
    en: "Sacrifices up to (2×level) Active Defense dice → if the defense succeeds, the next attack gains that number as triggers.",
    de: "Opfert bis zu (2×Stufe) Würfel der aktiven Verteidigung → gelingt die Verteidigung, erhält der nächste Angriff diese Zahl als Auslöser."
  },
  "Prédire « où » et « qui » : si la situation exacte survient dans 10 jours → +niveau à tous jets CHA et PSY dans cette situation.": {
    en: "Predict \"where\" and \"who\": if the exact situation occurs within 10 days → +level to all CHA and PSY rolls in that situation.",
    de: "»Wo« und »wer« vorhersagen: tritt die genaue Situation innerhalb von 10 Tagen ein → +Stufe auf alle CHA- und PSY-Würfe in dieser Situation."
  },
  "Pour la Nuée : dépenser (1) Égo par action → +1D par niveau à cette action.": {
    en: "For the Swarm: spend (1) Ego per action → +1D per level to that action.",
    de: "Für den Schwarm: (1) Ego pro Aktion ausgeben → +1W pro Stufe auf diese Aktion."
  },
  "Défense active avec ≥1 déclencheur active le Potentiel : +1 Défense passive par niveau vs cet ennemi. Peut copier et retourner ses Potentiels.": {
    en: "Active Defense with ≥1 trigger activates the Potential: +1 Passive Defense per level vs that enemy. Can copy and turn their Potentials against them.",
    de: "Aktive Verteidigung mit ≥1 Auslöser aktiviert das Potenzial: +1 passive Verteidigung pro Stufe gegen diesen Gegner. Kann dessen Potenziale kopieren und gegen ihn richten."
  },
  "Attaque mentale PSY+Dom +1D/niveau vs PSY+Foi : si victoire, malus permanent en dés = déclencheurs+1. Purification nécessaire pour le dissiper.": {
    en: "Mental attack PSY+Domination +1D/level vs PSY+Faith: on victory, permanent dice penalty = triggers+1. Purification required to dispel it.",
    de: "Mentalangriff PSY+Dominieren +1W/Stufe vs. PSY+Glaube: bei Sieg dauerhafter Würfel-Malus = Auslöser+1. Reinigung nötig, um ihn aufzuheben."
  },
  "Chaque déclencheur de Corps à corps inflige −1D à la Défense active adverse (max = niveau déclencheurs utilisables).": {
    en: "Each Melee trigger inflicts −1D to the opponent's Active Defense (max = level usable triggers).",
    de: "Jeder Nahkampf-Auslöser verursacht −1W auf die aktive Verteidigung des Gegners (max. = Stufe nutzbare Auslöser)."
  },
  "INS+Empathie +1D/niveau vs Défense mentale, (2) déclencheurs requis : cible perd (niveau) Égo + paralysie (niveau) rounds. +1D aux attaques mentales ultérieures contre elle.": {
    en: "INS+Empathy +1D/level vs Mental Defense, (2) triggers required: target loses (level) Ego + paralysis for (level) rounds. +1D to subsequent mental attacks against them.",
    de: "INS+Empathie +1W/Stufe vs. mentale Verteidigung, (2) Auslöser erforderlich: Ziel verliert (Stufe) Ego + Lähmung für (Stufe) Runden. +1W auf nachfolgende Mentalangriffe gegen es."
  },
  "En présence du Phénix, les combattants ratant PSY+Volonté/Foi (4/5/6 selon niveau) obtiennent un échec critique dès que 1s = succès.": {
    en: "In the Phoenix's presence, combatants who fail PSY+Willpower/Faith (4/5/6 depending on level) get a critical failure as soon as a 1 = success.",
    de: "In Gegenwart des Phönix erleiden Kämpfer, die PSY+Wille/Glaube (4/5/6 je nach Stufe) nicht bestehen, einen kritischen Fehlschlag, sobald eine 1 = Erfolg ist."
  },
  "Attaques ciblées +1D par niveau. Si Égo dépensé pour Initiative et premier kill : récupère tous ces Égo.": {
    en: "Targeted attacks +1D per level. If Ego was spent on Initiative and the first kill is achieved: recover all that Ego.",
    de: "Gezielte Angriffe +1W pro Stufe. Wurde Ego für Initiative ausgegeben und der erste Kill erzielt: das gesamte Ego wird zurückgewonnen."
  },
  "Peut parfaitement imiter (niveau) Cultes distincts. +1 succès auto par niveau à PSY+Tromperie et PSY+Ruse pour ces imitations.": {
    en: "Can perfectly imitate (level) distinct Cults. +1 auto success per level to PSY+Deception and PSY+Cunning for these impersonations.",
    de: "Kann (Stufe) verschiedene Kulte perfekt imitieren. +1 automatischer Erfolg pro Stufe auf PSY+Täuschung und PSY+Gerissenheit für diese Imitationen."
  },
  "Peut échanger (1) Réseau contre (1) point dans n'importe quel autre historique par niveau.": {
    en: "Can exchange (1) Network for (1) point in any other Origin per level.",
    de: "Kann pro Stufe (1) Netzwerk gegen (1) Punkt in einem beliebigen anderen Hintergrund eintauschen."
  },
  "Peut changer de Rang pour un autre du même niveau sans remplir ses conditions, par niveau de Potentiel acquis.": {
    en: "Can switch Rank for another of the same level without meeting its conditions, per acquired Potential level.",
    de: "Kann pro erworbener Potenzial-Stufe den Rang gegen einen anderen derselben Stufe wechseln, ohne dessen Bedingungen zu erfüllen."
  },
  "Peut stocker jusqu'à (2×niveau) dés bonus d'Égo d'Initiative pour des jets ultérieurs dans le même combat.": {
    en: "Can store up to (2×level) bonus Ego Initiative dice for later rolls within the same fight.",
    de: "Kann bis zu (2×Stufe) Bonus-Ego-Initiative-Würfel für spätere Würfe im selben Kampf speichern."
  },
  "Ajoute jusqu'à (niveau) déclencheurs à n'importe quel jet ; le MJ ajoute autant de 1 aux jets futurs du personnage.": {
    en: "Adds up to (level) triggers to any roll; the GM adds an equal number of 1s to the character's future rolls.",
    de: "Fügt einem beliebigen Wurf bis zu (Stufe) Auslöser hinzu; der SL fügt ebenso viele 1er zu den zukünftigen Würfen des Charakters hinzu."
  },
  "INS+Empathie +1D/niveau vs Défense mentale : si résistance, réduit Égo max de la cible du nombre de déclencheurs. Si Égo → 0 : −1 PSY permanent.": {
    en: "INS+Empathy +1D/level vs Mental Defense: on success, reduces the target's max Ego by the number of triggers. If Ego → 0: permanent −1 PSY.",
    de: "INS+Empathie +1W/Stufe vs. mentale Verteidigung: bei Erfolg wird das maximale Ego des Ziels um die Anzahl der Auslöser verringert. Sinkt Ego auf 0: dauerhaft −1 PSY."
  },
  "Si la cible n'a aucune issue : +niveau aux jets d'attaque et Défense active et passive.": {
    en: "If the target has no way out: +level to attack rolls and to Active and Passive Defense.",
    de: "Hat das Ziel keinen Ausweg: +Stufe auf Angriffswürfe sowie aktive und passive Verteidigung."
  },
  "Possède (niveau) fausses identités ; +1D par niveau à PSY+Tromperie pour les maintenir.": {
    en: "Has (level) false identities; +1D per level to PSY+Deception to maintain them.",
    de: "Besitzt (Stufe) falsche Identitäten; +1W pro Stufe auf PSY+Täuschung, um sie aufrechtzuerhalten."
  },
  "+1D par niveau à PSY+Ruse ou PSY+Tromperie pour se déguiser et s'infiltrer incognito.": {
    en: "+1D per level to PSY+Cunning or PSY+Deception to disguise oneself and infiltrate incognito.",
    de: "+1W pro Stufe auf PSY+Gerissenheit oder PSY+Täuschung, um sich zu verkleiden und inkognito einzuschleichen."
  },
  "+1D et +1 déclencheur par niveau à PSY+Domination pour interrogatoire sur victime ligotée.": {
    en: "+1D and +1 trigger per level to PSY+Domination for interrogating a bound victim.",
    de: "+1W und +1 Auslöser pro Stufe auf PSY+Dominieren beim Verhör eines gefesselten Opfers."
  },
  "Obtient automatiquement (niveau) déclencheurs à tous les jets d'influence CHA/PSY (Domination, Commandement, Séduction…).": {
    en: "Automatically gains (level) triggers on all CHA/PSY influence rolls (Domination, Leadership, Seduction…).",
    de: "Erhält automatisch (Stufe) Auslöser auf alle CHA/PSY-Beeinflussungswürfe (Dominieren, Führung, Verführung…)."
  },
  "+1 déclencheur par niveau à AGI+Mobilité en attaque électrique ; +1D par niveau à la Défense passive.": {
    en: "+1 trigger per level to AGI+Mobility on electric attack; +1D per level to Passive Defense.",
    de: "+1 Auslöser pro Stufe auf GEW+Beweglichkeit bei elektrischem Angriff; +1W pro Stufe auf passive Verteidigung."
  },
  "Déclenche tous les modules de défense simultanément via INT+Technologie (5−niveau). Si ≥2 ennemis au contact, les alliés ne sont pas affectés.": {
    en: "Triggers all defense modules simultaneously via INT+Engineering (5−level). If ≥2 enemies are in contact, allies are not affected.",
    de: "Löst alle Verteidigungsmodule gleichzeitig über INT+Technik (5−Stufe) aus. Sind ≥2 Gegner in Kontakt, werden Verbündete nicht betroffen."
  },
  "+niveau déclencheurs automatiques à chaque jet d'INT. Actif en permanence.": {
    en: "+level automatic triggers on every INT roll. Always active.",
    de: "+Stufe automatische Auslöser auf jeden INT-Wurf. Permanent aktiv."
  },
  "Avant combat : PSY+Ruse (3) → Défense passive +1 par déclencheur pour 3 rounds par niveau. Peut prolonger en dépensant 1 Égo/round.": {
    en: "Before combat: PSY+Cunning (3) → Passive Defense +1 per trigger for 3 rounds per level. Can extend by spending 1 Ego/round.",
    de: "Vor dem Kampf: PSY+Gerissenheit (3) → passive Verteidigung +1 pro Auslöser für 3 Runden pro Stufe. Kann durch 1 Ego/Runde verlängert werden."
  },
  "La propriété Étourdissement de toute arme électrique est augmentée de (1) par niveau.": {
    en: "The Stun property of any electric weapon is increased by (1) per level.",
    de: "Die Eigenschaft Betäubung jeder elektrischen Waffe wird um (1) pro Stufe erhöht."
  },
  "+1D par niveau à la Défense mentale contre manipulation émotionnelle ; +1 succès auto par niveau à INT+Concentration pour supprimer ses sentiments.": {
    en: "+1D per level to Mental Defense against emotional manipulation; +1 auto success per level to INT+Focus to suppress one's feelings.",
    de: "+1W pro Stufe auf mentale Verteidigung gegen emotionale Manipulation; +1 automatischer Erfolg pro Stufe auf INT+Fokus, um eigene Gefühle zu unterdrücken."
  },
  "Pirater de l'électronique : nécessite 4 déclencheurs, réduit de 1 par niveau au-delà du premier pour accomplir l'action en 1 round.": {
    en: "Hacking electronics: requires 4 triggers, reduced by 1 per level beyond the first to complete the action in 1 round.",
    de: "Elektronik hacken: erfordert 4 Auslöser, verringert um 1 pro Stufe über die erste hinaus, um die Aktion in 1 Runde abzuschließen."
  },
  "+1D par niveau à tous les jets INT ; −1D par niveau à tous les jets CHA. Tous les 10 déclencheurs INT collectés : +1 point d'XP.": {
    en: "+1D per level to all INT rolls; −1D per level to all CHA rolls. For every 10 INT triggers collected: +1 XP point.",
    de: "+1W pro Stufe auf alle INT-Würfe; −1W pro Stufe auf alle CHA-Würfe. Für je 10 gesammelte INT-Auslöser: +1 XP-Punkt."
  },
  "+1D par niveau pour résoudre mystères, puzzles ou équations. 1 fois/mois/niveau : INT+Science (4) pour un indice d'énigme non résolue.": {
    en: "+1D per level to solve mysteries, puzzles, or equations. 1 time/month/level: INT+Science (4) for a clue to an unsolved riddle.",
    de: "+1W pro Stufe zum Lösen von Rätseln, Puzzles oder Gleichungen. 1 Mal/Monat/Stufe: INT+Wissenschaft (4) für einen Hinweis zu einem ungelösten Rätsel."
  },
  "Dégâts sonores : tous les (4/3/2) niveaux de dégâts selon niveau de Potentiel : −1D à tous les jets de la victime pendant 1 round.": {
    en: "Sonic damage: for every (4/3/2) levels of damage depending on Potential level: −1D to all the victim's rolls for 1 round.",
    de: "Schallschaden: pro (4/3/2) Schadensstufen je nach Potenzial-Stufe: −1W auf alle Würfe des Opfers für 1 Runde."
  },
  "Si (2) déclencheurs à l'attaque au premier round : tous les alliés qui attaquent après gagnent +1D par niveau.": {
    en: "If (2) triggers on the attack in the first round: all allies who attack afterward gain +1D per level.",
    de: "Bei (2) Auslösern beim Angriff in der ersten Runde: alle danach angreifenden Verbündeten erhalten +1W pro Stufe."
  },
  "L'encombrement du harnais est réduit de (1) par niveau de Potentiel.": {
    en: "Harness encumbrance is reduced by (1) per Potential level.",
    de: "Die Behinderung durch das Geschirr wird um (1) pro Potenzial-Stufe verringert."
  },
  "Intercepte une attaque visant un allié : PSY+Réactivité (4) mêlée / (6) distance, +1D par niveau. Peut contre-attaquer avec la baïonnette du défricheur.": {
    en: "Intercepts an attack aimed at an ally: PSY+Reaction (4) melee / (6) ranged, +1D per level. Can counterattack with the clearer's bayonet.",
    de: "Fängt einen Angriff auf einen Verbündeten ab: PSY+Reaktion (4) Nahkampf / (6) Distanz, +1W pro Stufe. Kann mit dem Bajonett des Räumers zurückschlagen."
  },
  "+1 Réseau par niveau. +1D par niveau à tous les jets CHA et PSY pour tromper.": {
    en: "+1 Network per level. +1D per level to all CHA and PSY rolls to deceive.",
    de: "+1 Netzwerk pro Stufe. +1W pro Stufe auf alle CHA- und PSY-Würfe zum Täuschen."
  },
  "Peut convertir jusqu'à (niveau) déclencheurs en points d'Égo sur chaque jet d'attaque ou Défense active.": {
    en: "Can convert up to (level) triggers into Ego points on each attack roll or Active Defense.",
    de: "Kann bei jedem Angriffswurf oder aktiver Verteidigung bis zu (Stufe) Auslöser in Ego-Punkte umwandeln."
  },
  "+1 à la Défense mentale par niveau lorsqu'en infériorité numérique.": {
    en: "+1 to Mental Defense per level when outnumbered.",
    de: "+1 auf mentale Verteidigung pro Stufe bei zahlenmäßiger Unterlegenheit."
  },
  "Avec bouclier des tunnels en retraite : +1 Défense passive et +1D Défense active par niveau. Peut étendre à 1 allié/niveau en sacrifiant toutes ses actions.": {
    en: "With the retreating-tunnels shield: +1 Passive Defense and +1D Active Defense per level. Can extend to 1 ally/level by sacrificing all their actions.",
    de: "Mit dem Schild der Rückzugstunnel: +1 passive Verteidigung und +1W aktive Verteidigung pro Stufe. Kann auf 1 Verbündeten/Stufe ausgeweitet werden, wenn er alle seine Aktionen opfert."
  },
  "+1 succès auto par niveau à tous les jets PHY en harnais ultrarésistant. Malus corps à corps : −1D au niveau 2, annulé au niveau 3.": {
    en: "+1 auto success per level to all PHY rolls while wearing the ultra-resistant harness. Melee penalty: −1D at level 2, cancelled at level 3.",
    de: "+1 automatischer Erfolg pro Stufe auf alle KÖR-Würfe im ultraresistenten Geschirr. Nahkampf-Malus: −1W auf Stufe 2, aufgehoben auf Stufe 3."
  },
  "Dégâts de chute réduits de (1) par niveau. En montagne : +1D par niveau à PHY+Vigueur et PHY+Athlétisme.": {
    en: "Fall damage reduced by (1) per level. In the mountains: +1D per level to PHY+Stamina and PHY+Athletics.",
    de: "Sturzschaden um (1) pro Stufe verringert. Im Gebirge: +1W pro Stufe auf KÖR+Ausdauer und KÖR+Athletik."
  },
  "Jet combiné AGI+Artisanat + INT+Science pour augmenter dégâts explosifs (+1/succès, +2/déclencheur). +1D par niveau pour désamorcer.": {
    en: "Combined AGI+Crafting + INT+Science roll to increase explosive damage (+1/success, +2/trigger). +1D per level to defuse.",
    de: "Kombinierter Wurf GEW+Handwerk + INT+Wissenschaft, um Explosionsschaden zu erhöhen (+1/Erfolg, +2/Auslöser). +1W pro Stufe zum Entschärfen."
  },
  "1 fois/mois/niveau : utiliser Renommée à la place de Ressources pour demander un équipement à la Forteresse alpine. Perte (1) Renommée si l'équipement est perdu.": {
    en: "1 time/month/level: use Renown instead of Resources to request equipment from the Alpine Fortress. Lose (1) Renown if the equipment is lost.",
    de: "1 Mal/Monat/Stufe: Ruf statt Ressourcen verwenden, um Ausrüstung von der Alpenfestung anzufordern. Verlust von (1) Ruf, falls die Ausrüstung verloren geht."
  },
  "Mise en joue : dépenser 1 Égo/round → +2D au tir suivant. Maximum de dés = 2× niveau. Annulé si distrait.": {
    en: "Taking aim: spend 1 Ego/round → +2D to the next shot. Maximum dice = 2× level. Cancelled if distracted.",
    de: "Zielen: 1 Ego/Runde ausgeben → +2W auf den nächsten Schuss. Maximale Würfel = 2× Stufe. Aufgehoben bei Ablenkung."
  },
  "Après +1 Ressources suite à une mission : peut aussi +1 Autorité, Renommée ou Alliés. Cap 3/4/5 selon niveau.": {
    en: "After +1 Resources following a mission: can also +1 Authority, Renown, or Allies. Cap 3/4/5 depending on level.",
    de: "Nach +1 Ressourcen infolge einer Mission: kann zusätzlich +1 Autorität, Ruf oder Verbündete. Obergrenze 3/4/5 je nach Stufe."
  },
  "+1D par niveau à INS+Survie et INS+Orientation hors Régions territoriales. +1 Réseau par niveau de Potentiel acquis.": {
    en: "+1D per level to INS+Survival and INS+Orienteering outside Territorial Regions. +1 Network per acquired Potential level.",
    de: "+1W pro Stufe auf INS+Überleben und INS+Orientierung außerhalb der Territorialregionen. +1 Netzwerk pro erworbener Potenzial-Stufe."
  },
  "Sacrifier 10 XP non dépensés pour effacer immédiatement (1) Traumatisme par niveau.": {
    en: "Sacrifice 10 unspent XP to immediately erase (1) Trauma per level.",
    de: "10 nicht ausgegebene XP opfern, um sofort (1) Trauma pro Stufe zu tilgen."
  },
  "Après (10) attaques ennemies cumulées : +1D par niveau à tous les jets d'attaque ; chaque attaque réussie rapporte (1) Égo.": {
    en: "After (10) cumulative enemy attacks: +1D per level to all attack rolls; each successful attack grants (1) Ego.",
    de: "Nach (10) kumulierten gegnerischen Angriffen: +1W pro Stufe auf alle Angriffswürfe; jeder erfolgreiche Angriff bringt (1) Ego."
  },
  "Rituel (15 min) : toutes les compétences CHA tombent à (0) mais peut dépenser (niveau) Égo supplémentaires pendant (1) heure.": {
    en: "Ritual (15 min): all CHA skills drop to (0) but can spend (level) extra Ego for (1) hour.",
    de: "Ritual (15 Min.): alle CHA-Fertigkeiten fallen auf (0), aber (Stufe) zusätzliches Ego kann für (1) Stunde ausgegeben werden."
  },
  "(1) round + CHA+Art +1D/niveau : annule manipulations psychiques ennemies ; déclencheurs ajoutés à Défense mentale du groupe (−1D par round).": {
    en: "(1) round + CHA+Arts +1D/level: cancels enemy psychic manipulations; triggers added to the group's Mental Defense (−1D per round).",
    de: "(1) Runde + CHA+Künste +1W/Stufe: hebt feindliche psychische Manipulationen auf; Auslöser werden zur mentalen Verteidigung der Gruppe hinzugefügt (−1W pro Runde)."
  },
  "Attaque mentale de groupe : PSY+Foi/Volonté +1D/niveau → si échec : −1D par déclencheur à tous les jets ; malus réduit de 1D par round.": {
    en: "Group mental attack: PSY+Faith/Willpower +1D/level → on failure: −1D per trigger to all rolls; penalty reduced by 1D per round.",
    de: "Mentalangriff auf eine Gruppe: PSY+Glaube/Wille +1W/Stufe → bei Misserfolg: −1W pro Auslöser auf alle Würfe; Malus verringert sich um 1W pro Runde."
  },
  "Toutes les icônes fabriquées ce jour : leur effet gagne +1D par niveau.": {
    en: "All icons crafted that day: their effect gains +1D per level.",
    de: "Alle an diesem Tag gefertigten Ikonen: ihr Effekt erhält +1W pro Stufe."
  },
  "Prophétie quotidienne : si la situation prédite se réalise dans le mois → +1D par niveau à l'action correspondante.": {
    en: "Daily prophecy: if the predicted situation occurs within the month → +1D per level to the corresponding action.",
    de: "Tägliche Prophezeiung: tritt die vorhergesagte Situation innerhalb des Monats ein → +1W pro Stufe auf die entsprechende Aktion."
  },
  "Tout attaquant de l'Icônide doit réussir Défense mentale (4+niveau−1) ou perdre (2×niveau) Égo.": {
    en: "Anyone attacking the Iconide must succeed at Mental Defense (4+level−1) or lose (2×level) Ego.",
    de: "Jeder Angreifer der Ikonide muss mentale Verteidigung (4+Stufe−1) bestehen oder verliert (2×Stufe) Ego."
  },
  "(1) Égo → si première attaque inflige des dégâts : utiliser ces Égo comme dés supplémentaires pour une seconde attaque. (1) fois/combat/niveau.": {
    en: "(1) Ego → if the first attack deals damage: use that Ego as extra dice for a second attack. (1) time/fight/level.",
    de: "(1) Ego → fügt der erste Angriff Schaden zu: dieses Ego als zusätzliche Würfel für einen zweiten Angriff verwenden. (1) Mal/Kampf/Stufe."
  },
  "Transfère jusqu'à (2×niveau) points d'Égo à un allié en une seule action.": {
    en: "Transfers up to (2×level) Ego points to an ally in a single action.",
    de: "Übertragt mit einer einzigen Aktion bis zu (2×Stufe) Ego-Punkte auf einen Verbündeten."
  },
  "+1 déclencheur par niveau à la Défense mentale contre toute influence. Peut partager ce bonus à un allié pour (1) Égo. (3) Égo + INS+Empathie (4) : guérit (1) PSY perdu.": {
    en: "+1 trigger per level to Mental Defense against any influence. Can share this bonus with an ally for (1) Ego. (3) Ego + INS+Empathy (4): heals (1) lost PSY.",
    de: "+1 Auslöser pro Stufe auf mentale Verteidigung gegen jede Beeinflussung. Kann diesen Bonus für (1) Ego mit einem Verbündeten teilen. (3) Ego + INS+Empathie (4): heilt (1) verlorenen PSY-Punkt."
  },
  "Activation même à 0 Égo : restauration complète de l'Égo contre −1 Trauma max permanent ; ignore malus Trauma pendant (niveau) rounds ; +1D/niveau à Initiative.": {
    en: "Can activate even at 0 Ego: full Ego restoration in exchange for a permanent −1 max Trauma; ignores Trauma penalties for (level) rounds; +1D/level to Initiative.",
    de: "Aktivierung sogar bei 0 Ego: vollständige Wiederherstellung des Ego gegen dauerhaft −1 maximales Trauma; ignoriert Trauma-Mali für (Stufe) Runden; +1W/Stufe auf Initiative."
  },
  "+1 Défense passive et +1 armure par niveau. +1 déclencheur par niveau à Défense mentale.": {
    en: "+1 Passive Defense and +1 armor per level. +1 trigger per level to Mental Defense.",
    de: "+1 passive Verteidigung und +1 Rüstung pro Stufe. +1 Auslöser pro Stufe auf mentale Verteidigung."
  },
  "+1D par niveau à PSY et CHA au sein du Culte. Alliés et Autorité augmentent pour atteindre au moins (niveau) par niveau acquis et ne peuvent plus baisser.": {
    en: "+1D per level to PSY and CHA within the Cult. Allies and Authority rise to reach at least (level) per acquired level and can no longer decrease.",
    de: "+1W pro Stufe auf PSY und CHA innerhalb des Kults. Verbündete und Autorität steigen auf mindestens (Stufe) pro erworbener Stufe und können nicht mehr sinken."
  },
  "(4/3/2) rounds de prière puis jet combiné PSY+Foi + compétence +1D/niveau.": {
    en: "(4/3/2) rounds of prayer, then a combined PSY+Faith + skill roll +1D/level.",
    de: "(4/3/2) Runden Gebet, dann ein kombinierter Wurf PSY+Glaube + Fertigkeit +1W/Stufe."
  },
  "PSY+Foi +1D/niveau vs Défense mentale : les ennemis ratés comptent leurs 2 comme des 1 ; +1 Égo/niveau par échec critique ennemi.": {
    en: "PSY+Faith +1D/level vs Mental Defense: enemies who fail count their 2s as 1s; +1 Ego/level per enemy critical failure.",
    de: "PSY+Glaube +1W/Stufe vs. mentale Verteidigung: gescheiterte Gegner zählen ihre 2er als 1er; +1 Ego/Stufe pro kritischem Fehlschlag des Gegners."
  },
  "+1D par niveau à la Défense mentale et aux jets de détection de tromperie face aux criminels et Apocalyptiques.": {
    en: "+1D per level to Mental Defense and to deception-detection rolls against criminals and Apocalyptics.",
    de: "+1W pro Stufe auf mentale Verteidigung und auf Würfe zum Erkennen von Täuschung gegenüber Kriminellen und Apokalyptikern."
  },
  "+1D par niveau à CHA+Commandement pour déchaîner une foule contre des délinquants.": {
    en: "+1D per level to CHA+Leadership to incite a crowd against criminals.",
    de: "+1W pro Stufe auf CHA+Führung, um einen Mob gegen Gesetzesbrecher aufzuwiegeln."
  },
  "Le nombre de déclencheurs requis pour activer la propriété Choc est réduit de (1) par niveau.": {
    en: "The number of triggers required to activate the Shock property is reduced by (1) per level.",
    de: "Die Anzahl der Auslöser, die zur Aktivierung der Eigenschaft Schock benötigt werden, wird um (1) pro Stufe verringert."
  },
  "Réussir INS+Empathie vs PSY+Volonté/Foi ennemi → +1D par niveau à toutes les attaques et défenses contre cet ennemi pour le reste du combat.": {
    en: "Succeed at INS+Empathy vs the enemy's PSY+Willpower/Faith → +1D per level to all attacks and defenses against that enemy for the rest of the fight.",
    de: "INS+Empathie vs. PSY+Wille/Glaube des Gegners bestehen → +1W pro Stufe auf alle Angriffe und Verteidigungen gegen diesen Gegner für den Rest des Kampfes."
  },
  "Charge en 1 round entier : PHY+Force + (niveau) dés → ennemi à terre pendant (1) round.": {
    en: "Charge over 1 full round: BOD+Force + (level) dice → enemy knocked down for (1) round.",
    de: "Angriff über 1 ganze Runde: KÖR+Kraft + (Stufe) Würfel → Gegner für (1) Runde am Boden."
  },
  "Marteau+mousquet simultanés : −4D maniement atténué de 1D par niveau. Si attaque réussit : déclencheurs comptent doubles pour les dégâts. Défense passive −1 au round suivant.": {
    en: "Simultaneous hammer+musket: −4D handling, reduced by 1D per level. If the attack succeeds: triggers count double for damage. Passive Defense −1 on the next round.",
    de: "Hammer+Muskete gleichzeitig: −4W Handhabung, verringert um 1W pro Stufe. Gelingt der Angriff: Auslöser zählen doppelt für den Schaden. Passive Verteidigung −1 in der nächsten Runde."
  },
  "En infériorité numérique : récupère (1) Égo par round par adversaire surnuméraire (maximum = niveau).": {
    en: "When outnumbered: recover (1) Ego per round per extra opponent (maximum = level).",
    de: "Bei zahlenmäßiger Unterlegenheit: erholt (1) Ego pro Runde pro überzähligem Gegner (Maximum = Stufe)."
  },
  "Criminels du Protectorat/Borca/Europe : Défense mentale (Renommée) ou le Juge ajoute sa Renommée à sa Défense passive pour le reste du combat.": {
    en: "Protectorate/Borca/Europe criminals: Mental Defense (Renown) or the Judge adds their Renown to their Passive Defense for the rest of the fight.",
    de: "Kriminelle aus dem Protektorat/Borca/Europa: mentale Verteidigung (Ruf), oder der Richter addiert seinen Ruf für den Rest des Kampfes zu seiner passiven Verteidigung."
  },
  "Chaque fois qu'un allié tombe : +1 Égo et +1 Défense passive par niveau jusqu'à la fin du combat.": {
    en: "Each time an ally falls: +1 Ego and +1 Passive Defense per level until the end of the fight.",
    de: "Jedes Mal, wenn ein Verbündeter fällt: +1 Ego und +1 passive Verteidigung pro Stufe bis zum Ende des Kampfes."
  },
  "Accepter jusqu'à (niveau) dégâts supplémentaires → prochain jet PHY+Corps à corps réussi ajoute ces dégâts en Mortel ignorant l'armure.": {
    en: "Accept up to (level) extra damage → the next successful BOD+Melee roll adds that damage as Lethal, ignoring armor.",
    de: "Bis zu (Stufe) zusätzlichen Schaden hinnehmen → der nächste erfolgreiche KÖR+Nahkampf-Wurf fügt diesen Schaden als Tödlich hinzu, Rüstung ignorierend."
  },
  "Peut utiliser le résultat d'Initiative d'un autre Juge avec Répression au round 1 (niveau 1), 2 (niveau 2), ou 3 (niveau 3).": {
    en: "Can use another Judge with Repression's Initiative result on round 1 (level 1), 2 (level 2), or 3 (level 3).",
    de: "Kann das Initiative-Ergebnis eines anderen Richters mit Repression in Runde 1 (Stufe 1), 2 (Stufe 2) oder 3 (Stufe 3) nutzen."
  },
  "Jet combiné INS+Empathie + PSY+Ruse +1D par niveau vs Défense mentale du criminel pour profiler et localiser.": {
    en: "Combined INS+Empathy + PSY+Cunning roll +1D per level vs the criminal's Mental Defense to profile and locate them.",
    de: "Kombinierter Wurf INS+Empathie + PSY+Gerissenheit +1W pro Stufe vs. mentale Verteidigung des Kriminellen, um ihn zu profilieren und zu orten."
  },
  "Feinte : augmente propriété Choc = niveau. Si attaque réussit : propriété Terrifiant et dégâts augmentés = niveau.": {
    en: "Feint: increases the Shock property by = level. If the attack succeeds: Terrifying property and increased damage = level.",
    de: "Finte: erhöht die Eigenschaft Schock = Stufe. Gelingt der Angriff: Eigenschaft Furchteinflößend und erhöhter Schaden = Stufe."
  },
  "+1 dans un historique par niveau acquis. Dans Justitienne/Protectorat/Europe : historiques ne peuvent pas descendre sous (3).": {
    en: "+1 in an Origin per acquired level. In Justitienne/Protectorate/Europe: Origins cannot drop below (3).",
    de: "+1 auf einen Hintergrund pro erworbener Stufe. In Justitienne/Protektorat/Europa: Hintergründe können nicht unter (3) fallen."
  },
  "+1D par niveau à l'Initiative avec arme à chargement par la bouche. (2)/(1)/0 déclencheurs pour recharger en 1 action selon niveau.": {
    en: "+1D per level to Initiative with a muzzle-loading weapon. (2)/(1)/0 triggers to reload in 1 action depending on level.",
    de: "+1W pro Stufe auf Initiative mit einer Vorderladerwaffe. (2)/(1)/0 Auslöser, um je nach Stufe in 1 Aktion nachzuladen."
  },
  "Pendant une négociation commerciale : obtient automatiquement (niveau) déclencheurs.": {
    en: "During a trade negotiation: automatically gains (level) triggers.",
    de: "Während einer Handelsverhandlung: erhält automatisch (Stufe) Auslöser."
  },
  "Viser 1 round complet puis tirer : obtient (niveau) déclencheurs automatiquement au jet d'attaque.": {
    en: "Aim for 1 full round then fire: automatically gains (level) triggers on the attack roll.",
    de: "1 ganze Runde zielen und dann schießen: erhält automatisch (Stufe) Auslöser auf den Angriffswurf."
  },
  "Quand la vie est menacée : +1D par niveau au jet salutaire, mais coûte (1) Égo par action.": {
    en: "When life is threatened: +1D per level to the life-saving roll, but costs (1) Ego per action.",
    de: "Ist das Leben bedroht: +1W pro Stufe auf den rettenden Wurf, kostet aber (1) Ego pro Aktion."
  },
  "Réussite extraordinaire (3+ déclencheurs) + (1) Égo → alliés gagnent +1D par niveau à leur prochaine action similaire.": {
    en: "Extraordinary success (3+ triggers) + (1) Ego → allies gain +1D per level to their next similar action.",
    de: "Außergewöhnlicher Erfolg (3+ Auslöser) + (1) Ego → Verbündete erhalten +1W pro Stufe auf ihre nächste ähnliche Aktion."
  },
  "Lors d'une discussion avec un non-Néolibyen : +1D par niveau à tous les jets CHA, mais −3D à tous les jets PSY.": {
    en: "During a discussion with a non-Neolibyan: +1D per level to all CHA rolls, but −3D to all PSY rolls.",
    de: "Bei einer Unterhaltung mit einem Nicht-Neolibyer: +1W pro Stufe auf alle CHA-Würfe, aber −3W auf alle PSY-Würfe."
  },
  "Avant un jet : renoncer à jusqu'à (2×niveau) dés. Si succès → (1) déclencheur par paire de dés non lancés pour la prochaine attaque.": {
    en: "Before a roll: give up up to (2×level) dice. On success → (1) trigger per pair of unrolled dice for the next attack.",
    de: "Vor einem Wurf: auf bis zu (2×Stufe) Würfel verzichten. Bei Erfolg → (1) Auslöser pro Paar nicht gewürfelter Würfel für den nächsten Angriff."
  },
  "Si Renommée ≥ 6/5/4 (selon niveau) : les autres historiques ne peuvent pas baisser involontairement.": {
    en: "If Renown ≥ 6/5/4 (depending on level): other Origins cannot decrease involuntarily.",
    de: "Wenn Ruf ≥ 6/5/4 (je nach Stufe): andere Hintergründe können nicht unfreiwillig sinken."
  },
  "+1D par niveau à PSY et CHA lors d'une première rencontre. (3) déclencheurs → +1 Renommée/mois. Parle 3×niveau dialectes étrangers.": {
    en: "+1D per level to PSY and CHA during a first encounter. (3) triggers → +1 Renown/month. Speaks 3×level foreign dialects.",
    de: "+1W pro Stufe auf PSY und CHA bei einer ersten Begegnung. (3) Auslöser → +1 Ruf/Monat. Spricht 3×Stufe fremde Dialekte."
  },
  "Dépenser (3/2/1) Égo avant un jet pour le rendre relançable ; relancer coûte (3/4/5) Égo supplémentaires selon niveau.": {
    en: "Spend (3/2/1) Ego before a roll to make it rerollable; rerolling costs (3/4/5) extra Ego depending on level.",
    de: "(3/2/1) Ego vor einem Wurf ausgeben, um ihn wiederholbar zu machen; das Wiederholen kostet je nach Stufe (3/4/5) zusätzliches Ego."
  },
  "+2×niveau à l'Autorité tant que la lignée est prouvée (ne peut pas baisser). +1 déclencheur/niveau aux jets PSY/CHA dans les négociations du Culte.": {
    en: "+2×level to Authority as long as the lineage is proven (cannot decrease). +1 trigger/level to PSY/CHA rolls in the Cult's negotiations.",
    de: "+2×Stufe auf Autorität, solange die Abstammung bewiesen ist (kann nicht sinken). +1 Auslöser/Stufe auf PSY/CHA-Würfe bei Verhandlungen des Kults."
  },
  "En duel (1 vs 1) : +1D par niveau à tous les jets. Si un tiers intervient : −1D par niveau à tous les jets.": {
    en: "In a duel (1 vs 1): +1D per level to all rolls. If a third party intervenes: −1D per level to all rolls.",
    de: "Im Duell (1 gegen 1): +1W pro Stufe auf alle Würfe. Greift ein Dritter ein: −1W pro Stufe auf alle Würfe."
  },
  "+1 déclencheur par niveau aux jets PSY/CHA pour les négociations avec la Banque. Chaque déclencheur réduit le taux d'intérêt de 10%.": {
    en: "+1 trigger per level to PSY/CHA rolls for negotiations with the Bank. Each trigger reduces the interest rate by 10%.",
    de: "+1 Auslöser pro Stufe auf PSY/CHA-Würfe bei Verhandlungen mit der Bank. Jeder Auslöser senkt den Zinssatz um 10%."
  },
  "Peut stocker jusqu'à (2×niveau) déclencheurs de jets précédents et les dépenser tous en une fois avant un jet futur.": {
    en: "Can store up to (2×level) triggers from previous rolls and spend them all at once before a future roll.",
    de: "Kann bis zu (2×Stufe) Auslöser aus vorherigen Würfen speichern und sie alle auf einmal vor einem zukünftigen Wurf ausgeben."
  },
  "Si le combat peut apporter des ressources : +1 Égo/niveau au début. Effort long terme : +1 Égo/jour + (1) Blessure guérie par niveau ; −1D/niveau à INT.": {
    en: "If the fight can yield resources: +1 Ego/level at the start. Long-term effort: +1 Ego/day + (1) Fleshwound healed per level; −1D/level to INT.",
    de: "Kann der Kampf Ressourcen einbringen: +1 Ego/Stufe zu Beginn. Langfristiger Einsatz: +1 Ego/Tag + (1) geheilte Fleischwunde pro Stufe; −1W/Stufe auf INT."
  },
  "+1 succès automatique par accord précédemment conclu avec ce partenaire (maximum = niveau) à tous jets CHA/PSY pour un nouvel accord.": {
    en: "+1 automatic success per previous agreement made with this partner (maximum = level) to all CHA/PSY rolls for a new agreement.",
    de: "+1 automatischer Erfolg pro vorherigem Abkommen mit diesem Partner (Maximum = Stufe) auf alle CHA/PSY-Würfe für ein neues Abkommen."
  },
  "Depuis l'obscurité : AGI+Furtivité +1D/niveau vs INS+Perception → si victoire, prochaine attaque imparable en Défense active + (niveau) déclencheurs supplémentaires.": {
    en: "From the darkness: AGI+Stealth +1D/level vs INS+Perception → on victory, the next attack cannot be stopped by Active Defense + (level) extra triggers.",
    de: "Aus der Dunkelheit: GEW+Heimlichkeit +1W/Stufe vs. INS+Wahrnehmung → bei Sieg ist der nächste Angriff durch aktive Verteidigung nicht abwehrbar + (Stufe) zusätzliche Auslöser."
  },
  "INS+Pulsions +1D/niveau → difficulté de Défense mentale pour tous les combattants ; échec : immobilisé ≥ 1 round (+1 round par tranche de 3 déclencheurs). Alliés aussi affectés.": {
    en: "INS+Primal +1D/level → Mental Defense difficulty for all combatants; on failure: immobilized for ≥ 1 round (+1 round per 3 triggers). Allies are also affected.",
    de: "INS+Primal +1W/Stufe → Schwierigkeit der mentalen Verteidigung für alle Kämpfer; bei Misserfolg: für ≥ 1 Runde bewegungsunfähig (+1 Runde pro 3 Auslöser). Verbündete sind ebenfalls betroffen."
  },
  "+1D par niveau à PSY+Tromperie pour dissimuler sa vraie nature.": {
    en: "+1D per level to PSY+Deception to conceal one's true nature.",
    de: "+1W pro Stufe auf PSY+Täuschung, um die wahre Natur zu verbergen."
  },
  "Tous les malus dus à de mauvaises conditions visuelles, à la cécité ou à l'obscurité sont réduits de 1D par niveau.": {
    en: "All penalties due to poor visibility, blindness, or darkness are reduced by 1D per level.",
    de: "Alle Mali durch schlechte Sichtverhältnisse, Blindheit oder Dunkelheit werden um 1W pro Stufe verringert."
  },
  "À chaque nouveau niveau de Potentiel : +niveau aux historiques Autorité et Secrets.": {
    en: "At each new Potential level: +level to the Authority and Secrets Origins.",
    de: "Bei jeder neuen Potenzial-Stufe: +Stufe auf die Hintergründe Autorität und Geheimnisse."
  },
  "Après AGI+Furtivité réussi : CHA+Négociation +2D par niveau vs Défense mentale pour imposer une opinion à la cible.": {
    en: "After a successful AGI+Stealth: CHA+Negotiation +2D per level vs Mental Defense to impose an opinion on the target.",
    de: "Nach erfolgreichem GEW+Heimlichkeit: CHA+Verhandlung +2W pro Stufe vs. mentale Verteidigung, um dem Ziel eine Meinung aufzuzwingen."
  },
  "(1) succès automatique par niveau à INS+Orientation pour localiser précisément une technologie inconnue.": {
    en: "(1) automatic success per level to INS+Orienteering to precisely locate an unknown technology.",
    de: "(1) automatischer Erfolg pro Stufe auf INS+Orientierung, um eine unbekannte Technologie präzise zu orten."
  },
  "(1) déclencheur par niveau à INS+Empathie pour détecter manipulations mémétiques. (1) déclencheur par niveau à la Défense mentale contre influence mémétique subconsciente.": {
    en: "(1) trigger per level to INS+Empathy to detect memetic manipulations. (1) trigger per level to Mental Defense against subconscious memetic influence.",
    de: "(1) Auslöser pro Stufe auf INS+Empathie, um memetische Manipulationen zu erkennen. (1) Auslöser pro Stufe auf mentale Verteidigung gegen unterbewussten memetischen Einfluss."
  },
  "Annule 3 points de dégâts électriques par niveau de Potentiel.": {
    en: "Cancels 3 points of electric damage per Potential level.",
    de: "Hebt 3 Punkte elektrischen Schaden pro Potenzial-Stufe auf."
  },
  "+1 Défense passive et +1D Défense active par niveau. Si la tête passe par une fissure, tout le corps peut suivre : +1 succès auto par niveau à AGI+Mobilité.": {
    en: "+1 Passive Defense and +1D Active Defense per level. If the head fits through a crack, the whole body can follow: +1 auto success per level to AGI+Mobility.",
    de: "+1 passive Verteidigung und +1W aktive Verteidigung pro Stufe. Passt der Kopf durch einen Spalt, kann der ganze Körper folgen: +1 automatischer Erfolg pro Stufe auf GEW+Beweglichkeit."
  },
  "(1) déclencheur par niveau à INT+Technologie lors d'une attaque contre de l'électronique Tech V ou inférieure.": {
    en: "(1) trigger per level to INT+Engineering when attacking electronics of Tech V or lower.",
    de: "(1) Auslöser pro Stufe auf INT+Technik bei einem Angriff auf Elektronik der Techstufe V oder niedriger."
  },
  "+1D par niveau à la Défense active. Contre-attaque = attaque ciblée sans augmentation de difficulté.": {
    en: "+1D per level to Active Defense. Counterattack = targeted attack without increased difficulty.",
    de: "+1W pro Stufe auf aktive Verteidigung. Gegenangriff = gezielter Angriff ohne erhöhte Schwierigkeit."
  },
  "Peut infiltrer (1) Culte par niveau. +1D par niveau à PSY+Domination et PSY+Tromperie en se faisant passer pour un membre de ces Cultes.": {
    en: "Can infiltrate (1) Cult per level. +1D per level to PSY+Domination and PSY+Deception while posing as a member of those Cults.",
    de: "Kann (1) Kult pro Stufe infiltrieren. +1W pro Stufe auf PSY+Dominieren und PSY+Täuschung, wenn er sich als Mitglied dieser Kulte ausgibt."
  },
  "En espace confiné : tous les malus d'exiguïté annulés. +2×niveau à la Défense passive et +2D par niveau à la Défense active.": {
    en: "In confined spaces: all cramped-space penalties cancelled. +2×level to Passive Defense and +2D per level to Active Defense.",
    de: "In engen Räumen: alle Mali durch Enge aufgehoben. +2×Stufe auf passive Verteidigung und +2W pro Stufe auf aktive Verteidigung."
  },
  "Après (3) rounds d'observation : PSY+Ruse (2) +1D/niveau pour modifier les conditions du terrain, ou (difficulté 4) pour mettre fin immédiatement au combat.": {
    en: "After (3) rounds of observation: PSY+Cunning (2) +1D/level to alter terrain conditions, or (difficulty 4) to end the fight immediately.",
    de: "Nach (3) Runden Beobachtung: PSY+Gerissenheit (2) +1W/Stufe, um Geländebedingungen zu verändern, oder (Schwierigkeit 4), um den Kampf sofort zu beenden."
  },
  "Quand touché par une attaque corps à corps avec arme ≤ à la sienne : l'attaquant subit des dégâts égaux (max = niveau). Seule armure Renforcée les réduit.": {
    en: "When hit by a melee attack with a weapon ≤ their own: the attacker takes equal damage (max = level). Only Reinforced armor reduces it.",
    de: "Wird er von einem Nahkampfangriff mit einer Waffe ≤ der eigenen getroffen: der Angreifer erleidet gleich viel Schaden (max. = Stufe). Nur verstärkte Rüstung verringert ihn."
  },
  "Rituel (15 min) de préparation au combat : ajoute (niveau) à la Défense mentale.": {
    en: "Combat-preparation ritual (15 min): adds (level) to Mental Defense.",
    de: "Kampfvorbereitungsritual (15 Min.): fügt (Stufe) zur mentalen Verteidigung hinzu."
  },
  "+1D par niveau à l'Initiative contre des ennemis supérieurs en force ou technologie.": {
    en: "+1D per level to Initiative against enemies superior in strength or technology.",
    de: "+1W pro Stufe auf Initiative gegen Gegner, die an Kraft oder Technologie überlegen sind."
  },
  "+1D par niveau à l'attaque ou à la défense au début du premier round de combat.": {
    en: "+1D per level to attack or defense at the start of the first round of combat.",
    de: "+1W pro Stufe auf Angriff oder Verteidigung zu Beginn der ersten Kampfrunde."
  },
  "Récupère (niveau) points d'Égo par round pendant la poursuite d'un ennemi qui fuit à pied.": {
    en: "Recovers (level) Ego points per round while chasing an enemy fleeing on foot.",
    de: "Erholt (Stufe) Ego-Punkte pro Runde bei der Verfolgung eines zu Fuß fliehenden Gegners."
  },
  "Choisir un ennemi cible : +niveau à la Défense passive contre tous les autres adversaires.": {
    en: "Choose a target enemy: +level to Passive Defense against all other opponents.",
    de: "Einen Zielgegner wählen: +Stufe auf passive Verteidigung gegen alle anderen Gegner."
  },
  "Dépenser (1) Égo + (1)/round pour maintenir : alliés gagnent +1D par niveau à l'Initiative.": {
    en: "Spend (1) Ego + (1)/round to maintain: allies gain +1D per level to Initiative.",
    de: "(1) Ego + (1)/Runde zum Aufrechterhalten ausgeben: Verbündete erhalten +1W pro Stufe auf Initiative."
  },
  "À la mort (Traumatismes max atteints) : immobile (1) round puis retour au combat pour (niveau) rounds avec toute la réserve d'Égo.": {
    en: "Upon death (max Trauma reached): motionless for (1) round, then returns to the fight for (level) rounds with their full Ego pool.",
    de: "Beim Tod (maximales Trauma erreicht): (1) Runde bewegungslos, dann Rückkehr in den Kampf für (Stufe) Runden mit dem vollen Ego-Vorrat."
  },
  "Contre d'anciens Fléaux : +1 déclencheur par niveau à l'Initiative. Peut échanger Double défi contre Ennemi ultime gratuitement.": {
    en: "Against former Scourgers: +1 trigger per level to Initiative. Can exchange Double Challenge for Ultimate Enemy for free.",
    de: "Gegen ehemalige Geißler: +1 Auslöser pro Stufe auf Initiative. Kann Doppelte Herausforderung kostenlos gegen Ultimativer Feind eintauschen."
  },
  "Frapper un membre d'un groupe avec le fustigateur : jet combiné PSY+Dom + PHY+Corps +1D/niveau → membres du groupe −1D/déclencheur à leur Défense mentale.": {
    en: "Striking a member of a group with the flogger: combined PSY+Domination + PHY+Melee roll +1D/level → group members −1D/trigger to their Mental Defense.",
    de: "Ein Gruppenmitglied mit der Geißel schlagen: kombinierter Wurf PSY+Dominieren + KÖR+Nahkampf +1W/Stufe → Gruppenmitglieder −1W/Auslöser auf ihre mentale Verteidigung."
  },
  "+1D par niveau à PSY et CHA lors de toute interaction avec des Cultes ou clans afrikains.": {
    en: "+1D per level to PSY and CHA during any interaction with Afrikan Cults or clans.",
    de: "+1W pro Stufe auf PSY und CHA bei jeder Interaktion mit afrikanischen Kulten oder Clans."
  },
  "+2D par niveau à tous les jets nécessaires pour accomplir les 8 épreuves traditionnelles du Moyo.": {
    en: "+2D per level to all rolls needed to complete the 8 traditional trials of the Moyo.",
    de: "+2W pro Stufe auf alle Würfe, die zur Bewältigung der 8 traditionellen Prüfungen des Moyo nötig sind."
  },
  "Chaque kill au combat stocke (1) déclencheur utilisable pour des jets d'attaque (maximum = 2×niveau).": {
    en: "Each kill in combat stores (1) usable trigger for attack rolls (maximum = 2×level).",
    de: "Jeder Kill im Kampf speichert (1) nutzbaren Auslöser für Angriffswürfe (Maximum = 2×Stufe)."
  },
  "Avant la mêlée : jet combiné PSY+Dom + CHA+Arts vs Défense mentale → si victoire, l'ennemi réduit ses Égo dépensables à l'Initiative de (niveau). Une fois par combat.": {
    en: "Before melee: combined PSY+Domination + CHA+Arts roll vs Mental Defense → on victory, the enemy's Ego spendable on Initiative is reduced by (level). Once per fight.",
    de: "Vor dem Nahkampf: kombinierter Wurf PSY+Dominieren + CHA+Künste vs. mentale Verteidigung → bei Sieg wird das für Initiative ausgebbare Ego des Gegners um (Stufe) verringert. Einmal pro Kampf."
  },
  "3 rounds d'invocation + PSY+Foi (3) : bénit un Fléau pour remplacer une compétence par PSY+Foi. Peut être utilisé (niveau) fois.": {
    en: "3 rounds of invocation + PSY+Faith (3): blesses a Scourger to replace a skill with PSY+Faith. Can be used (level) times.",
    de: "3 Runden Anrufung + PSY+Glaube (3): segnet einen Geißler, um eine Fertigkeit durch PSY+Glaube zu ersetzen. Kann (Stufe) Mal genutzt werden."
  },
  "+1D par niveau à CHA+Commandement pour mobiliser les masses contre un autre Culte.": {
    en: "+1D per level to CHA+Leadership to mobilize the masses against another Cult.",
    de: "+1W pro Stufe auf CHA+Führung, um die Massen gegen einen anderen Kult zu mobilisieren."
  },
  "+1D par niveau à tous les jets visant à couvrir ses méfaits.": {
    en: "+1D per level to all rolls aimed at covering up their misdeeds.",
    de: "+1W pro Stufe auf alle Würfe, die darauf abzielen, eigene Untaten zu vertuschen."
  },
  "Obtient l'armure additionnelle Carapace avec une valeur égale au niveau de Potentiel.": {
    en: "Gains the additional Carapace armor with a value equal to the Potential level.",
    de: "Erhält die zusätzliche Rüstung Panzer mit einem Wert gleich der Potenzial-Stufe."
  },
  "Premier round de combat : +1D par niveau à tous les jets d'attaque.": {
    en: "First round of combat: +1D per level to all attack rolls.",
    de: "Erste Kampfrunde: +1W pro Stufe auf alle Angriffswürfe."
  },
  "+1D par niveau à INS+Perception pour détecter des artefacts ou des pièges.": {
    en: "+1D per level to INS+Perception to detect artifacts or traps.",
    de: "+1W pro Stufe auf INS+Wahrnehmung, um Artefakte oder Fallen zu entdecken."
  },
  "En situation désespérée : +1D par niveau à la compétence salvatrice. Si survie : +1 Renommée (max 4).": {
    en: "In a desperate situation: +1D per level to the life-saving skill. If they survive: +1 Renown (max 4).",
    de: "In einer aussichtslosen Lage: +1W pro Stufe auf die rettende Fertigkeit. Bei Überleben: +1 Ruf (max. 4)."
  },
  "Contre la némésis : récupère (1) Égo par round ; peut dépenser (1) Égo pour soigner (1) Blessure superficielle par niveau.": {
    en: "Against the nemesis: recovers (1) Ego per round; can spend (1) Ego to heal (1) Fleshwound per level.",
    de: "Gegen den Nemesis: erholt (1) Ego pro Runde; kann (1) Ego ausgeben, um (1) Fleischwunde pro Stufe zu heilen."
  },
  "+niveau déclencheurs automatiques à INT+Connaissance des artefacts et INT+Technologie pour activation, évaluation ou réparation d'artefact.": {
    en: "+level automatic triggers to INT+Artifact Lore and INT+Engineering for artifact activation, appraisal, or repair.",
    de: "+Stufe automatische Auslöser auf INT+Artefaktkunde und INT+Technik zum Aktivieren, Bewerten oder Reparieren von Artefakten."
  },
  "+1D par niveau à INS+Orientation et INS+Survie pour pister le voleur. Ignore les malus de Traumatismes tant que le trésor n'est pas récupéré.": {
    en: "+1D per level to INS+Orienteering and INS+Survival to track the thief. Ignores Trauma penalties as long as the treasure has not been recovered.",
    de: "+1W pro Stufe auf INS+Orientierung und INS+Überleben, um den Dieb zu verfolgen. Ignoriert Trauma-Mali, solange der Schatz nicht zurückgeholt wurde."
  },
  "Chaque Traumatisme reçu au combat stocke (1) déclencheur pour les attaques suivantes (maximum = niveau).": {
    en: "Each Trauma received in combat stores (1) trigger for subsequent attacks (maximum = level).",
    de: "Jedes im Kampf erhaltene Trauma speichert (1) Auslöser für folgende Angriffe (Maximum = Stufe)."
  },
  "Niveau de charrette +niveau. +1D par niveau à PHY+Vigueur. Malus d'encombrement réduit de (niveau) au combat.": {
    en: "Cart level +level. +1D per level to PHY+Stamina. Encumbrance penalty reduced by (level) in combat.",
    de: "Karren-Stufe +Stufe. +1W pro Stufe auf KÖR+Ausdauer. Behinderungs-Malus im Kampf um (Stufe) verringert."
  },
  "+1D par niveau à AGI+Artisanat et INT+Technologie pour améliorer équipement. Emplacements supplémentaires coûtent (9/8/7)×nombre selon niveau.": {
    en: "+1D per level to AGI+Crafting and INT+Engineering to upgrade equipment. Extra slots cost (9/8/7)×number depending on level.",
    de: "+1W pro Stufe auf GEW+Handwerk und INT+Technik, um Ausrüstung zu verbessern. Zusätzliche Plätze kosten je nach Stufe (9/8/7)×Anzahl."
  },
  "+1D par niveau à INT+Légendes pour lire les runes. +1 succès auto par niveau pour éviter un danger signalé par une rune.": {
    en: "+1D per level to INT+Legends to read runes. +1 auto success per level to avoid a danger signaled by a rune.",
    de: "+1W pro Stufe auf INT+Legenden, um Runen zu lesen. +1 automatischer Erfolg pro Stufe, um eine durch eine Rune angezeigte Gefahr zu vermeiden."
  },
  "Avec la dernière balle : +2 déclencheurs par niveau au jet AGI+Armes à projectiles. Une fois par bataille.": {
    en: "With the last bullet: +2 triggers per level to the AGI+Projectiles roll. Once per battle.",
    de: "Mit der letzten Kugel: +2 Auslöser pro Stufe auf den GEW+Schusswaffen-Wurf. Einmal pro Schlacht."
  },
  "Sacrifier (1) point d'historique pour +1D au jet ; si échec : historique −1. Minimum 0/1/2 selon niveau.": {
    en: "Sacrifice (1) Origin point for +1D to the roll; on failure: Origin −1. Minimum 0/1/2 depending on level.",
    de: "(1) Hintergrund-Punkt für +1W auf den Wurf opfern; bei Misserfolg: Hintergrund −1. Minimum 0/1/2 je nach Stufe."
  },
  "Technique active : (2) déclencheurs → +1 Défense passive et +1D maniement pour le round ; cumulable jusqu'au niveau de Potentiel.": {
    en: "Active technique: (2) triggers → +1 Passive Defense and +1D handling for the round; stackable up to the Potential level.",
    de: "Aktive Technik: (2) Auslöser → +1 passive Verteidigung und +1W Handhabung für die Runde; kumulierbar bis zur Potenzial-Stufe."
  },
  "En défense avec alliés équipés d'armes d'hast : +1D Défense active par allié et par niveau. (2) déclencheurs → la défense compte comme une attaque.": {
    en: "In defense with allies equipped with polearms: +1D Active Defense per ally and per level. (2) triggers → the defense counts as an attack.",
    de: "In der Verteidigung mit Verbündeten, die Stangenwaffen tragen: +1W aktive Verteidigung pro Verbündeten und pro Stufe. (2) Auslöser → die Verteidigung zählt als Angriff."
  },
  "Attaque combinée : réussir à l'épée puis tirer à bout portant en ignorant l'armure (−3D/−2D/−1D maniement selon niveau).": {
    en: "Combined attack: succeed with the sword, then fire at point-blank range ignoring armor (−3D/−2D/−1D handling depending on level).",
    de: "Kombinierter Angriff: mit dem Schwert erfolgreich sein, dann aus nächster Nähe schießen, Rüstung ignorierend (−3W/−2W/−1W Handhabung je nach Stufe)."
  },
  "Contre les Psychonautes : obtient automatiquement (niveau) déclencheurs sur chaque attaque.": {
    en: "Against Psychonauts: automatically gains (level) triggers on every attack.",
    de: "Gegen Psychonauten: erhält automatisch (Stufe) Auslöser bei jedem Angriff."
  },
  "Immunisé contre l'influence des Psychonautes pendant (niveau) rounds de combat.": {
    en: "Immune to Psychonaut influence for (level) rounds of combat.",
    de: "Immun gegen den Einfluss von Psychonauten für (Stufe) Kampfrunden."
  },
  "Dernier survivant : +1D par niveau aux attaques et défenses pendant 6 rounds ; +1 Défense passive et +1 dégâts par niveau.": {
    en: "Last survivor: +1D per level to attacks and defenses for 6 rounds; +1 Passive Defense and +1 damage per level.",
    de: "Letzter Überlebender: +1W pro Stufe auf Angriffe und Verteidigungen für 6 Runden; +1 passive Verteidigung und +1 Schaden pro Stufe."
  },
  "Les Spitaliers alliés récupèrent 1d6 Égo à chaque fin de mission ou kill ennemi commun. Utilisable 1 fois/jour/niveau.": {
    en: "Allied Spitalians recover 1d6 Ego at the end of every mission or shared enemy kill. Usable 1 time/day/level.",
    de: "Verbündete Spitalier erholen 1W6 Ego bei jedem Missionsende oder gemeinsamen Gegner-Kill. 1 Mal/Tag/Stufe einsetzbar."
  },
  "En danger de mort : réussir PSY+Volonté (4) → Égo doublé (peut dépasser le max) pour 3 rounds par niveau ; insensible aux malus de Traumatismes.": {
    en: "In mortal danger: succeed at PSY+Willpower (4) → Ego doubled (can exceed the max) for 3 rounds per level; immune to Trauma penalties.",
    de: "In Lebensgefahr: PSY+Wille (4) bestehen → Ego verdoppelt (kann das Maximum überschreiten) für 3 Runden pro Stufe; immun gegen Trauma-Mali."
  },
  "+1D par niveau à la Défense mentale contre manipulation psychique ; récupère (1) Égo par déclencheur (max = niveau).": {
    en: "+1D per level to Mental Defense against psychic manipulation; recovers (1) Ego per trigger (max = level).",
    de: "+1W pro Stufe auf mentale Verteidigung gegen psychische Manipulation; erholt (1) Ego pro Auslöser (max. = Stufe)."
  },
  "+1D par niveau à tous les jets PSY pour interrogatoire ; bonus doublé contre victimes incarcérées ; cumulé par heure consécutive.": {
    en: "+1D per level to all PSY rolls for interrogation; bonus doubled against incarcerated victims; cumulative per consecutive hour.",
    de: "+1W pro Stufe auf alle PSY-Würfe beim Verhör; Bonus verdoppelt gegen inhaftierte Opfer; kumuliert pro aufeinanderfolgender Stunde."
  },
  "+1 déclencheur par niveau aux jets INT+Médecine pour soigner des Blessures superficielles.": {
    en: "+1 trigger per level to INT+Medicine rolls to heal Fleshwounds.",
    de: "+1 Auslöser pro Stufe auf INT+Medizin-Würfe zum Heilen von Fleischwunden."
  },
  "Durée chirurgie réduite : 6h/3h/1h30 selon niveau. Peut sacrifier (1) Trauma max permanent pour +1 déclencheur/niveau au jet.": {
    en: "Reduced surgery duration: 6h/3h/1h30 depending on level. Can sacrifice (1) permanent max Trauma for +1 trigger/level on the roll.",
    de: "Verkürzte Operationsdauer: 6h/3h/1,5h je nach Stufe. Kann (1) dauerhaftes maximales Trauma opfern für +1 Auslöser/Stufe auf den Wurf."
  },
  "Maximum de Traumatismes = PHY+PSY ou PSY×2 (meilleur des deux) +1 par niveau (peut dépasser 12).": {
    en: "Maximum Trauma = BOD+PSY or PSY×2 (whichever is better) +1 per level (can exceed 12).",
    de: "Maximales Trauma = KÖR+PSY oder PSY×2 (der bessere Wert) +1 pro Stufe (kann 12 überschreiten)."
  },
  "Peut ranimer un mort en 3 rounds par niveau (max 9 rounds au niveau 3) via une action complexe INT+Médecine (10).": {
    en: "Can revive a dead person within 3 rounds per level (max 9 rounds at level 3) via a complex INT+Medicine (10) action.",
    de: "Kann einen Toten innerhalb von 3 Runden pro Stufe wiederbeleben (max. 9 Runden auf Stufe 3) durch eine komplexe Aktion INT+Medizin (10)."
  },
  "+1 succès automatique par niveau à tous les jets visant à éviter une contamination (toxines, germes, spores).": {
    en: "+1 automatic success per level to all rolls aimed at avoiding contamination (toxins, germs, spores).",
    de: "+1 automatischer Erfolg pro Stufe auf alle Würfe, die eine Kontamination (Toxine, Keime, Sporen) vermeiden sollen."
  }
}

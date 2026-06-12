export const messages = {
  de: {
    locale: 'Sprache',
    name: 'Name',
    age: 'Alter',
    rank: 'Rang',
    experience: 'Erfahrung',
    gender: 'Geschlecht',
    height: 'Größe',
    weight: 'Gewicht',
    dinars: 'Dinar/Wechsel',
    trauma: 'Trauma',
    fleshwounds: 'Fleischwunden',
    ego: 'Ego',
    sporeInfestations: 'Versporung',
    attributePoints: 'Attributspunkte',
    skillPoints: 'Fertigkeitspunkte',
    originPoints: 'Hintergrundpunkte',
    potentialPoints: 'Potenzialpunkte',
    origins: 'Hintergründe',
    potentials: 'Potenziale',
    commonPotentials: 'Allgemeine Potenziale',
    cultPotentials: 'Potenziale der {cult}',
    concept: 'Konzept',
    culture: 'Kultur',
    cult: 'Kult',
    clan: 'Sippe',
    characterName: 'Name',
    saveCharacter: 'speichern',
    loadCharacter: 'Laden',
    deleteCharacter: 'löschen',
    confirmCharacterDeletion: 'Charakter "{name}" permanent löschen?',
    characterSheet: 'Charakterbogen',
    generateSheet: 'PDF erzeugen',
    sheetOptions: 'Charakterbogenoptionen',
    preferences: {
      label: 'Einstellungen',
      displayTranslatedLabelsDescription: 'Deutsche Übersetzungen für Begriffe ohne offizielle Übersetzung anzeigen?',
      untranslatedLabels: 'Bezeichner',
      displayTranslatedLabels: 'Übersetzungen',
      displayOriginalLabels: 'Original',
    },
    characters: 'Charaktere',
    exportCharacter: 'Exportieren',
    importCharacter: 'Charakter importieren',
    editorModes: {
      label: 'Bearbeitungsmodus',
      hardLimits: 'Strikt',
      softLimits: 'Normal',
      free: 'Frei',
      hints: {
        hardLimits: 'Punktelimits können nicht überschritten werden.',
        softLimits: 'Punktelimits können überschritten werden. Überschreitungen werden markiert.',
        free: 'Punktelimits können überschritten werden'
      },
      hintHardLimitModeImpossible: 'Der strikte Bearbeitungsmodus kann nicht gewählt werden, wenn bereits eines der Punktelimits überschritten wurde.'
    },
    hint: 'Hinweis',
    buildPoints: 'Generierungspunkte',
    buildOptions: 'Generierungsoptionen',
    editCharacter: 'Editieren',
    createNewCharacter: 'Neuer Charakter',
    cancel: 'Abbrechen',
    close: 'Schließen',
    characterAlreadyExists:
      'Ein Charakter mit diesem Namen existiert bereits. Bitte wähle einen anderen Namen.',
    noPrerequisites: 'Keine Voraussetzungen',
    missingConditions: 'Fehlende Bedingungen',
    rename: 'Umbenennen',
    renameCharacter: 'Charakternamen ändern',
    createRenamedCopy: 'Kopie erstellen',
    welcome: 'Willkommen in Noret',
    introduction: {
      whatIsIt: 'Was ist diese Seite?',
      whatIsItText1:
        'Dies ist ein Charaktereditor für Katharsys, das Regelwerk für das Rollenspiel Degenesis. ' +
        'Du kannst diese Applikation verwenden, um neue Charaktere zu erstellen, sowie um bereits erstellte ' +
        'anzuschauen und zu editieren. Für jeden Charakter kannst du eine Vorschau des Charakterbogens ' +
        'erzeugen, und den Bogen dann als ein druckbares PDF exportieren.',
      whatIsItText2:
        'Jeder deiner Charaktere, sowie alle Änderungen an diesen, werden lokal in deinem Browser gespeichert. ' +
        'Dies bedeutet, dass du jedes mal, wenn du diese Seite mit dem gleichen Browser besuchts, alle deine ' +
        'erstellten Charaktere vorfinden wirst. Leider beduetet dies auch, dass du keine Links auf deine Charaktere ' +
        'erzeugen kannst, die andere Leute einsehen können. Du kannst jedoch jeden Charakter als eine Datei exportieren, ' +
        'um diese an Andere weiterzugeben. Mit dieser Datei können deine Mitspieler ebenfalls diese Seite besuchen, ' +
        'und deinen Charakter in ihren Browser importieren. Ich habe diese (zugegebenermaßen etwas umständliche) Funktionsweise ' +
        'gewählt, um den Aufwand des Betriebs dieser Seite minimal zu halten.',
      whatIsItText3:
        'Der Quellcode für diese Seite ist verfügbar bei {0}. Ich möchte diese Applikation für alle ' +
        'verfügbar halten, damit sie in der Zukunft auch von anderen Leuten betrieben werden kann. Ziel ist, damit ' +
        'eine Situation wie mit dem offiziellen Charaktereditor zu vermeiden, der in der Vergangenheit bereits für längere ' +
        'Zeit nicht verfügbar war.'
    }
  },
  en: {
    locale: 'language',
    name: 'Name',
    age: 'Age',
    rank: 'Rank',
    experience: 'Experience',
    gender: 'Gender',
    height: 'Height',
    weight: 'Weight',
    dinars: 'Dinars/Drafts',
    trauma: 'trauma',
    fleshwounds: 'fleshwounds',
    ego: 'ego',
    sporeInfestations: 'spore infestations',
    attributePoints: 'Attribute points',
    skillPoints: 'Skill points',
    originPoints: 'Origin points',
    potentialPoints: 'Potential points',
    origins: 'Origins',
    potentials: 'Potentials',
    commonPotentials: 'Common Potentials',
    cultPotentials: '{cult} Potentials',
    concept: 'Concept',
    culture: 'Culture',
    cult: 'Cult',
    password: 'Password',
    enter: 'Enter',
    clan: 'Clan',
    characterName: 'Name',
    saveCharacter: 'Save',
    loadCharacter: 'Load',
    deleteCharacter: 'Delete',
    confirmCharacterDeletion: 'Permanently delete character "{name}"?',
    characterSheet: 'character sheet',
    generateSheet: 'Generate PDF',
    sheetOptions: 'Sheet Options',
    preferences: {
      label: 'Preferences',
      displayTranslatedLabelsDescription: 'Display translated labels (only relevant for non-english locale)?',
      untranslatedLabels: 'Labels',
      displayTranslatedLabels: 'Translated',
      displayOriginalLabels: 'Original',
    },
    characters: 'Characters',
    exportCharacter: 'Export',
    importCharacter: 'Import character',
    editorModes: {
      label: 'Editor mode',
      hardLimits: 'Strict',
      softLimits: 'Normal',
      free: 'Free',
      hints: {
        hardLimits: 'Point limits cannot be exceeded.',
        softLimits: 'Point limits can be exceeded. Any overages will be marked.',
        free: 'Point limits can be exceeded.'
      },
      hintHardLimitModeImpossible: 'The strict editor mode cannot be selected if any point limit has already been exceeded.'
    },
    hint: 'Hint',
    buildPoints: 'Build points',
    buildOptions: 'Build options',
    editCharacter: 'Edit',
    createNewCharacter: 'Create New',
    cancel: 'Cancel',
    close: 'Close',
    characterAlreadyExists:
      'A character with the given name already exists. Please choose another name.',
    noPrerequisites: 'No prerequisites',
    missingConditions: 'Missing conditions',
    rename: 'rename',
    renameCharacter: 'Rename character',
    createRenamedCopy: 'Create copy',
    welcome: 'Welcome to Noret',
    introduction: {
      whatIsIt: 'What is this?',
      whatIsItText1:
        'This is a character editor for Katharsys, the rule' +
        'system used by the roleplaying game Degenesis. You can use this application to  create new characters as well as ' +
        'peruse and edit those you previously created. For any character, you can look at a preview ' +
        'of the character sheet. This character sheet can also be exported as a printable PDF file.',
      whatIsItText2:
        'Any of your characters, as well as all changes to them, are persisted to the local storage of your browser. ' +
        'This means any time you visit this page with the same browser, you will be able to see your ' +
        'characters in the navigation drawer on the left. Click on them to view and edit them. ' +
        'Unfortunately, since the characters are stored within your browser only, you cannot create ' +
        'links to your characters so that other people can see them. However, you can export any character. ' +
        'You can give this export file to someone else. This person can then also visit this page and ' +
        'import this file. I have chosen this (admittedly somewhat limiting) mode of operation to reduce the ' +
        'technical and legal overhead of running this site.',
      whatIsItText3:
        'The source code for this page is available at {0}. The intention is to make this application ' +
        'available to anyone wishing to run it for themselves. I want to prevent a similar situation as with the ' +
        'official generator, which has previously been unavailable for longer periods of time.'
    }
  },
  fr: {
    locale: 'langage',
    name: 'Nom',
    age: 'Âge',
    rank: 'Rang',
    experience: 'EXP',
    gender: 'Sexe',
    height: 'Taille',
    weight: 'Poids',
    dinars: 'LC/Dinars',
    trauma: 'trauma',
    fleshwounds: 'blessures',
    ego: 'égo',
    sporeInfestations: 'sporulations',
    attributePoints: 'Attributs',
    skillPoints: 'Compétences',
    originPoints: 'Historiques',
    potentialPoints: 'Potentiels',
    legaciesPoints: 'Héritages',
    origins: 'Historiques',
    potentials: 'Potentiels',
    commonPotentials: 'Potentiels Communs',
    cultPotentials: 'Potentiels des {cult}',
    concept: 'Concept',
    culture: 'Culture',
    cult: 'Culte',
    chooseCulture: 'Choisir la Culture',
    chooseConcept: 'Choisir le Concept',
    chooseCult: 'Choisir le Culte',
    clan: 'Clan',
    legacies: 'Héritages',
    characterName: 'Nom',
    saveCharacter: 'Sauvegarder',
    loadCharacter: 'Charger',
    deleteCharacter: 'Supprimer',
    password: 'Mot de passe',
    enter: 'Entrer',
    confirmCharacterDeletion: 'Supprimer définitivement le personnage "{name}"?',
    characterSheet: 'feuille de personnage (pdf)',
    generateSheet: 'Générer un PDF',
    sheetOptions: 'Options de feuille',
    preferences: {
      label: 'Options',
      displayTranslatedLabelsDescription: 'Afficher les labels traduits (only relevant for non-english locale)?',
      untranslatedLabels: 'Labels',
      displayTranslatedLabels: 'Traduit',
      displayOriginalLabels: 'Original',
    },
    characters: 'Personnages',
    exportCharacter: 'Partager votre fiche',
    importCharacter: 'Importer un personnage',
    editorModes: {
      label: 'Modes d\'édition',
      hardLimits: 'Strict',
      softLimits: 'Normal',
      free: 'Expert',
      hints: {
        hardLimits: 'La limite de points ne peut pas être excédée.',
        softLimits: 'La limite de points peut être excédée. Les points excédants seront marqués.',
        free: 'Aucunes limites.',
      },
      hintHardLimitModeImpossible: 'Le mode d\'édition strict ne peut pas être sélectionné si une limite de points a déjà été dépassée.',
    },
    hint: 'Indice',
    buildPoints: 'Répartition des Points',
    buildOptions: 'Modes de Création',
    editCharacter: 'Modifier',
    createNewCharacter: 'Nouveau Personnage',
    cancel: 'Annuler',
    close: 'Fermer',
    characterAlreadyExists: 'Un personnage portant ce nom existe déjà. Veuillez en choisir un autre.',
    noPrerequisites: 'Pas de prérequis',
    missingConditions: 'Conditions manquantes',
    rename: 'renommer',
    renameCharacter: 'Renommer le personnage',
    createRenamedCopy: 'Faire une copie',
    welcome: 'Bienvenue à Parasite !',
    introduction: {
      whatIsIt: `<p>Qu'est-ce que c'est ? </p><a href="./midona.gif"  class="midona-egg" style="opacity:0;">MIDONA DID NOTHING WRONG</a>`,
      whatIsItText1: `Ceci est un éditeur de personnage pour Katharsys et Artéfacts, le système de règles utilisé par le jeu de rôle Degenesis. Vous pouvez utiliser ce site pour créer de nouveaux personnages ainsi que consulter et modifier ceux que vous avez créés précédemment. Pour chaque personnage, vous pouvez consulter un aperçu de la feuille de personnage. Cette feuille de personnage peut également être exportée sous forme de fichier PDF imprimable.Le texte a été traduit des pdf et du site par Katsu. Il peut y avoir des différences entre la traduction d'Edge et celle de Katsu.`,
      whatIsItText2: `Tous vos personnages, ainsi que toutes les modifications qui leur sont apportées, sont sauvegardés dans le stockage local de votre navigateur. Cela signifie qu'à chaque fois que vous visitez cette page avec le même navigateur, vous pourrez voir vos personnages dans le tiroir de navigation sur la gauche. Cliquez dessus pour les consulter et les modifier. Malheureusement, étant donné que les personnages sont stockés uniquement dans votre navigateur, vous ne pouvez pas créer de liens vers vos personnages pour que d'autres personnes puissent les voir. Cependant, vous pouvez exporter n'importe quel personnage. Vous pouvez donner ce fichier d'exportation à quelqu'un d'autre. Cette personne peut ensuite également visiter cette page et importer ce fichier. Ce mode de fonctionnement a été choisi (certes quelque peu limitant) pour réduire les contraintes techniques et légales liées à la gestion de ce site.`,
      whatIsItText3: `Diskordanz (Développeur originel du site) : « Le code source de cette page est disponible sur {0}. L'intention est de rendre cette application accessible à toute personne souhaitant l'exécuter elle-même. Je veux éviter une situation similaire à celle du générateur officiel, qui a précédemment été indisponible pendant de longues périodes. » La communauté française remercie Diskordanz pour son travail.Merci également à Miokido pour le développement.`,
    },
  }
}
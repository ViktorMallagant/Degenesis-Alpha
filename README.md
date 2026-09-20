# Parasite : Character Editor

🔗 **[Try it live](https://katsu6624.github.io/degenesis-parasite.github.io/)**

_Parasite_ is a character editor for **Katharsys & Artefacts**, the rule system used by the tabletop roleplaying game [Degenesis][degenesis]. Use it to create new characters, browse and edit those you previously made, preview their character sheet and inventory, export a printable/editable PDF, or share a character with your friends or GM via a link.

Available in **French, English and German**.

## Features

### Character Management
- Full character creation flow (Culture / Concept / Cult / Clan, attributes, skills, origins, Potentials, Legacies, ranks…)
- Three editor modes: Strict, Normal, and Expert (no limits, manual Dinars/Drafts entry)
- Character gallery page with portrait cards, quick share, and delete
- Characters are saved locally in your browser (no account, no server-side storage)

### Portrait
- Upload a portrait image (auto-compressed to save storage space)
- Built-in crop tool with Free, Full, 3:4 and 1:1 modes, rotation and reset
- Independent crops for the gallery card and the character sheet
- Download the portrait at full quality

### Inventory & Economy
- Inventory management with an in-game weapon, armor and equipment catalog
- Purchase items with Dinars (Drafts) or Resources, or add them for free
- Stacked display for duplicate items (×2, ×3…)

### Character Sheet & Export
- Character sheet preview
- Printable & editable PDF export (available only on the Sheet tab)
- Share a character with a read-only link (via Bytebin or encoded URL fallback)

### NPC Tools
- Detailed NPC generator (attributes, skills, rank)
- Simplified NPC generator (quick stats with culture/concept/cult presets)

### Other
- Hover tooltips explaining attribute and skill quality scales
- Warning tooltip when Drafts/Dinars balance is negative
- Dialog when leaving Expert mode after manually editing Drafts
- Optional ambient background music
- Light and dark theme

## Development

Working on this application requires the following:

- `nodejs` 18.x
- `npm`

In order to get to work, run:

```
npm install
```

You can run the tests with

```
npm run test:unit
```

and trigger a production build with

```
npm run build
```

## Running locally

The local development server may be started with

```
npm run dev
```

## Credits

- **Diskordanz** — developer who created the original codebase this project is built on ([Noret][diskordanz])
- **Miokido** — co-developer
- **Katsu** — developer, French translation

## Copyright notice

_Parasite_ is a community creation for the tabletop role playing game [Degenesis®][degenesis]. Degenesis® is a trademark of [SIXMOREVODKA® Studio GmbH][smv]. All rights reserved. This project is not affiliated with SIXMOREVODKA Studio GmbH.

_Parasite_ is a French fork of the _Noret_ project by [Diskordanz][diskordanz].

[degenesis]: https://degenesis.com
[smv]: https://www.sixmorevodka.com
[diskordanz]: https://github.com/diskordanz

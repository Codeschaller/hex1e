# HEX1E System Changelog

## [0.1.0] – 2026-03-05

### Added

#### Core System Architecture

- Initial Foundry VTT v13 system setup with modular file structure
- Actor data models (`ActorDataModel` and `HeroDataModel`) with Foundry DataModel framework
- Complete actor type definitions for `hero` and `enemy`
- Template schema definitions in `template.json`

#### Hero Actor System

- **Attributes**: Body, Agility, Accuracy, Knowledge, Tech, Social (core stats for rolls and calculations)
- **Health System**: Current/Max/Temp HP tracking with reparable and healable flags
- **Movement**: Max movement, armor penalty, meter and hexagon tracking
- **Identity**: Race, class, sex, player type, and character note fields

#### Damage & Combat

- **Body Zone Damage**: Granular tracking for head, left/right arms, left/right legs
  - 3-slot wound array per zone (tear/wound tracking)
  - Destruction flag for permanent injuries
  - Body malus penalties for accuracy and agility
- **Weapons System**: Primary and secondary weapon slots with:
  - Weapon type (melee, close range, middle range, wide range)
  - Accuracy modifier
  - Damage calculation (die count, die size, flat bonus)
  - Damage type and properties
- **Armor System**: Four armor piece slots (helmet, vest, bracers, pants) with:
  - Individual armor values and penalties
  - Name and properties fields
  - Total armor value and consolidated penalty tracking
- **Resistances**: Electricity, fire, frost, acid with weak/resist/immune states
- **Status Effects**: 8 status conditions (blinded, bleeding, poisoned, radiated, chilled, burning, stunned, shocked) with immunity and applied flags

#### Skills & Abilities

- **Competencies**: 16 trained skills across attributes:
  - Body: Strength, Endurance, Intimidation, Melee Combat
  - Agility: Dodge, Stealth
  - Accuracy: Ranged Combat, Investigation
  - Knowledge: Medicine (with specialty), Survival
  - Tech: Weapon Handling (with specialty), Tinkering, Repair (with specialty)
  - Social: Eloquence, Performance, Empathy
  - Each skill has training checkbox and value field
- **Abilities**: 3 ability slots with multiple level selections and descriptive properties

#### Inventory & Resources

- **Inventory**: 8 equipment slots for item tracking
- **Wealth**: Infinitis currency field
- **Scrap**: Resource counter with bonus modifier (0-10 scale)
- **Inventory Notes**: Textarea for background/inventory documentation

#### Character Progression

- **Levels**: Hierarchical level tracking with subdivisions (L1, L1.1, L2, L2.1, L2.2, L3-L5 with multiple paths)
- **Character Info**: Armor types, weapon types, race, class, player type, and notes
- **General Notes**: Adventure notes and campaign tracking

#### Hero Sheet UI

- **Header Layout**: Character image display, resistances panel, basic info (name, player name, level)
- **Movement Display**: Max movement minus armor penalty calculation for meters and hexagons
- **Health Panel**: Visual health tracking (current/max/temp)
- **Body Damage Grid**: 6-zone damage visualization with wound/destruction checkboxes
- **Attribute Bar**: Horizontal 6-attribute display for quick reference
- **Tabbed Interface**: 5 main tabs (Skills, Battle, Inventory, Character Info, Notes)
- **Skills Tab**: Competency grid with training checkboxes and value inputs
- **Battle Tab**: Abilities rows, weapons section, armor configuration, status effects table
- **Inventory Tab**: Wealth and scrap tracking, 8 inventory slots, background notes
- **Character Info Tab**: 3-column form for identity and gear details
- **Notes Tab**: Multi-line notes and level progression selection

#### Styling

- Professional dark theme CSS (`system.css`, `sheets.css`)
- Responsive grid-based layout
- Form input styling and checkbox design
- Tabbed content organization

#### Documentation

- README with project structure overview
- Modular file organization (data-models, documents, helpers, templates)
- Asset management (icons, backgrounds, UI elements)
- Localization support (English and German language files)

### Project Structure

```
hex1e/
├── hex1e.mjs                    (System entry point)
├── system.json                  (System metadata)
├── template.json                (Actor/Item schema definitions)
├── CHANGELOG.md                 (This file)
├── README.md                    (Project documentation)
├── module/
│   ├── config/
│   │   └── system-config.js     (Configuration constants)
│   ├── data-models/
│   │   ├── actor-data.js        (Base actor schema)
│   │   ├── hero-data.js         (Hero-specific schema)
│   │   └── item-data.js         (Item schema structure)
│   ├── documents/
│   │   ├── hero-sheet.js        (Hero character sheet class)
│   │   ├── enemy-sheet.js       (Enemy character sheet class)
│   │   ├── armor-sheet.js       (Armor item sheet)
│   │   ├── weapon-sheet.js      (Weapon item sheet)
│   │   └── npc-sheet.js         (NPC character sheet class)
│   ├── helpers/
│   │   ├── rolls.js             (Dice rolling mechanics)
│   │   └── macros/
│   │       └── hotbar-macros.js (Hotbar macro definitions)
├── templates/
│   └── actors/
│       ├── hero-sheet.hbs       (Hero character sheet template)
│       ├── enemy-sheet.html     (Enemy character sheet template)
│       ├── npc-sheet.js         (NPC sheet template)
│       └── weapon-sheet.html    (Weapon item sheet template)
├── styles/
│   ├── system.css               (Global system styling)
│   └── sheets.css               (Sheet-specific styling)
├── lang/
│   ├── en.json                  (English localization)
│   └── de.json                  (German localization)
├── assets/
│   ├── background/              (Background images)
│   ├── icons/                   (System and action icons)
│   └── ui/                      (UI element graphics)
└── packs/
    ├── items/                   (Compendium for items)
    └── monsters/                (Compendium for monsters/enemies)
```

### Notes

- Foundation system ready for future expansions (macros, automation, item types)
- All base mechanics implemented for testing and gameplay
- Extensible architecture for additional actor types and features

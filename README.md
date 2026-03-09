# HEX1E - Foundry VTT System

**HEX1E** is a comprehensive tabletop RPG system for Foundry VTT, featuring a hex-based tactical framework with detailed character progression, combat mechanics, and resource management.

## Overview

HEX1E is designed for campaigns that emphasize:

- **Tactical Combat**: Hex-based movement and positioning on the battle grid
- **Detailed Character Development**: Granular attribute progression, skill mastery, and ability unlocks
- **Resource Management**: Wealth (Infinitis), Scrap materials, and inventory tracking
- **Physical Realism**: Zone-based damage tracking with wound accumulation and destruction states
- **Player Agency**: Multiple advancement paths and specialization choices

## Key Features

### Character System

- **6 Core Attributes**: Body, Agility, Accuracy, Knowledge, Tech, Social
- **16 Trainable Skills**: Combat, Investigation, Medicine, Crafting, Social, and more
- **Body Zone Damage**: Head, arms, legs with wound and destruction tracking
- **Health Management**: Current/Max/Temp HP with reparable/healable flags

### Combat

- **Dual Weapon System**: Primary and secondary weapon slots with damage configuration
- **Armor System**: 4-piece armor (helmet, vest, bracers, pants) with defense and penalties
- **Resistances**: 4 damage types (electricity, fire, frost, acid) with weakness/resistance/immunity states
- **Status Effects**: 8 conditions affecting character capabilities (blinded, bleeding, poisoned, etc.)

### Progression

- **Ability System**: 3 ability slots with level-specific selections
- **Hierarchical Levels**: L1-L5 with subdivisions for granular progression
- **Skill Advancement**: Training system for specialization development

### Resources

- **Inventory**: 8 equipment slots
- **Wealth**: Infinitis currency tracking
- **Scrap**: Secondary resource counter with bonuses

## Installation

1. Install Foundry VTT v13+
2. Extract the `hex1e` system folder to:
   ```
   [Foundry Data Directory]/systems/hex1e/
   ```
3. Start Foundry and select HEX1E from the system dropdown

## Project Structure

```
hex1e/
├── assets/
│   ├── background/          # Background images for scene/actor display
│   ├── icons/               # System and ability icons
│   ├── imgBackup/           # Backup image files
│   └── ui/                  # UI element graphics
│
├── lang/
│   ├── de.json              # German localization
│   └── en.json              # English localization
│
├── module/
│   ├── config/
│   │   └── system-config.js # Configuration constants and system settings
│   ├── data-models/
│   │   ├── actor-data.js    # Base ActorDataModel for all actor types
│   │   ├── hero-data.js     # HeroDataModel extending base actor
│   │   └── item-data.js     # ItemDataModel for equipment/items
│   ├── documents/
│   │   ├── hero-sheet.js    # Hero character sheet class
│   │   ├── enemy-sheet.js   # Enemy character sheet class
│   │   ├── npc-sheet.js     # NPC character sheet class
│   │   ├── armor-sheet.js   # Armor item sheet
│   │   └── weapon-sheet.js  # Weapon item sheet
│   ├── helpers/
│   │   ├── rolls.js         # Dice rolling mechanics and helpers
│   │   └── macros/
│   │       └── hotbar-macros.js  # Hotbar macro definitions
│   └── [future expansions]
│
├── packs/
│   ├── items/               # Item compendium (equipment, abilities)
│   └── monsters/            # Monster/enemy compendium
│
├── styles/
│   ├── system.css           # Global system styling
│   └── sheets.css           # Character sheet styling
│
├── templates/
│   ├── actors/
│   │   ├── hero-sheet.hbs   # Hero character sheet template
│   │   ├── enemy-sheet.html # Enemy character sheet template
│   │   └── npc-sheet.js     # NPC sheet template
│   └── items/
│       └── weapon-sheet.html # Weapon item sheet template
│
├── hex1e.mjs                # System entry point and initialization
├── system.json              # System metadata (name, version, compatibility)
├── template.json            # Actor and Item schema definitions
├── CHANGELOG.md             # Version history and changes
└── README.md                # This file
```

## Getting Started

### Creating a Hero Character

1. Create a new Actor and select type **Hero**
2. Fill in **Player Name** and **Character Name**
3. Assign base **Attributes** (Body, Agility, Accuracy, Knowledge, Tech, Social)
4. Configure **Health** (Max HP, reparable/healable status)
5. Set up **Resistances** if needed

### Combat Setup

1. Switch to the **Battle** tab
2. Add **Primary and Secondary Weapons** with damage configuration
3. Select **Abilities** from the L1, L2, and L4 rows
4. Equip **Armor** (helmet, vest, bracers, pants)
5. Track **Status Effects** as they occur during combat

### Skill Training

1. Navigate to the **Skills** tab
2. Check the checkbox for each skill you wish to train
3. Enter the skill value (0-100 scale)
4. Some skills have secondary values (Medicine, Repair, Weapon Handling, Strength)

### Inventory Management

1. Open the **Inventory** tab
2. Enter **Wealth** (Infinitis amount)
3. Set **Scrap** value and bonus modifier
4. Fill out 8 inventory slots with equipment descriptions
5. Add **Background Notes** for campaign-specific information

## Character Sheets

### Hero Sheet Features

- **Character Image**: Click to change portrait
- **Body Damage Grid**: Visual zone damage tracking with wound slots and destruction states
- **Health Display**: Current/Max/Temp HP with regeneration flags
- **Attribute Bar**: Quick-reference display of 6 core attributes
- **Tabbed Interface**: Skills, Battle, Inventory, Character Info, Notes

### Tab Descriptions

| Tab                | Purpose                                             |
| ------------------ | --------------------------------------------------- |
| **Skills**         | Train and track competency progression              |
| **Battle**         | Configure weapons, armor, abilities, status effects |
| **Inventory**      | Manage wealth, scrap, equipment slots, and notes    |
| **Character Info** | Set identity (race, class, sex), equipment types    |
| **Notes**          | Campaign notes and level progression tracking       |

## Damage & Healing

### Body Zones

Characters have 6 tracked body zones:

- **Head**: 3 wound slots + destruction flag
- **Left Arm**: 3 wound slots + destruction flag
- **Right Arm**: 3 wound slots + destruction flag
- **Left Leg**: 3 wound slots + destruction flag
- **Right Leg**: 3 wound slots + destruction flag
- **Body Malus**: Global accuracy and agility penalties from injuries

### Health Flags

- **Reparable**: Can be recovered via repair actions
- **Healable**: Can be recovered via medicine/healing

## Movement System

Movement calculation accounts for armor penalties:

```
Actual Movement (meters) = Max Movement - Armor Penalty
Hex Movement = Based on meter calculation
```

## Future Development

Planned expansions include:

- [ ] Automated damage application and healing
- [ ] Macro system for common actions (attacks, skill checks)
- [ ] Item compendium with common weapons and armor
- [ ] Monster/NPC stat blocks and encounters
- [ ] Campaign journal integration
- [ ] Experience and advancement automation

## System Requirements

- **Foundry VTT**: v13 or later
- **Browser**: Modern browser with ES6+ support
- **Recommended**: Chrome, Firefox, Edge (latest versions)

## Support & Contribution

For bug reports, feature requests, or contributions, please contact the system author or submit via the Foundry system repository.

## License

See package metadata in `system.json` for licensing information.

---

**Version**: 0.1.0  
**Last Updated**: March 5, 2026  
**System**: Foundry VTT v13+

hex1e/
├─ assets/
│ ├─ backgrounds/
│ │ └─ system-background.jpg
│ ├─ icons/
│ │ └─ PNG_Hexadoor Logo.png
│ ├─ ui/
│ └─ fonts/
│
├─ lang/
│ ├─ de.json
│ └─ en.json
│
├─ module/
│ ├─ config/
│ │ └─ system-config.js
│ ├─ data-models/
│ │ ├─ actor-data.js
│ │ └─ item-data.js
│ ├─ documents/
│ │ ├─ armor-sheet.js
│ │ ├─ enemy-sheet.js
│ │ ├─ hero-sheet.js
│ │ ├─ npc-sheet.js
│ │ └─ weapon-sheet.js
│ ├─ helpers/
│ │ └─ rolls.js
│ └─ packs/
│ ├─ items/
│ └─ monsters/
│
├─ styles/
│ ├─ system.css
│ └─ sheets.css
│
├─ templates/
│ ├─ actors/
│ │ └─ hero-sheet.html
│ ├─ items/
│ │ └─ weapon-sheet.html
│ └─ ui/
│
├─ hex1e.mjs
├─ system.json
├─ template.json
└─ README.md

TODO:

## Charakter Sheet Design

### Taps

Overview:

- Moral REJECTED
  - Bewegungsreichweite DONE

#### Battle

- **Column 1**
- **Column 2**
  - Waffen DONE
  - Rüstung DONE
- **Klassenfähigkeiten**
- **Waffen** DONE
- **Rüstung** DONE
- **Column 3**
  - Widerstände DONE
  - Statuseffekte DONE
- **Infos**
  - Angriff REJECTED
  - Verteidigen REJECTED

#### Skills

- **Specific Attributes (Skills)**
- **Infos**
  - Medizin DONE
  - Reparieren DONE

#### Inventory

- **Column**
  - Money
  - Scrap
- **Inventory**

#### Charakter Info

- Rasse / Klasse DONE
- Rüstungstyp / Waffentyp DONE

Makros erstellen:
Heilen/Repaieren REJECTED
Unbewaffneter angriff DONE
Schaden DONE
TrefferDONE

UI/
Create 3 diverend themas for hero sheets
-----/_ DEFAULT THEME — clean, neutral _/
-----/_ SCI-FI THEME — neon, holographic, dark UI _/
--Uniformed checkboxes
--Sci-fi design

Add all Elements
Finalise Version 0.1.0 undynamic hero-sheet

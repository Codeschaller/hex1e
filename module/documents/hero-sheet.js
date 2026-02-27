// -------------------------------------------------------------
//  HERO SHEET (Foundry VTT v13)
//  Dies ist das ActorSheet für den Actor-Typ "hero".
//  Es lädt das HTML-Template, stellt Daten bereit und aktiviert Listener.
// -------------------------------------------------------------

export class HeroSheet extends ActorSheet {
  // -----------------------------------------------------------
  //  Default Options
  //  - CSS-Klassen für Styling
  //  - Template-Pfad
  //  - Fenstergröße
  // -----------------------------------------------------------
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["hex1e", "sheet", "actor", "hero"], // wichtig für CSS und System-Identität
      template: "systems/hex1e/templates/actors/hero-sheet.hbs", // HTML-Datei des Sheets
      width: 900,
      height: 1000,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "skills",
        },
      ],
    });
  }

  // -----------------------------------------------------------
  //  getData()
  //  - Holt Actor-Daten
  //  - Stellt sie dem Template zur Verfügung
  //  - In v13 liegen Systemdaten unter actor.system
  // -----------------------------------------------------------
  getData(options) {
    const data = super.getData(options);

    // Systemdaten explizit verfügbar machen
    data.system = this.actor.system;

    data.levels = [
      { lvl: 1, main: "l1", subs: ["l1_1"] },
      { lvl: 2, main: "l2", subs: ["l2_1", "l2_2"] },
      { lvl: 3, main: "l3", subs: ["l3_1", "l3_2", "l3_3"] },
      { lvl: 4, main: "l4", subs: ["l4_1", "l4_2", "l4_3", "l4_4"] },
      { lvl: 5, main: "l5", subs: ["l5_1", "l5_2", "l5_3", "l5_4", "l5_5"] },
    ];

    return data;
  }

  // -----------------------------------------------------------
  //  activateListeners()
  //  - Hier kannst du Click-Events, Buttons, Interaktionen hinzufügen
  //  - Wird nach dem Rendern des HTMLs ausgeführt
  // -----------------------------------------------------------
  activateListeners(html) {
    super.activateListeners(html);
  }
}

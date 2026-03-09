/**
 * ActorDataModel
 * Defines the data schema for all actor types (heroes, NPCs, enemies) within the HEX1E
 * Foundry VTT system. This class extends Foundry's abstract DataModel and is used
 * by the system to validate, initialize, and manage actor data fields.
 *
 * Each section below uses SchemaField definitions from foundry.data.fields to build
 * a nested structure describing health, attributes, skills, combat gear, abilities,
 * resistances, and status effects.
 *
 * NOTE: Fields are initialized with sensible defaults to make new actor creation
 * easier and to ensure compatibility with existing migrations.
 */
export class ActorDataModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      // -----------------------------------------
      // HEALTH: Shared health structure for actors
      // -----------------------------------------
      health: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0 }), // Current HP
        max: new fields.NumberField({ initial: 0 }), // Maximum HP
        temp: new fields.NumberField({ initial: 0 }), // Temporary HP (shields, buffs)
        reparable: new fields.BooleanField({ initial: false }), // Can be repaired
        healable: new fields.BooleanField({ initial: false }), // Can be healed
      }),
      gear: new fields.SchemaField({
        armorTypes: new fields.StringField({ initial: "" }),
        weaponTypes: new fields.StringField({ initial: "" }),
      }),
      identity: new fields.SchemaField({
        race: new fields.StringField({ initial: "" }),
        class: new fields.StringField({ initial: "" }),
        note: new fields.StringField({
          initial: "",
          nullable: true,
        }),
        playertyp: new fields.StringField({ initial: "" }),
        sex: new fields.StringField({ initial: "" }),
      }),
      movement: new fields.SchemaField({
        max: new fields.NumberField({ initial: 15, min: 0 }),
        armorPenalty: new fields.NumberField({ initial: 0 }),
        meters: new fields.NumberField({ initial: 0, min: 0 }),
        hexagons: new fields.NumberField({ initial: 0, min: 0 }),
      }),

      // -----------------------------------------
      // CORE ATTRIBUTES (Primary Stats)
      // These are the base stats used for rolls,
      // skill calculations, and derived values.
      // -----------------------------------------
      attributes: new fields.SchemaField({
        body: new fields.NumberField({ initial: 50, integer: true }), // Physical strength & toughness
        agility: new fields.NumberField({ initial: 0, integer: true }), // Speed, reflexes
        accuracy: new fields.NumberField({ initial: 0, integer: true }), // Precision, ranged ability
        knowledge: new fields.NumberField({ initial: 0, integer: true }), // Intelligence, medicine, science
        technique: new fields.NumberField({ initial: 0, integer: true }), // Engineering, repair, tinkering
        social: new fields.NumberField({ initial: 0, integer: true }), // Charisma, empathy, persuasion
      }),

      // -----------------------------------------
      // BODY ZONES & DAMAGE MODEL
      // Each zone tracks wounds and destruction.
      // Wounds are arrays of booleans (3 slots).
      // -----------------------------------------
      body: new fields.SchemaField({
        // -------------------------
        // HEAD DAMAGE
        // -------------------------
        head: new fields.SchemaField({
          wound: new fields.ArrayField(
            new fields.BooleanField({ initial: false }),
            { initial: [false, false, false] }, // 3 wound slots
          ),
          destroyed: new fields.BooleanField({ initial: false }), // Head destroyed = instant death?
        }),

        // -------------------------
        // GLOBAL BODY MALUS
        // Applies penalties to attributes
        // when certain body parts are damaged.
        // -------------------------
        bodyMali: new fields.SchemaField({
          accuracy: new fields.NumberField({ initial: 0 }), // Accuracy penalty
          agility: new fields.NumberField({ initial: 0 }), // Agility penalty
        }),

        // -------------------------
        // LEFT ARM DAMAGE
        // -------------------------
        leftArm: new fields.SchemaField({
          wound: new fields.ArrayField(
            new fields.BooleanField({ initial: false }),
            { initial: [false, false, false] },
          ),
          destroyed: new fields.BooleanField({ initial: false }),
        }),

        // -------------------------
        // RIGHT ARM DAMAGE
        // -------------------------
        rightArm: new fields.SchemaField({
          wound: new fields.ArrayField(
            new fields.BooleanField({ initial: false }),
            { initial: [false, false, false] },
          ),
          destroyed: new fields.BooleanField({ initial: false }),
        }),

        // -------------------------
        // LEFT LEG DAMAGE
        // -------------------------
        leftLeg: new fields.SchemaField({
          wound: new fields.ArrayField(
            new fields.BooleanField({ initial: false }),
            { initial: [false, false, false] },
          ),
          destroyed: new fields.BooleanField({ initial: false }),
        }),

        // -------------------------
        // RIGHT LEG DAMAGE
        // -------------------------
        rightLeg: new fields.SchemaField({
          wound: new fields.ArrayField(
            new fields.BooleanField({ initial: false }),
            { initial: [false, false, false] },
          ),
          destroyed: new fields.BooleanField({ initial: false }),
        }),
      }),
      // Inside your actor-data.js HeroDataModel.defineSchema()

      // -----------------------------------------
      // SKILLS: Each skill has a training checkbox, a base value,
      // and (for some) a sub-value used for specialty or usage calculation.
      skills: new foundry.data.fields.SchemaField({
        strength: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
          us: new foundry.data.fields.SchemaField({
            value: new foundry.data.fields.NumberField({ initial: 0 }),
          }),
        }),

        endurance: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
        }),

        intimidation: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
        }),

        melee: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
        }),

        dodge: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
        }),

        stealth: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
        }),

        ranged: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
        }),

        investigation: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
        }),

        medicine: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
          m: new foundry.data.fields.SchemaField({
            value: new foundry.data.fields.NumberField({ initial: 0 }),
          }),
        }),

        survival: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
        }),

        weaponhandling: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
          wh: new foundry.data.fields.SchemaField({
            value: new foundry.data.fields.NumberField({ initial: 0 }),
          }),
        }),

        tinkering: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
        }),

        repair: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
          r: new foundry.data.fields.SchemaField({
            value: new foundry.data.fields.NumberField({ initial: 0 }),
          }),
        }),

        eloquence: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
        }),

        performance: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
        }),

        empathy: new foundry.data.fields.SchemaField({
          checked: new foundry.data.fields.BooleanField({ initial: false }),
          value: new foundry.data.fields.NumberField({ initial: 0 }),
        }),
      }),
      // -----------------------------------------
      // BATTLE: Weapons & Armor
      // -----------------------------------------
      weapons: new fields.SchemaField({
        primary: new fields.SchemaField({
          name: new fields.StringField({ initial: "" }),
          type: new fields.StringField({
            initial: "melee",
            choices: ["melee", "close", "middle", "wide"],
          }),
          accuracy: new fields.NumberField({ initial: 0 }),
          damageDieCount: new fields.NumberField({ initial: 1 }),
          damageDie: new fields.NumberField({ initial: 0 }),
          damageBonus: new fields.NumberField({ initial: 0 }),
          damageType: new fields.StringField({ initial: "" }),
          properties: new fields.StringField({ initial: "" }),
        }),

        secondary: new fields.SchemaField({
          name: new fields.StringField({ initial: "" }),
          type: new fields.StringField({
            initial: "melee",
            choices: ["melee", "close", "middle", "wide"],
          }),
          accuracy: new fields.NumberField({ initial: 0 }),
          damageDieCount: new fields.NumberField({ initial: 1 }),
          damageDie: new fields.NumberField({ initial: 0 }),
          damageBonus: new fields.NumberField({ initial: 0 }),
          damageType: new fields.StringField({ initial: "" }),
          properties: new fields.StringField({ initial: "" }),
        }),
      }),

      armor: new fields.SchemaField({
        totalValue: new fields.NumberField({ initial: 0 }),
        penaltyAccuracyTotal: new fields.NumberField({ initial: 0 }),
        penaltyMovementTotal: new fields.NumberField({ initial: 0 }),

        helmet: new fields.SchemaField({
          name: new fields.StringField({ initial: "" }),
          malus: new fields.NumberField({ initial: 0 }),
          value: new fields.NumberField({ initial: 0 }),
          properties: new fields.StringField({ initial: "" }),
        }),

        vest: new fields.SchemaField({
          name: new fields.StringField({ initial: "" }),
          malus: new fields.NumberField({ initial: 0 }),
          value: new fields.NumberField({ initial: 0 }),
          properties: new fields.StringField({ initial: "" }),
        }),

        bracers: new fields.SchemaField({
          name: new fields.StringField({ initial: "" }),
          malus: new fields.NumberField({ initial: 0 }),
          value: new fields.NumberField({ initial: 0 }),
          properties: new fields.StringField({ initial: "" }),
        }),

        pants: new fields.SchemaField({
          name: new fields.StringField({ initial: "" }),
          malus: new fields.NumberField({ initial: 0 }),
          value: new fields.NumberField({ initial: 0 }),
          properties: new fields.StringField({ initial: "" }),
        }),
      }),
      abilities: new fields.SchemaField({
        ability1: new fields.SchemaField({
          lvl1_1: new fields.BooleanField({ initial: false }),
          lvl1_2: new fields.BooleanField({ initial: false }),
          abilityProperties: new fields.StringField({ initial: "" }),
        }),
        ability2: new fields.SchemaField({
          lvl2_1: new fields.BooleanField({ initial: false }),
          lvl2_2: new fields.BooleanField({ initial: false }),
          abilityProperties: new fields.StringField({ initial: "" }),
        }),
        ability3: new fields.SchemaField({
          lvl3_1: new fields.BooleanField({ initial: false }),
          lvl3_2: new fields.BooleanField({ initial: false }),
          abilityProperties: new fields.StringField({ initial: "" }),
        }),
      }),
      resistances: new fields.SchemaField({
        electricity: new fields.SchemaField({
          weak: new fields.BooleanField({ initial: false }),
          resist: new fields.BooleanField({ initial: false }),
          immune: new fields.BooleanField({ initial: false }),
        }),
        fire: new fields.SchemaField({
          weak: new fields.BooleanField({ initial: false }),
          resist: new fields.BooleanField({ initial: false }),
          immune: new fields.BooleanField({ initial: false }),
        }),
        frost: new fields.SchemaField({
          weak: new fields.BooleanField({ initial: false }),
          resist: new fields.BooleanField({ initial: false }),
          immune: new fields.BooleanField({ initial: false }),
        }),
        acid: new fields.SchemaField({
          weak: new fields.BooleanField({ initial: false }),
          resist: new fields.BooleanField({ initial: false }),
          immune: new fields.BooleanField({ initial: false }),
        }),
      }),
      status: new fields.SchemaField({
        blinded: new fields.SchemaField({
          immune: new fields.BooleanField({ initial: false }),
          applied: new fields.BooleanField({ initial: false }),
        }),
        bleeding: new fields.SchemaField({
          immune: new fields.BooleanField({ initial: false }),
          applied: new fields.BooleanField({ initial: false }),
        }),
        poisoned: new fields.SchemaField({
          immune: new fields.BooleanField({ initial: false }),
          applied: new fields.BooleanField({ initial: false }),
        }),
        radiated: new fields.SchemaField({
          immune: new fields.BooleanField({ initial: false }),
          applied: new fields.BooleanField({ initial: false }),
        }),
        chilled: new fields.SchemaField({
          immune: new fields.BooleanField({ initial: false }),
          applied: new fields.BooleanField({ initial: false }),
        }),
        burning: new fields.SchemaField({
          immune: new fields.BooleanField({ initial: false }),
          applied: new fields.BooleanField({ initial: false }),
        }),
        stunned: new fields.SchemaField({
          immune: new fields.BooleanField({ initial: false }),
          applied: new fields.BooleanField({ initial: false }),
        }),
        shocked: new fields.SchemaField({
          immune: new fields.BooleanField({ initial: false }),
          applied: new fields.BooleanField({ initial: false }),
        }),
      }),
    };
  }
}

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
        tech: new fields.NumberField({ initial: 0, integer: true }), // Engineering, repair, tinkering
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
    };
  }
}

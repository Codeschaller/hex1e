import { ActorDataModel } from "./actor-data.js";

export class HeroDataModel extends ActorDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    // 1) Get the base actor schema
    const base = super.defineSchema();

    // 2) Add hero-specific fields
    const hero = {
      playerName: new fields.StringField({ initial: "", nullable: true }),
      characterName: new fields.StringField({ initial: "", nullable: true }),

      level: new fields.NumberField({
        initial: 1,
        integer: true,
        min: 1,
      }),

      notes: new fields.StringField({ initial: "", nullable: true }),

      levels: new fields.SchemaField({
        l1: new fields.BooleanField({ initial: false }),
        l1_1: new fields.BooleanField({ initial: false }),

        l2: new fields.BooleanField({ initial: false }),
        l2_1: new fields.BooleanField({ initial: false }),
        l2_2: new fields.BooleanField({ initial: false }),

        l3: new fields.BooleanField({ initial: false }),
        l3_1: new fields.BooleanField({ initial: false }),
        l3_2: new fields.BooleanField({ initial: false }),
        l3_3: new fields.BooleanField({ initial: false }),

        l4: new fields.BooleanField({ initial: false }),
        l4_1: new fields.BooleanField({ initial: false }),
        l4_2: new fields.BooleanField({ initial: false }),
        l4_3: new fields.BooleanField({ initial: false }),
        l4_4: new fields.BooleanField({ initial: false }),

        l5: new fields.BooleanField({ initial: false }),
        l5_1: new fields.BooleanField({ initial: false }),
        l5_2: new fields.BooleanField({ initial: false }),
        l5_3: new fields.BooleanField({ initial: false }),
        l5_4: new fields.BooleanField({ initial: false }),
        l5_5: new fields.BooleanField({ initial: false }),
      }),
      wealth: new fields.SchemaField({
        infinitis: new fields.StringField({ initial: "" }),
      }),
      scrap: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0, min: 0 }),
        bonus: new fields.NumberField({ initial: 0, min: 0 }),
      }),
      inventory: new fields.SchemaField({
        one: new fields.StringField({ initial: "" }),
        two: new fields.StringField({ initial: "" }),
        three: new fields.StringField({ initial: "" }),
        four: new fields.StringField({ initial: "" }),
        five: new fields.StringField({ initial: "" }),
        six: new fields.StringField({ initial: "" }),
        seven: new fields.StringField({ initial: "" }),
        eight: new fields.StringField({ initial: "" }),
      }),
      inventoryNote: new fields.StringField({ initial: "", nullable: true }),
    };

    // 3) Merge base + hero
    return foundry.utils.mergeObject(base, hero);
  }
}

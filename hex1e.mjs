import { HeroDataModel } from "./module/data-models/hero-data.js";
import { HeroSheet } from "./module/documents/hero-sheet.js";

Hooks.once("init", () => {
  // register data model
  CONFIG.Actor.dataModels.hero = HeroDataModel;
  CONFIG.Actor.dataModels.enemy = HeroDataModel;

  // register sheet
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("hex1e", HeroSheet, {
    types: ["hero"],
    makeDefault: true,
  });
  Actors.registerSheet("hex1e", ActorSheet, {
    types: ["enemy"],
  });
});

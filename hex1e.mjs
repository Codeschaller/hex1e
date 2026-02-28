import { HeroDataModel } from "./module/data-models/hero-data.js";
import { HeroSheet } from "./module/documents/hero-sheet.js";
import {
  COMPETENCY_ROLL_MACRO,
  ATTACK_ROLL_MACRO,
  DAMAGE_ROLL_MACRO,
  DOGE_ROLL_MACRO,
} from "./module/helpers/macros/hotbar-macros.js";

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

// ======================================================
//  VERSIONING HELPER - Macro creation and updates
// ======================================================

Hooks.once("ready", async function () {
  // =====================================
  // COMPETENCY ROLL MACRO (Hotbar Slot 0)
  // =====================================
  const COMPETENCY_MACRO_NAME = "Competency Roll";
  const COMPETENCY_ICON = "systems/hex1e/assets/icons/icoSkill.svg";

  let competencyMacro = game.macros.getName(COMPETENCY_MACRO_NAME);
  if (!competencyMacro) {
    competencyMacro = await Macro.create({
      name: COMPETENCY_MACRO_NAME,
      type: "script",
      img: COMPETENCY_ICON,
      scope: "global",
      command: COMPETENCY_ROLL_MACRO,
    });
    // Set permissions when the macro is created
    await competencyMacro.update({
      ownership: {
        default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER,
      },
    });
  }

  await game.user.assignHotbarMacro(competencyMacro, 1);

  // =====================================
  // ATTACK ROLL MACRO (Hotbar Slot 2)
  // =====================================
  const ATTACK_MACRO_NAME = "Attack Roll";
  const ATTACK_ICON = "systems/hex1e/assets/icons/icoAttack.svg";

  let attackMacro = game.macros.getName(ATTACK_MACRO_NAME);
  if (!attackMacro) {
    attackMacro = await Macro.create({
      name: ATTACK_MACRO_NAME,
      type: "script",
      img: ATTACK_ICON,
      scope: "global",
      command: ATTACK_ROLL_MACRO,
    }); // Set permissions when the macro is created
    await attackMacro.update({
      ownership: {
        default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER,
      },
    });
  }

  await game.user.assignHotbarMacro(attackMacro, 2);

  // =====================================
  // DAMAGE ROLL MACRO (Hotbar Slot 3)
  // =====================================
  const DAMAGE_MACRO_NAME = "Damage Roll";
  const DAMAGE_ICON = "systems/hex1e/assets/icons/icoDamage.svg";

  let damageMacro = game.macros.getName(DAMAGE_MACRO_NAME);
  if (!damageMacro) {
    damageMacro = await Macro.create({
      name: DAMAGE_MACRO_NAME,
      type: "script",
      img: DAMAGE_ICON,
      scope: "global",
      command: DAMAGE_ROLL_MACRO,
    });

    // Set permissions when the macro is created
    await damageMacro.update({
      ownership: {
        default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER,
      },
    });
  }

  // Assign to the current user’s hotbar slot 3
  await game.user.assignHotbarMacro(damageMacro, 3);

  // =====================================
  // DAMAGE ROLL MACRO (Hotbar Slot 3)
  // =====================================
  const DOGE_MACRO_NAME = "Dodge Roll";
  const DOGE_ICON = "systems/hex1e/assets/icons/icoDodge.svg";

  let dodgeMacro = game.macros.getName(DOGE_MACRO_NAME);
  if (!dodgeMacro) {
    dodgeMacro = await Macro.create({
      name: DOGE_MACRO_NAME,
      type: "script",
      img: DOGE_ICON,
      scope: "global",
      command: DOGE_ROLL_MACRO,
    });

    // Set permissions when the macro is created
    await dodgeMacro.update({
      ownership: {
        default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER,
      },
    });
  }

  // Assign to the current user’s hotbar slot 3
  await game.user.assignHotbarMacro(dodgeMacro, 4);
});

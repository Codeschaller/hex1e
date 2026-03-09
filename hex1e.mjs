import { HeroDataModel } from "./module/data-models/hero-data.js";
import { HeroSheet } from "./module/documents/hero-sheet.js";
import {
  SKILL_ROLL_MACRO,
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
  // register Handlebars helpers for skill value calculation
  Handlebars.registerHelper("skillValue", function (base, checked) {
    return checked ? Number(base) + 5 : Number(base);
  });
  // register Handlebars helper for max value calculation (Melee Attack)
  Handlebars.registerHelper("meleeValue", function (body, agility, checked) {
    const base = Math.max(Number(body), Number(agility));
    return checked ? base + 5 : base;
  });
  // register Handlebars helper for Competency div 20 for US,WH,R,M
  Handlebars.registerHelper("divideRoundHalfUp", function (value, divisor) {
    value = Number(value) || 0;
    divisor = Number(divisor) || 1;

    const raw = value / divisor;

    // Step 1: round to nearest 0.5
    let rounded = Math.round(raw * 2) / 2;

    // Step 2: if rounded ends in .5, decide up or down
    if (rounded % 1 === 0.5) {
      const lower = Math.floor(rounded);
      const upper = Math.ceil(rounded);

      // If raw is closer to lower → use lower
      // If raw is closer to upper → use upper
      if (raw - lower < upper - raw) {
        rounded = lower;
      } else {
        rounded = upper;
      }
    }

    return rounded;
  });
  // register Handlebars helper for half rounding (Health)
  Handlebars.registerHelper("halfRound", function (value) {
    value = Number(value) || 0;
    return Math.round(value / 2);
  });
});

// ======================================================
//  VERSIONING HELPER - Macro creation and updates
// ======================================================

Hooks.once("ready", async function () {
  // =====================================
  // COMPETENCY ROLL MACRO (Hotbar Slot 0)
  // =====================================
  const SKILL_MACRO_NAME = "Skill Roll";
  const SKILL_ICON = "systems/hex1e/assets/icons/icoSkill.svg";

  let skillMacro = game.macros.getName(SKILL_MACRO_NAME);
  if (!skillMacro) {
    skillMacro = await Macro.create({
      name: SKILL_MACRO_NAME,
      type: "script",
      img: SKILL_ICON,
      scope: "global",
      command: SKILL_ROLL_MACRO,
    });
    // Set permissions when the macro is created
    await skillMacro.update({
      ownership: {
        default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER,
      },
    });
  }

  //==================================
  // ACTOR SETTINGS
  //==================================

  Hooks.on("preCreateActor", (actor, data) => {
    if (data.type === "hero") {
      data.prototypeToken = data.prototypeToken || {};
      data.prototypeToken.actorLink = true;
    }
  });

  //==================================
  // HOTBAR ASSIGNMENT
  //==================================

  await game.user.assignHotbarMacro(skillMacro, 1);

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

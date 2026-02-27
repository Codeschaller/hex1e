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

/**
 * HEXADOOR 1E — Forced Hotbar Macro Registration
 * Hotbar Slot 1 will ALWAYS contain the Competency Roll macro.
 */

Hooks.once("ready", async function () {
  const MACRO_NAME = "Competency Roll";
  const ICON_PATH = "systems/hex1e/assets/icons/icoSkill.svg";

  // Ensure macro exists
  let macro = game.macros.getName(MACRO_NAME);
  if (!macro) {
    macro = await Macro.create({
      name: MACRO_NAME,
      type: "script",
      img: ICON_PATH,
      scope: "global",
      command: COMPETENCY_ROLL_MACRO,
    });
  }

  // Force assign to hotbar slot 1
  const user = game.user;
  await user.assignHotbarMacro(macro, 1);
});

/**
 * Macro code injected into the Macro entity.
 */
const COMPETENCY_ROLL_MACRO = `
  // Select icon
  game.macros.getName("Competency Roll")?.update({
    img: "systems/hex1e/assets/icons/icoSkill.svg"
  });

  // Ensure a token is selected
  const token = canvas.tokens.controlled[0];
  if (!token) return ui.notifications.warn("Select a token first.");
  const actor = token.actor;

  // Pull skills dynamically
  const skills = actor.system.skills;

  // Build list of rollable options
  const options = Object.entries(skills).map(([key, data]) => {
    return {
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: data.value
    };
  });

  // Build dialog HTML
  let content = \`
  <p>Select a competency to roll:</p>
  <select id="competency-select">\`;

  for (const opt of options) {
    content += \`<option value="\${opt.key}">\${opt.label}</option>\`;
  }

  content += \`</select>
  <p>Modifier (add or subtract):</p>
  <input type="number" id="competency-mod" value="0" />
  \`;

  // Show dialog
  new Dialog({
    title: "HEXADOOR Competency Roll",
    content,
    buttons: {
      roll: {
        label: "Roll",
        callback: async (html) => {
          const key = html.find("#competency-select").val();
          const mod = Number(html.find("#competency-mod").val()) || 0;

          const base = skills[key].value;
          const skill = base + mod;

          // Roll d100
          const roll = await new Roll("1d100").roll({async: true});
          const result = roll.total;

          // Determine success level
          let outcome = "";
          if (result <= 5) outcome = "🔥 <b>Critical Success</b>";
          else if (result <= skill / 5) outcome = "💥 <b>Extreme Success</b>";
          else if (result <= skill / 2) outcome = "✨ <b>Strong Success</b>";
          else if (result <= skill) outcome = "✔️ <b>Success</b>";
          else if (result > 95) outcome = "💀 <b>Critical Failure</b>";
          else outcome = "❌ <b>Failure</b>";

          const label = key.charAt(0).toUpperCase() + key.slice(1);

          // Send to chat
          roll.toMessage({
            speaker: ChatMessage.getSpeaker({ token }),
            flavor: \`
              <h2>\${label} Roll</h2>
              <p><strong>Base Value:</strong> \${base}</p>
              <p><strong>Modifier:</strong> \${mod >= 0 ? "+" + mod : mod}</p>
              <p><strong>Final Skill:</strong> \${skill}</p>
              <hr>
              <p><strong>Result:</strong> \${result}</p>
              <p>\${outcome}</p>
            \`
          });
        }
      }
    }
  }).render(true);
`;

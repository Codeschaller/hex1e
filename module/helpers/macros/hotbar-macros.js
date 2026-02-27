/**
 * Macro code injected into the Macro entity.
 */
export const COMPETENCY_ROLL_MACRO = `
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

export const ATTACK_ROLL_MACRO = `
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
  }).render(true);`;

export const DAMAGE_ROLL_MACRO = `
// ===========================================
// HEXADOOR 1E – DAMAGE ROLLER (SYSTEM.WEAPONS)
// ===========================================

// Select icon
game.macros.getName("Damage Roll")?.update({
  img: "systems/hex1e/assets/icons/icoDamage.svg"
});

const actor = canvas.tokens.controlled[0]?.actor;
if (!actor) return ui.notifications.warn("Select a token first.");

const primary = actor.system.weapons?.primary;
const secondary = actor.system.weapons?.secondary;

const dropdownHTML = \`
  <h3>Choose Weapon</h3>
  <select id="weaponChoice">
    <option value="primary">
      Primary: \${primary?.name || "None"}
      (\${primary?.damageDieCount ?? 1}D\${primary?.damageDie || 6} + \${primary?.damageBonus ?? 0})
    </option>

    <option value="secondary">
      Secondary: \${secondary?.name || "None"}
      (\${secondary?.damageDieCount ?? 1}D\${secondary?.damageDie || 6} + \${secondary?.damageBonus ?? 0})
    </option>

    <option value="unarmed">
      Unarmed Strike (US: \${actor.system.skills?.strength?.us?.value ?? 0})
    </option>
  </select>
\`;

const dialogContent = \`
  <div style="display:flex; flex-direction:column; gap:12px;">
    \${dropdownHTML}

    <label><strong>Enemy Armor Value</strong></label>
    <input id="enemyArmor" type="number" value="0" />
  </div>
\`;

new Dialog({
  title: "HEXADOOR 1E – Damage Roll",
  content: dialogContent,
  buttons: {
    roll: {
      label: "Roll Damage",
      callback: async (html) => {

        const choice = html.find("#weaponChoice").val();
        const enemyArmor = Number(html.find("#enemyArmor").val()) || 0;

        const weapon = choice === "primary" ? primary : secondary;

        // ===============================
        // UNARMED STRIKE DAMAGE
        // ===============================
        if (choice === "unarmed") {

          const us = actor.system.skills?.strength?.us?.value ?? 0;
          const finalDamage = us - enemyArmor;

          const roll = await new Roll(\`\${finalDamage}\`).roll({ async: true });

          roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor }),
            flavor: \`
              <h2>Unarmed Strike – Damage</h2>
              <p><strong>Base Damage (US):</strong> \${us}</p>
              <p><strong>Enemy Armor:</strong> -\${enemyArmor}</p>
              <hr>
              <p><strong>Final Damage:</strong> \${finalDamage}</p>
            \`
          });

          return;
        }

        if (!weapon || !weapon.name) {
          return ui.notifications.warn(\`No \${choice} weapon equipped.\`);
        }

        const diceCount = weapon.damageDieCount ?? 1;
        const dieType = \`d\${weapon.damageDie || 6}\`;
        const bonus = weapon.damageBonus ?? 0;

        if (diceCount <= 0) {
          return ui.notifications.warn(\`\${weapon.name} has no damage dice set.\`);
        }

        const formula = \`\${diceCount}\${dieType} + \${bonus} - \${enemyArmor}\`;
        const roll = await new Roll(formula).roll({ async: true });

        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor }),
          flavor: \`
            <h2>\${weapon.name} – Damage Roll</h2>
            <p><strong>Dice:</strong> \${diceCount}\${dieType}</p>
            <p><strong>Bonus:</strong> +\${bonus}</p>
            <p><strong>Enemy Armor:</strong> -\${enemyArmor}</p>
            <p><strong>Type:</strong> \${weapon.type}</p>
            <p><strong>Properties:</strong> \${weapon.properties || "None"}</p>
          \`
        });
      }
    },
    cancel: { label: "Cancel" }
  }
}).render(true);
`;

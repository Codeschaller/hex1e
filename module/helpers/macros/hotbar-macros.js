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

export const ATTACK_ROLL_MACRO = `// ===============================
// ATTACK ROLL MACRO
// HEXADOOR 1E (Foundry v13)
// ===============================

// Select icon
game.macros.getName("Attack Roll")?.update({
  img: "systems/hex1e/assets/icons/icoAttack.svg"
});

// Ensure a token is selected
const token = canvas.tokens.controlled[0];
if (!token) return ui.notifications.warn("Select a token first.");
const actor = token.actor;

// Pull actor data
const melee = actor.system.skills?.melee?.value ?? 0;
const ranged = actor.system.skills?.ranged?.value ?? 0;

const penaltyAcc = actor.system.armor?.penaltyAccuracyTotal ?? 0;
const bodyAcc = actor.system.body?.bodyMali?.accuracy ?? 0;

// Weapons
const primary = actor.system.weapons?.primary;
const secondary = actor.system.weapons?.secondary;

// Build dialog
let content = \`

<h2>Attack</h2>

<h3>Base Values</h3>
<p>Melee Skill: <b>\${melee}</b></p>
<p>Ranged Skill: <b>\${ranged}</b></p>
<p>Armor Penalty: <b>\${penaltyAcc}</b></p>
<p>Body Mali: <b>\${bodyAcc}</b></p>

<h3>Choose Weapon</h3>
<select id="weaponChoice">

  <option value="primary">
    Primary: \${primary?.name || "None"}
    (Type: \${primary?.type || "?"}, Acc: \${primary?.accuracy ?? 0},
     \${primary?.damageDieCount ?? 1}D\${primary?.damageDie || 6} + \${primary?.damageBonus ?? 0})
  </option>

  <option value="secondary">
    Secondary: \${secondary?.name || "None"}
    (Type: \${secondary?.type || "?"}, Acc: \${secondary?.accuracy ?? 0},
     \${secondary?.damageDieCount ?? 1}D\${secondary?.damageDie || 6} + \${secondary?.damageBonus ?? 0})
  </option>

  <option value="unarmed">
    Unarmed Strike
    (Type: melee, Acc: 0,
     1D6 + \${actor.system.skills?.strength?.us?.value ?? 0})
  </option>

</select>

<p><strong>Range Types:</strong></p>
<ul>
  <li>melee → 0 m</li>
  <li>close → 5–10 m</li>
  <li>middle → 10–25 m</li>
  <li>wide → 25–35 m</li>
  <li>edge → 35–60 m</li>
</ul>

<h3>Situational Modifiers</h3>

<p>Cover Modifier:</p>
<select id="cover">
  <option value="0">No Cover (0)</option>
  <option value="10">Half Cover (-10)</option>
  <option value="25">Full Cover (-25)</option>
</select>

<p>Bodyzone Modifier:</p>
<select id="bodyzone">
  <option value="0">Body (0)</option>
  <option value="25">Head (-25)</option>
  <option value="10">Right Arm (-10)</option>
  <option value="10">Left Arm (-10)</option>
  <option value="10">Right Leg (-10)</option>
  <option value="10">Left Leg (-10)</option>
</select>

<p>Additional Modifier:</p>
<input type="number" id="modifier" value="0" />

\`;

new Dialog({
  title: "HEXADOOR Attack",
  content,
  buttons: {
    roll: {
      label: "Roll",
      callback: async (html) => {

        const choice = html.find("#weaponChoice").val();
        const cover = Number(html.find("#cover").val());
        const bodyzone = Number(html.find("#bodyzone").val());
        const modifier = Number(html.find("#modifier").val());

        // ===============================
        // UNARMED STRIKE (always melee)
        // ===============================
        if (choice === "unarmed") {

          const target =
            (melee - penaltyAcc - bodyAcc) +
            0 -
            cover -
            bodyzone +
            modifier;

          const roll = await new Roll("1d100").roll({ async: true });
          const result = roll.total;

          let outcome = "";
          if (result <= 5) outcome = "🔥 <b>Critical Success</b>";
          else if (result <= target / 5) outcome = "💥 <b>Extreme Success</b>";
          else if (result <= target / 2) outcome = "✨ <b>Strong Success</b>";
          else if (result <= target) outcome = "✔️ <b>Success</b>";
          else if (result >= 95) outcome = "💀 <b>Critical Failure</b>";
          else outcome = "❌ <b>Failure</b>";

          roll.toMessage({
            speaker: ChatMessage.getSpeaker({ token }),
            flavor: \`
              <h2>Unarmed Attack Roll</h2>

              <p><strong>Weapon:</strong> Unarmed</p>
              <p><strong>Combat Type:</strong> Melee Combat</p>
              <p><strong>Range:</strong> 0 Meter</p>

              <p><strong>Melee Skill:</strong> \${melee}</p>
              <p><strong>Armor Penalty:</strong> -\${penaltyAcc}</p>
              <p><strong>Body Mali:</strong> -\${bodyAcc}</p>
              <p><strong>Weapon Accuracy:</strong> +0</p>
              <p><strong>Cover:</strong> -\${cover}</p>
              <p><strong>Bodyzone:</strong> -\${bodyzone}</p>
              <p><strong>Modifier:</strong> \${modifier >= 0 ? "+" + modifier : modifier}</p>

              <hr>

              <p><strong>Final Target:</strong> \${target}</p>
              <p><strong>Roll:</strong> \${result}</p>

              <p>\${outcome}</p>

              <hr>
              <h3>Calculation</h3>
              <p>(Melee \${melee} - Armor \${penaltyAcc} - Body \${bodyAcc}) + Accuracy 0 - Cover \${cover} - Bodyzone \${bodyzone} + Modifier \${modifier}</p>

              <p><strong>Melee Skill:</strong> \${melee}</p>
              <p><strong>Ranged Skill:</strong> \${ranged}</p>
            \`
          });

          return;
        }

        // ===============================
        // WEAPON ATTACK
        // ===============================
        const weapon = choice === "primary" ? primary : secondary;

        if (!weapon) {
          return ui.notifications.warn(\`No \${choice} weapon equipped.\`);
        }

        const weaponAcc = weapon.accuracy ?? 0;

        // Range by type
        let range = "—";
        switch (weapon.type) {
          case "melee":  range = "0 Meter"; break;
          case "close":  range = "5–10 Meter"; break;
          case "middle": range = "10–25 Meter"; break;
          case "wide":   range = "25–35 Meter"; break;
          case "edge":   range = "35–60 Meter"; break;
        }

        // Determine combat type
        let combatSkill = melee;
        if (weapon.type === "melee") {
          combatSkill = melee;
        } else if (["close", "middle", "wide", "edge"].includes(weapon.type)) {
          combatSkill = ranged;
        }

        // Final target
        const target =
          (combatSkill - penaltyAcc - bodyAcc) +
          weaponAcc -
          cover -
          bodyzone +
          modifier;

        const roll = await new Roll("1d100").roll({ async: true });
        const result = roll.total;

        let outcome = "";
        if (result <= 5) outcome = "🔥 <b>Critical Success</b>";
        else if (result <= target / 5) outcome = "💥 <b>Extreme Success</b>";
        else if (result <= target / 2) outcome = "✨ <b>Strong Success</b>";
        else if (result <= target) outcome = "✔️ <b>Success</b>";
        else if (result >= 95) outcome = "💀 <b>Critical Failure</b>";
        else outcome = "❌ <b>Failure</b>";

        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ token }),
          flavor: \`
            <h2>Attack Roll</h2>

            <p><strong>Weapon:</strong> \${weapon.name}</p>
            <p><strong>Weapon Type:</strong> \${weapon.type}</p>
            <p><strong>Combat Type:</strong> \${combatSkill === melee ? "Melee Combat" : "Ranged Combat"}</p>
            <p><strong>Range:</strong> \${range}</p>

            <p><strong>Melee Skill:</strong> \${melee}</p>
            <p><strong>Ranged Skill:</strong> \${ranged}</p>
            <p><strong>Skill Used:</strong> \${combatSkill}</p>
            <p><strong>Armor Penalty:</strong> -\${penaltyAcc}</p>
            <p><strong>Body Mali:</strong> -\${bodyAcc}</p>
            <p><strong>Weapon Accuracy:</strong> +\${weaponAcc}</p>
            <p><strong>Cover:</strong> -\${cover}</p>
            <p><strong>Bodyzone:</strong> -\${bodyzone}</p>
            <p><strong>Modifier:</strong> \${modifier >= 0 ? "+" + modifier : modifier}</p>

            <hr>

            <p><strong>Final Target:</strong> \${target}</p>
            <p><strong>Roll:</strong> \${result}</p>

            <p>\${outcome}</p>

            <hr>
            <h3>Calculation</h3>
            <p>(\${combatSkill === melee ? "Melee" : "Ranged"} \${combatSkill} - Armor \${penaltyAcc} - Body \${bodyAcc}) + Accuracy \${weaponAcc} - Cover \${cover} - Bodyzone \${bodyzone} + Modifier \${modifier}</p>
          \`
        });
      }
    },
    cancel: { label: "Cancel" }
  }
}).render(true);
`;

export const DOGE_ROLL_MACRO = `

// ===========================================
// HEXADOOR 1E – DODGE ROLL
// ===========================================

// Update macro icon
game.macros.getName("Dodge Roll")?.update({
  img: "systems/hex1e/assets/icons/icoDoge.svg"
});

// Actor selection
const actor = canvas.tokens.controlled[0]?.actor;
if (!actor) return ui.notifications.warn("Select a token first.");

// Pull values
const dodge = actor.system.skills?.dodge?.value ?? 0;
const bodyMali = actor.system.body?.bodyMali?.dodge ?? 0;

// Cover options
const coverOptions = {
  0: "No Cover (0)",
  25: "Half Cover (+25)",
  50: "Full Cover (+50)"
};

// Build dialog
new Dialog({
  title: "Dodge Roll",
  content: \`
    <div style="margin-bottom: 10px;">
      <strong>Dodge:</strong> \${dodge}<br>
      <strong>Body Malus:</strong> \${bodyMali}
    </div>

    <div class="form-group">
      <label>Cover Type:</label>
      <select id="cover-select">
        \${Object.entries(coverOptions)
          .map(([value, label]) => \`<option value="\${value}">\${label}</option>\`)
          .join("")}
      </select>
    </div>
  \`,
  buttons: {
    roll: {
      label: "Roll Dodge",
      callback: html => {

        const cover = Number(html.find("#cover-select").val());
        const target = dodge - bodyMali + cover;

        const roll = new Roll("1d100").roll({ async: false });
        const result = roll.total;

        let outcome = "";
        if (result <= 5) outcome = "🔥 <b>Critical Success</b>";
        else if (result <= target / 5) outcome = "💥 <b>Extreme Success</b>";
        else if (result <= target / 2) outcome = "✨ <b>Strong Success</b>";
        else if (result <= target) outcome = "✔️ <b>Success</b>";
        else if (result >= 95) outcome = "💀 <b>Critical Failure</b>";
        else outcome = "❌ <b>Failure</b>";

        const msg = \`
          <h2>Dodge Roll</h2>
          <p><b>Target:</b> \${target}</p>
          <p><b>Result:</b> \${result}</p>
          <p>\${outcome}</p>
        \`;

        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor }),
          content: msg
        });
      }
    }
  },
  default: "roll"
}).render(true);

`;

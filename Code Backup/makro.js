// ===============================
//   ATTACK ROLL MACRO
//   HEXADOOR 1E (Foundry v13)
//   img: C:\Users\chofs\AppData\Local\FoundryVTT\Data\systems\hex1e\assets\imgBackup\AttackRoll.png
// ===============================

const actor = canvas.tokens.controlled[0]?.actor;
if (!actor) return ui.notifications.warn("Select a token first.");

const melee = actor.system.skills?.melee?.value ?? 0;
const penaltyAcc = actor.system.armor?.penaltyAccuracyTotal ?? 0;
const bodyAcc = actor.system.body?.bodyMali?.accuracy ?? 0;

const primary = actor.system.weapons?.primary;
const secondary = actor.system.weapons?.secondary;

new Dialog({
  title: "Melee Attack Roll (D100)",
  content: `
    <div style="display:flex; flex-direction:column; gap:12px; font-size:14px;">
      <h3>Base Values</h3>
      <div>Melee Skill: <b>${melee}</b></div>
      <div>Armor Penalty (Accuracy): <b>${penaltyAcc}</b></div>
      <div>Body Mali (Accuracy): <b>${bodyAcc}</b></div>

      <h3>Choose Weapon</h3>
      <select id="weaponChoice">
        <option value="primary">
          Primary: ${primary?.name || "None"} (Acc: ${primary?.accuracy ?? 0})
        </option>
        <option value="secondary">
          Secondary: ${secondary?.name || "None"} (Acc: ${secondary?.accuracy ?? 0})
        </option>
      </select>

      <h3>Situational Modifiers</h3>
      <label>Cover Modifier:</label>
      <input type="number" id="cover" value="0"/>

      <label>Bodyzone Modifier:</label>
      <input type="number" id="bodyzone" value="0"/>

      <label>Additional Modifier:</label>
      <input type="number" id="modifier" value="0"/>
    </div>
  `,
  buttons: {
    roll: {
      label: "Roll",
      callback: async (html) => {
        const choice = html.find("#weaponChoice").val();
        const cover = Number(html.find("#cover").val());
        const bodyzone = Number(html.find("#bodyzone").val());
        const modifier = Number(html.find("#modifier").val());

        const weapon = choice === "primary" ? primary : secondary;
        const weaponAcc = weapon?.accuracy ?? 0;

        const target =
          melee -
          penaltyAcc -
          bodyAcc +
          weaponAcc -
          cover -
          bodyzone +
          modifier;

        // ✅ FIXED: Proper async roll
        const roll = await new Roll("1d100").roll();
        roll.toMessage(); // shows dice animation

        const value = roll.total;

        let result = "";
        if (value <= 5) result = "🔥 <b>CRITICAL SUCCESS</b>";
        else if (value <= target / 5) result = "💎 <b>EXTREME SUCCESS</b>";
        else if (value <= target / 2) result = "⚔️ <b>STRONG SUCCESS</b>";
        else if (value <= target) result = "✔️ <b>SUCCESS</b>";
        else if (value >= 95) result = "💀 <b>CRITICAL FAILURE</b>";
        else result = "❌ <b>FAILURE</b>";

        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor }),
          content: `
            <h2>Melee Attack Roll (D100)</h2>
            <p><b>Weapon:</b> ${weapon?.name || "None"}</p>
            <p><b>Roll:</b> ${value}</p>
            <p><b>Target:</b> ${target}</p>
            <p>${result}</p>
            <hr>
            <small>
              (Melee ${melee}) - (Armor Penalty ${penaltyAcc}) - (Body Mali ${bodyAcc})  
              + (Weapon Acc ${weaponAcc}) - (Cover ${cover}) - (Bodyzone ${bodyzone})  
              + (Modifier ${modifier})
            </small>
          `,
        });
      },
    },
  },
}).render(true);

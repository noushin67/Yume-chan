								const fs = require("fs");
const path = require("path");

module.exports = {
  name: "help",
  description: "📜 Shows all commands of the bot in one list",
  author: "Mahiru Chan 💫",

  execute(api, event) {
    const cmdPath = path.join(__dirname);
    const files = fs.readdirSync(cmdPath).filter(f => f.endsWith(".js"));

    let msg = "╭━━━🌸『 𝑴𝒂𝒉𝒊𝒓𝒖 𝑪𝒉𝒂𝒏 𝑩𝒐𝒕 』🌸━━━╮\n";
    msg += "┃ 💫 Prefix: +\n";
    msg += `┃ 💬 Total Commands: ${files.length}\n`;
    msg += "┃──────────────────────────\n";

    files.forEach((file, i) => {
      const name = file.replace(".js", "");
      msg += `┃ ${i + 1}. 💠 ${name}\n`;
    });

    msg += "┃──────────────────────────\n";
    msg += "┃ 💠 𝘿𝙚𝙫: 𝐖𝐚𝐭𝐚𝐬𝐡𝐢 𝐒𝐚𝐣𝐢𝐛 💫\n";
    msg += "┃ 💌 FB: 💋💦";
    msg += "╰━━━━━━━━━━━━━━━━━━━━━━╯\n";
    msg += "🎧 Sing • React • Feel • Heal 🌸";

    api.sendMessage(msg, event.threadID, event.messageID);
  }
};

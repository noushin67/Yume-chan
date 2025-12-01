const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "1.0",
    author: "Ariyan Ahamed",
    countDown: 3,
    role: 0,
    description: "Show bot owner info",
    category: "owner"
  },

  onStart: async function ({ message }) {
    const root = path.join(__dirname, "..", "..");
    const ownerPath = path.join(root, "owner.json");

    let owner = {
      name: "Ariyan Ahamed",
      uid: "100092562682881",
      facebook: "https://www.facebook.com/TheIvoryAesthetic?mibextid=rS40aB7S9Ucbxw6v",
      country: "Bangladesh"
    };

    try {
      if (fs.existsSync(ownerPath)) {
        const data = JSON.parse(fs.readFileSync(ownerPath, "utf8"));
        owner = { ...owner, ...data };
      }
    } catch (e) {
      console.error("owner.json read error:", e);
    }

    const text = `
👑 𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨

• Name   : ${owner.name}
• UID    : ${owner.uid}
• FB     : ${owner.facebook}
• Country: ${owner.country}

🧸 Bot: 𝐋𝐚𝐦𝐢𝐬𝐚 🧸🌸
    `.trim();

    return message.reply(text);
  }
};
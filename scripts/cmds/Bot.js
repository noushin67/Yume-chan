const fs = require("fs-extra");
const path = require("path");

const dataFile = path.join(__dirname, "../../data/botTalkReplies.json");

// Ensure data file exists
if (!fs.existsSync(dataFile)) fs.writeJSONSync(dataFile, [
  "😎 হুম, ঠিক আছে ম্মহ!",
  "😂 বেটা, কি অবস্থা?",
  "🥰 তুমি আবার কথা বলছ, মিষ্টি মেয়ে!",
  "🤔 হা, বুঝলাম বুঝলাম!",
  "😏 Watashi Sajib বলছে, মন দাও একটু।"
]);

module.exports = {
  config: {
    name: "bottalk",
    aliases: ["botchat", "bot"],
    version: "3.0",
    author: "Watashi Sajib 💫",
    countDown: 3,
    role: 0,
    description: "Bot replies randomly when someone talks & can learn new phrases",
    category: "fun"
  },

  onChat: async function ({ event, message }) {
    try {
      if (!event.body) return;

      const triggers = ["bot", "bottalk", "talk to bot", "hello bot"];
      const text = event.body.toLowerCase();
      if (!triggers.some(t => text.includes(t))) return;

      const replies = fs.readJSONSync(dataFile);

      // Teach new phrase
      if (text.startsWith("+bottalk teach ")) {
        const newPhrase = event.body.slice(16).trim();
        if (!newPhrase) return message.reply("⚠️ Please provide text to teach.");
        replies.push(newPhrase);
        fs.writeJSONSync(dataFile, replies, { spaces: 2 });
        return message.reply(`✅ New bot phrase learned: "${newPhrase}"`);
      }

      // Random reply
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      return message.reply(randomReply);
    } catch (err) {
      return message.reply(`⚠️ Unexpected error: ${err.message}`);
    }
  }
};

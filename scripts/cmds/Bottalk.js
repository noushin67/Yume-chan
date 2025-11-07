const fs = require("fs-extra");
const path = require("path");

const DATA_PATH = path.join(__dirname, "/cache/botTalkReplies.json");

module.exports = {
  config: {
    name: "bottalk",
    version: "5.0",
    author: "Watashi Sajib",
    countDown: 3,
    role: 0,
    description: "Bot gives random replies and can learn mood-based replies 💬",
    category: "fun",
  },

  onStart: async function ({ message, args }) {
    // Ensure data file exists
    if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, JSON.stringify({ bangla: {}, english: {} }));
    const data = JSON.parse(fs.readFileSync(DATA_PATH));

    // Teach system
    if (args[0]?.toLowerCase() === "teach") {
      const content = args.slice(1).join(" ");
      if (!content.includes("="))
        return message.reply(
          "✨ Use format:\n+bottalk teach <trigger> = <reply> |<mood>\nMood optional: happy, sad, love\n\nExample:\n+bottalk teach hello = Hi there! 😳 |happy"
        );

      const [left, moodPart] = content.split("|").map(e => e.trim());
      const [trigger, reply] = left.split("=").map(e => e.trim());
      const mood = moodPart || "normal";

      if (!trigger || !reply) return message.reply("⚠️ Provide both trigger and reply!");

      const isBangla = /[অ-ঔক-হ]/.test(trigger);
      const langKey = isBangla ? "bangla" : "english";

      data[langKey][trigger.toLowerCase()] = { reply, mood };
      fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

      return message.reply(`🍼 Learned successfully!\n💬 "${trigger}" ➜ "${reply}" [Mood: ${mood}]`);
    }

    // Info message
    return message.reply(
      "💖 Bot talk system active!\nSay something mentioning bot to get a random reply.\nTeach bot with mood:\n+bottalk teach <trigger> = <reply> |<mood>\nExample moods: happy, sad, love\n👑 Author: Watashi Sajib"
    );
  },

  onChat: async function ({ event, message }) {
    const text = event.body?.toLowerCase();
    if (!text) return;

    if (!text.includes("bot") && !text.includes("মাহিরু") && !text.includes("mahiru")) return;

    if (!fs.existsSync(DATA_PATH)) return;
    const data = JSON.parse(fs.readFileSync(DATA_PATH));

    const lang = /[অ-ঔক-হ]/.test(text) ? "bangla" : "english";

    // Check if learned trigger matches
    for (const key of Object.keys(data[lang])) {
      if (text.includes(key)) return message.reply(data[lang][key].reply);
    }

    // Default mood-based random replies
    const repliesEN = {
      happy: ["Yay! I'm so happy 😄", "Hehe, that's awesome! 😎"],
      sad: ["Aww, I'm sad too 😢", "Oh no… 😞"],
      love: ["UwU, I love you too 😳💖", "Love is in the air 💕"],
      normal: ["Hey! How are you? 😳", "Yes? I’m listening 💖", "Haha, tell me more 😆"]
    };

    const repliesBN = {
      happy: ["হাহা! আমি খুব খুশি 😄", "ওহ, দারুণ! 😎"],
      sad: ["আহ, আমি কষ্ট পাচ্ছি 😢", "ওহ না… 😞"],
      love: ["উউউ, আমি তোমাকে ভালোবাসি 💖", "ভালোবাসা ছড়িয়ে দিচ্ছি 💕"],
      normal: ["হে! কেমন আছিস? 😳", "হ্যাঁ? আমি শুনছি 💖", "হাহা, আরও বলো 😆"]
    };

    const chosenReplies = lang === "bangla" ? repliesBN : repliesEN;
    const moods = Object.keys(chosenReplies);
    const mood = moods[Math.floor(Math.random() * moods.length)];
    const reply = chosenReplies[mood][Math.floor(Math.random() * chosenReplies[mood].length)];

    return message.reply(reply);
  }
};

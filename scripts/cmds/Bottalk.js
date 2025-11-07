const fs = require("fs-extra");
const path = require("path");

const DATA_PATH = path.join(__dirname, "/cache/botTalkReplies.json");
const USER_MOOD_PATH = path.join(__dirname, "/cache/userMood.json");

module.exports = {
  config: {
    name: "bottalk",
    version: "7.0",
    author: "Watashi Sajib",
    countDown: 3,
    role: 0,
    description: "Messenger-ready bot: random + mood + teach + user personalization 💬",
    category: "fun",
  },

  onStart: async function ({ message, args }) {
    if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, JSON.stringify({ bangla: {}, english: {} }));
    if (!fs.existsSync(USER_MOOD_PATH)) fs.writeFileSync(USER_MOOD_PATH, JSON.stringify({}));

    const data = JSON.parse(fs.readFileSync(DATA_PATH));

    // Teach system
    if (args[0]?.toLowerCase() === "teach") {
      const content = args.slice(1).join(" ");
      if (!content.includes("=")) return message.reply(
        "✨ Use format:\n+bottalk teach <trigger> = <reply> |<mood>\nMood optional: happy, sad, love\nExample:\n+bottalk teach hello = Hi there! 😳 |happy"
      );

      const [left, moodPart] = content.split("|").map(e => e.trim());
      const [trigger, reply] = left.split("=").map(e => e.trim());
      const mood = moodPart || "normal";

      if (!trigger || !reply) return message.reply("⚠️ Trigger and reply required!");

      const isBangla = /[অ-ঔক-হ]/.test(trigger);
      const langKey = isBangla ? "bangla" : "english";

      data[langKey][trigger.toLowerCase()] = { reply, mood };
      fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

      return message.reply(`🍼 Learned successfully!\n"${trigger}" ➜ "${reply}" [Mood: ${mood}]`);
    }

    return message.reply(
      "💖 Bot talk system active!\nMention bot to get reply.\nTeach bot:\n+bottalk teach <trigger> = <reply> |<mood>\nMoods: happy, sad, love\n👑 Author: Watashi Sajib"
    );
  },

  onChat: async function ({ event, message }) {
    const text = event.body?.toLowerCase();
    if (!text) return;

    if (!text.includes("bot") && !text.includes("মাহিরু") && !text.includes("mahiru")) return;

    if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, JSON.stringify({ bangla: {}, english: {} }));
    if (!fs.existsSync(USER_MOOD_PATH)) fs.writeFileSync(USER_MOOD_PATH, JSON.stringify({}));

    const data = JSON.parse(fs.readFileSync(DATA_PATH));
    const userMood = JSON.parse(fs.readFileSync(USER_MOOD_PATH));

    const userID = event.senderID;
    const lang = /[অ-ঔক-হ]/.test(text) ? "bangla" : "english";

    // Check learned triggers
    for (const key of Object.keys(data[lang])) {
      if (text.includes(key)) {
        const mood = data[lang][key].mood || "normal";
        userMood[userID] = mood;
        fs.writeFileSync(USER_MOOD_PATH, JSON.stringify(userMood, null, 2));
        return message.reply(data[lang][key].reply);
      }
    }

    // Default mood-based replies based on user mood
    const userCurrentMood = userMood[userID] || "normal";

    const repliesEN = {
      happy: ["Yay! I'm happy 😄", "Hehe, that's awesome! 😎"],
      sad: ["Aww, I'm sad too 😢", "Oh no… 😞"],
      love: ["UwU, I love you 💖", "Love is in the air 💕"],
      normal: ["Hey! How are you? 😳", "Yes? I’m listening 💖", "Haha, tell me more 😆"]
    };

    const repliesBN = {
      happy: ["হাহা! আমি খুব খুশি 😄", "ওহ, দারুণ! 😎"],
      sad: ["আহ, আমি কষ্ট পাচ্ছি 😢", "ওহ না… 😞"],
      love: ["উউউ, আমি তোমাকে ভালোবাসি 💖", "ভালোবাসা ছড়িয়ে দিচ্ছি 💕"],
      normal: ["হে! কেমন আছিস? 😳", "হ্যাঁ? আমি শুনছি 💖", "হাহা, আরও বলো 😆"]
    };

    const chosenReplies = lang === "bangla" ? repliesBN : repliesEN;
    const replyArray = chosenReplies[userCurrentMood] || chosenReplies["normal"];
    const reply = replyArray[Math.floor(Math.random() * replyArray.length)];

    return message.reply(reply);
  }
};

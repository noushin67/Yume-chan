const fs = require("fs-extra");

const DATA_PATH = __dirname + "/cache/babyReplies.json";

module.exports = {
  config: {
    name: "baby",
    version: "5.0",
    author: "Watashi Sajib",
    countDown: 3,
    role: 0,
    description: "Cute baby auto-reply in Bangla + English with teach system 💕",
    category: "fun",
  },

  onStart: async function ({ message, args }) {
    // Ensure data file exists
    if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, JSON.stringify({ bangla: {}, english: {} }));
    const data = JSON.parse(fs.readFileSync(DATA_PATH));

    // Handle teach system
    if (args[0]?.toLowerCase() === "teach") {
      const content = args.slice(1).join(" ");
      if (!content.includes("="))
        return message.reply(
          "✨ ব্যবহার / Use format:\n+baby teach <question> = <answer>\n\nExample:\n+baby teach I love you = I love you too 💖"
        );

      const [question, answer] = content.split("=").map(e => e.trim());
      if (!question || !answer) return message.reply("⚠️ Please provide both question and answer!");

      // Detect language
      const isBangla = /[অ-ঔক-হ]/.test(question); // simple Bangla detection
      if (isBangla) data.bangla[question.toLowerCase()] = answer;
      else data.english[question.toLowerCase()] = answer;

      fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

      return message.reply(`🍼 Learned successfully!\n💬 "${question}" ➜ "${answer}"`);
    }

    // Info
    return message.reply(
      "💖 Baby system active!\nSay something like:\n🩷 'baby I love you' or 'বেবি আমি ভালোবাসি'\nOr teach new lines:\n+baby teach <question> = <answer>\n👑 Author: Watashi Sajib"
    );
  },

  onChat: async function ({ event, message }) {
    const text = event.body?.toLowerCase() || "";
    if (!text.includes("baby") && !text.includes("বেবি")) return;

    if (!fs.existsSync(DATA_PATH)) return;
    const data = JSON.parse(fs.readFileSync(DATA_PATH));

    // Check learned responses
    const lang = /[অ-ঔক-হ]/.test(text) ? "bangla" : "english";
    for (const key of Object.keys(data[lang])) {
      if (text.includes(key)) return message.reply(data[lang][key]);
    }

    // Default replies
    const repliesEN = [
      "Hehe yes baby? 💞",
      "Hmm tell me baby 🥰",
      "I’m here for you, my love 💋",
      "Yes baby~ what happened? 😳",
      "UwU I’m listening, my baby 💖"
    ];

    const repliesBN = [
      "হেহে হ্যাঁ বেবি? 💞",
      "হুম আমাকে বলো বেবি 🥰",
      "আমি এখানে আছি, আমার প্রিয় 💋",
      "হ্যাঁ বেবি~ কি হয়েছে? 😳",
      "উউউ, আমি শুনছি, আমার বেবি 💖"
    ];

    const reply = lang === "bangla" ? repliesBN[Math.floor(Math.random() * repliesBN.length)] : repliesEN[Math.floor(Math.random() * repliesEN.length)];

    return message.reply(reply);
  }
};

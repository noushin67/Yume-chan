const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "bottalk",
    author: "Ariyan Ahamed",
    version: "1.0",
    cooldown: 1,
    role: 0,
    shortDescription: "AI Girlfriend + Toxic + Anime + Learning Bot",
    longDescription: "Prefix ছাড়া কথা বললে bot auto রিপ্লাই দিবে",
  },

  // ---- Memory System ----
  memory: {},

  // ---- Default Mode ----
  mode: "gf", // gf | toxic | anime

  onStart: async function ({ api, event, args }) {
    const command = args[0];

    // Mode change
    if (command === "gf") {
      this.mode = "gf";
      return api.sendMessage("❤️ GF Mode Activated!", event.threadID);
    }
    if (command === "toxic") {
      this.mode = "toxic";
      return api.sendMessage("😈 Toxic Mode Activated!", event.threadID);
    }
    if (command === "anime") {
      this.mode = "anime";
      return api.sendMessage("✨ Anime Mode Activated!", event.threadID);
    }

    // Teach system
    if (command === "teach") {
      const key = args[1];
      const value = args.slice(2).join(" ");
      if (!key || !value)
        return api.sendMessage("Teach format:\nteach <word> <reply>", event.threadID);

      this.memory[key] = value;
      return api.sendMessage(`🧠 Learned: "${key}" = "${value}"`, event.threadID);
    }

    return api.sendMessage("BotTalk is running…", event.threadID);
  },

  // ---- Auto Reply System ----
  onChat: async function ({ api, event }) {
    let text = event.body.toLowerCase();

    // Learned reply
    if (this.memory[text]) {
      return api.sendMessage(this.memory[text], event.threadID);
    }

    // GF Mode
    if (this.mode === "gf") {
      const gfReplies = [
        "Aww pookie ki koros? 🥺💗",
        "Ami toh tor kotha chara kichu bujhi na… 😌",
        "Come here, cuddle chai 💖",
        "Tor voice sunte mon chai…"
      ];
      return api.sendMessage(gfReplies[Math.floor(Math.random()*gfReplies.length)], event.threadID);
    }

    // Toxic Mode
    if (this.mode === "toxic") {
      const toxicReplies = [
        "Chup thak bro 😹",
        "Tor matha e ki gondogol? 💀",
        "Bhai vibe mismatched 🧟",
        "Aiye na, roast khaiya ja 😭🔥"
      ];
      return api.sendMessage(toxicReplies[Math.floor(Math.random()*toxicReplies.length)], event.threadID);
    }

    // Anime Mode
    if (this.mode === "anime") {
      const animeReplies = [
        "Nani!? 😳💥",
        "Senpai… watashi wa waiting 😔",
        "Yare yare… omae baka ka? 😼",
        "Sugoiii~ you're cute tho 😘"
      ];
      return api.sendMessage(animeReplies[Math.floor(Math.random()*animeReplies.length)], event.threadID);
    }
  }
};

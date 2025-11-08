const fs = require("fs-extra");

module.exports = {
  config: {
    name: "prefix",
    aliases: ["setprefix"],
    version: "4.0",
    author: "Watashi Sajib 💫",
    countDown: 3,
    role: 0,
    shortDescription: "Show or change prefix safely",
    longDescription: "View the current bot prefix or change it (thread or global, with full error protection).",
    category: "config",
    guide: {
      en: "{pn} → show prefix\n{pn} <new prefix> → change thread prefix\n{pn} <new prefix> -g → change global prefix (admin only)"
    }
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    try {
      const globalPrefix = global.GoatBot.config.prefix;
      const threadPrefix = await threadsData.get(event.threadID, "data.prefix", globalPrefix);

      // Show current prefix
      if (!args[0]) {
        return message.reply(
          `🌸┏━━━━━━━━━━━━━━━┓🌸\n` +
          `💫 𝗣𝗥𝗘𝗙𝗜𝗫 𝗜𝗡𝗙𝗢 💫\n` +
          `🌸┗━━━━━━━━━━━━━━━┛🌸\n\n` +
          `💌 Global Prefix: ${globalPrefix}\n` +
          `🦋 Thread Prefix: ${threadPrefix}\n\n` +
          `✨ Type "${threadPrefix}prefix <new>" to change thread prefix\n` +
          `👑 Admins: "${threadPrefix}prefix <new> -g" for global change`
        );
      }

      const newPrefix = args[0];
      const isGlobal = args[1] === "-g";

      // Global prefix change (owner/admin only)
      if (isGlobal) {
        if (role < 2) return message.reply("❌ | Only admins can change the global prefix!");
        global.GoatBot.config.prefix = newPrefix;
        fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
        return message.reply(`✅ | Global prefix successfully changed to: ${newPrefix}`);
      }

      // Thread prefix change
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      return message.reply(`✅ | Thread prefix successfully changed to: ${newPrefix}`);
    } catch (error) {
      return message.reply(`⚠️ | Unexpected error: ${error.message}`);
    }
  }
};

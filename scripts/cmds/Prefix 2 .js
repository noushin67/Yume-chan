const fs = require("fs-extra");
const { utils } = global;

module.exports = {
  config: {
    name: "prefix",
    version: "2.0",
    author: "Watashi Sajib",
    countDown: 3,
    role: 2, // only admin can change global prefix
    description: "Change bot prefix in thread or globally",
    category: "config",
    guide: {
      en: '{pn} <new prefix>: Change prefix for this chat\n' +
          '{pn} <new prefix> -g: Change global prefix (admin only)\n' +
          '{pn} reset: Reset prefix for this chat'
    }
  },

  langs: {
    en: {
      reset: "✅ Prefix reset to default: %1",
      onlyAdmin: "❌ Only admin can change global prefix",
      confirmGlobal: "⚠️ React to confirm global prefix change",
      confirmThisThread: "⚠️ React to confirm thread prefix change",
      successGlobal: "♻️ Global prefix changed to: %1",
      successThisThread: "♻️ Thread prefix changed to: %1",
      myPrefix: "🦋 Current Prefix Info:\n~ System Prefix: %1\n~ Thread Prefix: %2"
    }
  },

  onStart: async function({ message, args, event, threadsData, role, getLang }) {
    if (!args[0]) return message.SyntaxError();

    const newPrefix = args[0];

    if (newPrefix.toLowerCase() === "reset") {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.GoatBot.config.prefix));
    }

    const isGlobal = args[1] === "-g";
    if (isGlobal && role < 2) return message.reply(getLang("onlyAdmin"));

    const confirmMsg = isGlobal ? getLang("confirmGlobal") : getLang("confirmThisThread");
    message.reply(confirmMsg, (err, info) => {
      global.GoatBot.onReaction.set(info.messageID, {
        author: event.senderID,
        newPrefix,
        setGlobal: isGlobal
      });
    });
  },

  onReaction: async function({ message, event, threadsData, Reaction, getLang }) {
    if (event.userID !== Reaction.author) return;

    if (Reaction.setGlobal) {
      global.GoatBot.config.prefix = Reaction.newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply(getLang("successGlobal", Reaction.newPrefix));
    } else {
      await threadsData.set(event.threadID, Reaction.newPrefix, "data.prefix");
      return message.reply(getLang("successThisThread", Reaction.newPrefix));
    }
  },

  onChat: async function({ event, message }) {
    if (event.body && event.body.toLowerCase() === "prefix") {
      const threadPrefix = await utils.getPrefix(event.threadID);
      return message.reply(this.langs.en.myPrefix
        .replace("%1", global.GoatBot.config.prefix)
        .replace("%2", threadPrefix));
    }
  }
};

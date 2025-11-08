const fs = require("fs-extra");

module.exports = {
  config: {
    name: "whitelist",
    aliases: ["wl"],
    version: "3.0",
    author: "Watashi Sajib 💫",
    countDown: 5,
    role: 2,
    shortDescription: "Manage whitelist users",
    longDescription: "Add, remove, list or toggle whitelist users who can use the bot when whitelist mode is on.",
    category: "owner",
    guide: {
      en: "{pn} add <uid/@tag>\n{pn} remove <uid/@tag>\n{pn} list\n{pn} on/off"
    }
  },

  onStart: async function ({ message, args, usersData, event, api }) {
    const config = global.GoatBot.config;
    const dirConfig = global.client.dirConfig;

    // Ensure whitelist mode exists
    if (!config.whiteListMode) {
      config.whiteListMode = { enable: false, whiteListIds: [] };
      fs.writeFileSync(dirConfig, JSON.stringify(config, null, 2));
    }

    const whiteList = config.whiteListMode.whiteListIds;

    const adminUID = ["100078792977084"]; // 👑 your UID here (Watashi Sajib)
    if (!adminUID.includes(event.senderID)) {
      return message.reply("❌ | You don't have permission to use this command, Baka!");
    }

    const action = args[0]?.toLowerCase();

    switch (action) {
      // ➕ Add user
      case "add": {
        let uids = [];

        if (Object.keys(event.mentions).length > 0)
          uids = Object.keys(event.mentions);
        else if (args[1] && !isNaN(args[1]))
          uids.push(args[1]);
        else if (event.messageReply)
          uids.push(event.messageReply.senderID);

        if (!uids.length) return message.reply("⚠️ | Please mention or enter a user ID to add.");

        const added = [];
        const already = [];

        for (const id of uids) {
          if (whiteList.includes(id)) already.push(id);
          else whiteList.push(id), added.push(id);
        }

        fs.writeFileSync(dirConfig, JSON.stringify(config, null, 2));

        const addedNames = await Promise.all(added.map(async id => `• ${await usersData.getName(id)} (${id})`));
        const alreadyNames = await Promise.all(already.map(async id => `• ${await usersData.getName(id)} (${id})`));

        let msg = "";
        if (addedNames.length > 0) msg += `✅ Added to whitelist:\n${addedNames.join("\n")}\n\n`;
        if (alreadyNames.length > 0) msg += `⚠️ Already whitelisted:\n${alreadyNames.join("\n")}`;

        return message.reply(msg.trim() || "No users processed.");
      }

      // ➖ Remove user
      case "remove": {
        let uids = [];

        if (Object.keys(event.mentions).length > 0)
          uids = Object.keys(event.mentions);
        else if (args[1] && !isNaN(args[1]))
          uids.push(args[1]);
        else if (event.messageReply)
          uids.push(event.messageReply.senderID);

        if (!uids.length) return message.reply("⚠️ | Please mention or enter a user ID to remove.");

        const removed = [];
        const notFound = [];

        for (const id of uids) {
          const index = whiteList.indexOf(id);
          if (index !== -1) {
            whiteList.splice(index, 1);
            removed.push(id);
          } else notFound.push(id);
        }

        fs.writeFileSync(dirConfig, JSON.stringify(config, null, 2));

        const removedNames = await Promise.all(removed.map(async id => `• ${await usersData.getName(id)} (${id})`));
        const notFoundNames = await Promise.all(notFound.map(async id => `• ${await usersData.getName(id)} (${id})`));

        let msg = "";
        if (removedNames.length > 0) msg += `✅ Removed from whitelist:\n${removedNames.join("\n")}\n\n`;
        if (notFoundNames.length > 0) msg += `⚠️ Not found in whitelist:\n${notFoundNames.join("\n")}`;

        return message.reply(msg.trim() || "No users processed.");
      }

      // 📜 List whitelist users
      case "list": {
        if (whiteList.length === 0)
          return message.reply("📭 | No users in whitelist yet.");
        const names = await Promise.all(
          whiteList.map(async id => `• ${await usersData.getName(id)} (${id})`)
        );
        return message.reply(`👑 | Whitelisted Users:\n${names.join("\n")}`);
      }

      // 🔛 Toggle whitelist mode
      case "on":
      case "enable": {
        config.whiteListMode.enable = true;
        fs.writeFileSync(dirConfig, JSON.stringify(config, null, 2));
        return message.reply("✅ | Whitelist mode is now ON. Only whitelisted users can use the bot.");
      }

      case "off":
      case "disable": {
        config.whiteListMode.enable = false;
        fs.writeFileSync(dirConfig, JSON.stringify(config, null, 2));
        return message.reply("❎ | Whitelist mode is now OFF. Everyone can use the bot.");
      }

      default:
        return message.reply(
          "⚙️ | Whitelist Command Usage:\n\n" +
          "• wl add <uid/@tag>\n" +
          "• wl remove <uid/@tag>\n" +
          "• wl list\n" +
          "• wl on/off"
        );
    }
  }
};

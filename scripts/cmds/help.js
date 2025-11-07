module.exports = {
  config: {
    name: "help",
    version: "2.0",
    author: "Watashi Sajib",
    countDown: 3,
    role: 0,
    description: "Display all commands nicely with categories",
    category: "utility",
  },

  onStart: async function ({ message, getLang, global }) {
    const prefix = global.GoatBot?.config?.prefix || "+";

    const categories = {
      OWNER: ["restart", "adminonly", "backupdata", "cmd", "eval", "event", "getfbstate", "hubble", "ignoreonlyad", "ignoreonlyadbox", "jsontomongodb", "jsontosqlite", "loadconfig", "notification", "setavt", "setlang", "setrankup", "thread", "update", "user"],
      AI: ["bot"],
      "BOX CHAT": ["adduser", "admin", "all", "antichangeinfobox", "autosetname", "badwords", "ban", "busy", "count", "filteruser", "gpt", "kick", "onlyadminbox", "refresh", "rules", "sendnoti", "setname", "warn"],
      CONFIG: ["prefix", "setalias"],
      "CONTACTS ADMIN": ["callad"],
      CUSTOM: ["setleave", "setwelcome", "shortcut"],
      ECONOMY: ["balance"],
      FUN: ["baby", "bottalk", "emojimix", "pair", "unsend"],
      GAME: ["daily", "dhbc", "guessnumber", "quiz"],
      IMAGE: ["avatar", "moon", "sorthelp"],
      INFO: ["grouptag", "owner", "ownerinfo", "setrole", "texttoimage", "tid", "uid"],
      LOVE: ["babu", "babu2", "babu3", "mae"],
      MEDIA: ["sing", "ytb"],
      NSFW: ["saxx"],
      OTHER: ["weather"],
      RANK: ["customrankcard", "rank", "rankup"],
      SOFTWARE: ["appstore"],
      UTILITY: ["help", "translate"],
      WIKI: ["emojimean"]
    };

    let msg = "🌸┏━━━━━━━━━━━━━━━━━┓🌸\n";
    msg += "🌟  𝐖𝐚𝐭𝐚𝐬𝐡𝐢 𝐒𝐚𝐣𝐢𝐛 🎀 𝓒𝓸𝓶𝓶𝓪𝓷𝓭𝓼  🌟\n";
    msg += "🌸┗━━━━━━━━━━━━━━━━━┛🌸\n\n";
    msg += `✨ 𝓟𝓪𝓰𝓮 1/1 \n🦋 𝓣𝓸𝓽𝓪𝓵 𝓒𝓸𝓶𝓶𝓪𝓷𝓭𝓼: ${Object.values(categories).flat().length} \n💌 𝓟𝓻𝓮𝓯𝓲𝔁: [ ${prefix} ]\n\n`;

    for (const [cat, cmds] of Object.entries(categories)) {
      msg += `🪽┌───【 ${cat} 】───┐🦋\n`;
      msg += "🎀 " + cmds.join(" ✧ ") + "\n";
      msg += "🩶└─────────────────┘🌸\n\n";
    }

    msg += "🦋══════════════════🦋\n";
    msg += "🔮 𝓣𝔂𝓹𝓮 \"" + prefix + "help <command>\" 𝓯𝓸𝓻 𝓭𝓮𝓽𝓪𝓲𝓵𝓼\n";
    msg += "👑 𝓞𝔀𝓷𝓮𝓻: Watashi Sajib ♥\n";
    msg += `🍫 𝓟𝓪𝓰𝓮 1/1 | 𝓣𝓸𝓽𝓪𝓵 ${Object.values(categories).flat().length}\n`;
    msg += "✨⋆⋅☆⋅⋆✨⋆⋅☆⋅⋆✨⋆⋅☆⋅⋆✨";

    return message.reply(msg);
  }
};

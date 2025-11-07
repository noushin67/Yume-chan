const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "help",
    version: "5.0",
    author: "Watashi Sajib",
    countDown: 5,
    role: 0,
    description: "Show categorized command list with page system 💫",
    category: "system"
  },

  onStart: async function ({ api, event, message }) {
    const prefix = global.GoatBot.config.prefix || "+";
    const time = moment.tz("Asia/Dhaka").format("hh:mm A, dddd, DD MMMM YYYY");

    const pages = [
      {
        title: "🌸 Basic Commands 🌸",
        body: `
💬 ${prefix}help — Show this help menu  
💬 ${prefix}prefix — Show current prefix info  
💬 ${prefix}owner — Show owner information  
💬 ${prefix}time — Show current time ⏰  
        `
      },
      {
        title: "💞 Fun Commands 💞",
        body: `
💘 ${prefix}pair — Random love pair (with pfp)  
🐥 ${prefix}babu — Cute random message  
🌷 ${prefix}mae — Sweet message for Mae  
🎮 ${prefix}4k — Send random 4K videos  
👀 ${prefix}spy — Spy on user messages 😳  
        `
      },
      {
        title: "⚙️ Config Commands ⚙️",
        body: `
🔧 ${prefix}prefix reset — Reset group prefix  
🔧 ${prefix}prefix <new> — Change prefix  
🔧 ${prefix}prefix -g — Change system prefix (admin)  
        `
      }
    ];

    // Start on first page
    let page = 0;

    const sendPage = () => {
      const content = `
${pages[page].title}

${pages[page].body}

──────────────────────
📘 Page ${page + 1}/${pages.length}
🕰️ ${time}
👑 Owner: 𝑾𝒂𝒕𝒂𝒔𝒉𝒊 𝑺𝒂𝒋𝒊𝒃 💫
🌸 Bot: 𝑴𝒂𝒉𝒊𝒓𝒖 𝑪𝒉𝒂𝒏 🌸
──────────────────────

⏪ React '⬅️' for Previous | React '➡️' for Next
`;

      message.reply(content, (err, info) => {
        global.GoatBot.onReaction.set(info.messageID, {
          name: "help",
          author: event.senderID,
          page,
          messageID: info.messageID
        });
      });
    };

    sendPage();
  },

  onReaction: async function ({ message, event, Reaction }) {
    const { author, page, messageID } = Reaction;
    if (event.userID !== author) return;

    const prefix = global.GoatBot.config.prefix || "+";
    const time = moment.tz("Asia/Dhaka").format("hh:mm A, dddd, DD MMMM YYYY");

    const pages = [
      {
        title: "🌸 Basic Commands 🌸",
        body: `
💬 ${prefix}help — Show this help menu  
💬 ${prefix}prefix — Show current prefix info  
💬 ${prefix}owner — Show owner information  
💬 ${prefix}time — Show current time ⏰  
        `
      },
      {
        title: "💞 Fun Commands 💞",
        body: `
💘 ${prefix}pair — Random love pair (with pfp)  
🐥 ${prefix}babu — Cute random message  
🌷 ${prefix}mae — Sweet message for Mae  
🎮 ${prefix}4k — Send random 4K videos  
👀 ${prefix}spy — Spy on user messages 😳  
        `
      },
      {
        title: "⚙️ Config Commands ⚙️",
        body: `
🔧 ${prefix}prefix reset — Reset group prefix  
🔧 ${prefix}prefix <new> — Change prefix  
🔧 ${prefix}prefix -g — Change system prefix (admin)  
        `
      }
    ];

    let newPage = page;
    if (event.reaction === "⬅️") newPage = (page - 1 + pages.length) % pages.length;
    else if (event.reaction === "➡️") newPage = (page + 1) % pages.length;
    else return;

    const newMsg = `
${pages[newPage].title}

${pages[newPage].body}

──────────────────────
📘 Page ${newPage + 1}/${pages.length}
🕰️ ${time}
👑 Owner: 𝑾𝒂𝒕𝒂𝒔𝒉𝒊 𝑺𝒂𝒋𝒊𝒃 💫
🌸 Bot: 𝑴𝒂𝒉𝒊𝒓𝒖 𝑪𝒉𝒂𝒏 🌸
──────────────────────

⏪ React '⬅️' for Previous | React '➡️' for Next
`;

    message.editMessage(messageID, newMsg, (err, info) => {
      global.GoatBot.onReaction.set(info.messageID, {
        name: "help",
        author,
        page: newPage,
        messageID: info.messageID
      });
    });
  }
};								

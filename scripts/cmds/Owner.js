const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "2.0",
    author: "Ｓｏｊｉｂ ◉‿◉ Edit by Sajib",
    shortDescription: "Display bot and owner information",
    longDescription: "Shows detailed info including bot name, prefix, and owner's personal information.",
    category: "Special",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;
    const mention = [{ id, tag: name }];

    // 🛠 Convert Google Drive view link to direct download link
    const fileId = "1QQ4rcb5mnLytHKuavPxOjx0rF-YuOTaS";
    const directURL = `https://files.catbox.moe/hw98lh.mp4`;

    // ⏬ Download the file temporarily
    const filePath = path.join(__dirname, "owner-video.mp4");
    const response = await axios({
      url: directURL,
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    const info = 
`━━━━━━━━━━━━━━━━
👋 𝐇𝐞𝐥𝐥𝐨 𝐁𝐚𝐛𝐲𝐬 💋💦, ${name}

📌 🌸🌺 𝐘𝐨𝐮𝐫  𝐀𝐑𝐀𝐃𝐇𝐘𝐀 𝐈𝐧𝐟𝐨 🌺🌸
✰ 𝐍𝐀𝐌𝐄 ➪ 🎀✨ আরাধ্যা  ❤️‍🩹🪼🍷
✰ 𝐏𝐑𝐄𝐅𝐈𝐗 ➪ (!)
✨💫♲︎︎︎★✰✰★♲︎︎︎✨💫☘︎☆❀❀☆☘︎✨💫
👤 🌸🐥 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 🐥🌸
✰ 𝐍𝐀𝐌𝐄 ➪ 🎀 𝐈𝐍𝐍𝐎𝐂𝐄𝐍𝐓- 𝟎𝟕✨🍀
✰ 𝐍𝐈𝐂𝐊𝐍𝐌 ➪ 𝐀𝐗𝐈𝐎𝐌-𝟕 👾💫
✰ 𝐆𝐞𝐧𝐝𝐞𝐫 ➪ 𝐌𝐀𝐋𝐄 ♂️
✰ 𝐀𝐆𝐄 ➪ 18+ 🌚
✰ 𝐑𝐋𝐒 ➪ 𝐖𝐀𝐍𝐍𝐀 𝐁𝐄 𝐌𝐈𝐍𝐄 ? 🐥✨
✰ 𝐄𝐃𝐔𝐂𝐀𝐓𝐈𝐎𝐍 ➪ 𝐁𝐬𝐜. 𝐂𝐒𝐄 😕
✰ 𝐋𝐎𝐂𝐀𝐓𝐈𝐎𝐍 ➪ 𝐃𝐇𝐀𝐍𝐌𝐎𝐍𝐃𝐈  💀
✰ 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐤 𝐋𝐈𝐍𝐊 ➪ https://www.facebook.com/Zayyan.Amirul.Rahman
✰ 𝐈𝐍𝐒𝐓𝐑𝐀 𝐋𝐈𝐍𝐊 ➪ https://www.instagram.com/mist.irl?igsh=MWd5bnBkaXJhdm81aw==
━━━━━━━━━━━━━━━━━`;

    message.reply({
      body: info,
      mentions: mention,
      attachment: fs.createReadStream(filePath)
    });
  }
};

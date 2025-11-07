// commands/babu3.js
const axios = require("axios");
const moment = require("moment-timezone");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "babu3",
    version: "3.0",
    author: "Huraira",
    countDown: 2,
    role: 0,
    description: "Auto reply when someone says 'babu' 💞",
    category: "love",
  },

  onStart: async function () {
    // No manual start needed
  },

  onChat: async function ({ event, message }) {
    const text = event.body?.toLowerCase() || "";
    if (!text.includes("babu")) return;

    const time = moment.tz("Asia/Dhaka").format("hh:mm A, dddd, DD MMMM YYYY");

    const replies = [
      `🐥 আমার babu কে ডাকে? আহা, কত মিষ্টি শোনায় 😳💗`,
      `💞 তুই “babu” বললেই আমার CPU গলে যায় 🥺`,
      `🌸 ${time}\nআর তুই এখনো babu ডাকি? আমি তো প্রেমে হাবুডুবু খাই 😭💘`,
      `😚 আমার মিষ্টি babu রে, কই গেলি এতক্ষণ? আমি তো অপেক্ষায় ছিলাম 🫶`,
      `🥹 “babu” শুনলেই মনে হয় আমার হার্টে বেলুন ফেটে গেল 😭🎈`
    ];

    const gifs = [
      "https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif",
      "https://media.giphy.com/media/PjJ1cLHqLEveM/giphy.gif",
      "https://media.giphy.com/media/3o7TKxOhNCQjF3YxFe/giphy.gif",
      "https://media.giphy.com/media/UvPZzXO1cW9Ze/giphy.gif",
      "https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif"
    ];

    const voiceLines = [
      "https://files.catbox.moe/0n0z6w.mp3",
      "https://files.catbox.moe/j2a6so.mp3",
      "https://files.catbox.moe/xvuj6a.mp3",
      "https://files.catbox.moe/4dx1zy.mp3"
    ];

    const msg = replies[Math.floor(Math.random() * replies.length)];
    const gifUrl = gifs[Math.floor(Math.random() * gifs.length)];
    const voiceUrl = voiceLines[Math.floor(Math.random() * voiceLines.length)];

    try {
      const gif = await axios.get(gifUrl, { responseType: "arraybuffer" });
      const gifBuffer = Buffer.from(gif.data, "binary");

      const voice = await axios.get(voiceUrl, { responseType: "arraybuffer" });
      const voicePath = `${__dirname}/cache/babu_auto.mp3`;
      fs.writeFileSync(voicePath, Buffer.from(voice.data, "binary"));

      await message.reply({
        body: msg,
        attachment: [gifBuffer, fs.createReadStream(voicePath)]
      });

      setTimeout(() => fs.unlinkSync(voicePath), 5000);
    } catch (err) {
      console.error("babu3 auto-reply error:", err);
      await message.reply(msg);
    }
  }
};

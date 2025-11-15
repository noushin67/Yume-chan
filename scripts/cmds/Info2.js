module.exports = {
  config: {
    name: "info2",
    version: "2.0",
    author: "Mahiru Chan 💫",
    countDown: 3,
    role: 0,
    shortDescription: "Show bot system info",
    longDescription: "Displays full bot information, system status, uptime, RAM usage and owner credits.",
    category: "info",
  },

  onStart: async function ({ api, event, globalGoat }) {
    const os = require("os");

    // Auto prefix
    const prefix = global.GoatBot.config.prefix || "+";

    // System info
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const ramUsed = (os.totalmem() - os.freemem()) / 1024 / 1024;
    const ramTotal = os.totalmem() / 1024 / 1024;

    // Time
    const time = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka"
    });

    const msg = `
╭━━━💫『 𝑩𝒐𝒕 𝑰𝒏𝒇𝒐 𝟐.𝟎 』💫━━━╮
┃ 🤖 Bot Name: 𝑴𝒂𝒉𝒊𝒓𝒖 𝑪𝒉𝒂𝒏 𝑩𝒐𝒕
┃ 💠 Prefix: ${prefix}
┃ 🌸 Version: 2.0
┃ ⚙️ Framework: GoatBot V2 (Messenger)
┃ 💻 Language: Node.js (JavaScript)
┃ 📅 Server Time: ${time}
┃ 🕒 Uptime: ${hours}h ${minutes}m ${seconds}s
┃ 🔋 RAM Use: ${ramUsed.toFixed(1)}MB / ${ramTotal.toFixed(1)}MB
┃ 👑 Owner: 𝑾𝒂𝒕𝒂𝒔𝒉𝒊 𝑾𝒂 𝑺𝒂𝒋𝒊𝒃 🙂✨ (𝐌𝐢𝐧𝐚𝐭𝐨)
┃ 💌 Contact: fb.me/17YDaL2JE2
╰━━━━━━━━━━━━━━━━━━━━━━╯
🌷 𝙈𝙖𝙙𝙚 𝙬𝙞𝙩𝙝 💖 𝙛𝙤𝙧 𝙡𝙤𝙫𝙚, 𝙢𝙪𝙨𝙞𝙘, 𝙖𝙣𝙙 𝙘𝙤𝙙𝙞𝙣𝙜 🎧
`;

    api.sendMessage(msg, event.threadID, event.messageID);
  }
};

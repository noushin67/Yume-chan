module.exports = {
  config: {
    name: "info3",
    version: "1.0.1",
    author: "Mahiru Chan",
    cooldown: 5,
    role: 0,
    category: "system",
    description: "Shows full bot & server stats"
  },

  onStart: async function ({ api, event }) {
    const os = require("os");

    // First ping check message
    const sent = await api.sendMessage("⏳ Checking system…", event.threadID);

    const ping = Date.now() - sent.timestamp;

    // Uptime
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    // RAM
    const freeRAM = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    const totalRAM = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

    // CPU Info
    const cpu = os.cpus()[0].model;
    const cores = os.cpus().length;
    const cpuUsage = os.loadavg()[0].toFixed(2);

    // OS Info
    const osName = os.type();
    const osVer = os.release();

    const msg = `
╭━━━〔 🤖 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 〕━━━╮
┃⏱️ Uptime : ${days}d ${hours}h ${minutes}m ${seconds}s
┃📶 Ping   : ${ping}ms
┃📦 Node   : ${process.version}
┃👑 Owner  : Mahiru Chan
╰━━━━━━━━━━━━━━━━━━━━╯

╭━━〔 🖥 𝐒𝐄𝐑𝐕𝐄𝐑 𝐒𝐓𝐀𝐓𝐒 〕━━╮
┃🧠 RAM  : ${freeRAM}GB free / ${totalRAM}GB
┃⚙️ CPU  : ${cpu}
┃🔢 Cores: ${cores}
┃🔥 Load : ${cpuUsage}%
╰━━━━━━━━━━━━━━━━━━━━╯

╭━〔 ⚙️ 𝐒𝐘𝐒𝐓𝐄𝐌 〕━━━━━━━╮
┃🖥 OS   : ${osName} ${osVer}
┃🔐 Safe : Media OK
╰━━━━━━━━━━━━━━━━━━━━╯`;

    api.sendMessage(msg, event.threadID, event.messageID);
  }
};

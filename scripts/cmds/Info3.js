module.exports = {
  name: "info3",
  description: "Shows full bot system info",
  author: "Mahiru Chan ✨",
  cooldown: 5,

  async execute(api, event, args) {
    const os = require("os");
    const fs = require("fs");

    // 📌 Bot stats (edit if your framework stores different path)
    const dataPath = __dirname + "/../../data";
    let users = 0, threads = 0, commands = 0;

    try {
      if (fs.existsSync(`${dataPath}/users.json`))
        users = JSON.parse(fs.readFileSync(`${dataPath}/users.json`)).length;

      if (fs.existsSync(`${dataPath}/threads.json`))
        threads = JSON.parse(fs.readFileSync(`${dataPath}/threads.json`)).length;

      if (fs.existsSync(`${dataPath}/commands.json`))
        commands = JSON.parse(fs.readFileSync(`${dataPath}/commands.json`)).length;
    } catch { }

    // 📌 Ping speed
    let pingStart = Date.now();
    await api.sendMessage("", event.threadID);
    let ping = Date.now() - pingStart;

    // 📌 Uptime
    let totalSeconds = process.uptime();
    let days = Math.floor(totalSeconds / (3600 * 24));
    let hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = Math.floor(totalSeconds % 60);

    // 📌 RAM + CPU
    const freeRAM = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    const totalRAM = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

    const cpuModel = os.cpus()[0].model;
    const cpuCores = os.cpus().length;
    const cpuUsage = (os.loadavg()[0]).toFixed(2);

    // 📌 Disk storage (Linux only)
    const { execSync } = require("child_process");
    let diskInfo = execSync("df -h /").toString().split("\n")[1].split(/\s+/);
    let diskTotal = diskInfo[1];
    let diskUsed = diskInfo[2];
    let diskFree = diskInfo[3];

    // 📌 Final message
    const msg = `
╭━━━〔 🤖 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 〕━━━╮
┃👥 Users       : ${users}
┃💬 Groups      : ${threads}
┃🧾 Commands    : ${commands}
┃📨 Total Msgs  : 0
┃⏱️ Uptime      : ${days}d ${hours}h ${minutes}m ${seconds}s
┃📶 Ping        : ${ping}ms
╰━━━━━━━━━━━━━━━━━━━━╯

╭━━〔 🖥 𝐒𝐄𝐑𝐕𝐄𝐑 𝐒𝐓𝐀𝐓𝐒 〕━━╮
┃🧠 RAM        : ${freeRAM}GB free / ${totalRAM}GB
┃💽 Disk       : ${diskUsed} used / ${diskTotal} (Free: ${diskFree})
┃⚙️ CPU        : ${cpuModel}
┃🔢 Cores      : ${cpuCores}
┃🔥 CPU Usage  : ${cpuUsage}%
╰━━━━━━━━━━━━━━━━━━━━╯

╭━〔 ⚙️ 𝐒𝐘𝐒𝐓𝐄𝐌 〕━━━━━━━╮
┃🖥 OS         : ${os.type()} ${os.release()}
┃📦 Node.js    : ${process.version}
┃🔒 Media Ban  : ⚠️ No
╰━━━━━━━━━━━━━━━━━━━━╯
`;

    return api.sendMessage(msg, event.threadID, event.messageID);
  }
};

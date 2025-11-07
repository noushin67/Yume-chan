module.exports = {
  name: "owner2",
  description: "💠 Shows full information about the bot owner",
  author: "Mahiru Chan 💫",

  execute(api, event) {
    const msg = `
╭━━━🌸『 𝑩𝒐𝒕 𝑶𝒘𝒏𝒆𝒓 𝑰𝒏𝒇𝒐 』🌸━━━╮
┃ 💠 Name: 𝒉𝒂𝒓𝒂𝒊𝒓𝒂 𝑺𝒂𝒋𝒊𝒃 (𝐌𝐢𝐧𝐚𝐭𝐨)
┃ 💫 Role: 𝙊𝙬𝙣𝙚𝙧 / 𝘿𝙚𝙫 𝙤𝙛 𝙩𝙝𝙞𝙨 𝘽𝙤𝙩
┃ 🧠 Skills: JavaScript • Node.js • Bot Dev
┃ 💌 FB: https://www.facebook.com/share/17YDaL2JE2/
┃ 🎧 Motto: "Sing. React. Feel. Heal."
┃ 🌸 Status: Always vibing with code 💻
╰━━━━━━━━━━━━━━━━━━━━━━╯
✨ 𝙈𝙖𝙙𝙚 𝙬𝙞𝙩𝙝 💖 𝙗𝙮 𝙈𝙖𝙝𝙞𝙧𝙪 𝘾𝙝𝙖𝙣
`;

    api.sendMessage(msg, event.threadID, event.messageID);
  }
};

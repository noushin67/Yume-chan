module.exports = {
  config: {
    name: "slap",
    version: "1.0",
    author: "Ariyan Ahamed",
    countDown: 3,
    role: 0,
    description: "Slap someone playfully 😈",
    category: "fun"
  },

  onStart: async function ({ message, event, usersData, args }) {
    let target;
    if (event.mentions && Object.keys(event.mentions).length > 0) {
      const id = Object.keys(event.mentions)[0];
      target = event.mentions[id].replace(/^@/, "");
    } else if (args[0]) {
      target = args.join(" ");
    } else {
      return message.reply("⚠️ Kake slap dibo? Mention / name dao.");
    }

    const senderName = await usersData.getName(event.senderID);
    const text = `😼 ${senderName} just slapped ${target} with a virtual chappal 🩴`;
    return message.reply(text);
  }
};
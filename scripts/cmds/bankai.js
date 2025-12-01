module.exports = {
  config: {
    name: "bankai",
    author: "Ariyan Ahamed",
    category: "fun",
    description: "Bleach bankai SFX"
  },

  onStart: async function ({ message }) {
    message.reply("⚔️ Bankai!!!");
  }
};
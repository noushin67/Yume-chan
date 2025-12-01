const axios = require("axios");

module.exports = {
  config: {
    name: "texttoimage",
    version: "1.0",
    author: "Ariyan Ahamed",
    countDown: 8,
    role: 0,
    description: "Generate an image from text prompt (simple)",
    category: "image generator"
  },

  onStart: async function ({ message, args }) {
    const prompt = args.join(" ");
    if (!prompt) {
      return message.reply("⚠️ Prompt dao: texttoimage <description>");
    }

    try {
      // Example free endpoint, replace with your own if needed
      const res = await axios.get(
        "https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt),
        { responseType: "arraybuffer" }
      );

      const img = Buffer.from(res.data, "binary");
      return message.reply({
        body: `🖼 Prompt: ${prompt}`,
        attachment: img
      });
    } catch (err) {
      console.error(err);
      return message.reply("❌ Image generate korte problem holo, pore try koro.");
    }
  }
};
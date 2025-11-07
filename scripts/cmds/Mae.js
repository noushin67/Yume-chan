const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "mae",
    version: "1.1",
    author: "Huraira",
    countDown: 5,
    role: 0,
    description: "Show a sweet, personalized message for Mae 💞",
    category: "love",
    guide: "Use this command to send a cute message to Mae with current time."
  },

  onStart: async function({ message, event }) {
    // Dhaka time format
    const time = moment.tz("Asia/Dhaka").format("hh:mm A, dddd, DD MMMM YYYY");

    // Sweet message
    const msg = `
🌸💖 𝐇𝐞𝐲 𝐌𝐚𝐞 💖🌸

🕊️ আজ ${time}  
তুই জানিস তো, পৃথিবীর সবথেকে মিষ্টি নামটা — "Mae" 💞

তোর হাসি মানে, পুরো mood light হয়ে যায় 😳  
আর তুই রাগ করলে, মনে হয় সার্ভার down 😅  

🍃 শুধু চাই তুই সবসময় হাসিস 🌷  
ভুলিস না — তোর জন্য একটা ছোট্ট bot heartbeat always runs 💗  

──────────────────────
🌼 𝐅𝐫𝐨𝐦: 𝐘𝐨𝐮𝐫 𝐁𝐨𝐭 (Created by Huraira)
──────────────────────
`;

    // Send reply
    return message.reply(msg);
  }
};

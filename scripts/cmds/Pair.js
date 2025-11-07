const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "pair",
    version: "5.0",
    author: "Huraira",
    countDown: 5,
    role: 0,
    description: "Randomly pairs a boy and a girl from the group with love percentage & pfps 💞",
    category: "fun"
  },

  onStart: async function ({ api, event, message }) {
    try {
      const threadID = event.threadID;
      const threadInfo = await api.getThreadInfo(threadID);
      const users = threadInfo.userInfo.filter(u => !u.isMessengerUser);

      if (users.length < 2)
        return message.reply("😅 Not enough members to make a pair!");

      // Separate male & female if available
      const males = users.filter(u => u.gender === "MALE");
      const females = users.filter(u => u.gender === "FEMALE");

      let boy, girl;

      if (males.length > 0 && females.length > 0) {
        boy = males[Math.floor(Math.random() * males.length)];
        girl = females[Math.floor(Math.random() * females.length)];
      } else {
        // fallback random pair if no gender info
        boy = users[Math.floor(Math.random() * users.length)];
        do {
          girl = users[Math.floor(Math.random() * users.length)];
        } while (boy.id === girl.id);
      }

      // Random Love %
      const lovePercent = Math.floor(Math.random() * 101);

      // Caption based on love %
      let caption = "";
      if (lovePercent < 30) caption = "😅 Maybe just friends... for now?";
      else if (lovePercent < 60) caption = "💞 Some spark is there... who knows?";
      else if (lovePercent < 80) caption = "🥰 They definitely like each other!";
      else caption = "💍 Soulmates confirmed! Fate approves 💖";

      // Fetch profile photos
      const getPfp = async (id) =>
        await axios.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, {
          responseType: "arraybuffer",
        });

      const boyPfp = await getPfp(boy.id);
      const girlPfp = await getPfp(girl.id);

      const pathBoy = __dirname + `/cache/${boy.id}_pair.jpg`;
      const pathGirl = __dirname + `/cache/${girl.id}_pair.jpg`;

      fs.writeFileSync(pathBoy, Buffer.from(boyPfp.data, "binary"));
      fs.writeFileSync(pathGirl, Buffer.from(girlPfp.data, "binary"));

      const msg = `
💘✨ 𝐋𝐨𝐯𝐞 𝐏𝐚𝐢𝐫 ✨💘

👦 ${boy.name} 💞 ${girl.name}
❤️ Love Percentage: ${lovePercent}%

${caption}

📸 Profile Preview Below ⬇️
`;

      await message.reply({
        body: msg,
        attachment: [
          fs.createReadStream(pathBoy),
          fs.createReadStream(pathGirl)
        ]
      });

      // Clean up cache
      fs.unlinkSync(pathBoy);
      fs.unlinkSync(pathGirl);
    } catch (err) {
      console.error(err);
      message.reply("⚠️ | Couldn't create a love pair, try again later!");
    }
  }
};

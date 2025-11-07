// owner.js
module.exports = {
  name: "owner",
  description: "Show bot owner info. Usage: +owner",
  execute(api, event, args) {
    const ownerInfo = `
👑 BOT OWNER 👑
Name: Haraira Sajib 💋💦
FB: https://www.facebook.com/ewrsajib77
GitHub: ** 😜💋💦
Prefix: +
`;
    api.sendMessage(ownerInfo, event.threadID, event.messageID);
  }
};

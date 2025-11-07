// pair2.js
module.exports = {
  name: "pair2",
  description: "Another fun pairing (uses emoji) Usage: +pair2 name1 | name2",
  execute(api, event, args) {
    const text = args.join(" ");
    if (!text || !text.includes("|")) {
      return api.sendMessage("Usage: +pair2 name1 | name2", event.threadID, event.messageID);
    }
    const [a,b] = text.split("|").map(x => x.trim());
    const score = Math.floor((a.length + b.length) * 7.13) % 101;
    const mood = score > 75 ? "🔥 True love!" : score > 45 ? "😊 Good match" : "😅 Better as friends";
    api.sendMessage(`Pair2 Result:\n${a} ❤️ ${b}\nScore: ${score}%\n${mood}`, event.threadID, event.messageID);
  }
};

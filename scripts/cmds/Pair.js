
module.exports = {
  name: "pair",
  description: "Check compatibility between two names (fun). Usage: +pair name1 | name2",
  execute(api, event, args) {
    const text = args.join(" ");
    if (!text || !text.includes("|")) {
      return api.sendMessage("ব্যবহার: +pair name1 | name2\nউদাহরণ: +pair Arian | Maya", event.threadID, event.messageID);
    }
    const parts = text.split("|").map(s => s.trim());
    const name1 = parts[0], name2 = parts[1];
    const score = Math.floor(Math.random() * 101);
    const heart = "❤️".repeat(Math.round(score / 20) || 1);
    const msg = `💞 Pair Result\n${name1} + ${name2}\nCompatibility: ${score}% ${heart}\n\n👉 Fate says: ${score > 70 ? "Very good!" : score > 40 ? "Could work" : "Just friends :)"}`;
    api.sendMessage(msg, event.threadID, event.messageID);
  }
};

// spy.js
module.exports = {
  name: "spy",
  description: "Fun spy message (joke). Usage: +spy @name",
  execute(api, event, args) {
    const name = args.join(" ") || "someone";
    const actions = [
      "secretly ate your snacks 🍪",
      "is planning a surprise party 🎉",
      "stole your phone charger 🔌",
      "sent a love note 💌",
      "is learning to dance 💃"
    ];
    const pick = actions[Math.floor(Math.random() * actions.length)];
    api.sendMessage(`🔍 Spy report:\n${name} ${pick}`, event.threadID, event.messageID);
  }
};

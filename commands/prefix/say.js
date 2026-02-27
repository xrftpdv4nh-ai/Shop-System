const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "say",
  adminOnly: true,
  permissions: PermissionFlagsBits.Administrator,

  async execute(message, args, client, sendTemp) {
    const text = args.join(" ");
    if (!text) return sendTemp("❌ اكتب كلام.");

    message.channel.send(text);
  }
};

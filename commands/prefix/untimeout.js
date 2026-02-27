const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "untimeout",
  adminOnly: true,
  permissions: PermissionFlagsBits.ModerateMembers,
  cooldown: 10,

  async execute(message, args, client, sendTemp) {
    const member = message.mentions.members.first();
    if (!member) return sendTemp("❌ منشن الشخص.");

    await member.timeout(null);

    sendTemp(`✅ تم إزالة التايم أوت من ${member.user.tag}.`);
  }
};

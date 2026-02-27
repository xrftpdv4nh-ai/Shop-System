const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "timeout",
  adminOnly: true,
  permissions: PermissionFlagsBits.ModerateMembers,
  cooldown: 10,

  async execute(message, args, client, sendTemp) {
    const member = message.mentions.members.first();
    const duration = parseInt(args[1]);

    if (!member) return sendTemp("❌ منشن الشخص.");
    if (!duration) return sendTemp("❌ حدد المدة بالدقائق.");

    await member.timeout(duration * 60 * 1000);

    sendTemp(`⏳ تم إعطاء تايم أوت لـ ${member.user.tag} لمدة ${duration} دقيقة.`);
  }
};

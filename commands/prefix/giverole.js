const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "رول",
  adminOnly: true,
  permissions: PermissionFlagsBits.ManageRoles,
  cooldown: 10,

  async execute(message, args, client, sendTemp) {
    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!member || !role)
      return sendTemp("❌ منشن العضو والرول.");

    await member.roles.add(role);

    sendTemp(`🎭 تم إعطاء رول ${role.name} لـ ${member.user.tag}.`);
  }
};

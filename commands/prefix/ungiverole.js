const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "ungiverole",
  adminOnly: true,
  permissions: PermissionFlagsBits.ManageRoles,
  cooldown: 10,

  async execute(message, args, client, sendTemp) {
    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!member || !role)
      return sendTemp("❌ منشن العضو والرول.");

    await member.roles.remove(role);

    sendTemp(`🗑 تم إزالة رول ${role.name} من ${member.user.tag}.`);
  }
};

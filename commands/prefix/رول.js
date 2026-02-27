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

    // ⛔ حماية: مينفعش البوت يدي رول أعلى منه
    if (role.position >= message.guild.members.me.roles.highest.position)
      return sendTemp("❌ الرول أعلى من صلاحياتي.");

    // ⛔ حماية: مينفعش الأدمن يدي رول أعلى منه
    if (role.position >= message.member.roles.highest.position)
      return sendTemp("❌ متقدرش تتحكم في رول أعلى منك.");

    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
      sendTemp(`🗑 تم سحب رول ${role.name} من ${member.user.tag}`);
    } else {
      await member.roles.add(role);
      sendTemp(`🎭 تم إعطاء رول ${role.name} لـ ${member.user.tag}`);
    }
  }
};

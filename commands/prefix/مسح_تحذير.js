const { PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "مسح_تحذير",
  adminOnly: true,
  permissions: PermissionFlagsBits.ModerateMembers,
  cooldown: 10,

  async execute(message, args, client, sendTemp) {

    const member = message.mentions.members.first();
    const level = parseInt(args[1]);

    if (!member) return sendTemp("❌ منشن الشخص.");
    if (!level || level < 1 || level > 3)
      return sendTemp("❌ اكتب رقم التحذير (1 - 2 - 3)");

    const dataFolder = path.join(process.cwd(), "data");
    const filePath = path.join(dataFolder, "warnings.json");

    if (!fs.existsSync(filePath))
      return sendTemp("❌ لا يوجد سجل تحذيرات.");

    const data = JSON.parse(fs.readFileSync(filePath));

    if (!data[member.id] || data[member.id] === 0)
      return sendTemp("❌ هذا العضو ليس لديه تحذيرات.");

    // ====== رولات التحذيرات ======

    const warn1_roles = [
      "1476902854081118322",
      "1476902975468470383"
    ];

    const warn2_roles = [
      "1476902857880895652",
      "1476902970401620080"
    ];

    const warn3_roles = [
      "1476902862305890354",
      "1476902966723215513"
    ];

    // عكس الترتيب
    let rolesToRemove;

    if (level === 1) rolesToRemove = warn3_roles;
    if (level === 2) rolesToRemove = warn2_roles;
    if (level === 3) rolesToRemove = warn1_roles;

    for (const roleId of rolesToRemove) {
      const role = message.guild.roles.cache.get(roleId);
      if (role && member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
      }
    }

    // تقليل العداد
    data[member.id] = Math.max(0, data[member.id] - 1);

    if (data[member.id] === 0) {
      delete data[member.id];
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    sendTemp(
      `🗑 تم حذف التحذير بنجاح من ${member.user.tag}\nالتحذيرات الحالية: ${data[member.id] || 0}`
    );
  }
};

const { PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "تحذير",
  adminOnly: true,
  permissions: PermissionFlagsBits.ModerateMembers,
  cooldown: 10,

  async execute(message, args, client, sendTemp) {

    const member = message.mentions.members.first();
    if (!member) return sendTemp("❌ منشن الشخص.");

    // ====== ضمان وجود فولدر وملف البيانات ======
    const dataFolder = path.join(process.cwd(), "data");
    const filePath = path.join(dataFolder, "warnings.json");

    if (!fs.existsSync(dataFolder)) {
      fs.mkdirSync(dataFolder);
    }

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({}));
    }

    // ===========================================

    const data = JSON.parse(fs.readFileSync(filePath));

    if (!data[member.id]) {
      data[member.id] = 0;
    }

    data[member.id] += 1;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // ====== رولات التحذيرات ======

    // تحذير 1
    const warn1_role1 = message.guild.roles.cache.get("1476902854081118322");
    const warn1_role2 = message.guild.roles.cache.get("1476902975468470383");

    // تحذير 2
    const warn2_role1 = message.guild.roles.cache.get("1476902857880895652");
    const warn2_role2 = message.guild.roles.cache.get("1476902970401620080");

    // تحذير 3
    const warn3_role1 = message.guild.roles.cache.get("1476902862305890354");
    const warn3_role2 = message.guild.roles.cache.get("1476902966723215513");

    // ====== تنفيذ التحذيرات ======

    if (data[member.id] === 1) {
      if (warn1_role1 && !member.roles.cache.has(warn1_role1.id))
        await member.roles.add(warn1_role1);

      if (warn1_role2 && !member.roles.cache.has(warn1_role2.id))
        await member.roles.add(warn1_role2);
    }

    if (data[member.id] === 2) {
      if (warn2_role1 && !member.roles.cache.has(warn2_role1.id))
        await member.roles.add(warn2_role1);

      if (warn2_role2 && !member.roles.cache.has(warn2_role2.id))
        await member.roles.add(warn2_role2);
    }

    if (data[member.id] === 3) {
      if (warn3_role1 && !member.roles.cache.has(warn3_role1.id))
        await member.roles.add(warn3_role1);

      if (warn3_role2 && !member.roles.cache.has(warn3_role2.id))
        await member.roles.add(warn3_role2);
    }

    sendTemp(
      `⚠ تم إعطاء تحذير لـ ${member.user.tag}\nعدد التحذيرات: ${data[member.id]}`
    );
  }
};

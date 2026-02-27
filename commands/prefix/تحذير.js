const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");
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

    const reason = args.slice(1).join(" ") || "لم يتم ذكر سبب";
    const proof = message.attachments.first()?.url || "لا يوجد دليل";

    const dataFolder = path.join(process.cwd(), "data");
    const filePath = path.join(dataFolder, "warnings.json");

    if (!fs.existsSync(dataFolder)) fs.mkdirSync(dataFolder);
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({}));

    const data = JSON.parse(fs.readFileSync(filePath));

    if (!data[member.id]) data[member.id] = 0;

    data[member.id] += 1;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    const warnLevel = data[member.id];

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

    if (warnLevel === 1) {
      for (const id of warn1_roles) {
        const role = message.guild.roles.cache.get(id);
        if (role && !member.roles.cache.has(role.id))
          await member.roles.add(role);
      }
    }

    if (warnLevel === 2) {
      for (const id of warn2_roles) {
        const role = message.guild.roles.cache.get(id);
        if (role && !member.roles.cache.has(role.id))
          await member.roles.add(role);
      }
    }

    if (warnLevel === 3) {
      for (const id of warn3_roles) {
        const role = message.guild.roles.cache.get(id);
        if (role && !member.roles.cache.has(role.id))
          await member.roles.add(role);
      }
    }

    // ====== لوج التحذيرات ======

    const logChannel = message.guild.channels.cache.get("1476903403610312817");

    if (logChannel) {

      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("🚨 تحذير جديد")
        .addFields(
          { name: "👤 العضو:", value: `${member}`, inline: false },
          { name: "🛡 الإداري:", value: `${message.author}`, inline: false },
          { name: "📝 سبب التحذير:", value: reason, inline: false },
          { name: "📊 نوع التحذير:", value: `تحذير رقم ${warnLevel}`, inline: false },
          { name: "📎 الدليل:", value: proof, inline: false }
        )
        .setTimestamp();

      logChannel.send({ embeds: [embed] });
    }

    sendTemp(
      `⚠ تم إعطاء تحذير لـ ${member.user.tag}\nعدد التحذيرات: ${warnLevel}`
    );
  }
};

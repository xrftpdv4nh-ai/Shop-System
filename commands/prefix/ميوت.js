const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "ميوت",
  adminOnly: true,
  permissions: PermissionFlagsBits.ModerateMembers,
  cooldown: 10,

  async execute(message, args, client, sendTemp) {

    const member = message.mentions.members.first();

    if (!member)
      return sendTemp("❌ منشن الشخص.");

    // ⛔ حماية
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return sendTemp("❌ متقدرش تميوت حد أعلى منك.");

    // 👇 نسأل عن المدة
    const question = await message.channel.send(
      "⏳ اكتب مدة الميوت بالدقائق.\nاكتب `0` لفك الميوت.\n(عندك 30 ثانية)"
    );

    const filter = m => m.author.id === message.author.id;

    try {
      const collected = await message.channel.awaitMessages({
        filter,
        max: 1,
        time: 30000,
        errors: ["time"]
      });

      const reply = collected.first();
      const duration = parseInt(reply.content);

      await reply.delete().catch(() => {});
      await question.delete().catch(() => {});

      if (isNaN(duration))
        return sendTemp("❌ لازم تكتب رقم.");

      if (duration === 0) {
        await member.timeout(null);
        return sendTemp(`✅ تم فك الميوت عن ${member.user.tag}`);
      }

      await member.timeout(duration * 60 * 1000);

      sendTemp(`🔇 تم ميوت ${member.user.tag} لمدة ${duration} دقيقة.`);

    } catch {
      await question.delete().catch(() => {});
      sendTemp("❌ انتهى الوقت.");
    }
  }
};

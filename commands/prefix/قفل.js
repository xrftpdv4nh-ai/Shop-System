const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "قفل",
  adminOnly: true,
  permissions: PermissionFlagsBits.ManageChannels,
  cooldown: 10, // 👈 هنا

  async execute(message, args, client, sendTemp) {
    await message.channel.permissionOverwrites.edit(
      message.guild.roles.everyone,
      { SendMessages: false }
    );

    sendTemp("🔒 تم قفل الروم.");
  }
};

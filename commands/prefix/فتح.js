const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "فتح",
  adminOnly: true,
  permissions: PermissionFlagsBits.ManageChannels,
  cooldown: 10,

  async execute(message, args, client, sendTemp) {
    await message.channel.permissionOverwrites.edit(
      message.guild.roles.everyone,
      { SendMessages: true }
    );

    sendTemp("🔓 تم فتح الروم.");
  }
};

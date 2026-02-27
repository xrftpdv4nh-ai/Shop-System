const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "lock",
  adminOnly: true,
  permissions: PermissionFlagsBits.ManageChannels,

  async execute(message, args, client, sendTemp) {
    await message.channel.permissionOverwrites.edit(
      message.guild.roles.everyone,
      { SendMessages: false }
    );

    sendTemp("🔒 تم قفل الروم.");
  }
};

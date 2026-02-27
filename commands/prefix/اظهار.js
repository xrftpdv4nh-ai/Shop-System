const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "اظهار",
  adminOnly: true,
  permissions: PermissionFlagsBits.ManageChannels,
  cooldown: 10,

  async execute(message, args, client, sendTemp) {
    await message.channel.permissionOverwrites.edit(
      message.guild.roles.everyone,
      { ViewChannel: true }
    );

    sendTemp("👀 تم إظهار الروم.");
  }
};

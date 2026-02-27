const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "hide",
  adminOnly: true,
  permissions: PermissionFlagsBits.ManageChannels,
  cooldown: 10,

  async execute(message, args, client, sendTemp) {
    await message.channel.permissionOverwrites.edit(
      message.guild.roles.everyone,
      { ViewChannel: false }
    );

    sendTemp("🙈 تم إخفاء الروم.");
  }
};

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("يعرض سرعة البوت"),

  async execute(interaction, client) {
    const sent = await interaction.reply({
      content: "🏓 Pinging...",
      fetchReply: true
    });

    const latency = sent.createdTimestamp - interaction.createdTimestamp;

    await interaction.editReply(
      `🏓 Pong!\n📡 API: ${client.ws.ping}ms\n⏱ Response: ${latency}ms`
    );
  }
};

const fs = require("fs");
const { REST, Routes } = require("discord.js");

module.exports = (client) => {
  const slashCommands = [];
  const commandFiles = fs.readdirSync("./commands/slash").filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`../commands/slash/${file}`);
    client.commands.set(command.data.name, command);
    slashCommands.push(command.data.toJSON());
  }

  client.once("ready", async () => {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {
      await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: slashCommands }
      );
      console.log("✅ Slash commands loaded.");
    } catch (error) {
      console.error(error);
    }
  });

  client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      interaction.reply({ content: "❌ حصل خطأ.", ephemeral: true });
    }
  });
};

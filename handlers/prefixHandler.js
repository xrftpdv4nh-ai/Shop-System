const fs = require("fs");

module.exports = (client) => {
  const commandFiles = fs.readdirSync("./commands/prefix").filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`../commands/prefix/${file}`);
    client.prefixCommands.set(command.name, command);
  }

  client.on("messageCreate", async message => {
    if (!message.content.startsWith(client.prefix) || message.author.bot) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.prefixCommands.get(commandName);
    if (!command) return;

    // 🔒 CHECK ADMIN PERMISSION
    if (command.adminOnly) {
      if (!message.member.permissions.has(command.permissions)) {
        return message.reply("❌ معندكش صلاحية تستخدم الأمر ده.");
      }
    }

    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error(error);
      message.reply("❌ حصل خطأ.");
    }
  });
};

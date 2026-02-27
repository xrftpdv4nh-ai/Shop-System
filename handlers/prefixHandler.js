const fs = require("fs");

module.exports = (client) => {

  const cooldowns = new Map();

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

    // 🔒 صلاحيات
    if (command.adminOnly) {
      if (!message.member.permissions.has(command.permissions)) {
        const reply = await message.reply("❌ معندكش صلاحية.");
        setTimeout(() => reply.delete().catch(() => {}), 4000);
        return;
      }
    }

    // ⛔ لو الأمر عليه كول داون
    if (command.cooldown) {
      const now = Date.now();
      const cooldownAmount = command.cooldown * 1000;

      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Map());
      }

      const timestamps = cooldowns.get(command.name);

      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
          const msg = await message.reply(`⏳ استنى ${timeLeft}s.`);
          setTimeout(() => msg.delete().catch(() => {}), 4000);
          return;
        }
      }

      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    try {
      await message.delete().catch(() => {});

      const sendTemp = async (content) => {
        const msg = await message.channel.send(content);
        setTimeout(() => msg.delete().catch(() => {}), 10000);
      };

      await command.execute(message, args, client, sendTemp);

    } catch (error) {
      console.error(error);
      const err = await message.channel.send("❌ حصل خطأ.");
      setTimeout(() => err.delete().catch(() => {}), 5000);
    }

  });
};

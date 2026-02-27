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

    // 🔒 صلاحيات
    if (command.adminOnly) {
      if (!message.member.permissions.has(command.permissions)) {
        const reply = await message.reply("❌ معندكش صلاحية.");
        setTimeout(() => reply.delete().catch(() => {}), 4000);
        return;
      }
    }

    try {
      await message.delete().catch(() => {}); // 🧹 حذف رسالة الأدمن

      // 👇 بنبعت reply function جاهزة للـ command
      const sendTemp = async (content) => {
        const msg = await message.channel.send(content);
        setTimeout(() => msg.delete().catch(() => {}), 5000); // يتحذف بعد 5 ثواني
      };

      await command.execute(message, args, client, sendTemp);

    } catch (error) {
      console.error(error);
      const err = await message.channel.send("❌ حصل خطأ.");
      setTimeout(() => err.delete().catch(() => {}), 4000);
    }
  });
};

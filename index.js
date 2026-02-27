const { Client, GatewayIntentBits, Collection, Partials } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();
client.prefixCommands = new Collection();
client.prefix = "!";

// === LOAD HANDLERS ===
require("./handlers/slashHandler")(client);
require("./handlers/prefixHandler")(client);

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);

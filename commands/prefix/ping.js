module.exports = {
  name: "ping",

  async execute(message, args, client) {
    const msg = await message.reply("🏓 Pinging...");
    const latency = msg.createdTimestamp - message.createdTimestamp;

    msg.edit(`🏓 Pong!\n📡 API: ${client.ws.ping}ms\n⏱ Response: ${latency}ms`);
  }
};

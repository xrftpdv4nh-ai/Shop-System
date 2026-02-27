module.exports = {
  name: "شغال",

  async execute(message, args, client) {
    const msg = await message.reply("🏓 Pinging...");
    const latency = msg.createdTimestamp - message.createdTimestamp;

    msg.edit(`شغاال يا قلبي 👌\n📡 API: ${client.ws.ping}ms\n⏱ Response: ${latency}ms`);
  }
};

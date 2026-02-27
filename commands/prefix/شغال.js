module.exports = {
  name: "شغال",
  cooldown: 10,

  async execute(message, args, client, sendTemp) {

    sendTemp(
      `شغال يقلبي 👌\n📡 API: ${client.ws.ping}ms`
    );
  }
};

module.exports = async (client, msg, args) => {
  await msg.channel.send({
    embed: {
      color: 0xF44444,
      title: 'Discord Ping:',
      description: `
Websocket Ping: \`${client.ws.ping}ms\`
      `
    }
  })
}

const { defaultEmbedColor } = require('../Util')

module.exports = async (client, msg) => {
  await msg.channel.send({
    embed: {
      color: defaultEmbedColor,
      title: 'Discord Ping:',
      description: `
Websocket Ping: \`${client.ws.ping}ms\`
      `
    }
  })
}

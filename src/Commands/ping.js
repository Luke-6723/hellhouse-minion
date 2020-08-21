module.exports = async (client, msg, args) => {
  const timeOne = new Date()
  const message = await msg.channel.send({
    embed: {
      color: 0xF44444,
      title: 'Discord Ping:',
      description: `
Message Ping: \`...\`

Websocket Ping: \`...\`
      `
    }
  })
  const timeTwo = new Date()
  message.edit({
    embed: {
      color: 0xF44444,
      title: 'Discord Ping:',
      description: `
Message Ping: \`${timeTwo - timeOne}ms\`

Websocket Ping: \`${client.ws.ping}ms\`
      `
    }
  })
}

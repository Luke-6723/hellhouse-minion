const config = require('../config.json')

class ServerLog {
  constructor (client) {
    client.on('guildMemberAdd', (member) => {
      client.channels.cache.get(config.bot.serverLogChannel).send(`User **${member.user.tag}** joined the server. ( <@${member.user.id}> )`)
    })
    client.on('guildMemberRemove', (member) => {
      client.channels.cache.get(config.bot.serverLogChannel).send(`User **${member.user.tag}** left the server. ( <@${member.user.id}> )`)
    })
  }
}

module.exports = ServerLog

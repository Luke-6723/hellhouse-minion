const Util = require('../Util')
const botConfig = require('../config.json').bot

module.exports = async (client, msg) => {
  if (msg.author.bot) return
  const user = await Util.mongo.Users.findOne({ id: msg.author.id }).catch(() => {}) || { prefix: botConfig.prefix }
  const content = msg.content.replace(/[ ]+/g, ' ')
  const givenPrefix = content.substr(0, user.prefix.length)
  const givenCommand = content.substr(user.prefix.length).split(' ')[0]
  const commandArgs = content.substr(user.prefix.length).split(' ').splice(1)
  if (givenPrefix === user.prefix && client.commands[givenCommand]) {
    await client.commands[givenCommand](client, msg, commandArgs)
  }
}

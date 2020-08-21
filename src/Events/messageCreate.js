const Util = require('../Util')
const botConfig = require('../config.json').bot
const CommandHandler = require('../CommandHandler')
const commands = new CommandHandler()

module.exports = async (client, msg) => {
  if (msg.author.bot) return
  const user = await Util.mongo.users.findOne({ _id: msg.author.id }).catch(() => {}) || { prefix: botConfig.prefix }
  const content = msg.content.replace(/[ ]+/g, ' ')
  const givenPrefix = content.subtr(0, user.prefix.length)
  const givenCommand = content.substr(user.prefix.length).split(' ')[0]
  const commandArgs = content.substr(user.prefix.length).split(' ').splice(1)
  if (givenPrefix === user.prefix && commands[givenCommand]) {
    await commands[givenCommand](client, msg, commandArgs)
  }
}

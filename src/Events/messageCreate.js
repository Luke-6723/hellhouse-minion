const Util = require('../Util')
const botConfig = require('../config.json').bot
const levelling = require('../LevellingHandler')

module.exports = async (client, msg) => {
  if (msg.author.bot) return
  if (msg.author.id !== '116930717241311236') return
  await levelling.handleMessage(client, msg)
  const user = await Util.mongo.models.Users.findOne({ id: msg.author.id }).catch(() => {}) || { prefix: botConfig.prefix }
  const content = msg.content.replace(/[ ]+/g, ' ')
  const givenPrefix = content.substr(0, user.prefix.length)
  const givenCommand = content.substr(user.prefix.length).split(' ')[0]
  const commandArgs = content.substr(user.prefix.length).split(' ').splice(1)
  msg.prefix = givenPrefix
  if (givenPrefix === user.prefix && client.commands[givenCommand]) {
    await client.commands[givenCommand](client, msg, commandArgs)
  }
}

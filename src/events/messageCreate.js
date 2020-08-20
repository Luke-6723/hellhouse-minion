const Channel = require('../Discord/Channel')

module.exports = async (msg) => {
  if (msg.author.bot) return
  msg.client.Logger.send('MESSAGE', `Recieved message from ${msg.author.id}`)
}

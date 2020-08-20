const Channel = require('../Discord/Channel')
const redis = require('../Redis')
const config = require('../config.json')
const Util = require('../Util')

module.exports = async (msg) => {
  let channel = await redis.get(`${config.redis}:channels:${msg.channel_id}`) || new Channel(msg.client, { id: msg.channel_id, guildID: msg.guild_id })
  if (typeof channel === 'string') {
    const instance = new Channel(msg.client, { fromCache: true })
    channel = await Util.deserializeClass(instance, channel)
  }
  console.log(channel)
  if (msg.author.bot) return
  msg.client.Logger.send('MESSAGE', `Recieved message from ${msg.author.id}`)
}

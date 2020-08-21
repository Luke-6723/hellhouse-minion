const Util = require('../Util')
const botConfig = require('../config.json').bot

module.exports = async (client, msg) => {
  if (msg.author.bot) return
  const user = await Util.redis.get(`hellhouse:user:${msg.author.id}`) || await Util.mongo.users.findOne({ _id: msg.author.id }).catch(() => {}) || { prefix: botConfig.prefix }
  console.log(user)
}

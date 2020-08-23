const { Users } = require('../Mongo')
const { bot } = require('../config.json')
const { defaultEmbedColor } = require('../Util')

module.exports = async (client, msg, args) => {
  let user = await Users.findOne({ id: msg.author.id })
  const oldPrefix = user ? user.prefix || bot.prefix : bot.prefix
  if (!user) {
    user = new Users({ id: msg.author.id })
  }
  if (args.length === 0) return msg.channel.send('Invalid Syntax')
  user.prefix = args.join(' ')
  await user.save()
  await msg.channel.send({
    embed: {
      color: defaultEmbedColor,
      fields: [{
        name: 'Old Prefix',
        value: oldPrefix
      }, {
        name: 'New Prefix',
        value: args.join(' ')
      }]
    }
  })
}

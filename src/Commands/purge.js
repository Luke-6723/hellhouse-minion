const { defaultEmbedColor } = require('../Util')

exports.run = async (client, msg, args) => {
  if (!msg.member.roles.cache.map(r => r.name).includes('Moderator')) return
  if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        title: 'You don\'t have permission to perform this acction.',
        description: 'You require `MANAGE_MESSAGES` to run this command.'
      }
    })
  }
  let limit = 50
  let userToPurge = ''
  if (!args[0]) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        title: 'You must give a valid user.',
        description: `\nSyntax:\n**${msg.prefix}purge [user] [amount]**\n**${msg.prefix.replace('`', '\\`')}purge [amount]**`
      }
    })
  }
  const user = client.users.cache.get(args[0].replace(/[<@!>]/g, ''))
  if (args.length === 2) {
    if (!user) {
      return msg.channel.send({
        embed: {
          color: defaultEmbedColor,
          title: 'You must give a valid user.',
          description: `\nSyntax:\n**${msg.prefix}purge [user] [amount]**\n**${msg.prefix.replace('`', '\\`')}purge [amount]**`
        }
      })
    } else userToPurge = user.id
    const numberPurge = parseInt(args[1])
    if (isNaN(args[1] || numberPurge > 100 || numberPurge < 10)) {
      return msg.channel.send({
        embed: {
          color: defaultEmbedColor,
          title: 'You must give a valid number.',
          description: `\nSyntax:\n**${msg.prefix}purge [user] [amount]**\n**${msg.prefix.replace('`', '\\`')}purge [amount]**`
        }
      })
    } else limit = parseInt(args[1])
  } else {
    const numberPurge = parseInt(args[0])
    if (isNaN(args[1] || numberPurge < 100 || numberPurge > 10)) {
      return msg.channel.send({
        embed: {
          color: defaultEmbedColor,
          title: 'You must give a valid number.',
          description: `\nSyntax:\n**${msg.prefix}purge [user] [amount]**\n**${msg.prefix.replace('`', '\\`')}purge [amount]**`
        }
      })
    } else limit = parseInt(args[0])
  }
  const messages = await msg.channel.messages.fetch({ limit: limit })
  const filteredMessages = userToPurge ? messages.filter(m => m.author.id === userToPurge) : messages
  if (!msg.guild.me.permissions.has('MANAGE_MESSAGES')) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        title: 'I don\'t have permission to perform this acction.',
        description: 'I require `MANAGE_MESSAGES` to run this command.'
      }
    })
  } else {
    await msg.channel.bulkDelete(filteredMessages).catch(() => {
      return msg.channel.send({
        embed: {
          color: defaultEmbedColor,
          title: 'There was an error running that command.'
        }
      })
    })
    await msg.channel.send('👌')
  }
}

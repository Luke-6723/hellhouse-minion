const { defaultEmbedColor } = require('../Util')
const ModLog = require('../ModLog')

exports.run = async (client, msg, args) => {
  if (!msg.member.roles.cache.map(r => r.name).includes('Moderator')) return
  if (!msg.member.hasPermission('MANAGE_ROLES')) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        title: 'You don\'t have permission to perform this acction.',
        description: 'You require `MANAGE_ROLES` to run this command.'
      }
    })
  }
  if (!args[0]) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        description: 'Please give a user to warn'
      }
    })
  }
  const userid = args[0].replace(/[<@!>]/g, '')
  const member = msg.guild.members.cache.get(userid)
  if (!member) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        description: 'That user is not in the server.'
      }
    })
  }
  args = args.splice(1)
  if (args.length === 0) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        description: 'Please give a warning to give.'
      }
    })
  }
  const reason = args.join(' ')
  await ModLog.addWarn(client, member, msg.author, reason)
  return msg.channel.send({ embed: { color: defaultEmbedColor, description: `🔈 **Warned** ${member.user.tag} (<@${member.id}>) for:\n\n${reason}` } })
}

exports.aliases = ['w']

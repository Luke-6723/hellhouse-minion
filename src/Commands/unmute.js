const { defaultEmbedColor } = require('../Util')
const { Mutes } = require('../Mongo').models
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
        description: 'Please give a user to unmute'
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
  } else if (!member.roles.cache.find(r => r.name.toLowerCase() === 'muted')) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        description: 'That user isn\'t already muted.'
      }
    })
  }
  const reason = args.splice(1).join(' ') || undefined
  const role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
  await Mutes.deleteMany({ user_id: member.id })
  await member.roles.remove(role, `[${msg.author.tag}] ${reason}`)
  await ModLog.addUnmute(client, member.user, msg.author, reason)
  return msg.channel.send({ embed: { color: defaultEmbedColor, description: `😄 **Unmuted** ${member.user.tag} (<@${member.id}>)` } })
}

exports.aliases = ['um']

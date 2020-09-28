const { defaultEmbedColor } = require('../Util')
const ModLog = require('../ModLog')

module.exports = async (client, msg, args) => {
  if (!msg.member.roles.cache.map(r => r.name).includes('Moderator')) return
  if (!msg.member.hasPermission('KICK_MEMBERS')) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        title: 'You don\'t have permission to perform this acction.',
        description: 'You require `KICK_MEMBERS` to run this command.'
      }
    })
  }
  if (!args[0]) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        description: 'Please give a user to kick'
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
  const reason = args.splice(1).join(' ') || undefined
  await member.kick(`[${msg.author.tag}] ${reason}`)
  await ModLog.addKick(client, member, msg.author, reason)
  return msg.channel.send({ embed: { color: defaultEmbedColor, description: `👢 **Kicked** ${member.user.tag} (<@${member.id}>)` } })
}

exports.aliases = ['k']

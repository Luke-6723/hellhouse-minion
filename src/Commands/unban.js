const { defaultEmbedColor } = require('../Util')

module.exports = async (client, msg, args) => {
  if (!msg.member.roles.cache.map(r => r.name).includes('Moderator')) return
  if (!msg.member.hasPermission('BAN_MEMBERS')) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        title: 'You don\'t have permission to perform this acction.',
        description: 'You require `BAN_MEMBERS` to run this command.'
      }
    })
  }
  if (!args[0]) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        description: 'Please give a user to unban'
      }
    })
  }
  const userid = args[0].replace(/[<@!>]/, '')
  const user = await client.users.fetch(userid)
  const reason = args.splice(1).join(' ') || undefined
  await msg.guild.members.unban(userid, `[${msg.author.tag}] ${reason}`)
  return msg.channel.send({ embed: { color: defaultEmbedColor, description: `🔓 **Unbanned** ${user.tag} (<@${user.id}>)` } })
}

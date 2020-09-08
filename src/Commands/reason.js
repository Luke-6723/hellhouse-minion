const { defaultEmbedColor } = require('../Util')
const ModLog = require('../ModLog')

module.exports = async (client, msg, args) => {
  if (!msg.member.roles.cache.map(r => r.name).includes('Moderator')) return
  if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
    return msg.channel.send({
      embed: {
        color: this.client.color,
        title: 'You don\'t have permission to perform this acction.',
        description: 'You require `MANAGE_MESSAGES` to run this command.'
      }
    })
  }
  if (!args[0]) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        description: 'Please give a reason'
      }
    })
  }
}

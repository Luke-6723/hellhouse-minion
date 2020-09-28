const { defaultEmbedColor } = require('../Util')
const ModLog = require('../ModLog')

exports.run = async (client, msg, args) => {
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
        description: 'Please give a case to update'
      }
    })
  }
  const caseId = Number(args[0])
  if (isNaN(caseId)) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        description: 'Please give a case to update'
      }
    })
  }
  ModLog.updateEmbed(client, caseId, args.splice(1).join(' ')).then(async () => {
    await msg.delete()
  })
}

exports.aliases = ['r']

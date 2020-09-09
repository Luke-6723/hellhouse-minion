const { defaultEmbedColor } = require('../Util')
const { Mutes } = require('../Mongo').models
const ModLog = require('../ModLog')

module.exports = async (client, msg, args) => {
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
        description: 'Please give a user to mute'
      }
    })
  }
  let unmuteDate
  const userid = args[0].replace(/[<@!>]/g, '')
  const member = msg.guild.members.cache.get(userid)
  if (!member) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        description: 'That user is not in the server.'
      }
    })
  } else if (member.roles.cache.find(r => r.name.toLowerCase() === 'muted')) {
    return msg.channel.send({
      embed: {
        color: defaultEmbedColor,
        description: 'That user is already muted.'
      }
    })
  }
  const reason = args.splice(1).join(' ') || undefined
  const reasonSplit = reason ? reason.split('|') : []
  let timeToMute = 0
  if (reasonSplit.length > 1) {
    const timeWithoutSpaces = reasonSplit[1].replace(/[ ]/g, '')
    const timeSplitNumbers = timeWithoutSpaces.split(/(\d+[aA-zZ]+)/)
    timeSplitNumbers.forEach(n => {
      const number = n.replace(/[aA-zZ]/g, '')
      if (!number) return
      const timeFrame = n.replace(/[0-9]/g, '')
      if (['weeks', 'w', 'week'].includes(timeFrame.toLowerCase())) timeToMute += (parseInt(number) * 604800)
      if (['days', 'd', 'day'].includes(timeFrame.toLowerCase())) timeToMute += (parseInt(number) * 86400)
      if (['hours', 'hrs', 'hr', 'h', 'hour'].includes(timeFrame.toLowerCase())) timeToMute += (parseInt(number) * 3600)
      if (['min', 'mins', 'm', 'minutes', 'minute'].includes(timeFrame.toLowerCase())) timeToMute += (parseInt(number) * 60)
      if (['sec', 'secs', 's', 'seconds', 'second'].includes(timeFrame.toLowerCase())) timeToMute += (parseInt(number) * 1)
    })
  }
  let unmuteAt = ''
  if (timeToMute > 0) {
    const now = Date.now()
    unmuteDate = new Date(now + (timeToMute * 1000))
    unmuteAt = `Unmute at: ${unmuteDate.getUTCFullYear()}-${unmuteDate.getUTCMonth() + 1}-${unmuteDate.getUTCDate()} ${unmuteDate.getUTCHours()}:${unmuteDate.getUTCMinutes()} UTC `
  }
  const role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
  await member.roles.add(role, `[${msg.author.tag}] ${reason}`)
  const modLogCase = await ModLog.addMute(client, member.user, msg.author, reason, unmuteAt)
  if (unmuteDate) {
    await Mutes.create({
      modLogCaseID: modLogCase,
      user_id: member.id,
      unmuteTime: unmuteDate
    })
  }
  return msg.channel.send({ embed: { color: defaultEmbedColor, description: `🤐 **Muted** ${member.user.tag} (<@${member.id}>)` } })
}

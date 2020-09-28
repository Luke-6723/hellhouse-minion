const { ModLogs, Mutes } = require('../Mongo').models
const { modLogChannel } = require('../config.json').bot

const modlogColors = {
  ban: 14495300,
  kick: 16433420,
  mute: 16433420,
  warn: 16433420,
  unmute: 581126,
  unban: 581126,
  test: 255
}

exports.updateEmbed = async (client, caseId, newReason) => {
  const modLogCase = await ModLogs.findOne({ case: caseId })
  if (!modLogCase) return undefined
  const modLogMessage = await client.channels.cache.get(modLogChannel).messages.fetch(modLogCase.message_id)
  if (!modLogMessage) return undefined
  let unmuteAt = ''

  if (modLogCase.action === 'Mute') {
    const reasonSplit = newReason ? newReason.split('|') : []
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
    if (timeToMute > 0) {
      const messageCreation = new Date(modLogMessage.createdAt)
      const unmuteDate = new Date((messageCreation - 1) + (timeToMute * 1000))
      unmuteAt = `Unmute at: ${unmuteDate.getUTCFullYear()}-${(unmuteDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${unmuteDate.getUTCDate().toString().padStart(2, '0')} ${unmuteDate.getUTCHours().toString().padStart(2, '0')}:${unmuteDate.getUTCMinutes().toString().padStart(2, '0')} UTC `
      const unmuteTime = await Mutes.findOne({ user_id: modLogCase.user_id })
      if (unmuteTime) {
        unmuteTime.unmuteTime = unmuteDate
        await unmuteTime.save()
      }
    }
  }

  modLogMessage.embeds[0].fields[2].value = newReason
  if (modLogMessage.embeds[0].footer) modLogMessage.embeds[0].footer.text = unmuteAt
  modLogCase.reason = newReason
  await modLogCase.save()
  return modLogMessage.edit(modLogMessage.embeds[0])
}

const sendEmbed = async (client, caseid, action, target, moderator, reason, unmuteAt) => {
  const userWarnings = await ModLogs.find({ user_id: target.id, action: 'Warn' })
  const channel = client.channels.cache.get(modLogChannel) || await client.channels.fetch(modLogChannel)
  const warnText = action === 'Warn' && userWarnings ? `(Total Warnings: ${userWarnings.length + 1})` : ''
  const message = await channel.send({
    embed: {
      title: `${action} | Case #${caseid}`,
      color: modlogColors[action.toLowerCase()] || 255,
      fields: [
        {
          name: 'User',
          value: `${target.tag} (<@!${target.id}>)`,
          inline: true
        },
        {
          name: 'Moderator',
          value: `${moderator.tag} (<@!${moderator.id}>)`,
          inline: true
        },
        {
          name: 'Reason',
          value: `${reason} ${warnText}` || `No reason provided. ${warnText}`,
          inline: false
        }
      ],
      footer: {
        text: unmuteAt || ''
      },
      timestamp: Date.now()
    }
  })
  return message
}

exports.addBan = async (client, user, moderator, reason) => {
  const caseId = (await ModLogs.find({})).length + 1
  if (!reason) reason = `No reason provided.\n\`Moderator please do -reason ${caseId} <reason>\``
  const modlogMessage = await sendEmbed(client, caseId, 'Ban', user, moderator, reason)
  const modlogCase = new ModLogs({ case: caseId, action: 'Ban', moderator_id: moderator.id, user_id: user.id, reason: reason, message_id: modlogMessage.id })
  await modlogCase.save()
}

exports.addUnban = async (client, user, moderator, reason) => {
  const caseId = (await ModLogs.find({})).length + 1
  if (!reason) reason = `No reason provided.\n\`Moderator please do -reason ${caseId} <reason>\``
  const modlogMessage = await sendEmbed(client, caseId, 'Unban', user, moderator, reason)
  const modlogCase = new ModLogs({ case: caseId, action: 'Unban', moderator_id: moderator.id, user_id: user.id, reason: reason, message_id: modlogMessage.id })
  await modlogCase.save()
}

exports.addUnmute = async (client, user, moderator, reason, unmuteAt) => {
  const caseId = (await ModLogs.find({})).length + 1
  if (!reason) reason = `No reason provided.\n\`Moderator please do -reason ${caseId} <reason>\``
  const modlogMessage = await sendEmbed(client, caseId, 'Unmute', user, moderator, reason)
  const modlogCase = new ModLogs({ case: caseId, action: 'Unmute', moderator_id: moderator.id, user_id: user.id, reason: reason, message_id: modlogMessage.id })
  await modlogCase.save()
}

exports.addMute = async (client, user, moderator, reason, unmuteAt) => {
  const caseId = (await ModLogs.find({})).length + 1
  if (!reason) reason = `No reason provided.\n\`Moderator please do -reason ${caseId} <reason>\``
  const modlogMessage = await sendEmbed(client, caseId, 'Mute', user, moderator, reason, unmuteAt)
  const modlogCase = new ModLogs({ case: caseId, action: 'Mute', moderator_id: moderator.id, user_id: user.id, reason: reason, message_id: modlogMessage.id })
  await modlogCase.save()
  return caseId
}

exports.addKick = async (client, user, moderator, reason) => {
  const caseId = (await ModLogs.find({})).length + 1
  if (!reason) reason = `No reason provided.\n\`Moderator please do -reason ${caseId} <reason>\``
  const modlogMessage = await sendEmbed(client, caseId, 'Kick', user, moderator, reason)
  const modlogCase = new ModLogs({ case: caseId, action: 'Kick', moderator_id: moderator.id, user_id: user.id, reason: reason, message_id: modlogMessage.id })
  await modlogCase.save()
}

exports.addWarn = async (client, user, moderator, reason) => {
  const caseId = (await ModLogs.find({})).length + 1
  if (!reason) reason = `No reason provided.\n\`Moderator please do -reason ${caseId} <reason>\``
  const modlogMessage = await sendEmbed(client, caseId, 'Warn', user, moderator, reason)
  const modlogCase = new ModLogs({ case: caseId, action: 'Warn', moderator_id: moderator.id, user_id: user.id, reason: reason, message_id: modlogMessage.id })
  await modlogCase.save()
}

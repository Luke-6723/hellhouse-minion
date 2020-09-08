const { ModLogs } = require('../Mongo').models
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
  const modlogMessage = await sendEmbed(client, caseId, 'Ban', user, moderator, reason)
  const modlogCase = new ModLogs({ case: caseId, action: 'Ban', moderator_id: moderator.id, user_id: user.id, reason: reason, message_id: modlogMessage.id })
  await modlogCase.save()
}

exports.addUnban = async (client, user, moderator, reason) => {
  const caseId = (await ModLogs.find({})).length + 1
  const modlogMessage = await sendEmbed(client, caseId, 'Unban', user, moderator, reason)
  const modlogCase = new ModLogs({ case: caseId, action: 'Unban', moderator_id: moderator.id, user_id: user.id, reason: reason, message_id: modlogMessage.id })
  await modlogCase.save()
}

exports.addUnmute = async (client, user, moderator, reason, unmuteAt) => {
  const caseId = (await ModLogs.find({})).length + 1
  const modlogMessage = await sendEmbed(client, caseId, 'Unmute', user, moderator, reason)
  const modlogCase = new ModLogs({ case: caseId, action: 'Unmute', moderator_id: moderator.id, user_id: user.id, reason: reason, message_id: modlogMessage.id })
  await modlogCase.save()
}

exports.addMute = async (client, user, moderator, reason, unmuteAt) => {
  const caseId = (await ModLogs.find({})).length + 1
  const modlogMessage = await sendEmbed(client, caseId, 'Mute', user, moderator, reason, unmuteAt)
  const modlogCase = new ModLogs({ case: caseId, action: 'Mute', moderator_id: moderator.id, user_id: user.id, reason: reason, message_id: modlogMessage.id })
  await modlogCase.save()
}

exports.addKick = async (client, user, moderator, reason) => {
  const caseId = (await ModLogs.find({})).length + 1
  const modlogMessage = await sendEmbed(client, caseId, 'Kick', user, moderator, reason)
  const modlogCase = new ModLogs({ case: caseId, action: 'Kick', moderator_id: moderator.id, user_id: user.id, reason: reason, message_id: modlogMessage.id })
  await modlogCase.save()
}

exports.addWarn = async (client, user, moderator, reason) => {
  const caseId = (await ModLogs.find({})).length + 1
  const modlogMessage = await sendEmbed(client, caseId, 'Warn', user, moderator, reason)
  const modlogCase = new ModLogs({ case: caseId, action: 'Warn', moderator_id: moderator.id, user_id: user.id, reason: reason, message_id: modlogMessage.id })
  await modlogCase.save()
}

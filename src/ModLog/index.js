const { ModLogs } = require('../Mongo').models
const { modLogChannel } = require('../config.json').bot

const sendEmbed = async (client, caseid, action, target = { mention: '', id: '' }, moderator = { mention: '', id: '' }, reason) => {
  client.channels.cache.get(modLogChannel)
}

exports.addBan = async (client, msg, user, moderator, reason) => {
  const caseId = (await ModLogs.find({})).length + 1
  const modlogMessage = await sendEmbed(client, caseId, 'BAN', user, moderator, reason)
  const modlogCase = new ModLogs({
    case: caseId,
    action: 'BAN',
    moderator_id: moderator.id,
    user_id: user.id,
    reason: reason,
    message_id: modlogMessage.id
  })
  await modlogCase.save()
}

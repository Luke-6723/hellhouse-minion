const { Users } = require('../Mongo').models

module.exports = async (guild, user) => {
  const userDoc = await Users.findOne({ id: user.id })
  userDoc.votes.totalVotes++
  userDoc.votes.lastVoted = Date.now()
  await userDoc.save()
}

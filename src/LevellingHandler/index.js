const { Users } = require('../Mongo').models
const moment = require('moment')
const { bot } = require('../config.json')

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getUserPerk (member, userData) {
  const userMultipliers = userData.multipliers
  const roles = member.roles.cache.map(r => r.name)
  if (userMultipliers.levelUp) return 'timesTwoMultiplier'
  else if (roles.includes('Supporter') || roles.includes('Super Supporter') || roles.includes('Epic Supporter') || roles.includes('VIP')) return 'patron'
  else if (member.premiumSinceTimestamp) return 'booster'
  else return 'default'
}

exports.handleMessage = async (client, msg) => {
  const userid = msg.author.id
  const user = await Users.findOne({ id: userid }) || new Users({ id: userid })
  const xpNeeded = ((user.stats.level * 265) * 6)
  const xpToGiveVariants = {
    default: getRandomInt(4, 12),
    booster: getRandomInt(6, 14),
    patron: getRandomInt(10, 18),
    timesTwoMultiplier: getRandomInt(8, 24),
    dev: getRandomInt(500, 1000)
  }
  const now = moment(Date.now())
  const lastXpGain = moment(user.stats.lastXpGain)
  const xpToGive = xpToGiveVariants[getUserPerk(msg.member, user)]
  if ((lastXpGain.unix() - now.unix()) < -60) {
    const xpAfter = user.stats.xp + xpToGive
    user.stats.total += xpToGive
    if (xpAfter > xpNeeded) {
      user.stats.xp = (user.stats.xp + xpToGive) - xpNeeded
      user.stats.level++
      user.stats.lastXpGain = Date.now()
      user.bank.coins += user.stats.level * 50
      if (user.settings.levelUpMentions) {
        await client.channels.cache.get(bot.levelUpLog).send(`<@${msg.author.id}> just levelled up! **Level ${user.stats.level}!** [+${user.stats.level * 50} Coins]`)
      } else {
        await client.channels.cache.get(bot.levelUpLog).send(`${msg.author.username}#${msg.author.discriminator} just levelled up => **Level ${user.stats.level}!** [+${user.stats.level * 50} Coins]`)
          .then(async newMessage => {
            await newMessage.edit(`<@${msg.author.id}> just levelled up! **Level ${user.stats.level}!** [+${user.stats.level * 50} Coins]`)
          })
      }
    } else {
      user.stats.xp += xpToGive
      user.stats.lastXpGain = Date.now()
    }
    await user.save()
  }
}

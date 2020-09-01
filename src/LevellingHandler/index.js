const { Users } = require('../Mongo').models
const moment = require('moment')
const { bot } = require('../config.json')

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

exports.handleMessage = async (client, msg) => {
  const userid = msg.author.id
  const user = await Users.findOne({ id: userid }) || new Users({ id: userid })
  const xpNeeded = ((user.stats.level * 265) * 6)
  const xpToGiveVariants = {
    default: getRandomInt(4, 12),
    booster: getRandomInt(6, 14),
    patron: getRandomInt(10, 18),
    timeTwoMultiplier: getRandomInt(8, 24),
    dev: getRandomInt(500, 1000)
  }
  const now = moment(Date.now())
  const lastXpGain = moment(user.stats.lastXpGain)
  const xpToGive = xpToGiveVariants.dev
  if ((lastXpGain.unix() - now.unix()) < 0) {
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
    console.log(`Level ${user.stats.level} | XP: ${user.stats.xp}/${xpNeeded} | Just gained: ${xpToGive.dev}XP | Coins: ${user.bank.coins}`)
    await user.save()
  }
}

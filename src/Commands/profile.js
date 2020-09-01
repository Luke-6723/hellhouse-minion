// █
const { Users } = require('../Mongo').models
const { defaultEmbedColor } = require('../Util')

module.exports = async (client, msg) => {
  const user = await Users.findOne({ id: msg.author.id })
  const xpNeeded = ((user.stats.level * 265) * 6)
  const levelProgress = (user.stats.xp / xpNeeded) * 100
  const message = {
    author: {
      name: `${msg.author.tag}'s profile`,
      icon_url: msg.author.avatarURL()
    },
    color: user.profile.colorScheme || defaultEmbedColor,
    description: `
${user.profile.description}
 
Level: \`${user.stats.level}\`
XP: \`${user.stats.xp} / ${xpNeeded} (${levelProgress.toFixed(1)}%)\`
Next Level: \`${xpNeeded - user.stats.xp}XP to go! ${user.stats.level} [${'█'.repeat(Math.floor(levelProgress / 10)).padEnd(10, '-')}] ${user.stats.level + 1}\`

`,
    image: {
      url: user.profile.background
    }
  }
  await msg.channel.send({ embed: message })
}

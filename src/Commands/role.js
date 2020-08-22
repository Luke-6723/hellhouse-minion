const { customRoles, defaultEmbedColor } = require('../Util')

module.exports = async (client, msg, args) => {
  if (args.length <= 0) return msg.channel.send('Available options: `add`, `remove`')
  if (args.length >= 1) {
    switch (args[0]) {
      case 'add': {
        if (customRoles[args[1]]) {
          const roleIDs = Object.values(customRoles)
          roleIDs.forEach(async rID => {
            if (rID !== customRoles[args[1]] && msg.member.roles.cache.map(r => r.id).includes(rID)) {
              await msg.member.roles.remove(rID)
            }
          })
          if (msg.member.roles.cache.map(r => r.id).includes(customRoles[args[1]])) {
            return msg.channel.send(`<@${msg.author.id}>, You already have that role!`).then(msg => msg.delete({ timeout: 2000 }))
          }
          await msg.member.roles.add(customRoles[args[1]])
          await msg.channel.send(`<@${msg.author.id}>, You have been given the role \`${args[1]}\``).then(msg => msg.delete({ timeout: 2000 }))
        } else { msg.channel.send(`Available roles: ${Object.keys(customRoles).map(r => `\`${r}\``).join(', ')}`) }
        break
      }
      case 'remove': {
        if (customRoles[args[1]]) {
          if (!msg.member.roles.cache.map(r => r.id).includes(customRoles[args[1]])) {
            return msg.channel.send(`<@${msg.author.id}>, You don't have that role!`).then(msg => msg.delete({ timeout: 2000 }))
          }
          await msg.member.roles.remove(customRoles[args[1]])
          await msg.channel.send(`<@${msg.author.id}>, You have had the role \`${args[1]}\` removed from you!`).then(msg => msg.delete({ timeout: 2000 }))
        } else { msg.channel.send(`Available roles: ${Object.keys(customRoles).map(r => `\`${r}\``)}`).join(', ') }
      }
    }
  }
}

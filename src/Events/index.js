const Logger = require('../Logger')
const log = new Logger('HANDLER')
const { Mutes } = require('../Mongo').models
const config = require('../config.json').bot
const ModLog = require('../ModLog')
const eventHandlers = {
  messageCreate: require('./messageCreate'),
  userVote: require('./userVote')
}

class Events {
  constructor (client) {
    this.client = client
    this.logEvent = new Logger(' EVENT ')
    this.client.DSLHook.on('vote', eventHandlers.userVote)
    this.client.on('ready', () => this.logEvent.send('DISCRDWS', 'Logged in as', this.client.user.tag))
    this.client.on('message', (msg) => { eventHandlers.messageCreate(this.client, msg) })

    this.client.runUnmuteCheck = async () => {
      const allMutes = await Mutes.find({})
      allMutes.forEach(async (mute) => {
        const unmuteTime = new Date(mute.unmuteTime)
        if ((Date.now() - unmuteTime) >= 0) {
          const guild = this.client.guilds.cache.get(config.guildID)
          const role = guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
          const member = guild.members.cache.get(mute.user_id)
          if (member && member.roles.cache.find(r => r.name.toLowerCase() === 'muted')) {
            await member.roles.remove(role)
          }
          let user
          if (!member || !member.user) {
            user = this.client.users.fetch(mute.user_id)
          }
          await ModLog.addUnmute(this.client, member.user || user, this.client.user, `Time's up (Case #${mute.modLogCaseID})`)
          await Mutes.deleteMany({ user_id: mute.user_id })
          log.send('-UNMUTED', `Unmuted ${member ? member.user.tag : user.tag}.`)
        }
      })
    }
    const boundFunc = this.client.runUnmuteCheck.bind(client)
    this.client.unmuteInterval = setInterval(boundFunc, 1000)
  }
}

module.exports = Events

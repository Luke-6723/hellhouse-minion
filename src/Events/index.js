const Logger = require('../Logger')
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
  }
}

module.exports = Events

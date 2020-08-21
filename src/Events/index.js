const Logger = require('../Logger')
const eventHandlers = {
  messageCreate: require('./messageCreate')
}

class Events {
  constructor (client) {
    this.logEvent = new Logger('EVENT')
    this.client = client
    this.client.on('ready', () => this.logEvent.send('READY', 'Logged in as', this.client.user.tag))
    this.client.on('message', (msg) => { eventHandlers.messageCreate(this.client, msg) })
  }
}

module.exports = Events

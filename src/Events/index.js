const Logger = require('../Logger')

class Events {
  constructor (client) {
    this.logEvent = new Logger('EVENT')
    this.client = client

    this.client.on('ready', () => this.logEvent.send('READY', 'Logged in as', this.client.user.tag))
  }
}

module.exports = Events

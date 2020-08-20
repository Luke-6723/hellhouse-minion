const Client = require('./Client')
const botConfig = require('./config.json').bot
const events = require('./Events')

const client = new Client(botConfig)

client.on('message', events.message)

client.on('ready', () => {
  console.log('Ready')
})

client.login()

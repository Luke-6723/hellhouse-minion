const discord = require('discord.js')
const botConfig = require('./config.json').bot
const events = require('./Events')

const client = new discord.Client()

client.on('message')

client.on('ready', () => {
  client.Logger.send('STATUS', 'Ready')
})

client.login()

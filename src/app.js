const discord = require('discord.js')
const botConfig = require('./config.json').bot
const Events = require('./Events')
const Logger = require('./Logger')
const CommandHandler = require('./CommandHandler')

class HellhouseMinion {
  constructor () {
    this.logger = new Logger('CLIENT')
    this.client = new discord.Client()
    this.client.commands = new CommandHandler()
    this.events = new Events(this.client)
  }

  async login () {
    await this.client.login(botConfig.token)
  }
}

new HellhouseMinion().login()

const discord = require('discord.js')
const botConfig = require('./config.json').bot
const Events = require('./Events')
const Logger = require('./Logger')

class HellhouseMinion {
  constructor () {
    this.client = new discord.Client()
    this.logger = new Logger('CLIENT')
    this.events = new Events(this.client)
  }

  async login () {
    await this.client.login(botConfig.token)
  }
}

new HellhouseMinion().login()

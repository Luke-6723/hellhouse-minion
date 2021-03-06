const discord = require('discord.js')
const botConfig = require('./config.json').bot
const Events = require('./Events')
const Logger = require('./Logger')
const CommandHandler = require('./CommandHandler')
const DSLHook = require('./DSLHook')
const ServerLog = require('./ServerLog')

class HellhouseMinion {
  constructor () {
    this.logger = new Logger('CLIENT')
    this.client = new discord.Client({
      presence: {
        status: 'invisible'
      },
      fetchAllMembers: true
    })
    this.client.commands = new CommandHandler()
    this.client.DSLHook = new DSLHook(this.client)
    this.client.ServerLog = new ServerLog(this.client)
  }

  async login () {
    await this.client.login(botConfig.token)
    this.events = new Events(this.client)
  }
}

new HellhouseMinion().login()

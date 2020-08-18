import * as discord from 'discord.js'
import * as config from './config.json'

class HellhouseMinion {
  constructor () {
    this.client = new discord.Client()
  }

  async login () {
    this.client.login(config.bot.token)
  }
}

HellhouseMinion.login()

const fetch = require('node-fetch')
const Util = require('../Util')
const { discord, bot } = require('../config.json')

class Channel {
  constructor (client, options = { id: '', name: '', channelType: 0, guildID: '' }) {
    this.client = client
    this.id = options.id
    this.name = options.name
    this.guild = options.guildID
    this.channelType = Util.channelTypes[this.channelType]
  }

  async send (msg) {
    let body
    if (typeof msg === 'string') body = { content: msg }
    else body = msg

    body = JSON.stringify(body)

    await fetch(`${discord.discordApiUrl}/${discord.apiVersion}/channels/${this.id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${bot.token}`
      },
      body: body
    }).then(async messagePost => {
      if (messagePost.status === 429) {
        const response = await messagePost.json()
        const sendFunc = this.send.bind(this)
        this.client.Logger.error('RATELIMIT', 'We are being ratelimited. Retrying after', response.retry_after + 'ms', `[GLOBAL: ${response.global ? 'Yes' : 'No'}]`)
        setTimeout(async () => { sendFunc(msg) }, response.retry_after)
      }
    })
  }
}

module.exports = Channel

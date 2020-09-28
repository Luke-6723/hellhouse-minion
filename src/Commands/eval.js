const { defaultEmbedColor } = require('../Util')
const { token } = require('../config.json').bot
const fetch = require('node-fetch')

const clean = text => {
  if (typeof (text) === 'string') { return text.replace(token, '[TOKEN REDACTED]').replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) } else { return text }
}

exports.run = async (client, msg, args) => {
  if (msg.author.id !== '116930717241311236') return
  const code = args.join(' ')
  try {
    /* eslint-disable no-eval */
    let evaled = await eval(code)
    if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled, true, 0) }
    const embed = {
      color: defaultEmbedColor,
      fields: [
        {
          name: 'Input',
          value: '```xl\n' + code + '```'
        },
        {
          name: 'Output',
          value: '```xl\n' + clean(evaled) + '```'
        }
      ]
    }
    await msg.channel.send({ embed: embed }).catch(async err => {
      if (err.message === 'Invalid Form Body\nembed.fields[1].value: Must be 1024 or fewer in length.') {
        const cleanOut = clean(evaled)
        const body = cleanOut
        const _res = await fetch('https://img.ichigo.uk/botupload', {
          method: 'post',
          headers: {
            'Content-Type': 'text/plain',
            botoutput: 'true',
            key: 'YellAtMeIDareYou'
          },
          body: body
        })
        const res = await _res.json()
        msg.channel.send({
          embed: {
            color: defaultEmbedColor,
            description: `Output to long for discord. [Click here for the output](${res.url})`
          }
        })
      }
    })
  } catch (err) {
    const embed = {
      color: defaultEmbedColor,
      fields: [
        {
          name: 'Input',
          value: '```xl\n' + code + '```'
        },
        {
          name: 'Error',
          value: '```xl\n' + clean(err) + '```'
        }
      ]
    }
    await msg.channel.send({ embed: embed }).catch(async err => {
      if (err.message === 'Invalid Form Body\nembed.fields[1].value: Must be 1024 or fewer in length.') {
        const cleanOut = clean(err)
        const body = cleanOut
        const _res = await fetch('https://img.ichigo.uk/botupload', {
          method: 'post',
          headers: {
            'Content-Type': 'text/plain',
            botoutput: 'true',
            key: 'YellAtMeIDareYou'
          },
          body: body
        }).catch(console.log)
        const res = await _res.json()
        msg.channel.send({
          embed: {
            color: defaultEmbedColor,
            description: `Output to long for discord. [Click here for the output](${res.url})`
          }
        })
      } else {
        console.log(err)
      }
    })
  }
}

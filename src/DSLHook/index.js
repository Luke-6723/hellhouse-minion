const { dsl } = require('../config.json')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { EventEmitter } = require('events')
const Logger = require('../Logger')
const log = new Logger('DSLHOOK')

class DSLHook extends EventEmitter {
  constructor (client) {
    super()
    this.client = client
    // support parsing of application/json type post data
    app.use(bodyParser.json())
    // support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
      res.status(200).json({ message: 'Hello world' })
    })

    app.post('/webhook', async (req, res) => {
      const data = req.body
      const user = this.client.users.cache.get(data.user) || await this.client.users.fetch(data.user)
      this.emit('vote', data.guild, user)
      log.send('USERVOTE', `${user.tag} voted.`)
      res.status(200).send('OK')
    })

    app.listen(dsl.port, dsl.ip, () => {
      console.log(`Listening on: ${dsl.ip}:${dsl.port}`)
    })
  }
}

module.exports = DSLHook

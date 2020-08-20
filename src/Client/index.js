const { connect } = require('amqplib/callback_api')
const { EventEmitter } = require('events')
const Logger = require('../Logger')

class Client extends EventEmitter {
  constructor (config = { amqpUser: '', amqpPass: '', amqpHost: '', amqpPrefix: '' }) {
    super()
    this.config = config
    this.Logger = new Logger('CLIENT')
    this.queuePrefix = `${config.amqpPrefix}`
    this.events = {
      MESSAGE_CREATE: 'message'
    }
  }

  async login () {
    // Connect to the message broker
    connect(`amqp://${this.config.amqpUser}:${this.config.amqpPass}@${this.config.amqpHost}`, (_, conn) => {
      /**
       * @name MESSAGE_DELETE
       */
      conn.createChannel((_, ch) => {
        ch.assertQueue(`${this.queuePrefix}:MESSAGE_DELETE`, { durable: true })
        ch.consume(`${this.queuePrefix}:MESSAGE_DELETE`, (message) => {
          const parsedMessage = JSON.parse(message.content)
          this.emit('messageDelete', { client: this, ...parsedMessage })
        }, { noAck: true })
      })
      /**
       * @name MESSAGE_CREATE
       */
      conn.createChannel((_, ch) => {
        ch.assertQueue(`${this.queuePrefix}:MESSAGE_CREATE`, { durable: true })
        ch.consume(`${this.queuePrefix}:MESSAGE_CREATE`, (message) => {
          const parsedMessage = JSON.parse(message.content)
          this.emit('message', { client: this, ...parsedMessage })
        }, { noAck: true })
      })
    })
  }
}

module.exports = Client

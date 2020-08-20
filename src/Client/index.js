const { connect } = require('amqplib/callback_api')
const { EventEmitter } = require('events')
const Logger = require('../Logger')

class Client extends EventEmitter {
  constructor (config = { amqpUser: '', amqpPass: '', amqpHost: '', amqpPrefix: '' }) {
    super()
    this.config = config
    this.Logger = new Logger('CLIENT')
    this.queueName = `${config.amqpPrefix}:SEND`
    this.events = {
      MESSAGE_CREATE: 'message'
    }
  }

  async login () {
    // Connect to the message broker
    connect(`amqp://${this.config.amqpUser}:${this.config.amqpPass}@${this.config.amqpHost}`, (_, conn) => {
      // Create the channel to revieve messages from
      conn.createChannel((_, ch) => {
        // Assert the queue
        ch.assertQueue(this.queueName, { durable: true })
        this.emit('ready')
        // Start consuming incoming events
        ch.consume(this.queueName, (message) => {
          // Parse buffer
          const parsedMessage = JSON.parse(message.content)
          // Emit the event
          this.emit(this.events[message.fields.routingKey] || 'debug', { client: this, ...parsedMessage })
        }, { noAck: true })
      })
    })
  }
}

module.exports = Client

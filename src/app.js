const config = require('./config.json')
const amqp = require('amqplib/callback_api')

// Set the queue name
const queueName = `${config.bot.amqpPrefix}:SEND`

// Connect to the message broker
amqp.connect(`amqp://${config.bot.amqpUser}:${config.bot.amqpPass}@${config.bot.amqpHost}`, (_, conn) => {
  // Create the channel to revieve messages from
  conn.createChannel((_, ch) => {
    // Assert the queue
    ch.assertQueue(queueName, { durable: true })
    console.log('Waiting...')
    // Start consuming incoming events
    ch.consume(queueName, (message) => {
      // Output result to console
      console.log('Recieved:\n', JSON.parse(message.content))
    }, { noAck: true })
  })
})

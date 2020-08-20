const redis = require('redis')
const config = require('../config.json')
const { promisify } = require('util')

// DB 0 - Session handling, DB 1 - Other stuff DB 2 Bot
const client = redis.createClient({ host: config.redis.host, port: config.redis.port, password: config.redis.password, db: 1 });

['get', 'set', 'del', 'ttl'].forEach(command => {
  client[command] = promisify(client[command]).bind(client)
})

module.exports = client

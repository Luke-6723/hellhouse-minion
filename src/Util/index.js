const Redis = require('redis')
const { promisify } = require('util')
const { redisHost, redisPass } = require('../config.json').redis
const { database } = require('../config.json')
const mongoose = require('mongoose')
const Logger = require('../Logger')
const log = new Logger('UTILS')

// DB 0 - Session handling, DB 1 - Other stuff DB 2 Bot
const redisClient = Redis.createClient({ host: redisHost, port: '6379', password: redisPass, db: 1 })
const commands = ['get', 'set', 'del', 'ttl']
commands.forEach(command => { redisClient[command] = promisify(redisClient[command]).bind(redisClient) })
redisClient.on('ready', () => { log.send('REDIS', 'Connected') })

const mongo = mongoose.connect(`mongodb://${database.mongoIp}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    user: database.mongoUser,
    password: database.mongoPass
  },
  authSource: 'admin',
  dbName: database.mongoDbName
}).then(() => { log.send('MONGO', 'connected') })

exports.channelTypes = {
  0: 'TEXT'
}

exports.serializeClass = async function (instance) {
  return JSON.stringify(instance)
}

exports.deserializeClass = async function (instance, obj) {
  var serializedObject = await JSON.parse(obj)
  await Object.assign(instance, serializedObject)
  instance.cached = true
  return instance
}

exports.redis = redisClient
exports.mongo = mongo

const { database } = require('../config.json')
const mongoose = require('mongoose')
const models = require('../Mongo')
const Logger = require('../Logger')
const log = new Logger('UTILS')

mongoose.connect(`mongodb://${database.mongoIp}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    user: database.mongoUser,
    password: database.mongoPass
  },
  authSource: 'admin',
  dbName: database.mongoDbName
}).then((conn) => { exports.mongo = { connection: conn, ...models }; log.send('MONGO', 'Connected') })

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

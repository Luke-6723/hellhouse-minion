const { database } = require('../config.json')
const mongoose = require('mongoose')
const models = require('../Mongo')
const Logger = require('../Logger')
const log = new Logger(' UTILS ')

mongoose.connect(`mongodb://${database.mongoIp}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    user: database.mongoUser,
    password: database.mongoPass
  },
  authSource: 'admin',
  dbName: database.mongoDbName
}).then((conn) => { exports.mongo = { connection: conn, ...models }; log.send(' MONGO ', 'Connected') })

exports.defaultEmbedColor = 0xF44444

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

exports.customRoles = {
  red: '719418489902727238',
  orange: '719418490531872768',
  yellow: '719418491035451413',
  green: '719418491861467177',
  blue: '719418492511846442',
  purple: '719418493681795082',
  blurple: '719418494789222435',
  lightblue: '719418495611174992',
  gray: '719418496278331428',
  turquuoise: '719418496848494642',
  pink: '719418494789222435',
  indigo: '719418493098917918',
  giveaways: '719408025663963147'
}

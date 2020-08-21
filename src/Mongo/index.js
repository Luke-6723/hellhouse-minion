const { Schema, model } = require('mongoose')
const { bot } = require('../config.json')

const UserSchema = new Schema({
  id: { type: String, required: true },
  prefix: { type: String, required: true, default: bot.prefix },
  warnings: Array,
  leveling: Object
})

module.exports = {
  Users: model('user', UserSchema)
}

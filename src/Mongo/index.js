const { Schema, model } = require('mongoose')
const { bot } = require('../config.json')

const UserSchema = new Schema({
  prefix: { type: String, required: true, default: bot.prefix },
  warnings: Array,
  leveling: Object
})

module.exports = {
  users: model('user', UserSchema)
}
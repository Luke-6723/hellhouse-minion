const { Schema, model } = require('mongoose')
const { bot } = require('../config.json')

const User = new Schema({
  id: { type: String, required: true },
  prefix: { type: String, required: false, default: bot.prefix },
  stats: {
    level: { type: Number, required: false, default: 1 },
    total: { type: Number, required: false, default: 0 },
    xp: { type: Number, required: false, default: 0 },
    lastXpGain: { type: Date, required: false, default: 0 }
  },
  profile: {
    colorScheme: { type: String, required: false, default: '' },
    background: { type: String, required: false, default: '' },
    description: { type: String, required: false, default: '' }
  },
  warnings: Array
})

exports.models = {
  Users: model('user', User)
}

exports.schemas = {
  User: User
}

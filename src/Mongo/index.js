const { Schema, model } = require('mongoose')
const { bot } = require('../config.json')

const User = new Schema({
  id: { type: String, required: true },
  prefix: { type: String, required: false, default: bot.prefix },
  bank: {
    coins: { type: Number, required: false, default: 500 },
    purchases: { type: Number, required: false, default: 0 }
  },
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
  multipliers: {
    levelUp: { type: Boolean, required: false, default: false }
  },
  settings: {
    levelUpMentions: { type: Boolean, required: false, default: true }
  },
  warnings: Array
})

exports.models = {
  Users: model('user', User)
}

exports.schemas = {
  User: User
}

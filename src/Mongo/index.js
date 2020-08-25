const { Schema, model } = require('mongoose')
const { bot } = require('../config.json')

const User = new Schema({
  id: { type: String, required: true },
  prefix: { type: String, required: true, default: bot.prefix },
  stats: {
    level: { type: Number, required: true, default: 1 },
    total: { type: Number, required: true, default: 0 },
    xp: { type: Number, required: true, default: 0 }
  },
  profile: {
    colorScheme: { type: String, required: true, default: '' },
    background: { type: String, required: true, default: '' },
    description: { type: String, required: true, default: '' }
  },
  warnings: Array,
  leveling: Object
})

exports.models = {
  Users: model('user', User)
}

exports.schemas = {
  User: User
}

const { Schema, model } = require('mongoose')
const { bot } = require('../config.json')

const userMute = new Schema({
  user_id: { type: String, required: true },
  unmuteTime: { type: Date, required: true }
})

const ModLog = new Schema({
  case: { type: Number, required: true },
  action: { type: String, required: true },
  user_id: { type: String, required: true },
  moderator_id: { type: String, required: true },
  reason: { type: String, required: true },
  message_id: { type: String, required: true }
})

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
  votes: {
    totalVotes: { type: Number, required: true, default: 0 },
    lastVoted: { type: Date, required: true, default: 0 }
  },
  warnings: Array
})

exports.models = {
  Users: model('user', User),
  ModLogs: model('modlog', ModLog),
  Mutes: model('mute', userMute)
}

exports.schemas = {
  User: User
}

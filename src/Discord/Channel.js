class Channel {
  constructor (id, name, channelType) {
    this.id = id
    this.name = name
    this.guild = {}
    this.channelType = channelType
  }
}

module.exports = Channel

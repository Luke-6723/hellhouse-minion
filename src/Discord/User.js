class User {
  constructor (id, name, discriminator, flags, avatar) {
    this.id = id
    this.name = name
    this.discriminator = discriminator
    this.flags = flags
    this.avatar = avatar
  }

  avatarURL (options = { format: 'png' }) {
    return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${options.format}`
  }
}

module.exports = User

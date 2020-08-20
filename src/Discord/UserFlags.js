class UserFlags {
  constructor (bitfield) {
    this.bitfield = bitfield
    this.flags = this.seralize(this.bitfield)
  }

  seralize () {
    // Define current flags
    const flags = {
      DISCORD_EMPLOYEE: 1 << 0,
      DISCORD_PARTNER: 1 << 1,
      HYPESQUAD_EVENTS: 1 << 2,
      BUGHUNTER_LEVEL_1: 1 << 3,
      HOUSE_BRAVERY: 1 << 6,
      HOUSE_BRILLIANCE: 1 << 7,
      HOUSE_BALANCE: 1 << 8,
      EARLY_SUPPORTER: 1 << 9,
      TEAM_USER: 1 << 10,
      SYSTEM: 1 << 12,
      BUGHUNTER_LEVEL_2: 1 << 14,
      VERIFIED_BOT: 1 << 16,
      VERIFIED_DEVELOPER: 1 << 17
    }

    // Define output object
    const check = {}

    // Sort through flags
    for (const flag of Object.keys(flags)) { if (flags[flag] & this.bitfield) { check[flag] = true } else { check[flag] = false } }

    // Return flags in an object
    return check
  }
}

// Export module
module.exports = UserFlags

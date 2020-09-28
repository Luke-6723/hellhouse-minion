const ModLog = require('../ModLog')

module.exports = async (guild, member) => {
  setTimeout(async () => {
    const auditLog = (await guild.fetchAuditLogs({
      type: 'MEMBER_KICK',
      limit: 1
    })).entries.first()
    if (!auditLog) return
    if (auditLog.executor.id === guild.client.user.id) return
    ModLog.addKick(guild.client, auditLog.target, auditLog.executor, ModLog.reason)
  }, 250)
}

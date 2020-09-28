const ModLog = require('../ModLog')

module.exports = async (oldMember, newMember) => {
  const oldMemberRoles = oldMember.roles.cache.map(r => r.name.toLowerCase())
  const newMemberRoles = newMember.roles.cache.map(r => r.name.toLowerCase())
  const guild = oldMember.guild
  if (oldMemberRoles.includes('muted') && !newMemberRoles.includes('muted')) {
    setTimeout(async () => {
      const auditLog = (await guild.fetchAuditLogs({
        type: 'MEMBER_ROLE_UPDATE',
        limit: 1
      })).entries.first()
      if (!auditLog) return
      if (auditLog.executor.id === guild.client.user.id) return
      ModLog.addUnmute(guild.client, auditLog.target, auditLog.executor, ModLog.reason)
    }, 250)
  } else if (!oldMemberRoles.includes('muted') && newMemberRoles.includes('muted')) {
    setTimeout(async () => {
      const auditLog = (await guild.fetchAuditLogs({
        type: 'MEMBER_ROLE_UPDATE',
        limit: 1
      })).entries.first()
      if (!auditLog) return
      if (auditLog.executor.id === guild.client.user.id) return
      ModLog.addMute(guild.client, auditLog.target, auditLog.executor, ModLog.reason)
    }, 250)
  }
}

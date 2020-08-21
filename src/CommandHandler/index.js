const fs = require('fs')
const Logger = require('../Logger')
const log = new Logger('COMMAND')

class CommandHandler {
  constructor () {
    fs.readdir(`${process.cwd().replace(/[\\]+/g, '/')}/src/Commands`, { require: 'utf8' }, (err, files) => {
      if (err) {
        throw Error(err)
      }
      files.forEach(command => {
        const commandName = command.split('.js')[0]
        this[commandName] = require(`${process.cwd().replace(/[\\]+/g, '/')}/src/Commands/${command}`)
        log.send('REGISTER', `Registered => ${commandName}`)
      })
    })
  }
}

module.exports = CommandHandler
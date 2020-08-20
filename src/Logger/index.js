const chalk = require('chalk')

class Logger {
  constructor (name) {
    this.name = name
  }

  send (event, message, ...args) {
    console.log(`[${chalk.yellow.dim(this.name)}] [${chalk.green.bold(event)}] ${message} ${args.join(' ')}`)
  }
}

module.exports = Logger

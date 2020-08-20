const chalk = require('chalk')

class Logger {
  constructor (name) {
    this.name = name
  }

  error (event, message, ...args) {
    console.log(`[${chalk.red.dim('ERROR')}] [${chalk.red.bold(event)}] ${message} ${args.join(' ')}`)
  }

  send (event, message, ...args) {
    console.log(`[${chalk.yellow.dim(this.name)}] [${chalk.green.bold(event)}] ${message} ${args.join(' ')}`)
  }
}

module.exports = Logger

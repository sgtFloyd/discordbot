const log4js = require('log4js')
const loggers = {}
const commands = {}

const log4jsConfig = {
  "appenders": [{
    "type": "console",
    "layout": {
      "type": "pattern",
      "pattern": "[%d] (%x{pid}) %p: %m%n",
      "tokens": {"pid": function() { return process.pid }}
    }
  }]
}
log4js.configure(log4jsConfig, {})

module.exports = {
  commandChar: process.env.COMMAND_CHAR || '!',
  gameStatus: process.env.GAME_STATUS || '',
  commands: commands,

  registerCommand: function (key, module) {
    if (key && !commands[key]) {
      commands[key] = module
      return true
    } else {
      return false
    }
  },

  getLogger: function (scope) {
    if (!loggers[scope]) {
      loggers[scope] = log4js.getLogger(scope)
      loggers[scope].setLevel(process.env.LOG_LEVEL || 'INFO')
    }
    return loggers[scope]
  }
}

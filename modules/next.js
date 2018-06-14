const schedule = require('../schedule.js')

module.exports = {
  command: 'next',
  description: 'show upcoming matches',

  handler: function (command, params, msg) {
    const currentTime = Date.now()
    return msg.author.sendMessage("DEFAULT")
  }
}

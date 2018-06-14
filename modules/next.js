const _ = require('lodash')
const datefmt = require('dateformat')
const schedule = require('../schedule.js')

module.exports = {
  command: 'next',
  description: 'show upcoming matches',

  handler: function (command, params, msg) {
    /* Don't respond to every message with :soccer: in it. Only "naked commands" */
    if (params) return

    const currentTime = Date.now()
    let upcomingGames = _.chain(schedule.matches)
      .filter(match => match.time > currentTime)
      .map(match => datefmt(match.time, 'mmmm d, h:MMtt Z') + ': ' + match.desc)
      .take(4)
      .value()

    let output = [
      "Upcoming World Cup matches:",
      ...upcomingGames
    ].join("\n")

    if (upcomingGames.length > 0)
      return msg.channel.sendMessage(output)
  }
}

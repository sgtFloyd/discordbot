const config = require('../botConfig.js')
const commands = config.commands

module.exports = {
  command: 'help',
  description: 'show a list of available commands',

  handler: function (command, params, msg) {
    const output = Object.keys(commands).map(key => {
      let line = `**${config.commandChar}${key}**: ${commands[key].description}`
      if (commands[key].example) {
        line += `, *Example: ${config.commandChar}${key} ${commands[key].example}*`
      }
      return line
    })
    return msg.author.sendMessage([
      '**Available commands:**',
      output.join('\n')
    ].join('\n'))
  }
}

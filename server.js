const discord = require('discord.js')
const config = require('./botConfig.js')
const logger = config.getLogger('bot')

/* Load everything in ./modules */
const normalizedPath = require('path').join(__dirname, 'modules')
require('fs').readdirSync(normalizedPath).forEach(file => {
  if (file !== 'rule.js') { // TODO: rule.js not yet modularized
    const module = require('./modules/' + file)
    if (config.registerCommand(module.command, module)) {
      logger.info('Successfully initialized command:', module.command)
    } else {
      logger.info('Failed to initialize command:', module.command)
    }
  }
})

/* Parse a chat message into a bot query, if possible */
const parseMessage = function (msg) {
  const content = msg.content.substr(config.commandChar.length)
  const command = content.split(' ')[0].toLowerCase()

  if (
    (msg.content.substr(0, config.commandChar.length) !== config.commandChar) || // not a bot command
    (msg.author.id === bot.user.id) || // ignore messages from myself
    (!config.commands[command]) // unrecognized command
  ) return

  return {
    command: command,
    content: content,
    handler: config.commands[command].handler,
    param: content.split(' ').slice(1).join(' ')
  }
}

/* Handle incoming messages */
const bot = new discord.Client()
bot.on('message', msg => {
  const query = parseMessage(msg)
  if (!query) return // not a valid bot query

  // Log query activity
  const scope = msg.guild ? msg.guild.name : 'private'
  const channel = msg.channel.name ? `[${msg.channel.name}]` : ''
  const author = `${msg.author.username}#${msg.author.discriminator}`
  logger.info(`[${scope}]${channel} ${author} used: ${query.command} ${query.param}`)

  const result = query.handler(query.command, query.param, msg)
  Promise.resolve(result)
    .catch(e => logger.error('An error occured while handling', msg.content, ':\n', e))
})

/* Event handlers */
bot.on('ready', () => {
  bot.user.setGame(config.gameStatus)
  logger.info('Ready! Username:', bot.user.username, 'Servers:', bot.guilds.size)
})

bot.on('guildCreate', guild => logger.info('Joined server:', guild.name))
bot.on('guildDelete', guild => logger.info('Left server:', guild.name))

/* Connect */
bot.login(process.env.DISCORD_TOKEN)

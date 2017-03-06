const discord = require('discord.js')
const logger = require('log4js').getLogger('bot')
logger.setLevel(process.env.LOG_LEVEL || 'INFO')

const COMMAND_CHAR = process.env.COMMAND_CHAR || '!'
const HANDLERS = {}

/* Load everything in ./modules */
const normalizedPath = require('path').join(__dirname, 'modules')
require('fs').readdirSync(normalizedPath).forEach(module => {
  const moduleObject = new (require('./modules/' + module))()
  moduleObject.getCommands().forEach(command => {
    HANDLERS[command] = moduleObject
  })
  logger.info('Successfully initialized module:', module)
})

const parseMessage = function (msg) {
  const content = msg.content.substr(COMMAND_CHAR.length)
  const command = content.split(' ')[0].toLowerCase()
  const handler = HANDLERS[command]

  if (
    (msg.content.substr(0, COMMAND_CHAR.length) !== COMMAND_CHAR) || // not a bot command
    (msg.author.id === bot.user.id) || // ignore myself
    (!handler) // unrecognized command
  ) return

  return {
    content: content,
    handler: handler,
    command: command,
    param: content.split(' ').slice(1).join(' ')
  }
}

/* Handle incoming messages */
const bot = new discord.Client()
bot.on('message', msg => {
  const query = parseMessage(msg)
  if (!query) return // not a valid query

  // Log activity
  const scope = msg.guild ? msg.guild.name : 'private'
  const channel = msg.channel.name ? `[${msg.channel.name}]` : ''
  const author = `${msg.author.username}#${msg.author.discriminator}`
  logger.info(`[${scope}]${channel} ${author} used ${query.command} ${query.param}`)

  const result = query.handler.handleMessage(query.command, query.param, msg)
  Promise.resolve(result)
    .catch(e => logger.error('An error occured while handling', msg.content, ':\n', e))
})

/* Event handlers */
bot.on('ready', () => {
  bot.user.setGame('Magic: The Gathering')
  logger.info('Ready! Username:', bot.user.username, 'Servers:', bot.guilds.size)
})

bot.on('guildCreate', guild => logger.info('Joined server:', guild.name))
bot.on('guildDelete', guild => logger.info('Left server:', guild.name))

/* Connect */
bot.login(process.env.DISCORD_TOKEN)

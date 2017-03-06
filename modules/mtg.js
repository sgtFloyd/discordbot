const request = require('request-promise-native')
const _ = require('lodash')
const config = require('../botConfig.js')
const logger = config.getLogger('card')

const SEARCH_API = 'https://api.magicthegathering.io/v1/cards?name='
const DISPLAY_URL = 'https://urza.co/cards/search?q=!'

function emojify (text) {
  return text
    .replace(/{W}/g, '<:mtg_white:287291267900243969>')
    .replace(/{U}/g, '<:mtg_blue:287291267694460928>')
    .replace(/{B}/g, '<:mtg_black:287291267707305984>')
    .replace(/{R}/g, '<:mtg_red:287291267455385611>')
    .replace(/{G}/g, '<:mtg_green:287291267807838208>')
    .replace(/{C}/g, '<:mtg_colorless:287295278476951562>')
}

function cardToString (card, msg) {
  // Convert mana symbols to emoji if available
  let manaCost = card.manaCost || ''
  if (msg.guild) manaCost = emojify(manaCost)

  // Escape markdown characters in card text and emojify
  let cardText = card.text || ''
  if (msg.guild) cardText = emojify(cardText)
  cardText = cardText.replace(/\*/g, '\\*')

  // Encode card name to be used in URL
  let encodedName = encodeURIComponent(card.name)
  if (card.name.includes(' ')) encodedName = `%22${encodedName}%22`

  return [
    `**${card.name}** ${manaCost}`,
    cardText,
    `${DISPLAY_URL}${encodedName}`
  ].join('\n')
}

function findCard (cardName, results) {
  const [cardsWithImage, cardsWithoutImage] = _.partition(results, 'imageUrl')
  const differentCardsWithoutImage = _.differenceBy(cardsWithoutImage, cardsWithImage, 'name')
  const uniqCards = _.uniqBy(_.concat(cardsWithImage, differentCardsWithoutImage), 'name')
  return uniqCards.find(c => c.name.toLowerCase() === cardName) ||
      uniqCards.find(c => c.name.toLowerCase().startsWith(cardName)) || uniqCards[0]
}

module.exports = {
  command: 'mtg',
  description: 'search for a Magic card by name',
  example: 'Tarmogoyf',

  handler: function (command, params, msg) {
    const cardName = params.toLowerCase()
    const cardRequest = request({url: SEARCH_API + cardName, json: true})

    return cardRequest.then(cardResponse => {
      if (cardResponse.cards && cardResponse.cards.length) {
        const card = findCard(cardName, cardResponse.cards)
        const formattedCard = cardToString(card, msg)

        if (card.imageUrl) {
          const imgFilename = _.snakeCase(_.deburr(card.name)) + '.jpg'
          const imgRequest = request({url: card.imageUrl, encoding: null})
          return imgRequest.then(
            imgResponse => msg.channel.sendFile(imgResponse, imgFilename, formattedCard),
            error => {
              logger.error('Downloading image', card.imageUrl, 'failed.', error)
              return msg.channel.sendMessage(formattedCard)
            }
          )
        }
        return msg.channel.sendMessage(formattedCard)
      }
    })
  }
}

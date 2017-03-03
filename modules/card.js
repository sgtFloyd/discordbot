const rp = require('request-promise-native')
const _ = require('lodash')
const log = require('log4js').getLogger('card')

class MtgCardLoader {
  constructor () {
    this.cardApi = 'https://api.magicthegathering.io/v1/cards?name='
    this.commands = ['mtg']
    this.maxLength = 2000
    this.legalLimitations = ['Vintage', 'Legacy', 'Modern', 'Standard', 'Commander']
  }

  getCommands () {
    return this.commands
  }

  cardToString (card, msg) {
    let manaCost = card.manaCost ? ' ' + card.manaCost : ''
    const cardInfo = ['**' + card.name + '**' + manaCost]
    if (card.text) {
      cardInfo.push(card.text.replace(/\*/g, '\\*'))
    }

    let encodedName = encodeURIComponent(card.name)
    if (card.name.includes(' ')) {
      encodedName = '%22' + encodedName + '%22'
    }
    cardInfo.push('https://urza.co/cards/search?q=!' + encodedName)
    return cardInfo.join('\n')
  }

  findCard (cardName, cards) {
    // create an array containing each card exactly once, preferring cards with image
    const [cardsWithImage, cardsWithoutImage] = _.partition(cards, 'imageUrl')
    const differentCardsWithoutImage = _.differenceBy(cardsWithoutImage, cardsWithImage, 'name')
    const uniqCards = _.uniqBy(_.concat(cardsWithImage, differentCardsWithoutImage), 'name')

    return uniqCards.find(c => c.name.toLowerCase() === cardName) ||
        uniqCards.find(c => c.name.toLowerCase().startsWith(cardName)) || uniqCards[0]
  }

  handleMessage (command, parameter, msg) {
    const cardName = parameter.toLowerCase()
    return rp({
      url: this.cardApi + cardName,
      json: true
    }).then(body => {
      if (body.cards && body.cards.length) {
        const card = this.findCard(cardName, body.cards)
        let response = this.cardToString(card, msg)
        if (card.imageUrl) {
          return rp({
            url: card.imageUrl,
            encoding: null
          }).then(
            buffer => msg.channel.sendFile(buffer, _.snakeCase(_.deburr(card.name)) + '.jpg', response),
            error => {
              log.error('Downloading image', card.imageUrl, 'failed.', error)
              // Couldn't download card image, fall back on message without image.
              return msg.channel.sendMessage(response)
            }
          )
        }
        return msg.channel.sendMessage(response)
      }
    })
  }
}

module.exports = MtgCardLoader

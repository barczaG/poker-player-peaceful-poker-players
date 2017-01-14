var Logger = require('le_node')
var log = new Logger({
  token: 'fda2a63e-3dd4-4b70-9b73-097d51eb8d6d'
})

function toNum (c) {
  switch (c) {
    case 'J':
      return 11
    case 'Q':
      return 12
    case 'K':
      return 13
    case 'A':
      return 14

    default:
      return parseInt(c)
  }
}

function cardsValue (cards) {
  return toNum(cards[0].rank) + toNum(cards[1].rank)
}

class Player {
  static get VERSION () {
    return '0.3'
  }

  static betRequest (gameState, bet) {
    const myPlayer = gameState.players[gameState.in_action]
    const cards = myPlayer.hole_cards
    const cValue = cardsValue(cards)
    log.info(gameState)
    log.info(`${myPlayer} ${cards} ${cValue}`)
    if (cValue > 15) {
      return bet(myPlayer.stack)
    } else {
      bet(0)
    }
  }

  static showdown (gameState) {
  }
}

module.exports = Player

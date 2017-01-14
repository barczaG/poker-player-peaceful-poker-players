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

class Player {
  static get VERSION () {
    return '0.2'
  }

  static betRequest (gameState, bet) {
    log.info(gameState)
    console.log(gameState)
    bet(0)
  }

  static showdown (gameState) {
  }
}

module.exports = Player

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
    console.log(gameState)
    bet(0)
  }

  static showdown (gameState) {
  }
}

module.exports = Player

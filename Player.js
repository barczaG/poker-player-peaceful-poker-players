var Logger = require('le_node')
var log = new Logger({
  token: 'fda2a63e-3dd4-4b70-9b73-097d51eb8d6d'
})

const cards2Table = require('./cards-2-table')

// function toNum (c) {
//   switch (c) {
//     case 'J':
//       return 11
//     case 'Q':
//       return 12
//     case 'K':
//       return 13
//     case 'A':
//       return 14

//     default:
//       return parseInt(c)
//   }
// }

// function cardsValue (cards) {
//   return toNum(cards[0].rank) + toNum(cards[1].rank)
// }

function isFolded (gameState) {
  return gameState.pot === (gameState.small_blind * 3)
}

// function getActivePlayers (gameState) {
//   return gameState.players.filter((player) => player.status === 'active')
// }

// function activePlayersCount (gameState) {
//   return getActivePlayers(gameState).length
// }

// function isPreflop (gameState) {
//   return !gameState.community_cards.length
// }

// function posHelper (firstPos, mePos, playerCount) {
//   if (firstPos > mePos) firstPos = firstPos - playerCount
//   const pos = mePos - firstPos
//   const after = playerCount - pos
//   return {pos, after}
// }

// function getPosition (gameState, myPlayer) {
//   const firstPlayerIndex = (gameState.dealer + 3)
//   const myIndex = myPlayer.id
//   return posHelper(firstPlayerIndex, myIndex, gameState.players.length)
// }

class Player {
  static get VERSION () {
    return '0.4'
  }

  static betRequest (gameState, bet) {
    const myPlayer = gameState.players[gameState.in_action]

    try {
      const cards = myPlayer.hole_cards
          // const cValue = cardsValue(cards)

      const percentage = cards2Table.getPercentage(cards)

      const folded = isFolded(gameState)
      // const posAfter = getPosition(gameState, myPlayer).after
      if (folded && percentage <= 30) {
        bet(myPlayer.stack)
      } else if (folded && percentage <= 60) {
          bet(0)
          //current_buy_in - players[in_action][bet] + minimum_raise
      } else if (!folded && percentage <= 12) {
        bet(myPlayer.stack)
      } else {
        bet(0)
      }

      log.info(gameState)
      log.info(`${JSON.stringify(myPlayer)} ${JSON.stringify(cards)} ${JSON.stringify(percentage)}`)
    } catch (e) {
      log.error('Exception: ' + e.message)
      bet(myPlayer.stack)
    }
  }

  static showdown (gameState) {
  }
}

module.exports = Player

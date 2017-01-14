const cards2Table = require('./cards-2-table')
const strategyTable = require('./strategy-table')
const efCalculator = require('./effective-stack-calculator')

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

function posHelper (firstPos, mePos, playerCount) {
  if (firstPos > mePos) firstPos = firstPos - playerCount
  const pos = mePos - firstPos
  const after = playerCount - pos
  return {pos, after}
}

function getPosition (gameState, myPlayer) {
  const firstPlayerIndex = (gameState.dealer + 3)
  const myIndex = myPlayer.id
  return posHelper(firstPlayerIndex, myIndex, gameState.players.length)
}

class Player {
  static get VERSION () {
    return '0.4'
  }

  static betRequest (gameState, bet) {
    const myPlayer = gameState.players[gameState.in_action]

    try {
      const cards = myPlayer.hole_cards

      const percentage = cards2Table.getPercentage(cards)
      const folded = isFolded(gameState)
      const strategyQuery = {effStack: efCalculator(gameState), playersBehind: getPosition(gameState, myPlayer).after, folded}
      const strategyPercentage = strategyTable.query(strategyQuery)

      if (percentage < strategyPercentage) {
        bet(myPlayer.stack)
      } else {
        bet(0)
      }
    } catch (e) {
      // global.log.error('Exception: ' + e.message)
      bet(0)
    }
  }

  static showdown (gameState) {
  }
}

module.exports = Player

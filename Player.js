const cards2Table = require('./cards-2-table')
const strategyTable = require('./strategy-table')
const efCalculator = require('./effective-stack-calculator')
const posHelper = require('./pos-helper')

function isFolded (gameState) {
  return gameState.pot === (gameState.small_blind * 3)
}

function isBuyIn (gameState) {
  return gameState.current_buy_in - gameState.players[gameState.in_action]['bet'] < (gameState.small_blind * 4)
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

class Player {
  static get VERSION () {
    return '0.5'
  }

  static betRequest (gameState, bet) {
    const myPlayer = gameState.players[gameState.in_action]

    try {
      const cards = myPlayer.hole_cards

      const percentage = cards2Table.getPercentage(cards)
      const folded = isFolded(gameState)
      const strategyQuery = {effStack: efCalculator.calculate(gameState), playersBehind: posHelper.getPosition(gameState, myPlayer).after, folded}
      const strategyPercentage = strategyTable.query(strategyQuery)

      if (strategyQuery.effStack <= 30) {
        if (percentage < strategyPercentage) {
          bet(myPlayer.stack)
        } else {
          bet(0)
        }
      } else {
        if (folded && percentage <= 30) {
          bet(myPlayer.stack)
        } else if (folded && (gameState.in_action === gameState.dealer)) {
          bet(gameState.current_buy_in - gameState.players[gameState.in_action]['bet'] + gameState.small_blind)
        } else if (isBuyIn(gameState) && percentage <= 60) {
          bet(gameState.current_buy_in - gameState.players[gameState.in_action]['bet'] + gameState.small_blind)
        } else if (!folded && percentage <= 12) {
          bet(myPlayer.stack)
        } else {
          bet(0)
        }
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

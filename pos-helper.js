module.exports = {
  posHelper: function (firstPos, mePos, playerCount) {
    if (firstPos > mePos) firstPos = firstPos - playerCount
    const pos = mePos - (firstPos - 1)
    const after = playerCount - pos
    return {pos, after}
  },

  getPosition: function (gameState, myPlayer) {
    const firstPlayerIndex = (gameState.dealer + 3) % gameState.players.length
    const myIndex = Number(myPlayer.id)
    return this.posHelper(firstPlayerIndex, myIndex, gameState.players.length)
  }
}

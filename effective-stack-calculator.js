modules.export = {
  calculate: function(gameState) {
	const bigBlind = (2 * gameState.small_blind);
	const myPlayerStack = (gameState.players[gameState.in_action].stack) / bigBlind;
	let activePlayers = 0;
	let otherPlayersSumStack = 0;

	gameState.players.forEach(function(player) {
		if ( !(player.id === gameState.in_action) && player.status === 'active') {
	  		activePlayers += 1;
    		otherPlayersSumStack += player.stack / bigBlind;
    	}
	});

	let otherPlayerAverageStack = otherPlayersSumStack / activePlayers;

	if (myPlayerStack < otherPlayerAverageStack) {
	  return myPlayerStack;
	} else {
  	  return otherPlayerAverageStack;
	}
  }
};
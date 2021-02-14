const Game = require('../../game/game');

// Setup the Game
const game = new Game();

function joinGame(username) {
	console.log('hello,', username);
	//game.addPlayer(this, username);
}

function handleShot(time) {
	console.log('BOOOM!!!! at ', time);
}

function handleClientUpdate(clientUpdate) {
	game.handleClientUpdate(this, clientUpdate);
}

function onDisconnect() {
	game.removePlayer(this);
}

module.exports = {
	joinGame,
	handleShot,
	handleClientUpdate,
	onDisconnect,
}

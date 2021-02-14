const Game = require('../../game/game');

// Setup the Game
const game = new Game();

export function joinGame(username) {
	console.log('hello,', username);
	game.addPlayer(this, username);
}

export function handleClientUpdate(clientUpdate) {
	game.handleClientUpdate(this, clientUpdate);
}

export function onDisconnect() {
	game.removePlayer(this);
}

const Game = require('../../game/game')

const socketio = require('socket.io');

exports.listenForSockets = function (server) {
	const io = socketio(server);

	// Listen for socket.io connections, defines API
	io.on('connection', socket => {
		console.log('Player connected! ', socket.id);

		socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
		socket.on(Constants.MSG_TYPES.INPUT, handleClientUpdate);
		socket.on('disconnect', onDisconnect);
	});
}

// Setup the Game
const game = new Game();

function joinGame(username) {
	game.addPlayer(this, username);
}

function handleClientUpdate(dir) {
	game.handleInput(this, dir);
}

function onDisconnect() {
	game.removePlayer(this);
}

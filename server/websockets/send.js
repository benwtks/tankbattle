const Constants = require('../../constants');

function sendUpdate(socket, players, bullets) {
	// const nearbyPlayers = Object.values(this.players).filter(
	// 	p => p !== player && p.distanceTo(player) <= Constants.MAP_SIZE / 2,
	// );
	// const nearbyBullets = this.bullets.filter(
	// 	b => b.distanceTo(player) <= Constants.MAP_SIZE / 2,
	// );

	// socket.emit(Constants.MSG_TYPES.SERVER_UPDATE, {
	// 	t: Date.now(),
	// 	me: player.serializeForUpdate(),
	// 	others: nearbyPlayers.map(p => p.serializeForUpdate()),
	// 	bullets: nearbyBullets.map(b => b.serializeForUpdate()),
	// 	leaderboard,
	// });
	socket.emit(Constants.MSG_TYPES.SERVER_UPDATE, {
		players,
		bullets,
	});
}

function sendGameOver() {
	socket.emit(Constants.MSG_TYPES.GAME_OVER);
}

module.exports = {
	sendUpdate,
	sendGameOver,
}

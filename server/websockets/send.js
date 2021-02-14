function sendUpdate(player, leaderboard) {
	const nearbyPlayers = Object.values(this.players).filter(
		p => p !== player && p.distanceTo(player) <= Constants.MAP_SIZE / 2,
	);
	const nearbyBullets = this.bullets.filter(
		b => b.distanceTo(player) <= Constants.MAP_SIZE / 2,
	);

	socket.emit(Constants.MSG_TYPES.CLIENT_UPDATE, {
		t: Date.now(),
		me: player.serializeForUpdate(),
		others: nearbyPlayers.map(p => p.serializeForUpdate()),
		bullets: nearbyBullets.map(b => b.serializeForUpdate()),
		leaderboard,
	});
}

function sendGameOver() {
	socket.emit(Constants.MSG_TYPES.GAME_OVER);
}

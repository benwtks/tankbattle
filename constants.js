module.exports = Object.freeze({
	PLAYER_RADIUS: 20,
	PLAYER_MAX_HP: 100,
	PLAYER_SPEED: 400,
	PLAYER_FIRE_COOLDOWN: 0.25,

	BULLET_RADIUS: 3,
	BULLET_SPEED: 800,
	BULLET_DAMAGE: 10,

	SCORE_BULLET_HIT: 20,
	SCORE_PER_SECOND: 1,

	MAP_SIZE: 3000,
	MSG_TYPES: {
		START_GAME: 'start_game',       // Client starts a game
		JOIN_GAME: 'join_game',         // Client requests to join a game
		SHOOT: 'shoot',                 // client telling server it has shoot
		CLIENT_UPDATE: 'client_update', // client updating the server about its user
		SERVER_UPDATE: 'server_update',  // server updating everyone
		GAME_OVER: 'game_over',         // Server tells clients the game has finished
	},
});

const Constants = require('../constants');
const Player = require('./objects/player');
const applyCollisions = require('./collisions');
const serverSocket = require('../server/websockets/send')

class Game {
	constructor() {
		this.sockets = {};
		this.players = {};
		this.bullets = [];
		this.lastUpdateTime = Date.now();
		this.shouldSendUpdate = false;
		setInterval(this.update.bind(this), 1000 / 60);
	}

	addPlayer(socket, username) {
		this.sockets[socket.id] = socket;

		// Generate a position to start this player at.
		const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
		const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
		this.players[socket.id] = new Player(socket.id, username, x, y);
	}

	removePlayer(socket) {
		delete this.sockets[socket.id];
		delete this.players[socket.id];
	}

	handleClientUpdate(socket, clientUpdate) {
		// TODO
		console.log(clientUpdate);
		if (this.players[socket.id]) {
			this.players[socket.id].setDirection(clientUpdate);
		}
	}

	update() {
		// Calculate time elapsed
		const now = Date.now();
		const dt = (now - this.lastUpdateTime) / 1000;
		this.lastUpdateTime = now;

		// Update each bullet
		const bulletsToRemove = [];
		this.bullets.forEach(bullet => {
			if (bullet.update(dt)) {
				// Destroy this bullet
				bulletsToRemove.push(bullet);
			}
		});
		this.bullets = this.bullets.filter(bullet => !bulletsToRemove.includes(bullet));

		// Update each player
		Object.keys(this.sockets).forEach(playerID => {
			const player = this.players[playerID];
			const newBullet = player.update(dt);
			if (newBullet) {
				this.bullets.push(newBullet);
			}
		});

		// Apply collisions, give players score for hitting bullets
		const destroyedBullets = applyCollisions(Object.values(this.players), this.bullets);
		destroyedBullets.forEach(b => {
			if (this.players[b.parentID]) {
				this.players[b.parentID].onDealtDamage();
			}
		});
		this.bullets = this.bullets.filter(bullet => !destroyedBullets.includes(bullet));

		// Check if any players are dead
		Object.keys(this.sockets).forEach(playerID => {
			const player = this.players[playerID];
			if (player.hp <= 0) {
				serverSocket.sendGameOver();

				const socket = this.sockets[playerID];
				this.removePlayer(socket);
			}
		});

		// Send a game update to each player every other time
		if (this.shouldSendUpdate) {
			const leaderboard = this.getLeaderboard();
			Object.keys(this.sockets).forEach(playerID => {
				const player = this.players[playerID];
				serverSocket.sendUpdate(this.sockets[playerID], players, bullets);
			});
			this.shouldSendUpdate = false;
		} else {
			this.shouldSendUpdate = true;
		}
	}

	getLeaderboard() {
		return Object.values(this.players)
			.sort((p1, p2) => p2.score - p1.score)
			.slice(0, 5)
			.map(p => ({ username: p.username, score: Math.round(p.score) }));
	}

}

module.exports = Game;

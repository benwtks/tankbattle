// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#4-client-networking
import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';

const Constants = require('../constants');

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });
console.log(socket);
const connectedPromise = new Promise(resolve => {
	console.log("yoy");
	socket.on('connect', () => {
		console.log('Connected to server!');
		resolve();
	});
});

export const connect = function() {
	connectedPromise.then(() => {
		// Register callbacks
		socket.on(Constants.MSG_TYPES.SERVER_UPDATE, processGameUpdate);
		socket.on('disconnect', () => {
			console.log('Disconnected from server.');
			document.getElementById('disconnect-modal').classList.remove('hidden');
			document.getElementById('reconnect-button').onclick = () => {
				window.location.reload();
			};
		});
	}
)};

export const play = username => {
	console.log('hello');
	socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
};

export const updateDirection = throttle(20, userState => {
	console.log(userState);
	socket.emit(Constants.MSG_TYPES.INPUT, userState);
});

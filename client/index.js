import { connect, joinGame, shoot } from './networking';
import { initState } from './state';

console.log("Hello world");

Promise.all([
	connect()
]).then(() => {
	shoot("kj");
}).catch(console.error);



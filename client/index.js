import {connect, play} from './networking';
import { initState } from './state';

console.log("Hello world");

Promise.all([
    joinGame()
]).then(() => {
    play("dadada");
}).catch(console.error);


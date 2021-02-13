const express = require('express');
const socketio = require('socket.io');

const app = express()
const port = 3000

const server = app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
})

// Setup socket.io
const io = socketio(server);

// Listen for socket.io connections
io.on('connection', socket => {
  console.log('Player connected!', socket.id);

  socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.INPUT, handleInput);
  socket.on('disconnect', onDisconnect);
});

app.get('/', (req, res) => {
	  res.send('Hello World!')
})

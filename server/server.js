const express = require('express');
const socketio = require('socket.io');

const app = express()
const port = 3000

const server = app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

// Setup socket.io
const io = socketio(server);

app.get('/', (req, res) => {
	res.sendFile('client/index.html', {root: __dirname })
})

//require('api')

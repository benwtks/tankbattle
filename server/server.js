const path = require('path')
const express = require('express');

const app = express()
const port = 3000

const sockets = require('./websockets/receive');

const server = app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
	console.log(path.resolve(__dirname, '../client/index.html'))
})

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/index.html'))
})


sockets.listenForSockets();

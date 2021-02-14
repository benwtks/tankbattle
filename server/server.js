const api = require('./api');

const express = require('express');

const app = express()
const port = 3000

const server = app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
	res.sendFile('client/index.html', {root: __dirname })
})

api.listenForSockets(server);

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const { joinGame, handleClientUpdate, onDisconnect } = require('./websockets/receive')
const path = require('path');
const socketio = require('socket.io');

const devWebpackConfig = require('../webpack.dev.js');
const Constants = require("../constants");

const app = express()
const port = 8000

if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(devWebpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production
  app.use(express.static('dist'));
}

const server = app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
	console.log(process.env.NODE_ENV);
})

const io = socketio(server);

// Listen for socket.io connections, defines API
io.on('connection', socket => {
    console.log('Player connected! ', socket.id);

    socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
    socket.on(Constants.MSG_TYPES.CLIENT_UPDATE, handleClientUpdate);
    socket.on('disconnect', onDisconnect);
});

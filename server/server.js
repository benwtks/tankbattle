const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const sockets = require('./websockets/receive');
const path = require('path');

const devWebpackConfig = require('../webpack.dev.js');

const app = express()
const port = 3000

app.use(express.static('public'));

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

sockets.listenForSockets();

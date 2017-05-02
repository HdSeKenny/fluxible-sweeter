'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _server = require('../configs/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connect to MongoDB
require('../configs/mongodb')();

// Setup server
/**
 * Main application file
 */
const app = (0, _express2.default)();
const server = _http2.default.createServer(app);

// const socketio = require('socket.io')(server, {
//   serveClient: config.env !== 'production',
//   path: '/socket.io-client'
// });
// require('./configs/socketio').default(socketio);

require('../express')(app);
require('../configs/routes')(app);

// Start server
function startServer() {
  app.sweeter = server.listen(_server2.default.server.port, err => {
    if (err) {
      throw err;
    }
    console.log('Express server listening on %d, in %s mode', _server2.default.port, app.get('env'));
  });
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${_server2.default.server}` : `Port ${_server2.default.server}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.on('error', onError);

setImmediate(startServer);

// Expose app
exports.default = app;
module.exports = exports['default'];

/**
 * Main application file
 */
import express from 'express';
import http from 'http';
import config from '../configs/server';

// Connect to MongoDB
require('../configs/mongodb')();

// Setup server
const app = express();
const server = http.createServer(app);

// const socketio = require('socket.io')(server, {
//   serveClient: config.env !== 'production',
//   path: '/socket.io-client'
// });
// require('./configs/socketio').default(socketio);

require('../express')(app);
require('../configs/routes')(app);

// Start server
function startServer() {
  app.sweeter = server.listen(config.server.port, (err) => {
    if (err) {
      throw err; }
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${config.server}` : `Port ${config.server}`;

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
export default app;

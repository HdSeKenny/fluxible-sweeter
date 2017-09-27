'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable all, no-param-reassign */

// When the user disconnects.. perform this
function onDisconnect() {}
// TODO


// When the user connects.. perform this
function onConnect(io, socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    socket.log(JSON.stringify(data, null, 2));
  });

  socket.on('message:send', function (messageobj) {
    messageobj.class = 'you';
    io.sockets.emit('message:receive', messageobj);
  });
}

exports.default = function (io) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: 'sweeter-secret',
  //   handshake: true
  // }));

  io.on('connection', function (socket) {
    socket.address = socket.request.connection.remoteAddress + ':' + socket.request.connection.remotePort;
    socket.connectedAt = new Date();
    socket.log = function () {
      var _console;

      for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
        data[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['SocketIO ' + socket.nsp.name + ' [' + socket.address + ']'].concat(data));
    };

    socket.on('disconnect', function () {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    onConnect(io, socket);
    socket.log('CONNECTED');
  });
};

module.exports = exports['default'];
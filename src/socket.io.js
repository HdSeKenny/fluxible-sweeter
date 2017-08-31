/* eslint-disable all, no-param-reassign */

// When the user disconnects.. perform this
function onDisconnect() {
  // TODO
}

// When the user connects.. perform this
function onConnect(io, socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });

  socket.on('message:send', messageobj => {
    messageobj.class = 'you';
    io.sockets.emit('message:receive', messageobj);
  });
}

export default (io) => {
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

  io.on('connection', (socket) => {
    socket.address = `${socket.request.connection.remoteAddress}:${socket.request.connection.remotePort}`;
    socket.connectedAt = new Date();
    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    onConnect(io, socket);
    socket.log('CONNECTED');
  });
};

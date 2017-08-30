/* eslint-disable all, no-param-reassign */

const users = [];
// When the user disconnects.. perform this
function onDisconnect() {
  // TODO
}

// When the user connects.. perform this
function onConnect(socket, name) {
  // When the client emits 'info', this listens and executes
  console.log(name, 'socket is connected');

  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });

  socket.on('currentuser', username => {
    console.log(username, 'is connected =====>');
    users.push(username);

    socket.on('chat', msg => {
      console.log(msg, '<==============');
      socket.emit('room', msg);
    });
  });
  // Insert sockets below require('../api/thing/thing.socket').register(socket);
}

export default (socketio) => {
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

  socketio.on('connection', (socket) => {
    socket.address = `${socket.request.connection.remoteAddress}:${socket.request.connection.remotePort}`;

    console.log(socket.request.session, '#########');
    socket.connectedAt = new Date();

    socket.log = function(...data) {
      // console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket, 'main');
    socket.log('CONNECTED');
  });

  const chat = socketio.of('/chat');
  chat.on('connection', chatSocket => {
    onConnect(chat, 'chat');
    // chatSocket.on('current-user', data => {
    //   console.log('============>', data.username);
    //   // chat.broadcast.emit(`${data.username} is connected`);
    //   chatSocket.on(`sendMessage`, msgObj => {
    //     console.log('onSendMessage ===>', msgObj);
    //     chatSocket.emit(`messages-${data.username}`, msgObj);
    //   });
    // });
  });
};

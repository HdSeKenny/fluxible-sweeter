export default (io) => {
  io.of('/chat').on('connection', (socket) => {
    console.log('==> chat socket is connected');
    socket.emit('a message', {
      that: 'only',
      '/chat': 'will get'
    });
  });

  io.on('connection', (socket) => {
    console.log('==> socket is connected');
  });
};

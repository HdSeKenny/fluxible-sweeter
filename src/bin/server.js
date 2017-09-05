import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import 'colors';
import config from '../configs';
import mongodbConnection from '../configs/mongodb';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
const mongodbPromises = mongodbConnection();
Promise.all(mongodbPromises).then(() => {

  require('../express')(app);
  require('../socket.io')(io);

  setImmediate(() => {
    app.sweeter = server.listen(config.server.port, (err) => {
      if (err) { throw err; }
      console.log(`${'==>'.green} Express server listening on %d, in %s mode`, config.server.port, app.get('env'));
    });
  });
})
.catch((err) => {
  throw new Error(err);
});

exports = module.exports = app;


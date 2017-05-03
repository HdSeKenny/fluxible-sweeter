import express from 'express';
import http from 'http';
import 'colors';
import config from '../configs/server';
import mongodbConnection from '../configs/mongodb';

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
const mongodbPromises = mongodbConnection();
Promise.all(mongodbPromises).then(() => {

  require('../express')(app);
  require('../configs/routes')(app);

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

export default app;

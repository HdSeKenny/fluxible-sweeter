/**
 * Module dependencies.
 */
require('../../server.babel');
const contra = require('contra');
const mongoClient = require('mongodb').MongoClient;
const _ = require('lodash');
const http = require('http');
const assert = require('assert');
const colors = require('colors');

const config = require('../configs/server');
const seed = require('../configs/seed');

const testMongoConnection = [];

global.dbIsAvaliable = false;

const connectDb = (cb, url) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log(`==> Database unavaliable: ${url}`.gray);
      cb(null, false);
    }
    else {
      db.listCollections().toArray((err, items) => {
        if (items.length == 0) {
          console.log(`Database unavaliable: ${url}`);
          if (url === config.mongo.kenny.url) {
            console.info(`${'==>'.green} Insert default user... `);
            db.collection('users').insert(seed.user, (err, result) => {
              assert.equal(null, err);
              db.close();
            });
            console.info(`${'==>'.green} Insert default blogs... `);
            db.collection('blogs').insert(seed.blogs, (err, result) => {
              assert.equal(null, err);
              db.close();
            });
            console.info('');
          }
          else {
            console.info(`${'==>'.green} Insert default session... `);
            db.collection('test').insert({ 'test': 'test' }, (err, result) => {
              assert.equal(null, err);
              db.close();
            });
          }
        }
        else {
          console.log(`${'==>'.green} Database avaliable: ${url.cyan}`);
        }
        cb(null, true);
        db.close();
      });
    }
  });
};

console.log(`${'==>'.green} Start to check database......`);

testMongoConnection.push(
  (cb) => {
    connectDb(cb, config.mongo.kenny.url);
  },
  (cb) => {
    connectDb(cb, config.mongo.session.url);
  }
);

contra.concurrent(testMongoConnection, (err, results) => {
  if (_.every(results, Boolean)) {
    global.dbIsAvaliable = true;
  }
  else {
    console.log('');
    console.log('* Please check your database! *');
  }

  const app = require('../express');
  const port = config.server.port || '0.0.0.0';
  const addr = config.server.addr || 3000;
  const server = http.createServer(app);

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

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

  function onListening() {
    const serverAddr = server.address();
    const address = `http://localhost/${serverAddr.port}`;
    console.log(`${'==>'.green} Application running: ${address.cyan}`);
    console.log('');
  }

  server.listen(port, addr);
  server.on('error', onError);
  server.on('listening', onListening);

});


'use strict';

var _contra = require('contra');

var _contra2 = _interopRequireDefault(_contra);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _server = require('../configs/server');

var _server2 = _interopRequireDefault(_server);

var _seed = require('../configs/seed');

var _seed2 = _interopRequireDefault(_seed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testMongoConnection = [];

global.dbIsAvaliable = false;

const connectDb = (cb, url) => {
  console.log(`${'==>'.green} Start to check database......`);

  _mongodb2.default.connect(url, (err, db) => {
    if (err) {
      console.log(`==> Database unavaliable: ${url}`.gray);
      cb(null, false);
    } else {
      db.listCollections().toArray((err, items) => {
        if (items.length == 0) {
          console.log(`Database unavaliable: ${url}`);
          if (url === _server2.default.mongo.kenny.url) {
            console.info(`${'==>'.green} Insert default user... `);
            db.collection('users').insert(_seed2.default.user, (err, result) => {
              _assert2.default.equal(null, err);
              db.close();
            });
            console.info(`${'==>'.green} Insert default blogs... `);
            db.collection('blogs').insert(_seed2.default.blogs, (err, result) => {
              _assert2.default.equal(null, err);
              db.close();
            });
            console.info('');
          } else {
            console.info(`${'==>'.green} Insert default session... `);
            db.collection('test').insert({ 'test': 'test' }, (err, result) => {
              _assert2.default.equal(null, err);
              db.close();
            });
          }
        } else {
          console.log(`${'==>'.green} Database avaliable: ${url.cyan}`);
        }
        cb(null, true);
        db.close();
      });
    }
  });
};

testMongoConnection.push(cb => {
  connectDb(cb, _server2.default.mongo.kenny.url);
}, cb => {
  connectDb(cb, _server2.default.mongo.session.url);
});

_contra2.default.concurrent(testMongoConnection, (err, results) => {

  if (_lodash2.default.every(results, Boolean)) {
    global.dbIsAvaliable = true;
  } else {
    console.log('');
    console.log('* Please check your database! *');
  }

  const app = require('../express');
  const port = _server2.default.server.port || '0.0.0.0';
  const addr = _server2.default.server.addr || 3000;
  const server = _http2.default.createServer(app);

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
    console.log(`${'==>'.green} Express is running: ${address.cyan}`);
    console.log('');
  }

  server.listen(port, addr);
  server.on('error', onError);
  server.on('listening', onListening);
});

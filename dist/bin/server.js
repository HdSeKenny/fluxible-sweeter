'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

require('colors');

var _server = require('../configs/server');

var _server2 = _interopRequireDefault(_server);

var _mongodb = require('../configs/mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
const server = _http2.default.createServer(app);

// Connect to MongoDB
const mongodbPromises = (0, _mongodb2.default)();
Promise.all(mongodbPromises).then(() => {

  require('../express')(app);

  setImmediate(() => {
    app.sweeter = server.listen(_server2.default.server.port, err => {
      if (err) {
        throw err;
      }
      console.log(`${'==>'.green} Express server listening on %d, in %s mode`, _server2.default.server.port, app.get('env'));
    });
  });
}).catch(err => {
  throw new Error(err);
});

exports = module.exports = app;

'use strict';

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _configs = require('../configs');

var _configs2 = _interopRequireDefault(_configs);

var _mongodb = require('../configs/mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var io = (0, _socket2.default)(server);

// Connect to MongoDB
var mongodbPromises = (0, _mongodb2.default)();
_promise2.default.all(mongodbPromises).then(function () {

  require('../express')(app);
  require('../socket.io')(io);

  (0, _setImmediate3.default)(function () {
    app.sweeter = server.listen(_configs2.default.server.port, function (err) {
      if (err) {
        throw err;
      }
      console.log('[' + _chalk2.default.hex('#337ab7')('express') + '] ' + _chalk2.default.green.bold('==>') + ' Express server listening on %d, in %s mode', _configs2.default.server.port, app.get('env'));
    });
  });
}).catch(function (err) {
  throw new Error(err);
});

exports = module.exports = app;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _octonode = require('octonode');

var _octonode2 = _interopRequireDefault(_octonode);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res) {
  var username = 'HdSeKenny';
  var projectName = 'fluxible-sweeter';
  var API = _path2.default.join('repos', username, projectName, 'commits');
  var client = _octonode2.default.client({
    username: 'cnkuan@qq.com',
    password: 'kuan2016..'
  });

  client.get(API, {}, function (err, status, body, headers) {
    if (err) throw err;
    res.status(200).json(body);
  });
};

module.exports = exports['default'];
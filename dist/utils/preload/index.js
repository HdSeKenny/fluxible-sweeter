'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => {
  if (_env2.default.is_client) {
    const imgDefer = document.getElementsByTagName('img');
    setTimeout(() => {
      for (let i = 0; i < imgDefer.length; i++) {
        if (imgDefer[i].getAttribute('data-src')) {
          imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
        }
      }
    }, 500);
  }
};

module.exports = exports['default'];

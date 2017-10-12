'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectID = _mongodb2.default.ObjectID;

exports.default = {
  setDefaultBlog: function setDefaultBlog(body) {
    body.author = ObjectID(body.author);
    body.show_comments = false;
    body.likers = [];
    body.comments = [];
    body.images = ['/images/sliders/great-frontend.png'];
    body.tag = body.tag || body.type;

    return body;
  }
};
module.exports = exports['default'];
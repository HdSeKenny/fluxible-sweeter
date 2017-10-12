'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  setDefaultUserParams: function setDefaultUserParams(body) {
    body.password = (0, _md2.default)(body.password);
    body.image_url = '/images/users/default-user.svg';
    body.background_image_url = '/images/users/user-center-bg.jpg';
    body.lq_background_url = '/images/lqip/users/user-center-bg.jpg';
    body.fans = [];
    body.focuses = [];
    body.blogs = [];
    body.gender = "unknow";
    body.signature = "This guy has no signature...";
    body.role = "user";
    body.focuses_list = {
      no_groups: [],
      friends: [],
      special_focuses: []
    };
    body.fans_list = {
      no_groups: []
    };

    body.recent_chat_connections = [];

    return body;
  },
  filterUserParams: function filterUserParams() {}
};
module.exports = exports['default'];
'use strict';

var _express = require('express');

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.post('/:userId', _upload2.default.changeProfileImage);

module.exports = router;
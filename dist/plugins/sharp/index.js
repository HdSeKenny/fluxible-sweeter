'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (req, res) => {
  const fileName = _utils.jsUtils.splitUrlBySlash(req.body.uri, 1)[0];
  const envDir = _utils.jsUtils.splitUrlBySlash(__dirname, 3)[2];
  const envIndex = __dirname.indexOf(envDir);
  const projectDir = __dirname.substring(0, envIndex - 1);
  const srcTarget = `${projectDir}/src/public/styles/images/lqip/users/${fileName}`;
  const envTarget = `${projectDir}/${envDir}/public/styles/images/lqip/users/${fileName}`;
  const originalUrl = `${projectDir}/src/public${req.body.uri}`;

  (0, _sharp2.default)(originalUrl).resize(50).toBuffer().then(async data => {
    try {
      await _fs2.default.writeFile(srcTarget, data);
      await _fs2.default.writeFile(envTarget, data);

      res.status(200).json(srcTarget);
    } catch (err) {
      throw new Error(err);
    }
  }).catch(err => {
    if (err) throw err;
  });
};

module.exports = exports['default'];

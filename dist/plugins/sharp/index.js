'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res) {
  var fileName = _utils.jsUtils.splitUrlBySlash(req.body.uri, 1)[0];
  var envDir = _utils.jsUtils.splitUrlBySlash(__dirname, 3)[2];
  var envIndex = __dirname.indexOf(envDir);
  var projectDir = __dirname.substring(0, envIndex - 1);
  var srcTarget = projectDir + '/src/public/styles/images/lqip/users/' + fileName;
  var envTarget = projectDir + '/' + envDir + '/public/styles/images/lqip/users/' + fileName;
  var originalUrl = projectDir + '/src/public' + req.body.uri;

  (0, _sharp2.default)(originalUrl).resize(50).toBuffer().then(function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _fs2.default.writeFile(srcTarget, data);

            case 3:
              _context.next = 5;
              return _fs2.default.writeFile(envTarget, data);

            case 5:

              res.status(200).json(srcTarget);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);
              throw new Error(_context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 8]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()).catch(function (err) {
    if (err) throw err;
  });
};

module.exports = exports['default'];
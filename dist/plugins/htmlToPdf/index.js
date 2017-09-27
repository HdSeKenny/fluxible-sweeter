'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chromeRemoteInterface = require('chrome-remote-interface');

var _chromeRemoteInterface2 = _interopRequireDefault(_chromeRemoteInterface);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const htmlPdf = require('html-pdf-chrome');
// htmlPdf.create(outerHtml, options).then((pdf) => pdf.toFile(`${fileName}.pdf`));

var htmlToPdf = function htmlToPdf(req, res) {
  (0, _chromeRemoteInterface2.default)(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client) {
      var Page, fileName, outerHtml, pdf;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Page = client.Page; // Extract used DevTools domains.

              fileName = req.body.id_str;
              outerHtml = '<!DOCTYPE html>' + req.body.html;

              // Enable events on domains we are interested in.

              _context.next = 5;
              return Page.enable();

            case 5:
              _context.next = 7;
              return Page.navigate({ url: 'data:text/html, ' + outerHtml });

            case 7:
              _context.next = 9;
              return Page.loadEventFired();

            case 9:
              _context.next = 11;
              return Page.printToPDF();

            case 11:
              pdf = _context.sent;

              _fs2.default.writeFile('../' + fileName + '.pdf', pdf.data, 'base64', function (err) {
                if (err) throw err;
                client.close();
                res.status(200).json('ok');
              });

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()).on('error', function (err) {
    console.error('Cannot connect to browser:', err);
  });
};

exports.default = htmlToPdf;
module.exports = exports['default'];
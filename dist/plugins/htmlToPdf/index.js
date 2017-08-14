'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chromeRemoteInterface = require('chrome-remote-interface');

var _chromeRemoteInterface2 = _interopRequireDefault(_chromeRemoteInterface);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const htmlPdf = require('html-pdf-chrome');
// htmlPdf.create(outerHtml, options).then((pdf) => pdf.toFile(`${fileName}.pdf`));

const htmlToPdf = (req, res) => {
  (0, _chromeRemoteInterface2.default)(async client => {
    const { Page: Page } = client; // Extract used DevTools domains.
    const fileName = req.body.id_str;
    const outerHtml = `<!DOCTYPE html>${req.body.html}`;

    // Enable events on domains we are interested in.
    await Page.enable();
    await Page.navigate({ url: `data:text/html, ${outerHtml}` });
    await Page.loadEventFired();

    // const result = Runtime.evaluate({ expression: `document.querySelector('.content-pages')` });

    // Evaluate outerHTML after page has loaded.
    const pdf = await Page.printToPDF();
    _fs2.default.writeFile(`../${fileName}.pdf`, pdf.data, 'base64', err => {
      if (err) throw err;
      client.close();
      res.status(200).json('ok');
    });
  }).on('error', err => {
    console.error('Cannot connect to browser:', err);
  });
};

exports.default = htmlToPdf;
module.exports = exports['default'];

import CDP from 'chrome-remote-interface';
import fs from 'fs';

// const htmlPdf = require('html-pdf-chrome');
// htmlPdf.create(outerHtml, options).then((pdf) => pdf.toFile(`${fileName}.pdf`));

const htmlToPdf = (req, res) => {
  CDP(async (client) => {
    const { Page } = client; // Extract used DevTools domains.
    const fileName = req.body.id_str;
    const outerHtml = `<!DOCTYPE html>${req.body.html}`;


    // Enable events on domains we are interested in.
    await Page.enable();
    await Page.navigate({ url: `data:text/html, ${outerHtml}` });
    await Page.loadEventFired();

    // const result = Runtime.evaluate({ expression: `document.querySelector('.content-pages')` });

    // Evaluate outerHTML after page has loaded.
    const pdf = await Page.printToPDF();
    fs.writeFile(`../${fileName}.pdf`, pdf.data, 'base64', (err) => {
      if (err) throw err;
      client.close();
      res.status(200).json('ok');
    });
  }).on('error', (err) => {
    console.error('Cannot connect to browser:', err);
  });
};

export default htmlToPdf;
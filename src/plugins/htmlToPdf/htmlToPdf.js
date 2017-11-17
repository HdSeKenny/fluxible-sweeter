import puppeteer from 'puppeteer';
import configs from './configs';

export default (htmlString) => new Promise((resolve, reject) => {
  (async () => {
    let browser;
    try {
      browser = await puppeteer.launch({
        // headless: false
      });
      const page = await browser.newPage();
      const pdfDocument = `data:text/html, ${htmlString}`;
      await page.goto(pdfDocument, { waitUntil: configs.waitUtilOptions });
      await page.emulateMedia("screen");
      await page.pdf(configs.pdfOptions);
      await browser.close();

      resolve();
    } catch (error) {
      reject(error);
      if (browser) browser.close();
    }
  })();
});

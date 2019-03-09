const puppeteer = require('puppeteer');

module.exports = async (action, user, password) => {
  const btnSelector = action === 'enter' ? '#btnStInput' : '#btnEtInput';

  const browser = await puppeteer.launch({
    args: ['--disable-setuid-sandbox', '--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://teamspirit.cloudforce.com/');
  
  await page.waitForSelector('#idcard-identity');
  await page.type('#username', user);
  await page.type('#password', password);
  page.click('#Login');
  
  await page.waitForNavigation({
    waitUntil: 'domcontentloaded'
  });
  await page.waitForNavigation({
    waitUntil: 'domcontentloaded'
  });

  await page.waitForSelector('iframe');

  const frame = await page.frames()[1];
  await frame.waitFor(3000);

  const button = await frame.$(btnSelector);
  await button.click();
  await frame.waitFor(3000);

  browser.close();
};

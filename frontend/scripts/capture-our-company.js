const puppeteer = require('puppeteer');
const path = require('path');

async function capture() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Capture local
  console.log('Capturing local /our-company...');
  await page.goto('http://localhost:1440/our-company', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 1500));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));

  const localPath = path.join('C:', 'Users', 'Helpdesk', '.gemini', 'antigravity', 'brain', '5018ff38-4817-40bb-8afa-87cdf26304e7', 'local_our_company_integrated.png');
  await page.screenshot({ path: localPath, fullPage: true });
  console.log('Saved local screenshot to:', localPath);

  // 2. Capture staging
  console.log('Capturing staging /our-company...');
  try {
    await page.goto('https://stagingunimrkt.roimantra-dev.in/our-company', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 1500));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 500));

    const stagingPath = path.join('C:', 'Users', 'Helpdesk', '.gemini', 'antigravity', 'brain', '5018ff38-4817-40bb-8afa-87cdf26304e7', 'staging_our_company_full.png');
    await page.screenshot({ path: stagingPath, fullPage: true });
    console.log('Saved staging screenshot to:', stagingPath);
  } catch (err) {
    console.log('Staging capture note:', err.message);
  }

  await browser.close();
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});

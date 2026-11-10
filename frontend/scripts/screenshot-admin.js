const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to http://localhost:1337/admin...');
    await page.goto('http://localhost:1337/admin', { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait a bit for React to render
    await new Promise(r => setTimeout(r, 4000));

    const outputPath = path.join('C:', 'Users', 'Helpdesk', '.gemini', 'antigravity', 'brain', '5018ff38-4817-40bb-8afa-87cdf26304e7', 'admin_styled_view.png');
    await page.screenshot({ path: outputPath, fullPage: false });
    console.log('Admin screenshot saved to:', outputPath);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (browser) await browser.close();
  }
})();

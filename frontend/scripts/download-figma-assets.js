const fs = require('fs');
const path = require('path');

const list = [
  '/figma-home/hero/online-bulletin-board.svg',
  '/figma-home/hero/intercept-interview.svg',
  '/figma-home/hero/country-research.svg',
  '/figma-home/hero/competitive-intelligence.svg',
  '/figma-home/hero/survey-programming.svg',
  '/figma-home/hero/in-depth-interview.svg',
  '/figma-home/hero/telephonic-interview.svg',
  '/figma-home/waves-texture.png',
  '/figma-home/services-gradient-wallpaper.png',
  '/figma-home/stats-wave.png',
  '/figma-home/cati/p109.webp',
  '/figma-home/cati/p110.webp',
  '/figma-home/cati/p108.webp',
  '/figma-home/offices/india.jpg',
  '/figma-home/offices/icon-location.svg',
  '/figma-home/offices/icon-sms.svg',
  '/figma-home/offices/icon-call.svg',
  '/figma-home/offices/usa.jpg',
  '/figma-home/offices/uk.jpg',
  '/figma-home/play-btn.svg',
  '/figma-home/footer/badge-1.png',
  '/figma-home/footer/badge-3.png',
  '/figma-home/footer/badge-2.png',
  '/figma-home/chat-messages.svg',
  '/figma-contact/stat-global.svg',
  '/figma-contact/stat-language.svg',
  '/figma-contact/stat-call.svg',
  '/figma-contact/stat-medal.svg',
  '/figma-contact/loc-white.svg',
  '/figma-contact/sms-white.svg',
  '/figma-contact/call-white.svg',
  '/figma-contact/loc-red.svg',
  '/figma-contact/sms-red.svg',
  '/figma-contact/call-red.svg',
  '/figma-contact/icon-research.svg',
  '/figma-contact/icon-global-lg.svg',
  '/figma-contact/icon-badge.svg',
  '/figma-contact/icon-dashboard.svg',
  '/figma-industries/enquiry/recaptcha-logo.svg'
];

async function downloadAll() {
  const publicDir = path.join(__dirname, '..', 'public');
  let downloaded = 0;
  let skipped = 0;

  for (const assetPath of list) {
    const localFile = path.join(publicDir, assetPath.replace(/\//g, path.sep));
    if (fs.existsSync(localFile)) {
      skipped++;
      continue;
    }
    const dir = path.dirname(localFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    try {
      const url = 'https://stagingunimrkt.roimantra-dev.in' + assetPath;
      const res = await fetch(url);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(localFile, buf);
        downloaded++;
        console.log('Downloaded:', assetPath);
      } else {
        console.warn('Failed (HTTP ' + res.status + '):', assetPath);
      }
    } catch (e) {
      console.error('Error fetching ' + assetPath + ':', e.message);
    }
  }
  console.log(`Finished: ${downloaded} downloaded, ${skipped} already present.`);
}

downloadAll().catch(console.error);

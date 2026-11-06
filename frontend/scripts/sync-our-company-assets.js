const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('frontend/scripts/staging_our_company.html', 'utf8');
const regex = /(?:src|href)=["']?([^"'\s>)]+\.(?:webp|png|jpg|svg))/g;
const assets = new Set();
let m;
while ((m = regex.exec(html)) !== null) {
  let u = m[1];
  if (u.includes('url=')) {
    u = decodeURIComponent(u.split('url=')[1].split('&')[0]);
  }
  if (u.startsWith('http://127.0.0.1:1337')) {
    u = u.replace('http://127.0.0.1:1337', '');
  }
  if (u.startsWith('/')) {
    assets.add(u);
  }
}

console.log(`Found ${assets.size} unique assets in staging our-company.`);

async function checkAndDownload() {
  let downloaded = 0;
  for (const asset of assets) {
    const local = path.join(__dirname, '../public', asset.replace(/\//g, path.sep));
    if (!fs.existsSync(local)) {
      try {
        const res = await fetch('https://stagingunimrkt.roimantra-dev.in' + asset);
        if (res.ok) {
          fs.mkdirSync(path.dirname(local), { recursive: true });
          fs.writeFileSync(local, Buffer.from(await res.arrayBuffer()));
          downloaded++;
          console.log('Downloaded:', asset);
        } else {
          console.log('HTTP ' + res.status + ':', asset);
        }
      } catch (e) {
        console.error('Error fetching ' + asset + ':', e.message);
      }
    }
  }
  console.log(`Downloaded ${downloaded} missing assets for our-company.`);
}

checkAndDownload().catch(console.error);

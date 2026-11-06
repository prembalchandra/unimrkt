const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'staging_home.html'), 'utf8');

const regex = /(?:src=["']|url\()([^"')\s]+)(?:["']|\))/gi;
let match;
const urls = new Set();

while ((match = regex.exec(html)) !== null) {
  let u = match[1];
  if (u.includes('/_next/image?url=')) {
    const dec = decodeURIComponent(u.split('/_next/image?url=')[1].split('&')[0]);
    urls.add(dec);
  } else if (!u.startsWith('data:') && !u.startsWith('#') && !u.startsWith('http')) {
    urls.add(u);
  } else if (u.startsWith('http://127.0.0.1:1337/uploads/')) {
    urls.add(u.replace('http://127.0.0.1:1337', ''));
  }
}

console.log('Unique assets found on staging home page:', urls.size);

async function checkAndDownload() {
  for (let u of urls) {
    let clean = u.split('?')[0];
    if (clean.startsWith('/')) clean = clean.slice(1);
    const localP = path.join(__dirname, '../public', clean);
    
    if (!fs.existsSync(localP)) {
      console.log('Missing asset:', clean, '-> downloading from staging...');
      try {
        const stagingUrl = 'https://stagingunimrkt.roimantra-dev.in/' + clean;
        const res = await fetch(stagingUrl);
        if (res.ok) {
          const buf = await res.arrayBuffer();
          fs.mkdirSync(path.dirname(localP), { recursive: true });
          fs.writeFileSync(localP, Buffer.from(buf));
          console.log('  Downloaded:', clean);
        } else {
          console.log('  Failed to fetch (status ' + res.status + '):', stagingUrl);
        }
      } catch (err) {
        console.log('  Error downloading:', clean, err.message);
      }
    } else {
      // exists
    }
  }
  console.log('All staging home assets verified!');
}

checkAndDownload();

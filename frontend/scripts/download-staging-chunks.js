const fs = require('fs');
const path = require('path');

async function downloadChunks() {
  const chunks = [
    '/_next/static/chunks/app/services/page-b1bd7e45e9b5c3ba.js',
    '/_next/static/chunks/app/industries/page-573bbcffdeb99dab.js',
    '/_next/static/chunks/app/%5B%5B...slug%5D%5D/page-1284ae75463e24ad.js',
    '/_next/static/chunks/846-3472ef5a95c7189c.js',
    '/_next/static/chunks/732-e54b0fb51902a651.js'
  ];

  for (const c of chunks) {
    const filename = c.split('/').pop();
    const res = await fetch('https://stagingunimrkt.roimantra-dev.in' + c);
    if (res.ok) {
      const code = await res.text();
      fs.writeFileSync(path.join(__dirname, filename), code);
      console.log(`Saved ${filename} (${code.length} bytes)`);
    } else {
      console.log(`Failed to fetch ${c}: ${res.status}`);
    }
  }
}

downloadChunks().catch(console.error);

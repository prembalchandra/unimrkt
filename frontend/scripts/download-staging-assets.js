const fs = require('fs');
const path = require('path');

async function downloadAssets() {
  const html = fs.readFileSync('frontend/scripts/staging_contact.html', 'utf8');

  // Match all src="/..." or url=%2F...
  const rawUrls = [];
  const srcMatches = [...html.matchAll(/src="(\/[^"]+)"/g)].map(m => m[1]);
  rawUrls.push(...srcMatches);

  const srcsetMatches = [...html.matchAll(/srcSet="([^"]+)"/g)].map(m => m[1]);
  srcsetMatches.forEach(s => {
    s.split(',').forEach(part => {
      const u = part.trim().split(' ')[0];
      if (u.startsWith('/')) rawUrls.push(u);
    });
  });

  const nextImgMatches = [...html.matchAll(/url=([^&"'\s]+)/g)].map(m => decodeURIComponent(m[1]));
  rawUrls.push(...nextImgMatches);

  const cleanUrls = [...new Set(rawUrls)].filter(u => !u.startsWith('/_next/') && (u.startsWith('/') || u.startsWith('http')));
  console.log('Found assets to download:', cleanUrls.length);
  cleanUrls.forEach(u => console.log(' -', u));

  for (let u of cleanUrls) {
    let fetchUrl = u;
    let localRel = u;

    if (u.startsWith('http://127.0.0.1:1337')) {
      // it's a strapi upload! Check if local strapi has it, or fetch from staging
      fetchUrl = u.replace('http://127.0.0.1:1337', 'https://stagingunimrkt.roimantra-dev.in');
      localRel = u.replace('http://127.0.0.1:1337', '');
    } else if (u.startsWith('/')) {
      fetchUrl = `https://stagingunimrkt.roimantra-dev.in${u}`;
    }

    try {
      const res = await fetch(fetchUrl);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        // Determine save destination
        let dest = path.join('frontend/public', localRel);
        if (localRel.startsWith('/uploads/')) {
          dest = path.join('backend/public', localRel);
          // also copy to frontend/public for fallback
          const destFrontend = path.join('frontend/public', localRel);
          fs.mkdirSync(path.dirname(destFrontend), { recursive: true });
          fs.writeFileSync(destFrontend, buffer);
        }
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, buffer);
        console.log('Downloaded:', localRel, `(${buffer.length} bytes)`);
      } else {
        console.warn('Failed to download [', res.status, ']:', fetchUrl);
      }
    } catch (e) {
      console.error('Error downloading:', fetchUrl, e.message);
    }
  }

  console.log('Asset download finished!');
}

downloadAssets().catch(console.error);

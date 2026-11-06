const fs = require('fs');
const path = require('path');

async function downloadMore() {
  const images = [
    '/images/gallery/wave-pattern.png',
    '/images/industries/case-studies-wallpaper.jpg',
    '/images/contact/contact-banner-usa.webp',
    '/images/contact/contact-banner-uk.webp',
  ];

  for (let img of images) {
    const url = `https://stagingunimrkt.roimantra-dev.in${img}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        const dest = path.join('frontend/public', img);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, buf);
        console.log('Downloaded:', img, `(${buf.length} bytes)`);
      } else {
        console.warn('Status', res.status, 'for', img);
      }
    } catch (e) {
      console.warn('Error downloading', img, e.message);
    }
  }
}

downloadMore().catch(console.error);

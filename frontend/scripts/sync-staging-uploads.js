const fs = require('fs');
const path = require('path');

const publicUploads = path.join(__dirname, '../public/uploads');
const backendUploads = path.join(__dirname, '../../backend/public/uploads');

async function downloadMissingStagingUploads() {
  const pages = ['', 'services', 'industries', 'our-company', 'about', 'case-study', 'blog', 'gallery', 'contact'];
  const allUploads = new Set();

  for (const p of pages) {
    try {
      const res = await fetch('https://stagingunimrkt.roimantra-dev.in/' + p);
      const html = await res.text();
      const m = html.matchAll(/\/uploads\/([a-zA-Z0-9_\-\.]+\.(?:jpg|jpeg|png|webp|svg))/g);
      for (const item of m) {
        allUploads.add(item[1]);
      }
    } catch (e) {
      console.warn(`Error on ${p}:`, e.message);
    }
  }

  console.log(`Found ${allUploads.size} unique upload files across staging.`);
  let downloaded = 0;

  for (const filename of allUploads) {
    const fPath = path.join(publicUploads, filename);
    if (!fs.existsSync(fPath)) {
      try {
        const res = await fetch(`https://stagingunimrkt.roimantra-dev.in/uploads/${filename}`);
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(fPath, buf);
          fs.writeFileSync(path.join(backendUploads, filename), buf);
          downloaded++;
          console.log('Downloaded:', filename);
        } else {
          console.log('Not found on staging:', filename, res.status);
        }
      } catch (e) {
        console.error('Error downloading:', filename, e.message);
      }
    }
  }
  console.log(`Downloaded ${downloaded} missing uploads.`);
}

downloadMissingStagingUploads().catch(console.error);

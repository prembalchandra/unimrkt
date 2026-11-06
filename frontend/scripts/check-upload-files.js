const fs = require('fs');
const path = require('path');

const uploads = [
  'hero_photo_9f0cdda1b2.jpg',
  'blog_ai_workforce_0c08f62c7c.jpg',
  'services_earth_36af66b701.jpg',
  'moments_small_b223687baa.jpg',
  'blog_field_research_575a614208.jpg',
  'moments_large_8fa260d861.jpg',
  'industry_banking_49416162c9.jpg',
  'industry_cityscape_f926ff60c2.jpg',
  'industry_retail_9a08ec9395.jpg',
  'process_clipboard_tick_163f70e35c.svg',
  'process_brush_4eb7a168ba.svg',
  'process_presentation_chart_a7b1453e99.svg',
  'process_chart_2696286093.svg',
  'industry_cityscape_4dbcb4ce21.jpg',
  'worldmap_mask_0343012d7e.svg',
  'blog_photo_5afe1d894b.jpg'
];

const backendUploads = path.join(__dirname, '../../backend/public/uploads');
const frontendUploads = path.join(__dirname, '../public/uploads');

async function check() {
  for (const file of uploads) {
    const inBackend = fs.existsSync(path.join(backendUploads, file));
    const inFrontend = fs.existsSync(path.join(frontendUploads, file));
    console.log(file, 'Backend:', inBackend, 'Frontend:', inFrontend);
    if (!inBackend && !inFrontend) {
      // try to download from staging
      try {
        const res = await fetch('https://stagingunimrkt.roimantra-dev.in/uploads/' + file);
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(path.join(frontendUploads, file), buf);
          console.log('  -> Downloaded to frontend/public/uploads:', file);
        }
      } catch (e) {
        console.log('  -> Failed download:', e.message);
      }
    }
  }
}

check().catch(console.error);

const fs = require('fs');
const path = require('path');

async function audit() {
  const pages = ['', 'services', 'industries', 'our-company', 'about', 'case-study', 'blog', 'team', 'work', 'gallery', 'faq', 'contact'];
  const allCss = new Set();
  const allImages = new Set();
  const pageStats = {};

  for (const p of pages) {
    try {
      const url = 'https://stagingunimrkt.roimantra-dev.in/' + p;
      const res = await fetch(url);
      const html = await res.text();
      
      const cssRegex = /href="(\/_next\/static\/css\/[^"]+\.css)"/g;
      let m;
      while ((m = cssRegex.exec(html)) !== null) {
        allCss.add(m[1]);
      }

      const imgRegex = /(?:src|href)="(\/(?:figma-|images\/|uploads\/)[^"]+)"/g;
      let im;
      while ((im = imgRegex.exec(html)) !== null) {
        allImages.add(im[1]);
      }

      pageStats[p || 'home'] = {
        status: res.status,
        htmlLength: html.length,
      };
    } catch (e) {
      pageStats[p || 'home'] = { error: e.message };
    }
  }

  console.log('--- Page Audit ---');
  console.log(pageStats);
  console.log('\n--- All Unique Staging CSS ---');
  console.log(Array.from(allCss));
  console.log('\n--- Total Unique Staging Assets Found ---', allImages.size);
  console.log('Sample Assets:', Array.from(allImages).slice(0, 20));

  fs.writeFileSync(
    path.join(__dirname, 'staging-audit-assets.json'),
    JSON.stringify({ css: Array.from(allCss), images: Array.from(allImages) }, null, 2)
  );
}

audit().catch(console.error);

const fs = require('fs');
const html = fs.readFileSync('frontend/scripts/staging_services_main.html', 'utf8');

const imgTags = html.match(/<img[^>]+>/g) || [];
console.log(`Found ${imgTags.length} <img> tags in staging services:`);
imgTags.forEach((t, i) => {
  const m = t.match(/src="([^"]+)"/);
  const src = m ? m[1] : '';
  let realUrl = src;
  if (src.includes('url=')) {
    const p = src.split('url=')[1].split('&')[0];
    realUrl = decodeURIComponent(p);
  }
  console.log(`[${i}] ${realUrl}`);
});

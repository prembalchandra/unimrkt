const fs = require('fs');
const html = fs.readFileSync('scripts/reference_staging_industries.html', 'utf8');
const sections = html.match(/<section[\s\S]*?<\/section>/g) || [];

for (let i = 0; i < sections.length; i++) {
  const s = sections[i];
  const h = (s.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/) || [])[1] || '';
  const cleanH = h.replace(/<[^>]+>/g, '').trim();
  const imgs = [];
  const imgMatches = s.matchAll(/<img[^>]+src="([^"]+)"/g);
  for (const m of imgMatches) {
    imgs.push(m[1]);
  }
  console.log(`\n=== Section ${i + 1}: ${cleanH} (imgs: ${imgs.length}) ===`);
  if (imgs.length > 0) {
    console.log('Images:', imgs);
  }
  // Check if there is an inner CTA banner (like "Have A Question?")
  if (s.includes('Have A Question')) {
    console.log('>>> CONTAINS: Have A Question banner!');
  }
}

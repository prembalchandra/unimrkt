const fs = require('fs');
const html = fs.readFileSync('scripts/reference_staging_industries.html', 'utf8');

const regex = /<section[\s\S]*?<\/section>/g;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
  count++;
  const s = match[0];
  const h2s = [];
  const h2Matches = s.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g);
  for (const h of h2Matches) {
    h2s.push(h[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
  }
  const h3s = [];
  const h3Matches = s.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g);
  for (const h of h3Matches) {
    h3s.push(h[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
  }
  const kickers = [];
  const kMatches = s.matchAll(/(?:kicker|eyebrow|sub-title|sub-heading)[^>]*>([\s\S]*?)<\/(?:span|p|div)>/gi);
  for (const k of kMatches) {
    kickers.push(k[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
  }

  console.log(`\n================ SECTION ${count} ================`);
  console.log('H2s:', h2s);
  if (h3s.length > 0) console.log('H3s:', h3s.slice(0, 8));
  if (kickers.length > 0) console.log('Kickers:', kickers);
}

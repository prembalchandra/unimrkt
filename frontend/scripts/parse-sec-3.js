const fs = require('fs');
const path = require('path');

const staging = fs.readFileSync(path.join(__dirname, 'staging_home_sec_3.html'), 'utf8');
// Find all card divs
const cards = staging.match(/<div class="relative overflow-hidden[\s\S]*?(?=<div class="relative overflow-hidden|<\/div><\/div><\/section>)/g) || [];
console.log('Cards count:', cards.length);
cards.forEach((c, i) => {
  const h = c.match(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/i);
  console.log(`Card ${i + 1}:`, h ? h[1].replace(/<[^>]+>/g, '').trim() : 'no heading');
});

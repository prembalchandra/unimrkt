const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'staging_home_sec_3.html'), 'utf8');

// Find all <a> tags that are service cards
const cards = content.match(/<a href="\/services"[\s\S]*?<\/a>/gi) || [];
console.log('Cards found:', cards.length);
cards.forEach((c, i) => {
  console.log(`\n--- Card ${i + 1} ---`);
  console.log(c.slice(0, 400));
});

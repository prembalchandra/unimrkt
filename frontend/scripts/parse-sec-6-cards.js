const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'staging_home_sec_6.html'), 'utf8');

const cards = content.match(/<a href="\/industries"[\s\S]*?<\/a>/gi) || [];
console.log('Cards found:', cards.length);
cards.forEach((c, i) => {
  console.log(`\nCard ${i + 1}:`);
  console.log(c.slice(0, 300));
});

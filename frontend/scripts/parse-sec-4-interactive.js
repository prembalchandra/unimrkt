const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'staging_home_sec_4.html'), 'utf8');

// Find all role="button" elements
const buttons = content.match(/<div role="button"[\s\S]*?(?=<div role="button"|<\/div><\/div><\/div><\/section>)/g) || [];
console.log('Stats rows found:', buttons.length);
if (buttons.length > 0) {
  console.log('--- Row 1 ---');
  console.log(buttons[0].slice(0, 800));
}

const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'staging_home_sec_6.html'), 'utf8');
const p = content.indexOf('Healthcare &amp; Life Sciences');
console.log(content.slice(p - 300, p + 800));

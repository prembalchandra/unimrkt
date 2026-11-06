const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'staging_home_sec_8.html'), 'utf8');
const p = content.indexOf('gallery_large_1');
console.log(content.slice(p - 300, p + 500));

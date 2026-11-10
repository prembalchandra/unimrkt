const fs = require('fs');
const html = fs.readFileSync('scripts/staging_sec_5.html', 'utf8');
console.log('staging_sec_5 preview:');
console.log(html.substring(0, 1500));

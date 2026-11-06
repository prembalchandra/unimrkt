const fs = require('fs');
const path = require('path');

const staging = fs.readFileSync(path.join(__dirname, 'staging_home_sec_3.html'), 'utf8');
console.log('--- STAGING SEC 3 (length ' + staging.length + ') ---');
console.log(staging.slice(0, 1500));

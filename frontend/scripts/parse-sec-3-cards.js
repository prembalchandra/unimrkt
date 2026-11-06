const fs = require('fs');
const path = require('path');

const staging = fs.readFileSync(path.join(__dirname, 'staging_home_sec_3.html'), 'utf8');
const p = staging.indexOf('Research Support');
console.log(staging.slice(p - 200, p + 1500));

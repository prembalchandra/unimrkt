const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'staging_home_sec_6.html'), 'utf8');
console.log(content.slice(1000, 4000));

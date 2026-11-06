const fs = require('fs');
const sec = fs.readFileSync('frontend/scripts/staging_sec_3.html', 'utf8');

// Print formatted HTML for sec 3
console.log(sec);

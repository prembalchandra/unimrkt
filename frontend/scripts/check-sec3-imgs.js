const fs = require('fs');
const sec3 = fs.readFileSync('frontend/scripts/staging_sec_3.html', 'utf8');
const imgs = [...sec3.matchAll(/<img[^>]*src="([^"]*)"/g)].map(m => m[1]);
console.log('Section 3 images:', imgs);

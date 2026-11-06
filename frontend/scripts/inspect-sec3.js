const fs = require('fs');
const sec = fs.readFileSync('frontend/scripts/staging_sec_3.html', 'utf8');

// print headers and structure
console.log('Heading match:', sec.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/)?.[1]);
console.log('Office titles:', [...sec.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim()));
console.log('Has map container:', sec.includes('leaflet') || sec.includes('map'));

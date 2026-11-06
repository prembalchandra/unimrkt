const fs = require('fs');
const html = fs.readFileSync('frontend/scripts/staging_contact.html', 'utf8');

const scripts = [...html.matchAll(/<script[^>]*src="([^"]*)"/g)].map(m => m[1]);
const css = [...html.matchAll(/<link[^>]*href="([^"]*)"[^>]*rel="stylesheet"/g)].map(m => m[1]);
console.log('Scripts count:', scripts.length);
console.log('CSS links:', css);
console.log('Scripts:', scripts);

const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'staging_home_sec_7.html'), 'utf8');
const regex = /<img[^>]+src="([^"]+)"/g;
let m;
const imgs = [];
while ((m = regex.exec(content)) !== null) {
  imgs.push(m[1]);
}
console.log('Images:', imgs);

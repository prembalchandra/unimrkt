const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'staging_home_sec_8.html'), 'utf8');
const regex = /src="\/_next\/image\?url=([^&]+)/g;
let m;
const imgs = [];
while ((m = regex.exec(content)) !== null) {
  imgs.push(decodeURIComponent(m[1]));
}
console.log('Images in sec 8:', imgs);

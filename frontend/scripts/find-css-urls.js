const fs = require('fs');
const path = require('path');
const css = fs.readFileSync(path.join(__dirname, '../public/staging-design.css'), 'utf8');
const urls = new Set();
const reg = /url\((?:['"]?)([^'")]+)(?:['"]?)\)/g;
let m;
while ((m = reg.exec(css)) !== null) {
  urls.add(m[1]);
}
console.log('URLs in staging CSS:', Array.from(urls));

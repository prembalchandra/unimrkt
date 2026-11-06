const fs = require('fs');
const html = fs.readFileSync('frontend/scripts/staging_services_main.html', 'utf8');
const imgs = new Set();
const reg = /(?:src|href)=["'](\/[^"']+\.(?:jpg|png|webp|svg))["']/g;
let m;
while ((m = reg.exec(html)) !== null) {
  imgs.add(m[1]);
}
console.log('Images in staging services:', Array.from(imgs));

// Check which exist in frontend/public
const path = require('path');
const publicDir = path.join(__dirname, '../public');
const missing = [];
for (const img of imgs) {
  const local = path.join(publicDir, img.replace(/\//g, path.sep));
  if (!fs.existsSync(local)) missing.push(img);
}
console.log('Missing images for services:', missing);

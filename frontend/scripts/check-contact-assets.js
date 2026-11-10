const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'staging_contact.html'), 'utf8');
const chunk = fs.readFileSync(path.join(__dirname, 'staging_contact_chunk.js'), 'utf8');
const text = html + ' ' + chunk;

const regex = /(figma-[a-zA-Z0-9_\-\/]+|images\/[a-zA-Z0-9_\-\/]+|uploads\/[a-zA-Z0-9_\-\/]+)\.(png|jpg|jpeg|svg|webp)/g;
const matches = new Set();
let match;
while ((match = regex.exec(text)) !== null) {
  matches.add('/' + match[0]);
}

console.log('Total asset paths found:', matches.size);
const publicDir = path.join(__dirname, '..', 'public');
const missing = [];
for (const p of matches) {
  const local = path.join(publicDir, p.replace(/^\//, ''));
  if (!fs.existsSync(local)) {
    missing.push(p);
  }
}
console.log('Missing count:', missing.length);
if (missing.length > 0) {
  console.log('Missing files:', missing);
}

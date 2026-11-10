const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');
const publicDir = path.join(__dirname, '..', 'public');

function findImagesInDir(dir) {
  let images = new Set();
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      const subImages = findImagesInDir(fullPath);
      subImages.forEach(img => images.add(img));
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
      const text = fs.readFileSync(fullPath, 'utf8');
      const matches = text.matchAll(/(?:src=|url\()['"]([^'"]+\.(?:png|jpg|jpeg|svg|webp|mp4))['"]/g);
      for (const m of matches) {
        images.add(m[1]);
      }
    }
  }
  return images;
}

const allImages = findImagesInDir(appDir);
console.log('Total unique image/media references found in app:', allImages.size);

const missing = [];
for (const img of allImages) {
  if (img.startsWith('http')) continue;
  const localPath = path.join(publicDir, img.replace(/^\//, ''));
  if (!fs.existsSync(localPath)) {
    missing.push({ src: img, localPath });
  }
}

console.log('Missing/broken media files count:', missing.length);
if (missing.length > 0) {
  console.log('Missing media:', missing.map(m => m.src));
}

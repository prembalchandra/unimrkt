const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        results = results.concat(walk(fullPath));
      }
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./app').concat(walk('./components'));
const assetImgRegex = /['"]\/asstes\/images\/[^'"]+['"]/g;

const filesWithAssets = [];
files.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  const matches = [...code.matchAll(assetImgRegex)].map(m => m[0]);
  if (matches.length > 0) {
    filesWithAssets.push({ file: f.replace(/\\/g, '/'), count: matches.length, samples: matches });
  }
});

console.log(`Found ${filesWithAssets.length} files still containing /asstes/images/:`);
filesWithAssets.forEach(r => console.log(`${r.file}:`, r.samples));

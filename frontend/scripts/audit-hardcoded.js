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
    } else if (
      file.endsWith('.jsx') ||
      (file.endsWith('.js') &&
        !file.includes('strapi.js') &&
        !file.includes('next.config') &&
        !fullPath.includes('scripts'))
    ) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./app').concat(walk('./components'));
const fallbackRegex = /\|\|\s*['"]([^'"]{4,})['"]/g;
const assetImgRegex = /['"]\/asstes\/images\/[^'"]+['"]/g;

let totalFallbacks = 0;
let totalAssetImgs = 0;
const report = [];

files.forEach((f) => {
  const code = fs.readFileSync(f, 'utf8');
  const fallbacks = [...code.matchAll(fallbackRegex)].map((m) => m[1]);
  const assetImgs = [...code.matchAll(assetImgRegex)].map((m) => m[0]);
  if (fallbacks.length > 0 || assetImgs.length > 0) {
    report.push({
      file: f.replace(/\\/g, '/'),
      fallbacksCount: fallbacks.length,
      assetImgsCount: assetImgs.length,
      sampleFallbacks: fallbacks.slice(0, 3),
      sampleImgs: assetImgs.slice(0, 3),
    });
    totalFallbacks += fallbacks.length;
    totalAssetImgs += assetImgs.length;
  }
});

console.log('Files with content fallbacks or static image assets:', report.length);
console.log('Total string fallbacks:', totalFallbacks);
console.log('Total asset image references:', totalAssetImgs);
console.log('\nBreakdown:');
report
  .sort((a, b) => b.fallbacksCount + b.assetImgsCount - (a.fallbacksCount + a.assetImgsCount))
  .forEach((r) => {
    console.log(
      r.file.padEnd(65),
      '| Fallbacks:',
      String(r.fallbacksCount).padStart(3),
      '| Imgs:',
      String(r.assetImgsCount).padStart(3)
    );
  });

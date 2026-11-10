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
const fallbackRegex = /\|\|\s*['"]([^'"]{4,})['"]/g;

const list = [];
files.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  const matches = [...code.matchAll(fallbackRegex)].map(m => m[1]);
  if (matches.length > 0) {
    list.push({ file: f.replace(/\\/g, '/'), matches });
  }
});

console.log(`Found ${list.length} files with string fallbacks:`);
list.forEach(item => {
  console.log(`\n=== ${item.file} (${item.matches.length}) ===`);
  item.matches.forEach(m => console.log(`   - "${m}"`));
});

const fs = require('fs');
const path = require('path');

const pageFile = path.join(__dirname, '../app/industries/page.js');
const pageContent = fs.readFileSync(pageFile, 'utf8');

// Find all imports in industries/page.js
const importRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+['"]([^'"]+)['"]/g;
let m;
const imports = [];
while ((m = importRegex.exec(pageContent)) !== null) {
  imports.push({ name: m[1], path: m[2] });
}

console.log('Imports in industries/page.js:', imports.length);
imports.forEach(imp => {
  const resolved = path.resolve(path.dirname(pageFile), imp.path + (imp.path.endsWith('.jsx') || imp.path.endsWith('.js') ? '' : '.jsx'));
  const jsResolved = resolved.replace(/\.jsx$/, '.js');
  const target = fs.existsSync(resolved) ? resolved : (fs.existsSync(jsResolved) ? jsResolved : null);
  if (target) {
    const code = fs.readFileSync(target, 'utf8');
    // Check if any props or variables might be rendered
    console.log(`- ${imp.name}: (${code.length} bytes)`);
  } else {
    console.log(`- ${imp.name}: NOT FOUND at ${resolved}`);
  }
});

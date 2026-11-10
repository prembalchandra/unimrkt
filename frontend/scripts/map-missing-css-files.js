const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');
const cssPath = path.join(__dirname, '..', 'public', 'asstes', 'css', 'style.css');
const globalCssPath = path.join(__dirname, '..', 'public', 'asstes', 'css', 'global.css');

const cssContent = fs.readFileSync(cssPath, 'utf8') + ' ' + fs.readFileSync(globalCssPath, 'utf8');

function findMissingClassesWithFiles(dir) {
  const result = {};
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      const sub = findMissingClassesWithFiles(fullPath);
      Object.assign(result, sub);
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
      const text = fs.readFileSync(fullPath, 'utf8');
      const matches = text.matchAll(/className=["']([^"']+)["']/g);
      const missingInFile = [];
      for (const m of matches) {
        m[1].split(/\s+/).forEach(c => {
          if (c && !c.includes('{') && !c.includes('$') && !c.startsWith('fa-')) {
            const escaped = c.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp('\\.' + escaped + '[^a-zA-Z0-9_-]', 'i');
            if (!regex.test(cssContent)) {
              if (!missingInFile.includes(c)) missingInFile.push(c);
            }
          }
        });
      }
      if (missingInFile.length > 0) {
        const rel = path.relative(appDir, fullPath);
        result[rel] = missingInFile;
      }
    }
  }
  return result;
}

const map = findMissingClassesWithFiles(appDir);
console.log('Files with missing CSS classes:');
for (const [file, classes] of Object.entries(map)) {
  console.log(`\n${file} (${classes.length} missing):`);
  console.log('   ', classes.join(', '));
}

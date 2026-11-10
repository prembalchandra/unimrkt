const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');
const cssPath = path.join(__dirname, '..', 'public', 'asstes', 'css', 'style.css');
const globalCssPath = path.join(__dirname, '..', 'public', 'asstes', 'css', 'global.css');

const cssContent = fs.readFileSync(cssPath, 'utf8') + ' ' + fs.readFileSync(globalCssPath, 'utf8');

function extractClassesFromDir(dir) {
  let classes = new Set();
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      const subClasses = extractClassesFromDir(fullPath);
      subClasses.forEach(c => classes.add(c));
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
      const text = fs.readFileSync(fullPath, 'utf8');
      const matches = text.matchAll(/className=["']([^"']+)["']/g);
      for (const m of matches) {
        m[1].split(/\s+/).forEach(c => {
          if (c && !c.includes('{') && !c.includes('$')) {
            classes.add(c);
          }
        });
      }
    }
  }
  return classes;
}

const allClasses = extractClassesFromDir(appDir);
console.log('Total unique className tokens found in app:', allClasses.size);

const missing = [];
for (const cls of allClasses) {
  // Check if class exists as .cls in CSS
  const escaped = cls.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp('\\.' + escaped + '[^a-zA-Z0-9_-]', 'i');
  if (!regex.test(cssContent)) {
    missing.push(cls);
  }
}

console.log('Classes not found in style.css or global.css:', missing.length);
console.log('\nSample missing classes:');
console.log(missing.slice(0, 50));

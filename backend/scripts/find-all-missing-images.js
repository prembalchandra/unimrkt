const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '../../frontend/public');
const frontendDir = path.resolve(__dirname, '../../frontend');

function scanDir(dir, missing = new Set(), found = new Set()) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.next' && item !== '.git') {
        scanDir(full, missing, found);
      }
    } else if (item.endsWith('.js') || item.endsWith('.jsx') || item.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.matchAll(/\/asstes\/images\/[^"'`)\s;,]+/g);
      for (const m of matches) {
        let cleanPath = m[0].split('?')[0].replace(/['"`]/g, '').replace(/[,;]+$/, '');
        // Ignore template literals or dynamic interpolations
        if (cleanPath.includes('${') || cleanPath.endsWith('/') || cleanPath.endsWith('.')) continue;

        // Check file extension
        const ext = path.extname(cleanPath);
        if (!['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.mp4'].includes(ext.toLowerCase())) {
          continue;
        }

        const diskPath = path.join(publicDir, cleanPath);
        if (!fs.existsSync(diskPath)) {
          // Check if .png exists when .webp was requested or vice versa
          const altExt = ext === '.webp' ? '.png' : '.webp';
          const altPath = diskPath.replace(ext, altExt);
          const hasAlt = fs.existsSync(altPath);

          missing.add({
            ref: cleanPath,
            source: path.relative(frontendDir, full),
            hasAlt,
            altExt: hasAlt ? altExt : null,
          });
        } else {
          found.add(cleanPath);
        }
      }
    }
  }
  return { missing, found };
}

const { missing, found } = scanDir(frontendDir);
console.log(`\nScan Complete:`);
console.log(`  Valid images referenced: ${found.size}`);
console.log(`  Missing images referenced: ${missing.size}`);

for (const m of missing) {
  console.log(`  ❌ ${m.ref} (in ${m.source}) ${m.hasAlt ? `[Alt exists: ${m.altExt}]` : '[NO FILE FOUND]'}`);
}

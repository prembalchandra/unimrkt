const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  const list = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      list.push(...getFiles(full));
    } else if (ent.name.endsWith('.jsx') || ent.name.endsWith('.tsx')) {
      list.push(full);
    }
  }
  return list;
}

const baseDir = path.resolve(__dirname, '..');
const appFiles = getFiles(path.join(baseDir, 'app'));
const compFiles = getFiles(path.join(baseDir, 'components'));

const allFiles = [...appFiles, ...compFiles];
console.log('Auditing ' + allFiles.length + ' JSX/TSX files...');

const suspicious = [];

for (const f of allFiles) {
  const rel = path.relative(baseDir, f);
  if (rel.includes('node_modules') || rel.includes('.next')) continue;
  const content = fs.readFileSync(f, 'utf8');

  // Look for hardcoded kickers / titles / subtitles
  const hardcodedElements = [];

  // Match <span>Text</span> where Text has 2+ letters and no {
  const kickerMatch = content.match(/<span[^>]*class(?:Name)?=["'][^"']*(?:kicker|subtitle|badge|tag)[^"']*["'][^>]*>([^<{]+)<\/span>/gi);
  if (kickerMatch) {
    hardcodedElements.push(...kickerMatch);
  }

  // Match <h[1-6] class="...heading...">Text</h[1-6]>
  const headingMatch = content.match(/<h[1-6][^>]*class(?:Name)?=["'][^"']*(?:title|heading)[^"']*["'][^>]*>([^<{]+)<\/h[1-6]>/gi);
  if (headingMatch) {
    hardcodedElements.push(...headingMatch);
  }

  // Match <p class="...subtitle|description|sub-text...">Text</p>
  const descMatch = content.match(/<p[^>]*class(?:Name)?=["'][^"']*(?:subtitle|description|sub-text)[^"']*["'][^>]*>([^<{]+)<\/p>/gi);
  if (descMatch) {
    hardcodedElements.push(...descMatch);
  }

  if (hardcodedElements.length > 0) {
    suspicious.push({ file: rel, elements: hardcodedElements });
  }
}

console.log(`Found ${suspicious.length} files with hardcoded section headers/elements:`);
for (const s of suspicious) {
  console.log(`\n=== ${s.file} (${s.elements.length} elements) ===`);
  s.elements.slice(0, 10).forEach(e => console.log('  ' + e.trim()));
}

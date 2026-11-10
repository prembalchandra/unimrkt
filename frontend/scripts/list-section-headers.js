const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../app');
const pages = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

for (const page of pages) {
  const secDir = path.join(baseDir, page, 'sections');
  if (!fs.existsSync(secDir)) continue;
  const secFiles = fs.readdirSync(secDir).filter(f => f.endsWith('.jsx') || f.endsWith('.tsx'));
  const hardcoded = [];
  for (const sf of secFiles) {
    const content = fs.readFileSync(path.join(secDir, sf), 'utf8');
    const hasKicker = /<span[^>]*class(?:Name)?=["'][^"']*(?:kicker|sub-title)[^"']*["'][^>]*>([^<{]+)<\/span>/i.exec(content);
    const hasHeading = /<h[1-6][^>]*class(?:Name)?=["'][^"']*(?:title|heading)[^"']*["'][^>]*>([^<{]+)<\/h[1-6]>/i.exec(content);
    if (hasKicker || hasHeading) {
      hardcoded.push({
        file: sf,
        kicker: hasKicker ? hasKicker[1].trim() : null,
        heading: hasHeading ? hasHeading[1].trim() : null
      });
    }
  }
  if (hardcoded.length > 0) {
    console.log(`\n=== Page [${page}] (${hardcoded.length} sections) ===`);
    for (const h of hardcoded) {
      console.log(`  - ${h.file}`);
      if (h.kicker) console.log(`      kicker : "${h.kicker}"`);
      if (h.heading) console.log(`      heading: "${h.heading}"`);
    }
  }
}

const fs = require('fs');
const path = require('path');

for (let i = 1; i <= 9; i++) {
  const p = path.join(__dirname, `staging_sec_${i}.html`);
  const content = fs.readFileSync(p, 'utf8');
  const h = (content.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi) || []).map(x => x.replace(/<[^>]+>/g, '').trim());
  const tag = content.match(/^<([a-z0-9]+)([^>]*)>/i);
  console.log(`\n=== Section ${i} (${content.length}b) ===`);
  console.log('Heading:', h.join(' | '));
  console.log('Top Tag:', tag ? tag[0].slice(0, 150) : '');
}

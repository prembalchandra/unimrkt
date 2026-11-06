const fs = require('fs');
const path = require('path');

[6, 7, 8, 9, 10, 11, 12].forEach(num => {
  const f = path.join(__dirname, `staging_home_sec_${num}.html`);
  const content = fs.readFileSync(f, 'utf8');
  const h = (content.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi) || []).map(x => x.replace(/<[^>]+>/g, '').trim());
  const tag = content.match(/^<([a-z0-9]+)([^>]*)>/i);
  console.log(`Sec ${num} (${content.length}b):`, h.join(' | '));
  console.log('  Top tag:', tag ? tag[0].slice(0, 100) : '');
});

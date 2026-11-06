const fs = require('fs');
const path = require('path');

function inspectSec(num) {
  const file = path.join(__dirname, `staging_our_company_sec_${num}.html`);
  if (!fs.existsSync(file)) {
    console.log(`Sec ${num} does not exist`);
    return;
  }
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n=== SECTION ${num} (${content.length} chars) ===`);
  
  // Find headings
  const headings = content.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi) || [];
  console.log('Headings:', headings.map(h => h.replace(/<[^>]+>/g, '').trim()));
  
  // Find images
  const imgs = content.match(/<img[^>]+>/gi) || [];
  console.log(`Images (${imgs.length}):`);
  imgs.forEach(img => {
    const srcMatch = img.match(/src="([^"]+)"/);
    const altMatch = img.match(/alt="([^"]+)"/);
    console.log(`  - alt="${altMatch ? altMatch[1] : ''}" src="${srcMatch ? srcMatch[1] : ''}"`);
  });

  // Top level tag and classes
  const tagMatch = content.match(/^<([a-z0-9]+)([^>]*)>/i);
  if (tagMatch) {
    console.log('Top tag:', tagMatch[1], 'attrs:', tagMatch[2]);
  }
}

[8, 9, 10, 11, 12].forEach(inspectSec);

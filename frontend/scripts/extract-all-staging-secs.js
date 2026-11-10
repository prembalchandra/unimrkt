const fs = require('fs');
const html = fs.readFileSync('scripts/reference_staging_industries.html', 'utf8');

const regex = /<section[\s\S]*?<\/section>/g;
const sections = html.match(regex) || [];

console.log(`Found ${sections.length} sections.`);
for (let i = 1; i <= 9; i++) {
  fs.writeFileSync(`scripts/staging_sec_${i}.html`, sections[i - 1], 'utf8');
  console.log(`Saved staging_sec_${i}.html (length: ${sections[i-1].length})`);
}

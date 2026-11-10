const fs = require('fs');
const html = fs.readFileSync('scripts/reference_staging_industries.html', 'utf8');

const sections = html.match(/<section[\s\S]*?<\/section>/g) || [];

console.log('Extracting design details for each section...');

// Let's write each section HTML to a clean file so we can inspect and replicate its exact styling perfectly!
sections.forEach((s, i) => {
  fs.writeFileSync('scripts/sec_' + (i + 1) + '.html', s, 'utf8');
});
console.log('Saved 13 sections into scripts/sec_1.html to sec_13.html');

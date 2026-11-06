const fs = require('fs');
const html = fs.readFileSync('frontend/scripts/staging_contact.html', 'utf8');

const secRegex = /<section[\s\S]*?<\/section>/g;
const sections = html.match(secRegex) || [];

sections.forEach((sec, i) => {
  fs.writeFileSync(`frontend/scripts/staging_sec_${i + 1}.html`, sec, 'utf8');
  console.log(`Saved staging_sec_${i + 1}.html, length: ${sec.length}`);
});

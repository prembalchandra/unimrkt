const fs = require('fs');
const html = fs.readFileSync('frontend/scripts/staging_contact.html', 'utf8');

// Print all section tags and their immediate children in staging HTML
const secRegex = /<section[\s\S]*?<\/section>/g;
const sections = html.match(secRegex) || [];
console.log('Total sections in staging:', sections.length);

sections.forEach((sec, i) => {
  console.log(`\n================ SECTION ${i + 1} ================`);
  const lines = sec.split('\n').map(l => l.trim()).filter(Boolean);
  console.log('First 5 lines:');
  console.log(lines.slice(0, 5).join('\n'));
});

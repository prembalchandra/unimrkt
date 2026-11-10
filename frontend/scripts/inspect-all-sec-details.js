const fs = require('fs');

const html4 = fs.readFileSync('scripts/sec_4.html', 'utf8');
const articles4 = html4.match(/<article[\s\S]*?<\/article>/g) || [];
console.log('--- SECTION 4 CARDS (' + articles4.length + ') ---');
articles4.forEach((a, i) => {
  const h = (a.match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || [])[1] || '';
  console.log((i + 1) + ':', h.replace(/<[^>]+>/g, '').trim(), '| has bg-[#a82c31]:', a.includes('bg-[#a82c31]'));
});

const html5 = fs.readFileSync('scripts/sec_5.html', 'utf8');
console.log('\n--- SECTION 5 (Questions to Insights + CTA) ---');
console.log('Length:', html5.length);
// Check if CTA banner "Have A Question" is inside or nearby
console.log('Has "Have A Question":', html5.includes('Have A Question'));

const html6 = fs.readFileSync('scripts/sec_6.html', 'utf8');
console.log('\n--- SECTION 6 (Business Questions to Outcomes) ---');
console.log('Length:', html6.length);

const html7 = fs.readFileSync('scripts/sec_7.html', 'utf8');
console.log('\n--- SECTION 7 (Local Insight Global Reach) ---');
console.log('Length:', html7.length);

const html8 = fs.readFileSync('scripts/sec_8.html', 'utf8');
console.log('\n--- SECTION 8 (Turning Research Into Impact) ---');
console.log('Length:', html8.length);

const html9 = fs.readFileSync('scripts/sec_9.html', 'utf8');
console.log('\n--- SECTION 9 (Trusted Partner Testimonials) ---');
console.log('Length:', html9.length);

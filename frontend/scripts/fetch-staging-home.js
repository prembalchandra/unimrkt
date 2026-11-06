const fs = require('fs');
const path = require('path');

async function run() {
  console.log('Fetching staging home page...');
  const res = await fetch('https://stagingunimrkt.roimantra-dev.in/');
  const html = await res.text();
  
  const outPath = path.join(__dirname, 'staging_home.html');
  fs.writeFileSync(outPath, html);
  console.log('Saved staging_home.html (' + html.length + ' bytes)');

  // Split into sections
  const secRegex = /<section[\s\S]*?<\/section>/gi;
  const sections = html.match(secRegex) || [];
  console.log('Found', sections.length, 'sections');

  sections.forEach((sec, idx) => {
    const secPath = path.join(__dirname, `staging_home_sec_${idx + 1}.html`);
    fs.writeFileSync(secPath, sec);
    const headings = (sec.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi) || []).map(h => h.replace(/<[^>]+>/g, '').trim());
    console.log(`Section ${idx + 1} (${sec.length} bytes):`, headings.join(' | '));
  });
}

run().catch(console.error);

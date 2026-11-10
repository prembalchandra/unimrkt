const { execSync } = require('child_process');
const fs = require('fs');

try {
  const html = execSync('git show 18eef90e70b7c6733f4a1c26be477de841293566~1:frontend/scripts/staging_industries.html', {
    maxBuffer: 20 * 1024 * 1024,
    encoding: 'utf8'
  });
  console.log('HTML length:', html.length);

  // Extract sections
  const sections = html.match(/<section[\s\S]*?<\/section>/g) || [];
  console.log('Total sections in staging_industries.html:', sections.length);

  sections.forEach((s, i) => {
    const headings = (s.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/g) || []).map(h => h.replace(/<[^>]+>/g, '').trim());
    const kickers = (s.match(/(?:kicker|eyebrow|sub-title)[^>]*>([\s\S]*?)<\/span>/gi) || []).map(k => k.replace(/<[^>]+>/g, '').trim());
    const classes = (s.match(/class="([^"]+)"/) || [])[1] || '';
    console.log(`\n--- Section ${i + 1} (${classes}) ---`);
    console.log('Kickers:', kickers.join(' | '));
    console.log('Headings:', headings.join(' | '));
  });

  // Save the full file to temporary inspect directory so we can reference its exact classes and HTML structure!
  fs.writeFileSync('scripts/reference_staging_industries.html', html, 'utf8');
  console.log('\nSaved full reference to frontend/scripts/reference_staging_industries.html');
} catch (e) {
  console.error('Error:', e.message);
}

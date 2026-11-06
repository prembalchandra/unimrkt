const fs = require('fs');

async function extractIndustriesHtml() {
  const res = await fetch('https://stagingunimrkt.roimantra-dev.in/industries');
  const html = await res.text();
  fs.writeFileSync('frontend/scripts/staging_industries.html', html);
  console.log('Saved staging_industries.html, length:', html.length);

  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (mainMatch) {
    const mainHtml = mainMatch[1];
    fs.writeFileSync('frontend/scripts/staging_industries_main.html', mainHtml);
    console.log('Saved staging_industries_main.html, length:', mainHtml.length);

    // Split top-level elements of <main>
    const sections = [];
    let depth = 0;
    let currentStart = -1;
    let currentTag = '';

    const tagRegex = /<\/?([a-zA-Z0-9]+)(?:\s+[^>]*)?>/g;
    let match;

    while ((match = tagRegex.exec(mainHtml)) !== null) {
      const fullTag = match[0];
      const tagName = match[1].toLowerCase();
      const isClosing = fullTag.startsWith('</');
      const isSelfClosing = fullTag.endsWith('/>') || ['img', 'input', 'br', 'hr'].includes(tagName);

      if (isSelfClosing) continue;

      if (!isClosing) {
        if (depth === 0) {
          currentStart = match.index;
          currentTag = tagName;
        }
        depth++;
      } else {
        depth--;
        if (depth === 0 && currentStart !== -1) {
          const sectionHtml = mainHtml.substring(currentStart, match.index + fullTag.length);
          sections.push(sectionHtml);
          currentStart = -1;
        }
      }
    }

    console.log(`Found ${sections.length} top-level sections in <main> for industries:`);
    sections.forEach((sec, idx) => {
      const firstTag = sec.substring(0, sec.indexOf('>') + 1);
      const headingMatch = sec.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/);
      const heading = headingMatch ? headingMatch[1].replace(/<[^>]+>/g, '').trim() : '(No heading)';
      console.log(`Section ${idx + 1}: ${firstTag.substring(0, 80)}... Heading: "${heading}" (Length: ${sec.length})`);
      fs.writeFileSync(`frontend/scripts/staging_industries_sec_${idx + 1}.html`, sec);
    });
  }
}

extractIndustriesHtml().catch(console.error);

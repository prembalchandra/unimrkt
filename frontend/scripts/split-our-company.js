const fs = require('fs');

const html = fs.readFileSync('frontend/scripts/staging_our_company.html', 'utf8');
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);

if (mainMatch) {
  const mainHtml = mainMatch[1];
  const sections = [];
  let depth = 0;
  let currentStart = -1;

  const tagRegex = /<\/?([a-zA-Z0-9]+)(?:\s+[^>]*)?>/g;
  let match;

  while ((match = tagRegex.exec(mainHtml)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || ['img', 'input', 'br', 'hr'].includes(tagName);

    if (isSelfClosing) continue;

    if (!isClosing) {
      if (depth === 0) currentStart = match.index;
      depth++;
    } else {
      depth--;
      if (depth === 0 && currentStart !== -1) {
        sections.push(mainHtml.substring(currentStart, match.index + fullTag.length));
        currentStart = -1;
      }
    }
  }

  console.log(`Found ${sections.length} sections in <main> for /our-company:`);
  sections.forEach((sec, idx) => {
    const firstTag = sec.substring(0, sec.indexOf('>') + 1);
    const headingMatch = sec.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/);
    const heading = headingMatch ? headingMatch[1].replace(/<[^>]+>/g, '').trim() : '(No heading)';
    console.log(`Section ${idx + 1}: ${firstTag.substring(0, 80)}... Heading: "${heading}" (Length: ${sec.length})`);
    fs.writeFileSync(`frontend/scripts/staging_our_company_sec_${idx + 1}.html`, sec);
  });
}

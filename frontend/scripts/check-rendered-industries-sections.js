const fs = require('fs');
const http = require('http');

http.get('http://localhost:1440/industries', res => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    // Check every section on /industries
    const sections = html.match(/<section[\s\S]*?<\/section>/g) || [];
    console.log('Total sections rendered on /industries:', sections.length);
    sections.forEach((s, i) => {
      const cls = (s.match(/class="([^"]+)"/) || [])[1] || '';
      const h2 = (s.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
      const kicker = (s.match(/(?:kicker|eyebrow)[^>]*>([\s\S]*?)<\/span>/i) || [])[1] || '';
      console.log(`[Section ${i + 1}] class: ${cls.slice(0, 40)} | h2: ${h2.replace(/<[^>]+>/g, '').trim()} | kicker: ${kicker.replace(/<[^>]+>/g, '').trim()}`);
    });
  });
});

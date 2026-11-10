const http = require('http');

http.get('http://localhost:1440/industries', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const sections = data.match(/<section[^>]*>/g) || [];
    console.log('Sections rendered on /industries (' + sections.length + '):');
    sections.forEach((s, i) => console.log((i + 1) + ':', s));

    const h2s = data.match(/<h2[^>]*>([\s\S]*?)<\/h2>/g) || [];
    console.log('\nH2 headings (' + h2s.length + '):');
    h2s.forEach((h, i) => console.log((i + 1) + ':', h.replace(/<[^>]+>/g, '').trim()));
  });
});

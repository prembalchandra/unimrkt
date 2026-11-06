const fs = require('fs');

async function inspectHome() {
  const [sRes, lRes] = await Promise.all([
    fetch('https://stagingunimrkt.roimantra-dev.in/'),
    fetch('http://localhost:1440/')
  ]);
  const [sHtml, lHtml] = await Promise.all([sRes.text(), lRes.text()]);

  const extractMainSections = (html) => {
    const list = [];
    // Match direct children of <main> or major section containers
    const regex = /<(?:section|div)\s+[^>]*class="([^"]*)"[^>]*>/g;
    let m;
    while ((m = regex.exec(html)) !== null) {
      const cls = m[1].trim();
      if (cls.includes('relative') || cls.includes('hero') || cls.includes('bg-') || cls.includes('py-')) {
        list.push(cls);
      }
    }
    return list;
  };

  const sSections = extractMainSections(sHtml);
  const lSections = extractMainSections(lHtml);
  console.log('Staging home major class blocks:', sSections.length);
  console.log('Local home major class blocks:', lSections.length);
  console.log('Sample staging:', sSections.slice(0, 5));
  console.log('Sample local:', lSections.slice(0, 5));
}

inspectHome().catch(console.error);

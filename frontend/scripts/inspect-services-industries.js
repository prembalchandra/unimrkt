const fs = require('fs');

async function inspectPage(pathName) {
  const stagingUrl = 'https://stagingunimrkt.roimantra-dev.in/' + pathName;
  const localUrl = 'http://localhost:1440/' + pathName;

  const [sRes, lRes] = await Promise.all([fetch(stagingUrl), fetch(localUrl)]);
  const [sHtml, lHtml] = await Promise.all([sRes.text(), lRes.text()]);

  // Extract <section> tags or main div blocks
  const extractTags = (html) => {
    const list = [];
    const reg = /<(?:section|div)\s+[^>]*class="([^"]*)"[^>]*>/g;
    let m;
    while ((m = reg.exec(html)) !== null) {
      const cls = m[1].trim();
      if (cls && (cls.includes('section') || cls.includes('hero') || cls.includes('bg-') || cls.includes('py-') || cls.includes('relative'))) {
        list.push(cls);
      }
    }
    return list;
  };

  console.log(`\n=== STAGING ${pathName} ===`);
  const sSections = extractTags(sHtml);
  console.log(`Found ${sSections.length} matching section classes on staging:`);
  sSections.slice(0, 15).forEach((c, i) => console.log(`  [${i}] ${c.substring(0, 100)}`));

  console.log(`\n=== LOCAL ${pathName} ===`);
  const lSections = extractTags(lHtml);
  console.log(`Found ${lSections.length} matching section classes on local:`);
  lSections.slice(0, 15).forEach((c, i) => console.log(`  [${i}] ${c.substring(0, 100)}`));
}

async function run() {
  await inspectPage('services');
  await inspectPage('industries');
}

run().catch(console.error);

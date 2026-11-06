const fs = require('fs');

async function checkScripts(pagePath = '') {
  const res = await fetch('https://stagingunimrkt.roimantra-dev.in/' + pagePath);
  const html = await res.text();
  const scriptRegex = /src="(\/_next\/static\/[^"]+\.js)"/g;
  let m;
  const scripts = [];
  while ((m = scriptRegex.exec(html)) !== null) {
    scripts.push(m[1]);
  }
  console.log(`Scripts on /${pagePath}:`, scripts);
  return { html, scripts };
}

async function run() {
  await checkScripts('');
  await checkScripts('services');
  await checkScripts('industries');
}

run().catch(console.error);

const fs = require('fs');

async function downloadCss() {
  const files = [
    '57c45330d6df97c3.css',
    '521f63a26e047ee1.css',
    'fc1c9daac70c093b.css'
  ];

  for (const f of files) {
    const url = `https://stagingunimrkt.roimantra-dev.in/_next/static/css/${f}`;
    const res = await fetch(url);
    if (res.ok) {
      const text = await res.text();
      fs.writeFileSync(`frontend/public/${f}`, text, 'utf8');
      console.log(`Saved ${f}, size: ${text.length}`);
    } else {
      console.error(`Failed ${f}: ${res.status}`);
    }
  }
}

downloadCss().catch(console.error);

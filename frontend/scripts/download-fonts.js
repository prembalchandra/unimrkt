const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, '../public/staging-design.css'), 'utf8');
const woffMatches = css.matchAll(/(\/_next\/static\/media\/[^'")]+)/g);
const list = new Set();
for (const m of woffMatches) {
  list.add(m[1]);
}

async function downloadFonts() {
  console.log(`Found ${list.size} font/media references in staging CSS.`);
  for (const f of list) {
    const target = path.join(__dirname, '../public', f);
    if (fs.existsSync(target)) continue;
    try {
      const res = await fetch('https://stagingunimrkt.roimantra-dev.in' + f);
      if (res.ok) {
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, Buffer.from(await res.arrayBuffer()));
        console.log('Saved font/media:', f);
      } else {
        console.warn('HTTP ' + res.status + ' for ' + f);
      }
    } catch (e) {
      console.error('Failed ' + f + ':', e.message);
    }
  }
  console.log('Finished font/media download.');
}

downloadFonts().catch(console.error);

const fs = require('fs');
const path = require('path');

const icons = [
  '/icons/industries/intro-ring-outer.svg',
  '/icons/industries/intro-ring-inner.svg',
  '/icons/industries/intro-circle-mask.svg',
  '/uploads/industries_worker_cutout_1aadd8e76c.webp'
];

async function getIcons() {
  for (const item of icons) {
    const local = path.join(__dirname, '../public', item.replace(/\//g, path.sep));
    if (!fs.existsSync(local)) {
      try {
        const res = await fetch('https://stagingunimrkt.roimantra-dev.in' + item);
        if (res.ok) {
          fs.mkdirSync(path.dirname(local), { recursive: true });
          fs.writeFileSync(local, Buffer.from(await res.arrayBuffer()));
          console.log('Downloaded:', item);
        } else {
          console.log('Failed:', item, res.status);
        }
      } catch (e) {
        console.error('Error fetching', item, e.message);
      }
    } else {
      console.log('Already exists:', item);
    }
  }
}

getIcons().catch(console.error);

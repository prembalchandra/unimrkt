const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'staging_our_company_sec_8.html'), 'utf8');

const titles = [...content.matchAll(/font-nav text-\[21px\] font-semibold leading-\[1.33\] text-white">([^<]+)<\/p>/g)].map(m => m[1]);
const imgs = [...content.matchAll(/src="\/_next\/image\?url=([^&]+)/g)].map(m => decodeURIComponent(m[1]));

console.log('Cards count:', titles.length);
titles.forEach((t, i) => {
  console.log(`${i+1}. ${t} -> ${imgs[i]}`);
});

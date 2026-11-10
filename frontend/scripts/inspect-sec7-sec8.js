const fs = require('fs');

const sec7 = fs.readFileSync('scripts/sec_7.html', 'utf8');
const sec8 = fs.readFileSync('scripts/sec_8.html', 'utf8');

console.log('=== SEC 7 (Local Insight Global Reach) ===');
const hIdx7 = sec7.indexOf('<header');
console.log(sec7.slice(hIdx7, hIdx7 + 1800));

console.log('\n=== SEC 8 (Turning Research Into Impact) ===');
const hIdx8 = sec8.indexOf('<header');
console.log(sec8.slice(hIdx8, hIdx8 + 1800));

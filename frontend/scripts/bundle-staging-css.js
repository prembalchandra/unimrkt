const fs = require('fs');

const f1 = fs.readFileSync('frontend/public/57c45330d6df97c3.css', 'utf8');
const f2 = fs.readFileSync('frontend/public/521f63a26e047ee1.css', 'utf8');
const f3 = fs.readFileSync('frontend/public/fc1c9daac70c093b.css', 'utf8');

fs.writeFileSync('frontend/public/staging-design.css', `${f1}\n\n${f2}\n\n${f3}`, 'utf8');
console.log('Created frontend/public/staging-design.css, total size:', (f1.length + f2.length + f3.length));

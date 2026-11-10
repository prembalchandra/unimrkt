const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('.next')) {
        results = results.concat(getFiles(full));
      }
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(full);
    }
  }
  return results;
}

const files = getFiles('app').concat(getFiles('components'));
const cardClasses = new Set();
const btnClasses = new Set();

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const classMatches = content.match(/className=(?:["'`])([^"'`]+)(?:["'`])/g) || [];
  for (const m of classMatches) {
    const val = m.replace(/className=(?:["'`])/, '').replace(/(?:["'`])$/, '');
    val.split(/\s+/).forEach(c => {
      if (c.includes('card') || c.includes('box') || c.includes('item') || c.includes('badge')) cardClasses.add(c);
      if (c.includes('btn') || c.includes('button') || c.includes('cta') || c.includes('link')) btnClasses.add(c);
    });
  }
}

console.log('Total card/box/item classes found in JSX:', cardClasses.size);
console.log('Card classes:', Array.from(cardClasses).sort().join(', '));
console.log('\nTotal btn/cta/link classes found in JSX:', btnClasses.size);
console.log('Btn classes:', Array.from(btnClasses).sort().join(', '));

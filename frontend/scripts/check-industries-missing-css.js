const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, '../app/industries/sections');
const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.jsx'));

const usedClasses = new Set();
for (const file of files) {
  const code = fs.readFileSync(path.join(sectionsDir, file), 'utf8');
  const matches = code.match(/className=(?:["'`])([^"'`]+)(?:["'`])/g) || [];
  for (const m of matches) {
    const clsList = m.replace(/className=(?:["'`])/, '').replace(/(?:["'`])$/, '').split(/\s+/);
    clsList.forEach(c => {
      if (c && !c.includes('${') && !c.includes('?')) usedClasses.add(c);
    });
  }
}

const styleCss = fs.readFileSync(path.join(__dirname, '../public/asstes/css/style.css'), 'utf8');
const globalCss = fs.readFileSync(path.join(__dirname, '../public/asstes/css/global.css'), 'utf8');
const combinedCss = styleCss + '\n' + globalCss;

const missing = [];
const present = [];

for (const cls of Array.from(usedClasses).sort()) {
  const regex = new RegExp('\\.' + cls + '\\b');
  if (!regex.test(combinedCss)) {
    missing.push(cls);
  } else {
    present.push(cls);
  }
}

console.log('Total classes used in app/industries/sections:', usedClasses.size);
console.log('Classes present in CSS:', present.length);
console.log('Classes MISSING from CSS (' + missing.length + '):\n', missing.join(', '));

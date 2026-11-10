const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');
const compDir = path.join(__dirname, '..', 'components');

const auditResults = {
  routes: [],
  pages: {},
  reusableComponents: [],
  hardcodedArrays: [],
  mediaReferences: [],
  forms: [],
  apiCalls: []
};

// 1. Audit routes
const entries = fs.readdirSync(appDir, { withFileTypes: true });
for (const entry of entries) {
  if (entry.isDirectory() && !entry.name.startsWith('[') && entry.name !== '404' && entry.name !== 'homesections') {
    auditResults.routes.push(`/${entry.name}`);
  }
}
auditResults.routes.unshift('/');

function inspectFile(filePath, relPath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Hardcoded arrays: e.g. const reasons = [ ... ], const stats = [ ... ], etc.
  const arrayMatches = content.matchAll(/(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*\[([\s\S]*?)\];/g);
  for (const m of arrayMatches) {
    const varName = m[1];
    const arrayBody = m[2];
    // filter out trivial things
    if (arrayBody.includes('{') || arrayBody.includes("'") || arrayBody.includes('"')) {
      const itemsCount = (arrayBody.match(/\{/g) || []).length || (arrayBody.split(',').length);
      auditResults.hardcodedArrays.push({
        file: relPath,
        variable: varName,
        approxItems: itemsCount
      });
    }
  }

  // Hardcoded media paths
  const imgMatches = content.matchAll(/src=["'](\/asstes\/[^"']+|\/img\/[^"']+)["']/g);
  for (const m of imgMatches) {
    if (!auditResults.mediaReferences.includes(m[1])) {
      auditResults.mediaReferences.push(m[1]);
    }
  }

  // Forms
  if (content.includes('<form') || content.includes('handleSubmit') || content.includes('onSubmit')) {
    auditResults.forms.push({
      file: relPath
    });
  }

  // API calls
  if (content.includes('fetch(') || content.includes('fetchStrapi') || content.includes('getPageBySlug')) {
    auditResults.apiCalls.push({
      file: relPath
    });
  }
}

function walkDir(dir, prefix = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    const rel = path.join(prefix, it.name);
    if (it.isDirectory()) {
      walkDir(full, rel);
    } else if (it.isFile() && (it.name.endsWith('.js') || it.name.endsWith('.jsx'))) {
      inspectFile(full, rel);
    }
  }
}

walkDir(appDir, 'app');
walkDir(compDir, 'components');

console.log('=== AUDIT SUMMARY ===');
console.log('Total routes found:', auditResults.routes.length);
console.log('Hardcoded data arrays found:', auditResults.hardcodedArrays.length);
console.log('Unique media asset paths found:', auditResults.mediaReferences.length);
console.log('Forms found:', auditResults.forms.length);
console.log('API call locations:', auditResults.apiCalls.length);

fs.writeFileSync(path.join(__dirname, 'audit-full-results.json'), JSON.stringify(auditResults, null, 2), 'utf8');
console.log('Wrote audit-full-results.json');

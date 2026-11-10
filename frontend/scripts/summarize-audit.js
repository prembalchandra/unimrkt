const audit = require('./detailed-audit-report.json');

console.log('======================================================================');
console.log('              COMPREHENSIVE PAGE-WISE AUDIT SUMMARY                   ');
console.log('======================================================================\n');

audit.pages.forEach((p, idx) => {
  console.log(`${idx + 1}. ${p.name.toUpperCase()} (${p.route})`);
  console.log(`   Page File: app/${p.pageFile}`);
  console.log(`   Fetches Strapi API: ${p.pageAnalysis?.hasApi ? 'YES (connected)' : 'NO'}`);
  console.log(`   Total Sections: ${p.sections.length}`);
  
  const hardcodedSecs = p.sections.filter(s => s.arrays && s.arrays.length > 0);
  console.log(`   Sections with hardcoded arrays: ${hardcodedSecs.length}`);
  hardcodedSecs.forEach(s => {
    const arrNames = s.arrays.map(a => `${a.name} (${a.count})`).join(', ');
    console.log(`     - ${s.fileName}: ${arrNames}`);
  });
  console.log('');
});

console.log('GLOBAL COMPONENTS:');
audit.globalComponents.forEach(c => {
  const arrNames = c.arrays && c.arrays.length > 0 ? c.arrays.map(a => `${a.name} (${a.count})`).join(', ') : 'none';
  console.log(`  - ${c.fileName}: Arrays: ${arrNames}, Media: ${c.media.length}, Form: ${c.hasForm}`);
});

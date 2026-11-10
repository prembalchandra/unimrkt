const data = require('./audit-full-results.json');
console.log('=== HARDCODED ARRAYS BY FILE ===');
const byFile = {};
data.hardcodedArrays.forEach(item => {
  if (!byFile[item.file]) byFile[item.file] = [];
  byFile[item.file].push(item.variable + ' (~' + item.approxItems + ' items)');
});
for (const [file, arrs] of Object.entries(byFile)) {
  console.log(file + ':');
  console.log('  ' + arrs.join(', '));
}

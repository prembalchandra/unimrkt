const fs = require('fs');
const path = require('path');

[8, 10, 11, 12].forEach(num => {
  const file = path.join(__dirname, `staging_our_company_sec_${num}.html`);
  console.log(`\n================== SECTION ${num} ==================`);
  console.log(fs.readFileSync(file, 'utf8'));
});

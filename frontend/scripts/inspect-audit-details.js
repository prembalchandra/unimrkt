const fs = require('fs');

const fallbackRegex = /\|\|\s*['"]([^'"]{4,})['"]/g;
const imgRegex = /['"]\/asstes\/images\/[^'"]+['"]/g;

['components/Footer.jsx', 'components/Header.jsx', 'app/contact/sections/ContactFaq.jsx', 'app/contact/sections/ContactProcess.jsx', 'app/faq/sections/FaqContent.jsx', 'app/our-company/sections/CompanyAboutSection.jsx'].forEach(file => {
  if (fs.existsSync(file)) {
    const code = fs.readFileSync(file, 'utf8');
    const f = [...code.matchAll(fallbackRegex)].map(m => m[1]);
    const i = [...code.matchAll(imgRegex)].map(m => m[0]);
    console.log(`=== ${file} ===`);
    console.log('Fallbacks:', f);
    console.log('Imgs:', i);
  }
});

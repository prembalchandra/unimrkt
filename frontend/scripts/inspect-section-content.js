const { getPageBySlug } = require('../lib/strapi.js');

async function inspectSections() {
  const about = await getPageBySlug('about');
  console.log('=== ABOUT SECTIONS CONTENT ===');
  about.sections.forEach(s => {
    console.log(`\nComponent: ${s.__component}`);
    console.log(JSON.stringify(s, null, 2));
  });
}

inspectSections();

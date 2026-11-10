const { getPageBySlug } = require('../lib/strapi.js');

const slugs = [
  'home',
  'about',
  'our-company',
  'services',
  'primary-research',
  'telephonic-surveys',
  'industries',
  'automotives',
  'case-study',
  'case-study-details',
  'blog',
  'blog-details',
  'team',
  'gallery',
  'faq',
  'work',
  'contact',
  'privacy-policy'
];

async function inspectAll() {
  for (const slug of slugs) {
    const page = await getPageBySlug(slug);
    const secCount = page?.sections?.length || 0;
    const comps = page?.sections ? page.sections.map(s => s.__component).join(', ') : 'none';
    console.log(`Page: ${slug.padEnd(22)} | Title: ${(page?.title || 'N/A').padEnd(28)} | Sections: ${secCount}`);
    if (comps !== 'none') {
      console.log(`   -> ${comps}`);
    }
  }
}

inspectAll();

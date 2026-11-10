const { getPageBySlug } = require('./lib/strapi');

async function check() {
  const p = await getPageBySlug('home');
  console.log('Home sections count:', p?.sections?.length);
  p?.sections?.forEach((s, i) => {
    console.log(i, s.__component, '| title:', s.title || s.heading, '| kicker:', s.kicker);
  });
}

check().catch(console.error);

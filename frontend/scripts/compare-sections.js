const ROUTES = [
  '/',
  '/about',
  '/our-company',
  '/services',
  '/primary-research',
  '/telephonic-surveys',
  '/industries',
  '/automotives',
  '/case-study',
  '/case-study-details',
  '/blog',
  '/blog-details',
  '/team',
  '/gallery',
  '/faq',
  '/work',
  '/contact',
  '/privacy-policy',
];

async function compare() {
  console.log('Route'.padEnd(25), 'Staging Sections', 'Localhost Sections');
  console.log('-'.repeat(60));

  for (const route of ROUTES) {
    let stagingSecs = 0;
    let localSecs = 0;
    try {
      const resStaging = await fetch(`https://stagingunimrkt.roimantra-dev.in${route}`);
      const htmlStaging = await resStaging.text();
      stagingSecs = (htmlStaging.match(/<section[\s\S]*?<\/section>/g) || []).length;
    } catch (e) {
      stagingSecs = 'ERR';
    }

    try {
      const resLocal = await fetch(`http://localhost:1440${route}`);
      const htmlLocal = await resLocal.text();
      localSecs = (htmlLocal.match(/<section[\s\S]*?<\/section>/g) || []).length;
    } catch (e) {
      localSecs = 'ERR';
    }

    console.log(route.padEnd(25), String(stagingSecs).padEnd(16), String(localSecs));
  }
}

compare().catch(console.error);

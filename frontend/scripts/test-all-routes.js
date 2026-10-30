const http = require('http');

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

async function checkRoute(route) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:1440${route}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const titleMatch = data.match(/<title>([^<]+)<\/title>/);
        const title = titleMatch ? titleMatch[1] : 'No title';
        const hasStrapiUploads = data.toLowerCase().includes('uploads');
        resolve({
          route,
          status: res.statusCode,
          title,
          hasStrapiUploads,
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        route,
        status: 'ERROR',
        error: err.message,
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        route,
        status: 'TIMEOUT',
      });
    });
  });
}

async function run() {
  console.log('Testing all 18 routes on http://127.0.0.1:1440 ...\n');
  const results = [];

  for (const route of ROUTES) {
    const res = await checkRoute(route);
    results.push(res);
    const mark = res.status === 200 ? '✓' : '✗';
    console.log(`${mark} [${res.status}] ${route.padEnd(24)} | Strapi Media: ${res.hasStrapiUploads ? 'YES' : 'NO '} | ${res.title?.slice(0, 50)}...`);
  }

  const successCount = results.filter(r => r.status === 200).length;
  console.log(`\nResults: ${successCount} / ${ROUTES.length} routes working successfully!`);
}

run();

const http = require('http');

const routes = [
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
  '/privacy-policy'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:1440${route}`, (res) => {
      resolve({ route, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ route, status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  console.log('Testing all 18 routes on http://localhost:1440...');
  for (const r of routes) {
    const res = await checkRoute(r);
    console.log(`${res.route.padEnd(25)} => Status: ${res.status}`);
  }
}

run();

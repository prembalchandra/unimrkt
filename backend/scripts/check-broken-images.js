const http = require('http');

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => resolve({ url, status: err.message }));
  });
}

async function testPage(path) {
  try {
    const pageRes = await fetch('http://localhost:1440' + path);
    const html = await pageRes.text();
    const imgRegex = /src=["'](\/[^"']+\.(?:png|jpg|jpeg|webp|svg))["']/g;
    let match;
    const urls = new Set();
    while ((match = imgRegex.exec(html)) !== null) {
      urls.add(match[1]);
    }

    // Also check css background urls
    const bgRegex = /url\(["']?(\/[^"')\s]+\.(?:png|jpg|jpeg|webp|svg))["']?\)/g;
    while ((match = bgRegex.exec(html)) !== null) {
      urls.add(match[1]);
    }

    console.log(`\n--- Testing ${path} (found ${urls.size} images) ---`);
    let failCount = 0;
    for (const u of urls) {
      const res = await checkUrl('http://localhost:1440' + u);
      if (res.status !== 200) {
        console.log(`  ❌ [${res.status}] ${u}`);
        failCount++;
      }
    }
    if (failCount === 0) {
      console.log('  ✅ All images returned 200 OK');
    }
  } catch (err) {
    console.error('Error testing page:', path, err.message);
  }
}

async function run() {
  const pages = [
    '/',
    '/about',
    '/services',
    '/industries',
    '/automotives',
    '/blog',
    '/case-study',
    '/contact',
    '/team',
    '/work',
    '/faq',
    '/gallery',
    '/primary-research',
    '/telephonic-surveys',
  ];
  for (const p of pages) {
    await testPage(p);
  }
}

run();

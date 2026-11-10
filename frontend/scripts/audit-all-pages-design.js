const routes = [
  '/', '/about', '/our-company', '/services', '/primary-research',
  '/telephonic-surveys', '/industries', '/automotives', '/case-study',
  '/case-study-details', '/blog', '/blog-details', '/team', '/gallery',
  '/faq', '/work', '/contact', '/privacy-policy'
];

async function check() {
  console.log('Auditing all 18 routes on localhost:1440...\n');
  for (const r of routes) {
    try {
      const res = await fetch('http://localhost:1440' + r);
      const html = await res.text();
      const hasTailwind = html.includes('staging-design.css') || html.includes('max-w-container');
      const hasStyleCss = html.includes('style.css');
      const sections = (html.match(/<section[\s\S]*?<\/section>/g) || []).length;
      const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || '';
      console.log(`${r.padEnd(22)} | Status: ${res.status} | Secs: ${String(sections).padStart(2)} | Title: ${title.slice(0, 35)}`);
    } catch(e) {
      console.log(`${r.padEnd(22)} | ERROR: ${e.message}`);
    }
  }
}

check().catch(console.error);

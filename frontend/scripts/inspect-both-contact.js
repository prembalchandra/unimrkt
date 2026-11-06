const fs = require('fs');

async function inspectStaging() {
  const res = await fetch('https://stagingunimrkt.roimantra-dev.in/contact');
  const html = await res.text();
  fs.writeFileSync('frontend/scripts/staging_contact.html', html, 'utf8');

  const resLocal = await fetch('http://localhost:1440/contact');
  const htmlLocal = await resLocal.text();
  fs.writeFileSync('frontend/scripts/local_contact.html', htmlLocal, 'utf8');

  console.log('Saved both HTML files.');

  // Extract sections
  const getSecInfo = (h) => {
    const secRegex = /<section[\s\S]*?<\/section>/g;
    const matches = h.match(secRegex) || [];
    return matches.map((s, idx) => {
      const cls = s.match(/<section[^>]*class="([^"]*)"/)?.[1] || '';
      const hTag = s.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';
      const imgs = [...s.matchAll(/<img[^>]*src="([^"]*)"/g)].map(m => m[1]);
      return { idx: idx + 1, cls, hTag, imgs: imgs.slice(0, 3) };
    });
  };

  const stagingSecs = getSecInfo(html);
  const localSecs = getSecInfo(htmlLocal);

  console.log('=== STAGING SECTIONS ===');
  stagingSecs.forEach(s => console.log(`[${s.idx}] class: ${s.cls} | heading: "${s.hTag}" | imgs: ${s.imgs.join(', ')}`));

  console.log('\n=== LOCAL SECTIONS ===');
  localSecs.forEach(s => console.log(`[${s.idx}] class: ${s.cls} | heading: "${s.hTag}" | imgs: ${s.imgs.join(', ')}`));
}

inspectStaging().catch(console.error);

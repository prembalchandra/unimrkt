async function check() {
  const r = await fetch('http://localhost:1440/contact');
  const html = await r.text();
  const secRegex = /<section[\s\S]*?<\/section>/g;
  const matches = html.match(secRegex) || [];
  console.log('Sections count:', matches.length);
  matches.forEach((s, idx) => {
    const cls = s.match(/<section[^>]*class="([^"]*)"/)?.[1] || '';
    const hTag = s.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';
    console.log(`[${idx+1}] class: ${cls.slice(0, 45)} | heading: ${hTag}`);
  });
}
check().catch(console.error);

async function check() {
  const res = await fetch('http://localhost:1440/our-company');
  const html = await res.text();
  console.log('Status:', res.status);
  
  // Search for nextjs error overlay
  if (html.includes('nextjs__container_errors') || html.includes('Unhandled Runtime Error')) {
    console.log('Detected Next.js runtime error overlay!');
    const match = html.match(/<div class="nextjs__container_errors[^>]*>[\s\S]*?<\/div>/);
    if (match) console.log(match[0].slice(0, 500));
  } else {
    console.log('No Next.js runtime error detected! Words with Error:');
    const matches = [...html.matchAll(/([^\n.]{0,40}Error[^\n.]{0,40})/gi)].map(m => m[0].trim());
    console.log(matches.slice(0, 5));
  }
}
check();

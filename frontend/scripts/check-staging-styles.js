const fs = require('fs');
const html = fs.readFileSync('scripts/reference_staging_industries.html', 'utf8');

const styles = html.match(/<style[^>]*>[\s\S]*?<\/style>/g) || [];
console.log('Total style tags:', styles.length);
styles.forEach((s, i) => console.log('Style ' + (i + 1) + ' length:', s.length));

const links = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/g) || [];
console.log('Stylesheet links:', links);

// Check if Tailwind classes like text-[32px], bg-[#f9f9f7], etc. are used
const hasTailwind = /class="[^"]*(?:bg-\[|text-\[|lg:h-|lg:pt-)/.test(html);
console.log('Uses Tailwind utility classes:', hasTailwind);

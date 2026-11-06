const fs = require('fs');
const html = fs.readFileSync('frontend/scripts/staging_contact.html', 'utf8');

const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
if (headMatch) {
  const head = headMatch[1];
  const links = [...head.matchAll(/<link[^>]+>/g)].map(m => m[0]);
  const styles = [...head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[0].slice(0, 100));
  console.log('Staging <head> links:');
  links.forEach(l => console.log(' -', l));
  console.log('\nStaging <style> tags count:', styles.length);
  styles.forEach((s, i) => console.log(` [${i+1}]`, s.replace(/\n/g, ' ')));
}

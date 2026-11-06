const fs = require('fs');

async function extractServicesHtml() {
  const res = await fetch('https://stagingunimrkt.roimantra-dev.in/services');
  const html = await res.text();
  fs.writeFileSync('frontend/scripts/staging_services.html', html);
  console.log('Saved staging_services.html, length:', html.length);

  // Extract <main>...</main> content
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (mainMatch) {
    const mainHtml = mainMatch[1];
    fs.writeFileSync('frontend/scripts/staging_services_main.html', mainHtml);
    console.log('Saved staging_services_main.html, length:', mainHtml.length);

    // Let's count top-level sections or direct child tags
    const sectionRegex = /<(?:section|div)\s+([^>]*)>([\s\S]*?)<\/(?:section|div)>/g;
    console.log('Extracted main structure successfully.');
  }
}

extractServicesHtml().catch(console.error);

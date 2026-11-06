const fs = require('fs');

async function inspectOurCompany() {
  const [ocRes, abRes] = await Promise.all([
    fetch('https://stagingunimrkt.roimantra-dev.in/our-company'),
    fetch('https://stagingunimrkt.roimantra-dev.in/about')
  ]);
  const [ocHtml, abHtml] = await Promise.all([ocRes.text(), abRes.text()]);
  console.log('Staging /our-company status:', ocRes.status, 'HTML length:', ocHtml.length);
  console.log('Staging /about status:', abRes.status, 'HTML length:', abHtml.length);

  fs.writeFileSync('frontend/scripts/staging_our_company.html', ocHtml);
  fs.writeFileSync('frontend/scripts/staging_about.html', abHtml);
}

inspectOurCompany().catch(console.error);

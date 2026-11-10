const fs = require('fs');
const path = require('path');

// Let's print the breadcrumb HTML from staging_contact.html
const contactHtml = fs.readFileSync(path.join(__dirname, 'staging_contact.html'), 'utf8');
const p1 = contactHtml.indexOf('aria-label="Breadcrumb"');
if (p1 !== -1) {
  const breadcrumbDiv = contactHtml.slice(contactHtml.lastIndexOf('<div', p1), contactHtml.indexOf('</nav></div>', p1) + 12);
  console.log('--- BREADCRUMB ---');
  console.log(breadcrumbDiv);
}

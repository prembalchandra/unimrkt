const fs = require('fs');
let code = fs.readFileSync('frontend/app/layout.js', 'utf8');
if (!code.includes('/staging-design.css')) {
  code = code.replace(
    '<link rel="stylesheet" href="/asstes/css/style.css?v=3.5" />',
    '<link rel="stylesheet" href="/asstes/css/style.css?v=3.5" />\n        <link rel="stylesheet" href="/staging-design.css" />'
  );
  fs.writeFileSync('frontend/app/layout.js', code, 'utf8');
  console.log('Added staging-design.css to layout.js');
}

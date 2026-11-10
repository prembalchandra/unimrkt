const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      try {
        let content = fs.readFileSync(fullPath, 'utf8');
        let parsed = JSON.parse(content);
        let modified = false;

        // Check attributes in schema
        if (parsed.attributes) {
          for (const [attrName, attrVal] of Object.entries(parsed.attributes)) {
            if (attrVal.type === 'media') {
              attrVal.allowedTypes = ['images', 'videos', 'files'];
              modified = true;
              console.log(`Updated media field "${attrName}" in ${entry.name}`);
            }
          }
        }

        if (modified) {
          fs.writeFileSync(fullPath, JSON.stringify(parsed, null, 2) + '\n', 'utf8');
          console.log(`Saved: ${fullPath}`);
        }
      } catch (e) {
        console.error(`Error processing ${fullPath}:`, e.message);
      }
    }
  }
}

console.log('Updating all Strapi schemas to allow images, videos, and files...');
processDir(srcDir);
console.log('All schemas updated successfully!');

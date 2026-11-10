const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Fix hero kicker pill typo
  content = content.replace(/-hero-common-sub-tille-area/g, 'hero-common-sub-title-area');
  
  // 2. Fix hero content typo
  content = content.replace(/hero-common-contnet-area/g, 'hero-common-content-area');

  // 3. Fix research impact typo
  content = content.replace(/research-impact-contnet-area/g, 'research-impact-content-area');

  // 4. In HomeresearchCta: fix research-cta-sections and srcn-containers
  content = content.replace(/className="research-cta-sections"/g, 'className="research-cta-section"');
  content = content.replace(/className="srcn-containers"/g, 'className="srcn-container"');

  // 5. In IndustriesSection: fix industries-sections
  content = content.replace(/className="industries-sections"/g, 'className="industries-section"');

  // 6. In HeroSection: fix class= to className=
  content = content.replace(/class="hero-btn-area/g, 'className="hero-btn-area');
  content = content.replace(/class="hero-common-btn-area/g, 'className="hero-common-btn-area');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed typos in:', path.relative(appDir, filePath));
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      walk(full);
    } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
      fixFile(full);
    }
  }
}

walk(appDir);
console.log('Done scanning and fixing JSX typos.');

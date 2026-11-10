const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');
const compDir = path.join(__dirname, '..', 'components');

const pages = [
  { name: 'Home', route: '/', dir: 'homesections', pageFile: 'page.js' },
  { name: 'About', route: '/about', dir: 'about', pageFile: 'about/page.jsx' },
  { name: 'Our Company', route: '/our-company', dir: 'our-company', pageFile: 'our-company/page.jsx' },
  { name: 'Services', route: '/services', dir: 'services', pageFile: 'services/page.jsx' },
  { name: 'Primary Research', route: '/primary-research', dir: 'primary-research', pageFile: 'primary-research/page.jsx' },
  { name: 'Telephonic Surveys', route: '/telephonic-surveys', dir: 'telephonic-surveys', pageFile: 'telephonic-surveys/page.jsx' },
  { name: 'Industries', route: '/industries', dir: 'industries', pageFile: 'industries/page.jsx' },
  { name: 'Automotives', route: '/automotives', dir: 'automotives', pageFile: 'automotives/page.jsx' },
  { name: 'Case Study Listing', route: '/case-study', dir: 'case-study', pageFile: 'case-study/page.jsx' },
  { name: 'Case Study Details', route: '/case-study-details', dir: 'case-study-details', pageFile: 'case-study-details/page.jsx' },
  { name: 'Blog Listing', route: '/blog', dir: 'blog', pageFile: 'blog/page.jsx' },
  { name: 'Blog Details', route: '/blog-details', dir: 'blog-details', pageFile: 'blog-details/page.jsx' },
  { name: 'Team', route: '/team', dir: 'team', pageFile: 'team/page.jsx' },
  { name: 'Gallery', route: '/gallery', dir: 'gallery', pageFile: 'gallery/page.jsx' },
  { name: 'FAQ', route: '/faq', dir: 'faq', pageFile: 'faq/page.jsx' },
  { name: 'Work / Careers', route: '/work', dir: 'work', pageFile: 'work/page.jsx' },
  { name: 'Contact', route: '/contact', dir: 'contact', pageFile: 'contact/page.jsx' },
  { name: 'Privacy Policy', route: '/privacy-policy', dir: 'privacy-policy', pageFile: 'privacy-policy/page.jsx' }
];

function analyzeFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find imports
  const imports = [];
  const importMatches = content.matchAll(/import\s+(?:\{[^}]+\}|[a-zA-Z0-9_$]+)\s+from\s+['"]([^'"]+)['"]/g);
  for (const m of importMatches) {
    imports.push(m[1]);
  }

  // Find hardcoded arrays
  const arrays = [];
  const arrayMatches = content.matchAll(/(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*\[([\s\S]*?)\];/g);
  for (const m of arrayMatches) {
    if (m[2].includes('{') || m[2].includes("'") || m[2].includes('"')) {
      const count = (m[2].match(/\{/g) || []).length || m[2].split(',').length;
      arrays.push({ name: m[1], count });
    }
  }

  // Find images/videos
  const media = [];
  const mediaMatches = content.matchAll(/(?:src|url)=["'](\/(?:asstes|img)\/[^"']+)["']/g);
  for (const m of mediaMatches) {
    if (!media.includes(m[1])) media.push(m[1]);
  }

  // Check form
  const hasForm = content.includes('<form') || content.includes('handleSubmit');

  // Check API
  const hasApi = content.includes('fetchStrapi') || content.includes('getPageBySlug') || content.includes('fetch(');

  return {
    imports,
    arrays,
    media,
    hasForm,
    hasApi
  };
}

const audit = [];

for (const p of pages) {
  const pFile = path.join(appDir, p.pageFile);
  const pAnalysis = analyzeFile(pFile);
  
  // Find sections
  const secDir = path.join(appDir, p.dir, 'sections');
  const sections = [];
  if (fs.existsSync(secDir)) {
    const files = fs.readdirSync(secDir);
    for (const f of files) {
      if (f.endsWith('.jsx') || f.endsWith('.js')) {
        const secPath = path.join(secDir, f);
        const sAnalysis = analyzeFile(secPath);
        sections.push({
          fileName: f,
          ...sAnalysis
        });
      }
    }
  } else if (p.dir === 'homesections') {
    const homeDir = path.join(appDir, 'homesections');
    const files = fs.readdirSync(homeDir);
    for (const f of files) {
      if (f.endsWith('.jsx') || f.endsWith('.js')) {
        const secPath = path.join(homeDir, f);
        const sAnalysis = analyzeFile(secPath);
        sections.push({
          fileName: f,
          ...sAnalysis
        });
      }
    }
  }

  audit.push({
    ...p,
    pageAnalysis: pAnalysis,
    sections
  });
}

// Global components
const globalComps = [];
const compFiles = fs.readdirSync(compDir);
for (const f of compFiles) {
  if (f.endsWith('.jsx') || f.endsWith('.js')) {
    const cAnalysis = analyzeFile(path.join(compDir, f));
    globalComps.push({
      fileName: f,
      ...cAnalysis
    });
  }
}

fs.writeFileSync(path.join(__dirname, 'detailed-audit-report.json'), JSON.stringify({ pages: audit, globalComponents: globalComps }, null, 2));
console.log('Successfully generated detailed-audit-report.json');

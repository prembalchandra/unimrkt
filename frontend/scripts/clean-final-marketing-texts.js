const fs = require('fs');
const path = require('path');

console.log('Cleaning final marketing text fallbacks...');

// 1. app/blog/page.js & app/case-study-details/page.js
['app/blog/page.js', 'app/case-study-details/page.js'].forEach(file => {
  const p = path.join(__dirname, '..', file);
  let code = fs.readFileSync(p, 'utf8');
  code = code
    .replace("kicker={editorialSection?.kicker || 'WHAT WE BELIEVE'}", "kicker={editorialSection?.kicker}")
    .replace("title={editorialSection?.heading || editorialSection?.title || 'Insights That Drive Smarter Business Decisions'}", "title={editorialSection?.heading || editorialSection?.title}");
  fs.writeFileSync(p, code, 'utf8');
  console.log(`✓ ${file} updated`);
});

// 2. app/contact/page.js
const contPagePath = path.join(__dirname, '../app/contact/page.js');
let contPageCode = fs.readFileSync(contPagePath, 'utf8');
contPageCode = contPageCode.replace("kicker={presenceSection?.kicker || 'Office Address'}", "kicker={presenceSection?.kicker}");
fs.writeFileSync(contPagePath, contPageCode, 'utf8');
console.log('✓ app/contact/page.js updated');

// 3. app/contact/sections/ContactProcess.jsx
const cpPath = path.join(__dirname, '../app/contact/sections/ContactProcess.jsx');
let cpCode = fs.readFileSync(cpPath, 'utf8');
cpCode = cpCode
  .replace("const displayKicker = dynamicSection?.kicker || kicker || 'HOW WE ENGAGE';", "const displayKicker = dynamicSection?.kicker || kicker;")
  .replace("const displayTitle = dynamicSection?.heading || dynamicSection?.title || title || 'From First Conversation to Actionable Results';", "const displayTitle = dynamicSection?.heading || dynamicSection?.title || title;")
  .replace("const displayDesc =\n    dynamicSection?.description ||\n    description ||\n    'A structured, transparent research journey designed around your business decisions.';", "const displayDesc = dynamicSection?.description || description;");
fs.writeFileSync(cpPath, cpCode, 'utf8');
console.log('✓ app/contact/sections/ContactProcess.jsx updated');

// 4. app/services/page.js & app/telephonic-surveys/page.js
const servPagePath = path.join(__dirname, '../app/services/page.js');
let servPageCode = fs.readFileSync(servPagePath, 'utf8');
servPageCode = servPageCode
  .replace("kicker={reachSection?.kicker || 'Our Coverage'}", "kicker={reachSection?.kicker}")
  .replace("title={reachSection?.heading || reachSection?.title || 'Research Reach That Goes Beyond Markets'}", "title={reachSection?.heading || reachSection?.title}")
  .replace("kicker={telephonicSection?.kicker || 'About Telephonic Surveys'}", "kicker={telephonicSection?.kicker}")
  .replace("title={telephonicSection?.heading || telephonicSection?.title || 'Direct Conversations. Deeper Insights.'}", "title={telephonicSection?.heading || telephonicSection?.title}");
fs.writeFileSync(servPagePath, servPageCode, 'utf8');
console.log('✓ app/services/page.js updated');

const telePagePath = path.join(__dirname, '../app/telephonic-surveys/page.js');
let telePageCode = fs.readFileSync(telePagePath, 'utf8');
telePageCode = telePageCode
  .replace("kicker={telephonicSection?.kicker || 'About Telephonic Surveys'}", "kicker={telephonicSection?.kicker}")
  .replace("title={telephonicSection?.heading || telephonicSection?.title || 'Direct Conversations. Deeper Insights.'}", "title={telephonicSection?.heading || telephonicSection?.title}");
fs.writeFileSync(telePagePath, telePageCode, 'utf8');
console.log('✓ app/telephonic-surveys/page.js updated');

// 5. app/homesections/GlobalResearchSection.jsx
const grPath = path.join(__dirname, '../app/homesections/GlobalResearchSection.jsx');
let grCode = fs.readFileSync(grPath, 'utf8');
grCode = grCode.replace("const description =\n    dynamicData?.description ||\n    'With 16+ years of expertise delivering structured research data, empowering organizations across 90+ countries to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities.';", "const description = dynamicData?.description;");
fs.writeFileSync(grPath, grCode, 'utf8');
console.log('✓ app/homesections/GlobalResearchSection.jsx updated');

// 6. app/blog-details/sections/BlogDetailContent.jsx
const bdcPath = path.join(__dirname, '../app/blog-details/sections/BlogDetailContent.jsx');
let bdcCode = fs.readFileSync(bdcPath, 'utf8');
bdcCode = bdcCode.replace("const deck =\n    dynamicHero?.description ||\n    'From electrification and software-defined vehicles to new mobility expectations, the automotive landscape is changing at unprecedented speed.';", "const deck = dynamicHero?.description || '';");
fs.writeFileSync(bdcPath, bdcCode, 'utf8');
console.log('✓ app/blog-details/sections/BlogDetailContent.jsx updated');

// 7. app/services/sections/EndToEndSolutions.jsx
const etePath = path.join(__dirname, '../app/services/sections/EndToEndSolutions.jsx');
let eteCode = fs.readFileSync(etePath, 'utf8');
eteCode = eteCode.replace("desc: s.shortDescription || s.description || 'Comprehensive data collection, analysis, and strategic intelligence tailored for global organizations.',", "desc: s.shortDescription || s.description || '',");
fs.writeFileSync(etePath, eteCode, 'utf8');
console.log('✓ app/services/sections/EndToEndSolutions.jsx updated');

// 8. app/blog/[slug]/page.jsx
const bSlugPath = path.join(__dirname, '../app/blog/[slug]/page.jsx');
let bSlugCode = fs.readFileSync(bSlugPath, 'utf8');
bSlugCode = bSlugCode
  .replace("const description =\n    blog.seo?.metaDescription ||\n    blog.excerpt ||\n    'In-depth market research insights and perspectives from Unimrkt Research.';", "const description = blog.seo?.metaDescription || blog.excerpt || blog.title || '';")
  .replace("authors: [blog.authorName || blog.author?.name || 'Unimrkt Research Team'],", "authors: [blog.authorName || blog.author?.name || 'Unimrkt Research'],")
  .replace("const authorName = blog.authorName || blog.author?.name || 'Unimrkt Intelligence Team';", "const authorName = blog.authorName || blog.author?.name || 'Unimrkt Research';")
  .replace("const authorRole = blog.authorRole || blog.author?.role || 'Global Research Practice';", "const authorRole = blog.authorRole || blog.author?.role || '';")
  .replace("const readingTime = blog.readingTime || '6 min read';", "const readingTime = blog.readingTime || '';")
  .replace("const viewCount = blog.viewCount || '3.5K views';", "const viewCount = blog.viewCount || '';")
  .replace("categoryBadge = blog.category?.name || blog.category?.title || 'Market Research';", "categoryBadge = blog.category?.name || blog.category?.title || '';");
fs.writeFileSync(bSlugPath, bSlugCode, 'utf8');
console.log('✓ app/blog/[slug]/page.jsx updated');

// 9. app/case-study/[slug]/page.jsx
const csSlugPath = path.join(__dirname, '../app/case-study/[slug]/page.jsx');
let csSlugCode = fs.readFileSync(csSlugPath, 'utf8');
csSlugCode = csSlugCode
  .replace("const description =\n    caseStudy.seo?.metaDescription ||\n    caseStudy.excerpt ||\n    'Comprehensive market research case study and strategic intelligence by Unimrkt Research.';", "const description = caseStudy.seo?.metaDescription || caseStudy.excerpt || caseStudy.title || '';")
  .replace("kicker={caseStudy.kicker || caseStudy.industry?.title || 'CASE STUDY'}", "kicker={caseStudy.kicker || caseStudy.industry?.title}")
  .replace("title={caseStudy.title || 'Case Study'}", "title={caseStudy.title}");
fs.writeFileSync(csSlugPath, csSlugCode, 'utf8');
console.log('✓ app/case-study/[slug]/page.jsx updated');

console.log('Done cleaning final marketing text fallbacks.');

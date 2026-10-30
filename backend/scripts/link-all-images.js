const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

function genDocId() {
  return crypto.randomBytes(12).toString('hex');
}

const dbPath = path.resolve(__dirname, '../.tmp/data.db');
const db = new DatabaseSync(dbPath);
const now = new Date().toISOString();
const nowMs = Date.now();

console.log('=== STARTING COMPREHENSIVE STRAPI BACKEND IMAGE & DATA LINKING ===');

// Helper to find a file by exact name or substring
function findFile(nameOrPattern) {
  let file = db.prepare('SELECT id, name, url FROM files WHERE name = ?').get(nameOrPattern);
  if (!file) {
    file = db.prepare('SELECT id, name, url FROM files WHERE name LIKE ? LIMIT 1').get(`%${nameOrPattern}%`);
  }
  return file || null;
}

// Helper to link a file in files_related_mph
const insertRelStmt = db.prepare(`
  INSERT INTO files_related_mph (file_id, related_id, related_type, field, "order")
  VALUES (?, ?, ?, ?, ?)
`);

const checkRelStmt = db.prepare(`
  SELECT id FROM files_related_mph
  WHERE related_id = ? AND related_type = ? AND field = ?
`);

function linkMedia(fileId, relatedId, relatedType, field, order = 1) {
  if (!fileId || !relatedId) return;
  const existing = checkRelStmt.get(relatedId, relatedType, field);
  if (existing) {
    db.prepare('UPDATE files_related_mph SET file_id = ?, "order" = ? WHERE id = ?').run(fileId, order, existing.id);
  } else {
    insertRelStmt.run(fileId, relatedId, relatedType, field, order);
  }
}

// -------------------------------------------------------------
// 1. GLOBAL SETTINGS & LOGOS
// -------------------------------------------------------------
console.log('\n[1/7] Configuring Global site settings and logos...');
const logoFile = findFile('unimrkt-resarch-logo.webp') || findFile('unimrkt-logo-red.png');
const certFile = findFile('iso-20252-logo.png') || findFile('esomar-logo.png') || logoFile;

let globalEntry = db.prepare('SELECT id FROM globals LIMIT 1').get();
let globalId;
if (!globalEntry) {
  const docId = genDocId();
  const info = db.prepare(`
    INSERT INTO globals (document_id, site_name, site_description, footer_description, copyright_text, created_at, updated_at, published_at, locale)
    VALUES (?, 'Unimrkt Research', 'Structured Market Intelligence & Global Solutions',
            'Delivering global market research, CATI surveys, data collection, and actionable insights that drive smarter business decisions across 90+ countries.',
            '© 2026 Unimrkt Research. All rights reserved.', ?, ?, ?, 'en')
  `).run(docId, now, now, now);
  globalId = Number(info.lastInsertRowid);
  console.log(`  ✓ Inserted global settings row (id: ${globalId})`);
} else {
  globalId = globalEntry.id;
}

if (logoFile) {
  linkMedia(logoFile.id, globalId, 'api::global.global', 'headerLogo');
  linkMedia(logoFile.id, globalId, 'api::global.global', 'footerLogo');
  linkMedia(logoFile.id, globalId, 'api::global.global', 'favicon');
  console.log(`  ✓ Linked logos to Global Settings`);
}

// -------------------------------------------------------------
// 2. HERO COMMONS & QUESTION CTA ON ALL PAGES
// -------------------------------------------------------------
console.log('\n[2/7] Linking Hero Banners & CTA Visuals on all Pages...');

const pageBannerMap = {
  'home': 'unimrkt-resarch-map-banner-img.webp',
  'about': 'about-hero-banner-img.png',
  'our-company': 'company-about-img.png',
  'services': 'services-banner-img.webp',
  'primary-research': 'unimrkt-reseach-primary-research-banner-img.webp',
  'telephonic-surveys': 'telephonic-hero-banner-img.png',
  'industries': 'industries-banner-img.webp',
  'automotives': 'automotives-card-img.webp',
  'case-study': 'case-study-banner-img.webp',
  'case-study-details': 'case-study-banner-img.webp',
  'blog': 'blog-hero-banner-img.webp',
  'blog-details': 'blog-hero-banner-img.webp',
  'team': 'team-banner-img.png',
  'gallery': 'unimrkt-resarch-our-team-banner.webp',
  'faq': 'the-impact-banner-img.webp',
  'work': 'work-with-hero-banner-img.png',
  'contact': 'contact-banner-img.png',
  'privacy-policy': 'unimrkt-resarch-our-team-banner.webp',
};

// Also link question-cta banner
const defaultCtaBg = findFile('the-impact-banner-img.webp') || findFile('contac-banner-img.webp');

// Query pages and their components through pages_cmps
const pageSections = db.prepare(`
  SELECT pc.entity_id as page_id, pc.cmp_id, pc.component_type, p.slug
  FROM pages_cmps pc
  JOIN pages p ON p.id = pc.entity_id
`).all();

let linkedHeroes = 0;
let linkedCtas = 0;
let linkedHomeHeroes = 0;

for (const sec of pageSections) {
  if (sec.component_type === 'sections.hero-common') {
    const targetFileName = pageBannerMap[sec.slug] || 'unimrkt-resarch-our-team-banner.webp';
    const bannerFile = findFile(targetFileName) || findFile('about-hero-banner-img.png');
    if (bannerFile) {
      linkMedia(bannerFile.id, sec.cmp_id, 'sections.hero-common', 'bannerImage');
      linkedHeroes++;
    }
  } else if (sec.component_type === 'sections.home-hero') {
    const homeMapFile = findFile('unimrkt-resarch-map-banner-img.webp');
    if (homeMapFile) {
      linkMedia(homeMapFile.id, sec.cmp_id, 'sections.home-hero', 'fallbackImage');
      linkedHomeHeroes++;
    }
  } else if (sec.component_type === 'sections.question-cta') {
    if (defaultCtaBg) {
      linkMedia(defaultCtaBg.id, sec.cmp_id, 'sections.question-cta', 'visualImage');
      linkedCtas++;
    }
  }
}
console.log(`  ✓ Linked ${linkedHeroes} hero-common banners, ${linkedHomeHeroes} home-hero fallback images, ${linkedCtas} question-cta visuals`);

// -------------------------------------------------------------
// 3. TEAM MEMBERS & PHOTOS
// -------------------------------------------------------------
console.log('\n[3/7] Linking Team Member photos (all 19 leadership & directors)...');

const allTeamMembers = [
  { name: 'Anurag Magoo', role: 'Co-Founder', file: 'anurag-magoo.webp', linkedin: 'https://www.linkedin.com/in/anurag-magoo-92261611/', order: 1 },
  { name: 'Sandeep Kumar', role: 'Co-Founder & CEO', file: 'sandeep-kumar.webp', linkedin: 'https://www.linkedin.com/in/sandeep-kumar-1756598/', order: 2 },
  { name: 'Kanishk Sheel', role: 'SVP - Business Development & Client Relations', file: 'kanishk-sheel.webp', linkedin: 'https://www.linkedin.com/in/kanishk-sheel-6a849b22/', order: 3 },
  { name: 'James Wild', role: 'Principal Consultant - North America', file: 'james-wild.webp', linkedin: 'https://www.linkedin.com/in/james-wild-8b22a03/', order: 4 },
  { name: 'Mann Sharma', role: 'Senior Director - Operations', file: 'mann-sharma.webp', linkedin: 'https://www.linkedin.com/in/mann-sharma-51368916/', order: 5 },
  { name: 'Veronika Sharma', role: 'Director - Client Services', file: 'veronika-sharma.webp', linkedin: 'https://www.linkedin.com/in/veronika-sharma-6a084052/', order: 6 },
  { name: 'Alex Parkman', role: 'Director - Client Services', file: 'alex-parkman.webp', linkedin: 'https://www.linkedin.com/in/alex-parkman-94269925/', order: 7 },
  { name: 'Sanjay Kumar', role: 'AVP - IT, Telecom & Business Development', file: 'sanjay-kumar.webp', linkedin: 'https://www.linkedin.com/in/sanjay-kumar-65b1b424/', order: 8 },
  { name: 'Rahul Maini', role: 'Senior Manager - Corporate Communication', file: 'rahul-maini.webp', linkedin: 'https://www.linkedin.com/in/rahul-maini-a1780468/', order: 9 },
  { name: 'Chris Griswold', role: 'Senior Director - Business Development', file: 'chris-griswold.webp', linkedin: 'https://www.linkedin.com/in/chris-griswold-9860b714/', order: 10 },
  { name: 'Ratan Singh Chauhan', role: 'Assistant Director - Field Operations', file: 'ratan-singh-chauhan.webp', linkedin: 'https://www.linkedin.com/in/ratan-singh-chauhan-691b0126/', order: 11 },
  { name: 'Vishal Parashar', role: 'Head - Operations & Insights', file: 'vishal-parashar.webp', linkedin: 'https://www.linkedin.com/in/vishal-parashar-04803730/', order: 12 },
  { name: 'Narinder Vadhera', role: 'Associate Director - Data Quality', file: 'narinder-vadhera.webp', linkedin: 'https://www.linkedin.com/in/narinder-vadhera-1a73b53b/', order: 13 },
  { name: 'Yashasvini Daulat Bhatt', role: 'Head - Data Quality and Training', file: 'yashasvini-daulat-bhatt.webp', linkedin: 'https://www.linkedin.com/in/yashasvini-daulat-bhatt-04838612/', order: 14 },
  { name: 'Sushmaunt Singh', role: 'Director - Field Operations', file: 'sushmaunt-singh.webp', linkedin: 'https://www.linkedin.com/in/sushmaunt-singh-93b70823/', order: 15 },
  { name: 'Geetha Chauhan', role: 'Lead - Operations', file: 'geetha-chauhan.webp', linkedin: 'https://www.linkedin.com/in/geetha-chauhan-b5145b41/', order: 16 },
  { name: 'Ghol Bishi', role: 'Director - Business Development', file: 'ghol-bishi.webp', linkedin: 'https://www.linkedin.com/in/ghol-bishi-24a9193b/', order: 17 },
  { name: 'Ritu Verma', role: 'Manager - Team Building', file: 'ritu-verma.webp', linkedin: 'https://www.linkedin.com/in/ritu-verma-9a647318/', order: 18 },
  { name: 'Krystal Richardson', role: 'Manager - Business Development', file: 'krystal-richardson.webp', linkedin: 'https://www.linkedin.com/in/krystal-richardson-35359a43/', order: 19 },
];

for (const tm of allTeamMembers) {
  let member = db.prepare('SELECT id, document_id FROM team_members WHERE name = ?').get(tm.name);
  let memberId;
  if (!member) {
    const docId = genDocId();
    const info = db.prepare(`
      INSERT INTO team_members (document_id, name, role, bio, linkedin_url, "order", created_at, updated_at, published_at, locale)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'en')
    `).run(docId, tm.name, tm.role, `${tm.name} is ${tm.role} at Unimrkt Research, bringing comprehensive global research operations and client service excellence across international markets.`, tm.linkedin, tm.order, now, now, now);
    memberId = Number(info.lastInsertRowid);
  } else {
    memberId = member.id;
    db.prepare('UPDATE team_members SET "order" = ?, role = ? WHERE id = ?').run(tm.order, tm.role, memberId);
  }

  const photoFile = findFile(tm.file);
  if (photoFile) {
    linkMedia(photoFile.id, memberId, 'api::team-member.team-member', 'photo');
    console.log(`  ✓ Linked ${tm.name} -> ${photoFile.name}`);
  }
}

// -------------------------------------------------------------
// 4. BLOGS & FEATURED IMAGES
// -------------------------------------------------------------
console.log('\n[4/7] Linking Blog Post Featured Images...');

const blogImageMap = {
  'all-you-need-to-know-about-online-market-research': 'customer-experience-img.webp',
  'why-field-based-quantitative-market-research-remains-critical': 'unimrkt-reseach-primary-research-banner-img.webp',
  'ai-and-the-workforce-in-transformation-disruption-opportunity': 'interview-controls-card-img.webp',
  'from-data-to-decision-how-modern-market-research-drives-growth': 'customer-experience-img.webp',
  'key-market-research-methodologies-every-business-needs-to-know': 'unimrkt-reseach-primary-research-banner-img.webp',
  'why-consumer-behaviour-research-is-critical-for-product-success': 'centralized-data-card-img.webp',
  'blog': 'smart-survey-management-card-img.webp',
};

const blogs = db.prepare('SELECT id, slug, title FROM blogs').all();
for (const b of blogs) {
  const targetImage = blogImageMap[b.slug] || 'customer-experience-img.webp';
  const imgFile = findFile(targetImage) || findFile('customer-experience-img.webp');
  if (imgFile) {
    linkMedia(imgFile.id, b.id, 'api::blog.blog', 'featuredImage');
    console.log(`  ✓ Linked Blog [${b.id}] "${b.title.slice(0, 35)}..." -> ${imgFile.name}`);
  }
}

// -------------------------------------------------------------
// 5. INDUSTRIES & THUMBNAILS/ICONS
// -------------------------------------------------------------
console.log('\n[5/7] Linking Industry Thumbnails & Icons...');

const industryImageMap = {
  'automotive-mobility': { thumb: 'automotives-card-img.webp', icon: 'automotives-icon-img.png' },
  'banking-finance': { thumb: 'banking-and-finance-img.webp', icon: 'banking-icon-img.png' },
  'healthcare-life-sciences': { thumb: 'Healthcare-img.webp', icon: 'healthcare-icon-img.png' },
  'consumer-retail': { thumb: 'consumer-retail-img.webp', icon: 'consumer-icon-img.png' },
  'technology-telecom': { thumb: 'technology-and-telecom-img.webp', icon: 'technology-icon-img.png' },
  'fmcg': { thumb: 'food-and-beverage-img.webp', icon: 'consumer-icon-img.png' },
  'energy-utilities': { thumb: 'energy-utilities-img.webp', icon: 'energy-icon-img.png' },
};

const industries = db.prepare('SELECT id, slug, title FROM industries').all();
for (const ind of industries) {
  const mapping = industryImageMap[ind.slug] || { thumb: 'industries-banner-img.webp', icon: 'technology-icon-img.png' };
  const thumbFile = findFile(mapping.thumb);
  const iconFile = findFile(mapping.icon);

  if (thumbFile) linkMedia(thumbFile.id, ind.id, 'api::industry.industry', 'thumbnail');
  if (iconFile) linkMedia(iconFile.id, ind.id, 'api::industry.industry', 'icon');
  console.log(`  ✓ Linked Industry [${ind.id}] "${ind.title}" -> ${thumbFile?.name || 'none'}`);
}

// -------------------------------------------------------------
// 6. SERVICES & CASE STUDIES
// -------------------------------------------------------------
console.log('\n[6/7] Linking Services and Case Studies...');

const serviceImageMap = {
  'primary-research': 'unimrkt-reseach-primary-research-banner-img.webp',
  'secondary-research': 'product-research-img.webp',
  'telephonic-surveys': 'telephonic-hero-banner-img.png',
  'online-surveys': 'online-surveys-card-img.webp',
  'b2b-research': 'centralized-data-card-img.webp',
  'healthcare-research': 'smart-survey-management-card-img.webp',
  'data-analytics': 'interview-controls-card-img.webp',
};

const services = db.prepare('SELECT id, slug, title FROM services').all();
for (const s of services) {
  const targetImg = serviceImageMap[s.slug] || 'services-banner-img.webp';
  const imgFile = findFile(targetImg);
  if (imgFile) {
    linkMedia(imgFile.id, s.id, 'api::service.service', 'featuredImage');
    linkMedia(imgFile.id, s.id, 'api::service.service', 'bannerImage');
    console.log(`  ✓ Linked Service [${s.id}] "${s.title}" -> ${imgFile.name}`);
  }
}

const csMap = {
  'understanding-customer-expectations-financial-market': 'case-study-banking.webp',
  'physician-insights-next-gen-medtech-launch': 'case-study-healthcare.webp',
  'electric-vehicle-adoption-fleet-readiness': 'automotives-card-img.webp',
  'consumer-brand-loyalty-shift-fmcg': 'consumer-card-img.webp',
  'enterprise-cloud-transition-benchmarks': 'technology-card-img.webp',
  'renewable-transition-readiness-commercial-facilities': 'energy-utilities-img.webp',
};

const caseStudies = db.prepare('SELECT id, slug, title FROM case_studies').all();
for (const cs of caseStudies) {
  const targetImg = csMap[cs.slug] || 'case-study-banner-img.webp';
  const imgFile = findFile(targetImg) || findFile('case-study-banner-img.webp');
  if (imgFile) {
    linkMedia(imgFile.id, cs.id, 'api::case-study.case-study', 'heroImage');
    linkMedia(imgFile.id, cs.id, 'api::case-study.case-study', 'challengeImage');
    console.log(`  ✓ Linked Case Study [${cs.id}] "${cs.title.slice(0, 35)}..." -> ${imgFile.name}`);
  }
}

// -------------------------------------------------------------
// 7. GALLERY ITEMS & CAREER JOBS SEEDING
// -------------------------------------------------------------
console.log('\n[7/7] Seeding Gallery Items & Career Jobs...');

const gallerySeedData = [
  { title: 'Cross-functional Team Strategy Session', category: 'team', file: 'gallery_item_01.webp', caption: 'Team meeting in modern conference room', order: 1 },
  { title: 'Team Building & Creative Problem Solving', category: 'team', file: 'gallery_item_02.webp', caption: 'Colleagues playing strategic wooden blocks game', order: 2 },
  { title: 'Quantitative Data Analysis & Reporting', category: 'research', file: 'gallery_item_03.webp', caption: 'Researcher reviewing charts and data visualizations', order: 3 },
  { title: 'Questionnaire Architecture & Methodology Planning', category: 'research', file: 'gallery_item_04.webp', caption: 'Hands drafting research methodology framework', order: 4 },
  { title: 'Executive Client Briefing & Synthesis', category: 'events', file: 'gallery_item_05.webp', caption: 'Consultants presenting insights on laptop to partner', order: 5 },
  { title: 'Interactive Insight Discovery Review', category: 'fieldwork', file: 'gallery_item_06.webp', caption: 'Two analysts discussing project findings', order: 6 },
  { title: 'Global Multi-market Fieldwork Briefing', category: 'fieldwork', file: 'gallery_item_07.webp', caption: 'Interviewer team orientation and quality review', order: 7 },
  { title: 'Advanced Research Technology Workshop', category: 'research', file: 'gallery_item_08.webp', caption: 'Hands-on session with analytics and dashboarding tools', order: 8 },
  { title: 'Stakeholder Workshop & Strategic Co-creation', category: 'events', file: 'gallery_item_09.webp', caption: 'Facilitating collaborative priorities session', order: 9 },
  { title: 'Data Quality Auditing & Sound Verification', category: 'research', file: 'gallery_item_10.webp', caption: 'Quality assurance team verifying call transcripts', order: 10 },
  { title: 'Collaborative Problem-Solving Jam', category: 'team', file: 'gallery_item_11.webp', caption: 'Team members white-boarding survey routing logic', order: 11 },
  { title: 'Annual Insight Summit & Celebration', category: 'events', file: 'gallery_item_12.webp', caption: 'Celebrating organizational milestones and achievements', order: 12 },
];

const existingGalleryCount = db.prepare('SELECT count(*) as c FROM gallery_items').get().c;
if (existingGalleryCount === 0) {
  for (const gi of gallerySeedData) {
    const docId = genDocId();
    const info = db.prepare(`
      INSERT INTO gallery_items (document_id, title, category, caption, "order", created_at, updated_at, published_at, locale)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'en')
    `).run(docId, gi.title, gi.category, gi.caption, gi.order, now, now, now);
    const giId = Number(info.lastInsertRowid);
    const imgFile = findFile(gi.file) || findFile('gallery_item_01.webp');
    if (imgFile) {
      linkMedia(imgFile.id, giId, 'api::gallery-item.gallery-item', 'image');
    }
  }
  console.log(`  ✓ Seeded and linked ${gallerySeedData.length} Gallery Items`);
} else {
  console.log(`  ✓ Gallery items already seeded (${existingGalleryCount} items)`);
}

// Career jobs seed
const existingJobsCount = db.prepare('SELECT count(*) as c FROM career_jobs').get().c;
if (existingJobsCount === 0) {
  const jobsSeed = [
    {
      title: 'Executive - Language & Communication',
      slug: 'executive-language-communication',
      department: 'Operations',
      job_type: 'Full Time',
      location: 'Gurugram, India',
    },
    {
      title: 'Associate - Primary Research',
      slug: 'associate-primary-research',
      department: 'Primary Research',
      job_type: 'Full Time',
      location: 'Gurugram, India',
    },
    {
      title: 'Quality Analyst - Audio Auditing',
      slug: 'quality-analyst-audio-auditing',
      department: 'Quality Assurance',
      job_type: 'Full Time',
      location: 'Gurugram, India',
    },
    {
      title: 'Data Analyst - SPSS & R',
      slug: 'data-analyst-spss-r',
      department: 'Data Analytics',
      job_type: 'Full Time',
      location: 'Gurugram, India',
    },
  ];

  for (const j of jobsSeed) {
    const docId = genDocId();
    db.prepare(`
      INSERT INTO career_jobs (document_id, title, slug, department, job_type, location, posted_date, description, is_active, created_at, updated_at, published_at, locale)
      VALUES (?, ?, ?, ?, ?, ?, '2026-08-12', '[]', 1, ?, ?, ?, 'en')
    `).run(docId, j.title, j.slug, j.department, j.job_type, j.location, now, now, now);
  }
  console.log(`  ✓ Seeded ${jobsSeed.length} Career Job Openings`);
}

console.log('\n=== STRAPI BACKEND IMAGE & DATA LINKING COMPLETE! ===\n');

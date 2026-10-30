const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const dbPath = path.join(__dirname, '../.tmp/data.db');
const db = new DatabaseSync(dbPath);

const PAGE_SEO = {
  'home': {
    title: 'Unimrkt Research | Structured Market Intelligence & Global Solutions',
    desc: 'Delivering structured market data enabling organizations to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities across 90+ countries.',
    keywords: 'market intelligence, global market research, CATI surveys, B2B research, primary market research'
  },
  'about': {
    title: 'About Us | Global Footprint & Methodology | Unimrkt Research',
    desc: 'Learn about Unimrkt Research, our history since 2009, global footprint across 90+ countries, 500+ CATI workstations, and ISO 20252 certified research standards.',
    keywords: 'about unimrkt, market research company, global research footprint, ISO certified market research'
  },
  'our-company': {
    title: 'Our Company | Trusted Market Research Partner | Unimrkt Research',
    desc: 'Discover our journey, mission, executive leadership, and multi-market research operations empowering multinational brands with validated intelligence.',
    keywords: 'our company, market research partner, research operations, global research firm'
  },
  'services': {
    title: 'Market Research Services | Primary, Secondary, CATI & Analytics',
    desc: 'Comprehensive research solutions: qualitative in-depth interviews, quantitative surveys, CATI telephonic reach, survey scripting, and advanced business analytics.',
    keywords: 'market research services, quantitative research, qualitative research, survey programming, CATI'
  },
  'primary-research': {
    title: 'Primary Market Research Services | Qualitative & Quantitative Depth',
    desc: 'End-to-end primary market research delivering authenticated first-hand data through rigorous sampling, multi-channel fieldwork, and direct respondent engagement.',
    keywords: 'primary research, B2B qualitative, quantitative research, field interviews, market surveys'
  },
  'telephonic-surveys': {
    title: 'CATI Telephonic Surveys | 500+ Native Workstations | Unimrkt Research',
    desc: '500+ computerized assisted telephone interviewing (CATI) workstations operating globally across 22+ languages with real-time audio auditing and ISO QA standards.',
    keywords: 'CATI surveys, telephonic interviews, phone surveys, audio auditing, global CATI'
  },
  'industries': {
    title: 'Industries We Serve | Deep Cross-Sector Research Intelligence',
    desc: 'Market intelligence tailored for Automotive, Healthcare, Technology, BFSI, Retail, Energy, FMCG, and Industrial Manufacturing sectors across global regions.',
    keywords: 'industries research, automotive intelligence, healthcare market research, B2B tech research'
  },
  'automotives': {
    title: 'Automotive & Mobility Market Intelligence | Unimrkt Research',
    desc: 'Strategic intelligence across electric vehicles, autonomous driving systems, fleet management, connected mobility, and automotive OEM supplier ecosystems.',
    keywords: 'automotive market research, EV trends, mobility intelligence, auto OEM research'
  },
  'case-study': {
    title: 'Case Studies | Real-World Research Impact & Client Success Stories',
    desc: 'Explore proven client success stories demonstrating how Unimrkt Research delivers actionable data, competitive advantage, and strategic growth across industries.',
    keywords: 'market research case studies, client success stories, research impact, market entry study'
  },
  'case-study-details': {
    title: 'Case Study In-Depth Analysis | Methodology & Business Outcomes',
    desc: 'Detailed breakdown of research objectives, cross-market methodology, data validation frameworks, and tangible business results achieved for enterprise clients.',
    keywords: 'case study analysis, research methodology, data validation, business growth results'
  },
  'blog': {
    title: 'Market Intelligence Blog | Industry Trends, Insights & Perspectives',
    desc: 'Stay informed with expert analysis, industry whitepapers, research methodology innovations, and emerging market trends from the Unimrkt Research thought leaders.',
    keywords: 'market research blog, industry insights, research trends, consumer behavior analysis'
  },
  'blog-details': {
    title: 'Research Article & Market Analysis | Unimrkt Research Insights',
    desc: 'In-depth perspectives and critical analytical takeaways on global market shifts, methodology developments, and consumer behavioral transformations.',
    keywords: 'market intelligence article, research brief, strategic insights'
  },
  'team': {
    title: 'Our Leadership & Team | Experienced Market Research Experts',
    desc: 'Meet the executive leadership and multidisciplinary research directors leading Unimrkt Research across operations, methodology, data science, and client relations.',
    keywords: 'unimrkt team, market research leadership, research directors, research professionals'
  },
  'gallery': {
    title: 'Moments & Culture Gallery | Life Inside Unimrkt Research',
    desc: 'A visual glimpse into life at Unimrkt Research: collaborative workshops, milestone celebrations, fieldwork expeditions, and our vibrant global corporate culture.',
    keywords: 'unimrkt gallery, team moments, corporate culture, life at unimrkt'
  },
  'faq': {
    title: 'Frequently Asked Questions | Everything About Our Research Services',
    desc: 'Find answers to common questions about our research methodologies, CATI capacity, data validation, respondent privacy, global coverage, and deliverables.',
    keywords: 'market research FAQ, CATI questions, sample quality, survey validation, research pricing'
  },
  'work': {
    title: 'Careers at Unimrkt Research | Join Our Global Market Insight Team',
    desc: 'Explore exciting career opportunities in market research, data analysis, CATI operations, and client consulting with a fast-growing global market intelligence firm.',
    keywords: 'market research careers, unimrkt jobs, research analyst jobs, CATI interviewer jobs'
  },
  'contact': {
    title: 'Contact Us | Partner With Unimrkt Research Worldwide',
    desc: 'Get in touch with our global research consulting teams in India, USA, and worldwide. Request a research proposal, schedule a consultation, or ask questions.',
    keywords: 'contact unimrkt, request research proposal, market research inquiry, global research offices'
  },
  'privacy-policy': {
    title: 'Privacy Policy & Data Protection | ISO 27001 Certified Standards',
    desc: 'Read how Unimrkt Research protects respondent privacy, complies with GDPR, CCPA, and ISO 27001 data governance standards across all research engagements.',
    keywords: 'privacy policy, GDPR market research, ISO 27001 compliance, respondent data protection'
  }
};

const pages = db.prepare("SELECT id, slug, title FROM pages").all();

for (const p of pages) {
  const seoData = PAGE_SEO[p.slug] || {
    title: `${p.title} | Unimrkt Research`,
    desc: `${p.title} - Structured market data and global intelligence solutions by Unimrkt Research.`,
    keywords: 'market research, unimrkt research'
  };

  // Check existing seo link in pages_cmps
  const existingLink = db.prepare("SELECT * FROM pages_cmps WHERE entity_id = ? AND field = 'seo'").get(p.id);

  let seoId;
  if (existingLink) {
    seoId = existingLink.cmp_id;
    db.prepare(`
      UPDATE components_shared_seos
      SET meta_title = ?, meta_description = ?, keywords = ?, canonical_url = ?
      WHERE id = ?
    `).run(seoData.title, seoData.desc, seoData.keywords, `/${p.slug === 'home' ? '' : p.slug}`, seoId);
  } else {
    const insertRes = db.prepare(`
      INSERT INTO components_shared_seos (meta_title, meta_description, keywords, canonical_url, no_index)
      VALUES (?, ?, ?, ?, ?)
    `).run(seoData.title, seoData.desc, seoData.keywords, `/${p.slug === 'home' ? '' : p.slug}`, 0);

    seoId = insertRes.lastInsertRowid;

    db.prepare(`
      INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, "order")
      VALUES (?, ?, 'shared.seo', 'seo', 1)
    `).run(p.id, seoId);
  }

  console.log(`✓ Seeded SEO for page: ${p.slug} (ID: ${p.id}, SEO ID: ${seoId})`);
}

console.log('All page SEO records seeded successfully!');

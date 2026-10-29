const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

function genDocId() {
  return crypto.randomBytes(12).toString('hex');
}

const db = new Database(path.join(__dirname, '../.tmp/data.db'));

const now = new Date().toISOString();

// Helper to insert a draft + published entry for Strapi 5
function insertEntry(tableName, fields) {
  const docId = genDocId();
  const keys = Object.keys(fields);

  // 1. Insert Draft (published_at = null)
  const draftCols = ['document_id', 'created_at', 'updated_at', 'published_at', ...keys];
  const draftPlaceholders = draftCols.map(() => '?').join(', ');
  const draftVals = [docId, now, now, null, ...keys.map(k => fields[k])];
  db.prepare(`INSERT INTO ${tableName} (${draftCols.join(', ')}) VALUES (${draftPlaceholders})`).run(...draftVals);

  // 2. Insert Published (published_at = now)
  const pubCols = ['document_id', 'created_at', 'updated_at', 'published_at', ...keys];
  const pubPlaceholders = pubCols.map(() => '?').join(', ');
  const pubVals = [docId, now, now, now, ...keys.map(k => fields[k])];
  db.prepare(`INSERT INTO ${tableName} (${pubCols.join(', ')}) VALUES (${pubPlaceholders})`).run(...pubVals);

  return docId;
}

console.log('Seeding Strapi database with all website pages and collections...');

// 1. SEED ALL 18 PAGES
const allPages = [
  { title: 'Home', slug: 'home' },
  { title: 'About Us', slug: 'about' },
  { title: 'Our Company', slug: 'our-company' },
  { title: 'Services Overview', slug: 'services' },
  { title: 'Primary Research', slug: 'primary-research' },
  { title: 'CATI / Telephonic Surveys', slug: 'telephonic-surveys' },
  { title: 'Industries We Serve', slug: 'industries' },
  { title: 'Automotives & Mobility', slug: 'automotives' },
  { title: 'Case Studies', slug: 'case-study' },
  { title: 'Case Study Details', slug: 'case-study-details' },
  { title: 'Blogs & Insights', slug: 'blog' },
  { title: 'Blog Details', slug: 'blog-details' },
  { title: 'Team Unimrkt', slug: 'team' },
  { title: 'Moments & Gallery', slug: 'gallery' },
  { title: 'Frequently Asked Questions', slug: 'faq' },
  { title: 'How We Work / Approach', slug: 'work' },
  { title: 'Contact Us', slug: 'contact' },
  { title: 'Privacy Policy', slug: 'privacy-policy' }
];

for (const p of allPages) {
  insertEntry('pages', { title: p.title, slug: p.slug });
}
console.log(`✓ Seeded ${allPages.length} Pages into pages table`);

// 2. SEED 6 BLOGS
const sampleBlogs = [
  {
    title: 'All You Need to Know About Online Market Research',
    slug: 'all-you-need-to-know-about-online-market-research',
    excerpt: 'In a world where consumer behavior evolves faster than a trending topic, staying ahead requires more than gut feelings. Here is how modern online research drives growth.',
    read_time: '5 min read',
    views_count: '1.2k',
    published_date: '2026-03-15',
    featured: 1
  },
  {
    title: 'Why Field-Based Quantitative Market Research Remains Critical in 2026',
    slug: 'why-field-based-quantitative-market-research-remains-critical',
    excerpt: 'Over the past few years, the research landscape has shifted rapidly towards digital methods. Yet field interviews and structured CATI remain the gold standard for high-accuracy ground truth.',
    read_time: '6 min read',
    views_count: '2.4k',
    published_date: '2026-03-20',
    featured: 1
  },
  {
    title: 'AI and the Workforce in Transformation, Disruption & Opportunity',
    slug: 'ai-and-the-workforce-in-transformation-disruption-opportunity',
    excerpt: 'In 2026, artificial intelligence is no longer just an emerging tool—it is redefining workforce productivity, automated insights extraction, and enterprise operations.',
    read_time: '4 min read',
    views_count: '980',
    published_date: '2026-04-02',
    featured: 0
  },
  {
    title: 'From Data to Decision: How Modern Market Research Drives Growth',
    slug: 'from-data-to-decision-how-modern-market-research-drives-growth',
    excerpt: 'Discover actionable strategies to translate raw survey data into decisive market intelligence that protects margins and unlocks expansion across global markets.',
    read_time: '7 min read',
    views_count: '1.8k',
    published_date: '2026-04-10',
    featured: 0
  },
  {
    title: 'Key Market Research Methodologies Every Business Needs to Know',
    slug: 'key-market-research-methodologies-every-business-needs-to-know',
    excerpt: 'A comprehensive breakdown of qualitative vs. quantitative research approaches, syndicated panels, and hybrid methodology designs for enterprise decision makers.',
    read_time: '8 min read',
    views_count: '3.1k',
    published_date: '2026-04-12',
    featured: 0
  },
  {
    title: 'Why Consumer Behaviour Research is Critical for Product Success',
    slug: 'why-consumer-behaviour-research-is-critical-for-product-success',
    excerpt: 'Understanding buyer psychology, purchasing barriers, and preference shifts across diverse demographics to ensure product launches achieve immediate adoption.',
    read_time: '5 min read',
    views_count: '1.5k',
    published_date: '2026-04-14',
    featured: 0
  }
];

for (const b of sampleBlogs) {
  insertEntry('blogs', b);
}
console.log(`✓ Seeded ${sampleBlogs.length} Blogs into blogs table`);

// 3. SEED 6 CASE STUDIES
const sampleStudies = [
  {
    title: 'Understanding Customer Expectations in a Changing Financial Market',
    slug: 'understanding-customer-expectations-financial-market',
    excerpt: 'How qualitative research helped a leading bank uncover evolving consumer preferences and redesign digital services.',
    featured: 1,
    published_date: '2026-02-10',
    challenge_kicker: 'THE CHALLENGE',
    challenge_title: 'Navigating shifting customer priorities in retail banking',
    challenge_description: 'With traditional banks facing pressure from digital neo-banks, our client needed granular insight into consumer switching behavior and satisfaction gaps.',
    approach_eyebrow: 'OUR APPROACH',
    approach_title: 'Multi-market in-depth interviews and customer journey mapping',
    approach_description: 'We executed 80+ in-depth interviews with commercial customers and retail account holders across Tier 1 and Tier 2 cities.',
    impact_kicker: 'THE IMPACT',
    impact_title: '38% increase in digital adoption and 15% reduction in churn',
    impact_description: 'The bank implemented 12 UX optimizations and redesigned onboarding workflows, leading to measurable gains in account retention.'
  },
  {
    title: 'Physician Insights for Next-Gen MedTech Product Launch',
    slug: 'physician-insights-next-gen-medtech-launch',
    excerpt: 'Specialized healthcare fieldwork across 12 countries to gauge surgeon interest in innovative robotic surgical devices.',
    featured: 1,
    published_date: '2026-02-18',
    challenge_kicker: 'THE CHALLENGE',
    challenge_title: 'Evaluating adoption hurdles among specialized surgical teams',
    challenge_description: 'Before committing multimillion-dollar manufacturing setups, the medtech leader required deep clinician feedback on workflow integration.',
    approach_eyebrow: 'OUR APPROACH',
    approach_title: 'KOL panel discussions and double-blind hospital surveys',
    approach_description: 'We engaged chief surgeons and procurement directors across 12 countries via structured video interviews and simulation evaluations.',
    impact_kicker: 'THE IMPACT',
    impact_title: 'Strategic pricing model and successful regulatory clearance',
    impact_description: 'Our pricing sensitivity analysis enabled the client to launch with high uptake across major hospital chains.'
  },
  {
    title: 'Electric Vehicle Adoption & Commercial Fleet Readiness',
    slug: 'electric-vehicle-adoption-fleet-readiness',
    excerpt: 'Evaluating supplier hurdles and infrastructure readiness among tier-1 automotive suppliers in Europe.',
    featured: 1,
    published_date: '2026-03-01',
    challenge_kicker: 'THE CHALLENGE',
    challenge_title: 'Overcoming charging infrastructure uncertainty for logistics fleets',
    challenge_description: 'Fleet managers needed clarity on lifecycle costs, charging downtime, and grid readiness before transitioning heavy diesel fleets.',
    approach_eyebrow: 'OUR APPROACH',
    approach_title: 'CATI surveys across 350+ commercial transport operators',
    approach_description: 'Conducted targeted CATI interviews evaluating fleet size, daily routes, depot charging viability, and government incentive usage.',
    impact_kicker: 'THE IMPACT',
    impact_title: 'Accelerated 5,000+ vehicle commercial EV pilot rollout',
    impact_description: 'The automotive OEM tailored their depot charging packages to match operator requirements exactly.'
  },
  {
    title: 'Consumer Brand Loyalty Shift in Fast-Moving Packaged Goods',
    slug: 'consumer-brand-loyalty-shift-fmcg',
    excerpt: 'Uncovering brand-switching triggers among Gen Z and millennial grocery shoppers across metropolitan areas.',
    featured: 0,
    published_date: '2026-03-05',
    challenge_kicker: 'THE CHALLENGE',
    challenge_title: 'Private label growth eroding multinational brand share',
    challenge_description: 'Shoppers increasingly favored store brands over legacy packaged goods during inflationary pressures.',
    approach_eyebrow: 'OUR APPROACH',
    approach_title: 'Mobile ethnography and shop-along surveys',
    approach_description: 'Recruited 600 shoppers to capture receipt data, shelf perceptions, and impulse purchases in real-time.',
    impact_kicker: 'THE IMPACT',
    impact_title: 'Repositioned value tier resulting in 22% category recovery',
    impact_description: 'The client launched twin-pack promotional formats directly targeting the identified price thresholds.'
  },
  {
    title: 'Enterprise Cloud Transition Benchmarks & Security Needs',
    slug: 'enterprise-cloud-transition-benchmarks-security',
    excerpt: 'Synthesizing survey data from 400+ IT decision makers to inform a global telco’s cloud product portfolio.',
    featured: 0,
    published_date: '2026-03-12',
    challenge_kicker: 'THE CHALLENGE',
    challenge_title: 'Identifying enterprise cloud migration friction points',
    challenge_description: 'IT leaders faced compliance and data sovereignty challenges when migrating mission-critical ERP systems.',
    approach_eyebrow: 'OUR APPROACH',
    approach_title: 'Targeted B2B executive panel interviews',
    approach_description: 'Screened and surveyed CISOs and VP Infrastructure across manufacturing, healthcare, and finance sectors.',
    impact_kicker: 'THE IMPACT',
    impact_title: 'New hybrid security offering capturing $45M in pipeline',
    impact_description: 'Telco launched co-managed sovereignty zones aligning with enterprise regulatory mandates.'
  },
  {
    title: 'Renewable Transition Readiness Among Commercial Facilities',
    slug: 'renewable-transition-readiness-commercial-facilities',
    excerpt: 'Assessing energy storage and commercial solar adoption barriers among corporate facility directors.',
    featured: 0,
    published_date: '2026-03-18',
    challenge_kicker: 'THE CHALLENGE',
    challenge_title: 'High upfront capex hindering commercial solar deployments',
    challenge_description: 'Facility owners hesitated to sign long-term Power Purchase Agreements (PPAs) without clear payback guarantees.',
    approach_eyebrow: 'OUR APPROACH',
    approach_title: 'Quant survey and financial modeling interviews with CFOs',
    approach_description: 'Examined 250 enterprise sites to evaluate roof condition, utility rate tiers, and payback expectations.',
    impact_kicker: 'THE IMPACT',
    impact_title: 'No-capex energy subscription launched with 80MW signed',
    impact_description: 'The utility provider structured zero-down performance-backed contracts that rapidly unlocked approvals.'
  }
];

for (const s of sampleStudies) {
  insertEntry('case_studies', s);
}
console.log(`✓ Seeded ${sampleStudies.length} Case Studies into case_studies table`);

// 4. SEED 7 INDUSTRIES
const sampleIndustries = [
  { title: 'Automotive & Mobility', slug: 'automotive-mobility', short_description: 'Accelerating transformation across electric vehicles, autonomous technology, and connected fleet ecosystems.' },
  { title: 'Banking & Financial Services (BFSI)', slug: 'banking-finance', short_description: 'Strategic market intelligence driving fintech innovation, digital onboarding, and risk mitigation.' },
  { title: 'Healthcare & Life Sciences', slug: 'healthcare-life-sciences', short_description: 'Clinician and patient insights powering pharmaceuticals, medical devices, and digital health adoption.' },
  { title: 'Consumer & Retail', slug: 'consumer-retail', short_description: 'Uncovering omnichannel shopping patterns, brand loyalty triggers, and direct-to-consumer opportunities.' },
  { title: 'Technology & Telecom', slug: 'technology-telecom', short_description: 'B2B technology intelligence benchmarking enterprise SaaS, cloud security, 5G networks, and AI adoption.' },
  { title: 'FMCG & Packaged Goods', slug: 'fmcg', short_description: 'Navigating consumer brand switching, packaging sustainability, and price elasticity in dynamic grocery markets.' },
  { title: 'Energy & Utilities', slug: 'energy-utilities', short_description: 'Researching renewable energy transition, smart grid data, and commercial clean-tech adoption.' }
];

for (const ind of sampleIndustries) {
  insertEntry('industries', ind);
}
console.log(`✓ Seeded ${sampleIndustries.length} Industries into industries table`);

// 5. SEED 7 SERVICES
const sampleServices = [
  { title: 'Primary Research', slug: 'primary-research', short_description: 'End-to-end qualitative and quantitative research tailored to custom business objectives.' },
  { title: 'Secondary & Desk Research', slug: 'secondary-research', short_description: 'In-depth industry benchmarking, competitor intelligence, and market sizing syntheses.' },
  { title: 'CATI / Telephonic Surveys', slug: 'telephonic-surveys', short_description: 'High-precision telephone interviews with senior B2B stakeholders and specialized niche audiences.' },
  { title: 'Online Surveys & Panels', slug: 'online-surveys', short_description: 'Access to verified multi-country consumer and executive panels with automated fraud filtering.' },
  { title: 'B2B Market Research', slug: 'b2b-research', short_description: 'Engaging enterprise decision makers, procurement leaders, and technical authorities across global verticals.' },
  { title: 'Healthcare Market Research', slug: 'healthcare-research', short_description: 'Ethical, compliant fieldwork with physicians, surgeons, hospital administrators, and patient advocates.' },
  { title: 'Data Analytics & Processing', slug: 'data-analytics', short_description: 'Advanced statistical modeling, cross-tabulation, sentiment analysis, and dashboard visualization.' }
];

for (const serv of sampleServices) {
  insertEntry('services', serv);
}
console.log(`✓ Seeded ${sampleServices.length} Services into services table`);

console.log('\nAll data seeded successfully into Strapi SQLite database!');

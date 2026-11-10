const mysql = require('../../backend/node_modules/mysql2/promise');

const researchTypes = [
  { name: 'Market Research', slug: 'market-research' },
  { name: 'Primary Research', slug: 'primary-research' },
  { name: 'B2B Research', slug: 'b2b-research' },
  { name: 'Consumer Insights', slug: 'consumer-insights' },
  { name: 'Data Analytics', slug: 'data-analytics' },
];

const caseStudies = [
  {
    title: 'Understanding Customer Expectations in a Changing Financial Market',
    slug: 'understanding-customer-expectations-financial-market',
    category: 'banking-finance',
    research: 'consumer-insights',
    badge: 'BANKING & FINANCE',
    snippet: 'How qualitative research helped a leading bank uncover evolving consumer preferences and redesign digital services.'
  },
  {
    title: 'Physician Insights for Next-Gen MedTech Product Launch',
    slug: 'physician-insights-next-gen-medtech-launch',
    category: 'healthcare-life-sciences',
    research: 'primary-research',
    badge: 'HEALTHCARE',
    snippet: 'Specialized healthcare fieldwork across 12 countries to gauge surgeon interest in innovative robotic devices.'
  },
  {
    title: 'Electric Vehicle Adoption & Commercial Fleet Readiness',
    slug: 'electric-vehicle-adoption-fleet-readiness',
    category: 'automotive-mobility',
    research: 'b2b-research',
    badge: 'AUTOMOTIVE',
    snippet: 'Evaluating supplier hurdles and infrastructure readiness among tier-1 automotive suppliers in Europe.'
  },
  {
    title: 'Consumer Brand Loyalty Shift in Fast-Moving Packaged Goods',
    slug: 'consumer-brand-loyalty-shift-fmcg',
    category: 'consumer-retail',
    research: 'consumer-insights',
    badge: 'FMCG',
    snippet: 'Uncovering brand-switching triggers among Gen Z and millennial grocery shoppers across metropolitan areas.'
  },
  {
    title: 'Enterprise Cloud Transition Benchmarks & Security Needs',
    slug: 'enterprise-cloud-transition-benchmarks-security',
    category: 'technology-telecom',
    research: 'data-analytics',
    badge: 'IT & TELECOM',
    snippet: 'Synthesizing survey data from 400+ IT decision makers to inform a global telco’s cloud product portfolio.'
  },
  {
    title: 'Renewable Transition Readiness Among Commercial Facilities',
    slug: 'renewable-transition-readiness-commercial-facilities',
    category: 'energy-utilities',
    research: 'market-research',
    badge: 'ENERGY & UTILITIES',
    snippet: 'Assessing energy storage and commercial solar adoption barriers among corporate facility directors.'
  },
  {
    title: 'SME Lending Dynamics & Digital Onboarding Optimization',
    slug: 'sme-lending-dynamics-digital-onboarding',
    category: 'banking-finance',
    research: 'b2b-research',
    badge: 'BANKING & FINANCE',
    snippet: 'Interviewing small business owners to identify financing gaps and friction in current lending workflows.'
  },
  {
    title: 'Telemedicine Satisfaction & Retention in Post-Pandemic Care',
    slug: 'telemedicine-satisfaction-retention',
    category: 'healthcare-life-sciences',
    research: 'consumer-insights',
    badge: 'HEALTHCARE',
    snippet: 'Tracking patient satisfaction across remote consults and identifying the digital features patients demand.'
  },
  {
    title: 'Connected Vehicle Telematics & Consumer Privacy Priorities',
    slug: 'connected-vehicle-telematics-consumer-privacy',
    category: 'automotive-mobility',
    research: 'market-research',
    badge: 'AUTOMOTIVE',
    snippet: 'Mapping consumer willingness to share real-time automotive data in exchange for customized vehicle services.'
  },
  {
    title: 'Sustainable Packaging Preferences Across Global Supermarkets',
    slug: 'sustainable-packaging-preferences-supermarkets',
    category: 'consumer-retail',
    research: 'primary-research',
    badge: 'FMCG',
    snippet: 'Quantifying purchase intent shifts when consumer goods switch to 100% biodegradable packaging alternatives.'
  },
  {
    title: '5G Enterprise Private Network Demand Analysis',
    slug: '5g-enterprise-private-network-demand',
    category: 'technology-telecom',
    research: 'b2b-research',
    badge: 'IT & TELECOM',
    snippet: 'Surveying industrial plants on 5G private wireless network investment timelines and operational requirements.'
  },
  {
    title: 'Smart Meter Data Analytics for Peak Grid Load Forecasting',
    slug: 'smart-meter-data-analytics-grid-load',
    category: 'energy-utilities',
    research: 'data-analytics',
    badge: 'ENERGY & UTILITIES',
    snippet: 'Analyzing residential smart-meter trial data to assist an electricity provider in pricing and distribution.'
  },
  {
    title: 'Cross-Border B2B Payments & Forex Hedging Survey',
    slug: 'cross-border-b2b-payments-forex-hedging',
    category: 'banking-finance',
    research: 'primary-research',
    badge: 'BANKING & FINANCE',
    snippet: 'CATI interviews across 250 corporate treasurers evaluating international payment bottlenecks and costs.'
  },
  {
    title: 'Pharmaceutical Market Access & Payer Reimbursement Trends',
    slug: 'pharmaceutical-market-access-payer-reimbursement',
    category: 'healthcare-life-sciences',
    research: 'data-analytics',
    badge: 'HEALTHCARE',
    snippet: 'In-depth interviews with insurance actuaries and health authorities determining pricing thresholds.'
  },
  {
    title: 'Car Subscription Models vs. Traditional Dealership Leasing',
    slug: 'car-subscription-models-dealership-leasing',
    category: 'automotive-mobility',
    research: 'consumer-insights',
    badge: 'AUTOMOTIVE',
    snippet: 'Analyzing buyer sentiment across urban commuters regarding vehicle subscription flexibility.'
  },
  {
    title: 'Direct-to-Consumer Disruption in Premium Skincare',
    slug: 'direct-to-consumer-disruption-skincare',
    category: 'consumer-retail',
    research: 'market-research',
    badge: 'FMCG',
    snippet: 'Examining omnichannel consumer touchpoints and digital discovery funnels for independent cosmetics brands.'
  },
  {
    title: 'AI Development Tool Stack Adoption in Enterprise Engineering',
    slug: 'ai-development-tool-stack-adoption',
    category: 'technology-telecom',
    research: 'primary-research',
    badge: 'IT & TELECOM',
    snippet: 'Assessing developer velocity and software licensing models through targeted developer community panels.'
  },
  {
    title: 'Hydrogen Infrastructure Viability & Industrial Fuel Switching',
    slug: 'hydrogen-infrastructure-viability-fuel-switching',
    category: 'energy-utilities',
    research: 'b2b-research',
    badge: 'ENERGY & UTILITIES',
    snippet: 'Gathering strategic viewpoints from chemical and manufacturing leaders on hydrogen energy feasibility.'
  }
];

function genDocId() {
  return Math.random().toString(36).substring(2, 14) + Math.random().toString(36).substring(2, 14);
}

async function run() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    database: 'unimrkt_strapi'
  });

  console.log('Connected to MySQL unimrkt_strapi.');

  // 1. Seed research_types
  for (const rt of researchTypes) {
    const [rows] = await conn.query('SELECT id, document_id FROM research_types WHERE slug = ?', [rt.slug]);
    if (rows.length === 0) {
      const docId = genDocId();
      await conn.query(
        'INSERT INTO research_types (document_id, name, slug, published_at, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW(), NOW())',
        [docId, rt.name, rt.slug]
      );
      console.log(`Created research type: ${rt.name}`);
    }
  }

  // 2. Fetch all research types and industries mapping
  const [allRt] = await conn.query('SELECT id, document_id, slug FROM research_types');
  const rtMap = {};
  allRt.forEach(r => { rtMap[r.slug] = r.id; });

  const [allInd] = await conn.query('SELECT id, document_id, slug FROM industries');
  const indMap = {};
  allInd.forEach(i => { indMap[i.slug] = i.id; });

  // 3. Seed/Update all 18 case studies
  for (const cs of caseStudies) {
    let csId;
    const [existing] = await conn.query('SELECT id, document_id FROM case_studies WHERE slug = ?', [cs.slug]);
    if (existing.length > 0) {
      csId = existing[0].id;
      await conn.query(
        'UPDATE case_studies SET title = ?, excerpt = ?, published_at = NOW(), updated_at = NOW() WHERE id = ?',
        [cs.title, cs.snippet, csId]
      );
      console.log(`Updated case study: ${cs.title}`);
    } else {
      const docId = genDocId();
      const [res] = await conn.query(
        'INSERT INTO case_studies (document_id, title, slug, excerpt, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW(), NOW())',
        [docId, cs.title, cs.slug, cs.snippet]
      );
      csId = res.insertId;
      console.log(`Inserted case study: ${cs.title}`);
    }

    // Link industry if exists
    const industryId = indMap[cs.category] || indMap['banking-finance'];
    if (industryId) {
      try {
        await conn.query('DELETE FROM case_studies_industry_lnk WHERE case_study_id = ?', [csId]);
        await conn.query('INSERT INTO case_studies_industry_lnk (case_study_id, industry_id) VALUES (?, ?)', [csId, industryId]);
      } catch (err) {
        // Table or link might differ, ignore if not exists
      }
    }

    // Link research type if exists
    const rtId = rtMap[cs.research];
    if (rtId) {
      try {
        await conn.query('DELETE FROM case_studies_research_type_lnk WHERE case_study_id = ?', [csId]);
        await conn.query('INSERT INTO case_studies_research_type_lnk (case_study_id, research_type_id) VALUES (?, ?)', [csId, rtId]);
      } catch (err) {
        // Ignore link errors
      }
    }
  }

  // Grant public permissions to research-type if needed
  try {
    const [publicRoles] = await conn.query("SELECT id FROM up_roles WHERE type = 'public'");
    if (publicRoles.length > 0) {
      const pubId = publicRoles[0].id;
      const actions = ['api::research-type.research-type.find', 'api::research-type.research-type.findOne', 'api::case-study.case-study.find', 'api::case-study.case-study.findOne'];
      for (const act of actions) {
        const [perm] = await conn.query('SELECT id FROM up_permissions WHERE action = ?', [act]);
        let permId;
        if (perm.length === 0) {
          const docId = genDocId();
          const [ins] = await conn.query('INSERT INTO up_permissions (document_id, action, created_at, updated_at) VALUES (?, ?, NOW(), NOW())', [docId, act]);
          permId = ins.insertId;
        } else {
          permId = perm[0].id;
        }
        const [lnk] = await conn.query('SELECT * FROM up_permissions_role_lnk WHERE permission_id = ? AND role_id = ?', [permId, pubId]);
        if (lnk.length === 0) {
          await conn.query('INSERT INTO up_permissions_role_lnk (permission_id, role_id) VALUES (?, ?)', [permId, pubId]);
        }
      }
    }
  } catch (err) {
    console.error('Permission error:', err.message);
  }

  await conn.end();
  console.log('Successfully seeded all 18 Case Studies and Research Types in MySQL!');
}

run().catch(console.error);

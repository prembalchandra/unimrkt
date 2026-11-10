const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function seedIndustriesCMS() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  console.log('Connected to MySQL unimrkt_strapi database.');

  // Check columns of metric cards
  const [cols] = await db.query('DESCRIBE components_elements_metric_cards');
  console.log('components_elements_metric_cards columns:', cols.map(c => c.Field));

  // 1. Update callout-box 14 (About overview)
  await db.query(`
    UPDATE components_sections_callout_boxes
    SET kicker = 'Our Industries',
        title = 'Understanding Industries. Uncovering Opportunities.',
        description = 'Every industry operates within a unique ecosystem shaped by customer expectations, market trends, competition, technology and regulatory changes. Unimrkt Research helps organizations understand these dynamics through industry-focused research designed around specific business questions and objectives.'
    WHERE id = 14
  `);
  console.log('Updated callout-box 14 (About overview)');

  // 2. Update callout-box 15 (Industries Grid Header)
  await db.query(`
    UPDATE components_sections_callout_boxes
    SET kicker = 'OUR EXPERTISE',
        title = 'Deep Expertise Across Diverse Industries',
        description = 'From nascent startups to established enterprises, we help organizations across sectors make sense of complex market dynamics, uncovering growth opportunities, and staying ahead of change. Our specialized research teams bring deep industry knowledge and proven methodologies to every project.'
    WHERE id = 15
  `);
  console.log('Updated callout-box 15 (Grid Header)');

  // 3. Update Partner Industries: accordion_solutions 14
  await db.query(`
    UPDATE components_sections_accordion_solutions
    SET kicker = 'BEYOND VERTICALS',
        heading = 'One Research Partner. Multiple Industries.',
        description = 'At Unimrkt Research, we believe meaningful research starts with understanding the question behind the business challenge. Our services bring together primary research, qualitative and quantitative methodologies, business research and specialized research support to help organizations gain a deeper understanding of their customers, markets and opportunities.'
    WHERE id = 14
  `);
  console.log('Updated accordion_solutions 14 (Partner)');

  // Clear existing cmps for accordion_solutions 14
  await db.query(`DELETE FROM components_sections_accordion_solutions_cmps WHERE entity_id = 14`);
  
  const partnerCards = [
    {
      title: 'Cross-Industry Benchmarking',
      description: 'Synthesizing market behavior across parallel sectors to uncover unexploited growth pathways and transferrable customer trends.',
      icon_class: '/uploads/industries_icon_beyond_infrastructure_7740e0e270.svg'
    },
    {
      title: 'Agile Research Frameworks',
      description: 'Scalable quantitative and qualitative methodologies tailored dynamically to project urgency, audience complexity, and market velocity.',
      icon_class: '/uploads/industries_icon_beyond_repair_e8fe083fb0.svg'
    },
    {
      title: 'Specialized Research Expertise',
      description: 'Dedicated sector analysts with hands-on domain experience deliver deep context to every data point, ensuring recommendations that are immediately actionable for your business.',
      icon_class: '/uploads/industries_icon_beyond_research_db455e8c5f.svg'
    },
    {
      title: 'Advanced Analytics Integration',
      description: 'Merging primary fieldwork with multi-source syndicated telemetry, predictive econometric models, and real-time sentiment scoring.',
      icon_class: '/uploads/industries_icon_beyond_dashboard_29b30be305.svg'
    },
    {
      title: 'Tailored Execution Methodologies',
      description: 'Bespoke sampling matrices, verified CATI, and multi-country CAWI execution engineered for difficult-to-reach enterprise cohorts.',
      icon_class: '/uploads/industries_icon_beyond_configuration_edea846bc9.svg'
    },
    {
      title: 'Global Reach with Local Nuance',
      description: 'Proprietary panel communities spanning 90+ countries with in-country native-language moderation ensuring strict cultural authenticity.',
      icon_class: '/uploads/industries_icon_beyond_growth_c2885d0bdc.svg'
    }
  ];

  for (let i = 0; i < partnerCards.length; i++) {
    const c = partnerCards[i];
    const [res] = await db.query(
      `INSERT INTO components_elements_feature_items (title, description, icon_class) VALUES (?, ?, ?)`,
      [c.title, c.description, c.icon_class]
    );
    await db.query(
      `INSERT INTO components_sections_accordion_solutions_cmps (entity_id, cmp_id, component_type, field, \`order\`) VALUES (?, ?, 'elements.feature-item', 'cards', ?)`,
      [14, res.insertId, i + 1]
    );
  }
  console.log('Seeded 6 partner cards for accordion_solutions 14');

  // 4. Update Question CTA (id 80)
  await db.query(`
    UPDATE components_sections_question_ctas
    SET kicker = 'Get In Touch',
        title = 'Have A Question? Let\\'s Find The Answer.',
        description = 'A simple process designed to understand your requirement and connect you with the right research expert.'
    WHERE id = 80
  `);
  console.log('Updated question_cta 80');

  // 5. Update Questions To Insights: accordion_solutions 18
  await db.query(`
    UPDATE components_sections_accordion_solutions
    SET kicker = 'WHAT WE HELP YOU UNDERSTAND',
        heading = 'From Questions To Insights',
        description = 'Navigating business uncertainty requires answers to critical questions. We help organizations across industries uncover the insights needed to make informed, forward-looking decisions.'
    WHERE id = 18
  `);

  await db.query(`DELETE FROM components_sections_accordion_solutions_cmps WHERE entity_id = 18`);
  const questionAccordions = [
    {
      title: '01 Market Dynamics',
      description: 'Understanding evolving customer expectations, supply chain constraints, competitor maneuvers, and demand cycles across regional and global markets.',
      icon_class: '/uploads/industries_icon_q_globe_02ef28d4ec.svg'
    },
    {
      title: '02 Competitive Intelligence',
      description: 'Analyzing competitor strategies, market positioning, pricing structures, and product differentiation to protect and expand market share.',
      icon_class: '/uploads/industries_icon_q_ranking_35fa950a27.svg'
    },
    {
      title: '03 Customer & Buyer Preferences',
      description: 'Gaining granular visibility into changing customer preferences, brand affinity, switching barriers, and unmet needs across key target demographics.',
      icon_class: '/uploads/industries_icon_q_user_94d0515b80.svg'
    },
    {
      title: '04 Regulatory & Policy Impact',
      description: 'Navigating regulatory updates, compliance mandates, trade policies, and cross-border standards that impact market entry and ongoing operations.',
      icon_class: '/uploads/industries_icon_q_product_67dc11cf1e.svg'
    },
    {
      title: '05 Technology Adoption',
      description: 'Tracking digital transformation roadmaps, emerging software architectures, AI integration rates, and tech procurement criteria across enterprise sectors.',
      icon_class: '/uploads/industries_icon_q_review_e699e890a0.svg'
    },
    {
      title: '06 Supply Chain Resilience',
      description: 'Evaluating vendor vulnerabilities, supply chain logistics, procurement bottlenecks, and localized manufacturing shifts for sustained operational stability.',
      icon_class: '/uploads/industries_icon_q_trend_4c02afd31c.svg'
    }
  ];

  for (let i = 0; i < questionAccordions.length; i++) {
    const q = questionAccordions[i];
    const [res] = await db.query(
      `INSERT INTO components_elements_feature_items (title, description, icon_class) VALUES (?, ?, ?)`,
      [q.title, q.description, q.icon_class]
    );
    await db.query(
      `INSERT INTO components_sections_accordion_solutions_cmps (entity_id, cmp_id, component_type, field, \`order\`) VALUES (?, ?, 'elements.feature-item', 'cards', ?)`,
      [18, res.insertId, i + 1]
    );
  }
  console.log('Seeded 6 question accordion items for accordion_solutions 18');

  // 6. Update Business Outcomes: values_grid 41
  await db.query(`
    UPDATE components_sections_values_grids
    SET kicker = 'FEATURED CASE STUDIES',
        heading = 'From Business Questions to Meaningful Outcomes',
        description = 'See how we helped a global tech company uncover growth opportunities in emerging markets.'
    WHERE id = 41
  `);

  await db.query(`DELETE FROM components_sections_values_grids_cmps WHERE entity_id = 41`);
  const outcomeCards = [
    {
      title: 'The Challenge',
      description: 'A leading global SaaS enterprise sought to expand into APAC and EMEA markets but lacked localized intelligence regarding purchasing authority, pricing sensitivity, and competing domestic solutions.',
      icon_class: '/uploads/industries_icon_case_connection_eb7a68ba63.svg'
    },
    {
      title: 'The Approach',
      description: 'Unimrkt deployed a hybrid research methodology combining 45 in-depth stakeholder interviews (IDIs) with senior IT executives and an 800-respondent CAWI survey across 6 focus nations.',
      icon_class: '/uploads/industries_icon_case_cogwheel_92fdecc191.svg'
    },
    {
      title: 'The Insight',
      description: 'Identified distinct regional feature priorities and established an optimized tier-based pricing model, accelerating client market entry timelines by 40% and reducing initial CAC by 28%.',
      icon_class: '/uploads/industries_icon_case_insight_f3297cd056.svg'
    }
  ];

  for (let i = 0; i < outcomeCards.length; i++) {
    const o = outcomeCards[i];
    const [res] = await db.query(
      `INSERT INTO components_elements_feature_items (title, description, icon_class) VALUES (?, ?, ?)`,
      [o.title, o.description, o.icon_class]
    );
    await db.query(
      `INSERT INTO components_sections_values_grids_cmps (entity_id, cmp_id, component_type, field, \`order\`) VALUES (?, ?, 'elements.feature-item', 'values', ?)`,
      [41, res.insertId, i + 1]
    );
  }
  console.log('Seeded 3 outcome cards for values_grid 41');

  // 7. Update Local Insight Global Reach: metrics_grid 45
  await db.query(`
    UPDATE components_sections_metrics_grids
    SET kicker = 'GLOBAL PRESENCE',
        heading = 'Local Insight. Global Reach.',
        description = 'Unimrkt delivers research across 90+ countries and 22+ languages, combining deep local understanding with a global perspective.'
    WHERE id = 45
  `);

  await db.query(`DELETE FROM components_sections_metrics_grids_cmps WHERE entity_id = 45`);
  const metricCards = [
    {
      number: '90+',
      label: 'Countries Covered'
    },
    {
      number: '22+',
      label: 'Languages Supported'
    },
    {
      number: '4M+',
      label: 'Panel Members'
    },
    {
      number: 'Multi-Industry',
      label: 'Subject Expertise'
    }
  ];

  for (let i = 0; i < metricCards.length; i++) {
    const m = metricCards[i];
    const [res] = await db.query(
      `INSERT INTO components_elements_metric_cards (number, label) VALUES (?, ?)`,
      [m.number, m.label]
    );
    await db.query(
      `INSERT INTO components_sections_metrics_grids_cmps (entity_id, cmp_id, component_type, field, \`order\`) VALUES (?, ?, 'elements.metric-card', 'metrics', ?)`,
      [45, res.insertId, i + 1]
    );
  }
  console.log('Seeded 4 metric cards for metrics_grid 45');

  // 8. Update Industry Verticals in `industries` table so cards show actual photos and titles matching reference
  const industriesToUpdate = [
    {
      id: 1,
      title: 'Healthcare & Pharmaceutical Research',
      short_description: 'Strategic market intelligence driving clinical innovation, digital onboarding, and risk mitigation across biotech and global pharma.',
      slug: 'healthcare-pharmaceutical'
    },
    {
      id: 2,
      title: 'Automotive & Transport Market Research',
      short_description: 'Accelerating transformation across electric vehicles, autonomous technology, and connected fleet ecosystems.',
      slug: 'automotive-transport'
    },
    {
      id: 3,
      title: 'Technology & Communication',
      short_description: 'B2B technology intelligence benchmarking enterprise SaaS, cloud security, 5G networks, and AI adoption trends.',
      slug: 'technology-communication'
    },
    {
      id: 4,
      title: 'Automotive',
      short_description: 'Deep consumer perception studies, supply chain benchmarking, and connected car telemetry intelligence.',
      slug: 'automotive'
    },
    {
      id: 5,
      title: 'Information Technology',
      short_description: 'End-user buyer journeys, enterprise software procurement criteria, and developer sentiment studies.',
      slug: 'information-technology'
    },
    {
      id: 6,
      title: 'Energy',
      short_description: 'Renewable energy transition analytics, utility customer sentiment, and global ESG compliance tracking.',
      slug: 'energy'
    }
  ];

  for (const ind of industriesToUpdate) {
    await db.query(
      `UPDATE industries SET title = ?, short_description = ?, slug = ?, published_at = NOW() WHERE id = ?`,
      [ind.title, ind.short_description, ind.slug, ind.id]
    );
  }
  console.log('Updated 6 industry vertical entries');

  // 9. Update Testimonials table with 3 client success stories from reference image
  await db.query(`DELETE FROM testimonials WHERE id <= 3`);
  const testimonialsData = [
    {
      id: 1,
      document_id: 'b31c8614c496ebabf586ff27',
      title: 'Transformative Research & Actionable Results',
      quote: 'Unimrkt Research delivered comprehensive market intelligence that gave us a clear understanding of customer behavior and competitive trends. Their insights played a key role in shaping our strategic decisions.',
      author_name: 'David Anderson',
      author_role: 'Head of Market Strategy',
      company_name: 'Global Enterprise Group',
      rating: 5,
      order: 1
    },
    {
      id: 2,
      document_id: 'c42d9725d507fcbcf697aa38',
      title: 'Flawless Execution of Multi-Country Fieldwork',
      quote: 'Working with Unimrkt on our multi-country healthcare study was seamless. Their ability to recruit verified specialist physicians across 12 countries within our tight timeline was extraordinary.',
      author_name: 'Elena Rostova',
      author_role: 'Director of Strategic Intelligence',
      company_name: 'BioHealth Innovations',
      rating: 5,
      order: 2
    },
    {
      id: 3,
      document_id: 'd53e0836e618adcdf708bb49',
      title: 'Exceptional Turnaround & Analytical Depth',
      quote: 'The depth of analysis and executive-ready presentations delivered by Unimrkt provided our board with the clarity needed to greenlight our expansion into Southeast Asia.',
      author_name: 'Marcus Vance',
      author_role: 'VP of Corporate Development',
      company_name: 'Apex Industrial Systems',
      rating: 5,
      order: 3
    }
  ];

  for (const t of testimonialsData) {
    await db.query(
      `INSERT INTO testimonials (id, document_id, title, quote, author_name, author_role, company_name, rating, \`order\`, published_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
      [t.id, t.document_id, t.title, t.quote, t.author_name, t.author_role, t.company_name, t.rating, t.order]
    );
  }
  console.log('Seeded 3 client testimonials');

  await db.end();
  console.log('\nAll Industries CMS records seeded successfully in MySQL unimrkt_strapi!');
}

seedIndustriesCMS().catch(console.error);

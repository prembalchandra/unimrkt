const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  console.log('Connected to MySQL. Seeding rich automotive page sections...');

  // Helper to insert a feature item
  async function insertFeatureItem(title, description, iconClass = null) {
    const [res] = await conn.execute(
      'INSERT INTO components_elements_feature_items (title, description, icon_class) VALUES (?, ?, ?)',
      [title, description, iconClass]
    );
    return res.insertId;
  }

  // 1. Intelligence Cards as research-reach section
  const [intelReachRes] = await conn.execute(
    'INSERT INTO components_sections_research_reaches (kicker, heading, description) VALUES (?, ?, ?)',
    ['ACTIONABLE MARKET INTELLIGENCE', 'Accelerate Growth With Industry Intelligence', 'Decoding consumer purchase drivers, EV price elasticity, and smart cockpits.']
  );
  const intelReachId = intelReachRes.insertId;

  const intelCards = [
    { title: 'Vehicle Buyer Behavior', desc: 'Decoding consumer purchase drivers, EV price elasticity, brand perception, and post-purchase dealership experiences across key international demographics.', iconClass: '/asstes/images/market-trends-card-img1.png' },
    { title: 'Commercial Fleet Transition', desc: 'Forecasting fleet electrification pace, total cost of ownership (TCO) expectations, depot charging readiness, and telematics adoption hurdles.', iconClass: '/asstes/images/market-trends-card-img2.png' },
    { title: 'Connected Cockpit & ADAS', desc: 'Evaluating driver trust in autonomous safety systems, in-vehicle software usability, infotainment preferences, and subscription monetization models.', iconClass: '/asstes/images/market-trends-card-img3.png' }
  ];

  for (let i = 0; i < intelCards.length; i++) {
    const featId = await insertFeatureItem(intelCards[i].title, intelCards[i].desc, intelCards[i].iconClass);
    await conn.execute(
      'INSERT INTO components_sections_research_reaches_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [intelReachId, featId, 'elements.feature-item', 'cards', i + 1]
    );
  }

  // 2. Challenges as accordion-solutions
  const [chalRes] = await conn.execute(
    'INSERT INTO components_sections_accordion_solutions (heading, description) VALUES (?, ?)',
    ['Key Challenges We Solve', 'The automotive industry is rapidly evolving with technological advancements, changing consumer expectations, and increasing regulatory demands. Unimrkt Research helps businesses overcome these challenges through reliable market intelligence and actionable insights.']
  );
  const chalId = chalRes.insertId;

  const challenges = [
    { title: 'Consumer Preferences', desc: 'Understand evolving buying behavior, ownership trends, and customer expectations.', iconClass: '/asstes/images/icon/consumer-preferences-icon-img.png' },
    { title: 'EV & Future Mobility', desc: 'Track electric vehicle adoption, charging infrastructure, and emerging mobility trends.', iconClass: '/asstes/images/icon/future-mobility-icon-img.png' },
    { title: 'Competitive Intelligence', desc: 'Monitor competitors, pricing strategies, product launches, and market positioning.', iconClass: '/asstes/images/icon/competitive-intelligence-icon-img2.png' },
    { title: 'Regulatory & Market Dynamics', desc: 'Stay informed about policy changes, sustainability initiatives, and industry developments.', iconClass: '/asstes/images/icon/market-dynamic-icon-img.png' }
  ];

  for (let i = 0; i < challenges.length; i++) {
    const featId = await insertFeatureItem(challenges[i].title, challenges[i].desc, challenges[i].iconClass);
    await conn.execute(
      'INSERT INTO components_sections_accordion_solutions_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [chalId, featId, 'elements.feature-item', 'cards', i + 1]
    );
  }

  // 3. Ecosystem Slider as industry-slider
  const [ecoRes] = await conn.execute(
    'INSERT INTO components_sections_industry_sliders (kicker, heading, description) VALUES (?, ?, ?)',
    ['OUR EXPERTISE', 'Expertise Across The Automotive Ecosystem', 'Delivering deep domain clarity across passenger, commercial, component, and technology verticals.']
  );
  const ecoId = ecoRes.insertId;

  const ecoSlides = [
    { title: 'Mobility', desc: 'Urban shared mobility and micromobility trends', iconClass: '01.' },
    { title: 'Automobile Manufacturing', desc: 'OEM platform innovation and assembly line transformation', iconClass: '02.' },
    { title: 'Two-Wheeler & Three-Wheeler Vehicles', desc: 'Electric two-wheeler adoption and commuter logistics', iconClass: '03.' },
    { title: 'Automobile Technology', desc: 'ADAS, infotainment, battery management, and autonomous systems', iconClass: '04.' },
    { title: 'Accessories', desc: 'Aftermarket vehicle styling and functional upgrades', iconClass: '05.' },
    { title: 'Commercial & Fleet Mobility', desc: 'Telematics, logistics fleets, and depot charging infrastructure', iconClass: '06.' },
    { title: 'Aftermarket & Dealerships', desc: 'Dealership sales efficiency, DMS platforms, and parts networks', iconClass: '07.' }
  ];

  for (let i = 0; i < ecoSlides.length; i++) {
    const featId = await insertFeatureItem(ecoSlides[i].title, ecoSlides[i].desc, ecoSlides[i].iconClass);
    await conn.execute(
      'INSERT INTO components_sections_industry_sliders_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [ecoId, featId, 'elements.feature-item', 'slides', i + 1]
    );
  }

  // 4. Segments as values-grid
  const [segRes] = await conn.execute(
    'INSERT INTO components_sections_values_grids (kicker, heading, description) VALUES (?, ?, ?)',
    ['WHO WE SERVE', 'Supporting Every Automotive Segment', 'Specialized research programs customized for OEMs, suppliers, mobility startups, and fleet networks.']
  );
  const segId = segRes.insertId;

  const segments = [
    { title: 'Automotive Manufacturers & OEMs', desc: 'Assisting motor vehicle manufacturers with buyer persona mapping, brand health tracking, vehicle concept clinics, and price sensitivity modeling for new model launches. Our research delivers actionable insights on brand awareness, customer satisfaction, and product improvement to drive sustainable automotive growth.', iconClass: '/asstes/images/icon/automotive-icon-img.png' },
    { title: 'Auto Component Suppliers', desc: 'Providing engineering and component suppliers with OEM procurement intelligence, technology adoption roadmaps, and competitive benchmarking across global markets. We help component makers identify new product opportunities, optimize supply chain efficiency, and make informed strategic decisions that strengthen market presence.', iconClass: '/asstes/images/icon/auto-component-suppliers-icon-img.png' },
    { title: 'EV & Mobility Companies', desc: 'Empowering electric vehicle and smart mobility innovators with battery technology perceptions, charging infrastructure acceptance, consumer range anxiety analysis, and urban micromobility trends. We deliver critical data on consumer adoption barriers, pricing models, and regulatory landscape impacts to accelerate adoption.', iconClass: '/asstes/images/icon/EV-icon-img.png' },
    { title: 'Dealerships, Fleet & Technology Companies', desc: 'Equipping auto dealerships, fleet management firms, and automotive software developers with actionable consumer insights, connected vehicle data expectations, DMS software usability studies, and aftermarket service satisfaction metrics to navigate disruption and identify high-value commercial opportunities.', iconClass: '/asstes/images/icon/dealerships-icon-img.png' }
  ];

  for (let i = 0; i < segments.length; i++) {
    const featId = await insertFeatureItem(segments[i].title, segments[i].desc, segments[i].iconClass);
    await conn.execute(
      'INSERT INTO components_sections_values_grids_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [segId, featId, 'elements.feature-item', 'values', i + 1]
    );
  }

  // 5. Methodologies as research-reach
  const [methodRes] = await conn.execute(
    'INSERT INTO components_sections_research_reaches (kicker, heading, description) VALUES (?, ?, ?)',
    ['PROVEN METHODOLOGIES', 'Proven Research Methodologies', 'From cockpit usability clinics to enterprise supply chain audits, our multi-modal research suites deliver dependable, defensible intelligence for high-stakes mobility decisions.']
  );
  const methodId = methodRes.insertId;

  const methods = [
    { title: 'CAWI Surveys', desc: 'Deploying responsive quantitative surveys to verified EV owners, intenders, and passenger car drivers worldwide.', iconClass: '/asstes/images/online-surveys-card-img.png' },
    { title: 'In-Facility Surveys', desc: 'Conducting structured executive interviews with fleet directors, dealership principals, and automotive engineers.', iconClass: '/asstes/images/smart-survey-management-card-img.png' },
    { title: 'In-Depth Executive Interviews', desc: 'One-on-one qualitative discovery with Tier-1 procurement leads and mobility innovators on strategic roadmaps.', iconClass: '/asstes/images/interview-controls-card-img.png' },
    { title: 'Focus Group Discussions (FGDs)', desc: 'Physical and virtual vehicle clinics evaluating cockpit ergonomics, digital infotainment, and styling appeal.', iconClass: '/asstes/images/real-time-monitoring-card-img.png' },
    { title: 'Mystery Shopping & Audits', desc: 'Assessing dealer network sales etiquette, EV customer handover protocols, and test drive quality standards.', iconClass: '/asstes/images/telephonic-surveys-card-img.png' },
    { title: 'Brand Health Tracking', desc: 'Continuous multi-market monitoring of OEM brand equity, consideration funnel, and net promoter score (NPS).', iconClass: '/asstes/images/data-validation-card-img.png' }
  ];

  for (let i = 0; i < methods.length; i++) {
    const featId = await insertFeatureItem(methods[i].title, methods[i].desc, methods[i].iconClass);
    await conn.execute(
      'INSERT INTO components_sections_research_reaches_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [methodId, featId, 'elements.feature-item', 'cards', i + 1]
    );
  }

  // Attach all 5 new components to both automotives page rows (id: 15 and id: 81)
  const targetPageIds = [15, 81];
  for (const pid of targetPageIds) {
    const newCmps = [
      { cmp_id: intelReachId, type: 'sections.research-reach', order: 10 },
      { cmp_id: chalId, type: 'sections.accordion-solutions', order: 11 },
      { cmp_id: ecoId, type: 'sections.industry-slider', order: 12 },
      { cmp_id: segId, type: 'sections.values-grid', order: 13 },
      { cmp_id: methodId, type: 'sections.research-reach', order: 14 }
    ];

    for (const c of newCmps) {
      await conn.execute(
        'INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
        [pid, c.cmp_id, c.type, 'sections', c.order]
      );
    }
  }

  console.log('Automotive sections successfully seeded into MySQL unimrkt_strapi!');
  await conn.end();
}

main().catch(console.error);

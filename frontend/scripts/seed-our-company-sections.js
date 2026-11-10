const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  console.log('Connected to MySQL. Seeding rich our-company page sections...');

  async function insertFeatureItem(title, description, iconClass = null) {
    const [res] = await conn.execute(
      'INSERT INTO components_elements_feature_items (title, description, icon_class) VALUES (?, ?, ?)',
      [title, description, iconClass]
    );
    return res.insertId;
  }

  async function insertMetricCard(number, label) {
    const [res] = await conn.execute(
      'INSERT INTO components_elements_metric_cards (number, label) VALUES (?, ?)',
      [number, label]
    );
    return res.insertId;
  }

  // 1. Research Impact Metrics Grid
  const [metricGridRes] = await conn.execute(
    'INSERT INTO components_sections_metrics_grids (kicker, heading, description) VALUES (?, ?, ?)',
    ['RESEARCH WITHOUT BORDERS', 'Research Without Borders', 'Global reach and infrastructure designed for reliable multi-country data collection.']
  );
  const metricGridId = metricGridRes.insertId;

  const stats = [
    { number: '90+', label: 'Countries' },
    { number: '22+', label: 'Languages' },
    { number: '450+', label: 'CATI Stations' },
    { number: '16+', label: 'Years of Experience' }
  ];

  for (let i = 0; i < stats.length; i++) {
    const mId = await insertMetricCard(stats[i].number, stats[i].label);
    await conn.execute(
      'INSERT INTO components_sections_metrics_grids_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [metricGridId, mId, 'elements.metric-card', 'metrics', i + 1]
    );
  }

  // 2. Company Overview Pillars (values-grid)
  const [pillarRes] = await conn.execute(
    'INSERT INTO components_sections_values_grids (kicker, heading, description) VALUES (?, ?, ?)',
    ['Why Businesses Choose Unimrkt', 'Insights That Move Businesses Forward', 'Transforming complex data into clear, actionable insights that help businesses make smarter decisions and unlock new opportunities.']
  );
  const pillarId = pillarRes.insertId;

  const pillars = [
    { title: 'Global Reach', desc: 'Access diverse markets across continents.', icon: '/asstes/images/icon/global-reach-icon-img.png' },
    { title: 'Deep Expertise', desc: 'Experienced researchers across industries.', icon: '/asstes/images/icon/deep-expertise-profile-2user-iocn-img.png' },
    { title: 'Faster Decisions', desc: 'Clear insights delivered when they matter.', icon: '/asstes/images/icon/faster-decisions-timer-icon-img.png' },
    { title: 'Reliable Quality', desc: 'Research built on rigorous standards.', icon: '/asstes/images/icon/shield-tick-reliable-quality.png' }
  ];

  for (let i = 0; i < pillars.length; i++) {
    const fId = await insertFeatureItem(pillars[i].title, pillars[i].desc, pillars[i].icon);
    await conn.execute(
      'INSERT INTO components_sections_values_grids_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [pillarId, fId, 'elements.feature-item', 'values', i + 1]
    );
  }

  // 3. Research Ecosystem Journey (accordion-solutions)
  const [ecoRes] = await conn.execute(
    'INSERT INTO components_sections_accordion_solutions (heading, description) VALUES (?, ?)',
    ['From Question To Business Decision', 'A highly visual interactive journey:']
  );
  const ecoId = ecoRes.insertId;

  const processSteps = [
    { title: 'Define', desc: 'We define business challenges and research goals to uncover clear opportunities for growth. Our approach aligns research with strategic priorities, customer needs, market dynamics, and competitive realities, helping organizations identify the right questions, focus on meaningful insights, and develop actionable strategies that support informed decisions, innovation, and sustainable business growth.', icon: '/asstes/images/icon/understanding-icon-img.png' },
    { title: 'Discover', desc: 'We discover meaningful insights, emerging trends, and untapped opportunities that help businesses make smarter, data-driven decisions. By understanding customers, markets, competitors, and evolving behaviours, we turn complex information into clear direction, enabling organizations to refine strategies, identify growth opportunities, strengthen market positioning, and build sustainable competitive advantage for long-term success.', icon: '/asstes/images/icon/front-end-programming-icon-img.png' },
    { title: 'Decode', desc: 'We decode complex data into clear, actionable insights that reveal meaningful patterns, strategic direction, and new opportunities for business growth. By combining research, analysis, and market intelligence, we help organizations understand what matters, uncover emerging trends, reduce uncertainty, make confident decisions, optimize strategies, and create sustainable value across evolving markets.', icon: '/asstes/images/icon/recruit-icon-img.png' },
    { title: 'Deliver', desc: 'We deliver actionable insights that empower businesses to make confident, strategic decisions and achieve sustainable growth. Through rigorous research and market intelligence-driven recommendations, we help organizations seize opportunities, address challenges, connect with customers, strengthen strategic market performance, navigate market shifts, and build a stronger foundation for long-term success.', icon: '/asstes/images/icon/Interview-icon-img.png' },
    { title: 'Drive', desc: 'We drive growth by turning actionable insights into focused strategies that create lasting business impact. By connecting research with real-world business priorities, we help organizations uncover opportunities, solve challenges, strengthen decision-making, optimize performance, adapt to changing markets, and build sustainable competitive advantage that delivers measurable value and long-term growth.', icon: '/asstes/images/icon/deliver-icon-img.png' }
  ];

  for (let i = 0; i < processSteps.length; i++) {
    const fId = await insertFeatureItem(processSteps[i].title, processSteps[i].desc, processSteps[i].icon);
    await conn.execute(
      'INSERT INTO components_sections_accordion_solutions_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [ecoId, fId, 'elements.feature-item', 'cards', i + 1]
    );
  }

  // 4. Core Values Grid (research-reach)
  const [valReachRes] = await conn.execute(
    'INSERT INTO components_sections_research_reaches (kicker, heading, description) VALUES (?, ?, ?)',
    ['OUR VALUES', 'The Principles Behind Our Work', 'We believe that our values not only make us a reliable business partner and consumer research agency, but also a thoughtful one.']
  );
  const valReachId = valReachRes.insertId;

  const values = [
    { title: 'Clear Communication', desc: 'We communicate openly, clearly, and consistently to build trust and ensure shared understanding.', icon: '/asstes/images/icon/clear-communication-icon-img.png' },
    { title: 'Innovation', desc: 'We embrace new ideas, technologies, and approaches to deliver smarter, more effective research solutions.', icon: '/asstes/images/icon/innovation-icon-img.png' },
    { title: 'Team Work', desc: 'We collaborate closely, combining diverse expertise to deliver stronger insights and better outcomes.', icon: '/asstes/images/icon/team-work-icon-img2.png' },
    { title: 'Integrity', desc: 'We uphold honesty, transparency, and ethical practices across every project, partnership, and decision.', icon: '/asstes/images/icon/integrity-icon-img.png' },
    { title: 'Business Ethics', desc: 'We conduct business responsibly, ethically, and transparently, building lasting trust with every stakeholder.', icon: '/asstes/images/icon/business-ethics-icon-img.png' },
    { title: 'Transparency', desc: 'We communicate openly, share information clearly, and build trust through every interaction.', icon: '/asstes/images/icon/transparency-icon-img2.png' },
    { title: 'Wisdom', desc: 'We apply knowledge, experience, and thoughtful judgment to create smarter business outcomes.', icon: '/asstes/images/icon/wisdom-icon-img.png' },
    { title: 'Diversity', desc: 'We value diverse perspectives, experiences, and ideas to create stronger, more inclusive outcomes.', icon: '/asstes/images/icon/diversity-icon-img2.png' }
  ];

  for (let i = 0; i < values.length; i++) {
    const fId = await insertFeatureItem(values[i].title, values[i].desc, values[i].icon);
    await conn.execute(
      'INSERT INTO components_sections_research_reaches_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [valReachId, fId, 'elements.feature-item', 'cards', i + 1]
    );
  }

  // Attach new components to both our-company rows (id: 5 and id: 75)
  const targetPageIds = [5, 75];
  for (const pid of targetPageIds) {
    const newCmps = [
      { cmp_id: metricGridId, type: 'sections.metrics-grid', order: 10 },
      { cmp_id: pillarId, type: 'sections.values-grid', order: 11 },
      { cmp_id: ecoId, type: 'sections.accordion-solutions', order: 12 },
      { cmp_id: valReachId, type: 'sections.research-reach', order: 13 }
    ];

    for (const c of newCmps) {
      await conn.execute(
        'INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
        [pid, c.cmp_id, c.type, 'sections', c.order]
      );
    }
  }

  console.log('our-company sections successfully seeded into MySQL unimrkt_strapi!');
  await conn.end();
}

main().catch(console.error);

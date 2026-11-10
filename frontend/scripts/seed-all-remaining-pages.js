const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  console.log('Connected to MySQL unimrkt_strapi. Seeding all remaining page sections...');

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

  async function attachComponentToPages(slugs, cmpId, type, order) {
    for (const slug of slugs) {
      const [pages] = await conn.execute('SELECT id FROM pages WHERE slug = ?', [slug]);
      for (const p of pages) {
        await conn.execute(
          'INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
          [p.id, cmpId, type, 'sections', order]
        );
      }
    }
  }

  // ==========================================
  // 1. PRIMARY RESEARCH
  // ==========================================
  console.log('Seeding Primary Research...');
  // A. Methodologies (accordion-solutions)
  const [prMethodRes] = await conn.execute(
    'INSERT INTO components_sections_accordion_solutions (heading, description) VALUES (?, ?)',
    ['Step-by-Step Research Methodology', 'Structured research journey from discovery to strategic impact.']
  );
  const prMethodId = prMethodRes.insertId;
  const prSteps = [
    { title: 'Understand Objectives', desc: 'Helping manufacturers understand market trends, customer expectations, and product opportunities.' },
    { title: 'Research Design', desc: 'Structuring research parameters, target demographics, and analytical frameworks.' },
    { title: 'Questionnaire Development', desc: 'Designing validated screening instruments and engaging question flows.' },
    { title: 'Respondent Recruitment', desc: 'Accessing verified C-level executives, technical professionals, and consumers.' },
    { title: 'Data Collection', desc: 'Gathering first-hand feedback through carefully managed interviews and surveys.' },
    { title: 'Quality Control', desc: 'Reviewing responses and validating data to maintain accuracy and consistency.' },
    { title: 'Data Analysis', desc: 'Finding meaningful patterns in the data to reveal customer needs and market trends.' },
    { title: 'Strategic Recommendations', desc: 'Applying research findings to inform next steps and support business growth.' }
  ];
  for (let i = 0; i < prSteps.length; i++) {
    const fId = await insertFeatureItem(prSteps[i].title, prSteps[i].desc, `0${i + 1}`);
    await conn.execute(
      'INSERT INTO components_sections_accordion_solutions_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [prMethodId, fId, 'elements.feature-item', 'cards', i + 1]
    );
  }

  // B. Unimrkt Research Area Metrics (research-reach)
  const [prReachRes] = await conn.execute(
    'INSERT INTO components_sections_research_reaches (kicker, heading, description) VALUES (?, ?, ?)',
    ['SCALE & CAPABILITY', 'Unimrkt Research Infrastructure', 'Comprehensive CATI workstations, vetted moderators, and enterprise scale.']
  );
  const prReachId = prReachRes.insertId;
  const prMetrics = [
    { title: '450+', desc: 'CATI analytics team members', icon: '/asstes/images/icon/team-members-icon-img.png' },
    { title: 'On-time', desc: 'Project deliveries', icon: '/asstes/images/icon/on-time-icon-img.png' },
    { title: '80%', desc: 'Repeat business', icon: '/asstes/images/icon/repeat-business-icon-img.png' },
    { title: '250,000+ CATI', desc: 'Surveys completed every year', icon: '/asstes/images/icon/surveys-complet-year-icon-img.png' },
    { title: 'State-of-the-art', desc: 'CATI systems integrated with predictive dialers', icon: '/asstes/images/icon/State-of-the-art-icon-img.png' },
    { title: '35-40%', desc: 'Average cost savings', icon: '/asstes/images/icon/average-cost-savings-icon-img.png' },
    { title: '300+', desc: 'Moderators with rich professional backgrounds', icon: '/asstes/images/icon/moderators-icon-img.png' },
    { title: 'ISO20252', desc: 'A ESOMAR certified firm', icon: '/asstes/images/icon/certified-icon-img.png' },
    { title: '1000+', desc: 'Projects of combined experience with 100% QA', icon: '/asstes/images/icon/projects-of-combined-icon-img.png' },
    { title: '30,000 sq. ft.', desc: 'The usability of more than 460 seats', icon: '/asstes/images/icon/scalability-icon-img.png' },
    { title: '24*7', desc: 'Operations and dedicated project management', icon: '/asstes/images/icon/support-icon-img.png' }
  ];
  for (let i = 0; i < prMetrics.length; i++) {
    const fId = await insertFeatureItem(prMetrics[i].title, prMetrics[i].desc, prMetrics[i].icon);
    await conn.execute(
      'INSERT INTO components_sections_research_reaches_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [prReachId, fId, 'elements.feature-item', 'cards', i + 1]
    );
  }
  await attachComponentToPages(['primary-research'], prMethodId, 'sections.accordion-solutions', 20);
  await attachComponentToPages(['primary-research'], prReachId, 'sections.research-reach', 21);

  // ==========================================
  // 2. TELEPHONIC SURVEYS (CATI)
  // ==========================================
  console.log('Seeding Telephonic Surveys...');
  // A. Measure Capabilities (accordion-solutions)
  const [telMeasureRes] = await conn.execute(
    'INSERT INTO components_sections_accordion_solutions (heading, description) VALUES (?, ?)',
    ['Human Conversations. Technology-Enabled Research.', 'CATI combines interviewer-led conversations with technology for consistent, efficient research management.']
  );
  const telMeasureId = telMeasureRes.insertId;
  const telPanels = [
    { title: 'Smart Survey Management', desc: 'Structured questionnaires and controlled interview flows.', icon: '/asstes/images/smart-survey-management-card-img.png' },
    { title: 'Real-Time Monitoring', desc: 'Live supervisor dashboards and field interview tracking.', icon: '/asstes/images/real-time-monitoring-card-img.png' },
    { title: 'Interview Controls', desc: 'Strict quota enforcement and verified demographic protocols.', icon: '/asstes/images/interview-controls-card-img.png' },
    { title: 'Data Validation', desc: 'Automated speeder checks and multi-point audio audits.', icon: '/asstes/images/data-validation-card-img.png' },
    { title: 'Centralized Data', desc: 'Unified reporting and instant data synchronization across markets.', icon: '/asstes/images/centralized-data-card-img.png' }
  ];
  for (let i = 0; i < telPanels.length; i++) {
    const fId = await insertFeatureItem(telPanels[i].title, telPanels[i].desc, telPanels[i].icon);
    await conn.execute(
      'INSERT INTO components_sections_accordion_solutions_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [telMeasureId, fId, 'elements.feature-item', 'cards', i + 1]
    );
  }

  // B. Quality First (values-grid)
  const [telQualRes] = await conn.execute(
    'INSERT INTO components_sections_values_grids (kicker, heading, description) VALUES (?, ?, ?)',
    ['QUALITY FIRST', 'Every Conversation Counts. Every Response Matters.', 'Reliable research starts with reliable data. Our quality framework is designed to maintain accuracy, consistency and respondent authenticity.']
  );
  const telQualId = telQualRes.insertId;
  const telPoints = [
    { title: 'Interviewer Training', desc: 'Interviewers are trained on research goals and questionnaire flow.', icon: '/asstes/images/icon/interviewer-icon-img.png' },
    { title: 'Sample Validation', desc: 'Respondents are screened against agreed research criteria.', icon: '/asstes/images/icon/sample-validation-icon-img.png' },
    { title: 'Call Monitoring', desc: 'Fieldwork is monitored to maintain interviewing standards.', icon: '/asstes/images/icon/call-monitoring-icon-img.png' },
    { title: 'Response Validation', desc: 'Responses are reviewed for completeness and consistency.', icon: '/asstes/images/icon/response-validation-icon-img.png' },
    { title: 'Data Quality Checks', desc: 'Structured checks identify anomalies and quality issues.', icon: '/asstes/images/icon/data-quality-checks-icon-img.png' },
    { title: 'Secure Data Handling', desc: 'Research data is securely managed to protect respondent privacy.', icon: '/asstes/images/icon/secure-data-handling-icon-img.png' }
  ];
  for (let i = 0; i < telPoints.length; i++) {
    const fId = await insertFeatureItem(telPoints[i].title, telPoints[i].desc, telPoints[i].icon);
    await conn.execute(
      'INSERT INTO components_sections_values_grids_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [telQualId, fId, 'elements.feature-item', 'values', i + 1]
    );
  }

  // C. What Telephonic Can Measure (research-reach)
  const [telCanRes] = await conn.execute(
    'INSERT INTO components_sections_research_reaches (kicker, heading, description) VALUES (?, ?, ?)',
    ['WHAT WE MEASURE', 'Comprehensive Research Domains', 'Empowering strategic business intelligence across customer, brand, and market touchpoints.']
  );
  const telCanId = telCanRes.insertId;
  const telCan = [
    { title: 'Customer Experience', desc: 'Measure CSAT, NPS, and touchpoints to improve retention.', icon: '/asstes/images/customer-experience-img.png' },
    { title: 'Brand Perception', desc: 'Track brand perception, sentiment, and market positioning.', icon: '/asstes/images/brand-research-img.png' },
    { title: 'Brand Awareness', desc: 'Evaluate brand awareness, consumer affinity, and loyalty.', icon: '/asstes/images/brand-research-img2.png' },
    { title: 'Product Research', desc: 'Evaluate feature adoption, usability feedback, and readiness.', icon: '/asstes/images/b2b-research-img.png' },
    { title: 'B2B Research', desc: 'Engage decision-makers and high-level enterprise accounts.', icon: '/asstes/images/B2B-Research2.png' },
    { title: 'Employee Research', desc: 'Gather honest workplace sentiment and employee engagement.', icon: '/asstes/images/employee-research-img.png' }
  ];
  for (let i = 0; i < telCan.length; i++) {
    const fId = await insertFeatureItem(telCan[i].title, telCan[i].desc, telCan[i].icon);
    await conn.execute(
      'INSERT INTO components_sections_research_reaches_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [telCanId, fId, 'elements.feature-item', 'cards', i + 1]
    );
  }

  // D. Telephonic Process Steps (accordion-solutions)
  const [telProcRes] = await conn.execute(
    'INSERT INTO components_sections_accordion_solutions (heading, description) VALUES (?, ?)',
    ['Our Telephonic Research Process', 'From initial question to delivered dataset with strict audit trails.']
  );
  const telProcId = telProcRes.insertId;
  const telProcessSteps = [
    { title: 'Understand', desc: 'We begin by understanding your research goals, target audience, sample needs and key questions.', icon: '/asstes/images/icon/understanding-icon-img.png' },
    { title: 'Design', desc: 'Our research team structures the questionnaire and interview flow around the study objectives.', icon: '/asstes/images/icon/front-end-programming-icon-img.png' },
    { title: 'Recruit', desc: 'We identify and reach relevant respondents based on the agreed sample criteria.', icon: '/asstes/images/icon/recruit-icon-img.png' },
    { title: 'Interview', desc: 'Trained interviewers conduct structured interviews using CATI-enabled workflows.', icon: '/asstes/images/icon/Interview-icon-img.png' },
    { title: 'Quality Check', desc: 'Interviews and collected data undergo systematic quality checks to maintain consistency and reliability.', icon: '/asstes/images/icon/ouality-check-icon-img.png' },
    { title: 'Deliver', desc: 'Validated datasets and research outputs are prepared for analysis and decision-making.', icon: '/asstes/images/icon/deliver-icon-img.png' }
  ];
  for (let i = 0; i < telProcessSteps.length; i++) {
    const fId = await insertFeatureItem(telProcessSteps[i].title, telProcessSteps[i].desc, telProcessSteps[i].icon);
    await conn.execute(
      'INSERT INTO components_sections_accordion_solutions_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [telProcId, fId, 'elements.feature-item', 'cards', i + 1]
    );
  }
  await attachComponentToPages(['telephonic-surveys'], telMeasureId, 'sections.accordion-solutions', 20);
  await attachComponentToPages(['telephonic-surveys'], telQualId, 'sections.values-grid', 21);
  await attachComponentToPages(['telephonic-surveys'], telCanId, 'sections.research-reach', 22);
  await attachComponentToPages(['telephonic-surveys'], telProcId, 'sections.accordion-solutions', 23);

  // ==========================================
  // 3. SERVICES OVERVIEW
  // ==========================================
  console.log('Seeding Services...');
  // A. Services Workflow (accordion-solutions)
  const [srvProcRes] = await conn.execute(
    'INSERT INTO components_sections_accordion_solutions (heading, description) VALUES (?, ?)',
    ['Our End-to-End Research Workflow', 'Structured fieldwork processes, trained researchers, and robust quality checks.']
  );
  const srvProcId = srvProcRes.insertId;
  const srvSteps = [
    { title: 'Discover Your Objectives', desc: 'Every successful research project starts with a clear understanding of the business challenge.', icon: '/asstes/images/icon/understand-clipboard-tick-icon-img.png' },
    { title: 'Design the Research', desc: 'Once objectives are clear, we develop the right research framework around your business needs.', icon: '/asstes/images/icon/design-brush-ion-img.png' },
    { title: 'Collect Quality Data', desc: 'We use structured fieldwork processes, trained researchers and robust quality checks to collect accurate data.', icon: '/asstes/images/icon/research-presention-chart-icon-img.png' },
    { title: 'Analyze & Validate', desc: 'Once data is collected, we carefully analyze and validate the findings to identify meaningful patterns.', icon: '/asstes/images/icon/analyze-chart-icon-img.png' },
    { title: 'Deliver Strategic Impact', desc: 'Actionable executive insights prepared for board-level decision-making.', icon: '/asstes/images/icon/deliver-icon-img.png' }
  ];
  for (let i = 0; i < srvSteps.length; i++) {
    const fId = await insertFeatureItem(srvSteps[i].title, srvSteps[i].desc, srvSteps[i].icon);
    await conn.execute(
      'INSERT INTO components_sections_accordion_solutions_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [srvProcId, fId, 'elements.feature-item', 'cards', i + 1]
    );
  }

  // B. Why Choose Us (metrics-grid)
  const [srvWhyRes] = await conn.execute(
    'INSERT INTO components_sections_metrics_grids (kicker, heading, description) VALUES (?, ?, ?)',
    ['WHY CHOOSE US', 'Why Choose Unimrkt?', 'With 16+ years of expertise, global research capabilities, and trusted data quality.']
  );
  const srvWhyId = srvWhyRes.insertId;
  const srvWhy = [
    { number: '16+ Years', label: 'of Research Excellence' },
    { number: '90+ Countries', label: 'Covered Worldwide' },
    { number: '22+ Languages', label: 'Supported by Native Interviewers' },
    { number: '300+', label: 'Experienced Research Professionals' },
    { number: '100%', label: 'Customized Research Solutions' },
    { number: '99.5%', label: 'Accurate & Actionable Insights' }
  ];
  for (let i = 0; i < srvWhy.length; i++) {
    const mId = await insertMetricCard(srvWhy[i].number, srvWhy[i].label);
    await conn.execute(
      'INSERT INTO components_sections_metrics_grids_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [srvWhyId, mId, 'elements.metric-card', 'metrics', i + 1]
    );
  }
  await attachComponentToPages(['services'], srvProcId, 'sections.accordion-solutions', 20);
  await attachComponentToPages(['services'], srvWhyId, 'sections.metrics-grid', 21);

  // ==========================================
  // 4. INDUSTRIES WE SERVE
  // ==========================================
  console.log('Seeding Industries We Serve...');
  // A. Local Insight Global Reach (metrics-grid)
  const [indReachRes] = await conn.execute(
    'INSERT INTO components_sections_metrics_grids (kicker, heading, description) VALUES (?, ?, ?)',
    ['Beyond Industries', 'Local Insight. Global Reach.', 'Unimrkt delivers research across 90+ countries and 22+ languages, combining deep local understanding with a global perspective.']
  );
  const indReachId = indReachRes.insertId;
  const indReachStats = [
    { number: '90+', label: 'Countries Worldwide' },
    { number: '25+', label: 'Languages Supported' },
    { number: '4', label: 'Global Offices' },
    { number: 'Multi-Industry', label: 'Domain Expertise' }
  ];
  for (let i = 0; i < indReachStats.length; i++) {
    const mId = await insertMetricCard(indReachStats[i].number, indReachStats[i].label);
    await conn.execute(
      'INSERT INTO components_sections_metrics_grids_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [indReachId, mId, 'elements.metric-card', 'metrics', i + 1]
    );
  }

  // B. Business Outcomes (values-grid)
  const [indOutRes] = await conn.execute(
    'INSERT INTO components_sections_values_grids (kicker, heading, description) VALUES (?, ?, ?)',
    ['BUSINESS OUTCOMES', 'Research That Moves Businesses Forward', 'Empowering strategic business intelligence across all major industry verticals.']
  );
  const indOutId = indOutRes.insertId;
  const indOutcomes = [
    { title: 'Market Opportunity Identification', desc: 'Uncover untapped demand and address unmet customer pain points.' },
    { title: 'Competitive Advantage', desc: 'Benchmark against market leaders and refine competitive pricing models.' },
    { title: 'Product-Market Fit', desc: 'Validate concepts and feature roadmaps before high-cost launches.' },
    { title: 'Customer Experience Optimization', desc: 'Transform feedback loops into measurable retention gains.' },
    { title: 'Confident Strategic Decisions', desc: 'Back every boardroom decision with empirical, defensible data.' }
  ];
  for (let i = 0; i < indOutcomes.length; i++) {
    const fId = await insertFeatureItem(indOutcomes[i].title, indOutcomes[i].desc, '/asstes/images/icon/competitive-intelligence-icon-img2.png');
    await conn.execute(
      'INSERT INTO components_sections_values_grids_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [indOutId, fId, 'elements.feature-item', 'values', i + 1]
    );
  }

  // C. Partner Features (accordion-solutions)
  const [indPartRes] = await conn.execute(
    'INSERT INTO components_sections_accordion_solutions (heading, description) VALUES (?, ?)',
    ['Why Leading Global Brands Partner With Us', 'Deep sectoral understanding combined with rigorous data collection methodologies.']
  );
  const indPartId = indPartRes.insertId;
  const indPartner = [
    { title: 'Domain-Specialist Teams', desc: 'Dedicated research analysts and moderators who understand sector nuances.' },
    { title: 'Verified Respondent Panels', desc: 'Strict screening protocols guaranteeing authenticated B2B and consumer voices.' },
    { title: 'Rapid Fieldwork Mobilization', desc: 'Agile CATI and CAWI launch capabilities across multi-country studies.' },
    { title: 'Global Compliance Rigor', desc: 'Strict adherence to GDPR, ISO 20252, and ESOMAR market research codes.' },
    { title: 'Actionable Executive Deliverables', desc: 'Synthesized insights formatted for high-stakes leadership presentations.' },
    { title: 'Flexible Engagement Models', desc: 'From ad-hoc pulse checks to multi-year tracking programs.' }
  ];
  for (let i = 0; i < indPartner.length; i++) {
    const fId = await insertFeatureItem(indPartner[i].title, indPartner[i].desc, `0${i + 1}`);
    await conn.execute(
      'INSERT INTO components_sections_accordion_solutions_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [indPartId, fId, 'elements.feature-item', 'cards', i + 1]
    );
  }
  await attachComponentToPages(['industries'], indReachId, 'sections.metrics-grid', 20);
  await attachComponentToPages(['industries'], indOutId, 'sections.values-grid', 21);
  await attachComponentToPages(['industries'], indPartId, 'sections.accordion-solutions', 22);

  // ==========================================
  // 5. CONTACT US
  // ==========================================
  console.log('Seeding Contact Us...');
  const [cntProcRes] = await conn.execute(
    'INSERT INTO components_sections_accordion_solutions (heading, description) VALUES (?, ?)',
    ['Our Contact & Discovery Process', 'From initial question to delivered dataset with seamless collaboration.']
  );
  const cntProcId = cntProcRes.insertId;
  const cntSteps = [
    { title: 'Share Your Requirement', desc: 'Tell us about your business question, target audience, and research objective so we can align the right approach.' },
    { title: 'Discuss Your Objectives', desc: 'Our team connects with you to understand the context, challenges, and expected outcomes before recommending a path.' },
    { title: 'Define The Approach', desc: 'We recommend the appropriate methodology, timeline, and execution plan tailored to your decision-making needs.' },
    { title: 'Execution & Fieldwork', desc: 'We deploy robust multi-market methodology and targeted screening to capture high-integrity data.' },
    { title: 'Insight Delivery', desc: 'We deliver comprehensive reports, dashboards, and executive insights ready for strategic decision-making.' },
    { title: 'Strategic Impact', desc: 'We partner with your team to integrate data findings, guide strategic implementation, and track market evolution.' }
  ];
  for (let i = 0; i < cntSteps.length; i++) {
    const fId = await insertFeatureItem(cntSteps[i].title, cntSteps[i].desc, `0${i + 1}`);
    await conn.execute(
      'INSERT INTO components_sections_accordion_solutions_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [cntProcId, fId, 'elements.feature-item', 'cards', i + 1]
    );
  }
  await attachComponentToPages(['contact'], cntProcId, 'sections.accordion-solutions', 20);

  console.log('\nAll remaining page sections successfully seeded into MySQL unimrkt_strapi!');
  await conn.end();
}

main().catch(console.error);

const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  console.log('Connected to MySQL. Ensuring dynamic sections for all pages...');

  // Helper to attach component to a slug's page rows (published and draft)
  async function attachComponent(slug, cmpId, type, order) {
    const [pages] = await db.query('SELECT id FROM pages WHERE slug = ?', [slug]);
    for (const p of pages) {
      const [existing] = await db.query(
        'SELECT * FROM pages_cmps WHERE entity_id = ? AND cmp_id = ? AND component_type = ?',
        [p.id, cmpId, type]
      );
      if (existing.length === 0) {
        await db.query(
          'INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
          [p.id, cmpId, type, 'sections', order]
        );
        console.log(`Linked ${type} (cmp_id=${cmpId}) to page ${slug} (id=${p.id})`);
      }
    }
  }

  // 1. SERVICES PAGE: ServicesAboutOverview
  // Check if callout-box for "One Research Partner" exists
  const [sOverview] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%One Research Partner%"'
  );
  let sOverviewId;
  if (sOverview.length > 0) {
    sOverviewId = sOverview[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ?, title = ?, description = ? WHERE id = ?',
      [
        'About Our Services',
        'One Research Partner. Multiple Ways to Find the Answer.',
        'At Unimrkt Research, we believe meaningful research starts with understanding the question behind the business challenge. Our services bring together primary research, qualitative and quantitative methodologies, business research and specialized research support to help organizations gain a deeper understanding of their customers, markets and opportunities.',
        sOverviewId
      ]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'About Our Services',
        'One Research Partner. Multiple Ways to Find the Answer.',
        'At Unimrkt Research, we believe meaningful research starts with understanding the question behind the business challenge. Our services bring together primary research, qualitative and quantitative methodologies, business research and specialized research support to help organizations gain a deeper understanding of their customers, markets and opportunities.'
      ]
    );
    sOverviewId = ins.insertId;
  }
  await attachComponent('services', sOverviewId, 'sections.callout-box', 2);
  await attachComponent('industries', sOverviewId, 'sections.callout-box', 2);

  // 2. PRIMARY RESEARCH: AbouPrimaryOverview, PrimaryServices, IndustriesArea, ContactFormSection
  // AbouPrimaryOverview
  const [prOverview] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%First-Hand Insights That Power%"'
  );
  let prOverviewId;
  if (prOverview.length > 0) {
    prOverviewId = prOverview[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ?, title = ?, description = ? WHERE id = ?',
      [
        'About Primary Research',
        'First-Hand Insights That Power Better Business Decisions',
        'Primary research enables organizations to collect reliable information directly from customers, businesses, and stakeholders.',
        prOverviewId
      ]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'About Primary Research',
        'First-Hand Insights That Power Better Business Decisions',
        'Primary research enables organizations to collect reliable information directly from customers, businesses, and stakeholders.'
      ]
    );
    prOverviewId = ins.insertId;
  }
  await attachComponent('primary-research', prOverviewId, 'sections.callout-box', 2);

  // PrimaryServices accordion / grid
  const [prServices] = await db.query(
    'SELECT * FROM components_sections_accordion_solutions WHERE heading LIKE "%Our Primary Research Services%"'
  );
  let prServicesId;
  if (prServices.length > 0) {
    prServicesId = prServices[0].id;
    await db.query(
      'UPDATE components_sections_accordion_solutions SET kicker = ?, heading = ? WHERE id = ?',
      ['WHAT WE DO', 'Our Primary Research Services', prServicesId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_accordion_solutions (kicker, heading, description) VALUES (?, ?, ?)',
      [
        'WHAT WE DO',
        'Our Primary Research Services',
        'Tailored qualitative and quantitative methodologies designed to engage high-value respondents across international markets.'
      ]
    );
    prServicesId = ins.insertId;
  }
  await attachComponent('primary-research', prServicesId, 'sections.accordion-solutions', 3);

  // IndustriesArea (WHO WE SERVE)
  const [prIndArea] = await db.query(
    'SELECT * FROM components_sections_accordion_solutions WHERE heading LIKE "%Industries We Support%"'
  );
  let prIndAreaId;
  if (prIndArea.length > 0) {
    prIndAreaId = prIndArea[0].id;
    await db.query(
      'UPDATE components_sections_accordion_solutions SET kicker = ?, heading = ? WHERE id = ?',
      ['WHO WE SERVE', 'Industries We Support', prIndAreaId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_accordion_solutions (kicker, heading, description) VALUES (?, ?, ?)',
      [
        'WHO WE SERVE',
        'Industries We Support',
        'Delivering specialized primary research intelligence across high-growth, regulated, and critical global sectors.'
      ]
    );
    prIndAreaId = ins.insertId;
  }
  await attachComponent('primary-research', prIndAreaId, 'sections.accordion-solutions', 4);

  // 3. TELEPHONIC SURVEYS: TelephonicOverview, TelephonicCanMeasure, ResearchImpact, InsightsEditorial
  const [tsOverview] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%Direct Access To The Voices%"'
  );
  let tsOverviewId;
  if (tsOverview.length > 0) {
    tsOverviewId = tsOverview[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ?, title = ? WHERE id = ?',
      ['WHAT ARE TELEPHONIC SURVEYS?', 'Direct Access To The Voices That Matter', tsOverviewId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'WHAT ARE TELEPHONIC SURVEYS?',
        'Direct Access To The Voices That Matter',
        'Telephonic surveys provide a structured and efficient way to connect directly with respondents and capture their opinions, experiences, preferences and behaviours.'
      ]
    );
    tsOverviewId = ins.insertId;
  }
  await attachComponent('telephonic-surveys', tsOverviewId, 'sections.callout-box', 2);

  // TelephonicCanMeasure
  const [tsMeasure] = await db.query(
    'SELECT * FROM components_sections_accordion_solutions WHERE heading LIKE "%What Telephonic Surveys Can Measure%"'
  );
  let tsMeasureId;
  if (tsMeasure.length > 0) {
    tsMeasureId = tsMeasure[0].id;
    await db.query(
      'UPDATE components_sections_accordion_solutions SET kicker = ?, heading = ? WHERE id = ?',
      ['WHAT WE MEASURE', 'What Telephonic Surveys Can Measure', tsMeasureId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_accordion_solutions (kicker, heading, description) VALUES (?, ?, ?)',
      [
        'WHAT WE MEASURE',
        'What Telephonic Surveys Can Measure',
        'Capture granular nuances, sentiment shifts, and actionable operational metrics across target respondent groups.'
      ]
    );
    tsMeasureId = ins.insertId;
  }
  await attachComponent('telephonic-surveys', tsMeasureId, 'sections.accordion-solutions', 3);

  // 4. INDUSTRIES: IndustriesGrid, QuestionsToInsightsSection
  const [indGrid] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%Expertise Across Key Markets%"'
  );
  let indGridId;
  if (indGrid.length > 0) {
    indGridId = indGrid[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ?, title = ? WHERE id = ?',
      ['Industries We Serve', 'Expertise Across Key Markets', indGridId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'Industries We Serve',
        'Expertise Across Key Markets',
        'Unimrkt Research partners with organizations across diverse industries to address unique research requirements and deliver strategic insights.'
      ]
    );
    indGridId = ins.insertId;
  }
  await attachComponent('industries', indGridId, 'sections.callout-box', 3);

  // QuestionsToInsightsSection
  const [indQuestions] = await db.query(
    'SELECT * FROM components_sections_accordion_solutions WHERE heading LIKE "%From Key Questions to Strategic Insights%"'
  );
  let indQuestionsId;
  if (indQuestions.length > 0) {
    indQuestionsId = indQuestions[0].id;
    await db.query(
      'UPDATE components_sections_accordion_solutions SET kicker = ?, heading = ? WHERE id = ?',
      ['QUESTIONS WE HELP ANSWER', 'From Key Questions to Strategic Insights', indQuestionsId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_accordion_solutions (kicker, heading, description) VALUES (?, ?, ?)',
      [
        'QUESTIONS WE HELP ANSWER',
        'From Key Questions to Strategic Insights',
        'Navigating business uncertainty requires answers to critical questions. We help organizations across industries uncover the insights needed to make informed, forward-looking decisions.'
      ]
    );
    indQuestionsId = ins.insertId;
  }
  await attachComponent('industries', indQuestionsId, 'sections.accordion-solutions', 4);

  // 5. AUTOMOTIVES: AutomotiveAboutOverview, AutomotiveEmpowerCta
  const [autoOverview] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%Our Automotive Research Services%"'
  );
  let autoOverviewId;
  if (autoOverview.length > 0) {
    autoOverviewId = autoOverview[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ?, title = ? WHERE id = ?',
      ['What We Do', 'Our Automotive Research Services', autoOverviewId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'What We Do',
        'Our Automotive Research Services',
        'Unimrkt Research is a trusted automotive market research partner, delivering reliable data and actionable insights across the mobility ecosystem.'
      ]
    );
    autoOverviewId = ins.insertId;
  }
  await attachComponent('automotives', autoOverviewId, 'sections.callout-box', 2);

  const [autoEmpower] = await db.query(
    'SELECT * FROM components_sections_question_ctas WHERE title LIKE "%Empower Your Automotive Business%"'
  );
  let autoEmpowerId;
  if (autoEmpower.length > 0) {
    autoEmpowerId = autoEmpower[0].id;
    await db.query(
      'UPDATE components_sections_question_ctas SET kicker = ?, title = ? WHERE id = ?',
      ['Automotive Research', 'Empower Your Automotive Business with Unimrkt Research', autoEmpowerId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_question_ctas (kicker, title, description) VALUES (?, ?, ?)',
      [
        'Automotive Research',
        'Empower Your Automotive Business with Unimrkt Research',
        'Connect with our automotive industry researchers to explore how customized market research solutions can support your strategic growth.'
      ]
    );
    autoEmpowerId = ins.insertId;
  }
  await attachComponent('automotives', autoEmpowerId, 'sections.question-cta', 5);

  // 6. CASE STUDY DETAILS: CaseDetailChallenge, CaseDetailResearchQuestion
  const [csChallenge] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%Financial Expectations Were Changing Faster%"'
  );
  let csChallengeId;
  if (csChallenge.length > 0) {
    csChallengeId = csChallenge[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ?, title = ? WHERE id = ?',
      ['THE CHALLENGE', 'Financial Expectations Were Changing Faster Than Ever', csChallengeId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'THE CHALLENGE',
        'Financial Expectations Were Changing Faster Than Ever',
        'Traditional banking models faced unprecedented digital disruption requiring immediate quantitative customer validation.'
      ]
    );
    csChallengeId = ins.insertId;
  }
  await attachComponent('case-study-details', csChallengeId, 'sections.callout-box', 2);

  const [csRQ] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%Uncovering What Matters Most%" OR kicker LIKE "%THE RESEARCH QUESTION%"'
  );
  let csRQId;
  if (csRQ.length > 0) {
    csRQId = csRQ[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ?, title = ? WHERE id = ?',
      ['THE RESEARCH QUESTION', 'Uncovering What Matters Most to Decision Makers', csRQId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'THE RESEARCH QUESTION',
        'Uncovering What Matters Most to Decision Makers',
        'How do corporate banking clients evaluate automated treasury platforms versus bespoke relationship banking services?'
      ]
    );
    csRQId = ins.insertId;
  }
  await attachComponent('case-study-details', csRQId, 'sections.callout-box', 3);

  // 7. WORK / CAREERS: Disclaimer Beware of Fraud
  const [workFraud] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%Beware of Fraud%"'
  );
  let workFraudId;
  if (workFraud.length > 0) {
    workFraudId = workFraud[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ?, title = ? WHERE id = ?',
      ['IMPORTANT NOTICE', 'Disclaimer: Beware of Fraud', workFraudId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'IMPORTANT NOTICE',
        'Disclaimer: Beware of Fraud',
        'Unimrkt Research never solicits security deposits or processing fees from job applicants. Official recruitment correspondence is conducted only via verified @unimrkt.com email addresses.'
      ]
    );
    workFraudId = ins.insertId;
  }
  await attachComponent('work', workFraudId, 'sections.callout-box', 6);

  console.log('Finished seeding all dynamic sections in MySQL!');
  await db.end();
}

main().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});

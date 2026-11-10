const path = require('path');
const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  console.log('Connected to MySQL. Updating dynamic section headers...');

  // Helper to attach component to a slug's published & draft page rows
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

  // 1. UPDATE ROW 16 in accordion_solutions: "What Happens After You Contact Us?"
  await db.query(
    'UPDATE components_sections_accordion_solutions SET kicker = ?, heading = ?, description = ? WHERE id = 16',
    [
      'How it works',
      'What Happens After You Contact Us?',
      'A simple process designed to understand your requirement and connect you with the right research expert.'
    ]
  );
  console.log('Updated accordion_solutions id=16 with How it works');

  // Attach row 16 to case-study
  await attachComponent('case-study', 16, 'sections.accordion-solutions', 3);
  // Ensure attached to contact
  await attachComponent('contact', 16, 'sections.accordion-solutions', 4);

  // 2. CASE STUDY: Explorer & Value section headers in MySQL
  // Check if case-study has values-grid
  const [csValues] = await db.query(
    'SELECT * FROM components_sections_values_grids WHERE heading LIKE "%Every Case Study Starts%"'
  );
  let csValueId;
  if (csValues.length > 0) {
    csValueId = csValues[0].id;
    await db.query(
      'UPDATE components_sections_values_grids SET kicker = ?, heading = ? WHERE id = ?',
      ['Our Approach', 'Every Case Study Starts With the Right Question', csValueId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_values_grids (kicker, heading, description) VALUES (?, ?, ?)',
      ['Our Approach', 'Every Case Study Starts With the Right Question', 'Structured research journey starting from the core business question.']
    );
    csValueId = ins.insertId;
  }
  await attachComponent('case-study', csValueId, 'sections.values-grid', 2);

  // 3. ABOUT US: Narrative Overview section
  const [aboutCallout] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%Pioneering Precision Research%"'
  );
  let aboutCalloutId;
  if (aboutCallout.length > 0) {
    aboutCalloutId = aboutCallout[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ?, title = ?, description = ? WHERE id = ?',
      [
        'WHO WE ARE',
        'Pioneering Precision Research Since 2009',
        'Unimrkt Research is a global market research and intelligence firm empowering enterprises, consulting leaders, and agencies to make high-conviction decisions.'
      ]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'WHO WE ARE',
        'Pioneering Precision Research Since 2009',
        'Unimrkt Research is a global market research and intelligence firm empowering enterprises, consulting leaders, and agencies to make high-conviction decisions.'
      ]
    );
    aboutCalloutId = ins.insertId;
  }
  await attachComponent('about', aboutCalloutId, 'sections.callout-box', 2);

  // 4. SERVICES: End-To-End Market Research Solutions
  const [servAcc] = await db.query(
    'SELECT * FROM components_sections_accordion_solutions WHERE heading LIKE "%End-To-End Market Research%"'
  );
  let servAccId;
  if (servAcc.length > 0) {
    servAccId = servAcc[0].id;
    await db.query(
      'UPDATE components_sections_accordion_solutions SET kicker = ? WHERE id = ?',
      ['OUR SERVICES', servAccId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_accordion_solutions (kicker, heading, description) VALUES (?, ?, ?)',
      [
        'OUR SERVICES',
        'End-To-End Market Research Solutions',
        'From research design and respondent recruitment to data collection, analysis, and reporting, Unimrkt Research provides comprehensive market research solutions tailored to your business objectives.'
      ]
    );
    servAccId = ins.insertId;
  }
  await attachComponent('services', servAccId, 'sections.accordion-solutions', 2);

  // 5. PRIMARY RESEARCH: Overview & Services
  const [prOverview] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%First-Hand Insights That Power%"'
  );
  let prOverviewId;
  if (prOverview.length > 0) {
    prOverviewId = prOverview[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ?, title = ? WHERE id = ?',
      ['About Primary Research', 'First-Hand Insights That Power Better Business Decisions', prOverviewId]
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

  // 6. TELEPHONIC SURVEYS: Overview
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

  // 7. INDUSTRIES: Questions to Insights
  const [indQuestions] = await db.query(
    'SELECT * FROM components_sections_accordion_solutions WHERE heading LIKE "%From Key Questions to Strategic Insights%"'
  );
  let indQuestionsId;
  if (indQuestions.length > 0) {
    indQuestionsId = indQuestions[0].id;
    await db.query(
      'UPDATE components_sections_accordion_solutions SET kicker = ? WHERE id = ?',
      ['QUESTIONS WE HELP ANSWER', indQuestionsId]
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
  await attachComponent('industries', indQuestionsId, 'sections.accordion-solutions', 2);

  // 8. AUTOMOTIVES: Services Overview & Empower CTA
  const [autoOverview] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%Our Automotive Research Services%"'
  );
  let autoOverviewId;
  if (autoOverview.length > 0) {
    autoOverviewId = autoOverview[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ? WHERE id = ?',
      ['What We Do', autoOverviewId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'What We Do',
        'Our Automotive Research Services',
        'Unimrkt Research is a trusted automotive market research partner, delivering reliable data and actionable insights.'
      ]
    );
    autoOverviewId = ins.insertId;
  }
  await attachComponent('automotives', autoOverviewId, 'sections.callout-box', 2);

  // 9. BLOG: Grid Header
  const [blogCallout] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%Insights & Stories%"'
  );
  let blogCalloutId;
  if (blogCallout.length > 0) {
    blogCalloutId = blogCallout[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ? WHERE id = ?',
      ['OUR BLOG', blogCalloutId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'OUR BLOG',
        'Insights & Stories',
        'Explore in-depth articles, industry breakdowns, and forward-looking research perspectives.'
      ]
    );
    blogCalloutId = ins.insertId;
  }
  await attachComponent('blog', blogCalloutId, 'sections.callout-box', 2);

  // 10. WORK / CAREERS: Open Positions
  const [workCallout] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%Find Your Next Opportunity%"'
  );
  let workCalloutId;
  if (workCallout.length > 0) {
    workCalloutId = workCallout[0].id;
    await db.query(
      'UPDATE components_sections_callout_boxes SET kicker = ? WHERE id = ?',
      ['Open Positions', workCalloutId]
    );
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'Open Positions',
        'Find Your Next Opportunity',
        'Explore roles across different departments and take the next step in your career journey with Unimrkt.'
      ]
    );
    workCalloutId = ins.insertId;
  }
  await attachComponent('work', workCalloutId, 'sections.callout-box', 2);

  // 11. OUR COMPANY: About Unimrkt
  const [compRich] = await db.query(
    'SELECT * FROM components_sections_rich_text_blocks WHERE title LIKE "%We Turn Questions Into Clarity%"'
  );
  if (compRich.length > 0) {
    await db.query(
      'UPDATE components_sections_rich_text_blocks SET kicker = ? WHERE id = ?',
      ['About Unimrkt', compRich[0].id]
    );
    console.log('Updated our-company rich text block kicker to About Unimrkt');
  }

  // 12. TEAM: Directory Header
  const [teamCallout] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%People. Expertise. Impact.%"'
  );
  let teamCalloutId;
  if (teamCallout.length > 0) {
    teamCalloutId = teamCallout[0].id;
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'OUR LEADERSHIP',
        'People. Expertise. Impact.',
        'Meet the multidisciplinary research directors, methodologists, and industry specialists driving global intelligence.'
      ]
    );
    teamCalloutId = ins.insertId;
  }
  await attachComponent('team', teamCalloutId, 'sections.callout-box', 2);

  // 13. GALLERY: Gallery Header
  const [galleryCallout] = await db.query(
    'SELECT * FROM components_sections_callout_boxes WHERE title LIKE "%Our Gallery%"'
  );
  let galleryCalloutId;
  if (galleryCallout.length > 0) {
    galleryCalloutId = galleryCallout[0].id;
  } else {
    const [ins] = await db.query(
      'INSERT INTO components_sections_callout_boxes (kicker, title, description) VALUES (?, ?, ?)',
      [
        'MOMENTS & CULTURE',
        'Our Gallery',
        'A glimpse into our vibrant team culture, global celebrations, and milestone achievements.'
      ]
    );
    galleryCalloutId = ins.insertId;
  }
  await attachComponent('gallery', galleryCalloutId, 'sections.callout-box', 2);

  console.log('All dynamic section headers seeded and attached successfully in MySQL!');
  await db.end();
}

main().catch((err) => {
  console.error('Migration error:', err);
  process.exit(1);
});

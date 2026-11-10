const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  console.log('Connected to MySQL. Seeding rich case-study-details page sections...');

  async function insertFeatureItem(title, description, iconClass = null) {
    const [res] = await conn.execute(
      'INSERT INTO components_elements_feature_items (title, description, icon_class) VALUES (?, ?, ?)',
      [title, description, iconClass]
    );
    return res.insertId;
  }

  async function insertFaqItem(question, answer) {
    const [res] = await conn.execute(
      'INSERT INTO components_elements_faq_items (question, answer) VALUES (?, ?)',
      [question, answer]
    );
    return res.insertId;
  }

  // 1. Approach Steps as accordion-solutions
  const [approachRes] = await conn.execute(
    'INSERT INTO components_sections_accordion_solutions (heading, description) VALUES (?, ?)',
    ['Turning customer conversations into actionable intelligence', 'Unimrkt designed a structured research approach combining quantitative measurement with qualitative exploration to understand both what customers think and why they think it. This reflects Unimrkt\'s BFSI capabilities across surveys, CATI, interviews, focus groups, and other research methodologies.']
  );
  const approachId = approachRes.insertId;

  const approachSteps = [
    { title: '1. Define', desc: 'Established research objectives, customer segments and key business questions.', icon: '/asstes/images/icon/Define-icon-img.png' },
    { title: '2. Discover', desc: 'Conducted qualitative conversations to uncover motivations, pain points and unmet expectations.', icon: '/asstes/images/icon/discovery-icon-img.png' },
    { title: '3. Measure', desc: 'Used structured surveys to quantify customer preferences and identify meaningful patterns.', icon: '/asstes/images/icon/measure-icon-img.png' },
    { title: '4. Segment', desc: 'Compared responses across customer profiles, needs and behavioural characteristics.', icon: '/asstes/images/icon/segment-icon-img.png' },
    { title: '5. Analyse', desc: 'Identified the strongest drivers of consideration, satisfaction and loyalty.', icon: '/asstes/images/icon/analyse-icon-img.png' },
    { title: '6. Activate', desc: 'Translated findings into practical recommendations for customer experience and service strategy.', icon: '/asstes/images/icon/activate-icon-img.png' }
  ];

  for (let i = 0; i < approachSteps.length; i++) {
    const fId = await insertFeatureItem(approachSteps[i].title, approachSteps[i].desc, approachSteps[i].icon);
    await conn.execute(
      'INSERT INTO components_sections_accordion_solutions_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [approachId, fId, 'elements.feature-item', 'cards', i + 1]
    );
  }

  // 2. Impact Items as values-grid
  const [impactRes] = await conn.execute(
    'INSERT INTO components_sections_values_grids (kicker, heading, description) VALUES (?, ?, ?)',
    ['THE IMPACT', 'From Customer Understanding To Confident Decision-Making', 'The research provided the client with a clearer view of what customers value, what drives their financial decisions, and where their experiences fall short. These insights helped transform customer feedback into practical opportunities for improving products, experiences and future strategies.']
  );
  const impactId = impactRes.insertId;

  const impacts = [
    { title: 'Sharper Customer Understanding', desc: 'Deep visibility into evolving expectations and banking behaviours.' },
    { title: 'Identified Experience Gaps', desc: 'Spotlighted friction points across branch and digital banking workflows.' },
    { title: 'Stronger Customer Segmentation', desc: 'Persona-based segmentation models aligned with customer profitability.' },
    { title: 'More Relevant Product Strategy', desc: 'Feature prioritization based on quantified customer demand.' },
    { title: 'Confident, Data Driven Decisions', desc: 'Defensible roadmap execution supported by empirical user validation.' }
  ];

  for (let i = 0; i < impacts.length; i++) {
    const fId = await insertFeatureItem(impacts[i].title, impacts[i].desc, '/asstes/images/icon/identified-icon-img.png');
    await conn.execute(
      'INSERT INTO components_sections_values_grids_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [impactId, fId, 'elements.feature-item', 'values', i + 1]
    );
  }

  // 3. Case Detail FAQs
  const [faqRes] = await conn.execute(
    'INSERT INTO components_sections_faq_accordions (kicker, heading, description) VALUES (?, ?, ?)',
    ['CASE STUDY FAQS', 'Frequently Asked Questions', 'Common questions regarding Unimrkt case studies and project methodologies.']
  );
  const faqId = faqRes.insertId;

  const faqs = [
    { question: 'What can I learn from a Unimrkt case study?', answer: 'Unimrkt case studies provide insights into real-world research challenges, the methodologies used to address them, and the actionable insights delivered to support informed business decisions.' },
    { question: 'What types of research projects are featured in the case studies?', answer: 'Our case studies cover a variety of research projects, including B2B and consumer research, healthcare studies, qualitative interviews, quantitative surveys, and international market research.' },
    { question: 'How does Unimrkt approach a research challenge?', answer: "Unimrkt begins by understanding the client's objectives and target audience, then develops a tailored research strategy, selects suitable methodologies, and applies quality checks to deliver reliable, actionable insights." },
    { question: 'Can I find a case study relevant to my industry?', answer: 'Yes. Unimrkt works across industries, including B2B, consumer markets, and healthcare. You can explore relevant case studies to understand how research approaches can address challenges specific to your industry.' },
    { question: 'What research methodologies does Unimrkt use?', answer: 'Unimrkt uses methodologies such as CATI, CAWI, face-to-face interviews, in-depth interviews, focus groups, secondary desk research, panel recruitment, and custom data analytics, depending on the project requirements.' },
    { question: 'How do case studies demonstrate the impact of research?', answer: 'Case studies explain how research findings help businesses understand their markets, identify opportunities, evaluate customer needs, reduce uncertainty, and make data-driven strategic decisions.' },
    { question: 'Can Unimrkt conduct a similar research project for my business?', answer: 'Yes. Unimrkt can develop a customized research solution based on your business objectives, target audience, industry, geography, and budget. Contact our team to discuss your requirements and explore a suitable research approach.' }
  ];

  for (let i = 0; i < faqs.length; i++) {
    const fId = await insertFaqItem(faqs[i].question, faqs[i].answer);
    await conn.execute(
      'INSERT INTO components_sections_faq_accordions_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
      [faqId, fId, 'elements.faq-item', 'items', i + 1]
    );
  }

  // Attach components to case-study-details page rows (id: 19 and id: 83)
  const targetPageIds = [19, 83];
  for (const pid of targetPageIds) {
    const newCmps = [
      { cmp_id: approachId, type: 'sections.accordion-solutions', order: 10 },
      { cmp_id: impactId, type: 'sections.values-grid', order: 11 },
      { cmp_id: faqId, type: 'sections.faq-accordion', order: 12 }
    ];

    for (const c of newCmps) {
      await conn.execute(
        'INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, ?, ?, ?)',
        [pid, c.cmp_id, c.type, 'sections', c.order]
      );
    }
  }

  console.log('case-study-details sections successfully seeded into MySQL unimrkt_strapi!');
  await conn.end();
}

main().catch(console.error);

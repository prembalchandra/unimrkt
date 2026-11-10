const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  console.log('Connected to MySQL. Seeding rich blog and case study details...');

  // 1. UPDATE BLOG: "ai-and-the-workforce-in-transformation-disruption-opportunity"
  const blogContent = JSON.stringify([
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: 'In 2026, artificial intelligence is no longer just an emerging tool—it is fundamentally redefining workforce productivity, automated insights extraction, and enterprise operations across global industries. As organizations rapidly integrate machine intelligence into everyday workflows, business leaders face a dual reality: unprecedented operational efficiency paired with significant structural disruption.'
        }
      ]
    },
    {
      type: 'heading',
      level: 2,
      children: [
        {
          type: 'text',
          text: 'The Shifting Landscape of Automated Intelligence'
        }
      ]
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: 'Modern market research teams are adopting generative and predictive intelligence to analyze thousands of qualitative verbatims within seconds. However, human oversight, nuanced context, and rigorous validation remain indispensable. High-conviction decisions cannot rely purely on synthetic probabilities; they demand verified primary data collected directly from real market participants.'
        }
      ]
    },
    {
      type: 'heading',
      level: 3,
      children: [
        {
          type: 'text',
          text: 'Key Areas of Enterprise Transformation'
        }
      ]
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: '1. Accelerated Data Synthesis: Condensing vast market datasets into strategic executive summaries.\n2. Continuous Pulse Monitoring: Moving from static quarterly trackers to near real-time sentiment capture.\n3. Augmenting Human Researchers: Eliminating administrative fieldwork friction so analysts can focus on strategic synthesis.'
        }
      ]
    },
    {
      type: 'quote',
      children: [
        {
          type: 'text',
          text: '“The competitive advantage in modern intelligence does not belong to the algorithm alone, but to the organizations that marry algorithmic speed with audited human conviction.”'
        }
      ]
    },
    {
      type: 'heading',
      level: 2,
      children: [
        {
          type: 'text',
          text: 'Preparing Your Research Architecture for the Future'
        }
      ]
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: 'To capitalize on these transformations without compromising integrity, enterprises must establish clear governance protocols, mandate representative sampling across diverse demographic segments, and combine digital automated panels with verified telephonic and in-depth methodologies.'
        }
      ]
    }
  ]);

  await db.query(
    `UPDATE blogs SET
      title = ?,
      excerpt = ?,
      content = ?,
      tags = ?,
      author_name = ?,
      author_role = ?,
      read_time = ?,
      views_count = ?,
      published_date = ?,
      published_at = NOW()
    WHERE slug = ?`,
    [
      'AI and the Workforce in Transformation, Disruption & Opportunity',
      'How artificial intelligence is redefining enterprise workforce productivity, automated insights extraction, and future skills.',
      blogContent,
      'Artificial Intelligence, Workforce, Market Research, Automation, Future of Work',
      'Dr. Aris Thorne',
      'Head of Methodology & AI Insights',
      '8 min read',
      '4.2K views',
      '2026-10-14',
      'ai-and-the-workforce-in-transformation-disruption-opportunity'
    ]
  );
  console.log('Updated blog "ai-and-the-workforce-in-transformation-disruption-opportunity" in MySQL.');

  // 2. UPDATE CASE STUDY: "understanding-customer-expectations-financial-market"
  await db.query(
    `UPDATE case_studies SET
      client_name = ?,
      challenge_kicker = ?,
      challenge_title = ?,
      challenge_description = ?,
      challenge_subtitle = ?,
      challenge_summary = ?,
      research_question_kicker = ?,
      research_question_title = ?,
      research_question_description = ?,
      approach_eyebrow = ?,
      approach_title = ?,
      approach_description = ?,
      impact_kicker = ?,
      impact_title = ?,
      impact_description = ?,
      testimonial_quote = ?,
      testimonial_author = ?,
      testimonial_role = ?,
      published_at = NOW()
    WHERE slug = ?`,
    [
      'Global Tier-1 Commercial & Retail Banking Group',
      'THE CHALLENGE',
      'Financial Expectations Were Changing Faster Than Ever',
      'As financial services become increasingly digital, customers expect more than competitive products. They want simplicity, transparency, personalization, speed, and seamless experiences across every interaction.',
      'Our client needed to understand:',
      'The challenge was to move beyond basic satisfaction scores and uncover the real motivations behind customer expectations across 12 international territories.',
      'THE RESEARCH QUESTION',
      'What Do Customers Really Expect From Their Financial Providers?',
      'We explored the complete customer perspective — from awareness and consideration to selection, usage, and ongoing engagement.',
      'Our Approach',
      'Multi-Country Qualitative & Quantitative Fieldwork',
      'Unimrkt designed a comprehensive research journey combining 500+ CATI workstations, native language interviewers, and senior financial executive interviews.',
      'THE IMPACT',
      'Actionable Insights That Transformed Customer Strategy',
      'The intelligence enabled our client to redesign digital onboarding, restructure relationship management tiers, and launch targeted commercial features.',
      'Unimrkt brought strong research expertise, deep industry knowledge, and remarkable responsiveness to our multi-market study. Their insights directly strengthened our customer strategy.',
      'Director of Insights & Consumer Strategy',
      'Global Retail & Commercial Banking Group',
      'understanding-customer-expectations-financial-market'
    ]
  );
  console.log('Updated case study "understanding-customer-expectations-financial-market" in MySQL.');

  await db.end();
}

main().catch(console.error);

const mysql = require('mysql2/promise');
const crypto = require('crypto');

function genDocId() {
  return crypto.randomBytes(12).toString('hex');
}

async function runSeed() {
  console.log('Connecting to MySQL unimrkt_strapi...');
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  console.log('Connected! Beginning CMS data seeding...');

  // 1. Seed Testimonials
  const testimonials = [
    {
      title: 'Exceptional Research. Actionable Results.',
      quote: 'Unimrkt Research delivered comprehensive market intelligence that gave us a clear understanding of customer behavior and competitive trends. Their insights played a key role in shaping our strategic decisions.',
      author_name: 'David Anderson',
      author_role: 'Head of Market Strategy',
      company_name: 'Global Enterprise Group',
      rating: 5,
      order: 1
    },
    {
      title: 'A Trusted Extension of Our Team',
      quote: 'From research design to final reporting, the Unimrkt team demonstrated professionalism, accuracy, and deep industry expertise. Their commitment to quality made them a trusted research partner for our organization.',
      author_name: 'Jennifer Collins',
      author_role: 'Director – Customer Insights',
      company_name: 'Consumer Innovations',
      rating: 5,
      order: 2
    },
    {
      title: 'Insights That Drive Better Decisions',
      quote: 'The team provided high-quality data, meaningful analysis, and actionable recommendations that helped us confidently enter new markets. Their research exceeded our expectations at every stage.',
      author_name: 'Rajesh Mehta',
      author_role: 'Vice President – Business Intelligence',
      company_name: 'Financial Services Leader',
      rating: 5,
      order: 3
    },
    {
      title: 'Seamless Global Reach & Localization',
      quote: 'Reaching specialized commercial fleet operators across 6 European hubs seemed daunting until Unimrkt mobilized native-language interviewers within days.',
      author_name: 'Elena Rostova',
      author_role: 'Chief Strategy Officer',
      company_name: 'Mobility Systems Europe',
      rating: 5,
      order: 4
    },
    {
      title: 'High Precision Data Quality',
      quote: 'The audit trail, speeder checks, and call monitoring controls set Unimrkt apart from standard survey vendors. Every dataset is pristine and ready for decision-makers.',
      author_name: 'Michael Chen',
      author_role: 'VP Analytics',
      company_name: 'Global Fintech Solutions',
      rating: 5,
      order: 5
    },
    {
      title: 'Unrivaled Respondent Engagement',
      quote: 'Even when recruiting C-level executives for strategic technology audits, Unimrkt exceeded our quota targets with exceptional respondent engagement and depth.',
      author_name: 'Emily Watson',
      author_role: 'Partner',
      company_name: 'Global Strategy Consultancy',
      rating: 5,
      order: 6
    }
  ];

  for (const t of testimonials) {
    const [rows] = await conn.execute('SELECT id FROM testimonials WHERE title = ?', [t.title]);
    if (rows.length === 0) {
      await conn.execute(
        `INSERT INTO testimonials (document_id, title, quote, author_name, author_role, company_name, rating, \`order\`, created_at, updated_at, published_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
        [genDocId(), t.title, t.quote, t.author_name, t.author_role, t.company_name, t.rating, t.order]
      );
      console.log(`+ Seeded Testimonial: "${t.title}"`);
    } else {
      console.log(`= Testimonial exists: "${t.title}"`);
    }
  }

  // 2. Seed FAQs
  const faqs = [
    {
      category: 'General',
      question: 'What is Unimrkt Research and what services do you provide?',
      answer: 'Unimrkt Research is a global market research and data collection agency founded in 2009. We offer end-to-end qualitative and quantitative research services, CATI, online survey panels, healthcare studies, data analytics, and secondary market intelligence across 90+ countries.',
      order: 1
    },
    {
      category: 'General',
      question: 'Where are your offices and research centers located?',
      answer: 'Our primary operational headquarters and multilingual research facilities are based in Gurugram, India, supported by regional business offices in the United States and the United Kingdom. We operate 24/7 across multiple time zones.',
      order: 2
    },
    {
      category: 'General',
      question: 'What certifications and quality standards do you follow?',
      answer: 'Unimrkt Research follows ISO 20252:2019 and ISO 27001:2013 standards as specified for its research and information security practices. We adhere to applicable industry ethics and data privacy requirements.',
      order: 3
    },
    {
      category: 'Primary Research',
      question: 'What is the difference between primary and secondary research at Unimrkt?',
      answer: 'Primary research involves original, first-hand data collection directly from targeted audiences via phone interviews (CATI), web surveys, in-depth interviews (IDIs), and focus groups. Secondary research leverages verified publications, commercial databases, company filings, and statistical repositories to synthesize market landscapes and competitive benchmarking.',
      order: 4
    },
    {
      category: 'Primary Research',
      question: 'Can you reach niche B2B decision-makers and C-suite executives?',
      answer: 'Yes. Our specialized B2B recruitment teams have experience reaching high-value profiles such as CTOs, CFOs, hospital procurement directors, fleet managers, supply chain leaders, and cybersecurity experts across North America, Europe, APAC, and LATAM.',
      order: 5
    },
    {
      category: 'Primary Research',
      question: 'Do you offer questionnaire design and survey programming?',
      answer: 'Yes, we provide questionnaire design, logic routing, complex quotas, multilingual localization, and survey scripting across platforms like Decipher, Confirmit, Qualtrics, and programmed web instruments.',
      order: 6
    },
    {
      category: 'CATI & Telephonic',
      question: 'What is CATI and why should I choose it over web surveys?',
      answer: 'CATI stands for Computer-Assisted Telephone Interviewing. It is ideal when you need deeper probing, engagement from busy senior executives, real-time response validation, and access to segments where email contact lists have low deliverability.',
      order: 7
    },
    {
      category: 'CATI & Telephonic',
      question: 'How many CATI stations do you operate and in what languages?',
      answer: 'Our CATI operations support multilingual interviewing across English, German, French, Spanish, Italian, Japanese, Mandarin, Arabic, Portuguese, Hindi, and other regional languages. Confirm current station capacity and language availability with our team.',
      order: 8
    },
    {
      category: 'CATI & Telephonic',
      question: 'Are CATI calls recorded and monitored for quality assurance?',
      answer: 'Call recording and monitoring practices depend on project requirements, respondent consent, and applicable privacy laws. Quality assurance can include live monitoring, post-interview verification, and protocol compliance checks.',
      order: 9
    },
    {
      category: 'Panels & Sampling',
      question: 'How large is your global panel reach?',
      answer: 'We support research across 90+ countries, with access to consumer, B2B professional, healthcare, physician, and niche technology audiences. Feasibility depends on the target profile, geography, incidence rate, and sample requirements.',
      order: 10
    },
    {
      category: 'Panels & Sampling',
      question: 'How do you prevent fraudulent bots and duplicate respondents?',
      answer: 'Fraud prevention can include device and IP checks, CAPTCHA, attention checks, response-duration analysis, and duplicate detection to help identify suspicious or invalid responses.',
      order: 11
    },
    {
      category: 'Quality & Delivery',
      question: 'What deliverables do you provide at project completion?',
      answer: 'Deliverables can include clean datasets in SPSS, Excel, CSV, or ASCII formats, weighted tables, banner cross-tabs, PowerPoint executive summaries, verbatim transcripts, and interactive business intelligence dashboards, depending on the project scope.',
      order: 12
    },
    {
      category: 'Quality & Delivery',
      question: 'What is the typical turnaround time for a custom research project?',
      answer: 'Turnaround times depend on sample size, incidence rate, target audience, and geography. Standard B2B and consumer web surveys may take 3 to 7 business days, while complex multi-country CATI or executive qualitative studies may take 2 to 4 weeks or longer.',
      order: 13
    },
    {
      category: 'Quality & Delivery',
      question: 'How do I request a quote or RFP proposal?',
      answer: 'Submit your project requirements through our online Contact Form or email sales@unimrkt.com. Our team can assess feasibility, methodology, timelines, and pricing based on your project requirements.',
      order: 14
    }
  ];

  for (const f of faqs) {
    const [rows] = await conn.execute('SELECT id FROM faqs WHERE question = ?', [f.question]);
    if (rows.length === 0) {
      await conn.execute(
        `INSERT INTO faqs (document_id, question, answer, category, page_slug, \`order\`, created_at, updated_at, published_at)
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
        [genDocId(), f.question, f.answer, f.category, 'faq', f.order]
      );
      console.log(`+ Seeded FAQ: "${f.question.substring(0, 40)}..."`);
    } else {
      console.log(`= FAQ exists: "${f.question.substring(0, 40)}..."`);
    }
  }

  // 3. Seed Office Locations
  const offices = [
    {
      office_name: 'India Headquarters',
      country: 'India',
      address: '5th floor, Nirmal Tower, 412-415, Udyog Vihar, Phase IV, Gurugram, Haryana-122015, India',
      email: 'sales@unimrkt.com',
      phone_numbers: '+91 124 424 5210, +91 9870 377 557',
      is_headquarters: 1,
      order: 1,
      latitude: 28.4946,
      longitude: 77.088
    },
    {
      office_name: 'United States Regional Office',
      country: 'United States of America',
      address: '98 Cuthbert Road Suite 466, Great Neck, NY 11021, USA',
      email: 'sales@unimrkt.com',
      phone_numbers: '+1 646 712 9302',
      is_headquarters: 0,
      order: 2,
      latitude: 40.8007,
      longitude: -73.7285
    },
    {
      office_name: 'United Kingdom & Europe Office',
      country: 'United Kingdom',
      address: 'The Old Dairy, 12 Stephen Rd, Headington, Oxford, Oxfordshire, United Kingdom OX3 9AY',
      email: 'sales@unimrkt.com',
      phone_numbers: '+1 646 712 9302',
      is_headquarters: 0,
      order: 3,
      latitude: 51.7632,
      longitude: -1.2065
    }
  ];

  for (const o of offices) {
    const [rows] = await conn.execute('SELECT id FROM office_locations WHERE office_name = ?', [o.office_name]);
    if (rows.length === 0) {
      await conn.execute(
        `INSERT INTO office_locations (document_id, office_name, country, address, email, phone_numbers, is_headquarters, \`order\`, latitude, longitude, created_at, updated_at, published_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
        [genDocId(), o.office_name, o.country, o.address, o.email, o.phone_numbers, o.is_headquarters, o.order, o.latitude, o.longitude]
      );
      console.log(`+ Seeded Office: "${o.office_name}"`);
    } else {
      console.log(`= Office exists: "${o.office_name}"`);
    }
  }

  // 4. Seed all 19 Team Members
  const teamMembers = [
    {
      name: 'Anurag Magoo',
      role: 'Co-Founder',
      bio: 'Anurag Magoo is the Co-Founder of Unimrkt Research, with specializations in Key Account Management, Research Analysis, Strategy Planning & Execution, and Process Reengineering. He has over 26+ years of industry experience across global research operations and corporate development.',
      linkedin_url: 'https://www.linkedin.com/in/anurag-magoo-92261611/',
      order: 1
    },
    {
      name: 'Sandeep Kumar',
      role: 'Co-Founder & CEO',
      bio: 'Sandeep Kumar is the Co-Founder and Chief Executive Officer of Unimrkt Research. He leads organizational vision, global business expansion, strategic client partnerships, and cross-border research operational excellence across 90+ countries.',
      linkedin_url: 'https://www.linkedin.com/in/sandeep-kumar-1756598/',
      order: 2
    },
    {
      name: 'Kanishk Sheel',
      role: 'SVP - Business Development & Client Relations',
      bio: 'Kanishk Sheel serves as Senior Vice President of Business Development and Client Relations at Unimrkt Research. He drives strategic enterprise client relationships, global market penetration, and bespoke research consulting worldwide.',
      linkedin_url: 'https://www.linkedin.com/in/kanishk-sheel-6a849b22/',
      order: 3
    },
    {
      name: 'James Wild',
      role: 'Principal Consultant - North America',
      bio: 'James Wild is the Principal Consultant for North America at Unimrkt Research. He directs regional client engagements, market expansion, and custom quantitative and qualitative research initiatives across the United States and Canada.',
      linkedin_url: 'https://www.linkedin.com/in/james-wild-8b22a03/',
      order: 4
    },
    {
      name: 'Mann Sharma',
      role: 'Senior Director - Operations',
      bio: 'Mann Sharma is Senior Director of Operations at Unimrkt Research. He oversees comprehensive research fieldwork, quantitative methodologies, survey execution teams, and operational compliance to maintain world-class data delivery.',
      linkedin_url: 'https://www.linkedin.com/in/mann-sharma-51368916/',
      order: 5
    },
    {
      name: 'Veronika Sharma',
      role: 'Director - Client Services',
      bio: 'Veronika Sharma serves as Director of Client Services. She focuses on client delight, key account relationship management, research delivery coordination, and ensuring timely, high-impact business insights for global partners.',
      linkedin_url: 'https://www.linkedin.com/in/veronika-sharma-6a084052/',
      order: 6
    },
    {
      name: 'Alex Parkman',
      role: 'Director - Client Services',
      bio: 'Alex Parkman is Director of Client Services at Unimrkt Research. He specializes in multinational client solutions, project management, market research lifecycle delivery, and cross-functional team coordination.',
      linkedin_url: 'https://www.linkedin.com/in/alex-parkman-94269925/',
      order: 7
    },
    {
      name: 'Sanjay Kumar',
      role: 'AVP - IT, Telecom & Business Development',
      bio: 'Sanjay Kumar is Associate Vice President for IT, Telecom & Business Development. He drives technological transformation, secure infrastructure, survey tech automation, and telecom enterprise client solutions.',
      linkedin_url: 'https://www.linkedin.com/in/sanjay-kumar-65b1b424/',
      order: 8
    },
    {
      name: 'Rahul Maini',
      role: 'Senior Manager - Corporate Communication',
      bio: 'Rahul Maini is Senior Manager of Corporate Communication and Business Development. He leads brand positioning, international outreach, market engagement campaigns, and stakeholder communications.',
      linkedin_url: 'https://www.linkedin.com/in/rahul-maini-a1780468/',
      order: 9
    },
    {
      name: 'Chris Griswold',
      role: 'Senior Director - Business Development',
      bio: 'Chris Griswold is Senior Director of Business Development. With deep expertise in market intelligence and strategic advisory, he accelerates enterprise partnerships and research program adoption across North America and Europe.',
      linkedin_url: 'https://www.linkedin.com/in/chris-griswold-9860b714/',
      order: 10
    },
    {
      name: 'Ratan Singh Chauhan',
      role: 'Assistant Director - Field Operations',
      bio: 'Ratan Singh Chauhan is Assistant Director of Field Operations. He manages multi-country quantitative fieldwork, respondent sampling, interviewer team quality oversight, and on-ground data collection integrity.',
      linkedin_url: 'https://www.linkedin.com/in/ratan-singh-chauhan-691b0126/',
      order: 11
    },
    {
      name: 'Vishal Parashar',
      role: 'Head - Operations & Insights',
      bio: 'Vishal Parashar is Head of Operations & Insights. He is responsible for translating complex empirical data into actionable strategic findings, overseeing analytical rigor, and standardizing quality control frameworks.',
      linkedin_url: 'https://www.linkedin.com/in/vishal-parashar-04803730/',
      order: 12
    },
    {
      name: 'Narinder Vadhera',
      role: 'Associate Director - Data Quality',
      bio: 'Narinder Vadhera serves as Associate Director of Data Quality. With extensive experience in survey auditing and validation, he leads strict compliance protocols to ensure data accuracy across all research centers.',
      linkedin_url: 'https://www.linkedin.com/in/narinder-vadhera-1a73b53b/',
      order: 13
    },
    {
      name: 'Yashasvini Daulat Bhatt',
      role: 'Head - Data Quality and Training',
      bio: 'Yashasvini Daulat Bhatt is Head of Data Quality and Training. She designs interviewer training curricula, respondent validation frameworks, and quality control systems aligned with ISO 20252 and ISO 9001 standards.',
      linkedin_url: 'https://www.linkedin.com/in/yashasvini-daulat-bhatt-04838612/',
      order: 14
    },
    {
      name: 'Sushmaunt Singh',
      role: 'Director - Field Operations',
      bio: 'Sushmaunt Singh is Director of Field Operations at Unimrkt Research. He leads nationwide CATI operations, interviewer productivity, complex sampling designs, and multi-market project execution.',
      linkedin_url: 'https://www.linkedin.com/in/sushmaunt-singh-93b70823/',
      order: 15
    },
    {
      name: 'Geetha Chauhan',
      role: 'Lead - Operations',
      bio: 'Geetha Chauhan is Lead of Operations at Unimrkt Research, specializing in operational workflows, interviewer resource scheduling, quality auditing, and cross-departmental project tracking.',
      linkedin_url: 'https://www.linkedin.com/in/geetha-chauhan-b5145b41/',
      order: 16
    },
    {
      name: 'Ghol Bishi',
      role: 'Director - Business Development',
      bio: 'Ghol Bishi is Director of Business Development, focusing on identifying emerging market opportunities, client relationship management, and customized market intelligence consulting across key sectors.',
      linkedin_url: 'https://www.linkedin.com/in/ghol-bishi-24a9193b/',
      order: 17
    },
    {
      name: 'Ritu Verma',
      role: 'Manager - Team Building',
      bio: 'Ritu Verma serves as Manager of Team Building and Human Resources, fostering organizational culture, specialized research talent acquisition, leadership development, and employee excellence.',
      linkedin_url: 'https://www.linkedin.com/in/ritu-verma-9a647318/',
      order: 18
    },
    {
      name: 'Krystal Richardson',
      role: 'Manager - Business Development',
      bio: 'Krystal Richardson is Manager of Business Development, spearheading international client onboarding, client discovery sessions, and tailored research proposals for global enterprise brands.',
      linkedin_url: 'https://www.linkedin.com/in/krystal-richardson-35359a43/',
      order: 19
    }
  ];

  for (const m of teamMembers) {
    const [rows] = await conn.execute('SELECT id FROM team_members WHERE name = ?', [m.name]);
    if (rows.length === 0) {
      await conn.execute(
        `INSERT INTO team_members (document_id, name, role, bio, linkedin_url, \`order\`, created_at, updated_at, published_at)
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
        [genDocId(), m.name, m.role, m.bio, m.linkedin_url, m.order]
      );
      console.log(`+ Seeded Team Member: "${m.name}" (${m.role})`);
    } else {
      console.log(`= Team Member exists: "${m.name}"`);
    }
  }

  console.log('\nAll core collections seeded successfully!');
  await conn.end();
}

runSeed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});

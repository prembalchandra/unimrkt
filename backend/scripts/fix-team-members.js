const mysql = require('mysql2/promise');

const teamData = [
  {
    name: 'Anurag Magoo',
    role: 'Co-Founder',
    image: '/asstes/images/team/anurag-magoo.png',
    bio: 'Anurag Magoo is the Co-Founder of Unimrkt Research, with specializations in Key Account Management, Research Analysis, Strategy Planning & Execution, and Process Reengineering. He has over 26+ years of industry experience across global research operations and corporate development.',
    linkedin: 'https://www.linkedin.com/in/anurag-magoo-92261611/',
    order: 1
  },
  {
    name: 'Sandeep Kumar',
    role: 'Co-Founder',
    image: '/asstes/images/team/sandeep-kumar.png',
    bio: 'Sandeep Kumar is the Co-Founder and Chief Executive Officer of Unimrkt Research. He leads organizational vision, global business expansion, strategic client partnerships, and cross-border research operational excellence across 90+ countries.',
    linkedin: 'https://www.linkedin.com/in/sandeep-kumar-1756598/',
    order: 2
  },
  {
    name: 'Kanishk Sheel',
    role: 'SVP - Business Development & Client Relations',
    image: '/asstes/images/team/kanishk-sheel.png',
    bio: 'Kanishk Sheel serves as Senior Vice President of Business Development and Client Relations at Unimrkt Research. He drives strategic enterprise client relationships, global market penetration, and bespoke research consulting worldwide.',
    linkedin: 'https://www.linkedin.com/in/kanishk-sheel-6a849b22/',
    order: 3
  },
  {
    name: 'James Wild',
    role: 'Principal Consultant - North America',
    image: '/asstes/images/team/james-wild.png',
    bio: 'James Wild is the Principal Consultant for North America at Unimrkt Research. He directs regional client engagements, market expansion, and custom quantitative and qualitative research initiatives across the United States and Canada.',
    linkedin: 'https://www.linkedin.com/in/james-wild-8b22a03/',
    order: 4
  },
  {
    name: 'Mann Sharma',
    role: 'Senior Director - Operations',
    image: '/asstes/images/team/mann-sharma.png',
    bio: 'Mann Sharma is Senior Director of Operations at Unimrkt Research. He oversees comprehensive research fieldwork, quantitative methodologies, survey execution teams, and operational compliance to maintain world-class data delivery.',
    linkedin: 'https://www.linkedin.com/in/mann-sharma-51368916/',
    order: 5
  },
  {
    name: 'Veronika Sharma',
    role: 'Director - Client Services',
    image: '/asstes/images/team/veronika-sharma.png',
    bio: 'Veronika Sharma serves as Director of Client Services. She focuses on client delight, key account relationship management, research delivery coordination, and ensuring timely, high-impact business insights for global partners.',
    linkedin: 'https://www.linkedin.com/in/veronika-sharma-6a084052/',
    order: 6
  },
  {
    name: 'Alex Parkman',
    role: 'Director - Client Services',
    image: '/asstes/images/team/alex-parkman.png',
    bio: 'Alex Parkman is Director of Client Services at Unimrkt Research. He specializes in multinational client solutions, project management, market research lifecycle delivery, and cross-functional team coordination.',
    linkedin: 'https://www.linkedin.com/in/alex-parkman-94269925/',
    order: 7
  },
  {
    name: 'Sanjay Kumar',
    role: 'AVP - IT, Telecom & Business Development',
    image: '/asstes/images/team/sanjay-kumar.png',
    bio: 'Sanjay Kumar is Associate Vice President for IT, Telecom & Business Development. He drives technological transformation, secure infrastructure, survey tech automation, and telecom enterprise client solutions.',
    linkedin: 'https://www.linkedin.com/in/sanjay-kumar-65b1b424/',
    order: 8
  },
  {
    name: 'Rahul Maini',
    role: 'Senior Manager - Corporate Communication',
    image: '/asstes/images/team/rahul-maini.png',
    bio: 'Rahul Maini is Senior Manager of Corporate Communication and Business Development. He leads brand positioning, international outreach, market engagement campaigns, and stakeholder communications.',
    linkedin: 'https://www.linkedin.com/in/rahul-maini-a1780468/',
    order: 9
  },
  {
    name: 'Chris Griswold',
    role: 'Senior Director - Business Development',
    image: '/asstes/images/team/chris-griswold.png',
    bio: 'Chris Griswold is Senior Director of Business Development. With deep expertise in market intelligence and strategic advisory, he accelerates enterprise partnerships and research program adoption across North America and Europe.',
    linkedin: 'https://www.linkedin.com/in/chris-griswold-9860b714/',
    order: 10
  },
  {
    name: 'Ratan Singh Chauhan',
    role: 'Assistant Director - Field Operations',
    image: '/asstes/images/team/ratan-singh-chauhan.png',
    bio: 'Ratan Singh Chauhan is Assistant Director of Field Operations. He manages multi-country quantitative fieldwork, respondent sampling, interviewer team quality oversight, and on-ground data collection integrity.',
    linkedin: 'https://www.linkedin.com/in/ratan-singh-chauhan-691b0126/',
    order: 11
  },
  {
    name: 'Vishal Parashar',
    role: 'Head - Operations & Insights',
    image: '/asstes/images/team/vishal-parashar.png',
    bio: 'Vishal Parashar is Head of Operations & Insights. He is responsible for translating complex empirical data into actionable strategic findings, overseeing analytical rigor, and standardizing quality control frameworks.',
    linkedin: 'https://www.linkedin.com/in/vishal-parashar-04803730/',
    order: 12
  },
  {
    name: 'Narinder Vadhera',
    role: 'Associate Director - Data Quality',
    image: '/asstes/images/team/narinder-vadhera.png',
    bio: 'Narinder Vadhera serves as Associate Director of Data Quality. With extensive experience in survey auditing and validation, he leads strict compliance protocols to ensure data accuracy across all research centers.',
    linkedin: 'https://www.linkedin.com/in/narinder-vadhera-1a73b53b/',
    order: 13
  },
  {
    name: 'Yashasvini Daulat Bhatt',
    role: 'Head - Data Quality and Training',
    image: '/asstes/images/team/yashasvini-daulat-bhatt.png',
    bio: 'Yashasvini Daulat Bhatt is Head of Data Quality and Training. She designs interviewer training curricula, respondent validation frameworks, and quality control systems aligned with ISO 20252 and ISO 9001 standards.',
    linkedin: 'https://www.linkedin.com/in/yashasvini-daulat-bhatt-04838612/',
    order: 14
  },
  {
    name: 'Sushmaunt Singh',
    role: 'Director - Field Operations',
    image: '/asstes/images/team/sushmaunt-singh.png',
    bio: 'Sushmaunt Singh is Director of Field Operations at Unimrkt Research. He leads nationwide CATI operations, interviewer productivity, complex sampling designs, and multi-market project execution.',
    linkedin: 'https://www.linkedin.com/in/sushmaunt-singh-93b70823/',
    order: 15
  },
  {
    name: 'Geetha Chauhan',
    role: 'Lead - Operations',
    image: '/asstes/images/team/geetha-chauhan.png',
    bio: 'Geetha Chauhan is Lead of Operations at Unimrkt Research, specializing in operational workflows, interviewer resource scheduling, quality auditing, and cross-departmental project tracking.',
    linkedin: 'https://www.linkedin.com/in/geetha-chauhan-b5145b41/',
    order: 16
  },
  {
    name: 'Ghol Bishi',
    role: 'Director - Business Development',
    image: '/asstes/images/team/ghol-bishi.png',
    bio: 'Ghol Bishi is Director of Business Development, focusing on identifying emerging market opportunities, client relationship management, and customized market intelligence consulting across key sectors.',
    linkedin: 'https://www.linkedin.com/in/ghol-bishi-24a9193b/',
    order: 17
  },
  {
    name: 'Ritu Verma',
    role: 'Manager - Team Building',
    image: '/asstes/images/team/ritu-verma.png',
    bio: 'Ritu Verma serves as Manager of Team Building and Human Resources, fostering organizational culture, specialized research talent acquisition, leadership development, and employee excellence.',
    linkedin: 'https://www.linkedin.com/in/ritu-verma-9a647318/',
    order: 18
  },
  {
    name: 'Krystal Richardson',
    role: 'Manager - Business Development',
    image: '/asstes/images/team/krystal-richardson.png',
    bio: 'Krystal Richardson is Manager of Business Development, spearheading international client onboarding, client discovery sessions, and tailored research proposals for global enterprise brands.',
    linkedin: 'https://www.linkedin.com/in/krystal-richardson-35359a43/',
    order: 19
  }
];

async function run() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    database: 'unimrkt_strapi'
  });

  console.log('Connected to MySQL. Updating team members...');

  for (const item of teamData) {
    const [existing] = await conn.query('SELECT id, document_id FROM team_members WHERE name = ?', [item.name]);
    if (existing.length > 0) {
      await conn.query(
        'UPDATE team_members SET role = ?, bio = ?, linkedin_url = ?, `order` = ? WHERE name = ?',
        [item.role, item.bio, item.linkedin, item.order, item.name]
      );
      console.log(`Updated: ${item.name} -> ${item.role}`);
    } else {
      const docId = Math.random().toString(36).substring(2, 14) + Math.random().toString(36).substring(2, 14);
      await conn.query(
        'INSERT INTO team_members (document_id, name, role, bio, linkedin_url, `order`, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())',
        [docId, item.name, item.role, item.bio, item.linkedin, item.order]
      );
      console.log(`Inserted: ${item.name}`);
    }
  }

  await conn.end();
  console.log('Team members successfully updated in MySQL!');
}

run().catch(console.error);

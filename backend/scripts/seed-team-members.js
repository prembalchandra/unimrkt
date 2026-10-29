const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

function genDocId() {
  return crypto.randomBytes(12).toString('hex');
}

const db = new Database(path.join(__dirname, '../.tmp/data.db'));
const now = new Date().toISOString();

const teamData = [
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
    name: 'Vikas Sharma',
    role: 'Director - Human Resources',
    bio: 'Vikas Sharma leads the global Human Resources division at Unimrkt Research. He is responsible for talent acquisition, culture, executive coaching, organizational development, and continuous training across all research centers.',
    linkedin_url: 'https://www.linkedin.com/in/vikas-sharma-3b3b3a27/',
    order: 8
  },
  {
    name: 'Divya Aggarwal',
    role: 'Associate Director - Client Services',
    bio: 'Divya Aggarwal manages key accounts and client satisfaction initiatives across Europe, APAC, and the Americas, ensuring seamless fieldwork communication and rapid response delivery.',
    linkedin_url: 'https://www.linkedin.com/in/divya-aggarwal-25867119/',
    order: 9
  },
  {
    name: 'Shankar Jha',
    role: 'Head - IT & Infrastructure',
    bio: 'Shankar Jha leads corporate IT infrastructure, cyber-security governance, ISO 27001 compliance, and cloud computing operations supporting Unimrkt\'s worldwide telephone and digital survey operations.',
    linkedin_url: 'https://www.linkedin.com/in/shankar-jha-a0b22416/',
    order: 10
  }
];

// Clear existing and re-seed
db.prepare("DELETE FROM team_members").run();

const insertStmt = db.prepare(`
  INSERT INTO team_members (document_id, name, role, bio, linkedin_url, "order", created_at, updated_at, published_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const m of teamData) {
  const docId = genDocId();
  insertStmt.run(docId, m.name, m.role, m.bio, m.linkedin_url, m.order, now, now, now);
}

console.log(`✓ Seeded ${teamData.length} Team Members into team_members table in Strapi!`);

const mysql = require('mysql2/promise');

function buildBlocks({ jobDescription, responsibilities, qualifications }) {
  const blocks = [
    {
      type: 'heading',
      level: 4,
      children: [{ type: 'text', text: 'Job Description' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', text: jobDescription }],
    },
    {
      type: 'heading',
      level: 4,
      children: [{ type: 'text', text: 'Key Responsibilities' }],
    },
    {
      type: 'list',
      format: 'unordered',
      children: responsibilities.map((item) => ({
        type: 'list-item',
        children: [{ type: 'text', text: item }],
      })),
    },
    {
      type: 'heading',
      level: 4,
      children: [{ type: 'text', text: 'Qualifications' }],
    },
    {
      type: 'list',
      format: 'unordered',
      children: qualifications.map((item) => ({
        type: 'list-item',
        children: [{ type: 'text', text: item }],
      })),
    },
  ];

  return JSON.stringify(blocks);
}

const jobDataMap = {
  'Associate - Primary Research': {
    jobDescription:
      'Support research execution, quality audits, data processing, and client engagement workflows across multi-country studies.',
    responsibilities: [
      'Execute quantitative and qualitative research methodologies within designated timelines.',
      'Ensure high accuracy and strict adherence to ISO 20252 and global compliance standards.',
      'Coordinate cross-functional tasks with project managers and field teams.',
    ],
    qualifications: [
      "Bachelor's or Master's degree in a relevant discipline.",
      'Strong analytical, communication, and problem-solving skills.',
    ],
  },
  'Executive - Language & Communication': {
    jobDescription:
      'Lead cross-border communication, executive stakeholder interviews, and multi-lingual fieldwork coordination across global target markets.',
    responsibilities: [
      'Conduct structured in-depth interviews and CATI surveys with international business respondents.',
      'Ensure clear, culturally nuanced communication adhering to ISO 20252 standards.',
      'Collaborate with research project managers to deliver daily fieldwork milestones.',
    ],
    qualifications: [
      "Bachelor's degree in English, Communication, Linguistics, or related disciplines.",
      'Flawless verbal and written business communication in English; additional language is a plus.',
    ],
  },
  'Quality Analyst - Audio Auditing': {
    jobDescription:
      'Oversee rigorous quality audits, telephone interview compliance, and transcription accuracy across worldwide market research studies.',
    responsibilities: [
      'Audit live and recorded telephone interviews against questionnaire protocols and compliance standards.',
      'Identify discrepancies, interview bias, and provide coaching feedback to field interviewers.',
      'Maintain quality scoring logs and prepare audit reports for research practice leads.',
    ],
    qualifications: [
      "Bachelor's degree in any discipline with prior experience in quality monitoring or auditing.",
      'Strong listening, objective analytical evaluation, and documentation skills.',
    ],
  },
  'Data Analyst - SPSS & R': {
    jobDescription:
      'Manage quantitative dataset cleaning, weighting schemes, cross-tabulations, and advanced statistical modeling for strategic research reports.',
    responsibilities: [
      'Process, clean, and validate survey datasets using SPSS, R, and statistical tools.',
      'Execute cross-tabulations, significance testing, segmentation models, and driver analyses.',
      'Prepare clear data tables and charts for presentation to enterprise clients.',
    ],
    qualifications: [
      "Bachelor's or Master's degree in Statistics, Mathematics, Economics, or Data Science.",
      'Proficiency in SPSS, R, Python, and advanced Excel analytical functions.',
    ],
  },
};

async function seed() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  console.log('Connected to MySQL database unimrkt_strapi');

  const [jobs] = await db.query('SELECT id, title FROM career_jobs');
  console.log(`Found ${jobs.length} career jobs to update.`);

  for (const job of jobs) {
    const data = jobDataMap[job.title] || jobDataMap['Associate - Primary Research'];
    const blocksJson = buildBlocks(data);

    await db.query('UPDATE career_jobs SET description = ? WHERE id = ?', [blocksJson, job.id]);
    console.log(`Updated job #${job.id} [${job.title}] with rich blocks description.`);
  }

  await db.end();
  console.log('Successfully updated all career_jobs in MySQL!');
}

seed().catch(console.error);

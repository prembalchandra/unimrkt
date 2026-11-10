const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [jobs] = await db.query('SELECT * FROM career_jobs');
  console.log(`Found ${jobs.length} career jobs:`);
  jobs.forEach(j => {
    console.log(`- ID: ${j.id}, Title: "${j.title}", Dept: "${j.department}", Location: "${j.location}", Description:`, typeof j.description, j.description ? j.description.slice(0, 100) : null);
  });

  await db.end();
}

main().catch(console.error);

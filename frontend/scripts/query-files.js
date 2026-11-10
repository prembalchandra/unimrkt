const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const pattern = process.argv[2] || '';
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [rows] = await db.query('SELECT id, name, url FROM files WHERE name LIKE ? LIMIT 20', [`%${pattern}%`]);
  console.log(`Matching files for "${pattern}":`, rows);

  await db.end();
}

main().catch(console.error);

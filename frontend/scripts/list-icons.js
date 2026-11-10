const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [rows] = await db.query('SELECT id, name, url FROM files WHERE name LIKE "%icon%" ORDER BY id');
  console.log(`Found ${rows.length} icon files:`);
  rows.slice(0, 30).forEach(r => console.log(`${r.id}: ${r.name} -> ${r.url}`));

  await db.end();
}

main().catch(console.error);

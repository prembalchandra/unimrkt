const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [tables] = await db.query('SHOW TABLES LIKE "%office%"');
  console.log('Office tables:', tables.map(t => Object.values(t)[0]));

  for (const t of tables.map(t => Object.values(t)[0])) {
    const [rows] = await db.query(`SELECT * FROM \`${t}\``);
    console.log(`Table ${t}:`, rows);
  }

  await db.end();
}

main().catch(console.error);

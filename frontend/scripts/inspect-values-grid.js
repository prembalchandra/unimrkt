const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [cols] = await db.query('SHOW TABLES LIKE "%value%"');
  console.log('Value tables:', cols.map(t => Object.values(t)[0]));

  for (const t of cols.map(t => Object.values(t)[0])) {
    const [c] = await db.query(`DESCRIBE \`${t}\``);
    console.log(`Table ${t} columns:`, c.map(col => col.Field));
    const [sample] = await db.query(`SELECT * FROM \`${t}\` LIMIT 3`);
    console.log(`Sample from ${t}:`, sample);
  }

  await db.end();
}

main().catch(console.error);

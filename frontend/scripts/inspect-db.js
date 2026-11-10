const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [tables] = await conn.execute("SHOW TABLES LIKE '%page%'");
  console.log('Page tables:', tables.map(t => Object.values(t)[0]));

  const [compTables] = await conn.execute("SHOW TABLES LIKE 'components_%'");
  console.log('Component tables:', compTables.map(t => Object.values(t)[0]));

  await conn.end();
}

main().catch(console.error);

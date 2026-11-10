const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  const [files] = await db.query(
    "SELECT id, name, url FROM files WHERE name LIKE '%office%'"
  );
  console.log('Office files:', files);

  await db.end();
}

check().catch(console.error);

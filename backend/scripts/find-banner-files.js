const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  const [workFiles] = await db.query(
    "SELECT id, name, url FROM files WHERE name LIKE '%work%' OR name LIKE '%career%'"
  );
  console.log('Work / Career files:', workFiles);

  const [contactFiles] = await db.query(
    "SELECT id, name, url FROM files WHERE name LIKE '%contact%'"
  );
  console.log('Contact files:', contactFiles);

  await db.end();
}

check().catch(console.error);

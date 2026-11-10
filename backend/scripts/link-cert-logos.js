const mysql = require('mysql2/promise');

async function link() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  await db.query(
    "INSERT INTO files_related_mph (file_id, related_id, related_type, field, `order`) VALUES (?, 1, 'api::global.global', 'footerCertificationLogos', ?)",
    [170, 1]
  );
  await db.query(
    "INSERT INTO files_related_mph (file_id, related_id, related_type, field, `order`) VALUES (?, 1, 'api::global.global', 'footerCertificationLogos', ?)",
    [171, 2]
  );

  console.log('Successfully linked certification logos to global in MySQL!');
  await db.end();
}

link().catch(console.error);

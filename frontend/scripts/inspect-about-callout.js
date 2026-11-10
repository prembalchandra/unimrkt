const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [rows] = await db.query('SELECT * FROM components_sections_callout_boxes WHERE id = 6');
  console.log('Callout box 6:', rows[0]);

  const [mph] = await db.query('SELECT * FROM files_related_mph WHERE related_type LIKE "%callout%" AND related_id = 6');
  console.log('Media for callout 6:', mph);

  await db.end();
}

main().catch(console.error);

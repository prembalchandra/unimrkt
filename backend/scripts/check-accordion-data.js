const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  const [rows] = await db.query('SELECT * FROM components_sections_accordion_solutions LIMIT 5');
  console.log('Accordion solutions in MySQL:', rows);

  const [cards] = await db.query('SELECT count(*) as count FROM components_elements_feature_items');
  console.log('Feature items count in MySQL:', cards[0].count);

  await db.end();
}

check().catch(console.error);

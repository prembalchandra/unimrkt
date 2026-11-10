const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  const [rows] = await db.query(
    'SELECT c.* FROM components_sections_callout_boxes c JOIN pages_cmps p ON p.entity_id = 93 AND p.component_type = "sections.callout-box" AND p.field = "sections"'
  );
  console.log('Callout box on Home page:', rows);

  await db.end();
}

check().catch(console.error);

const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  const [cmps] = await db.query(
    'SELECT entity_id, component_type, field, `order` FROM pages_cmps WHERE entity_id = 93 ORDER BY `order`'
  );
  console.log('Home sections in pages_cmps:');
  console.table(cmps);

  await db.end();
}

check().catch(console.error);

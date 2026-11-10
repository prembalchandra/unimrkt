const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function inspectPub() {
  const db = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'unimrkt_strapi' });
  const [cmps13] = await db.query('SELECT * FROM pages_cmps WHERE entity_id = 13 ORDER BY `order`, id');
  const [cmps80] = await db.query('SELECT * FROM pages_cmps WHERE entity_id = 80 ORDER BY `order`, id');

  console.log('--- Draft (entity_id = 13) cmps ---');
  for (const c of cmps13) {
    console.log(`order: ${c.order}, type: ${c.component_type}, cmp_id: ${c.cmp_id}`);
  }

  console.log('\n--- Published (entity_id = 80) cmps ---');
  for (const c of cmps80) {
    console.log(`order: ${c.order}, type: ${c.component_type}, cmp_id: ${c.cmp_id}`);
  }

  await db.end();
}

inspectPub().catch(console.error);

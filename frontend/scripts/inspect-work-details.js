const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [cmps] = await db.query(
    'SELECT * FROM pages_cmps WHERE entity_id = 95 ORDER BY `order`'
  );
  console.log(`Work page has ${cmps.length} components:`);
  for (const c of cmps) {
    const tableName = `components_${c.component_type.replace('.', '_').replace(/-/g, '_')}`;
    try {
      const [data] = await db.query(`SELECT * FROM \`${tableName}\` WHERE id = ?`, [c.cmp_id]);
      console.log(`- [${c.field}] ${c.component_type} (cmp_id=${c.cmp_id}):`, data[0]);
    } catch (e) {
      console.log(`- [${c.field}] ${c.component_type} (cmp_id=${c.cmp_id}): Error reading table ${tableName}`);
    }
  }

  await db.end();
}

main().catch(console.error);

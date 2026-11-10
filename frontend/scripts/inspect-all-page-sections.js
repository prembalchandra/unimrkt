const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [pages] = await db.query('SELECT id, slug, title FROM pages WHERE published_at IS NOT NULL ORDER BY slug');
  for (const page of pages) {
    console.log(`\n=== Page: ${page.slug} (id=${page.id}) ===`);
    const [cmps] = await db.query('SELECT * FROM pages_cmps WHERE entity_id = ? ORDER BY `order` ASC', [page.id]);
    for (const c of cmps) {
      const table = 'components_' + c.component_type.replace('.', '_') + 's';
      let row = [];
      try {
        [row] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [c.cmp_id]);
      } catch (e) {
        row = [{ error: e.message }];
      }
      const r = row[0] || {};
      console.log(`  [order ${c.order}] ${c.component_type} (id=${c.cmp_id}) -> kicker="${r.kicker || ''}", heading="${r.heading || r.title || ''}"`);
    }
  }
  await db.end();
}

main().catch(console.error);

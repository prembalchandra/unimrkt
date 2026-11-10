const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [pages] = await db.query('SELECT id, slug, title FROM pages WHERE published_at IS NOT NULL ORDER BY id');
  for (const p of pages) {
    const [cmps] = await db.query(
      'SELECT id, component_type, cmp_id, field, `order` FROM pages_cmps WHERE entity_id = ? ORDER BY `order`',
      [p.id]
    );
    console.log(`Page: /${p.slug === 'home' ? '' : p.slug} (ID: ${p.id}, Title: "${p.title}") => ${cmps.length} sections:`);
    cmps.forEach(c => {
      console.log(`   ${c.order}. [${c.field}] ${c.component_type} (cmp_id=${c.cmp_id})`);
    });
  }

  await db.end();
}

main().catch(console.error);

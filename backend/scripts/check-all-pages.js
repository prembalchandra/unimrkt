const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  const [pages] = await db.query(
    'SELECT id, title, slug, published_at FROM pages WHERE published_at IS NOT NULL ORDER BY id'
  );
  console.log(`Found ${pages.length} published pages in MySQL:`);
  for (const p of pages) {
    const [cmps] = await db.query(
      'SELECT count(*) as count FROM pages_cmps WHERE entity_id = ?',
      [p.id]
    );
    console.log(` - ID ${p.id.toString().padStart(3)} | /${p.slug.padEnd(22)} | sections in pages_cmps: ${cmps[0].count}`);
  }

  await db.end();
}

check().catch(console.error);

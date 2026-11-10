const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function checkPages() {
  const db = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'unimrkt_strapi' });
  const [pages] = await db.query('SELECT id, document_id, slug, title, published_at FROM pages WHERE slug = "industries"');
  console.log('Industries pages:', pages);
  for (const p of pages) {
    const [cmps] = await db.query('SELECT * FROM pages_cmps WHERE entity_id = ? AND component_type LIKE "%cta%"', [p.id]);
    console.log(`Page id ${p.id} (pub: ${p.published_at ? 'YES' : 'NO'}) CTA cmps:`, cmps);
  }
  await db.end();
}

checkPages().catch(console.error);

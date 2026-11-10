const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  const [heroes] = await db.query(
    'SELECT id, kicker, title, description FROM components_sections_hero_commons'
  );
  console.log(`Found ${heroes.length} hero_common components in MySQL:`);
  for (const h of heroes) {
    const [links] = await db.query(
      "SELECT f.id, f.url FROM files_related_mph m JOIN files f ON m.file_id = f.id WHERE m.related_type = 'sections.hero-common' AND m.related_id = ?",
      [h.id]
    );
    console.log(
      `Hero #${h.id}: "${h.title?.slice(0, 40)}" | Image: ${links[0]?.url || 'NONE'}`
    );
  }

  await db.end();
}

check().catch(console.error);

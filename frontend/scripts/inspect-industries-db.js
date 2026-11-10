const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function inspect() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [pages] = await db.query('SELECT id, slug, title FROM pages WHERE slug = ?', ['industries']);
  console.log('Industries page:', pages[0]);

  if (pages[0]) {
    const pageId = pages[0].id;
    const [cmps] = await db.query(
      'SELECT id, entity_id, component_type, cmp_id, field FROM pages_cmps WHERE entity_id = ? ORDER BY id',
      [pageId]
    );
    console.log('\nTotal components for industries page in MySQL:', cmps.length);

    // Get all tables in unimrkt_strapi
    const [allTables] = await db.query('SHOW TABLES');
    const tableNames = allTables.map(t => Object.values(t)[0]);

    for (const c of cmps) {
      console.log('\n--- Component:', c.component_type, 'cmp_id:', c.cmp_id, 'field:', c.field);
      // find matching table
      const rawName = c.component_type.replace(/[^a-zA-Z0-9]/g, '_');
      const candidates = tableNames.filter(t => t.includes(rawName.split('_').slice(-1)[0]));
      
      let matched = false;
      for (const t of candidates) {
        try {
          const [rows] = await db.query(`SELECT * FROM \`${t}\` WHERE id = ?`, [c.cmp_id]);
          if (rows.length > 0) {
            console.log(`FOUND in table: ${t}`);
            console.log(rows[0]);
            matched = true;
            break;
          }
        } catch (e) {
          // ignore
        }
      }
      if (!matched) {
        console.log(`Could not find row for cmp_id ${c.cmp_id} in candidates:`, candidates);
      }
    }
  }

  await db.end();
}

inspect().catch(console.error);

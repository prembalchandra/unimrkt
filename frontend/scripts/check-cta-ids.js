const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function check() {
  const db = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'unimrkt_strapi' });
  const [cmps] = await db.query('SELECT * FROM pages_cmps WHERE entity_id = 13');
  for (const row of cmps) {
    if (row.component_type.includes('question-cta')) {
      console.log('question-cta cmp row:', row);
      const [cta] = await db.query('SELECT * FROM components_sections_question_ctas WHERE id = ?', [row.cmp_id]);
      console.log('CTA row in table:', cta);
    }
  }
  const [allCtas] = await db.query('SELECT * FROM components_sections_question_ctas');
  console.log('All CTAs count:', allCtas.length);
  for (const c of allCtas) {
    console.log(`CTA id ${c.id}: ${c.title}`);
  }
  await db.end();
}

check().catch(console.error);

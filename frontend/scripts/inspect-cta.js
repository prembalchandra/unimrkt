const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function inspectCta() {
  const db = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'unimrkt_strapi' });
  const [rows] = await db.query('SELECT * FROM pages_cmps WHERE entity_id = 13 AND component_type = "sections.question-cta"');
  console.log('pages_cmps row:', rows);
  if (rows.length > 0) {
    const [cta] = await db.query('SELECT * FROM components_sections_question_ctas WHERE id = ?', [rows[0].cmp_id]);
    console.log('Question CTA content:', cta);
  }
  await db.end();
}

inspectCta().catch(console.error);

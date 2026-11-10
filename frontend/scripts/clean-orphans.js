const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function cleanOrphans() {
  const db = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'unimrkt_strapi' });
  const [allTables] = await db.query('SHOW TABLES');
  const tnames = allTables.map(t => Object.values(t)[0]);
  console.log('Tables:', tnames.filter(t => t.includes('video') || t.includes('custom_html') || t.includes('banner') || t.includes('gallery') || t.includes('icon_card')));
  
  // Drop table components_sections_video_sections if it exists so Strapi can recreate it with correct Knex schema
  for (const t of ['components_sections_video_sections', 'components_sections_video_sections_cmps', 'components_sections_video_sections_lnk', 'components_sections_video_sections_video_poster_lnk']) {
    if (tnames.includes(t)) {
      await db.query(`DROP TABLE IF EXISTS \`${t}\``);
      console.log(`Dropped ${t}`);
    }
  }
  await db.end();
}

cleanOrphans().catch(console.error);

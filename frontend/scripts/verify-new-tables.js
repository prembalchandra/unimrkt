const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function verifyTables() {
  const db = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'unimrkt_strapi' });
  const [allTables] = await db.query('SHOW TABLES');
  const tnames = allTables.map(t => Object.values(t)[0]);
  const newOnes = [
    'components_sections_custom_html_sections',
    'components_sections_banner_sections',
    'components_sections_image_galleries',
    'components_sections_icon_cards_sections',
    'components_sections_video_sections',
    'components_elements_icon_cards'
  ];
  for (const n of newOnes) {
    console.log(n, ':', tnames.includes(n) ? 'EXISTS' : 'NOT FOUND');
  }
  await db.end();
}

verifyTables().catch(console.error);

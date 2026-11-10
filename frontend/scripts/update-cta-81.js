const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function updateCta81() {
  const db = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'unimrkt_strapi' });
  await db.query(`
    UPDATE components_sections_question_ctas
    SET kicker = 'Get In Touch',
        title = 'Have A Question? Let\\'s Find The Answer.',
        description = 'A simple process designed to understand your requirement and connect you with the right research expert.'
    WHERE id IN (80, 81)
  `);
  console.log('Updated question_cta 80 and 81!');
  await db.end();
}

updateCta81().catch(console.error);

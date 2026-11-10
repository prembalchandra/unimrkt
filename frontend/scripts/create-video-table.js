const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function createVideoTable() {
  const db = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'unimrkt_strapi' });
  await db.query(`
    CREATE TABLE IF NOT EXISTS \`components_sections_video_sections\` (
      \`id\` int unsigned NOT NULL AUTO_INCREMENT,
      \`kicker\` varchar(255) DEFAULT NULL,
      \`heading\` varchar(255) DEFAULT NULL,
      \`description\` longtext DEFAULT NULL,
      \`video_url\` varchar(255) DEFAULT NULL,
      \`enabled\` tinyint(1) DEFAULT 1,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('Created components_sections_video_sections');
  await db.end();
}

createVideoTable().catch(console.error);

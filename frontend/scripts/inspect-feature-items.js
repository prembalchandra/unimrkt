const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [cols] = await db.query('DESCRIBE components_elements_feature_items');
  console.log('components_elements_feature_items columns:', cols.map(c => c.Field));

  const [rows] = await db.query('SELECT * FROM components_elements_feature_items LIMIT 10');
  console.log('Sample rows:', rows);

  // Check if there are icon relations in files_related_morphs
  const [links] = await db.query('SELECT * FROM files_related_mph WHERE related_type LIKE "%feature%" LIMIT 10');
  console.log('Feature item media links:', links);

  await db.end();
}

main().catch(console.error);

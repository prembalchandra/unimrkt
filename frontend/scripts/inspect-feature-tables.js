const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function inspect() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [allTables] = await db.query('SHOW TABLES');
  const tnames = allTables.map(t => Object.values(t)[0]);
  console.log('Tables matching accordion:', tnames.filter(t => t.includes('accordion')));
  console.log('Tables matching feature:', tnames.filter(t => t.includes('feature')));

  // Check components_sections_accordion_solutions_cmps or similar
  for (const t of tnames.filter(t => t.includes('accordion'))) {
    const [rows] = await db.query(`SELECT * FROM \`${t}\` LIMIT 5`);
    console.log(`\nTable ${t}:`, rows);
  }

  // Check what cards are in components_elements_feature_items
  const [features] = await db.query(`SELECT * FROM components_elements_feature_items LIMIT 5`);
  console.log('\nSample feature items:', features);

  await db.end();
}

inspect().catch(console.error);

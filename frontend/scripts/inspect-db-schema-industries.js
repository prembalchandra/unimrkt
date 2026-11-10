const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function inspect() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const tables = [
    'components_sections_callout_boxes',
    'components_sections_question_ctas',
    'components_sections_accordion_solutions',
    'components_sections_values_grids',
    'components_sections_metrics_grids',
    'components_sections_industry_sliders',
    'industries',
    'testimonials'
  ];

  for (const t of tables) {
    try {
      const [cols] = await db.query(`DESCRIBE \`${t}\``);
      console.log(`\nTable ${t} columns:`, cols.map(c => c.Field).join(', '));
      const [rows] = await db.query(`SELECT * FROM \`${t}\` LIMIT 2`);
      console.log(`Sample row from ${t}:`, rows[0]);
    } catch (e) {
      console.log(`Table ${t} error:`, e.message);
    }
  }

  // Also check relational join tables for cards/items in accordion, values-grid, metrics-grid
  const [allTables] = await db.query('SHOW TABLES');
  const tableNames = allTables.map(t => Object.values(t)[0]);
  console.log('\nRelevant relational component tables:');
  const rels = tableNames.filter(t => 
    t.includes('cards') || t.includes('values') || t.includes('metrics') || t.includes('items') || t.includes('questions')
  );
  console.log(rels);

  await db.end();
}

inspect().catch(console.error);

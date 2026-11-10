const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  const [vg] = await db.query('SELECT * FROM components_sections_values_grids WHERE id = 39');
  console.log('Values grid 39:', vg[0]);
  const [vgItems] = await db.query(
    'SELECT c.title, c.description FROM components_sections_values_grids_cmps m JOIN components_elements_feature_items c ON m.cmp_id = c.id WHERE m.entity_id = 39 ORDER BY m.order'
  );
  console.log('Values grid 39 items:', vgItems);

  const [acc] = await db.query('SELECT * FROM components_sections_accordion_solutions WHERE id = 9');
  console.log('Accordion 9:', acc[0]);
  const [accItems] = await db.query(
    'SELECT c.title, c.description FROM components_sections_accordion_solutions_cmps m JOIN components_elements_feature_items c ON m.cmp_id = c.id WHERE m.entity_id = 9 ORDER BY m.order'
  );
  console.log('Accordion 9 items:', accItems);

  await db.end();
}

main().catch(console.error);

const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  const [rows] = await db.query('SELECT * FROM globals');
  console.log('Global settings in MySQL:', rows[0]);

  const [cols] = await db.query('SELECT * FROM components_layout_footer_columns');
  console.log('Footer columns count:', cols.length);

  const [links] = await db.query('SELECT * FROM components_elements_button_links');
  console.log('Button links count:', links.length);

  await db.end();
}

check().catch(console.error);

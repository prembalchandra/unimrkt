const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  const [navLinks] = await db.query('SELECT * FROM components_elements_nav_links');
  console.log('Navigation links in MySQL:', navLinks);

  await db.end();
}

check().catch(console.error);

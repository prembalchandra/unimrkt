const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  const [offices] = await db.query('SELECT * FROM office_locations');
  console.log('Office locations in MySQL:', offices);

  await db.end();
}

check().catch(console.error);

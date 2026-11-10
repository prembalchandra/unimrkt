const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  const [types] = await db.query(
    'SELECT related_type, count(*) as count FROM files_related_mph GROUP BY related_type'
  );
  console.log('files_related_mph distribution:');
  console.table(types);

  await db.end();
}

check().catch(console.error);

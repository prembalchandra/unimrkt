const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  const [files] = await db.query('SELECT count(*) as count FROM files');
  console.log('Total files in `files` table:', files[0].count);

  const [links] = await db.query('SELECT count(*) as count FROM files_related_mph');
  console.log('Total links in `files_related_mph`:', links[0].count);

  const [samples] = await db.query('SELECT id, name, url, mime, ext FROM files LIMIT 10');
  console.log('Sample files:', samples);

  const [morphSamples] = await db.query('SELECT * FROM files_related_mph LIMIT 15');
  console.log('Sample morph links:', morphSamples);

  await db.end();
}

check().catch(console.error);

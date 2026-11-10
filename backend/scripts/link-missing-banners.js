const mysql = require('mysql2/promise');

async function link() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi',
  });

  // Link Work hero banners (IDs 104 and 105) to file_id 462 or 463
  for (const heroId of [104, 105]) {
    await db.query(
      "INSERT INTO files_related_mph (file_id, related_id, related_type, field, `order`) VALUES (?, ?, 'sections.hero-common', 'bannerImage', 1)",
      [463, heroId]
    );
    console.log(`Linked bannerImage to Work hero #${heroId}`);
  }

  // Link Contact hero banners (IDs 106 and 108) to file_id 440
  for (const heroId of [106, 108]) {
    await db.query(
      "INSERT INTO files_related_mph (file_id, related_id, related_type, field, `order`) VALUES (?, ?, 'sections.hero-common', 'bannerImage', 1)",
      [440, heroId]
    );
    console.log(`Linked bannerImage to Contact hero #${heroId}`);
  }

  await db.end();
  console.log('Successfully linked Work and Contact banners in MySQL!');
}

link().catch(console.error);

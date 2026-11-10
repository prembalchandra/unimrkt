const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));

async function checkGlobals() {
  const db = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'unimrkt_strapi' });
  const [cols] = await db.query('DESCRIBE globals');
  const colNames = cols.map(c => c.Field);
  console.log('Globals columns:', colNames);

  const missing = [
    { name: 'contact_phone', sql: 'ADD COLUMN `contact_phone` VARCHAR(255) DEFAULT "+91-124-400-8800"' },
    { name: 'contact_email', sql: 'ADD COLUMN `contact_email` VARCHAR(255) DEFAULT "info@unimrkt.com"' },
    { name: 'contact_address', sql: 'ADD COLUMN `contact_address` LONGTEXT' },
    { name: 'contact_working_hours', sql: 'ADD COLUMN `contact_working_hours` VARCHAR(255) DEFAULT "Mon - Fri: 9:00 AM - 6:00 PM IST"' },
    { name: 'top_notification_bar', sql: 'ADD COLUMN `top_notification_bar` VARCHAR(255)' }
  ];

  for (const m of missing) {
    if (!colNames.includes(m.name)) {
      await db.query(`ALTER TABLE globals ${m.sql}`);
      console.log(`Added column ${m.name} to globals`);
    }
  }

  // Set default address if empty
  await db.query(`
    UPDATE globals
    SET contact_phone = COALESCE(contact_phone, '+91-124-400-8800'),
        contact_email = COALESCE(contact_email, 'info@unimrkt.com'),
        contact_address = COALESCE(contact_address, 'Unimrkt Research, 5th Floor, Tower B, Unitech Cyber Park, Sector 39, Gurugram, Haryana 122002'),
        contact_working_hours = COALESCE(contact_working_hours, 'Mon - Fri: 9:00 AM - 6:00 PM IST')
    WHERE id = 1
  `);
  console.log('Updated global contact info in MySQL');

  await db.end();
}

checkGlobals().catch(console.error);

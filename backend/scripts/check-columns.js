const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../.tmp/data.db'));
console.log('team_members columns:', db.prepare("PRAGMA table_info('team_members')").all().map(c => c.name));

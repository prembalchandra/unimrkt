const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../.tmp/data.db'));

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(r => r.name);
console.log('Component & Page Tables:', tables.filter(t => t.includes('section') || t.includes('page') || t.includes('cmp') || t.includes('dz')));

const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../.tmp/data.db'));

// Let's see all tables related to permissions and roles
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', tables.map(t => t.name).filter(n => n.includes('up_') || n.includes('permission') || n.includes('role')));

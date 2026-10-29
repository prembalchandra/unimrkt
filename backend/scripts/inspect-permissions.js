const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../.tmp/data.db'));

console.log('UP ROLES:', db.prepare("SELECT * FROM up_roles").all());
console.log('UP PERMISSIONS COUNT:', db.prepare("SELECT count(*) as cnt FROM up_permissions").all());
console.log('SAMPLE PERMISSIONS:', db.prepare("SELECT * FROM up_permissions LIMIT 10").all());
if (db.prepare("SELECT count(*) as cnt FROM up_permissions_role_lnk").get().cnt > 0) {
  console.log('LNK SAMPLES:', db.prepare("SELECT * FROM up_permissions_role_lnk LIMIT 5").all());
}

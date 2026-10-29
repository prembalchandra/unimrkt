const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

const db = new Database(path.join(__dirname, '../.tmp/data.db'));
const publicRole = db.prepare("SELECT id FROM up_roles WHERE type = 'public'").get();
const now = Date.now();

let perm = db.prepare("SELECT id FROM up_permissions WHERE action = 'api::page.page.update'").get();
let permId;
if (!perm) {
  const docId = crypto.randomBytes(12).toString('hex');
  const info = db.prepare(`
    INSERT INTO up_permissions (document_id, action, created_at, updated_at, published_at)
    VALUES (?, 'api::page.page.update', ?, ?, ?)
  `).run(docId, now, now, now);
  permId = info.lastInsertRowid;
} else {
  permId = perm.id;
}

const lnk = db.prepare("SELECT id FROM up_permissions_role_lnk WHERE permission_id = ? AND role_id = ?").get(permId, publicRole.id);
if (!lnk) {
  const maxOrd = (db.prepare(`SELECT MAX(permission_ord) as m FROM up_permissions_role_lnk`).get().m || 0) + 1;
  db.prepare(`INSERT INTO up_permissions_role_lnk (permission_id, role_id, permission_ord) VALUES (?, ?, ?)`).run(permId, publicRole.id, maxOrd);
}

console.log('✓ Public update permission granted for pages!');

const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

function genDocId() {
  return crypto.randomBytes(12).toString('hex');
}

const db = new Database(path.join(__dirname, '../.tmp/data.db'));

const apisDir = path.join(__dirname, '../src/api');
const apiFolders = fs.readdirSync(apisDir).filter(f => fs.statSync(path.join(apisDir, f)).isDirectory());

console.log('Found APIs:', apiFolders);

const publicRole = db.prepare("SELECT id FROM up_roles WHERE type = 'public'").get();
const authRole = db.prepare("SELECT id FROM up_roles WHERE type = 'authenticated'").get();

if (!publicRole) {
  console.error('Public role not found!');
  process.exit(1);
}

const now = Date.now();

// Collect all required actions
const actions = [];

for (const api of apiFolders) {
  actions.push(`api::${api}.${api}.find`);
  actions.push(`api::${api}.${api}.findOne`);
  if (api === 'contact-submission') {
    actions.push(`api::${api}.${api}.create`);
  }
}

console.log(`Configuring ${actions.length} permissions for Public (role ${publicRole.id}) and Authenticated (role ${authRole.id})...`);

const insertPermStmt = db.prepare(`
  INSERT INTO up_permissions (document_id, action, created_at, updated_at, published_at)
  VALUES (?, ?, ?, ?, ?)
`);

const insertLnkStmt = db.prepare(`
  INSERT INTO up_permissions_role_lnk (permission_id, role_id, permission_ord)
  VALUES (?, ?, ?)
`);

const checkPermStmt = db.prepare(`SELECT id FROM up_permissions WHERE action = ?`);
const checkLnkStmt = db.prepare(`SELECT id FROM up_permissions_role_lnk WHERE permission_id = ? AND role_id = ?`);

let maxOrd = (db.prepare(`SELECT MAX(permission_ord) as m FROM up_permissions_role_lnk`).get().m || 0) + 1;

for (const act of actions) {
  let perm = checkPermStmt.get(act);
  let permId;
  if (!perm) {
    const docId = genDocId();
    const info = insertPermStmt.run(docId, act, now, now, now);
    permId = info.lastInsertRowid;
    console.log(`+ Created permission: ${act} (id: ${permId})`);
  } else {
    permId = perm.id;
  }

  // Link to Public Role
  if (!checkLnkStmt.get(permId, publicRole.id)) {
    insertLnkStmt.run(permId, publicRole.id, maxOrd++);
    console.log(`  Linked ${act} -> Public Role`);
  }

  // Link to Authenticated Role
  if (authRole && !checkLnkStmt.get(permId, authRole.id)) {
    insertLnkStmt.run(permId, authRole.id, maxOrd++);
    console.log(`  Linked ${act} -> Authenticated Role`);
  }
}

console.log('✓ All Public & Authenticated permissions successfully granted!');

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.resolve(__dirname, '../.tmp/data.db');
const uploadsDir = path.resolve(__dirname, '../public/uploads');
const sourceImagesDir = path.resolve(__dirname, '../../frontend/public/asstes/images');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const db = new Database(dbPath);

function getMime(ext) {
  const map = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.gif': 'image/gif',
    '.mp4': 'video/mp4',
  };
  return map[ext.toLowerCase()] || 'application/octet-stream';
}

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].includes(ext)) {
        fileList.push({
          fullPath,
          name: item,
          ext,
          size: +(stat.size / 1024).toFixed(2),
        });
      }
    }
  }
  return fileList;
}

function syncMedia() {
  console.log('[sync-media] Scanning images from frontend/public/asstes/images...');
  const files = getAllFiles(sourceImagesDir);
  console.log(`[sync-media] Found ${files.length} images.`);

  const insertStmt = db.prepare(`
    INSERT INTO files (
      document_id, name, alternative_text, caption, hash, ext, mime, size,
      url, provider, created_at, updated_at, published_at, locale
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, 'local', ?, ?, ?, 'en'
    )
  `);

  const existsStmt = db.prepare('SELECT id FROM files WHERE name = ?');

  let insertedCount = 0;
  let copiedCount = 0;
  const now = Date.now();

  const insertTx = db.transaction(() => {
    for (const f of files) {
      const existing = existsStmt.get(f.name);
      const destPath = path.join(uploadsDir, f.name);

      // Copy file to Strapi's public/uploads if not already there
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(f.fullPath, destPath);
        copiedCount++;
      }

      if (!existing) {
        const docId = crypto.randomBytes(12).toString('hex');
        const hash = path.basename(f.name, f.ext).replace(/[^a-zA-Z0-9_-]/g, '_');
        const alt = f.name.replace(f.ext, '').replace(/[-_]/g, ' ');

        insertStmt.run(
          docId,
          f.name,
          alt,
          alt,
          hash,
          f.ext,
          getMime(f.ext),
          f.size,
          `/uploads/${encodeURIComponent(f.name)}`,
          now,
          now,
          now
        );
        insertedCount++;
      }
    }
  });

  insertTx();

  const totalInDb = db.prepare('SELECT COUNT(*) as count FROM files').get().count;
  console.log(`[sync-media] Done! Copied ${copiedCount} files. Inserted ${insertedCount} into Strapi files table.`);
  console.log(`[sync-media] Total files in Strapi Media Library: ${totalInDb}`);
}

syncMedia();

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.resolve(__dirname, '../../frontend/public/asstes/images');
const frontendDir = path.resolve(__dirname, '../../frontend');
const backendDir = path.resolve(__dirname, '..');

// Recursively find all PNG/JPG/JPEG images excluding the /icon/ folder
function findImagesToConvert(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // SKIP the /icon/ folder as requested: "iocn img ko choch kar"
      if (item.toLowerCase() === 'icon') {
        console.log(`[skip] Icon directory skipped: ${fullPath}`);
        continue;
      }
      findImagesToConvert(fullPath, list);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        list.push({
          fullPath,
          dir,
          name: item,
          ext,
          baseName: path.basename(item, ext),
        });
      }
    }
  }
  return list;
}

async function convertImages() {
  console.log('[webp-converter] Finding images to convert (excluding icon/)...');
  const images = findImagesToConvert(imagesDir);
  console.log(`[webp-converter] Found ${images.length} images to convert to .webp.`);

  const convertedMap = new Map(); // oldFilename -> newWebpFilename
  let successCount = 0;

  for (const img of images) {
    const webpPath = path.join(img.dir, `${img.baseName}.webp`);
    try {
      await sharp(img.fullPath)
        .webp({ quality: 85, effort: 4 })
        .toFile(webpPath);

      convertedMap.set(img.name, `${img.baseName}.webp`);
      successCount++;
    } catch (err) {
      console.error(`Failed to convert ${img.name}:`, err.message);
    }
  }

  console.log(`[webp-converter] Successfully converted ${successCount} images to .webp!`);
  return convertedMap;
}

// Update code references across frontend & backend codebase
function updateCodeReferences(convertedMap) {
  console.log('[webp-converter] Updating code references to .webp...');

  const textExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'];
  const dirsToScan = [
    path.join(frontendDir, 'app'),
    path.join(frontendDir, 'components'),
    path.join(frontendDir, 'public', 'asstes', 'css'),
    path.join(backendDir, 'scripts'),
  ];

  function scanAndUpdate(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (item === 'node_modules' || item === '.next' || item === 'build' || item === '.tmp') continue;
        scanAndUpdate(fullPath);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (textExtensions.includes(ext)) {
          let content = fs.readFileSync(fullPath, 'utf8');
          let modified = false;

          for (const [oldName, newName] of convertedMap.entries()) {
            // Only replace if path is not in /icon/
            // Regex matches oldName when not immediately preceded by /icon/
            const pattern = new RegExp(`(?<!icon\\/)${oldName.replace('.', '\\.')}`, 'g');
            if (pattern.test(content)) {
              content = content.replace(pattern, newName);
              modified = true;
            }
          }

          if (modified) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`  ✓ Updated references in: ${path.relative(frontendDir, fullPath)}`);
          }
        }
      }
    }
  }

  for (const d of dirsToScan) {
    scanAndUpdate(d);
  }
}

async function main() {
  const convertedMap = await convertImages();
  updateCodeReferences(convertedMap);

  // Sync converted webp images into Strapi Media Library
  console.log('[webp-converter] Syncing new WebP images into Strapi Media Library...');
  try {
    const syncScript = require('./sync-media-library.js');
  } catch (e) {
    // If sync-media-library doesn't export, run via child process or require
  }
}

main().catch(console.error);

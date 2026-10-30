import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function getCategory(relPath) {
  const norm = relPath.replace(/\\/g, '/').toLowerCase();
  if (norm.includes('team/')) return 'Team Members';
  if (norm.includes('gallery/')) return 'Gallery';
  if (norm.includes('icon/')) return 'Icons & Logos';
  if (norm.includes('uploads/')) return 'Uploaded Files';
  return 'Banners & Pages';
}

function scanImages(dir, baseDir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanImages(fullPath, baseDir, list);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].includes(ext)) {
        const rel = path.relative(baseDir, fullPath).replace(/\\/g, '/');
        const url = `/asstes/images/${rel}`;
        const category = getCategory(rel);
        const readableName = item.replace(ext, '').replace(/[-_]/g, ' ');

        list.push({
          id: rel,
          name: item,
          title: readableName,
          url,
          category,
          ext: ext.replace('.', '').toUpperCase(),
          size: +(stat.size / 1024).toFixed(1), // in KB
          updatedAt: stat.mtimeMs,
        });
      }
    }
  }

  return list;
}

export async function GET(request) {
  try {
    const baseDir = path.join(process.cwd(), 'public', 'asstes', 'images');
    const allImages = scanImages(baseDir, baseDir);

    // Sort by recent/name
    allImages.sort((a, b) => b.updatedAt - a.updatedAt);

    // Calculate category counts
    const categories = {
      All: allImages.length,
      'Banners & Pages': 0,
      'Team Members': 0,
      Gallery: 0,
      'Icons & Logos': 0,
      'Uploaded Files': 0,
    };

    allImages.forEach((img) => {
      if (categories[img.category] !== undefined) {
        categories[img.category]++;
      }
    });

    return NextResponse.json({
      success: true,
      total: allImages.length,
      categories,
      images: allImages,
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

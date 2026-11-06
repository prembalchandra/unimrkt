const fs = require('fs');
const path = require('path');

const publicUploads = path.join(__dirname, '../public/uploads');

const aliases = [
  ['hero_photo_9f0cdda1b2.jpg', 'hero_photo_a0a6ba6940.jpg'],
  ['process_clipboard_tick_163f70e35c.svg', 'industries_icon_process_clipboard_774213b063.svg'],
  ['process_brush_4eb7a168ba.svg', 'industries_icon_process_brush_b535199055.svg'],
  ['process_presentation_chart_a7b1453e99.svg', 'industries_icon_process_presentation_3cf42d3bc4.svg'],
  ['process_chart_2696286093.svg', 'industries_icon_process_chart_9e15f700a8.svg'],
  ['industry_cityscape_4dbcb4ce21.jpg', 'industry_cityscape_f926ff60c2.jpg'],
  ['worldmap_mask_0343012d7e.svg', 'faq_worldmap_bg_63310f1a2e.png'],
  ['blog_photo_5afe1d894b.jpg', 'blog_photo_f2f5b0de06.jpg']
];

for (const [target, source] of aliases) {
  const targetPath = path.join(publicUploads, target);
  const sourcePath = path.join(publicUploads, source);
  if (!fs.existsSync(targetPath) && fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Created alias: ${target} -> ${source}`);
  }
}

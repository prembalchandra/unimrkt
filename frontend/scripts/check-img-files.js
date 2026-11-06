const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '../public/uploads');

console.log('gallery_large_1:', fs.existsSync(path.join(uploadsDir, 'gallery_large_1_7f89e8a396.jpg')));
console.log('gallery_large_2:', fs.existsSync(path.join(uploadsDir, 'gallery_large_2_4e72e58ce0.jpg')));

console.log('industry_healthcare:', fs.existsSync(path.join(uploadsDir, 'industry_healthcare_bdad1c7444.jpg')));
console.log('industry_banking:', fs.existsSync(path.join(uploadsDir, 'industry_banking_49416162c9.jpg')));
console.log('industry_retail:', fs.existsSync(path.join(uploadsDir, 'industry_retail_9a08ec9395.jpg')));
console.log('industry_automotive:', fs.existsSync(path.join(uploadsDir, 'industry_automotive_9d8c1f73cd.jpg')));

console.log('blog_photo:', fs.existsSync(path.join(uploadsDir, 'blog_photo_f2f5b0de06.jpg')));
console.log('blog_field:', fs.existsSync(path.join(uploadsDir, 'blog_field_research_575a614208.jpg')));
console.log('blog_ai:', fs.existsSync(path.join(uploadsDir, 'blog_ai_workforce_0c08f62c7c.jpg')));

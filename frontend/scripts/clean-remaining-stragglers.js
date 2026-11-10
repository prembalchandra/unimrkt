const fs = require('fs');
const path = require('path');

console.log('Cleaning remaining stragglers and page metadata...');

// 1. NotFoundHero.jsx
const nfPath = path.join(__dirname, '../app/404/sections/NotFoundHero.jsx');
let nfCode = fs.readFileSync(nfPath, 'utf8');
nfCode = nfCode
  .replace("src=\"/asstes/images/404-banner.png\"", "src={getStrapiMedia('/uploads/404-banner.png')}")
  .replace("src=\"/asstes/images/icon/arrow-right-icon-img.png\"", "src={getStrapiMedia('/uploads/arrow-right-icon-img.png')}")
  .replace("const kicker = dynamicHero?.kicker || 'PAGE NOT FOUND';", "const kicker = dynamicHero?.kicker || '404';")
  .replace("const heading = dynamicHero?.heading || dynamicHero?.title || 'Wrong turn. Right mindset.';", "const heading = dynamicHero?.heading || dynamicHero?.title || 'Page Not Found';")
  .replace("const desc = dynamicHero?.description || \"The page you are looking for doesn't exist or has been moved. But don't worry, you can always head back to our homepage or get in touch with us.\";", "const desc = dynamicHero?.description || '';");
if (!nfCode.includes("import { getStrapiMedia }")) {
  nfCode = nfCode.replace("'use client';", "'use client';\n\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(nfPath, nfCode, 'utf8');
console.log('✓ NotFoundHero.jsx updated');

// 2. ContactFaq.jsx
const cFaqPath = path.join(__dirname, '../app/contact/sections/ContactFaq.jsx');
let cFaqCode = fs.readFileSync(cFaqPath, 'utf8');
cFaqCode = cFaqCode
  .replace('<img src="/asstes/images/unimrkt-resarch-map-banner-img.png" alt="fqa banner" />', '<img src={getStrapiMedia("/uploads/unimrkt-resarch-map-banner-img.png")} alt="faq banner" />')
  .replace("{dynamicFaq?.title || 'Frequently Asked Questions'}", "{dynamicFaq?.title || dynamicFaq?.heading}");
if (!cFaqCode.includes("import { getStrapiMedia }")) {
  cFaqCode = cFaqCode.replace("'use client';", "'use client';\n\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(cFaqPath, cFaqCode, 'utf8');
console.log('✓ ContactFaq.jsx updated');

// 3. FaqContent.jsx
const faqContPath = path.join(__dirname, '../app/faq/sections/FaqContent.jsx');
let faqContCode = fs.readFileSync(faqContPath, 'utf8');
faqContCode = faqContCode
  .replace('<img src="/asstes/images/unimrkt-resarch-map-banner-img.png" alt="fqa banner" />', '<img src={getStrapiMedia("/uploads/unimrkt-resarch-map-banner-img.png")} alt="faq banner" />')
  .replace("category: f.category || 'General',", "category: f.category || '',")
  .replace("category: 'General',", "category: it.category || '',");
if (!faqContCode.includes("import { getStrapiMedia }")) {
  faqContCode = faqContCode.replace("'use client';", "'use client';\n\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(faqContPath, faqContCode, 'utf8');
console.log('✓ FaqContent.jsx updated');

// 4. CompanyAboutSection.jsx
const compAbPath = path.join(__dirname, '../app/our-company/sections/CompanyAboutSection.jsx');
const compAbCode = `import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function CompanyAboutSection({ dynamicRichText = null }) {
  const kicker = dynamicRichText?.kicker;
  const title = dynamicRichText?.title;
  const image = getStrapiMedia('/uploads/company-about-img.png');

  const renderContent = () => {
    if (dynamicRichText?.content && Array.isArray(dynamicRichText.content)) {
      return dynamicRichText.content.map((block, idx) => {
        const text = block.children?.map((c) => c.text).join('') || '';
        return <p key={idx}>{text}</p>;
      });
    }
    if (dynamicRichText?.description) {
      return <p>{dynamicRichText.description}</p>;
    }
    return null;
  };

  if (!title && !dynamicRichText?.content && !dynamicRichText?.description) return null;

  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            {kicker && <span className="telephonic-overview-kicker sub-title-red">{kicker}</span>}
            {title && <h2 className="telephonic-overview-title">{title}</h2>}
            {renderContent()}
          </div>

          {image && (
            <div className="telephonic-overview-visual-wrap">
              <div className="telephonic-overview-figure abou-Primary-img">
                <img src={image} alt={title || 'About Unimrkt'} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(compAbPath, compAbCode, 'utf8');
console.log('✓ CompanyAboutSection.jsx updated');

// 5. IndustriesSection.jsx (homesections)
const indPath = path.join(__dirname, '../app/homesections/IndustriesSection.jsx');
let indCode = fs.readFileSync(indPath, 'utf8');
indCode = indCode.replace(
  '<img src="/asstes/images/the-impact-banner-img.png" alt="The Impact" />',
  '<img src={getStrapiMedia("/uploads/the-impact-banner-img.png")} alt="The Impact" />'
);
fs.writeFileSync(indPath, indCode, 'utf8');
console.log('✓ IndustriesSection.jsx updated');

// 6. ContactFormSection.jsx
const cfsPath = path.join(__dirname, '../app/primary-research/sections/ContactFormSection.jsx');
let cfsCode = fs.readFileSync(cfsPath, 'utf8');
cfsCode = cfsCode.replace(
  '<img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />',
  '<img src={getStrapiMedia("/uploads/arrow-right-icon-img.png")} alt="Arrow Right" />'
);
if (!cfsCode.includes("import { submitContactInquiry, getStrapiMedia }")) {
  cfsCode = cfsCode.replace(
    "import { submitContactInquiry } from '../../../lib/strapi';",
    "import { submitContactInquiry, getStrapiMedia } from '../../../lib/strapi';"
  );
}
fs.writeFileSync(cfsPath, cfsCode, 'utf8');
console.log('✓ ContactFormSection.jsx updated');

// 7. BlogDetailContent.jsx
const bdcPath = path.join(__dirname, '../app/blog-details/sections/BlogDetailContent.jsx');
let bdcCode = fs.readFileSync(bdcPath, 'utf8');
bdcCode = bdcCode.replace(
  'src="/asstes/images/market-trends-card-img1.png"',
  'src={getStrapiMedia("/uploads/market-trends-card-img1.png")}'
);
fs.writeFileSync(bdcPath, bdcCode, 'utf8');
console.log('✓ BlogDetailContent.jsx updated');

// 8. app/blog/[slug]/page.jsx
const bSlugPath = path.join(__dirname, '../app/blog/[slug]/page.jsx');
let bSlugCode = fs.readFileSync(bSlugPath, 'utf8');
bSlugCode = bSlugCode
  .replace("'/asstes/images/team/john-doe.png'", "getStrapiMedia('/uploads/team-john-doe.png')")
  .replace("'/asstes/images/market-trends-card-img1.png'", "getStrapiMedia('/uploads/market-trends-card-img1.png')");
fs.writeFileSync(bSlugPath, bSlugCode, 'utf8');
console.log('✓ app/blog/[slug]/page.jsx updated');

// 9. app/[slug]/page.jsx
const dynSlugPath = path.join(__dirname, '../app/[slug]/page.jsx');
let dynSlugCode = fs.readFileSync(dynSlugPath, 'utf8');
dynSlugCode = dynSlugCode.replace(
  "'/asstes/images/unimrkt-resarch-map-banner-img.png'",
  "getStrapiMedia('/uploads/unimrkt-resarch-map-banner-img.png')"
);
fs.writeFileSync(dynSlugPath, dynSlugCode, 'utf8');
console.log('✓ app/[slug]/page.jsx updated');

// 10. Update all page.js metadata image paths from /asstes/images/ to /uploads/
const pageFiles = [
  'app/about/page.js',
  'app/automotives/page.js',
  'app/blog/page.js',
  'app/blog-details/page.js',
  'app/case-study/page.js',
  'app/case-study-details/page.js',
  'app/contact/page.js',
  'app/faq/page.js',
  'app/gallery/page.js',
  'app/industries/page.js',
  'app/layout.js',
  'app/our-company/page.js',
  'app/page.js',
  'app/primary-research/page.js',
  'app/services/page.js',
  'app/team/page.js',
  'app/telephonic-surveys/page.js',
  'app/work/page.js',
];

pageFiles.forEach((rel) => {
  const full = path.join(__dirname, '..', rel);
  if (fs.existsSync(full)) {
    let content = fs.readFileSync(full, 'utf8');
    content = content.replace(/'\/asstes\/images\/([^']+)'/g, "'/uploads/$1'");
    content = content.replace(/"\/asstes\/images\/([^"]+)"/g, '"/uploads/$1"');
    fs.writeFileSync(full, content, 'utf8');
    console.log(`✓ Metadata images updated in ${rel}`);
  }
});

console.log('Stragglers cleaned.');

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.resolve(__dirname, '../../frontend/public/asstes/images');
const iconDir = path.resolve(imagesDir, 'icon');
const frontendDir = path.resolve(__dirname, '../../frontend');

async function fixAllImages() {
  console.log('[fix-images] 1. Copying video-banner-img.mp4 from commonvideo-banner.mp4...');
  const commonVideo = path.join(imagesDir, 'commonvideo-banner.mp4');
  const targetVideo = path.join(imagesDir, 'video-banner-img.mp4');
  if (fs.existsSync(commonVideo) && !fs.existsSync(targetVideo)) {
    fs.copyFileSync(commonVideo, targetVideo);
    console.log('  ✓ Created video-banner-img.mp4');
  }

  console.log('[fix-images] 2. Generating testimonial-icon-img.png in icon directory...');
  const testimonialIconPath = path.join(iconDir, 'testimonial-icon-img.png');
  if (!fs.existsSync(testimonialIconPath)) {
    // Generate an SVG quote icon and convert to PNG with sharp
    const svgQuote = `
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 12C9.8 16.5 8 21.2 8 26.5C8 31.7 11.5 35 16 35C20.2 35 23.5 31.8 23.5 27.5C23.5 23.2 20.2 20 16 20C15.2 20 14.5 20.2 13.8 20.5C14.5 16.8 17.5 14 21 12.8L18.8 8.5C17.2 9.5 15.8 10.7 14.5 12ZM34.5 12C29.8 16.5 28 21.2 28 26.5C28 31.7 31.5 35 36 35C40.2 35 43.5 31.8 43.5 27.5C43.5 23.2 40.2 20 36 20C35.2 20 34.5 20.2 33.8 20.5C34.5 16.8 37.5 14 41 12.8L38.8 8.5C37.2 9.5 35.8 10.7 34.5 12Z" fill="#ff526b"/>
      </svg>
    `;
    await sharp(Buffer.from(svgQuote)).png().toFile(testimonialIconPath);
    console.log('  ✓ Created testimonial-icon-img.png');
  }

  console.log('[fix-images] 3. Creating clean aliases for special character filenames (&)...');
  const specialPairs = [
    { src: 'food-&-beverage-img.webp', dest: 'food-and-beverage-img.webp' },
    { src: 'food-&-beverage-img.png', dest: 'food-and-beverage-img.png' },
    { src: 'media-&-entertainment-img.webp', dest: 'media-and-entertainment-img.webp' },
    { src: 'media-&-entertainment-img.png', dest: 'media-and-entertainment-img.png' },
  ];
  for (const pair of specialPairs) {
    const srcPath = path.join(imagesDir, pair.src);
    const destPath = path.join(imagesDir, pair.dest);
    if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  ✓ Aliased ${pair.dest} from ${pair.src}`);
    }
  }

  console.log('[fix-images] 4. Creating banner & logo aliases for all metadata & fallback references...');
  const bannerAliases = [
    // [missingFileName, existingSourceFile]
    { name: 'unimrkt-logo-red.png', source: 'unimrkt-resarch-logo.webp' },
    { name: 'unimrkt-logo-red.webp', source: 'unimrkt-resarch-logo.webp' },
    { name: 'about-hero-banner-img.png', source: 'unimrkt-resarch-our-team-banner.webp' },
    { name: 'about-hero-banner-img.webp', source: 'unimrkt-resarch-our-team-banner.webp' },
    { name: 'blog-banner-img.png', source: 'blog-hero-banner-img.webp' },
    { name: 'blog-banner-img.webp', source: 'blog-hero-banner-img.webp' },
    { name: 'case-study-hero-banner-img.png', source: 'case-study-banner-img.webp' },
    { name: 'case-study-hero-banner-img.webp', source: 'case-study-banner-img.webp' },
    { name: 'contact-banner-img.png', source: 'contac-banner-img.webp' },
    { name: 'contact-banner-img.webp', source: 'contac-banner-img.webp' },
    { name: 'faq-hero-banner-img.png', source: 'the-impact-banner-img.webp' },
    { name: 'faq-hero-banner-img.webp', source: 'the-impact-banner-img.webp' },
    { name: 'industries-hero-banner-img.png', source: 'industries-banner-img.webp' },
    { name: 'industries-hero-banner-img.webp', source: 'industries-banner-img.webp' },
    { name: 'services-hero-banner-img.png', source: 'services-banner-img.webp' },
    { name: 'services-hero-banner-img.webp', source: 'services-banner-img.webp' },
    { name: 'team-banner-img.png', source: 'unimrkt-resarch-our-team-banner.webp' },
    { name: 'team-banner-img.webp', source: 'unimrkt-resarch-our-team-banner.webp' },
    { name: 'telephonic-hero-banner-img.png', source: 'unimrkt-research-telephonic-surveys-banner.webp' },
    { name: 'telephonic-hero-banner-img.webp', source: 'unimrkt-research-telephonic-surveys-banner.webp' },
    { name: 'work-with-hero-banner-img.png', source: 'unimrkt-reseach-work-banner-img.webp' },
    { name: 'work-with-hero-banner-img.webp', source: 'unimrkt-reseach-work-banner-img.webp' },
    { name: 'automotive-aftermarket-img.png', source: 'automotives-card-img.webp' },
    { name: 'automotive-aftermarket-img.webp', source: 'automotives-card-img.webp' },
    { name: 'technology-and-telecom-img.png', source: 'technology-card-img.webp' },
    { name: 'technology-and-telecom-img.webp', source: 'technology-card-img.webp' },
    { name: 'energy-and-sustainability-img.png', source: 'energy-utilities-img.webp' },
    { name: 'energy-and-sustainability-img.webp', source: 'energy-utilities-img.webp' },
  ];

  for (const b of bannerAliases) {
    const dest = path.join(imagesDir, b.name);
    const src = path.join(imagesDir, b.source);
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      if (b.name.endsWith('.png') && b.source.endsWith('.webp')) {
        await sharp(src).png().toFile(dest);
      } else {
        fs.copyFileSync(src, dest);
      }
      console.log(`  ✓ Created alias ${b.name}`);
    }
  }

  console.log('[fix-images] 5. Updating frontend code references to safe clean URLs...');
  // A. IndustriesGrid.jsx
  const industriesGridFile = path.join(frontendDir, 'app/industries/sections/IndustriesGrid.jsx');
  if (fs.existsSync(industriesGridFile)) {
    let gridContent = fs.readFileSync(industriesGridFile, 'utf8');
    gridContent = gridContent.replace(
      "image: '/asstes/images/food-&-beverage-img.webp'",
      "image: '/asstes/images/food-and-beverage-img.webp'"
    );
    gridContent = gridContent.replace(
      "image: '/asstes/images/media-&-entertainment-img.webp'",
      "image: '/asstes/images/media-and-entertainment-img.webp'"
    );
    fs.writeFileSync(industriesGridFile, gridContent, 'utf8');
    console.log('  ✓ Updated IndustriesGrid.jsx');
  }

  // B. ServicesIndustriesExpertise.jsx
  const expertiseFile = path.join(frontendDir, 'components/ServicesIndustriesExpertise.jsx');
  if (fs.existsSync(expertiseFile)) {
    let expContent = fs.readFileSync(expertiseFile, 'utf8');
    expContent = expContent.replace(
      "fallbackImg: '/asstes/images/automotive-aftermarket-img.png'",
      "fallbackImg: '/asstes/images/automotives-card-img.webp'"
    );
    expContent = expContent.replace(
      "fallbackImg: '/asstes/images/technology-and-telecom-img.png'",
      "fallbackImg: '/asstes/images/technology-card-img.webp'"
    );
    expContent = expContent.replace(
      "fallbackImg: '/asstes/images/energy-and-sustainability-img.png'",
      "fallbackImg: '/asstes/images/energy-utilities-img.webp'"
    );
    fs.writeFileSync(expertiseFile, expContent, 'utf8');
    console.log('  ✓ Updated ServicesIndustriesExpertise.jsx');
  }

  console.log('[fix-images] All frontend image repairs completed successfully!');
}

fixAllImages().catch(console.error);

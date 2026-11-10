const fs = require('fs');
const path = require('path');

console.log('Cleaning Automotives sections...');

// 1. AutomotiveOverview.jsx
const autoOverPath = path.join(__dirname, '../app/automotives/sections/AutomotiveOverview.jsx');
let autoOverCode = fs.readFileSync(autoOverPath, 'utf8');
autoOverCode = autoOverCode
  .replace("kicker || 'CASE STUDIES'", "kicker")
  .replace("{title || <>Automotive<br />Success Stories</>}", "{title}")
  .replace("description || 'Discover how our research empowers automotive brands with actionable insights, smarter decisions, and measurable business growth.'", "description")
  .replace("'/asstes/images/automotive-success-story-1.png'", "getStrapiMedia('/uploads/automotive-success-story-1.png')");
if (!autoOverCode.includes("import { getStrapiMedia }")) {
  autoOverCode = autoOverCode.replace("import React from 'react';", "import React from 'react';\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(autoOverPath, autoOverCode, 'utf8');
console.log('✓ AutomotiveOverview.jsx updated');

// 2. AutomotiveChallengesDark.jsx
const autoChallPath = path.join(__dirname, '../app/automotives/sections/AutomotiveChallengesDark.jsx');
let autoChallCode = fs.readFileSync(autoChallPath, 'utf8');
autoChallCode = autoChallCode
  .replace("kicker || 'Business Challenges We Cover'", "kicker")
  .replace("heading || 'Key Challenges We Solve'", "heading")
  .replace("description || 'The automotive industry is rapidly evolving with technological advancements, changing consumer expectations, and increasing regulatory demands. Unimrkt Research helps businesses overcome these challenges through reliable market intelligence and actionable insights.'", "description")
  .replace("'/asstes/images/icon/consumer-preferences-icon-img.png'", "getStrapiMedia('/uploads/consumer-preferences-icon-img.png')");
if (!autoChallCode.includes("import { getStrapiMedia }")) {
  autoChallCode = autoChallCode.replace("import React from 'react';", "import React from 'react';\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(autoChallPath, autoChallCode, 'utf8');
console.log('✓ AutomotiveChallengesDark.jsx updated');

// 3. AutomotiveMethodologiesSlider.jsx
const autoMethPath = path.join(__dirname, '../app/automotives/sections/AutomotiveMethodologiesSlider.jsx');
let autoMethCode = fs.readFileSync(autoMethPath, 'utf8');
autoMethCode = autoMethCode
  .replace("kicker || 'PROVEN METHODOLOGIES'", "kicker")
  .replace("heading || 'Proven Research Methodologies'", "heading")
  .replace("description || 'From cockpit usability clinics to enterprise supply chain audits, our multi-modal research suites deliver dependable, defensible intelligence for high-stakes mobility decisions.'", "description")
  .replace("'/asstes/images/online-surveys-card-img.png'", "getStrapiMedia('/uploads/online-surveys-card-img.png')");
if (!autoMethCode.includes("import { getStrapiMedia }")) {
  autoMethCode = autoMethCode.replace("import React, { useEffect, useRef } from 'react';", "import React, { useEffect, useRef } from 'react';\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(autoMethPath, autoMethCode, 'utf8');
console.log('✓ AutomotiveMethodologiesSlider.jsx updated');

// 4. AutomotiveEcosystemSlider.jsx
const autoEcoPath = path.join(__dirname, '../app/automotives/sections/AutomotiveEcosystemSlider.jsx');
let autoEcoCode = fs.readFileSync(autoEcoPath, 'utf8');
autoEcoCode = autoEcoCode
  .replace("kicker || 'OUR EXPERTISE'", "kicker")
  .replace("heading || 'Expertise Across The Automotive Ecosystem'", "heading");
fs.writeFileSync(autoEcoPath, autoEcoCode, 'utf8');
console.log('✓ AutomotiveEcosystemSlider.jsx updated');

// 5. AutomotiveIntelligenceCards.jsx
const autoIntelPath = path.join(__dirname, '../app/automotives/sections/AutomotiveIntelligenceCards.jsx');
let autoIntelCode = fs.readFileSync(autoIntelPath, 'utf8');
autoIntelCode = autoIntelCode
  .replace("kicker || 'ACTIONABLE MARKET INTELLIGENCE'", "kicker")
  .replace("heading || 'Accelerate Growth With Industry Intelligence'", "heading")
  .replace("'/asstes/images/market-trends-card-img1.png'", "getStrapiMedia('/uploads/market-trends-card-img1.png')");
if (!autoIntelCode.includes("import { getStrapiMedia }")) {
  autoIntelCode = autoIntelCode.replace("import React from 'react';", "import React from 'react';\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(autoIntelPath, autoIntelCode, 'utf8');
console.log('✓ AutomotiveIntelligenceCards.jsx updated');

// 6. AutomotiveSegmentsSlider.jsx
const autoSegPath = path.join(__dirname, '../app/automotives/sections/AutomotiveSegmentsSlider.jsx');
let autoSegCode = fs.readFileSync(autoSegPath, 'utf8');
autoSegCode = autoSegCode
  .replace("kicker || 'WHO WE SERVE'", "kicker")
  .replace("heading || 'Supporting Every Automotive Segment'", "heading")
  .replace("'/asstes/images/icon/automotive-icon-img.png'", "getStrapiMedia('/uploads/automotive-icon-img.png')");
if (!autoSegCode.includes("import { getStrapiMedia }")) {
  autoSegCode = autoSegCode.replace("import React, { useEffect, useRef } from 'react';", "import React, { useEffect, useRef } from 'react';\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(autoSegPath, autoSegCode, 'utf8');
console.log('✓ AutomotiveSegmentsSlider.jsx updated');

// 7. AutomotiveAboutOverview.jsx
const autoAbOverPath = path.join(__dirname, '../app/automotives/sections/AutomotiveAboutOverview.jsx');
const autoAbOverCode = `import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function AutomotiveAboutOverview({ dynamicOverview = null }) {
  const kicker = dynamicOverview?.kicker;
  const title = dynamicOverview?.title || dynamicOverview?.heading;
  const desc = dynamicOverview?.description;
  const image = getStrapiMedia(dynamicOverview?.image, getStrapiMedia('/uploads/automotives-about-img.png'));

  if (!title && !desc) return null;

  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            {kicker && <span className="telephonic-overview-kicker sub-title-red">{kicker}</span>}
            {title && <h2 className="telephonic-overview-title">{title}</h2>}
            <div className="abou-Primary-overview">
              {desc && <p>{desc}</p>}
            </div>
          </div>

          {image && (
            <div className="telephonic-overview-visual-wrap">
              <div className="telephonic-overview-figure abou-Primary-img">
                <img src={image} alt={title || 'Automotive Overview'} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(autoAbOverPath, autoAbOverCode, 'utf8');
console.log('✓ AutomotiveAboutOverview.jsx updated');

// 8. AutomotiveEmpowerCta.jsx
const autoEmpPath = path.join(__dirname, '../app/automotives/sections/AutomotiveEmpowerCta.jsx');
const autoEmpCode = `import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function AutomotiveEmpowerCta({ dynamicCta = null }) {
  const kicker = dynamicCta?.kicker;
  const title = dynamicCta?.title || dynamicCta?.heading;
  const desc = dynamicCta?.description;
  const image = getStrapiMedia(dynamicCta?.image, getStrapiMedia('/uploads/automotive-research-img.png'));

  if (!title && !desc) return null;

  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            {kicker && <span className="telephonic-overview-kicker sub-title-red">{kicker}</span>}
            {title && <h2 className="telephonic-overview-title">{title}</h2>}
            <div className="abou-Primary-overview">
              {desc && <p>{desc}</p>}
            </div>
          </div>

          {image && (
            <div className="telephonic-overview-visual-wrap">
              <div className="telephonic-overview-figure">
                <img src={image} alt={title || 'Automotive Research'} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(autoEmpPath, autoEmpCode, 'utf8');
console.log('✓ AutomotiveEmpowerCta.jsx updated');

// 9. AutomotiveFaq.jsx
const autoFaqPath = path.join(__dirname, '../app/automotives/sections/AutomotiveFaq.jsx');
let autoFaqCode = fs.readFileSync(autoFaqPath, 'utf8');
autoFaqCode = autoFaqCode
  .replace(
    '<img src="/asstes/images/unimrkt-resarch-map-banner-img.png" alt="faq banner" />',
    '<img src={getStrapiMedia("/uploads/unimrkt-resarch-map-banner-img.png")} alt="faq banner" />'
  )
  .replace(
    "const displayHeading = heading || dynamicFaq?.heading || dynamicFaq?.title || 'Frequently Asked Questions';",
    "const displayHeading = heading || dynamicFaq?.heading || dynamicFaq?.title;"
  );
if (!autoFaqCode.includes("import { getStrapiMedia }")) {
  // Add right after 'use client';
  autoFaqCode = autoFaqCode.replace("'use client';", "'use client';\n\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(autoFaqPath, autoFaqCode, 'utf8');
console.log('✓ AutomotiveFaq.jsx updated');

console.log('All Automotives sections cleaned successfully.');

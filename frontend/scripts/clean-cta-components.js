const fs = require('fs');
const path = require('path');

const ctaFiles = [
  'app/about/sections/ResearchCta.jsx',
  'app/automotives/sections/ResearchCta.jsx',
  'app/blog/sections/ResearchCta.jsx',
  'app/case-study/sections/ResearchCta.jsx',
  'app/case-study-details/sections/ResearchCta.jsx',
  'app/contact/sections/ResearchCta.jsx',
  'app/faq/sections/ResearchCta.jsx',
  'app/gallery/sections/ResearchCta.jsx',
  'app/homesections/HomeresearchCta.jsx',
  'app/industries/sections/ResearchCta.jsx',
  'app/industries/sections/QuestionCTA.jsx',
  'app/our-company/sections/ResearchCta.jsx',
  'app/primary-research/sections/PrimaryresearchResearchCta.jsx',
  'app/services/sections/ResearchCta.jsx',
  'app/services/sections/ServicesQuestionCTA.jsx',
  'app/team/sections/ResearchCta.jsx',
  'app/telephonic-surveys/sections/ResearchCta.jsx',
  'app/work/sections/ResearchCta.jsx',
];

ctaFiles.forEach((file) => {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) return;

  const componentName = path.basename(file, '.jsx');

  const code = `'use client';

import React from 'react';
import Link from 'next/link';

export default function ${componentName}({ dynamicCta = null }) {
  if (!dynamicCta) return null;

  const title = dynamicCta.title || dynamicCta.heading;
  const desc = dynamicCta.description;
  const btnLabel = dynamicCta.button?.label;
  const btnUrl = dynamicCta.button?.url || '/contact';

  if (!title && !desc) return null;

  return (
    <section className="research-cta-section" id="cta">
      <div className="srcn-container">
        <div className="research-cta-banner-wrapper">
          <video
            className="research-cta-bg-image"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/asstes/images/video-banner-img.mp4" type="video/mp4" />
          </video>

          <div className="research-cta-overlay"></div>
          <div className="srcn-container research-cta-content">
            {title && <h2 className="section-main-heading research-cta-title">{title}</h2>}
            {desc && <p className="research-cta-desc hero-common-title">{desc}</p>}
            {btnLabel && (
              <Link href={btnUrl} className="btn-white">
                {btnLabel} <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
`;

  fs.writeFileSync(fullPath, code, 'utf8');
  console.log(`Cleaned CTA: ${file}`);
});

console.log('All CTA components cleaned successfully!');

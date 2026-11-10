const fs = require('fs');
const path = require('path');

const editorialFiles = [
  'app/automotives/sections/AutomotiveEditorialabout.jsx',
  'app/blog/sections/InsightsEditorial.jsx',
  'app/case-study/sections/InsightsEditorial.jsx',
  'app/case-study-details/sections/InsightsEditorial.jsx',
  'app/contact/sections/InsightsEditorial.jsx',
  'app/homesections/HomeInsightsEditorial.jsx',
  'app/primary-research/sections/PrimaryresEditorialAbout.jsx',
  'app/services/sections/InsightsEditorial.jsx',
  'app/telephonic-surveys/sections/InsightsEditorial.jsx',
  'app/work/sections/InsightsEditorial.jsx',
];

editorialFiles.forEach((file) => {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) return;

  const componentName = path.basename(file, '.jsx');

  const code = `'use client';

import React from 'react';

export default function ${componentName}({
  dynamicSection = null,
  kicker = null,
  title = null,
  paragraph1 = null,
  paragraph2 = null,
  paragraph3 = null,
}) {
  const displayKicker = dynamicSection?.kicker || kicker;
  const displayTitle = dynamicSection?.title || dynamicSection?.heading || title;
  const displayDesc = dynamicSection?.description || paragraph1;

  if (!displayTitle && !displayDesc) return null;

  return (
    <section className="insights-editorial-section">
      <div className="srcn-container">
        <div className="insights-editorial-box">
          {displayKicker && (
            <span
              className="sub-title-red"
              style={{ display: 'block', marginBottom: '12px' }}
            >
              {displayKicker}
            </span>
          )}
          {displayTitle && (
            <h2 className="insights-editorial-heading section-main-heading">
              {displayTitle}
            </h2>
          )}
          <div className="insights-editorial-text-wrap">
            {displayDesc && <p>{displayDesc}</p>}
            {paragraph2 && <p>{paragraph2}</p>}
            {paragraph3 && <p>{paragraph3}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
`;

  fs.writeFileSync(fullPath, code, 'utf8');
  console.log(`Cleaned Editorial: ${file}`);
});

console.log('All Editorial components cleaned successfully!');

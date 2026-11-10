'use client';

import React from 'react';

export default function HomeInsightsEditorial({
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

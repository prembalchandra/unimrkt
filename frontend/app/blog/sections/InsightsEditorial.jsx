import React from 'react';

export default function InsightsEditorial({
  dynamicEditorial = null,
  kicker = 'WHAT WE BELIEVE',
  title = 'Insights That Drive Smarter Business Decisions',
  paragraph1,
  paragraph2,
} = {}) {
  const displayKicker = dynamicEditorial?.kicker || kicker;
  const displayTitle = dynamicEditorial?.heading || dynamicEditorial?.title || title;
  const displayP1 = dynamicEditorial?.description || paragraph1;

  return (
    <section className="insights-editorial-section">
      <div className="srcn-container">
        <div className="insights-editorial-box">
          {displayKicker && <span className="sub-title-red">{displayKicker}</span>}
          <h2 className="insights-editorial-heading section-main-heading">
            {displayTitle}
          </h2>
          <div className="insights-editorial-text-wrap">
            {displayP1 ? (
              <p>{displayP1}</p>
            ) : (
              <>
                <p>
                  At Unimrkt Research, we believe that data without context is just noise. High-impact research
                  transforms numbers into actionable intelligence that empowers leaders to make strategic moves
                  with confidence. Whether entering new markets, launching products, or benchmarking competitors,
                  our comprehensive research methodologies deliver precision.
                </p>
                <p>
                  Backed by seasoned researchers, cutting-edge technology, and a global panel across 90+ countries,
                  we bridge the gap between curiosity and strategic execution. Every report, survey, and dataset
                  is rigorously validated to ensure reliable, high-integrity decision support.
                </p>
              </>
            )}
            {paragraph2 && <p>{paragraph2}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

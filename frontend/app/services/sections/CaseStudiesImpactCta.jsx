
'use client';

import React from 'react';
import Link from 'next/link';


export default function CaseStudiesImpactCta({
  badge = 'CASE STUDIES',
  title = 'Turning Research Into Real-World Impact',
  description = 'Explore how Unimrkt Research helps organizations uncover insights, solve complex business challenges and make more informed decisions through data-driven research.',
  buttonText = 'EXPLORE CASE STUDIES',
  buttonLink = '/case-study',
}) {
  return (
    <section
      className="case-impact-section"
      id="case-studies-impact"
      aria-labelledby="case-impact-title"
    >
      <div className="srcn-container">
        <div className="case-impact-banner">

          <div
            className="case-impact-dots-overlay"
            aria-hidden="true"
          />
          <div
            className="case-impact-waves-overlay"
            aria-hidden="true"
          />
          <div className="case-impact-grid">
            <div className="case-impact-left">

              <span className="case-impact-badge">
                {badge}
              </span>

              <h2
                className="case-impact-title"
                id="case-impact-title"
              >
                {title}
              </h2>
              <p className="case-impact-desc">
                {description}
              </p>
              <Link
                href={buttonLink}
                className="case-impact-btn"
              >
                <span>{buttonText}</span>
                <svg
                  className="case-btn-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>

            </div>
            <div className="case-impact-right">
              <div className="case-impact-composite">
                <div className="case-stats-row">
                  <div className="case-stat-box case-stat-dark">
                    <div className="case-stat-content">
                      <div className="stat-big-num">
                        50k +
                      </div>

                      <div className="stat-headline">
                        Projects Delivered
                      </div>
                    </div>
                    <p className="stat-caption">
                      Delivering impactful research across diverse
                      markets
                    </p>

                  </div>
                  <div className="case-stat-box case-stat-light">
                    <div className="stat-big-num">
                      500+
                    </div>
                    <div className="stat-headline">
                      Clients Served Across Diverse Industries
                    </div>
                  </div>
                </div>
                <div className="case-man-visual-card">

                  <div
                    className="case-visual-dots"
                    aria-hidden="true"
                  />

                  <div
                    className="case-visual-waves"
                    aria-hidden="true"
                  />
                </div>
                <div className="case-man-image-layer">
                  <div className="case-man-image-wrapper">
                    <img
                      src="/asstes/images/case-study-man-img.webp"
                      alt="Unimrkt Research Analyst"
                      className="case-man-img"
                      loading="lazy"
                    />
                    <div className="case-floating-chart-badge">
                      <div className="chart-badge-header">
                        <span className="chart-badge-label">
                          CASE STUDIES ANALYSIS
                        </span>
                        <span className="chart-badge-value">
                          50K
                        </span>
                      </div>
                      <div
                        className="chart-badge-bars"
                        aria-hidden="true"
                      >

                        <div className="chart-bar-column">
                          <span
                            className="bar bar-fuchsia"
                            style={{ height: '12px' }}
                          />
                          <span
                            className="bar bar-orange"
                            style={{ height: '16px' }}
                          />
                        </div>

                        <div className="chart-bar-column">
                          <span
                            className="bar bar-indigo"
                            style={{ height: '10px' }}
                          />
                          <span
                            className="bar bar-pink"
                            style={{ height: '14px' }}
                          />
                          <span
                            className="bar bar-orange"
                            style={{ height: '12px' }}
                          />
                        </div>

                        <div className="chart-bar-column">
                          <span
                            className="bar bar-indigo"
                            style={{ height: '8px' }}
                          />
                          <span
                            className="bar bar-purple"
                            style={{ height: '10px' }}
                          />
                          <span
                            className="bar bar-orange"
                            style={{ height: '20px' }}
                          />
                        </div>

                        <div className="chart-bar-column">
                          <span
                            className="bar bar-indigo"
                            style={{ height: '16px' }}
                          />
                          <span
                            className="bar bar-pink"
                            style={{ height: '8px' }}
                          />
                          <span
                            className="bar bar-orange"
                            style={{ height: '12px' }}
                          />
                        </div>
                        <div className="chart-bar-column">
                          <span
                            className="bar bar-indigo"
                            style={{ height: '22px' }}
                          />
                          <span
                            className="bar bar-pink"
                            style={{ height: '10px' }}
                          />
                          <span
                            className="bar bar-orange"
                            style={{ height: '12px' }}
                          />
                        </div>
                        <div className="chart-bar-column">
                          <span
                            className="bar bar-purple"
                            style={{ height: '8px' }}
                          />
                          <span
                            className="bar bar-orange"
                            style={{ height: '14px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';

const caseStudies = [
  {
    id: 1,
    title: 'Vehicle Product Acceptance Study Through Car Clinics',
    image: '/asstes/images/automotive-success-story-1.webp',
    link: '/case-study-details',
  },
  {
    id: 2,
    title: 'Future Mobility & Car Design Preference Research',
    image: '/asstes/images/automotive-success-story-2.webp',
    link: '/case-study-details',
  },
];

export default function AutomotiveOverview() {
  return (
    <section className="auto-success-section">
      <div className="srcn-container">
        <div className="auto-success-grid">
          {/* Left Column: Heading & CTA */}
          <div className="auto-success-info">
            <span className="auto-success-eyebrow">CASE STUDIES</span>
            <h2 className="auto-success-title">
              Automotive<br />Success Stories
            </h2>
            <p className="auto-success-desc">
              Discover how our research empowers automotive brands with actionable insights, smarter decisions, and measurable business growth.
            </p>
            <Link href="/contact" className="auto-success-btn">
              <span>TALK TO OUR EXPERTS</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="2" y1="12" x2="12" y2="2" />
                <polyline points="4 2 12 2 12 10" />
              </svg>
            </Link>
          </div>

          {/* Right Column: 2 Case Study Cards */}
          <div className="auto-success-cards">
            {caseStudies.map((study) => (
              <Link
                key={study.id}
                href={study.link}
                className="auto-success-card"
              >
                <div className="auto-success-card-img-wrap">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="auto-success-card-img"
                  />
                </div>
                <div className="auto-success-card-content">
                  <h3 className="auto-success-card-title">{study.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

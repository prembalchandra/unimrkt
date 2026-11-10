'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';
import Link from 'next/link';

export default function AutomotiveOverview({ caseStudies = [], kicker, title, description }) {
  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <section className="auto-success-section">
      <div className="srcn-container">
        <div className="auto-success-grid">
          {/* Left Column: Heading & CTA */}
          <div className="auto-success-info">
            <span className="auto-success-eyebrow">{kicker}</span>
            <h2 className="auto-success-title">
              {title}
            </h2>
            <p className="auto-success-desc">
              {description}
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

          {/* Right Column: Case Study Cards */}
          <div className="auto-success-cards">
            {caseStudies.map((study, idx) => (
              <Link
                key={study.id || idx}
                href={study.slug ? `/case-study-details?slug=${study.slug}` : (study.link || '/case-study')}
                className="auto-success-card"
              >
                <div className="auto-success-card-img-wrap">
                  <img
                    src={study.thumbnail?.url || study.image || getStrapiMedia('/uploads/automotive-success-story-1.png')}
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

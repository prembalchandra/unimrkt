'use client';

import React from 'react';
import Link from 'next/link';

const defaultImages = [
  '/asstes/images/customer-experience-img.png',
  '/asstes/images/brand-research-img.png',
  '/asstes/images/brand-research-img2.png',
  '/asstes/images/b2b-research-img.png',
  '/asstes/images/B2B-Research2.png',
  '/asstes/images/employee-research-img.png',
];

export default function TelephonicCanMeasure({ items = [], dynamicSection = null }) {
  if (!items || items.length === 0) return null;

  const displayKicker = dynamicSection?.kicker || 'WHAT WE MEASURE';
  const displayTitle = dynamicSection?.heading || dynamicSection?.title || 'What Telephonic Surveys Can Measure';
  const displayDesc = dynamicSection?.description || 'Telephonic surveys allow direct, structured conversations across various business and research needs.';

  return (
    <section className="primary-services-section">
      <div className="srcn-container">
        <div className="primary-services-header">
          <span className="primary-services-kicker">{displayKicker}</span>
          <h2 className="primary-services-title">{displayTitle}</h2>
          <p className="primary-services-desc">
            {displayDesc}
          </p>
        </div>

        <div className="primary-services-grid">
          {items.map((service, index) => (
            <Link
              href={service.href || '/services'}
              className="primary-service-card"
              key={service.id || index}
              aria-label={`${service.title}: ${service.description || service.desc}`}
            >
              <img
                src={service.image || service.iconClass || defaultImages[index % defaultImages.length]}
                alt={service.alt || service.title}
                className="primary-service-card-img"
                loading="lazy"
              />

              <div className="primary-service-card-overlay" aria-hidden="true" />

              <div className="primary-service-card-body">
                <h3 className="primary-service-card-title">{service.title}</h3>
                <p className="primary-service-card-desc">{service.description || service.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

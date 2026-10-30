'use client';

import React from 'react';
import Link from 'next/link';

const telephonicCanMeasure = [
  {
    id: 1,
    title: 'Customer Experience',
    description: 'Measure CSAT, NPS, and touchpoints to improve retention.',
    image: '/asstes/images/customer-experience-img.webp',
    alt: 'Customer Experience',
    href: '/services/customer-experience',
  },
  {
    id: 2,
    title: 'Brand Research',
    description: 'Track brand perception, sentiment, and market positioning.',
    image: '/asstes/images/brand-research-img.webp',
    alt: 'Brand Research',
    href: '/services/brand-research',
  },
  {
    id: 3,
    title: 'Brand Research',
    description: 'Evaluate brand awareness, consumer affinity, and loyalty.',
    image: '/asstes/images/brand-research-img2.webp',
    alt: 'Brand Research',
    href: '/services/brand-research-2',
  },
  {
    id: 4,
    title: 'Product Research',
    description: 'Evaluate feature adoption, usability feedback, and readiness.',
    image: '/asstes/images/b2b-research-img.webp',
    alt: 'Product Research',
    href: '/services/product-research',
  },
  {
    id: 5,
    title: 'B2B Research',
    description: 'Engage decision-makers and high-level enterprise accounts.',
    image: '/asstes/images/B2B-Research2.webp',
    alt: 'B2B Research',
    href: '/services/b2b-research',
  },
  {
    id: 6,
    title: 'Employee Research',
    description: 'Gather honest workplace sentiment and employee engagement.',
    image: '/asstes/images/employee-research-img.webp',
    alt: 'Employee Research',
    href: '/services/employee-research',
  },
];

export default function TelephonicCanMeasure() {
  return (
    <section className="measure-section" id="survey-capabilities">
      <div className="srcn-container">
        {/* Header */}
        <div className="measure-header">
          <span className="measure-kicker">WHAT WE CAN MEASURE</span>
          <h2 className="measure-title">Ask. Listen. Understand.</h2>
          <p className="measure-subtext">
            From brand perception to customer experience, our telephonic surveys
            help uncover the answers behind the numbers.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="measure-cards-grid">
          {telephonicCanMeasure.map((service) => (
            <Link
              href={service.href}
              className="primary-service-card"
              key={service.id}
            >
              <img
                src={service.image}
                alt={service.alt}
                className="primary-service-card-img"
                loading="lazy"
              />

              <div
                className="primary-service-card-overlay"
                aria-hidden="true"
              />

              <div className="primary-service-card-body">
                <h3 className="primary-service-card-title">
                  {service.title}
                </h3>

                <p className="primary-service-card-desc">
                  {service.description}
                </p>

                <div className="primary-service-card-btn-wrap btn-sm">
                  <span
                    className="primary-service-card-btn"
                    aria-hidden="true"
                  >
                    <img
                      src="/asstes/images/icon/arrow-right-icon-img.png"
                      alt="Arrow Right"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
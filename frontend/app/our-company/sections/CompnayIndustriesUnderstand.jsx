import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';
import Link from 'next/link';

export default function CompnayIndustriesUnderstand({
  industries = [],
  dynamicSection = null,
  kicker,
  title,
  description,
}) {
  const displayKicker = dynamicSection?.kicker || kicker;
  const displayTitle = dynamicSection?.heading || dynamicSection?.title || title;
  const displayDesc = dynamicSection?.description || description;

  if (!industries || industries.length === 0) return null;

  return (
    <section className="primary-services-section">
      <div className="srcn-container">
        <div className="primary-services-header">
          <span className="primary-services-kicker">
            {displayKicker}
          </span>

          <h2 className="primary-services-title">
            {displayTitle}
          </h2>

          <p className="primary-services-desc">
            {displayDesc}
          </p>
        </div>

        <div className="primary-services-grid">
          {industries.map((item, idx) => (
            <Link
              href={item.slug ? `/industries` : '/services'}
              className="primary-service-card"
              key={item.id || item.title || idx}
              aria-label={`${item.title}: ${item.description || item.shortDescription}`}
            >
              <img
                src={item.thumbnail?.url || item.image || item.iconClass || getStrapiMedia('/uploads/automotive-card-img.png')}
                alt={item.title}
                className="primary-service-card-img"
                loading="lazy"
              />

              <div
                className="primary-service-card-overlay"
                aria-hidden="true"
              />

              <div className="primary-service-card-body">
                <h3 className="primary-service-card-title">
                  {item.title}
                </h3>

                <p className="primary-service-card-desc">
                  {item.description || item.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

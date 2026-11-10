import React from 'react';
import Link from 'next/link';

export default function CompnayIndustriesUnderstand({ industries = [] }) {
  if (!industries || industries.length === 0) return null;

  return (
    <section className="primary-services-section">
      <div className="srcn-container">
        <div className="primary-services-header">
          <span className="primary-services-kicker">
            INDUSTRIES WE UNDERSTAND
          </span>

          <h2 className="primary-services-title">
            Deep Knowledge Across Diverse Industries
          </h2>

          <p className="primary-services-desc">
            Industry-specific expertise that helps us understand complex
            markets and deliver insights that drive informed business decisions.
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
                src={item.thumbnail?.url || item.image || item.iconClass || '/asstes/images/automotive-card-img.png'}
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

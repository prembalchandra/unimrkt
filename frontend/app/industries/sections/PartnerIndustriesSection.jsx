import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function PartnerIndustriesSection({
  features = [],
  kicker = null,
  heading = null,
  description = null,
  dynamicSection = null,
}) {
  const displayKicker = dynamicSection?.kicker || kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || heading;
  const displayDesc = dynamicSection?.description || description;
  const list = dynamicSection?.values || dynamicSection?.cards || (features && features.length > 0 ? features : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="partner-industries-section" id="partner-industries">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="industries-showcase-header section-header-area">
            {displayKicker && (
              <span className="industries-showcase-kicker career-values-kicker">
                {displayKicker}
              </span>
            )}
            {displayHeading && (
              <h2 className="industries-showcase-heading section-main-heading">
                {displayHeading}
              </h2>
            )}
            {displayDesc && (
              <p className="industries-showcase-desc industries-expertise-desc">
                {displayDesc}
              </p>
            )}
          </div>
        )}
        {list.length > 0 && (
          <div className="partner-industries-grid">
            {list.map((item, index) => {
              const iconSrc = getStrapiMedia(item.icon || item.image);
              return (
                <article key={item.id || index} className="partner-industry-card">
                  {iconSrc && (
                    <div className="partner-industry-icon-wrap">
                      <img src={iconSrc} alt={item.title || ''} loading="lazy" />
                    </div>
                  )}
                  {item.title && <h3 className="partner-industry-title">{item.title}</h3>}
                  {(item.desc || item.description) && (
                    <p className="partner-industry-desc">{item.desc || item.description}</p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

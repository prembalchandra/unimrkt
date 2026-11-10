'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function CompanyOverview({ pillars = [], kicker = null, heading = null, description = null, dynamicSection = null }) {
  const displayKicker = dynamicSection?.kicker || kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || heading;
  const displayDesc = dynamicSection?.description || description;
  const list = dynamicSection?.values || dynamicSection?.cards || (pillars && pillars.length > 0 ? pillars : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="research-value-section">
      <div className="srcn-container">
        <div className="research-value-wrap">
          {(displayKicker || displayHeading || displayDesc) && (
            <div className="research-value-header">
              {displayKicker && <span className="research-value-kicker career-values-kicker">{displayKicker}</span>}
              {displayHeading && <h2 className="research-value-title section-main-heading">{displayHeading}</h2>}
              {displayDesc && <p>{displayDesc}</p>}
            </div>
          )}
          {list.length > 0 && (
            <div className="research-value-grid">
              {list.map((pillar, idx) => {
                const iconSrc = getStrapiMedia(pillar.icon || pillar.image);
                return (
                  <article key={pillar.id || idx} className="research-value-card">
                    {iconSrc && (
                      <div className="value-icon-wrap">
                        <img src={iconSrc} alt={pillar.title || ''} />
                      </div>
                    )}
                    {pillar.title && <h3>{pillar.title}</h3>}
                    {(pillar.desc || pillar.description) && <p>{pillar.desc || pillar.description}</p>}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

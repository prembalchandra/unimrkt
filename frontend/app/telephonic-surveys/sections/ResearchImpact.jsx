'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function ResearchImpact({ dynamicSection = null, impacts = [] }) {
  const displayKicker = dynamicSection?.kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title;
  const displayDesc = dynamicSection?.description;
  const list = dynamicSection?.values || dynamicSection?.metrics || (impacts && impacts.length > 0 ? impacts : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="research-impact-section">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="research-impact-header section-header-area">
            {displayKicker && <span className="research-impact-kicker career-values-kicker">{displayKicker}</span>}
            {displayHeading && <h2 className="research-impact-heading section-main-heading">{displayHeading}</h2>}
            {displayDesc && <p className="research-impact-desc">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="research-impact-grid">
            {list.map((item, index) => {
              const iconSrc = getStrapiMedia(item.icon || item.image);
              return (
                <article key={item.id || index} className="research-impact-card">
                  {iconSrc && (
                    <div className="research-impact-icon-wrap">
                      <img src={iconSrc} alt={item.title || ''} />
                    </div>
                  )}
                  {item.title && <h3>{item.title}</h3>}
                  {(item.desc || item.description) && <p>{item.desc || item.description}</p>}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

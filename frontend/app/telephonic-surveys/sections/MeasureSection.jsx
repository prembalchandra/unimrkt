'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function MeasureSection({ dynamicSection = null, items = [] }) {
  const displayKicker = dynamicSection?.kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title;
  const displayDesc = dynamicSection?.description;
  const list = dynamicSection?.values || dynamicSection?.metrics || (items && items.length > 0 ? items : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="measure-section">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="measure-header section-header-area">
            {displayKicker && <span className="measure-kicker career-values-kicker">{displayKicker}</span>}
            {displayHeading && <h2 className="measure-heading section-main-heading">{displayHeading}</h2>}
            {displayDesc && <p className="measure-desc">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="measure-grid">
            {list.map((item, index) => {
              const iconSrc = getStrapiMedia(item.icon || item.image);
              return (
                <article key={item.id || index} className="measure-card">
                  {iconSrc && (
                    <div className="measure-icon-wrap">
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

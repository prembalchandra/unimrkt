'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function QualityFirst({ dynamicValues = null, items = [] }) {
  const displayKicker = dynamicValues?.kicker;
  const displayHeading = dynamicValues?.heading || dynamicValues?.title;
  const displayDesc = dynamicValues?.description;
  const list = dynamicValues?.values || dynamicValues?.cards || (items && items.length > 0 ? items : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="quality-first-section">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="quality-first-header">
            {displayKicker && <span className="quality-first-kicker sub-title-red">{displayKicker}</span>}
            {displayHeading && <h2 className="quality-first-title">{displayHeading}</h2>}
            {displayDesc && <p className="quality-first-desc">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="quality-first-grid">
            {list.map((item, index) => {
              const iconSrc = getStrapiMedia(item.icon || item.image);
              return (
                <article key={item.id || index} className="quality-first-card">
                  {iconSrc && (
                    <div className="quality-first-icon-box">
                      <img src={iconSrc} alt={item.title || ''} />
                    </div>
                  )}
                  <div className="quality-first-content">
                    {item.title && <h3>{item.title}</h3>}
                    {(item.desc || item.description) && <p>{item.desc || item.description}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

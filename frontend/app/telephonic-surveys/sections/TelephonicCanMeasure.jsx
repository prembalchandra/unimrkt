'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function TelephonicCanMeasure({ dynamicMetrics = null, items = [] }) {
  const displayKicker = dynamicMetrics?.kicker;
  const displayHeading = dynamicMetrics?.heading || dynamicMetrics?.title;
  const displayDesc = dynamicMetrics?.description;
  const list = dynamicMetrics?.metrics || dynamicMetrics?.values || (items && items.length > 0 ? items : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="telephonic-measure-section">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="telephonic-measure-header">
            {displayKicker && <span className="telephonic-measure-kicker sub-title-red">{displayKicker}</span>}
            {displayHeading && <h2 className="telephonic-measure-title">{displayHeading}</h2>}
            {displayDesc && <p className="telephonic-measure-desc">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="telephonic-measure-grid">
            {list.map((item, index) => {
              const iconSrc = getStrapiMedia(item.icon || item.image);
              return (
                <article key={item.id || index} className="telephonic-measure-card">
                  {iconSrc && (
                    <div className="telephonic-measure-icon-box">
                      <img src={iconSrc} alt={item.title || item.label || ''} />
                    </div>
                  )}
                  <div className="telephonic-measure-card-content">
                    {(item.title || item.label) && <h3>{item.title || item.label}</h3>}
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

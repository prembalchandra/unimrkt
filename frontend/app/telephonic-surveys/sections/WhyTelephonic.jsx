'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function WhyTelephonic({ dynamicValues = null, reasons = [] }) {
  const displayKicker = dynamicValues?.kicker;
  const displayHeading = dynamicValues?.heading || dynamicValues?.title;
  const list = dynamicValues?.values || dynamicValues?.cards || (reasons && reasons.length > 0 ? reasons : []);

  if (!displayHeading && list.length === 0) return null;

  return (
    <section className="why-telephonic-section approach-section">
      <div className="srcn-container">
        <div className="why-telephonic-container">
          {(displayKicker || displayHeading) && (
            <div className="why-telephonic-header career-journey-header">
              {displayKicker && (
                <span className="why-telephonic-kicker career-values-kicker career-journey-kicker">
                  {displayKicker}
                </span>
              )}
              {displayHeading && (
                <h2 className="why-telephonic-title approach-title section-main-heading">
                  {displayHeading}
                </h2>
              )}
            </div>
          )}

          {list.length > 0 && (
            <div className="why-telephonic-grid approach-grid">
              {list.map((r, i) => {
                const iconSrc = getStrapiMedia(r.icon || r.image);
                return (
                  <article key={r.id || i} className="why-telephonic-card approach-card career-journey-step">
                    <div className="why-telephonic-card-area">
                      {iconSrc && (
                        <div className="why-telephonic-icon approach-icon career-journey-icon">
                          <img src={iconSrc} alt={r.title || ''} />
                        </div>
                      )}
                      <div className="why-telephonic-card-content">
                        {r.title && <h3>{r.title}</h3>}
                        {(r.desc || r.description) && <p>{r.desc || r.description}</p>}
                      </div>
                    </div>
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

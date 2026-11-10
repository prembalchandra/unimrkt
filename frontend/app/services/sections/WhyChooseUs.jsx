'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function WhyChooseUs({ items = [], title = null, description = null, dynamicSection = null }) {
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || title;
  const displayDesc = dynamicSection?.description || description;
  const list = dynamicSection?.values || dynamicSection?.cards || (items && items.length > 0 ? items : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="why-choose-unimrkt-section">
      <div className="srcn-container">
        {(displayHeading || displayDesc) && (
          <div className="why-choose-header">
            {displayHeading && <h2 className="why-choose-title">{displayHeading}</h2>}
            {displayDesc && <p className="why-choose-desc">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="why-choose-grid">
            {list.map((item, index) => {
              const iconSrc = getStrapiMedia(item.icon || item.image);
              return (
                <article className="why-choose-card" key={item.id || index}>
                  {iconSrc && (
                    <div className="why-choose-icon-box">
                      <img
                        src={iconSrc}
                        alt={item.label || item.title || ''}
                        width={40}
                        height={40}
                        className="why-choose-icon"
                      />
                    </div>
                  )}

                  <div className="why-choose-content">
                    {(item.number || item.stat || item.title) && (
                      <span className="why-choose-stat">{item.number || item.stat || item.title}</span>
                    )}
                    {(item.label || item.desc || item.description) && (
                      <span className="why-choose-label">{item.label || item.desc || item.description}</span>
                    )}
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

'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function CompnayOurValues({ values = [], kicker = null, heading = null, description = null, dynamicSection = null }) {
  const displayKicker = dynamicSection?.kicker || kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || heading;
  const displayDesc = dynamicSection?.description || description;
  const list = dynamicSection?.values || dynamicSection?.cards || (values && values.length > 0 ? values : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="our-unimrkt-research-area">
      <div className="our-unimrkt-research-banner" aria-hidden="true" />
      <div className="srcn-container">
        <div className="our-unimrkt-research-wrapper-inner">
          {(displayKicker || displayHeading || displayDesc) && (
            <div className="our-unimrkt-research-top-content primary-services-header">
              {displayKicker && <span className="our-unimrkt-research-sub-title">{displayKicker}</span>}
              {displayHeading && <h2 className="our-unimrkt-research-main-heading section-main-heading">{displayHeading}</h2>}
              {displayDesc && <p className="our-unimrkt-research-title">{displayDesc}</p>}
            </div>
          )}

          {list.length > 0 && (
            <div className="our-values-grid">
              {list.map((item, index) => {
                const iconSrc = getStrapiMedia(item.icon || item.image);
                return (
                  <div className="our-unimrkt-research-card-col" key={item.id || index}>
                    <div className="our-unimrkt-research-card">
                      {iconSrc && (
                        <div className="our-unimrkt-research-icon-box">
                          <img src={iconSrc} alt={item.title || ''} loading="lazy" />
                        </div>
                      )}
                      <div className="our-unimrkt-research-content">
                        {item.title && <h3>{item.title}</h3>}
                        {(item.desc || item.description) && <p>{item.desc || item.description}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

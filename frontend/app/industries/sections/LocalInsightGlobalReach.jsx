
'use client';

import React from 'react';
import { getStrapiMedia } from '../../../lib/strapi';

export default function LocalInsightGlobalReach({
  stats = [],
  kicker = null,
  heading = null,
  description = null,
  dynamicSection = null,
}) {
  const displayKicker = dynamicSection?.kicker || kicker;
  const displayHeading =
    dynamicSection?.heading ||
    dynamicSection?.title ||
    heading;

  const displayDescription =
    dynamicSection?.description || description;

  const displayStats =
    dynamicSection?.stats?.length > 0
      ? dynamicSection.stats
      : stats;

  if (
    !displayKicker &&
    !displayHeading &&
    !displayDescription &&
    (!displayStats || displayStats.length === 0)
  ) {
    return null;
  }

  return (
    <section
      className="global-reach-dark-section"
      id="global-reach"
    >
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDescription) && (
          <div className="global-reach-header section-header-area">
            {displayKicker && (
              <span className="global-reach-kicker career-values-kicker">
                {displayKicker}
              </span>
            )}

            {displayHeading && (
              <h2 className="global-reach-heading section-main-heading">
                {displayHeading}
              </h2>
            )}

            {displayDescription && (
              <p className="global-reach-desc industries-expertise-desc">
                {displayDescription}
              </p>
            )}

          </div>
        )}

        {/* Dynamic Statistics */}
        {displayStats?.length > 0 && (
          <div className="global-reach-grid">

            {displayStats.map((item, index) => {
              const icon = getStrapiMedia(
                item.icon || item.image
              );

              const stat = item.stat || item.number;

              return (
                <article
                  key={item.id || item.documentId || index}
                  className="global-reach-card"
                >

                  {icon && (
                    <div className="global-reach-icon-wrap">
                      <img
                        src={icon}
                        alt={
                          item.icon?.alternativeText ||
                          item.label ||
                          ''
                        }
                        loading="lazy"
                      />
                    </div>
                  )}

                  {stat && (
                    <h3 className="global-reach-stat">
                      {stat}
                    </h3>
                  )}

                  {item.label && (
                    <p className="global-reach-label">
                      {item.label}
                    </p>
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

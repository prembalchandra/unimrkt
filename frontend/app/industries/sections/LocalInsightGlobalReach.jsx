'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

const defaultStats = [
  {
    id: 1,
    stat: '50+',
    label: 'Countries Covered',
    icon: '/uploads/industries_icon_stat_world_719c98048f.svg',
  },
  {
    id: 2,
    stat: '22+',
    label: 'Languages Supported',
    icon: '/uploads/industries_icon_stat_communications_eac0fb3a23.svg',
  },
  {
    id: 3,
    stat: '4M+',
    label: 'Global Panelists',
    icon: '/uploads/industries_icon_stat_global_network_289b3bf784.svg',
  },
  {
    id: 4,
    stat: 'Multi-Industry',
    label: 'Domain Expertise',
    icon: '/uploads/industries_icon_stat_search_40727a6f43.svg',
  },
];

export default function LocalInsightGlobalReach({
  stats = [],
  kicker = null,
  heading = null,
  description = null,
  dynamicSection = null,
}) {
  const displayKicker =
    dynamicSection?.kicker || kicker || 'Beyond Industries';
  const displayHeading =
    dynamicSection?.heading ||
    dynamicSection?.title ||
    heading ||
    'Local Insight. Global Reach.';
  const displayDescription =
    dynamicSection?.description ||
    description ||
    'Unimrkt delivers research across 90+ countries and 22+ languages, combining deep local understanding with a global perspective.';

  const rawStats =
    dynamicSection?.stats?.length > 0
      ? dynamicSection.stats
      : dynamicSection?.metrics?.length > 0
      ? dynamicSection.metrics
      : stats?.length > 0
      ? stats
      : [];

  const displayStats = rawStats.length > 0 ? rawStats : defaultStats;

  return (
    <section className="global-reach-dark-section" id="global-reach">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDescription) && (
          <div
            className="section-header-area text-center"
            style={{ maxWidth: 940, margin: '0 auto 48px' }}
          >
            {displayKicker && (
              <span className="career-values-kicker" style={{ color: '#ffffff' }}>
                {displayKicker}
              </span>
            )}
            {displayHeading && (
              <h2 className="section-main-heading" style={{ color: '#ffffff' }}>
                {displayHeading}
              </h2>
            )}
            {displayDescription && (
              <p
                className="section-sub-text"
                style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0 auto' }}
              >
                {displayDescription}
              </p>
            )}
          </div>
        )}

        {/* 4 Circular Statistics */}
        {displayStats?.length > 0 && (
          <div className="global-reach-grid">
            {displayStats.map((item, index) => {
              const icon =
                getStrapiMedia(item.icon || item.image) ||
                (defaultStats[index] && defaultStats[index].icon);
              const statVal = item.stat || item.number || item.value;

              return (
                <article key={item.id || index} className="global-reach-card">
                  {icon && (
                    <div className="global-reach-icon-wrap">
                      <img src={icon} alt={item.label || ''} loading="lazy" />
                    </div>
                  )}
                  {statVal && (
                    <div className="global-reach-number">{statVal}</div>
                  )}
                  {item.label && (
                    <p className="global-reach-label">{item.label}</p>
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

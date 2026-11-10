'use client';

import React from 'react';

const defaultIcons = [
  '/asstes/images/icon/countries-covered-icon-img.png',
  '/asstes/images/icon/languages-supported-icon-img.png',
  '/asstes/images/icon/global-regions-icon-img.png',
  '/asstes/images/icon/multi-industry-icon-img.png',
];

export default function LocalInsightGlobalReach({ stats = [], kicker, heading, description }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="global-reach-dark-section" id="global-reach">
      <div className="srcn-container">
        <div className="global-reach-header section-header-area">
          <span className="global-reach-kicker career-values-kicker">{kicker || 'Beyond Industries'}</span>
          <h2 className="global-reach-heading section-main-heading">{heading || 'Local Insight. Global Reach.'}</h2>
          <p className="global-reach-desc industries-expertise-desc">
            {description || 'Unimrkt delivers research across 90+ countries and 22+ languages, combining deep local understanding with a global perspective. Our international research capabilities help businesses understand diverse markets, audiences and industry dynamics with confidence.'}
          </p>
        </div>
        <div className="global-reach-grid">
          {stats.map((item, index) => (
            <article key={item.id || index} className="global-reach-card">
              <div className="global-reach-icon-wrap">
                <img src={item.icon || item.iconClass || defaultIcons[index % defaultIcons.length]} alt={item.label} loading="lazy" />
              </div>
              <h3 className="global-reach-stat">{item.stat || item.number}</h3>
              <p className="global-reach-label">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

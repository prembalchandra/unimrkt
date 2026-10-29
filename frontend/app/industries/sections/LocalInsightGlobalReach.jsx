'use client';

import React from 'react';

const statsData = [
  {
    id: 1,
    icon: '/asstes/images/icon/countries-covered-icon-img.png',
    stat: '90+',
    label: 'Countries Worldwide',
  },
  {
    id: 2,
    icon: '/asstes/images/icon/languages-supported-icon-img.png',
    stat: '25+',
    label: 'Languages Supported',
  },
  {
    id: 3,
    icon: '/asstes/images/icon/global-regions-icon-img.png',
    stat: '4',
    label: 'Global Offices',
  },
  {
    id: 4,
    icon: '/asstes/images/icon/multi-industry-icon-img.png',
    stat: 'Multi-Industry',
    label: 'Domain Expertise',
  },
];

export default function LocalInsightGlobalReach() {
  return (
    <section className="global-reach-dark-section" id="global-reach">
      <div className="srcn-container">
        <div className="global-reach-header section-header-area">
          <span className="global-reach-kicker career-values-kicker">Beyond Industries</span>
          <h2 className="global-reach-heading section-main-heading">Local Insight. Global Reach.</h2>
          <p className="global-reach-desc industries-expertise-desc">
           Unimrkt delivers research across 90+ countries and 22+ languages, combining deep local understanding with a global perspective. Our international research capabilities help businesses understand diverse markets, audiences and industry dynamics with confidence.
          </p>
        </div>
        <div className="global-reach-grid">
          {statsData.map((item) => (
            <article key={item.id} className="global-reach-card">
              <div className="global-reach-icon-wrap">
                <img src={item.icon} alt={item.label} loading="lazy" />
              </div>
              <h3 className="global-reach-stat">{item.stat}</h3>
              <p className="global-reach-label">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

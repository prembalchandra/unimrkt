'use client';

import React from 'react';

const challengesData = [
  {
    id: 1,
    icon: '/asstes/images/icon/consumer-preferences-icon-img.png',
    title: 'Consumer Preferences',
    desc: 'Understand evolving buying behavior, ownership trends, and customer expectations.',
  },
  {
    id: 2,
    icon: '/asstes/images/icon/future-mobility-icon-img.png',
    title: 'EV & Future Mobility',
    desc: 'Track electric vehicle adoption, charging infrastructure, and emerging mobility trends.',
  },
  {
    id: 3,
    icon: '/asstes/images/icon/competitive-intelligence-icon-img2.png',
    title: 'Competitive Intelligence',
    desc: 'Monitor competitors, pricing strategies, product launches, and market positioning.',
  },
  {
    id: 4,
    icon: '/asstes/images/icon/market-dynamic-icon-img.png',
    title: 'Regulatory & Market Dynamics',
    desc: 'Stay informed about policy changes, sustainability initiatives, and industry developments.',
  },
];

export default function AutomotiveChallengesDark() {
  return (
    <section className="auto-challenges-dark-section" id="auto-challenges">
      <div  className='auto-challenges-dark-overlay'></div>
      <div className="srcn-container">
        <div className="auto-challenges-header">
          <span className="auto-challenges-kicker">Business Challenges We Cover</span>
          <h2 className="auto-challenges-heading">Key Challenges We Solve</h2>
          <p className="auto-challenges-desc">
           The automotive industry is rapidly evolving with technological advancements, changing consumer expectations, and increasing regulatory demands. Unimrkt Research helps businesses overcome these challenges through reliable market intelligence and actionable insights.
          </p>
        </div>
        <div className="auto-challenges-grid">
          {challengesData.map((item) => (
            <article key={item.id} className="auto-challenge-card">
              <div className="auto-challenge-icon-wrap">
                <img src={item.icon} alt={item.title} loading="lazy" />
              </div>
              <h3 className="auto-challenge-title">{item.title}</h3>
              <p className="auto-challenge-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

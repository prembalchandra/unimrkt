'use client';

import React from 'react';

const defaultIcons = [
  '/asstes/images/icon/global-regional-markets-icon-img.png',
  '/asstes/images/icon/diverse-audiences-icon-img.png',
  '/asstes/images/icon/multiple-industries-icon-img.png',
  '/asstes/images/icon/multiple-research-methods-icon.png',
];

export default function ResearchReachSection({ data = {} }) {
  if (!data) return null;

  const kicker = data.kicker || 'OUR COVERAGE';
  const heading = data.heading || data.title || 'Research Reach That Goes Beyond Markets';
  const description =
    data.description ||
    'Our research capabilities span markets, industries, audiences and geographies, helping businesses build a deeper understanding of the people, trends and opportunities that matter most.';
  const cards = data.cards && data.cards.length > 0 ? data.cards : [];

  return (
    <section className="research-reach-section" style={{ padding: '60px 0' }}>
      <div className="srcn-container">
        <div className="section-center-header section-header-area text-center" style={{ marginBottom: '40px' }}>
          {kicker && <span className="section-kicker-red career-values-kicker">{kicker}</span>}
          {heading && <h2 className="section-main-heading">{heading}</h2>}
          {description && <p className="section-sub-desc section-sub-text">{description}</p>}
        </div>

        {cards.length > 0 && (
          <div className="research-reach-grid">
            {cards.map((card, idx) => (
              <article key={idx} className="research-reach-card">
                <div className="reach-icon-wrap">
                  <img src={defaultIcons[idx % defaultIcons.length]} alt={card.title} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

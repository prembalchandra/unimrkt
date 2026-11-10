'use client';

import React from 'react';

export default function AutomotiveIntelligenceCards({ cards = [], heading, kicker }) {
  if (!cards || cards.length === 0) return null;

  return (
    <section className="auto-intelligence-section" id="auto-intelligence">
      <div className="srcn-container">
        <div className="auto-section-header">
          <span className="auto-section-kicker">{kicker || 'ACTIONABLE MARKET INTELLIGENCE'}</span>
          <h2 className="auto-section-heading">{heading || 'Accelerate Growth With Industry Intelligence'}</h2>
        </div>
        <div className="auto-intelligence-grid">
          {cards.map((card, idx) => (
            <article key={card.id || idx} className="auto-intel-card">
              <div className="auto-intel-img-wrap">
                <img src={card.image || card.iconClass || card.icon?.url || '/asstes/images/market-trends-card-img1.png'} alt={card.title} loading="lazy" />
              </div>
              <div className="auto-intel-body">
                <h3 className="auto-intel-title">{card.title}</h3>
                <p className="auto-intel-desc">{card.desc || card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

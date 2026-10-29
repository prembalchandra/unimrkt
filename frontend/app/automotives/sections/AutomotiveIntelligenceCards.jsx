'use client';

import React from 'react';

const intelligenceCards = [
  {
    id: 1,
    image: '/asstes/images/market-trends-card-img1.png',
    title: 'Vehicle Buyer Behavior',
    desc: 'Decoding consumer purchase drivers, EV price elasticity, brand perception, and post-purchase dealership experiences across key international demographics.',
  },
  {
    id: 2,
    image: '/asstes/images/market-trends-card-img2.png',
    title: 'Commercial Fleet Transition',
    desc: 'Forecasting fleet electrification pace, total cost of ownership (TCO) expectations, depot charging readiness, and telematics adoption hurdles.',
  },
  {
    id: 3,
    image: '/asstes/images/market-trends-card-img3.png',
    title: 'Connected Cockpit & ADAS',
    desc: 'Evaluating driver trust in autonomous safety systems, in-vehicle software usability, infotainment preferences, and subscription monetization models.',
  },
];

export default function AutomotiveIntelligenceCards() {
  return (
    <section className="auto-intelligence-section" id="auto-intelligence">

      <div className="srcn-container">
        <div className="auto-section-header">
          <span className="auto-section-kicker">ACTIONABLE MARKET INTELLIGENCE</span>
          <h2 className="auto-section-heading">Accelerate Growth With Industry Intelligence</h2>
        </div>
        <div className="auto-intelligence-grid">
          {intelligenceCards.map((card) => (
            <article key={card.id} className="auto-intel-card">
              <div className="auto-intel-img-wrap">
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>
              <div className="auto-intel-body">
                <h3 className="auto-intel-title">{card.title}</h3>
                <p className="auto-intel-desc">{card.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

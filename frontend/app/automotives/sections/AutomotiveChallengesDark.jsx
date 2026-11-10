'use client';

import React from 'react';

export default function AutomotiveChallengesDark({ challenges = [], heading, kicker, description }) {
  if (!challenges || challenges.length === 0) return null;

  return (
    <section className="auto-challenges-dark-section" id="auto-challenges">
      <div className="auto-challenges-dark-overlay"></div>
      <div className="srcn-container">
        <div className="auto-challenges-header">
          <span className="auto-challenges-kicker">{kicker || 'Business Challenges We Cover'}</span>
          <h2 className="auto-challenges-heading">{heading || 'Key Challenges We Solve'}</h2>
          <p className="auto-challenges-desc">
            {description || 'The automotive industry is rapidly evolving with technological advancements, changing consumer expectations, and increasing regulatory demands. Unimrkt Research helps businesses overcome these challenges through reliable market intelligence and actionable insights.'}
          </p>
        </div>
        <div className="auto-challenges-grid">
          {challenges.map((item, idx) => (
            <article key={item.id || idx} className="auto-challenge-card">
              <div className="auto-challenge-icon-wrap">
                <img src={item.icon || item.iconClass || '/asstes/images/icon/consumer-preferences-icon-img.png'} alt={item.title} loading="lazy" />
              </div>
              <h3 className="auto-challenge-title">{item.title}</h3>
              <p className="auto-challenge-desc">{item.desc || item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

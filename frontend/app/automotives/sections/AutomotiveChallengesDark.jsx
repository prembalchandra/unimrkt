'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function AutomotiveChallengesDark({ challenges = [], heading, kicker, description }) {
  if (!challenges || challenges.length === 0) return null;

  return (
    <section className="auto-challenges-dark-section" id="auto-challenges">
      <div className="auto-challenges-dark-overlay"></div>
      <div className="srcn-container">
        <div className="auto-challenges-header">
          <span className="auto-challenges-kicker">{kicker}</span>
          <h2 className="auto-challenges-heading">{heading}</h2>
          <p className="auto-challenges-desc">
            {description}
          </p>
        </div>
        <div className="auto-challenges-grid">
          {challenges.map((item, idx) => (
            <article key={item.id || idx} className="auto-challenge-card">
              <div className="auto-challenge-icon-wrap">
                <img src={item.icon || item.iconClass || getStrapiMedia('/uploads/consumer-preferences-icon-img.png')} alt={item.title} loading="lazy" />
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

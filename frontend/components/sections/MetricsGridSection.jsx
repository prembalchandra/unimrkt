'use client';

import React from 'react';

export default function MetricsGridSection({ data = {} }) {
  if (!data) return null;

  const kicker = data.kicker || 'GLOBAL REACH';
  const heading = data.heading || 'Research Excellence at Scale';
  const description = data.description || '';
  const metrics = data.metrics || [];

  if (metrics.length === 0) return null;

  return (
    <section className="impact-section" style={{ padding: '60px 0' }}>
      <div className="srcn-container">
        {(heading || kicker) && (
          <div className="text-center" style={{ marginBottom: '40px' }}>
            {kicker && <span className="sub-title-red">{kicker}</span>}
            {heading && <h2 className="section-main-heading">{heading}</h2>}
            {description && <p className="hero-common-title" style={{ maxWidth: '750px', margin: '15px auto 0' }}>{description}</p>}
          </div>
        )}
        <div
          className="impact-wrapper"
          style={{ gridTemplateColumns: `repeat(${Math.min(metrics.length, 4)}, 1fr)` }}
        >
          {metrics.map((stat, idx) => (
            <div key={idx} className="impact-card">
              <h3 className="impact-counter">{stat.number || stat.count}</h3>
              <p className="impact-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

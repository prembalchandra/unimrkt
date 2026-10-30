'use client';

import React from 'react';
import Link from 'next/link';

const defaultIcons = [
  '/asstes/images/icon/Research-icon-img.png',
  '/asstes/images/icon/countries-icon-img.png',
  '/asstes/images/icon/every-stage-icon-img.png',
  '/asstes/images/icon/experience-icon-img.png',
];

export default function ValuesGridSection({ data = {} }) {
  if (!data) return null;

  const kicker = data.kicker || 'CORE PRINCIPLES';
  const heading = data.heading || 'Standards Embedded in Every Survey';
  const description = data.description || '';
  const values = data.values || [];

  if (values.length === 0) return null;

  return (
    <section className="research-value-section" style={{ padding: '60px 0' }}>
      <div className="srcn-container">
        <div className="research-value-wrap">
          <div className="research-value-header text-center">
            {kicker && <span className="research-value-kicker career-values-kicker">{kicker}</span>}
            {heading && <h2 className="research-value-title section-main-heading">{heading}</h2>}
            {description && <p className="hero-common-title" style={{ maxWidth: '750px', margin: '15px auto 0' }}>{description}</p>}
          </div>

          <div className="research-value-grid">
            {values.map((val, idx) => (
              <article key={idx} className="research-value-card">
                <div className="value-icon-wrap">
                  <img src={defaultIcons[idx % defaultIcons.length]} alt={val.title} />
                </div>
                <h3>{val.title}</h3>
                <p>{val.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

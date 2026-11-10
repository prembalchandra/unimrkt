import { getStrapiMedia } from '@/lib/strapi';
import React from 'react';

export default function ResearchValue({ dynamicValues = null }) {
  const values = (dynamicValues?.values || []).map((v) => ({
    title: v.title || '',
    desc: v.description || '',
    icon: getStrapiMedia('/uploads/Research-icon-img.png'),
  }));

  if (values.length === 0) return null;

  return (
    <section className="research-value-section">
      <div className="srcn-container">
        <div className="research-value-wrap">
          <div className="research-value-header">
            <span className="research-value-kicker career-values-kicker">
              {dynamicValues?.kicker}
            </span>
            <h2 className="research-value-title section-main-heading">
              {dynamicValues?.title || dynamicValues?.heading}
            </h2>
            <p className="research-value-subtitle section-sub-text">
              {dynamicValues?.subtitle || dynamicValues?.description}
            </p>
          </div>

          <div className="research-value-grid">
            {values.map((val, idx) => (
              <article key={idx} className="research-value-card">
                <div className="value-icon-wrap">
                  <img src={val.icon} alt={val.title} />
                </div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

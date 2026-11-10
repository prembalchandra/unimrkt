import React from 'react';

const defaultIcons = [
  '/asstes/images/icon/countries-icon-img.png',
  '/asstes/images/icon/every-stage-icon-img.png',
  '/asstes/images/icon/phone-icon-img.png',
  '/asstes/images/icon/experience-icon-img.png',
];

export default function ResearchImpact({ stats = [], heading }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="research-impact-section">
      <div className="srcn-container">
        <div className="section-header-area research-impact-header">
          <h2 className="section-main-heading research-impact-title">{heading || 'Research Without Borders'}</h2>
        </div>
        <div className="research-impact-grid">
          {stats.map((stat, idx) => (
            <article key={stat.id || idx} className="research-impact-col">
              <div className="research-impact-card">
                <div className="research-impact-icon">
                  <img src={stat.icon || stat.iconClass || defaultIcons[idx % defaultIcons.length]} alt={stat.label} />
                </div>
                <div className="research-impact-content-area">
                  <h3 className="research-impact-number">{stat.number}</h3>
                  <p className="research-impact-label">{stat.label}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

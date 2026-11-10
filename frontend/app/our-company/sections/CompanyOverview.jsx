import React from 'react';

const defaultIcons = [
  '/asstes/images/icon/global-reach-icon-img.png',
  '/asstes/images/icon/deep-expertise-profile-2user-iocn-img.png',
  '/asstes/images/icon/faster-decisions-timer-icon-img.png',
  '/asstes/images/icon/shield-tick-reliable-quality.png',
];

export default function CompanyOverview({ pillars = [], kicker, heading, description }) {
  if (!pillars || pillars.length === 0) return null;

  return (
    <section className="research-value-section">
      <div className="srcn-container">
        <div className="research-value-wrap">
          <div className="research-value-header">
            <span className="research-value-kicker career-values-kicker">{kicker || 'Why Businesses Choose Unimrkt'}</span>
            <h2 className="research-value-title section-main-heading">
              {heading || 'Insights That Move Businesses Forward'}
            </h2>
            <p>{description || 'Transforming complex data into clear, actionable insights that help businesses make smarter decisions and unlock new opportunities.'}</p>
          </div>
          <div className="research-value-grid">
            {pillars.map((pillar, idx) => (
              <article key={pillar.id || idx} className="research-value-card">
                <div className="value-icon-wrap">
                  <img src={pillar.icon || pillar.iconClass || defaultIcons[idx % defaultIcons.length]} alt={pillar.title} />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc || pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

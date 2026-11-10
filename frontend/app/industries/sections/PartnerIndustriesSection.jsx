import React from 'react';

const defaultIcons = [
  '/asstes/images/icon/deep-industry-understanding-icon-img.png',
  '/asstes/images/icon/cross-Industry-perspective-icon-img.png',
  '/asstes/images/icon/scalable-research-icon-img.png',
  '/asstes/images/icon/wider-respondent-reach-icon-img.png',
  '/asstes/images/icon/actionable-business-intelligence-icon-img.png',
  '/asstes/images/icon/stronger-growth-icon-img.png',
];

export default function PartnerIndustriesSection({ features = [], kicker, heading, description }) {
  if (!features || features.length === 0) return null;

  return (
    <section className="partner-industries-section" id="partner-industries">
      <div className="srcn-container">
        <div className="industries-showcase-header section-header-area">
          <span className="industries-showcase-kicker career-values-kicker">{kicker || 'WHY UNIMRKT RESEARCH'}</span>
          <h2 className="industries-showcase-heading section-main-heading">{heading || 'One Research Partner. Multiple Industries.'}</h2>
          <p className="industries-showcase-desc industries-expertise-desc">
            {description || 'Industry-specific expertise across key sectors, delivering reliable market insights and strategic direction to help businesses understand diverse markets.'}
          </p>
        </div>
        <div className="partner-industries-grid">
          {features.map((item, index) => (
            <article key={item.id || index} className="partner-industry-card">
              <div className="partner-industry-icon-wrap">
                <img src={item.icon || item.iconClass || defaultIcons[index % defaultIcons.length]} alt={item.title} loading="lazy" />
              </div>
              <h3 className="partner-industry-title">{item.title}</h3>
              <p className="partner-industry-desc">{item.desc || item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

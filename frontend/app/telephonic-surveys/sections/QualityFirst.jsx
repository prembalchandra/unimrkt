import React from 'react';

const defaultIcons = [
  '/asstes/images/icon/interviewer-icon-img.png',
  '/asstes/images/icon/sample-validation-icon-img.png',
  '/asstes/images/icon/call-monitoring-icon-img.png',
  '/asstes/images/icon/response-validation-icon-img.png',
  '/asstes/images/icon/data-quality-checks-icon-img.png',
  '/asstes/images/icon/secure-data-handling-icon-img.png',
];

export default function QualityFirst({ qualityPoints = [], kicker, title, text }) {
  if (!qualityPoints || qualityPoints.length === 0) return null;

  return (
    <section className="quality-first-section">
      <div className="srcn-container quality-first-inner">
        <div className="quality-first-copy">
          <div className="quality-first-content-box">
            <span className="quality-first-kicker">{kicker || 'QUALITY FIRST'}</span>
            <h2 className="quality-first-title section-main-heading">
              {title || <>Every Conversation Counts.<br />Every Response Matters.</>}
            </h2>
            <p className="quality-first-text">
              {text || 'Reliable research starts with reliable data. Our quality framework is designed to maintain accuracy, consistency and respondent authenticity throughout the telephonic research process.'}
            </p>
          </div>
          <div className="quality-first-grid">
            {qualityPoints.map((item, index) => (
              <article key={item.id || index} className="quality-first-card">
                <div className="quality-first-icon">
                  <img src={item.icon || item.iconClass || defaultIcons[index % defaultIcons.length]} alt={item.title} />
                </div>
                <div className="quality-first-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.desc || item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

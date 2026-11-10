import React from 'react';

const defaultIcons = [
  '/asstes/images/icon/Define-icon-img.png',
  '/asstes/images/icon/discovery-icon-img.png',
  '/asstes/images/icon/measure-icon-img.png',
  '/asstes/images/icon/segment-icon-img.png',
  '/asstes/images/icon/analyse-icon-img.png',
  '/asstes/images/icon/activate-icon-img.png',
];

export default function CaseDetailApproach({ approachSteps = [], heading, kicker, description }) {
  if (!approachSteps || approachSteps.length === 0) return null;

  return (
    <section className="approach-section">
      <div className="srcn-container">
        <div className="approach-container">
          <div className="approach-header career-journey-header">
            <span className="approach-eyebrow career-journey-kicker career-values-kicker">{kicker || 'Our Approach'}</span>
            <h2 className="approach-title section-main-heading">
              {heading || <>Turning customer conversations<br />into actionable intelligence</>}
            </h2>

            <p className="approach-description section-sub-text">
              {description || 'Unimrkt designed a structured research approach combining quantitative measurement with qualitative exploration to understand both what customers think and why they think it.'}
            </p>
          </div>

          <div className="approach-grid">
            {approachSteps.map((step, index) => (
              <article key={step.id || index} className="approach-card career-journey-step">
                <div className="approach-card-box-area">
                  <div className="approach-icon career-journey-icon">
                    <img src={step.icon || step.iconClass || defaultIcons[index % defaultIcons.length]} alt={step.title} />
                  </div>
                  <div className="career-journey-content">
                    <h3 className="approach-card-title">{step.title}</h3>
                    <p className="approach-card-description">{step.desc || step.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

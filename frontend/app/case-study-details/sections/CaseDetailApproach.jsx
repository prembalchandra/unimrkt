import React from 'react';

const defaultIcons = [
  '/asstes/images/icon/Define-icon-img.png',
  '/asstes/images/icon/discovery-icon-img.png',
  '/asstes/images/icon/measure-icon-img.png',
  '/asstes/images/icon/segment-icon-img.png',
  '/asstes/images/icon/analyse-icon-img.png',
  '/asstes/images/icon/activate-icon-img.png',
];

const defaultSteps = [
  { icon: '/asstes/images/icon/Define-icon-img.png', title: '1. Define', desc: 'Established research objectives, customer segments and key business questions.' },
  { icon: '/asstes/images/icon/discovery-icon-img.png', title: '2. Discover', desc: 'Conducted qualitative conversations to uncover motivations, pain points and unmet expectations.' },
  { icon: '/asstes/images/icon/measure-icon-img.png', title: '3. Measure', desc: 'Used structured surveys to quantify customer preferences and identify meaningful patterns.' },
  { icon: '/asstes/images/icon/segment-icon-img.png', title: '4. Segment', desc: 'Compared responses across customer profiles, needs and behavioural characteristics.' },
  { icon: '/asstes/images/icon/analyse-icon-img.png', title: '5. Analyse', desc: 'Identified the strongest drivers of consideration, satisfaction and loyalty.' },
  { icon: '/asstes/images/icon/activate-icon-img.png', title: '6. Activate', desc: 'Translated findings into practical recommendations for customer experience and service strategy.' },
];

export default function CaseDetailApproach({ approachSteps = [], heading, kicker, description }) {
  const stepsToRender = (approachSteps && approachSteps.length > 0) ? approachSteps : defaultSteps;

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
            {stepsToRender.map((step, index) => (
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

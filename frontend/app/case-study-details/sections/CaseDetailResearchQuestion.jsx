import React from 'react';
import { getStrapiMedia } from '../../../lib/strapi';

const defaultPillars = [
  {
    id: 1,
    name: '1. Trust',
    desc: 'What makes customers feel confident about a financial provider?',
    icon: '/asstes/images/icon/trust-shield-tick-icon-img.png',
  },
  {
    id: 2,
    name: '2. Convenience',
    desc: 'How important are speed, accessibility, and ease of use?',
    icon: '/asstes/images/icon/convenience-iocn-img.png',
  },
  {
    id: 3,
    name: '3. Digital Experience',
    desc: 'What do customers expect from websites, apps, and digital services?',
    icon: '/asstes/images/icon/review-icon-img.png',
  },
  {
    id: 4,
    name: '4. Relationship',
    desc: 'How do human interactions and advisory support impact perceptions?',
    icon: '/asstes/images/icon/handshake-partnership-icon-img.png',
  },
  {
    id: 5,
    name: '5. Value',
    desc: 'What creates long-term differentiation beyond price?',
    icon: '/asstes/images/icon/cup-research excellence-icon-img.png',
  },
];

export default function CaseDetailResearchQuestion({
  dynamicSection = null,
  kicker = null,
  heading = null,
  description = null,
  pillars = [],
}) {
  const displayKicker = kicker || dynamicSection?.kicker || 'THE RESEARCH QUESTION';
  const displayHeading = heading || dynamicSection?.heading || dynamicSection?.title || 'What Do Customers Really Expect From Their Financial Providers?';
  const displayDesc = description || dynamicSection?.description || 'We explored the complete customer perspective — from awareness and consideration to selection, usage, and ongoing engagement.';

  const displayPillars = (pillars && pillars.length > 0)
    ? pillars
    : (dynamicSection?.researchPillars && dynamicSection.researchPillars.length > 0)
      ? dynamicSection.researchPillars
      : defaultPillars;

  return (
    <section className="cs-detail-research-question-section">
      <div className="srcn-container">
        <div className="cs-question-card">
          <div className="cs-question-header">
            <span className="cs-kicker-red career-values-kicker">{displayKicker}</span>
            <h2 className="cs-question-title section-main-heading">
              {displayHeading}
            </h2>
            <p className="cs-question-desc section-sub-text">
              {displayDesc}
            </p>
          </div>

          <div className="cs-diagram-container">
            <div className="cs-diagram-row">
              {displayPillars.map((p, idx) => {
                const name = p.name || p.title || `Pillar ${idx + 1}`;
                const text = p.desc || p.description || '';
                const icon = getStrapiMedia(p.icon, defaultPillars[idx % defaultPillars.length].icon);
                const stepNum = (idx % 5) + 1;

                return (
                  <div key={p.id || idx} className={`cs-diagram-item cs-step-${stepNum}`}>
                    <div className="cs-circle-wrap">
                      <div className="cs-diagram-circle">
                        <img src={icon} alt={name} />
                      </div>
                    </div>
                    <div className="cs-diagram-stem"></div>
                    <div className="cs-diagram-info">
                      <h4 className="cs-diagram-name">{name}</h4>
                      <p className="cs-diagram-text">{text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

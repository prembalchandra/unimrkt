import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getPillarIcon(p, idx = 0) {
  if (p.icon) return getStrapiMedia(p.icon);
  const name = (p.name || p.title || '').toLowerCase();
  if (name.includes('trust')) return getStrapiMedia('/uploads/trust-shield-tick-icon-img.png');
  if (name.includes('convenien')) return getStrapiMedia('/uploads/convenience-iocn-img.png');
  if (name.includes('digital') || name.includes('experience')) return getStrapiMedia('/uploads/review-icon-img.png');
  if (name.includes('relation') || name.includes('partner')) return getStrapiMedia('/uploads/handshake-partnership-icon-img.png');
  if (name.includes('value') || name.includes('excellen')) return getStrapiMedia('/uploads/cup-research%20excellence-icon-img.png');
  const defaults = [
    getStrapiMedia('/uploads/trust-shield-tick-icon-img.png'),
    getStrapiMedia('/uploads/convenience-iocn-img.png'),
    getStrapiMedia('/uploads/review-icon-img.png'),
    getStrapiMedia('/uploads/handshake-partnership-icon-img.png'),
    getStrapiMedia('/uploads/cup-research%20excellence-icon-img.png'),
  ];
  return defaults[idx % defaults.length];
}

export default function CaseDetailResearchQuestion({
  dynamicSection = null,
  kicker = null,
  heading = null,
  description = null,
  pillars = [],
}) {
  const displayKicker = kicker || dynamicSection?.kicker;
  const displayHeading = heading || dynamicSection?.heading || dynamicSection?.title;
  const displayDesc = description || dynamicSection?.description;

  const displayPillars = (pillars && pillars.length > 0)
    ? pillars
    : (dynamicSection?.researchPillars && dynamicSection.researchPillars.length > 0)
      ? dynamicSection.researchPillars
      : [];

  if (!displayHeading && displayPillars.length === 0) return null;

  return (
    <section className="cs-detail-research-question-section">
      <div className="srcn-container">
        <div className="cs-question-card">
          {(displayKicker || displayHeading || displayDesc) && (
            <div className="cs-question-header">
              {displayKicker && <span className="cs-kicker-red career-values-kicker">{displayKicker}</span>}
              {displayHeading && <h2 className="cs-question-title section-main-heading">{displayHeading}</h2>}
              {displayDesc && <p className="cs-question-desc section-sub-text">{displayDesc}</p>}
            </div>
          )}

          {displayPillars.length > 0 && (
            <div className="cs-diagram-container">
              <div className="cs-diagram-row">
                {displayPillars.map((p, idx) => {
                  const name = p.name || p.title || '';
                  const text = p.desc || p.description || '';
                  const icon = getPillarIcon(p, idx);
                  const stepNum = (idx % 5) + 1;

                  return (
                    <div key={p.id || idx} className={`cs-diagram-item cs-step-${stepNum}`}>
                      <div className="cs-circle-wrap">
                        {icon && (
                          <div className="cs-diagram-circle">
                            <img src={icon} alt={name} />
                          </div>
                        )}
                      </div>
                      <div className="cs-diagram-stem"></div>
                      <div className="cs-diagram-info">
                        {name && <h4 className="cs-diagram-name">{name}</h4>}
                        {text && <p className="cs-diagram-text">{text}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

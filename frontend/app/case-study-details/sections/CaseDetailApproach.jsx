import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getStepIcon(step, idx = 0) {
  if (step.icon) return getStrapiMedia(step.icon);
  const title = (step.title || '').toLowerCase();
  if (title.includes('define')) return getStrapiMedia('/uploads/Define-icon-img.png');
  if (title.includes('discover') || title.includes('discovery')) return getStrapiMedia('/uploads/discovery-icon-img.png');
  if (title.includes('measure')) return getStrapiMedia('/uploads/measure-icon-img.png');
  if (title.includes('segment')) return getStrapiMedia('/uploads/segment-icon-img.png');
  if (title.includes('analyse') || title.includes('analyze')) return getStrapiMedia('/uploads/analyse-icon-img.png');
  if (title.includes('activate')) return getStrapiMedia('/uploads/activate-icon-img.png');
  const defaults = [
    getStrapiMedia('/uploads/Define-icon-img.png'),
    getStrapiMedia('/uploads/discovery-icon-img.png'),
    getStrapiMedia('/uploads/measure-icon-img.png'),
    getStrapiMedia('/uploads/segment-icon-img.png'),
    getStrapiMedia('/uploads/analyse-icon-img.png'),
    getStrapiMedia('/uploads/activate-icon-img.png'),
  ];
  return defaults[idx % defaults.length];
}

export default function CaseDetailApproach({ approachSteps = [], heading, kicker, description }) {
  const stepsToRender = approachSteps || [];

  if (stepsToRender.length === 0 && !heading) return null;

  return (
    <section className="approach-section">
      <div className="srcn-container">
        <div className="approach-container">
          {(kicker || heading || description) && (
            <div className="approach-header career-journey-header">
              {kicker && <span className="approach-eyebrow career-journey-kicker career-values-kicker">{kicker}</span>}
              {heading && <h2 className="approach-title section-main-heading">{heading}</h2>}
              {description && <p className="approach-description section-sub-text">{description}</p>}
            </div>
          )}

          {stepsToRender.length > 0 && (
            <div className="approach-grid">
              {stepsToRender.map((step, index) => {
                const icon = getStepIcon(step, index);
                return (
                  <article key={step.id || index} className="approach-card career-journey-step">
                    <div className="approach-card-box-area">
                      {icon && (
                        <div className="approach-icon career-journey-icon">
                          <img src={icon} alt={step.title} />
                        </div>
                      )}
                      <div className="career-journey-content">
                        {step.title && <h3 className="approach-card-title">{step.title}</h3>}
                        {(step.desc || step.description) && (
                          <p className="approach-card-description">{step.desc || step.description}</p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
